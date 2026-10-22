const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const response = comments => JSON.stringify({comments});
const comment = (basis, text) => ({basis, text});
const valid = comment('production', 'Os cadastros são acompanhados separadamente das confirmações no Panjud.');
function boot() {
  const requests = [], context = {apiKey: 'gsk_TEST_ONLY'};
  const c = {Date, Intl, console, AbortController, DOMException, setTimeout, clearTimeout,
    navigator: {}, document: {readyState: 'loading', addEventListener() {}},
    localStorage: {getItem: () => null}, obterContextoERP: () => context};
  let reply = () => ({choices: [{finish_reason: 'stop', message: {content: response([valid])}}]});
  c.window = c;
  c.fetch = async (url, options) => {
    requests.push({url, ...options, body: JSON.parse(options.body)});
    const data = await reply(requests.at(-1));
    return {ok: true, status: 200, json: async () => data};
  };
  vm.createContext(c);
  for (const file of ['js/aurora/agent.bundle.js', 'js/core/helpers.js', 'js/core/calculations.js', 'js/aurora/live/metrics.js', 'js/reports/metrics.js', 'js/reports/ai.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c);
  }
  const metrics = c.ERPWhatsAppMetrics.build([
    {data:'2026-10-20', mesReferencia:'10', tipo:'Ônus', panjud:'Sim', recusado:'Não'},
    {data:'2026-10-20', mesReferencia:'10', tipo:'Êxito', panjud:'Não', recusado:'Não'}
  ], {'10':10}, '2026-10-20', {period:'today', finance:false});
  return {c, metrics, requests, context, setReply: fn => reply = fn};
}
function check(comments, extra = {}) {
  const {c, metrics} = boot();
  const ctx = c.ERPWhatsAppAI.context(metrics);
  Object.assign(ctx, extra);
  return c.ERPWhatsAppAI.validate(response(comments), ctx);
}

test('regressão: meta ainda não atingida é aceita quando abaixo da meta', () => {
  for(const text of ['A meta mensal ainda não foi atingida.', 'O acumulado ainda não atingiu a meta mensal.']) assert.equal(check([comment('goalProgress',text)])[0],text);
});
test('regressão: ressalva de cadastro não comprovar baixa judicial é válida', () => {
  assert.ok(check([comment('production', 'O cadastro no ERP não comprova baixa judicial.')]));
});
test('regressão: financeiro autorizado pode negar pagamento garantido', () => {
  const {c, metrics} = boot(); metrics.includeFinance = true; metrics.months[0].finance = {calculated:0};
  assert.ok(c.ERPWhatsAppAI.validate(response([comment('finance', 'A bonificação calculada não é pagamento garantido.')]), c.ERPWhatsAppAI.context(metrics)));
});
test('não confunde um ponto de atenção com estatística numérica', () => {
  assert.ok(check([comment('pending', 'Um ponto de atenção é acompanhar as confirmações no Panjud.')]));
});
test('ausência de recusas é aceita somente quando não há recusas', () => {
  assert.ok(check([comment('production', 'Os registros estão sem recusas no Panjud.')]));
  const {c, metrics} = boot();metrics.production.refused=1;
  for (const text of ['Não há recusas no período analisado.', 'Os registros estão sem recusas no Panjud.']) assert.equal(c.ERPWhatsAppAI.validate(response([comment('production',text)]),c.ERPWhatsAppAI.context(metrics)),null);
});
test('negação não libera uma segunda afirmação falsa na mesma frase', () => {
  assert.equal(check([comment('production','O cadastro não comprova baixa judicial, mas a meta foi atingida.')]),null);
  assert.equal(check([comment('production','O cadastro não comprova baixa judicial. Há baixa judicial confirmada.')]),null);
});
test('meta atingida e meta desconhecida não aceitam afirmação de meta não atingida', () => {
  const {c, metrics} = boot();
  for (const goal of [1,null]) {
    metrics.months[0].goal=goal;metrics.months[0].remaining=goal===1?0:null;
    assert.equal(c.ERPWhatsAppAI.validate(response([comment('production','A meta mensal ainda não foi atingida.')]),c.ERPWhatsAppAI.context(metrics)),null);
  }
});
test('normaliza cerca JSON e quebras de apresentação sem aceitar prosa livre', () => {
  const {c,metrics}=boot(),ctx=c.ERPWhatsAppAI.context(metrics);
  const raw='```json\n'+response([comment('production','Os cadastros são acompanhados\nseparadamente das confirmações.')])+'\n```';
  assert.equal(c.ERPWhatsAppAI.validate(raw,ctx)[0],'Os cadastros são acompanhados separadamente das confirmações.');
  assert.equal(c.ERPWhatsAppAI.validate('Resultado: '+response([valid]),ctx),null);
});
test('descarta comentário inválido e duplicata sem perder o comentário válido', () => {
  const result=check([comment('production','Foram 999 registros no período.'),valid,valid]);
  assert.equal(result.length,1);assert.equal(result[0],valid.text);
});
test('continua rejeitando números, HTML, bases desconhecidas e valores financeiros ocultos', () => {
  for(const item of [comment('production','Foram 12 casos no período.'),comment('production','Foram vinte casos no período.'),comment('production','<b>Os cadastros estão disponíveis.</b>'),comment('production','A bonificação não é pagamento garantido.'),comment('inexistente',valid.text)])assert.equal(check([item]),null);
});
test('pipeline real usa JSON Schema estrito, bases do contexto, chave e orçamento próprio', async () => {
  const e=boot();const output=await e.c.ERPWhatsAppAI.generate(e.metrics);
  assert.equal(output[0],valid.text);assert.equal(e.requests.length,1);
  const r=e.requests[0],p=r.body,s=p.response_format.json_schema.schema;
  assert.equal(r.headers.Authorization,'Bearer gsk_TEST_ONLY');assert.equal(p.response_format.type,'json_schema');assert.equal(p.response_format.json_schema.strict,true);
  assert.equal(s.additionalProperties,false);assert.equal(s.properties.comments.items.additionalProperties,false);
  assert.deepEqual(s.properties.comments.items.properties.basis.enum,Object.keys(e.c.ERPWhatsAppAI.context(e.metrics).allowedBases));
  assert.equal(p.max_completion_tokens,2048);assert.equal(p.reasoning_effort,'low');assert.equal(p.include_reasoning,false);assert.equal(p.tools,undefined);
  assert.equal(p.messages.length,2);assert.equal(JSON.parse(p.messages[1].content).includeFinance,false);
});
test('uma resposta inválida recebe uma única tentativa corrigida', async () => {
  const e=boot();e.setReply(()=>({choices:[{message:{content:e.requests.length===1?'incompleto':response([comment('goalProgress','A meta mensal ainda não foi atingida.')])},finish_reason:'stop'}]}));
  const out=await e.c.ERPWhatsAppAI.generate(e.metrics);
  assert.equal(out[0],'A meta mensal ainda não foi atingida.');assert.equal(e.requests.length,2);
  assert.equal(e.requests[1].body.max_completion_tokens,4096);assert.match(e.requests[1].body.messages[0].content,/única tentativa de correção/);
  assert.doesNotMatch(e.requests[1].body.messages[1].content,/incompleto/);
});
test('resposta truncada é detectada mesmo se contiver JSON parseável', async () => {
  const e=boot();e.setReply(()=>({choices:[{message:{content:response([valid])},finish_reason:e.requests.length===1?'length':'stop'}]}));
  await e.c.ERPWhatsAppAI.generate(e.metrics);assert.equal(e.requests.length,2);
});
test('falha persistente para após duas tentativas e não armazena sucesso falso', async () => {
  const e=boot();e.setReply(()=>({choices:[{message:{content:'{}'},finish_reason:'stop'}]}));
  await assert.rejects(e.c.ERPWhatsAppAI.generate(e.metrics),/INVALID_REPORT_RESPONSE/);assert.equal(e.requests.length,2);
  e.setReply(()=>({choices:[{message:{content:response([valid])}}]}));
  await e.c.ERPWhatsAppAI.generate(e.metrics);assert.equal(e.requests.length,3);
});
test('truncamento persistente informa erro específico e não repete indefinidamente', async () => {
  const e=boot();e.setReply(()=>({choices:[{message:{content:''},finish_reason:'length'}]}));
  await assert.rejects(e.c.ERPWhatsAppAI.generate(e.metrics),/TRUNCATED_REPORT_RESPONSE/);assert.equal(e.requests.length,2);
});
test('recusa do provedor não é repetida nem tratada como texto de análise', async () => {
  const e=boot();e.setReply(()=>({choices:[{message:{refusal:'indisponível',content:null},finish_reason:'stop'}]}));
  await assert.rejects(e.c.ERPWhatsAppAI.generate(e.metrics),/REPORT_REFUSED/);assert.equal(e.requests.length,1);
});
test('chave ausente não gera requisição', async () => {
  const e=boot();e.context.apiKey='';await assert.rejects(e.c.ERPWhatsAppAI.generate(e.metrics),/NO_API_KEY/);assert.equal(e.requests.length,0);
});
test('cancelamento após resposta inválida impede a tentativa de correção', async () => {
  const e=boot(),controller=new AbortController();e.setReply(()=>{controller.abort();return{choices:[{message:{content:'{}'}}]};});
  await assert.rejects(e.c.ERPWhatsAppAI.generate(e.metrics,{signal:controller.signal}),{name:'AbortError'});assert.equal(e.requests.length,1);
});
test('observações automáticas preservam payload original e não adotam opções de relatório', async () => {
  const e=boot();await e.c.AuroraLiveAI.generate({evento:'test'});
  const p=e.requests[0].body;assert.equal(p.max_completion_tokens,768);assert.equal(p.response_format.type,'json_object');assert.equal(p.reasoning_effort,undefined);assert.equal(p.include_reasoning,undefined);
});
test('somente respostas válidas entram no cache sem nova chamada', async () => {
  const e=boot();await e.c.ERPWhatsAppAI.generate(e.metrics);await e.c.ERPWhatsAppAI.generate(e.metrics);assert.equal(e.requests.length,1);
});

test('encerramentos reais é nomenclatura operacional, não valor em dinheiro', () => {
  assert.ok(check([comment('production','Os encerramentos reais correspondem às confirmações no Panjud.')]));
  assert.equal(check([comment('production','Os encerramentos reais resultam em bonificação garantida.')]),null);
});
