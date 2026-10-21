const test=require('node:test'),assert=require('node:assert/strict');
const {D,F,CNJ,cnj,raw,snapshot,run,indices}=require('./export-fixtures.cjs');
const cases={
 'sem filtros inclui registros inválidos':[{},[0,1,2,3,4,5,6,7,8]],
 'hoje':[{period:'today'},[0]], 'ontem':[{period:'yesterday'},[1]], 'anteontem':[{period:'beforeYesterday'},[8]],
 'intervalo inclusivo':[{period:'custom',start:'2026-10-18',end:'2026-10-20'},[0,1,8]],
 'intervalo atravessa meses':[{period:'custom',start:'2026-09-30',end:'2026-10-19'},[1,2,8]],
 'intervalo atravessa anos':[{period:'custom',start:'2025-12-31',end:'2026-01-01'},[6,7]],
 'data exata':[{dateOp:'exact',dateA:'2026-10-20'},[0]], 'antes':[{dateOp:'before',dateA:'2026-01-01'},[6]],
 'depois':[{dateOp:'after',dateA:'2026-10-20'},[3]], 'no dia ou antes':[{dateOp:'onBefore',dateA:'2026-01-01'},[6,7]],
 'no dia ou depois':[{dateOp:'onAfter',dateA:'2026-10-20'},[0,3]],
 'entre':[{dateOp:'between',dateA:'2026-10-19',dateB:'2026-10-20'},[0,1]],
 'fora':[{dateOp:'outside',dateA:'2026-01-01',dateB:'2026-10-20'},[3,6]],
 'dia do mês':[{day:'20'},[0]], 'dias selecionados':[{weekdays:['0','2']},[0,8]],
 'dias úteis':[{dayGroup:'weekdays'},[0,1,2,3,6,7]],'sábado':[{dayGroup:'saturday'},[]],'domingo':[{dayGroup:'sunday'},[8]],'fim de semana':[{dayGroup:'weekend'},[8]],
 'ano da data':[{years:['2025']},[6]],
 'referência independente da data':[{reference:['10']},[0,2,3,8]],
 'múltiplas referências':[{reference:['09','12']},[1,6]],
 'referência igual à data':[{referenceRelation:'same'},[0,3,6,7,8]],
 'referência divergente':[{referenceRelation:'different'},[1,2]], 'referência inválida':[{referenceRelation:'invalid'},[4,5]],
 'tipos múltiplos':[{types:['Ônus','Acordo']},[0,1,3,6,7]],'exclusão de tipo':[{excludeTypes:['Êxito']},[0,1,3,4,5,6,7]],
 'tipo legado':[{types:['Legado']},[4]],'tipo ausente':[{types:['__invalid__']},[5]],
 'ID exato':[{idOp:'exact',idValue:'  00001  '},[0,3]],'ID contém':[{idOp:'contains',idValue:'0000'},[0,1,2,3,6,7,8]],
 'ID começa':[{idOp:'starts',idValue:'leg'},[4]],'ID termina':[{idOp:'ends',idValue:'2'},[1]],
 'ID diferente':[{idOp:'notEqual',idValue:'00001'},[1,2,4,5,6,7,8]],'ID não contém':[{idOp:'notContains',idValue:'000'},[4,5]],
 'IDs múltiplos':[{idOp:'list',idValue:'00002,00003\n00008'},[1,2,7]],'ID vazio':[{idOp:'empty'},[5]],'ID preenchido':[{idOp:'filled'},[0,1,2,3,4,6,7,8]],'ID duplicado':[{idOp:'duplicate'},[0,3]],'ID único':[{idOp:'unique'},[1,2,4,6,7,8]],
 'CNJ com máscara':[{cnjOp:'exact',cnjValue:cnj(1)},[0,3]],'CNJ sem máscara':[{cnjOp:'exact',cnjValue:D.digits(cnj(1))},[0,3]],
 'CNJ contém':[{cnjOp:'contains',cnjValue:'.2024.5.'},[6]],'CNJ começa':[{cnjOp:'starts',cnjValue:'0000002'},[1]],'CNJ termina':[{cnjOp:'ends',cnjValue:'1234'},[6]],
 'CNJ diferente':[{cnjOp:'notEqual',cnjValue:cnj(1)},[1,2,4,5,6,7,8]],'CNJ não contém':[{cnjOp:'notContains',cnjValue:'2026'},[4,5,6]],
 'CNJs múltiplos':[{cnjOp:'list',cnjValue:cnj(1)+',\n'+D.digits(cnj(2))},[0,1,3]],'CNJ vazio':[{cnjOp:'empty'},[5]],'CNJ preenchido':[{cnjOp:'filled'},[0,1,2,3,4,6,7,8]],
 'CNJ duplicado':[{cnjOp:'duplicate'},[0,3]],'CNJ único':[{cnjOp:'unique'},[1,2,4,6,7,8]],
 'CNJ válido':[{cnjOp:'valid'},[0,1,2,3,6,7,8]],'CNJ inválido':[{cnjOp:'invalid'},[4,5]],
 'segmentos CNJ':[{cnjYear:'2024',cnjBranch:'5',cnjCourt:'07',cnjOrigin:'1234'},[6]],
 'qualidade OR sem multiplicar linhas':[{quality:['duplicateID','duplicateCNJ','invalidDate']},[0,3,4,5]],
 'data futura':[{quality:['futureDate']},[3]],'tipo desconhecido':[{quality:['unknownType']},[4,5]],
 'status incoerente':[{quality:['statusIssue']},[3,4,5,8]],'essenciais ausentes':[{quality:['missingEssential']},[4,5]],
 'sem problemas':[{quality:['clean']},[6,7]],
 'cinco ou mais filtros':[{period:'month',reference:['10'],types:['Ônus','Acordo'],panjud:'sim',recusado:'nao',idOp:'starts',idValue:'000',obsGroups:[[{op:'contains',value:'garantia'}]]},[0]],
 'combinação contraditória':[{period:'today',dayGroup:'weekend'},[]]
};
for(const [name,[input,expected]]of Object.entries(cases))test(name,()=>assert.deepEqual(indices(input),expected));
for(const field of ['panjud','recusado'])for(const [op,expected]of Object.entries(field==='panjud'?{sim:[0,3,7],nao:[1,2,6],invalid:[4,5,8],notSim:[1,2,4,5,6,8],notNao:[0,3,4,5,7,8],all:[0,1,2,3,4,5,6,7,8]}:{sim:[1,3],nao:[0,2,6,7,8],invalid:[4,5],notSim:[0,2,4,5,6,7,8],notNao:[1,3,4,5],all:[0,1,2,3,4,5,6,7,8]}))test(`${field}: ${op}`,()=>assert.deepEqual(indices({[field]:op}),expected));
for(const [shortcut,expected]of Object.entries({all:[0,1,2,3,4,5,6,7,8],confirmed:[0,3,7],unconfirmed:[1,2,6],refused:[1,3],notRefused:[0,2,6,7,8],pending:[2,6],confirmedNotRefused:[0,7],conflict:[3],incomplete:[4,5,8]}))test('atalho '+shortcut,()=>assert.deepEqual(indices(F.shortcut(F.defaults(),shortcut)),expected));
const periods={today:['2026-10-20','2026-10-20'],yesterday:['2026-10-19','2026-10-19'],beforeYesterday:['2026-10-18','2026-10-18'],last7:['2026-10-14','2026-10-20'],last15:['2026-10-06','2026-10-20'],last30:['2026-09-21','2026-10-20'],last60:['2026-08-22','2026-10-20'],last90:['2026-07-23','2026-10-20'],week:['2026-10-19','2026-10-25'],previousWeek:['2026-10-12','2026-10-18'],month:['2026-10-01','2026-10-31'],previousMonth:['2026-09-01','2026-09-30'],quarter:['2026-10-01','2026-12-31'],previousQuarter:['2026-07-01','2026-09-30'],semester:['2026-07-01','2026-12-31'],previousSemester:['2026-01-01','2026-06-30'],year:['2026-01-01','2026-12-31'],previousYear:['2025-01-01','2025-12-31']};
for(const [period,expected]of Object.entries(periods))test('limites do período '+period,()=>assert.deepEqual(F.range({...F.defaults(),period},snapshot.today).map(D.fromOrdinal),expected));
test('períodos cruzam ano e ano bissexto',()=>{assert.deepEqual(F.range({...F.defaults(),period:'previousMonth'},'2026-01-01').map(D.fromOrdinal),['2025-12-01','2025-12-31']);assert.deepEqual(F.range({...F.defaults(),period:'previousMonth'},'2024-03-01').map(D.fromOrdinal),['2024-02-01','2024-02-29']);});
const obsCases=[['empty','',[2,5]],['filled','',[0,1,3,4,6,7,8]],['contains','alvara',[0]],['notContains','garantia',[1,2,4,5,6,7]],['exact','garantia',[8]],['starts','BLOQUEIO',[0]],['ends','ação',[1,7]],['anyWords','garantia custas',[0,3,6,8]],['allWords','garantia alvará',[0]],['noWords','garantia custas',[1,2,4,5,7]],['phrases','alvará pendente\nliberado; ação',[0,1]]];
for(const [op,value,expected]of obsCases)test('observações '+op,()=>assert.deepEqual(indices({obsGroups:[[{op,value}]]}),expected));
test('acentuação opcional e case insensitive',()=>{assert.deepEqual(indices({ignoreAccents:false,obsGroups:[[{op:'contains',value:'alvara'}]]}),[]);assert.deepEqual(indices({ignoreAccents:false,obsGroups:[[{op:'contains',value:'ALVARÁ'}]]}),[0]);});
test('(garantia OU bloqueio) E NÃO liberado',()=>assert.deepEqual(indices({obsGroups:[[{op:'contains',value:'garantia'},{op:'contains',value:'bloqueio'}],[{op:'contains',value:'liberado',not:true}]]}),[0,8]));
test('palavras não são substrings ou expressões regulares',()=>{assert.deepEqual(indices({obsGroups:[[{op:'anyWords',value:'garant'}]]}),[]);assert.deepEqual(indices({obsGroups:[[{op:'contains',value:'.*'}]]}),[]);});
test('datas inválidas, anos, timestamps: não desloca calendário',()=>{assert.equal(D.date('2026-02-30'),null);assert.equal(D.date('2026-13-01'),null);assert.equal(D.date('2026-10-20T23:59:00-03:00').iso,'2026-10-20');assert.equal(D.date('29/02/2024').iso,'2024-02-29');assert.equal(D.date('2025-02-29'),null);});
test('condição incompleta não amplia seleção silenciosamente',()=>{for(const input of [{period:'custom',start:'2026-10-21',end:'2026-10-20'},{cnjOp:'contains',cnjValue:'abc'},{dateOp:'between',dateA:'2026-01-01'},{idOp:'exact'},{cnjCourt:'6'},{day:'32'},{obsGroups:[[{op:'contains',value:''}]]}]){const r=run(input);assert.ok(r.errors.length);assert.equal(r.rows.length,0);}});
test('ordenação e desempate, sem mutação da base',()=>{const before=JSON.stringify(raw);assert.deepEqual(indices({sort:'date',direction:'desc'}),[3,0,1,8,2,7,6,4,5]);assert.deepEqual(indices({sort:'id'}),[5,0,3,1,2,6,7,8,4]);assert.deepEqual(indices({sort:'type',sort2:'date',direction2:'desc',types:['Ônus']}),[3,0,6]);for(const k of Object.keys(F.sortLabels))assert.equal(run({sort:k}).rows.length,raw.length);assert.equal(JSON.stringify(raw),before);});
test('snapshot preserva valores e isola alterações posteriores',()=>{const src=structuredClone(raw),s=D.snapshot(src,'2026-10-20',CNJ.isValid);src[0].id='editado';assert.equal(s.rows[0].record.id,'00001');assert.equal(s.rows[4].record.id,' leg ');assert.equal(s.rows[4].record.processo,'abc');});
test('dashboard: mesma referência fallback e comparações literais',()=>{const src=[...raw,{...raw[0],mesReferencia:'',id:'fallback'}],s=D.snapshot(src,'2026-10-20',CNJ.isValid);const f={...F.defaults(),dashboard:{month:'10',type:'Ônus',search:'id',query:'fall'}};assert.deepEqual(F.run(s,f).rows.map(r=>r.record.id),['fallback']);const c=F.chips(f).find(c=>c.key==='dashboard:query');assert.equal(F.run(s,F.remove(f,c)).rows.length,3);assert.equal(F.run(s,F.defaults()).rows.length,10);});
test('remover chips limpa apenas suas condições',()=>{let f={...F.defaults(),types:['Ônus'],panjud:'sim',idOp:'contains',idValue:'00',obsGroups:[[{op:'contains',value:'garantia'}]]};for(const key of ['types','idOp','obs:0'])f=F.remove(f,F.chips(f).find(c=>c.key===key));assert.equal(f.panjud,'sim');assert.equal(f.idValue,'');assert.equal(f.obsGroups.length,0);});
test('milhares de registros: cardinalidade e ordenação estáveis',()=>{const src=Array.from({length:5000},(_,i)=>({...raw[i%raw.length],id:String(i).padStart(6,'0')}));const s=D.snapshot(src,'2026-10-20',CNJ.isValid);const r=F.run(s,{...F.defaults(),panjud:'sim',sort:'id',direction:'desc'});assert.equal(r.rows.length,1667);assert.ok(r.rows.every(x=>x.panjud==='sim'));assert.ok(r.rows[0].record.id>r.rows.at(-1).record.id);});
test('texto legado com letras não vira duplicidade só por conter o mesmo dígito',()=>{const s=D.snapshot([{...raw[0],processo:'ABC1'},{...raw[1],processo:'XYZ1'}],'2026-10-20',CNJ.isValid);assert.ok(s.rows.every(r=>!r.duplicateCNJ));});
test('lista CNJ não inclui vazios por causa de item não numérico',()=>assert.deepEqual(indices({cnjOp:'list',cnjValue:cnj(2)+', abc'}),[1]));
test('busca de palavras exige ao menos uma palavra',()=>assert.ok(run({obsGroups:[[{op:'noWords',value:'!!!'}]]}).errors.length));
for(const [q,expected]of Object.entries({duplicateID:[0,3],duplicateCNJ:[0,3],invalidCNJ:[4,5],noObs:[2,5],invalidDate:[4,5],futureDate:[3],referenceMismatch:[1,2],unknownType:[4,5],statusIssue:[3,4,5,8],missingEssential:[4,5],clean:[6,7]}))test('qualidade individual '+q,()=>assert.deepEqual(indices({quality:[q]}),expected));
test('ordenação em ambos sentidos por todos os campos mantém desempate original',()=>{
 const a={...raw[0],id:'2',processo:cnj(2),tipo:'Ônus',mesReferencia:'10',panjud:'Sim',recusado:'Não',observacoes:'texto',data:'2026-10-20'};
 const b={...raw[1],id:'1',processo:cnj(1),tipo:'Acordo',mesReferencia:'09',panjud:'Não',recusado:'Sim',observacoes:'',data:'2026-09-19'};
 const s=D.snapshot([a,b],'2026-10-20',CNJ.isValid);
 for(const field of ['date','id','cnj','type','reference','panjud','hasObs'])for(const direction of ['asc','desc'])assert.deepEqual(F.run(s,{...F.defaults(),sort:field,direction}).rows.map(r=>r.index),direction==='asc'?[1,0]:[0,1],field+direction);
 assert.deepEqual(F.run(s,{...F.defaults(),sort:'recusado'}).rows.map(r=>r.index),[0,1]);
 assert.deepEqual(F.run(s,{...F.defaults(),sort:'recusado',direction:'desc'}).rows.map(r=>r.index),[1,0]);
});
