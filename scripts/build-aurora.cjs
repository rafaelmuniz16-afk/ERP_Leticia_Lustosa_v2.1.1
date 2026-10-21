// node scripts/build-aurora.cjs — empacotamento local sem dependências.
// Aceita somente os imports nomeados e exports declarativos usados neste agente.
// Interrompe a geração se essa estrutura mudar, em vez de gerar código incompleto.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const modules = new Map();
function compile(relative) {
  if (modules.has(relative)) return;
  const source = fs.readFileSync(path.join(root,relative),'utf8');
  const exports = [...source.matchAll(/^export\s+(?:async\s+)?(?:function|const|let|class)\s+(\w+)/gm)].map(match=>match[1]);
  let body = source.replace(/^import\s*\{([\s\S]*?)\}\s*from\s*['"]([^'"]+)['"];?\s*/gm,(_,names,target)=>{
    if(!target.startsWith('.'))throw new Error('Import externo não suportado: '+target);
    const dependency=path.posix.normalize(path.posix.join(path.posix.dirname(relative),target));
    compile(dependency);
    return 'const {'+names+'} = modules['+JSON.stringify(dependency)+'];\n';
  }).replace(/^export\s+/gm,'');
  if(/^\s*(import|export)\s/m.test(body))throw new Error('Sintaxe de módulo não suportada em '+relative);
  modules.set(relative,'modules['+JSON.stringify(relative)+'] = (() => {\n'+body+'\nreturn {'+exports.join(',')+'};\n})();');
}
compile('js/auroraAgent.js');
const output='// Gerado por scripts/build-aurora.cjs. Edite os módulos de origem.\n(() => {\n"use strict";\nconst modules = Object.create(null);\n'+[...modules.values()].join('\n')+'\n})();\n';
new vm.Script(output);
fs.writeFileSync(path.join(root,'js/aurora/agent.bundle.js'),output);
console.log('Bundle Aurora atualizado: '+modules.size+' módulos; '+Buffer.byteLength(output)+' bytes.');
