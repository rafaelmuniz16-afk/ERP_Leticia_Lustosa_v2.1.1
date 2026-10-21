const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const{chromium:pw}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.ERP_TEST_OUTPUT||path.join(__dirname,'.artifacts'));
const dependency=name=>path.dirname(require.resolve(name+'/package.json'));
const chartRoot=path.resolve(path.dirname(require.resolve('chart.js')),'..');
fs.mkdirSync(path.join(out,'screens'),{recursive:true});
const fixtures=[{_uid:'test-1',id:'TESTE',processo:'0000001-32.2026.8.06.0001',data:'2026-10-20',mesReferencia:'10',tipo:'Ônus',panjud:'Sim',recusado:'Não',observacoes:'teste'},...['2026-10-16','2026-10-15','2026-10-14','2026-09-30'].map((date,i)=>({_uid:'old-'+i,id:'HIST-'+i,processo:'0000001-32.2026.8.06.0001',data:date,mesReferencia:date.slice(5,7),tipo:i%2?'Acordo':'Êxito',panjud:'Não',recusado:'Não',observacoes:'teste'}))];
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
  await page.goto('https://erp.test/index.html');await page.waitForFunction(()=>typeof window.processarMensagemAurora==='function'&&document.getElementById('sideCount').textContent==='5');
  assert.deepEqual(result.errors,[]);result.checks.push('inicialização completa sem erro');
  const core=await page.evaluate(()=>JSON.stringify(calculate()));
  const themes=await page.evaluate(()=>Object.keys(ERPTheme.themes));assert.equal(themes.length,11);
  for(const width of [1366,375]){
   await page.setViewportSize({width,height:width===375?812:900});
   for(const theme of themes){
    await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:false}),theme);
    await page.locator('#erpSummaryOpen').click();await page.locator('#erpSummaryDialog').waitFor({state:'visible'});
    const geometry=await page.locator('#erpSummaryDialog').evaluate(d=>{const r=d.getBoundingClientRect(),copy=d.querySelector('#erpSummaryCopy').getBoundingClientRect(),body=d.querySelector('.summary-body');return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,client:d.clientWidth,scroll:d.scrollWidth,copyTop:copy.top,copyBottom:copy.bottom,bodyClient:body.clientWidth,bodyScroll:body.scrollWidth,fg:getComputedStyle(d).color,bg:getComputedStyle(d).backgroundColor,font:getComputedStyle(d).fontFamily}});
    assert.ok(geometry.left>=0&&geometry.right<=width+1&&geometry.top>=0&&geometry.bottom<=(width===375?812:900)+1,theme+' dialog fora da tela');
    assert.ok(geometry.scroll<=geometry.client+1,theme+' overflow dialog');assert.ok(geometry.bodyScroll<=geometry.bodyClient+1,theme+' overflow body');assert.ok(geometry.copyBottom<=geometry.bottom&&geometry.copyTop>=geometry.top,theme+' ação fora da tela');
    await page.screenshot({path:path.join(out,'screens',`${theme}-${width}.png`)});
    result.themes.push({theme,viewportWidth:width,...geometry});
    await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'erpSummaryOpen');assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),core);
   }
  }
  result.checks.push('22 combinações de tema/tamanho: sem overflow e ação de cópia visível');
  await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>ERPTheme.apply({...ERPTheme.state,theme:'original'}));
  await page.locator('#erpSummaryOpen').click();assert.equal(state.groq.length,0);result.checks.push('abrir e trocar temas não chamam Groq');
  await page.locator('label').filter({has:page.locator('[name=erpSummaryMode][value=detailed]')}).click();await page.locator('#erpSummaryGenerate').click();await page.waitForFunction(()=>document.getElementById('erpSummarySource').textContent==='Detalhado · Aurora AI');
  assert.equal(state.summaryAttempts,2);assert.equal(state.groq[1].request.max_completion_tokens,4096);
  assert.ok((await page.locator('#erpSummaryPreview').inputValue()).includes('A meta mensal ainda não foi atingida.'));
  assert.equal(state.groq[0].request.response_format.json_schema.strict,true);
  result.checks.push('resposta truncada recuperada em uma tentativa; negação válida exibida no relatório');
  const req=state.groq[0];assert.ok(req.auth.includes('gsk_test_only'));assert.ok(!req.request.tools);const payload=JSON.parse(req.request.messages.at(-1).content);assert.ok(!JSON.stringify(payload).includes('0000001'));assert.ok(!JSON.stringify(payload).includes('HIST-'));assert.equal(payload.includeFinance,false);result.checks.push('Aurora reutiliza transporte e chave: apenas agregados, sem ferramentas');
  await page.locator('#erpSummaryClose').click();await page.evaluate(()=>processarMensagemAurora('Consulte indicadores.',false));assert.ok(await page.locator('#chatMessages').textContent().then(t=>t.includes('Consulta concluída no teste.')));assert.ok(state.groq.at(-1).request.tools);result.checks.push('chat continua separado do relatório');
  await page.locator('#erpSummaryOpen').click();await page.evaluate(()=>{window.clipboardCapture='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.clipboardCapture=text}}})});await page.locator('#erpSummaryPreview').fill('  *Resumo revisado*\nOlá 👋  ');await page.locator('#erpSummaryCopy').click();assert.equal(await page.evaluate(()=>window.clipboardCapture),'  *Resumo revisado*\nOlá 👋  ');await page.locator('#erpSummaryClose').click();result.checks.push('clipboard recebe exatamente a prévia');
  // CRUD e CNJ usando formulário real, com API isolada.
  await page.locator('#idCaso').fill('TESTE-PATCH');await page.locator('#numProcesso').fill('0000001-00.2026.8.06.0001');await page.locator('#processForm').evaluate(f=>f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));await page.locator('.swal2-confirm').click();assert.equal(state.rows.length,5);result.checks.push('CNJ inválido continua bloqueado');
  await page.locator('#numProcesso').fill('0000001-32.2026.8.06.0001');await page.locator('#btnSubmit').click();await page.waitForFunction(()=>document.getElementById('sideCount').textContent==='6');const record=state.rows.find(r=>r.id==='TESTE-PATCH');assert.ok(record);
  await page.evaluate(id=>startEdit(id),record._uid);await page.locator('#observacoes').fill('Edição de teste');await page.locator('#btnSubmit').click();await page.waitForFunction(()=>document.getElementById('formTitle').textContent==='Novo registro');assert.equal(state.rows.find(r=>r._uid===record._uid).observacoes,'Edição de teste');
  const deletion=page.evaluate(id=>deleteRecord(id),record._uid);await page.locator('.swal2-confirm').click();await deletion;assert.equal(state.rows.length,5);result.checks.push('cadastro, edição e exclusão preservados');
  await page.locator('#metaInput').fill('15');await page.waitForTimeout(1050);assert.equal(state.goals['10'],15);await page.locator('#btnRefresh').click();await page.waitForFunction(()=>document.getElementById('sideStatus').textContent==='Online');result.checks.push('meta e sincronização preservadas');
  // Teclado, menor viewport e modo arquivo local (bundle clássico).
  await page.setViewportSize({width:320,height:568});
  await page.locator('#erpSummaryOpen').click();
  await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'erpSummaryCopy');
  await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'erpSummaryClose');
  await page.locator('#erpSummaryPeriod').selectOption('custom');
  if(await page.locator('#erpSummaryConfirm').isVisible())await page.locator('#erpSummaryReplace').click();
  await page.locator('label').filter({has:page.locator('[name=erpSummaryMode][value=detailed]')}).click();
  const small=await page.locator('#erpSummaryCopy').boundingBox();assert.ok(small.y>=0&&small.y+small.height<=568);
  await page.locator('#erpSummaryClose').click();result.checks.push('320×568: intervalo personalizado/detalhado e ciclo de foco acessíveis');
  await page.goto(require('node:url').pathToFileURL(path.join(root,'index.html')).href);
  await page.waitForFunction(()=>typeof window.AuroraSummaryAI?.generate==='function'&&document.getElementById('sideCount').textContent==='5');
  assert.ok(await page.locator('script[src$="agent.bundle.js"]').count());
  await page.locator('#erpSummaryOpen').click();await page.locator('label').filter({has:page.locator('[name=erpSummaryMode][value=detailed]')}).click();
  await page.locator('#erpSummaryGenerate').click();await page.waitForFunction(()=>document.getElementById('erpSummarySource').textContent==='Detalhado · Aurora AI');
  result.checks.push('file://: bundle clássico carrega e gera resumo via transporte simulado');
  assert.deepEqual(result.errors,[]);
  fs.writeFileSync(path.join(out,'browser-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({checks:result.checks,themes:result.themes.length,errors:result.errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(out,'browser-error.json'),JSON.stringify({error:e.message,...result},null,2));process.exitCode=1});
