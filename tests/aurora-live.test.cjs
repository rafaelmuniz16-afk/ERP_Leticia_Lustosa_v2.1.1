// Execute: node --test tests/aurora-live.test.cjs (Node 18+; sem dependências).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function environment() {
  let now = Date.parse('2026-10-05T15:00:00Z'), seq = 0;
  const timers = new Map(), storage = new Map();
  class Clock extends Date { static now() { return now; } }
  const ctx = vm.createContext({
    Date: Clock, Intl, console, AbortController,
    document: { hidden: false }, navigator: {},
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) },
    setTimeout: (fn, ms) => { const id = ++seq; timers.set(id, { fn, at: now + ms }); return id; },
    clearTimeout: id => timers.delete(id)
  });
  ctx.window = ctx;
  ['metrics', 'insights', 'personality'].forEach(name => vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/aurora/live/' + name + '.js'), 'utf8'), ctx));
  return {
    ctx, storage,
    async advance(ms) {
      now += ms;
      for (const [id, task] of [...timers]) if (task.at <= now) { timers.delete(id); await task.fn(); }
    }
  };
}
const row = (data, extra = {}) => ({ data, tipo: 'Ônus', panjud: 'Não', recusado: 'Não', ...extra });
const copies = (date, n, extra) => Array.from({ length: n }, () => row(date, extra));
const baseline = () => [...copies('2026-09-28', 8), ...copies('2026-09-29', 10), ...copies('2026-09-30', 12)];
const model = (rows, goals = {}, date = '2026-10-05') => environment().ctx.AuroraLiveMetrics.build(rows, goals, date);

test('vazio e poucos dias não inventam média nem Power Level', () => {
  for (const rows of [[], copies('2026-10-05', 4), copies('2026-10-01', 4)]) {
    const m = model(rows);
    assert.equal(m.power, null); assert.equal(m.average, null); assert.equal(m.isRecord, false);
  }
});
test('Power Level usa índice de base 100, sem teto, acima e abaixo da média', () => {
  for (const [count, expected] of [[0, 0], [5, 50], [10, 100], [15, 150], [30, 300]]) {
    const m = model([...baseline(), ...copies('2026-10-05', count)]);
    assert.equal(m.average, 10); assert.equal(m.power, expected);
  }
});
test('limita referência aos últimos vinte dias ativos', () => {
  const rows = [...copies('2026-08-01', 1000)];
  for (let i = 1; i <= 20; i++) rows.push(...copies('2026-09-' + String(i).padStart(2, '0'), 2));
  const m = model([...rows, ...copies('2026-10-05', 4)]);
  assert.equal(m.average, 2); assert.equal(m.historyDays, 20); assert.equal(m.power, 200);
});
test('não mistura anos, datas inválidas ou futuras', () => {
  const m = model([...baseline(), ...copies('2025-10-05', 300), ...copies('2026-12-05', 400), row('2026-02-30'), row('sem data'), ...copies('2026-10-05T12:00:00Z', 2)]);
  assert.equal(m.annualTotal, 32); assert.equal(m.invalidDates, 2); assert.equal(m.count, 2); assert.equal(m.record.total, 12);
});
test('empatar não é superar: falta um caso além do recorde', () => {
  const tied = model([...baseline(), ...copies('2026-10-05', 12)]);
  assert.equal(tied.toBeat, 1); assert.equal(tied.isRecord, false);
  const broken = model([...baseline(), ...copies('2026-10-05', 13)]);
  assert.equal(broken.isRecord, true); assert.equal(broken.best.date, '2026-10-05'); assert.equal(broken.record.total, 12);
});
test('primeiro dia constrói referência, sem anunciar recorde inventado', () => {
  const m = model(copies('2026-10-05', 8));
  assert.equal(m.best.total, 8); assert.equal(m.isRecord, false); assert.equal(m.toBeat, null);
});
test('ritmo diário usa saldo antes de hoje, Panjud e mês de referência', () => {
  const rows = [...copies('2026-10-01', 20, { panjud: 'Sim', mesReferencia: '10' }), ...copies('2026-10-05', 5, { panjud: 'Sim', mesReferencia: '10' }), ...copies('2026-10-05', 50, { panjud: 'Sim', mesReferencia: '11' })];
  const m = model(rows, { '10': 100 });
  assert.equal(m.remainingDays, 20); assert.equal(m.dailyGoal, 4); assert.equal(m.todayReal, 5); assert.equal(m.count, 55); assert.equal(m.monthReal, 25); assert.equal(m.dailyGoalReached, true);
  assert.equal(model(rows.slice(0, 20), { '10': 100 }).dailyGoal, 4);
});
test('sem meta, meta zero e fim de semana não criam objetivo diário', () => {
  assert.equal(model([], {}).dailyGoal, null); assert.equal(model([], { '10': 0 }).goal, null);
  assert.equal(model([], { '10': 100 }, '2026-10-04').dailyGoal, null);
});
test('meta mensal atual não soma o mesmo mês de outro ano', () => {
  const rows = [...copies('2025-10-01', 100, { panjud: 'Sim' }), ...copies('2026-10-01', 9, { panjud: 'Sim' })];
  assert.equal(model(rows, { '10': 10 }).monthlyGoalReached, false);
  assert.equal(model([...rows, row('2026-10-05', { panjud: 'Sim' })], { '10': 10 }).monthlyGoalReached, true);
});
test('evolução compara semanas fechadas; hoje não altera a variação', () => {
  const rows = [row('2026-09-20'), ...copies('2026-09-22', 5), ...copies('2026-09-29', 10)];
  const m = model([...rows, ...copies('2026-10-05', 300)]);
  assert.equal(m.periodDelta, 100); assert.equal(m.recentTotal, 10); assert.equal(m.priorTotal, 5);
  assert.equal(model(baseline()).periodDelta, null);
});
test('janeiro não compara semanas atravessando anos', () => {
  const m = model([row('2025-12-30'), row('2026-01-02')], {}, '2026-01-05');
  assert.equal(m.canComparePeriods, false); assert.equal(m.last7[0].count, null);
});
test('sequência considera dias úteis sem exigir registros no fim de semana', () => {
  const rows = ['2026-09-28','2026-09-29','2026-09-30','2026-10-01','2026-10-02'].map(d => row(d));
  assert.equal(model(rows).streak, 5); assert.equal(model([...rows, row('2026-10-05')]).streak, 6);
  assert.equal(model(rows.filter(r => r.data !== '2026-10-01')).streak, 1);
});
test('correção ou exclusão recalcula recordes e marcos', () => {
  const env = environment();
  const m = model([...baseline(), ...copies('2026-10-05', 25)]);
  const a = env.ctx.AuroraLiveInsights.build(m, []).achievements;
  assert.ok(a.some(x => x.id === 'cases-50')); assert.ok(a.some(x => x.id === 'personal-record'));
  const b = env.ctx.AuroraLiveInsights.build(model(baseline()), []).achievements;
  assert.equal(b.some(x => x.id === 'cases-50'), false);
});
test('insights financeiros conservam todas as mensagens e a ordem', () => {
  const messages = Array.from({ length: 15 }, (_, i) => 'Diagnóstico ' + i);
  const actual = environment().ctx.AuroraLiveInsights.financial(messages);
  assert.deepEqual(Array.from(actual, x => x.text), messages); assert.equal(actual[0].category, 'projecao');
});
test('valida personalidade e substitui apenas números fornecidos pelo ERP', () => {
  const env = environment(), m = model([...baseline(), ...copies('2026-10-05', 13)]);
  const event = env.ctx.AuroraLiveInsights.events(m)[0], context = env.ctx.AuroraLiveInsights.context(event, m);
  const validate = text => env.ctx.AuroraLivePersonality.validateResponse(JSON.stringify({ evento: event.type, mensagem: text }), context);
  assert.equal(validate('Novo recorde: {{hoje}} encerramentos. Que belo dia!'), 'Novo recorde: 13 encerramentos. Que belo dia!');
  for (const text of ['99 casos!', '{{inexistente}} casos!', 'Cem casos hoje.', '<b>Olá</b>', 'Seu ritmo dobrou.']) assert.equal(validate(text), null);
  assert.equal(env.ctx.AuroraLivePersonality.validateResponse('Inválido', context), null);
});

function personalitySetup(available = true, generate) {
  const env = environment(), outputs = [], calls = [];
  env.ctx.AuroraLiveAI = { available: () => available, generate: async ctx => {
    calls.push(ctx);
    return generate ? generate(ctx) : JSON.stringify({ evento: ctx.evento, mensagem: 'Novo recorde de {{ano}}. Hoje você fez {{hoje}} encerramentos!' });
  } };
  const control = env.ctx.AuroraLivePersonality.create(item => outputs.push(item));
  const refresh = (rows, confirmed = true, goals = {}) => {
    const m = env.ctx.AuroraLiveMetrics.build(rows, goals, '2026-10-05');
    control.refresh(m, env.ctx.AuroraLiveInsights.build(m, []), confirmed);
  };
  return { ...env, outputs, calls, control, refresh };
}
test('primeira carga e rotação nunca chamam IA', async () => {
  const e = personalitySetup(); const rows = [...baseline(), ...copies('2026-10-05', 13)];
  e.refresh(rows); for (let i = 0; i < 20; i++) e.refresh(rows, false);
  await e.advance(10000); assert.equal(e.calls.length, 0);
});
test('evento confirmado gera uma vez, preservando a prioridade do recorde', async () => {
  const e = personalitySetup(); e.refresh(baseline());
  const rows = [...baseline(), ...copies('2026-10-05', 25)]; e.refresh(rows, false);
  await e.advance(2000); assert.equal(e.calls.length, 0);
  e.refresh(rows); await e.advance(2000);
  assert.equal(e.calls.length, 1); assert.equal(e.calls[0].evento, 'personal-record');
  assert.equal(e.outputs.at(-1).source, 'ai');
  for (let i = 0; i < 20; i++) e.refresh(rows);
  await e.advance(10000); assert.equal(e.calls.length, 1);
  const again = e.ctx.AuroraLivePersonality.create(() => {});
  const initial = model(baseline()); again.refresh(initial, e.ctx.AuroraLiveInsights.build(initial, []), true);
  const m = model(rows); again.refresh(m, e.ctx.AuroraLiveInsights.build(m, []), true);
  await e.advance(10000); assert.equal(e.calls.length, 1);
});
test('ausência de chave e falhas preservam o texto local', async () => {
  for (const e of [personalitySetup(false), personalitySetup(true, () => { throw new Error('offline'); }), personalitySetup(true, () => 'Resposta inválida')]) {
    e.refresh(baseline()); e.refresh([...baseline(), ...copies('2026-10-05', 13)]);
    await e.advance(2000); assert.ok(e.outputs.at(-1).text); assert.notEqual(e.outputs.at(-1).source, 'ai');
  }
});
test('cooldown e orçamento diário bloqueiam novas gerações', async () => {
  const e = personalitySetup(); e.refresh(baseline());
  e.refresh([...baseline(), ...copies('2026-10-05', 13)]); await e.advance(2000);
  e.refresh([...baseline(), ...copies('2026-10-05', 30)]); await e.advance(2000);
  assert.equal(e.calls.length, 1);
  const key = e.ctx.AuroraLivePersonality.STORAGE_KEY;
  const ledger = JSON.parse(e.storage.get(key)); ledger.count = 3; ledger.lastAt = 0; e.storage.set(key, JSON.stringify(ledger));
  e.refresh([...baseline(), ...copies('2026-10-05', 75)]); await e.advance(3600000);
  assert.equal(e.calls.length, 1);
});
test('cancelamento e resposta atrasada não sobrescrevem dados novos', async () => {
  let resolve;
  const e = personalitySetup(true, () => new Promise(r => { resolve = r; }));
  e.refresh(baseline()); e.refresh([...baseline(), ...copies('2026-10-05', 13)]);
  const request = e.advance(2000);
  await Promise.resolve();
  e.refresh(baseline());
  resolve(JSON.stringify({ evento: 'personal-record', mensagem: 'Novo recorde de {{ano}}!' }));
  await request;
  assert.notEqual(e.outputs.at(-1).source, 'ai');
  e.control.suspend(); await e.advance(2000); assert.equal(e.calls.length, 1);
});
test('conjunto grande mantém os mesmos cálculos', () => {
  const m = model([...copies('2026-09-28', 30000), ...copies('2026-09-29', 30000), ...copies('2026-09-30', 30000), ...copies('2026-10-05', 10000)]);
  assert.equal(m.annualTotal, 100000); assert.equal(m.power, 33);
});
