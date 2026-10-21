const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const{chromium:pw}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.ERP_TEST_OUTPUT||path.join(__dirname,'.artifacts'));
const dependency=name=>path.dirname(require.resolve(name+'/package.json'));
const chartRoot=path.resolve(path.dirname(require.resolve('chart.js')),'..');
fs.mkdirSync(path.join(out,'screens'),{recursive:true});
const seed=require('./export-fixtures.cjs').raw; const fixtures=[...seed,...Array.from({length:60},(_,i)=>({...seed[0],id:'EXPORT-'+String(i).padStart(3,'0'),_uid:'export-'+i}))];
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
  const requests=[],workers=[];page.on('request',r=>requests.push(r.url()));page.on('worker',w=>workers.push(w.url()));
  await page.goto('https://erp.test/index.html');await page.waitForFunction(()=>typeof window.processarMensagemAurora==='function'&&document.getElementById('sideCount').textContent==='69');
  assert.deepEqual(result.errors,[]);assert.equal(requests.filter(u=>u.includes('/vendor/export/')).length,0);
  const original=await page.evaluate(()=>({data:JSON.stringify(bd),calc:JSON.stringify(calculate()),storage:JSON.stringify({...localStorage}),dashboard:document.getElementById('filterMonth').value}));
  const callsBefore=state.calls.length;
  const themes=await page.evaluate(()=>Object.keys(ERPTheme.themes));assert.equal(themes.length,11);
  for(const width of [1366,375]){
   await page.setViewportSize({width,height:width===375?812:900});
   for(const theme of themes){
    await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:false}),theme);
    await page.locator('#erpExportOpen').click();await page.locator('#erpExportDialog').waitFor({state:'visible'});
    assert.equal(await page.locator('#ex-count').textContent(),'69 encontrados de 69 disponíveis · 69 serão exportados');
    const geometry=await page.locator('#erpExportDialog').evaluate(d=>{const r=d.getBoundingClientRect(),action=d.querySelector('#ex-generate').getBoundingClientRect(),body=d.querySelector('.export-body');return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,client:d.clientWidth,scroll:d.scrollWidth,bodyClient:body.clientWidth,bodyScroll:body.scrollWidth,actionBottom:action.bottom,fg:getComputedStyle(d).color,bg:getComputedStyle(d).backgroundColor,font:getComputedStyle(d).fontFamily}});
    assert.ok(geometry.left>=0&&geometry.right<=width+1&&geometry.top>=0&&geometry.bottom<=(width===375?812:900)+1,theme+' bounds');assert.ok(geometry.scroll<=geometry.client+1&&geometry.bodyScroll<=geometry.bodyClient+1,theme+' overflow');assert.ok(geometry.actionBottom<=geometry.bottom,theme+' action');
    await page.screenshot({path:path.join(out,'screens',`export-${theme}-${width}.png`)});result.themes.push({theme,width,...geometry});
    await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'erpExportOpen');assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),original.calc);
   }
  }
  result.checks.push('22 layouts, 11 temas: botões, modal, rolagem, foco e cálculos');
  await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>ERPTheme.apply({...ERPTheme.state,theme:'original'}));
  await page.locator('#erpExportOpen').click();assert.equal(state.groq.length,0);assert.equal(state.calls.length,callsBefore);
  await page.locator('#ex-dashboard').click();assert.ok((await page.locator('#ex-chips').textContent()).includes('referência'));
  assert.equal(await page.locator('#filterMonth').inputValue(),original.dashboard);
  await page.locator('#ex-all').click();assert.ok((await page.locator('#ex-count').textContent()).startsWith('69 '));
  await page.locator('#ex-next').click();assert.equal(await page.locator('#ex-preview-body tr').count(),25);assert.ok((await page.locator('#ex-page').textContent()).includes('Página 2'));
  await page.evaluate(()=>document.querySelectorAll('#erpExportDialog details').forEach(d=>d.open=true));
  await page.locator('#ex-shortcut').selectOption('pending');assert.ok((await page.locator('#ex-count').textContent()).startsWith('2 '));assert.equal(await page.locator('#ex-panjud').inputValue(),'nao');assert.equal(await page.locator('#ex-recusado').inputValue(),'nao');
  await page.locator('#ex-clear').click();await page.locator('#ex-add-group').click();await page.locator('[data-obs=value]').fill('garantia');await page.locator('[data-obs-action=add]').click();await page.locator('[data-obs=value]').nth(1).fill('bloqueio');await page.locator('#ex-add-group').click();await page.locator('[data-obs=value]').nth(2).fill('liberado');await page.locator('[data-obs=not]').nth(2).check();
  await page.waitForFunction(()=>document.getElementById('ex-count').textContent.startsWith('62 '));assert.ok(!(await page.locator('#ex-preview-body').textContent()).includes('garantia liberado'));
  result.checks.push('atalhos de status, importação do dashboard, paginação e (A OU B) E NÃO C');
  await page.locator('#ex-clear').click();await page.locator('#ex-period').selectOption('custom');await page.locator('#ex-start').fill('2026-10-21');await page.locator('#ex-end').fill('2026-10-20');await page.waitForFunction(()=>document.getElementById('ex-errors').textContent.includes('posterior'));assert.equal(await page.locator('#ex-generate').isDisabled(),true);
  await page.locator('#ex-clear').click();await page.locator('#ex-types').selectOption(['Ônus','Acordo']);await page.locator('#ex-recusado').selectOption('sim');assert.ok((await page.locator('#ex-count').textContent()).startsWith('2 '));
  await page.locator('#ex-format').selectOption('pdf');assert.ok((await page.locator('#ex-count').textContent()).startsWith('2 '));await page.locator('#ex-format').selectOption('xlsx');
  await page.locator('#ex-clear').click();await page.locator('#ex-idOp').selectOption('starts');await page.locator('#ex-idValue').fill('EXPORT-');await page.locator('#ex-sort').selectOption('id');await page.locator('#ex-direction').selectOption('desc');await page.waitForFunction(()=>document.getElementById('ex-count').textContent.startsWith('60 '));
  await page.locator('#ex-summary').check();const downloads=[];page.on('download',d=>downloads.push(d));
  const d1=page.waitForEvent('download');await page.locator('#ex-generate').click();const x=await d1;const xp=path.join(out,'browser.xlsx');await x.saveAs(xp);await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);
  const ExcelJS=require('../vendor/export/exceljs-4.4.0.min.js');const wb=new ExcelJS.Workbook();await wb.xlsx.load(fs.readFileSync(xp));const ws=wb.getWorksheet('Encerramentos');assert.equal(ws.rowCount,63);assert.equal(ws.getCell('A4').value,'EXPORT-059');assert.equal(ws.getCell('A63').value,'EXPORT-000');assert.equal(ws.columnCount,7);assert.equal(wb.worksheets.length,2);
  await page.locator('#ex-format').selectOption('pdf');const d2=page.waitForEvent('download');await page.locator('#ex-generate').click();const p=await d2;await p.saveAs(path.join(out,'browser.pdf'));await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);
  assert.ok(workers.some(u=>u.endsWith('/export/worker.js')));assert.equal(downloads.length,2);assert.equal(state.groq.length,0);assert.equal(state.calls.length,callsBefore);
  result.checks.push('downloads reais de Excel e PDF: 60 registros, mesma seleção/ordem, geração em Worker, nenhuma chamada externa');
  const beforeCancel=downloads.length;await page.locator('#ex-format').selectOption('xlsx');await page.locator('#ex-generate').click();await page.locator('#ex-cancel-job').click();await page.waitForFunction(()=>document.getElementById('ex-status').textContent==='Exportação cancelada.');assert.equal(downloads.length,beforeCancel);
  await page.locator('#ex-close').click();assert.equal(await page.evaluate(()=>JSON.stringify(bd)),original.data);assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),original.calc);
  const storage=await page.evaluate(()=>({...localStorage}));const oldStorage=JSON.parse(original.storage);for(const k of Object.keys(oldStorage).filter(k=>k!=='erp_leticia_appearance_v1'))assert.equal(storage[k],oldStorage[k],k);
  result.checks.push('cancelamento não baixa arquivo; base, cálculos e armazenamento dos registros preservados');
  await page.setViewportSize({width:320,height:568});await page.locator('#erpExportOpen').click();await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'ex-generate');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'ex-close');
  await page.evaluate(()=>document.querySelectorAll('#erpExportDialog details').forEach(d=>d.open=true));const narrow=await page.locator('.export-body').evaluate(e=>({w:e.clientWidth,sw:e.scrollWidth}));assert.ok(narrow.sw<=narrow.w+1);await page.screenshot({path:path.join(out,'screens','export-320.png')});await page.locator('#ex-close').click();
  await page.goto(require('node:url').pathToFileURL(path.join(root,'index.html')).href);await page.waitForFunction(()=>document.getElementById('sideCount').textContent==='69');await page.locator('#erpExportOpen').click();await page.locator('#ex-generate').click();const local=await page.waitForEvent('download');await local.saveAs(path.join(out,'file-mode.xlsx'));await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);
  await page.locator('#ex-format').selectOption('pdf');const localPDFPromise=page.waitForEvent('download');await page.locator('#ex-generate').click();await(await localPDFPromise).saveAs(path.join(out,'file-mode.pdf'));await page.waitForFunction(()=>!document.getElementById('ex-generate').disabled);await page.locator('#ex-close').click();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1366,height:900});
  for(const theme of themes){await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:true}),theme);await page.locator('#erpExportOpen').click();await page.locator('#ex-generate').hover();await page.locator('#ex-close').focus();await page.locator('#ex-clear').click();assert.equal(await page.locator('#erpExportDialog').isVisible(),true);await page.locator('#ex-close').click();}
  result.checks.push('320×568, ciclo de foco, XLSX/PDF em file://, bibliotecas locais sob demanda e abertura nos 11 temas com efeitos ativos');
  assert.deepEqual(result.errors,[]);assert.deepEqual(result.warnings,[]);
  fs.writeFileSync(path.join(out,'export-browser-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({checks:result.checks,themes:result.themes.length,errors:result.errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(out,'export-browser-error.json'),JSON.stringify({error:e.message,...result},null,2));process.exitCode=1});
