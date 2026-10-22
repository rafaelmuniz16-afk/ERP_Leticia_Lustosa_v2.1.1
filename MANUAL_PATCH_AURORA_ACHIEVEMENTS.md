# Atualização para Aurora Achievements 2.0

## Base exata e conteúdo

Repositório: `rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1.1`.

- Branch de referência: `main`.
- Commit original: **`b3b2b2bb919620bc22724d922d17885150edbad0`**.
- Árvore original: `da9ab06e8b75d28bd71a38558c7acf130d711822`.
- Base: 349 arquivos, idênticos por hash Git ao ZIP completo da Central de Trabalho.
- SHA-256 do ZIP completo anterior: `91198e08e60f011c84b1f271ee4ad5ededd0c3e9511d6fb971ad51e899a67556`.

O patch foi construído por comparação de caminhos e conteúdo com essa base. Contém os arquivos novos e os cinco arquivos modificados, completos, nos caminhos abaixo. **Nenhum arquivo original foi removido ou renomeado.** Não há alteração de banco, formulário, meta ou planilha para executar.

## Arquivos novos

Todos os caminhos são relativos à raiz do repositório:

```text
CATALOGO_350_MISSOES.md
MANIFESTO_AURORA_ACHIEVEMENTS.json
MANUAL_AURORA_ACHIEVEMENTS_2.0.md
MANUAL_PATCH_AURORA_ACHIEVEMENTS.md
RELATORIO_TESTES_AURORA_ACHIEVEMENTS.md
css/aurora-achievements.css
js/aurora/achievements/catalog.js
js/aurora/achievements/engine.js
js/aurora/achievements/view.js
tests/achievements-browser.cjs
tests/achievements-engine.test.cjs
tests/achievements-fixtures.cjs
tests/achievements-ui.test.cjs
tests/results/aurora-achievements.json
```

## Arquivos modificados

| Caminho | Motivo |
|---|---|
| `index.html` | Integra CSS e módulos; evolui o card e a janela de conquistas existentes. |
| `js/aurora/live/insights.js` | Adapta os contratos de conquistas ao catálogo 2.0, mantendo compatibilidade. |
| `js/aurora/live/view.js` | Encaminha a apresentação das conquistas ao novo módulo. |
| `js/core/diagnostics.js` | Avalia conquistas no ciclo existente e recebe o resultado de históricos amplos. |
| `tests/package.json` | Acrescenta o comando de teste de navegador das conquistas. |

Não é necessário enviar novamente arquivos inalterados de `assets`, `vendor`, temas ou outros módulos. Eles continuam presentes no ZIP completo.

## Instalação pelo GitHub

1. Guarde uma cópia da versão atual e confira se o repositório ainda corresponde ao commit base acima. Se houver alterações próprias posteriores, compare principalmente os cinco arquivos modificados antes de substituí-los, para não perder essas alterações.
2. Extraia `ERP_Leticia_Lustosa_v2.1.1_PATCH_Aurora_Achievements_2.0.zip` no computador.
3. Abra a **raiz** do repositório, onde já estão `index.html`, `css`, `js` e `tests`.
4. Use **Add file → Upload files**. Arraste o **conteúdo interno** extraído: os documentos e as pastas `css`, `js` e `tests`. Preserve as subpastas. Não arraste a pasta que recebeu o nome do ZIP e não envie o próprio ZIP como atualização do código.
5. Confira os caminhos mostrados na tela. Por exemplo, o catálogo deve terminar em `js/aurora/achievements/catalog.js`; o adaptador deve continuar em `js/aurora/live/insights.js`.
6. Envie o conjunto em uma única atualização para que HTML e scripts entrem juntos. Faça o commit pelo seu próprio acesso ao GitHub.
7. Aguarde a publicação normal do site, se houver hospedagem configurada, e atualize a página com Ctrl+F5. Não é necessário limpar o LocalStorage ou os dados da planilha.

Se o upload em uma única operação não for possível, envie primeiro CSS e novos módulos, depois `insights.js`, `view.js` da Aurora Live e `diagnostics.js`, e **por último `index.html`**. Testes e documentos podem acompanhar o conjunto. Evite usar a aplicação entre as etapas de uma atualização parcial.

O patch não contém uma pasta externa envolvendo o projeto. O ZIP completo contém a pasta `ERP_Leticia_Lustosa_v2.1.1/`; para uma instalação completa, use o conteúdo dessa pasta como raiz do site.

## Como validar depois da atualização

1. Aguarde o carregamento do histórico pela rotina normal do ERP.
2. Na Aurora Live, confira **Aurora Achievements 2.0**, título do nível, emblema e cinco missões.
3. Abra **Ver jornada completa**. O seletor deve permitir consultar os níveis 1 a 70; cada etapa deve ter cinco missões. Níveis futuros continuam bloqueados até concluir os anteriores.
4. Confira um registro histórico conhecido. Datas válidas de anos anteriores participam; recusa não conta como confirmação Panjud.
5. Atualize a página: o nível deve ser reconstruído e a animação histórica não deve se repetir indevidamente.
6. Verifique os recursos habituais: cadastro, filtros, metas, Central de Trabalho, exportação e resumo. Nenhum cadastro precisa ser alterado para ativar as conquistas.
7. Troque de tema e confira a jornada em desktop e celular. A opção de animações fica dentro da jornada.

Para validação técnica local, com Node.js 24 ou superior:

```bash
cd tests
npm ci
npm test
npx playwright install chromium
npm run browser:achievements
npm run browser:work
npm run browser:export
npm run browser
```

Os testes de navegador interceptam as integrações com dados simulados. Não dependem de chave real da Groq ou de escrita na planilha de produção. Em ambiente com Chromium já instalado, é possível definir `ERP_CHROMIUM_PATH` com o caminho do executável. `ERP_TEST_OUTPUT` permite direcionar os resultados para uma pasta temporária.

## Como restaurar a versão anterior

Recupere o projeto no commit base indicado no início deste documento ou use o ZIP completo da Central de Trabalho guardado antes da atualização. Substitua os cinco arquivos modificados pelos originais e remova os 14 arquivos novos listados acima. Também é possível restaurar integralmente o conteúdo da versão base em uma cópia limpa.

Não apague a planilha, registros ou armazenamento do ERP. A chave `aurora_achievements_ui_v2` é exclusiva de preferências e avisos; a versão anterior a ignora. Removê-la é opcional e não participa da reversão dos dados.

## Reconstrução e integridade

O relatório de testes documenta a aplicação deste patch em uma cópia limpa da base, a execução dos testes nessa cópia e a comparação por SHA-256 com o projeto completo. O manifesto enumera os arquivos novos/modificados e hashes verificáveis. Ele exclui apenas o próprio manifesto da lista de hashes para evitar autorreferência.

**Nenhum commit, push, merge ou alteração remota foi realizado durante a implementação. A atualização do GitHub será feita por você.**
