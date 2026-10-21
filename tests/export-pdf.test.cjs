const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const PDF=require('../js/export/pdf.js');const pdfMake=require('../vendor/export/pdfmake-0.2.20.min.js');pdfMake.addVirtualFileSystem(require('../vendor/export/vfs_fonts-0.2.20.js'));
const {D,F,CNJ,cnj,raw,snapshot,meta}=require('./export-fixtures.cjs');
const out=path.resolve(process.env.ERP_TEST_OUTPUT||path.join(__dirname,'.artifacts'));fs.mkdirSync(out,{recursive:true});
test('definição PDF não contém observações nem consultas textuais',()=>{const def=PDF.definition(snapshot.rows,{...meta(),filters:['BLOQUEIO de garantia'],filtered:true});const serialized=JSON.stringify(def);assert.ok(!serialized.includes('Observações'));assert.ok(!serialized.includes('BLOQUEIO'));assert.ok(!serialized.includes('<script>'));assert.equal(def.pageOrientation,'portrait');assert.equal(def.content.at(-1).table.headerRows,1);assert.ok(def.content.at(-1).table.body.every(r=>r.length===6));assert.deepEqual(def.content.at(-1).table.body[0].map(c=>c.text),D.headers.slice(0,6));});
for(const n of [5,40,350])test(`PDF ${n} registros: texto, orientação, seleção, acentos, cabeçalhos e paginação`,async()=>{const data=Array.from({length:n*2},(_,i)=>({...raw[0],id:'ID'+String(i).padStart(5,'0'),processo:cnj(i+1),tipo:i%3===0?'Ônus':i%3===1?'Acordo':'Êxito',panjud:'Sim',recusado:i%2?'Não':'Sim',observacoes:'SEGREDO-OBSERVACOES-NAO-EXPORTAR'}));const s=D.snapshot(data,'2026-10-20',CNJ.isValid);const rows=F.run(s,{...F.defaults(),recusado:'nao',sort:'id',direction:'desc'}).rows;assert.equal(rows.length,n);const bytes=await PDF.generate(rows,meta(rows),pdfMake);const p=path.join(out,`export-${n}.pdf`);fs.writeFileSync(p,bytes);const expected=path.join(out,`export-${n}-expected.json`);fs.writeFileSync(expected,JSON.stringify(rows.map(r=>r.record)));const report=cp.execFileSync(process.env.PYTHON||'python',['-c',`
import sys,json,re
from pypdf import PdfReader
r=PdfReader(sys.argv[1]); expected=json.load(open(sys.argv[2])); texts=[p.extract_text() for p in r.pages]; text='\\n'.join(texts); compact=re.sub(r'\\s','',text)
assert text.startswith('ERP LETICIA LUSTOSA')
assert 'SEGREDO-OBSERVACOES' not in text and 'Observações' not in text
for p,t in zip(r.pages,texts):
 assert abs(float(p.mediabox.width)-595.28)<1 and abs(float(p.mediabox.height)-841.89)<1
 c=re.sub(r'\\s','',t)
 for h in ['ID','NºProcesso','Tipodeencerramento','Data','EncerradonoPanjud','RecusadosnoPanjud']: assert h in c,h
 assert 'Página' in t
ids=re.findall(r'ID\\d{5}',text)
assert ids==[x['id'] for x in expected],(len(ids),len(expected))
for x in expected:
 assert x['processo'] in compact,x['processo']
 assert x['tipo'] in text,x['tipo']
assert len(r.pages)>1 if len(expected)>40 else len(r.pages)>=1
print(json.dumps({'pages':len(r.pages),'records':len(expected)}))
`,p,expected],{encoding:'utf8'});console.log(n+' registros: '+report.trim());});
test('linhas excepcionalmente longas podem quebrar sem desaparecer',()=>{const rows=D.snapshot([{...raw[0],id:'ID'.repeat(800)}],'2026-10-20',CNJ.isValid).rows;assert.equal(PDF.definition(rows,meta(rows)).content.at(-1).table.dontBreakRows,false);});
test('PDF preserva ID excepcionalmente longo em páginas adicionais',async()=>{const id='LONG'.repeat(400);const rows=D.snapshot([{...raw[0],id}],'2026-10-20',CNJ.isValid).rows;const p=path.join(out,'export-long-id.pdf');fs.writeFileSync(p,await PDF.generate(rows,meta(rows),pdfMake));cp.execFileSync(process.env.PYTHON||'python',['-c',"from pypdf import PdfReader; import sys,re; r=PdfReader(sys.argv[1]); text=''.join(line for p in r.pages for line in p.extract_text().splitlines() if re.fullmatch('[LONG]+',line)); assert text=='LONG'*400; assert len(r.pages)>1",p]);});
