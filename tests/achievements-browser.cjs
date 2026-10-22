const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const{chromium:pw}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.ERP_TEST_OUTPUT||path.join(__dirname,'.artifacts'));
const dependency=name=>path.dirname(require.resolve(name+'/package.json'));
const chartRoot=path.resolve(path.dirname(require.resolve('chart.js')),'..');
fs.mkdirSync(path.join(out,'screens'),{recursive:true});
const {history}=require('./achievements-fixtures.cjs'); const fixtures=history(950);
const state={rows:structuredClone(fixtures),goals:{'10':10,'09':10},calls:[],groq:[],summaryAttempts:0};
const result={checks:[],themes:[],errors:[],warnings:[],performance:[]};
(async()=>{
 const browser=await pw.launch({executablePath:process.env.ERP_CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();
 page.on('pageerror',e=>result.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());if(m.type()==='warning')result.warnings.push(m.text())});
 await ctx.addInitScript(()=>{
  const D=Date;window.Date=class extends D{constructor(...args){super(...(args.length?args:['2026-10-22T15:00:00Z']))}static now(){return D.now()}};
  localStorage.setItem('ultimo_mes_selecionado','10');
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
  await page.goto('https://erp.test/index.html');await page.waitForFunction(()=>window.AuroraAchievements?.getSnapshot()?.stats.total===950);
  assert.equal(await page.evaluate(()=>AuroraAchievementCatalog.validate().length),0);
  assert.equal(await page.locator('#auroraAchievements .aa-mission').count(),0);
  assert.equal(await page.locator('#aa-current-progress').count(),1);
  assert.ok((await page.locator('#aa-notice').textContent()).includes('histórico foi reconhecido'));
  assert.equal(state.groq.length,0);const networkCount=state.calls.length;
  const themes=await page.evaluate(()=>Object.keys(ERPTheme.themes));assert.equal(themes.length,11);
  for(const count of [0,950,5750,11000]) {
    state.rows=history(count);
    await page.evaluate(rows=>{bd=rows;renderAll();refreshAuroraLive({confirmed:true});},state.rows);
    const level=await page.evaluate(()=>AuroraAchievements.getSnapshot().currentLevel);
    assert.equal(level,count===0?1:count===950?30:count===5750?60:70);
    const protectedState=await page.evaluate(()=>({data:JSON.stringify(bd),calc:JSON.stringify(calculate())}));
    for(const width of [1366,375]) {
      const height=width===375?812:900;await page.setViewportSize({width,height});
      for(const theme of themes) {
        await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:false}),theme);
        await page.locator('#aa-current-heading').scrollIntoViewIfNeeded();
        const card=await page.locator('#auroraAchievements').evaluate(e=>{
          const sections=[...e.parentElement.children],radar=sections[3],trend=sections[4];
          const r=e.getBoundingClientRect(),before=radar.getBoundingClientRect().height;
          e.style.display='none';const without=radar.getBoundingClientRect().height;e.style.removeProperty('display');
          return{c:e.clientWidth,s:e.scrollWidth,h:r.height,radar:before,radarWithout:without,trend:trend.getBoundingClientRect().height,firstRow:sections[0].getBoundingClientRect().height};
        });
        assert.ok(card.s<=card.c+1,theme+' card overflow');
        assert.ok(card.h<=270,theme+' resumo deve permanecer compacto: '+card.h);
        if(width===1366){assert.ok(card.radar-card.radarWithout<=32,theme+' conquistas não devem esticar a linha');assert.ok(card.radar<=card.firstRow+40,theme+' radar com altura excessiva');}
        assert.equal(await page.locator('#sideAuroraCard .aa-mission').count(),0);
        await page.locator('#sideAuroraCard .aurora-live-grid').screenshot({path:path.join(out,'screens',`compact-${theme}-${width}-level${level}.png`)});
        await page.locator('#auroraAchievementsOpen').click();await page.locator('#auroraAchievementsDialog').waitFor({state:'visible'});
        assert.equal(await page.locator('#auroraAchievementsCatalog .aa-mission').count(),5);
        const g=await page.locator('#auroraAchievementsDialog').evaluate(d=>{const r=d.getBoundingClientRect(),body=d.querySelector('.aurora-catalog-body');return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,client:body.clientWidth,scroll:body.scrollWidth,fg:getComputedStyle(d).color,bg:getComputedStyle(d).backgroundColor};});
        assert.ok(g.left>=0&&g.right<=width+1&&g.top>=0&&g.bottom<=height+1,theme+' bounds');assert.ok(g.scroll<=g.client+1,theme+' dialog overflow');
        await page.screenshot({path:path.join(out,'screens',`aa-${theme}-${width}-level${level}.png`)});result.themes.push({theme,width,level,...g,card});
        await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'auroraAchievementsOpen');
        assert.equal(await page.evaluate(()=>JSON.stringify(bd)),protectedState.data);assert.equal(await page.evaluate(()=>JSON.stringify(calculate())),protectedState.calc);
      }
    }
  }
  result.checks.push('88 layouts: 11 temas × desktop/mobile × níveis 1, 30, 60 e 70; card sem missões e até 270px; altura do Radar comparada sem o card; cinco missões na janela; foco/rolagem e cálculos preservados');
  await page.setViewportSize({width:320,height:568});await page.locator('#auroraAchievementsOpen').click();
  await page.locator('#aa-level-select').selectOption('1');assert.equal(await page.locator('#aa-prev').isDisabled(),true);await page.locator('#aa-level-select').selectOption('70');assert.equal(await page.locator('#aa-next').isDisabled(),true);
  await page.locator('.aa-method summary').click();await page.locator('.aa-method summary').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'auroraAchievementsClose');
  await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.tagName),'SUMMARY');
  const narrow=await page.locator('.aurora-catalog-body').evaluate(e=>({c:e.clientWidth,s:e.scrollWidth}));assert.ok(narrow.s<=narrow.c+1);
  await page.screenshot({path:path.join(out,'screens','aa-320-method.png')});
  await page.locator('#aa-animations').uncheck();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('aurora_achievements_ui_v2')).animations),false);await page.locator('#auroraAchievementsClose').click();
  state.rows=history(1000).map(r=>({...r,panjud:'Não'}));await page.evaluate(rows=>{bd=rows;refreshAuroraLive({confirmed:true});},state.rows);
  await page.locator('#auroraAchievementsOpen').click();await page.locator('#aa-level-select').selectOption('20');assert.ok((await page.locator('#auroraAchievementsCatalog').textContent()).includes('aguardando desbloqueio'));await page.locator('#auroraAchievementsClose').click();
  // A edição histórica não altera métricas do ano, mas precisa atualizar conquistas.
  state.rows=history(950);await page.evaluate(rows=>{bd=rows;refreshAuroraLive({confirmed:true});},state.rows);assert.equal(await page.evaluate(()=>AuroraAchievements.getSnapshot().currentLevel),30);
  await page.evaluate(()=>{bd.forEach(r=>r.panjud='Não');refreshAuroraLive({confirmed:true});});assert.equal(await page.evaluate(()=>AuroraAchievements.getSnapshot().currentLevel),1);
  await page.evaluate(rows=>{bd=rows;refreshAuroraLive({confirmed:true});},state.rows);assert.equal(await page.locator('#aa-notice').evaluate(e=>e.hidden),true);
  await page.reload();await page.waitForFunction(()=>window.AuroraAchievements?.getSnapshot()?.stats.total===950);assert.equal(await page.locator('#aa-notice').evaluate(e=>e.hidden),true);
  result.checks.push('320px, teclado circular, níveis bloqueados, edição de anos anteriores, redução/restauração, recarga e preferência persistida');
  for(const n of [10000,100000]) {
    const rows=Array.from({length:n},(_,i)=>({_uid:'perf-'+i,data:'2026-01-01',tipo:'Ônus',panjud:'Sim',recusado:'Não'}));
    const perf=await page.evaluate(rows=>{const c=AuroraAchievementEngine.createCache();let t=performance.now();c.get(rows,'2026-10-22');const first=performance.now()-t;t=performance.now();c.get(rows,'2026-10-22');return{firstMs:first,cachedMs:performance.now()-t};},rows);result.performance.push({records:n,...perf});
  }
  let ticks=0;
  const large=Array.from({length:25000},(_,i)=>({_uid:'large-'+i,data:'2026-01-01',tipo:'Ônus',panjud:'Sim',recusado:'Não'}));
  await page.evaluate(rows=>{window.aaTicks=0;window.aaTickTimer=setInterval(()=>aaTicks++,5);AuroraAchievements.refresh(rows,'2026-10-22',true);},large);
  await page.waitForFunction(()=>AuroraAchievements.getSnapshot()?.stats.total===25000);
  ticks=await page.evaluate(()=>{clearInterval(aaTickTimer);return aaTicks;});assert.ok(ticks>=3,'avaliação cooperativa mantém eventos ativos');
  await page.evaluate(rows=>AuroraAchievements.refresh(rows,'2026-10-22',true),state.rows);
  result.checks.push('histórico amplo avaliado em lotes, com eventos de interface ativos durante o cálculo');
  assert.equal(state.groq.length,0);
  await page.goto(require('node:url').pathToFileURL(path.join(root,'index.html')).href);await page.waitForFunction(()=>window.AuroraAchievements?.getSnapshot()?.stats.total===950);await page.locator('#auroraAchievementsOpen').click();await page.locator('#aa-level-select').selectOption('70');await page.locator('#auroraAchievementsClose').click();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1366,height:900});
  await page.evaluate(()=>{localStorage.removeItem('aurora_achievements_ui_v2');});
  // Novo contexto para observar primeira animação sem a memória da sessão anterior.
  await page.reload();await page.waitForFunction(()=>window.AuroraAchievements?.getSnapshot()?.stats.total===950);
  await page.evaluate(()=>ERPTheme.apply({...ERPTheme.state,effects:true}));
  assert.equal(await page.locator('#aa-current-heading').evaluate(e=>getComputedStyle(e).animationName),'aa-recognition');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('#aa-current-heading').evaluate(e=>getComputedStyle(e).animationName),'none');
  for(const theme of themes){await page.evaluate(theme=>ERPTheme.apply({...ERPTheme.state,theme,effects:true}),theme);await page.locator('#auroraAchievementsOpen').click();await page.locator('#auroraAchievementsClose').click();}
  result.checks.push('file://, movimento reduzido e normal, onze temas com efeitos ativos, nenhuma chamada Groq para conquistas, desempenho 10 mil/100 mil linhas');
  assert.deepEqual(result.errors,[]);assert.deepEqual(result.warnings,[]);
  fs.writeFileSync(path.join(out,'achievements-browser-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({checks:result.checks,layouts:result.themes.length,performance:result.performance,errors:result.errors,warnings:result.warnings},null,2));
 } catch(e) {await page.screenshot({path:path.join(out,'aa-failure.png')}).catch(()=>{});throw e;} finally {await browser.close();}
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(out,'achievements-browser-error.json'),JSON.stringify({error:e.message,...result},null,2));process.exitCode=1});
