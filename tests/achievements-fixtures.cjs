const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function environment() {
  const ctx=vm.createContext({console,Date,Intl});ctx.window=ctx;
  for(const file of ['catalog','engine'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/aurora/achievements/'+file+'.js'),'utf8'),ctx);
  return {C:ctx.AuroraAchievementCatalog,E:ctx.AuroraAchievementEngine,ctx};
}
const row=(date='2026-10-20',extra={})=>({data:date,tipo:'Ônus',panjud:'Sim',recusado:'Não',mesReferencia:'10',...extra});
function history(count=1000,perDay=10,singleType=false) {
  const rows=[];let d=new Date('2020-01-06T12:00:00Z'),i=0;
  while(rows.length<count) {
    if(d.getUTCDay()!==0&&d.getUTCDay()!==6) for(let n=0;n<perDay&&rows.length<count;n++,i++)rows.push(row(d.toISOString().slice(0,10),{_uid:'h-'+i,tipo:singleType?'Ônus':['Ônus','Acordo','Êxito'][i%3],panjud:n<Math.ceil(perDay*.6)?'Sim':'Não'}));
    d.setUTCDate(d.getUTCDate()+1);
  }
  return rows;
}
module.exports={environment,row,history};
