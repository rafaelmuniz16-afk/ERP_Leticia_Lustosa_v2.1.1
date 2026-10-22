const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const D=require('../js/export/data.js'),F=require('../js/export/filters.js');
const context={window:{},document:{getElementById:()=>null}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/forms/cnj.js'),'utf8'),context);
const CNJ=context.window.ERPProcessCNJ;
function cnj(n,year='2026',branch='8',court='06',origin='0001') {const first=String(n).padStart(7,'0');const rest=year+branch+court+origin;const dd=String(98n-BigInt(first+rest+'00')%97n).padStart(2,'0');return CNJ.format(first+dd+rest);}
const raw=[
 {id:'00001',processo:cnj(1),data:'2026-10-20',mesReferencia:'10',tipo:'Ônus',panjud:'Sim',recusado:'Não',observacoes:'BLOQUEIO de garantia\nAlvará pendente'},
 {id:'00002',processo:cnj(2),data:'2026-10-19',mesReferencia:'09',tipo:'Acordo',panjud:'Não',recusado:'Sim',observacoes:'liberado; ação'},
 {id:'00003',processo:cnj(3),data:'2026-09-30',mesReferencia:'10',tipo:'Êxito',panjud:'Não',recusado:'Não',observacoes:''},
 {id:'00001',processo:cnj(1),data:'2026-10-21',mesReferencia:'10',tipo:'Ônus',panjud:'Sim',recusado:'Sim',observacoes:'garantia liberado'},
 {id:' leg ',processo:'abc',data:'2026-02-30',mesReferencia:'99',tipo:'Legado',panjud:'',recusado:null,observacoes:'<script>alert(1)</script>'},
 {id:'',processo:'',data:'',mesReferencia:'',tipo:'',panjud:undefined,recusado:'',observacoes:''},
 {id:'00007',processo:cnj(4,'2024','5','07','1234'),data:'2025-12-31',mesReferencia:'12',tipo:'Ônus',panjud:'Não',recusado:'Não',observacoes:'CUSTAS'},
 {id:'00008',processo:cnj(5),data:'2026-01-01',mesReferencia:'01',tipo:'Acordo',panjud:'Sim',recusado:'Não',observacoes:'ação'},
 {id:'00009',processo:cnj(6),data:'2026-10-18',mesReferencia:'10',tipo:'Êxito',panjud:'talvez',recusado:'Não',observacoes:'Garantia'}
];
const snapshot=D.snapshot(raw,'2026-10-20',CNJ.isValid);
const run=f=>F.run(snapshot,{...F.defaults(),...f});
const indices=f=>run(f).rows.map(r=>r.index);
function meta(rows=snapshot.rows){return{generatedAt:'2026-10-20T15:00:00Z',generatedLabel:'20/10/2026, 12:00:00',period:'Todos os períodos',stats:D.stats(rows),filters:[],filtered:false,includeSummary:false,sortLabel:'Ordem original'};}
module.exports={D,F,CNJ,cnj,raw,snapshot,run,indices,meta};
