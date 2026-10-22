const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom'),{history}=require('./achievements-fixtures.cjs');
function setup(saved=null) {
  const dom=new JSDOM(fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),{url:'https://erp.test',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;w.matchMedia=()=>({matches:false});
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.localStorage.setItem('business-data','preservado');if(saved)w.localStorage.setItem('aurora_achievements_ui_v2',JSON.stringify(saved));
  for(const name of ['catalog','engine','view'])w.eval(fs.readFileSync(path.join(__dirname,'../js/aurora/achievements/'+name+'.js'),'utf8'));
  w.AuroraAchievements.bind();
  const refresh=(rows,confirmed=true)=>w.AuroraAchievements.refresh(rows,'2026-10-22',confirmed);
  return {dom,w,doc:w.document,refresh};
}
test('card compacto com resumo acessível; cinco missões somente na janela existente',()=>{
  const e=setup();e.refresh(history(1000));const d=e.doc;
  assert.equal(d.querySelectorAll('#auroraAchievements .aa-mission').length,0);
  assert.equal(d.querySelectorAll('#auroraAchievements [role=progressbar]').length,1);
  assert.equal(d.querySelector('#auroraAchievementsOpen').textContent.trim(),'Ver Missões ↗');
  assert.equal(d.querySelector('#aa-current-progress').getAttribute('aria-valuenow'),String(e.w.AuroraAchievements.getSnapshot().current.done));
  d.querySelector('#auroraAchievementsOpen').click();
  assert.equal(d.querySelectorAll('#auroraAchievementsCatalog .aa-mission').length,5);
  assert.equal(d.querySelectorAll('#auroraAchievementsCatalog [role=progressbar]').length,5);
  assert.match(d.querySelector('#aa-next-title').textContent,/Próximo: Nível/);
  assert.ok(d.querySelector('#aa-scope').closest('#auroraAchievementsDialog'));
  assert.equal(d.querySelectorAll('#sideAuroraCard .aa-mission').length,0);
  assert.match(d.querySelector('#aa-current-heading').textContent,/NÍVEL/);
  for(const el of d.querySelectorAll('#auroraAchievements [role=progressbar]')){assert.ok(el.getAttribute('aria-valuetext'));assert.ok(Number(el.getAttribute('aria-valuenow'))<=100);}
  assert.equal(e.w.localStorage.getItem('business-data'),'preservado');e.dom.window.close();
});
test('jornada navega até bloqueados, início e fim; apenas cinco missões por vez',()=>{
  const e=setup();e.refresh(history(20));const d=e.doc;d.querySelector('#auroraAchievementsOpen').click();
  assert.equal(d.querySelector('#auroraAchievementsDialog').open,true);
  const select=d.querySelector('#aa-level-select');assert.equal(select.options.length,70);select.value='70';select.dispatchEvent(new e.w.Event('change'));
  assert.match(d.querySelector('#aa-journey-heading').textContent,/Bloqueado/);assert.equal(d.querySelectorAll('#auroraAchievementsCatalog li').length,5);assert.equal(d.querySelector('#aa-next').disabled,true);
  select.value='1';select.dispatchEvent(new e.w.Event('change'));assert.equal(d.querySelector('#aa-prev').disabled,true);
  d.querySelector('#aa-next').click();assert.equal(select.value,'2');d.querySelector('#auroraAchievementsClose').click();assert.equal(d.activeElement.id,'auroraAchievementsOpen');e.dom.window.close();
});
test('requisitos antecipados são exibidos sem conceder nível bloqueado',()=>{
  const e=setup();e.refresh(history(1000).map(r=>({...r,panjud:'Não'})));e.doc.querySelector('#auroraAchievementsOpen').click();
  const select=e.doc.querySelector('#aa-level-select');select.value='20';select.dispatchEvent(new e.w.Event('change'));
  assert.match(e.doc.querySelector('#auroraAchievementsCatalog').textContent,/aguardando desbloqueio/);assert.match(e.doc.querySelector('#auroraAchievementsCount').textContent,/0 de 70/);e.dom.window.close();
});
test('aviso fica restrito à área existente; renderização repetida não o reinicia',()=>{
  const e=setup(),rows=history(100);e.refresh(rows,false);assert.equal(e.doc.querySelector('#aa-notice').hidden,true);e.refresh(rows,true);
  const notice=e.doc.querySelector('#aa-notice');assert.match(notice.textContent,/histórico foi reconhecido/);assert.ok(notice.closest('#sideAuroraCard'));assert.equal(e.doc.querySelectorAll('dialog[open]').length,0);
  const old=notice.textContent;e.refresh(rows,true);assert.equal(notice.textContent,old);assert.equal(e.w.AuroraAchievements.builds,1);assert.equal(e.doc.querySelector('#aa-current-heading').classList.contains('aa-celebrate'),true);e.dom.window.close();
});
test('preferência de animação persiste sem alterar outras chaves',()=>{
  const e=setup();e.refresh(history(100));e.doc.querySelector('#auroraAchievementsOpen').click();const input=e.doc.querySelector('#aa-animations');input.checked=false;input.dispatchEvent(new e.w.Event('change'));
  const state=JSON.parse(e.w.localStorage.getItem('aurora_achievements_ui_v2'));assert.equal(state.animations,false);assert.equal(e.doc.querySelector('#aa-current-heading').classList.contains('aa-celebrate'),false);assert.equal(e.w.localStorage.length,2);e.dom.window.close();
  const next=setup(state);next.refresh(history(100));next.doc.querySelector('#auroraAchievementsOpen').click();assert.equal(next.doc.querySelector('#aa-animations').checked,false);assert.equal(next.doc.querySelector('#aa-notice').hidden,true);next.dom.window.close();
});
test('movimento reduzido mantém mensagem sem animação',()=>{
  const e=setup();e.w.matchMedia=()=>({matches:true});e.refresh(history(20));assert.equal(e.doc.querySelector('#aa-current-heading').classList.contains('aa-celebrate'),false);assert.equal(e.doc.querySelector('#aa-notice').hidden,false);e.dom.window.close();
});
test('LocalStorage indisponível não impede progresso ou consulta',()=>{
  const e=setup();Object.defineProperty(e.w,'localStorage',{get(){throw new Error('denied');}});assert.doesNotThrow(()=>e.refresh(history(20)));assert.doesNotThrow(()=>e.doc.querySelector('#auroraAchievementsOpen').click());e.dom.window.close();
});
test('conteúdo de registros não é interpolado em HTML ou exibido na jornada',()=>{
  const e=setup(),rows=history(20).map(r=>({...r,observacoes:'<img onerror=alert(1)>',processo:'PRIVATE-CNJ'}));e.refresh(rows);e.doc.querySelector('#auroraAchievementsOpen').click();assert.ok(!e.doc.querySelector('#auroraAchievementsDialog').innerHTML.includes('PRIVATE-CNJ'));assert.equal(e.doc.querySelector('#auroraAchievementsDialog img'),null);e.dom.window.close();
});
test('edição histórica atualiza card/jornada e não rouba foco',()=>{
  const e=setup(),rows=history(1000);e.refresh(rows);e.doc.querySelector('#auroraAchievementsOpen').click();const input=e.doc.querySelector('#aa-level-select');input.focus();const before=e.w.AuroraAchievements.getSnapshot().currentLevel;
  rows.forEach(r=>r.panjud='Não');e.refresh(rows);assert.equal(e.w.AuroraAchievements.getSnapshot().currentLevel,1);assert.ok(before>1);assert.equal(e.doc.activeElement,input);e.dom.window.close();
});
test('contratos achievementCatalog/achievements evoluem sem alterar mensagens financeiras',()=>{
  const e=setup();e.w.eval(fs.readFileSync(path.join(__dirname,'../js/aurora/live/insights.js'),'utf8'));e.w.eval(fs.readFileSync(path.join(__dirname,'../js/aurora/live/metrics.js'),'utf8'));
  const rows=history(1000),p=e.refresh(rows),m=e.w.AuroraLiveMetrics.build(rows,{},'2026-10-22'),i=e.w.AuroraLiveInsights.build(m,['radar original'],p);
  assert.equal(i.achievementCatalog.length,350);assert.equal(i.achievements.length,p.completedMissions);assert.equal(i.financial[0].text,'radar original');e.dom.window.close();
});
test('70 emblemas distintos com SVGs locais acessíveis por texto adjacente',()=>{
  const e=setup();const emblems=e.w.AuroraAchievementCatalog.levels.map(l=>e.w.AuroraAchievements.icon(l).outerHTML);assert.equal(new Set(emblems).size,70);assert.ok(emblems.every(x=>x.includes('aria-hidden="true"')));e.dom.window.close();
});
test('resultado atrasado de base ampla é cancelado por uma base nova',async()=>{
  const e=setup(),rows=Array.from({length:21000},(_,i)=>({data:'2026-10-20',_uid:'large-'+i,tipo:'Ônus',panjud:'Sim',recusado:'Não'}));
  e.refresh(rows);assert.equal(e.doc.querySelector('#auroraAchievements').getAttribute('aria-busy'),'true');
  e.refresh(history(20));await new Promise(r=>setTimeout(r,30));
  assert.equal(e.w.AuroraAchievements.getSnapshot().stats.total,20);assert.equal(e.doc.querySelector('#auroraAchievements').hasAttribute('aria-busy'),false);e.dom.window.close();
});
