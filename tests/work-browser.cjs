const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const{chromium:pw}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.ERP_TEST_OUTPUT||path.join(__dirname,'.artifacts'));
const dependency=name=>path.dirname(require.resolve(name+'/package.json'));
const chartRoot=path.resolve(path.dirname(require.resolve('chart.js')),'..');
fs.mkdirSync(path.join(out,'screens'),{recursive:true});
const seed=require('./export-fixtures.cjs').raw.map((r,i)=>({...r,_uid:'seed-'+i})); const fixtures=[...seed,...Array.from({length:60},(_,i)=>({...seed[0],id:'EXPORT-'+String(i).padStart(3,'0'),_uid:'export-'+i}))];
const state={rows:structuredClone(fixtures),goals:{'10':10,'09':10},calls:[],groq:[],summaryAttempts:0};
const result={checks:[],themes:[],errors:[],warnings:[]};
(async()=>{
 const browser=await pw.launch({executablePath:process.env.ERP_CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();
 page.on('pageerror',e=>result.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());if(m.type()==='warning')result.warnings.push(m.text())});
 await ctx.addInitScript(()=>{
  const D=Date;window.Date=class extends D{constructor(...args){super(...(args.length?args:['2026-10-20T15:00:00Z']))}static now(){return D.now()}};
  localStorage.setItem('groq_api_key_erp','gsk_test_only_not_real');localStorage.setItem('ultimo_mes_selecionado','10');
  localStorage.setItem('erp_leticia_appearance_v1',JSON.stringify({theme:'original',effects:false,layout:'auto',density:'auto'}));
 });
 await ctx.route('**/*',async route=>{
  const url=route.request().url(),u=new URL(url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com')return route.fulfill({status:200,contentType:'text/css',body:''});
  if(url.includes('cdn.jsdelivr.net/npm/chart.js'))return route.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(chartRoot,'dist/chart.umd.js'))});
  if(url.includes('cdn.jsdelivr.net/npm/sweetalert2'))return route.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(dependency('sweetalert2'),'dist/sweetalert2.all.min.js'))});
  if(u.hostname==='script.google.com'){
   const req=route.request().postDataJSON();state.calls.push(req);
   if(req.acao==='salvar')state.rows.push(req.registro);
   if(req.acao==='editar')state.rows=state.rows.map(r=>r._uid===req.registro._uid?req.registro:r);
   if(req.acao==='apagar')state.rows=state.rows.filter(r=>r._uid!==req.uid);
   if(req.acao==='salvarMeta')state.goals[req.mes]=req.meta;
   return route.fulfill({contentType:'application/json',body:JSON.stringify({status:'sucesso',dados:state.rows,metas:state.goals,logs:[],memoria:[]})});
  }
  if(u.hostname==='api.groq.com'){
   const req=route.request().postDataJSON();state.groq.push({request:req,auth:route.request().headers().authorization});
   if(req.response_format?.json_schema?.name==='aurora_work_analysis')return route.fulfill({contentType:'application/json',body:JSON.stringify({choices:[{finish_reason:'stop',message:{content:JSON.stringify({insights:[{fact:'review',comment:'Consulte os detalhes para conferir os campos sinalizados.'}]})}}]})});
   const summary=req.response_format?.type==='json_schema';
   if(summary)state.summaryAttempts++;
   const truncated=summary&&state.summaryAttempts===1;
   const content=req.tools?'Consulta concluída no teste.':truncated?'{"comments":[':JSON.stringify({comments:[{basis:'production',text:'O cadastro no ERP não comprova baixa judicial.'},{basis:'goalProgress',text:'A meta mensal ainda não foi atingida.'}]});
   return route.fulfill({contentType:'application/json',body:JSON.stringify({choices:[{finish_reason:truncated?'length':'stop',message:{content}}]})});
  }
  if(u.protocol==='file:')return route.continue();
  if(u.hostname==='erp.test'){
   const p=path.join(root,decodeURIComponent(u.pathname==='/index.html'?'/index.html':u.pathname));
   if(!p.startsWith(root)||!fs.existsSync(p))return route.fulfill({status:404,body:'not found'});
   const ext=path.extname(p),mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.mp4':'video/mp4'}[ext]||'application/octet-stream';
   return route.fulfill({contentType:mime,body:fs.readFileSync(p)});
  }
  result.errors.push('Unexpected network: '+u.hostname);return route.abort();
 });
 try {
  await page.goto('https://erp.test/index.html');await page.waitForFunction(()=>window.AuroraWorkAI&&document.getElementById('sideCount').textContent==='69');
  const original=await page.evaluate(()=>({data:JSON.stringify(bd),calc:JSON.stringify(calculate()),storage:{...localStorage}}));const callsBefore=state.calls.length;
  const themes=await page.evaluate(()=>Object.keys(ERPTheme.themes));assert.equal(themes.length,11);
  for(const width of [1366,375]){
   const height=width===375?812:900;await page.setViewportSize({width,height});
   for(const theme of themes){
    await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:false}),theme);
    const buttons=await page.evaluate(()=>['erpSummaryOpen','erpExportOpen','erpWorkOpen'].map(id=>{const r=document.getElementById(id).getBoundingClientRect();return{id,x:r.x,y:r.y,w:r.width,h:r.height}}));
    buttons.forEach((a,i)=>buttons.slice(i+1).forEach(b=>assert.ok(a.x+a.w<=b.x+1||b.x+b.w<=a.x+1||a.y+a.h<=b.y+1||b.y+b.h<=a.y+1,theme+' header overlap')));
    await page.locator('#erpWorkOpen').click();await page.locator('#erpWorkDialog').waitFor({state:'visible'});assert.equal(await page.locator('#wc-count').textContent(),'64 resultados de 69 disponíveis');
    const geometry=await page.locator('#erpWorkDialog').evaluate(d=>{const r=d.getBoundingClientRect(),body=d.querySelector('.wc-body');return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,client:d.clientWidth,scroll:d.scrollWidth,bodyClient:body.clientWidth,bodyScroll:body.scrollWidth,fg:getComputedStyle(d).color,bg:getComputedStyle(d).backgroundColor,font:getComputedStyle(d).fontFamily}});
    assert.ok(geometry.left>=0&&geometry.right<=width+1&&geometry.top>=0&&geometry.bottom<=height+1,theme+' bounds');assert.ok(geometry.scroll<=geometry.client+1&&geometry.bodyScroll<=geometry.bodyClient+1,theme+' overflow');
    await page.screenshot({path:path.join(out,'screens',`work-${theme}-${width}.png`)});result.themes.push({theme,width,...geometry});
    await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'erpWorkOpen');assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),original.calc);
   }
  }
  result.checks.push('22 layouts nos 11 temas: header sem sobreposição, modal, rolagem, foco e cálculos');
  await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>ERPTheme.apply({...ERPTheme.state,theme:'original'}));await page.locator('#erpWorkOpen').click();
  await page.locator('[data-card=refused]').click();assert.equal(await page.locator('#wc-count').textContent(),'2 resultados de 69 disponíveis');await page.locator('#wc-filters details summary').click();await page.locator('#wc-type').selectOption('Acordo');assert.equal(await page.locator('#wc-count').textContent(),'1 resultados de 69 disponíveis');
  await page.locator('#wc-rows tr').first().getByRole('button',{name:'Ver detalhes',exact:false}).click();assert.ok((await page.locator('#wc-detail-alerts').textContent()).includes('referência'));await page.locator('#wc-detail-edit').click();assert.equal(await page.locator('#idCaso').inputValue(),'00002');assert.equal(await page.evaluate(()=>editUid),'seed-1');assert.equal(state.calls.length,callsBefore);await page.locator('#btnCancel').click();
  await page.locator('#erpWorkOpen').click();await page.locator('#wc-clear').click();await page.locator('#wc-id').fill('00001');await page.waitForFunction(()=>document.getElementById('wc-count').textContent.startsWith('2 '));await page.locator('#wc-rows tr').first().getByRole('button',{name:'Abrir no cadastro'}).click();assert.equal(await page.evaluate(()=>editUid),'seed-3');await page.locator('#btnCancel').click();
  result.checks.push('card exato, filtros, detalhes e edição pelo UID correto com CNJ duplicado; nenhum salvamento');
  await page.locator('#erpWorkOpen').click();await page.locator('#wc-clear').click();await page.locator('#wc-id').fill('EXPORT-');await page.waitForFunction(()=>document.getElementById('wc-count').textContent.startsWith('60 '));await page.locator('#wc-sort').selectOption('id');await page.locator('#wc-direction').selectOption('desc');await page.locator('#wc-next').click();assert.equal(await page.locator('#wc-rows tr').count(),25);assert.ok((await page.locator('#wc-page').textContent()).includes('Página 2'));
  assert.equal(state.groq.length,0);await page.locator('#wc-analyze').click();await page.waitForFunction(()=>document.getElementById('wc-ai-result').textContent.includes('Consulte os detalhes'));
  assert.equal(state.groq.length,1);const request=state.groq[0];assert.equal(request.auth,'Bearer gsk_test_only_not_real');assert.equal(request.request.tools,undefined);const payload=JSON.stringify(request.request);assert.ok(payload.includes('60'));for(const secret of ['EXPORT-','00001','Alvará','BLOQUEIO de garantia'])assert.ok(!payload.includes(secret),secret+' leaked');
  result.checks.push('análise explícita pelo bundle/dispatcher real: chave existente, contexto agregado e resposta exibida');
  await page.locator('#wc-export').click();await page.locator('#erpExportDialog').waitFor({state:'visible'});assert.ok((await page.locator('#ex-count').textContent()).startsWith('60 '));assert.equal(await page.locator('#ex-idValue').inputValue(),'EXPORT-');assert.equal(await page.locator('#ex-statusMode').inputValue(),'literal');
  const d1=page.waitForEvent('download');await page.locator('#ex-generate').click();const x=await d1,xp=path.join(out,'work.xlsx');await x.saveAs(xp);await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);
  const ExcelJS=require('../vendor/export/exceljs-4.4.0.min.js');const wb=new ExcelJS.Workbook();await wb.xlsx.load(fs.readFileSync(xp));const ws=wb.getWorksheet('Encerramentos');assert.equal(ws.rowCount,63);assert.equal(ws.columnCount,7);assert.equal(ws.getCell('A4').value,'EXPORT-059');assert.equal(ws.getCell('A63').value,'EXPORT-000');assert.equal(ws.getCell('G2').master.address,'A1');
  await page.locator('#ex-format').selectOption('pdf');const d2=page.waitForEvent('download');await page.locator('#ex-generate').click();await(await d2).saveAs(path.join(out,'work.pdf'));await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);await page.locator('#ex-close').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'erpWorkOpen');
  result.checks.push('transferência integral ao exportador e downloads reais de XLSX/PDF: 60 registros ordenados; XLSX sete colunas e A1:G2');
  await page.locator('#erpWorkOpen').click();await page.locator('#wc-summary').click();await page.locator('#erpSummaryDialog').waitFor({state:'visible'});assert.ok((await page.locator('#erpSummaryHandoff').textContent()).includes('TODOS os registros'));assert.ok((await page.locator('#erpSummaryHandoff').textContent()).includes('sem os filtros'));assert.equal(await page.locator('#erpSummaryEnd').inputValue(),'2026-10-20');await page.locator('#erpSummaryClose').click();
  assert.equal(await page.evaluate(()=>JSON.stringify(bd)),original.data);assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),original.calc);const storage=await page.evaluate(()=>({...localStorage}));for(const k of Object.keys(original.storage).filter(k=>k!=='erp_leticia_appearance_v1'))assert.equal(storage[k],original.storage[k],k);assert.equal(state.calls.length,callsBefore);
  result.checks.push('resumo recebe somente período com aviso visível; dados, cálculos e armazenamento preservados; nenhuma sincronização nova');
  await page.setViewportSize({width:320,height:568});await page.locator('#erpWorkOpen').click();await page.locator('#wc-clear').click();await page.locator('#wc-close').focus();await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'wc-advanced');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'wc-close');await page.evaluate(()=>document.querySelector('#wc-filters details').open=true);const narrow=await page.locator('.wc-body').evaluate(e=>({w:e.clientWidth,sw:e.scrollWidth}));assert.ok(narrow.sw<=narrow.w+1);await page.locator('#wc-advanced').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'screens','work-320.png')});await page.locator('#wc-close').click();
  await page.goto(require('node:url').pathToFileURL(path.join(root,'index.html')).href);await page.waitForFunction(()=>window.AuroraWorkAI&&document.getElementById('sideCount').textContent==='69');await page.locator('#erpWorkOpen').click();await page.locator('#wc-analyze').click();await page.waitForFunction(()=>document.getElementById('wc-ai-result').textContent.includes('Consulte os detalhes'));await page.locator('#wc-close').click();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1366,height:900});for(const theme of themes){await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:true}),theme);await page.locator('#erpWorkOpen').click();await page.locator('#wc-reload').click();assert.equal(await page.locator('#wc-count').textContent(),'64 resultados de 69 disponíveis');await page.locator('#wc-close').click();}
  result.checks.push('320×568, foco circular, file:// com IA e abertura nos 11 temas com efeitos ativos');
  assert.deepEqual(result.errors,[]);assert.deepEqual(result.warnings,[]);fs.writeFileSync(path.join(out,'work-browser-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({checks:result.checks,themes:result.themes.length,errors:result.errors,warnings:result.warnings},null,2));
 }catch(e){await page.screenshot({path:path.join(out,'work-failure.png')}).catch(()=>{});throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(out,'work-browser-error.json'),JSON.stringify({error:e.message,...result},null,2));process.exitCode=1});
