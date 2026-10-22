const {test}=require('node:test'),assert=require('node:assert/strict');
const {environment,row,history}=require('./achievements-fixtures.cjs');
const {C,E}=environment(),today='2035-12-31';
const evaluate=rows=>E.evaluate(E.aggregate(rows,today));
test('catálogo: 70 níveis, 350 missões, títulos/ícones/IDs/condições únicos',()=>{
  assert.deepEqual(Array.from(C.validate()),[]);assert.equal(C.levels.length,70);
  assert.equal(C.levels.flatMap(l=>l.missions).length,350);assert.equal(C.levels[0].title,'Novato');assert.equal(C.levels[69].title,'Lenda da Aurora');
  assert.ok(Object.isFrozen(C.levels[0].missions[0]));
});
test('validador detecta métrica ausente, operador inválido e alvo impossível',()=>{
  for(const change of [m=>m.metric='missing',m=>m.operator='lt',m=>m.target=-2,m=>{m.metric='types';m.target=4;}]) {
    const levels=structuredClone(C.levels);change(levels[0].missions[0]);assert.ok(C.validate(levels).length);
  }
});
test('validador detecta ciclo, IDs/títulos/condições repetidos e pré-requisito inválido',()=>{
  const changes=[ls=>ls[1].title=ls[0].title,ls=>ls[1].missions[0].id=ls[0].missions[0].id,ls=>ls[1].prerequisite=ls[1].id,ls=>ls[1].missions[0].target=5,
    ls=>{const m=ls[0].missions[0];m.operator='all';m.conditions=[m,m];}];
  for(const change of changes){const ls=structuredClone(C.levels);change(ls);assert.ok(C.validate(ls).length);}
});
test('sem dados inicia no nível 1 com cinco missões pendentes',()=>{
  const s=evaluate([]);assert.equal(s.currentLevel,1);assert.equal(s.current.done,0);assert.equal(s.finished,false);assert.equal(s.levels[1].locked,true);
});
test('quatro missões completas não liberam o segundo nível; quinta libera imediatamente',()=>{
  const rows=Array.from({length:5},(_,i)=>row('2026-10-20',{_uid:String(i)}));
  const a=evaluate(rows);assert.equal(a.currentLevel,1);assert.equal(a.current.done,4);
  rows[4].data='2026-10-19';const b=evaluate(rows);assert.equal(b.currentLevel,2);assert.ok(b.levels[0].complete);
});
test('uma confirmação pendente bloqueia nível mesmo com requisitos futuros já alcançados',()=>{
  const s=evaluate(history(1000).map(r=>({...r,panjud:'Não'})));
  assert.equal(s.currentLevel,1);assert.equal(s.current.done,4);
  const future=s.levels[20].missions[0];assert.ok(future.met);assert.equal(future.unlocked,false);assert.equal(future.state,'requisito-alcancado');
});
test('reconhecimento retroativo percorre vários níveis numa avaliação',()=>{
  const s=evaluate(history(1000));assert.ok(s.currentLevel>=25);assert.ok(s.completedMissions>100);
  assert.equal(s.levels[s.currentLevel-2].complete,true);assert.equal(s.levels[s.currentLevel].locked,true);
});
test('nível 70 pode ser concluído por histórico real e nunca existe nível 71',()=>{
  const s=evaluate(history(11000));assert.equal(s.currentLevel,70);assert.equal(s.finished,true);assert.equal(s.completedMissions,350);assert.equal(s.current.done,5);assert.equal(s.levels.length,70);
});
test('carteira com somente um tipo continua capaz de concluir toda a jornada',()=>{
  const s=evaluate(history(11000,10,true));assert.equal(s.finished,true);assert.equal(s.stats.acordo,0);assert.equal(s.stats.exito,0);
});
test('curva: todos os níveis alcançáveis com dez registros por dia, sem saltos > 700 registros',()=>{
  const rows=history(11000),first=Array(71).fill(null);let previous=1;
  for(let count=0;count<=11000;count+=50){const s=evaluate(rows.slice(0,count));assert.ok(s.currentLevel>=previous);previous=s.currentLevel;for(let l=1;l<=s.currentLevel;l++)if(first[l]===null)first[l]=count;if(s.finished)break;}
  for(let l=2;l<=70;l++){assert.notEqual(first[l],null);assert.ok(first[l]-first[l-1]<=700,'salto no nível '+l);}
});
test('todos os 350 alvos possuem evidência concreta em histórico construtivo',()=>{
  const s=evaluate(history(11000));for(const l of s.levels)for(const m of l.missions){assert.ok(m.met,m.id);assert.equal(m.percent,100);}
});
test('não une meses nem anos com mesmo número; semana usa segunda-feira absoluta',()=>{
  const a=E.aggregate([row('2025-01-01'),row('2026-01-01'),row('2026-02-01')],today).stats;
  assert.equal(a.monthly,1);assert.equal(a.months,3);assert.equal(a.annual,2);assert.equal(a.years,2);
  const b=E.aggregate([row('2025-12-29'),row('2026-01-04'),row('2026-01-05')],today).stats;
  assert.equal(b.weekly,2);assert.equal(b.weeks,2);assert.equal(E.monday('2026-01-04'),'2025-12-29');
});
test('datas inválidas e futuras excluídas de todas as métricas; bissexto válido',()=>{
  const a=E.aggregate([row('2026-02-30'),row('2025-02-29'),row('2024-02-29'),row('2026-10-23'),row('x'),row('2026-10-22T21:00:00Z')],'2026-10-22');
  assert.equal(a.stats.total,2);assert.equal(a.quality.invalidDates,3);assert.equal(a.quality.futureDates,1);
  assert.throws(()=>E.aggregate([],'2026-02-30'));
});
test('mesReferencia não altera semanas, meses, anos ou total de conquistas',()=>{
  const a=E.aggregate([row('2025-04-20',{mesReferencia:'12'}),row('2025-04-21',{mesReferencia:'01'})],today).stats;
  assert.equal(a.months,1);assert.equal(a.monthly,2);
});
test('identidade é _uid; mesmo CNJ e mesmo ID de caso não eliminam registros legítimos',()=>{
  const a=row('2026-01-01',{_uid:'a',id:'same',processo:'123'}),b={...a,_uid:'b'};
  const s=E.aggregate([a,b,{...a}],today);assert.equal(s.stats.total,2);assert.equal(s.quality.duplicateRows,1);
});
test('conflito de versões de um mesmo _uid é conservador e independente da ordem',()=>{
  const a=row('2026-01-01',{_uid:'a'}),b={...a,panjud:'Não'};
  for(const rows of [[a,b],[b,a]]){const s=E.aggregate(rows,today);assert.equal(s.stats.total,0);assert.equal(s.quality.conflictingUids,1);}
});
test('sem _uid preserva linhas distintas e evita contar a mesma referência duas vezes',()=>{
  const a=row(),s=E.aggregate([a,a,{...a}],today);assert.equal(s.stats.total,2);assert.equal(s.quality.duplicateRows,1);
});
test('datas em conflito não podem criar produção dupla',()=>{
  const a=row('2025-01-01',{_uid:'a'});assert.equal(E.aggregate([a,{...a,data:'2026-01-01'}],today).stats.total,0);
});
test('status literais: recusa, conflito, status inválido ou ausente não viram confirmação',()=>{
  const rows=[row(),row(undefined,{recusado:'Sim'}),row(undefined,{panjud:'Não'}),row(undefined,{panjud:'sim'}),row(undefined,{recusado:''}),row(undefined,{panjud:' Sim '})];
  const s=E.aggregate(rows,today);assert.equal(s.stats.total,6);assert.equal(s.stats.confirmed,1);assert.equal(s.quality.statusConflicts,1);
});
test('tipos válidos, mínimo por tipo e diversidade no mesmo mês',()=>{
  const s=E.aggregate(['Ônus','Acordo','Êxito','Êxito','Outro','constructor'].map(tipo=>row(undefined,{tipo})),today);
  assert.equal(s.stats.types,3);assert.equal(s.stats.exito,2);assert.equal(s.stats.minType,1);assert.equal(s.stats.diverseMonths,1);assert.equal(s.quality.unknownTypes,2);
});
test('melhor sequência histórica atravessa fim de semana e ano, sem exigir sábado/domingo',()=>{
  const dates=['2025-12-29','2025-12-30','2025-12-31','2026-01-01','2026-01-02','2026-01-03','2026-01-05','2026-10-20'];
  const a=E.aggregate(dates.map(d=>row(d)),today);assert.equal(a.stats.streak,6);assert.equal(a.stats.days,8);
  assert.equal(E.aggregate(dates.filter(d=>d!=='2026-01-01').map(d=>row(d)),today).stats.streak,3);
});
test('recordes e repetição de períodos usam todos os registros válidos e datas distintas',()=>{
  const s=E.aggregate(history(60,10),today).stats;
  assert.equal(s.daily,10);assert.equal(s.weekly,50);assert.equal(s.monthly,60);assert.equal(s.annual,60);assert.equal(s.days,6);assert.equal(s.weeks5,2);assert.equal(s.months10,1);assert.equal(s.confirmedDays,6);
});
test('E usa o mínimo e OU usa o máximo sem somar unidades diferentes',()=>{
  const leaf=(metric,target)=>({operator:'gte',metric,target}),stats={total:50,days:2};
  const a=E.evaluateRule({operator:'all',conditions:[leaf('total',100),leaf('days',10)]},stats);
  const b=E.evaluateRule({operator:'any',conditions:[leaf('total',100),leaf('days',10)]},stats);
  assert.equal(a.percent,20);assert.equal(b.percent,50);assert.equal(a.met,false);
});
test('edição e exclusão reduzem progresso; restaurar não exige repetir trabalho',()=>{
  const rows=history(1000),before=evaluate(rows),after=evaluate(rows.slice(0,5));assert.ok(after.currentLevel<before.currentLevel);assert.equal(evaluate(rows).currentLevel,before.currentLevel);
  const corrected=rows.map(r=>({...r,panjud:'Não'}));assert.equal(evaluate(corrected).currentLevel,1);
});
test('cache evita agregação repetida e detecta edição histórica in-place e mudança de dia',()=>{
  const c=E.createCache(),rows=history(20),a=c.get(rows,today);assert.equal(c.get(rows,today),a);assert.equal(c.builds,1);
  rows[0].panjud='Não';assert.notEqual(c.get(rows,today),a);assert.equal(c.builds,2);
  c.get(rows,'2036-01-01');assert.equal(c.builds,3);rows[0].observacoes='irrelevante';c.get(rows,'2036-01-01');assert.equal(c.builds,3);
});
test('cache distingue referência duplicada de registros sem identidade distintos',()=>{
  const c=E.createCache(),a=row();assert.equal(c.get([a,a],today).stats.total,1);assert.equal(c.get([a,{...a}],today).stats.total,2);
});
test('aviso histórico único e recarregamento sem nova animação',()=>{
  const s=evaluate(history(100)),a=E.transition(null,s);assert.equal(a.notice,'history');assert.equal(E.transition(a.state,s).notice,'');
});
test('redução e restauração de dados não anunciam subida novamente',()=>{
  const high=evaluate(history(1000)),low=evaluate(history(20));let t=E.transition(null,high);t=E.transition(t.state,low);assert.equal(t.notice,'recalculated');t=E.transition(t.state,high);assert.equal(t.notice,'');assert.equal(t.state.lastRank,high.completedLevels);
});
test('mudança de catálogo revalida dados, estado antigo não concede nível',()=>{
  const low=evaluate(history(20)),t=E.transition({version:'1',bestRank:70,animations:false},low);assert.equal(t.notice,'recalculated');assert.equal(t.state.bestRank,low.completedLevels);assert.equal(t.state.animations,false);
});
test('estado corrompido não quebra cálculo; armazenamento não contém processos',()=>{
  const s=evaluate(history(20));for(const raw of [null,{},'bad',{version:C.VERSION,bestRank:999}]){const t=E.transition(raw,s);assert.equal(t.state.lastRank,s.completedLevels);assert.ok(!JSON.stringify(t.state).includes('_uid'));}
});
test('sem dados na carga inicial aguarda histórico em vez de premiar nível vazio',()=>{
  let t=E.transition(null,evaluate([]));assert.equal(t.notice,'');assert.equal(t.state.initialized,false);t=E.transition(t.state,evaluate(history(100)));assert.equal(t.notice,'history');
});
test('último nível concluído produz um único aviso de conclusão',()=>{
  const a=E.transition(null,evaluate(history(9000))),b=E.transition(a.state,evaluate(history(11000)));assert.equal(b.notice,'complete');assert.equal(E.transition(b.state,evaluate(history(11000))).notice,'');
});
test('fonte congelada não é alterada e dados pessoais não aparecem no resultado agregado',()=>{
  const rows=history(30).map(r=>Object.freeze({...r,processo:'SEGREDO-CNJ',observacoes:'DADO-SENSIVEL'}));Object.freeze(rows);const before=JSON.stringify(rows),s=evaluate(rows);
  assert.equal(JSON.stringify(rows),before);assert.ok(!JSON.stringify(s).includes('SEGREDO'));assert.ok(!JSON.stringify(s).includes('DADO-SENSIVEL'));
});
test('100 mil linhas: sem limites de spread, totais exatos e cache reutilizável',()=>{
  const rows=Array.from({length:100000},(_,i)=>row('2026-01-01',{_uid:'n'+i})),c=E.createCache();const start=performance.now(),s=c.get(rows,today);console.log('AA2 100k aggregation ms:',Math.round(performance.now()-start));
  assert.equal(s.stats.total,100000);assert.equal(s.stats.daily,100000);assert.equal(c.get(rows,today),s);assert.equal(c.builds,1);
});
test('avaliação cooperativa equivale à síncrona e cede execução entre lotes',async()=>{
  const rows=history(3000);let yields=0;
  const result=await E.evaluateAsync(rows,today,{yieldTask:async()=>{yields++;}});
  assert.ok(yields>=6);assert.equal(JSON.stringify(result),JSON.stringify(evaluate(rows)));
});
test('avaliação cooperativa cancelada não entrega resultado obsoleto',async()=>{
  const controller=new AbortController();let yields=0;
  await assert.rejects(E.evaluateAsync(history(3000),today,{signal:controller.signal,yieldTask:async()=>{if(++yields===2)controller.abort();}}),{name:'AbortError'});
});
