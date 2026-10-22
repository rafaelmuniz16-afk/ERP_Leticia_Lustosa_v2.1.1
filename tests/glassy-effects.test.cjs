const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function mount(effects = true) {
  const context = vm.createContext({});
  vm.runInContext(`
    globalThis.window = globalThis;
    globalThis.events = [];
    globalThis.popups = [];
    globalThis.frames = [];
    globalThis.audioInstances = [];
    globalThis.mascot = {};
    globalThis.bubble = {textContent: '', isConnected: true};
    globalThis.ERPThemeEffects = {};
    globalThis.ERPTheme = {state: {effects: ${effects}}};
    globalThis.addEventListener = () => {};
    // Reproduz a exigência de receptor das APIs WebIDL, que um stub
    // baseado em arrow function não verificava nos testes anteriores.
    globalThis.matchMedia = function () {
      if (this !== globalThis) throw new TypeError('Illegal invocation');
      return {matches: false};
    };
    globalThis.document = {
      hidden: false,
      getElementById(id) {
        if (id === 'glassyMascot') return mascot;
        if (id === 'glassyBubble') return bubble;
        return null;
      }
    };
    globalThis.scope = {
      window: new Proxy(globalThis, {get: (target, key) => target[key]}),
      document,
      photo: './assets/images/Cyberpunk.png',
      Audio: class {
        constructor() {audioInstances.push(this);}
        pause() {}
        play() {return Promise.resolve();}
      },
      Swal: {fire(options) {popups.push(options); return Promise.resolve();}},
      listen(target, type, callback) {events.push({target, type, callback});},
      setTimeout() {return 1;}, clearTimeout() {},
      requestAnimationFrame(callback) {frames.push(callback);}
    };
  `, context);
  const source = fs.readFileSync(path.resolve(__dirname, '../js/themes/effects/glassy-crm.js'), 'utf8');
  vm.runInContext(source, context);
  vm.runInContext("ERPThemeEffects['glassy-crm'](scope)", context);
  return context;
}

test('Glassy inicializa com Window isolado e registra efeitos/mascote', () => {
  const c = mount();
  assert.equal(c.audioInstances.length, 1);
  assert.equal(c.frames.length, 1);
  assert.ok(c.events.some(e => e.target === c.document && e.type === 'click'));
  assert.ok(c.events.some(e => e.target === c.mascot && e.type === 'click'));
  // Confirma que o stub realmente rejeita a chamada que causava a falha.
  assert.throws(() => vm.runInContext('scope.window.matchMedia("all")', c), /Illegal invocation/);
});

test('mascote responde e abre a surpresa no décimo clique mesmo sem efeitos', () => {
  const c = mount(false);
  const click = c.events.find(e => e.target === c.mascot && e.type === 'click').callback;
  click(); assert.match(c.bubble.textContent, /Conexão cristalina/);
  for (let i = 1; i < 9; i++) click();
  assert.equal(c.popups.length, 0);
  assert.match(c.bubble.textContent, /Faltam 1/);
  click(); assert.equal(c.popups.length, 1);
  assert.match(c.popups[0].html, /assets\/images\/Cyberpunk\.png/);
  assert.match(c.popups[0].html, /glassy-matrix-canvas/);
  assert.equal(typeof c.popups[0].willClose, 'function');
});
