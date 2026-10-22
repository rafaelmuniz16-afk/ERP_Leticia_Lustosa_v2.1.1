# Instalação do patch — Central de Trabalho Inteligente

Versão: ERP_Leticia_Lustosa_v2.1.1 · entrega de 21/10/2026.
Repositório de origem: `rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1.1`.
Commit base exato: `469229297c35a53e268284f34973451fb794a36a`.
Nenhum commit, push, merge ou publicação foi feito no seu GitHub durante este trabalho.

## 1. Qual arquivo baixar

- **ERP_Leticia_Lustosa_v2.1.1_COMPLETO_Central_Trabalho.zip**: projeto completo atualizado. Contém 349 arquivos, incluindo todos os assets, bibliotecas e licenças da base. Use para começar uma pasta nova ou comparar com o seu projeto.
- **ERP_Leticia_Lustosa_v2.1.1_PATCH_Central_Trabalho.zip**: contém somente os 21 arquivos novos ou modificados, com o conteúdo integral e seus caminhos. Use para atualizar uma cópia da base indicada acima.

Os dois pacotes levam estes manuais e o manifesto. O patch possui 12 arquivos novos e 9 substituições; não remove nem renomeia nenhum arquivo. O projeto completo mantém os 337 arquivos originais e acrescenta 12. Os 25 arquivos de `assets/` e os 208 arquivos de `vendor/export/licenses/` foram preservados byte a byte. Não aplique este patch na v2.1: esta entrega foi preparada e validada para a **v2.1.1 no commit acima**.

O ZIP completo já está atualizado; ele não é um backup da versão anterior. Para ter um backup recuperável, salve a versão original antes da instalação, conforme a próxima seção.

## 2. Faça uma cópia de segurança

1. No GitHub, abra seu repositório `ERP_Leticia_Lustosa_v2.1.1`.
2. Confira a branch e o commit que você usa. A base desta entrega pode ser consultada em `https://github.com/rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1.1/tree/469229297c35a53e268284f34973451fb794a36a`.
3. Clique em **Code → Download ZIP** e guarde esse download com um nome de backup e data, fora da pasta de trabalho. Se o repositório já recebeu alterações após o commit-base, salve também essa versão mais recente e compare os nove arquivos que serão substituídos. Uma substituição cega poderia apagar suas alterações posteriores.
4. Faça uma cópia da pasta local antes de sobrescrever qualquer arquivo. Os dados da planilha/nuvem e do navegador são separados do código: este patch não exporta esses dados. Preserve os backups que você já utiliza para eles.
5. Não limpe o LocalStorage, não apague registros, não mude o endpoint da nuvem e não recrie a planilha para instalar esta atualização. Não existe migração de dados nesta entrega.

## 3. Instale primeiro em uma pasta de teste

1. Extraia uma cópia completa da versão original.
2. Extraia o ZIP PATCH em outra pasta temporária.
3. Entre na pasta `ERP_Leticia_Lustosa_v2.1.1_PATCH_Central_Trabalho` que veio dentro do ZIP. Essa pasta é somente um invólucro de distribuição: **não a coloque como subpasta dentro do ERP**.
4. Copie o **conteúdo interno** dessa pasta para a raiz da cópia do ERP, onde já existe `index.html`.
5. Confirme a substituição dos nove arquivos existentes. Mescle as pastas `js/`, `css/` e `tests/`; não apague essas pastas antes de copiar. Os demais arquivos originais precisam continuar lá.
6. Confirme, por exemplo, que o novo arquivo ficou em `seu-projeto/js/work-center/core.js`, e não em `seu-projeto/ERP_Leticia_Lustosa_v2.1.1_PATCH_Central_Trabalho/js/work-center/core.js`.
7. Abra o ERP e faça a verificação da seção 6 antes de publicar. Para testar sem tocar em dados reais, use uma cópia de testes e não salve/edite/exclua registros na base de produção.

## 4. Lista exata de arquivos

Todos os caminhos abaixo partem da raiz que contém `index.html`. Os arquivos do patch são completos: não é necessário localizar e colar trechos.

| Caminho relativo | Ação | Motivo |
| --- | --- | --- |
| `MANIFESTO_CENTRAL_TRABALHO.json` | Criar | Inventário e hashes SHA-256 dos arquivos da versão entregue. |
| `MANUAL_CENTRAL_TRABALHO_INTELIGENTE.md` | Criar | Uso, arquitetura, regras e limites da Central. |
| `MANUAL_PATCH_GITHUB.md` | Criar | Instalação, verificação e reversão deste pacote. |
| `css/work-center.css` | Criar | Estilos isolados e responsivos usando os tokens dos temas existentes. |
| `index.html` | Substituir | Botão no Aurora Live, estrutura semântica do diálogo e importações locais. |
| `js/aurora/agent.bundle.js` | Substituir | Build clássico correspondente ao módulo; necessário também para abrir por file://. |
| `js/auroraAgent.js` | Substituir | Adaptador da Central no transporte Groq existente, sem ferramentas de alteração de dados. |
| `js/core/render.js` | Substituir | Evento de atualização, sem payload, ao concluir a renderização existente. |
| `js/export/data.js` | Substituir | Regras de conferência compartilhadas e opção de contagem com status literal. |
| `js/export/filters.js` | Substituir | Critérios de conferência e status literal para preservar a seleção na exportação. |
| `js/export/view.js` | Substituir | Recepção de filtros/ordem, controles correspondentes e retorno de foco. |
| `js/reports/view.js` | Substituir | Recepção de período, aviso de escopo e proteção de prévia editada. |
| `js/work-center/ai.js` | Criar | Contrato, validação e repetição limitada da análise opcional. |
| `js/work-center/core.js` | Criar | Projeções somente leitura, indicadores, consultas, UID e contexto agregado. |
| `js/work-center/view.js` | Criar | Interações do diálogo, atualização, cancelamento e integrações. |
| `tests/package.json` | Substituir | Comando adicional para a suíte de navegador da Central; dependências preservadas. |
| `tests/results/central-trabalho.json` | Criar | Registro consolidado dos testes executados e seus limites. |
| `tests/work-ai.test.cjs` | Criar | Testes do contrato, contexto, transporte, falhas e cancelamento da IA. |
| `tests/work-browser.cjs` | Criar | Fluxos reais de interface em Chromium com serviços externos simulados. |
| `tests/work-core.test.cjs` | Criar | Testes dos períodos, indicadores, conferências, filtros e integridade. |
| `tests/work-ui.test.cjs` | Criar | Testes do diálogo, transferência de contexto, edição e respostas obsoletas. |

Em produção, os testes e manuais não são carregados pelo ERP; mantê-los no repositório torna a entrega verificável. Não há dependência externa nova no navegador. O arquivo `agent.bundle.js` deve ser atualizado junto de `auroraAgent.js`, porque os dois representam a mesma integração em formas de carregamento diferentes.

## 5. Como enviar pelo GitHub

### Opção A — upload pelo site

1. Abra a raiz do repositório na branch que você pretende atualizar. Opcionalmente crie uma branch para conferir o resultado antes de atualizar a branch do Pages.
2. Selecione **Add file → Upload files**.
3. Arraste o conteúdo interno da pasta do PATCH, mantendo `css/`, `js/`, `tests/` e os arquivos da raiz. Não envie o ZIP fechado e não envie a pasta invólucro como uma subpasta do site.
4. Antes de confirmar, verifique os 21 caminhos listados acima. Os nove arquivos antigos devem aparecer como atualizados; os outros 12 como novos. Não deve haver exclusões nem arquivos de música/foto/vídeo alterados.
5. Prefira uma única atualização com os 21 arquivos, para evitar que o `index.html` aponte temporariamente para scripts ainda ausentes. Se precisar enviar em etapas, envie os novos arquivos de `css/` e `js/work-center/` primeiro, depois os arquivos compartilhados e o bundle, e deixe `index.html` por último.
6. Escreva uma descrição clara e confirme o commit por sua conta. Aguarde a conclusão do workflow/publicação do GitHub Pages, se estiver ativo.
7. Abra a página publicada com recarga forçada (`Ctrl+Shift+R` ou `Cmd+Shift+R`). Não confunda cache de arquivos antigos com necessidade de apagar dados do navegador.

### Opção B — GitHub Desktop / Git local

1. Abra a cópia local do repositório e confirme que não há mudanças suas sem backup.
2. Copie o conteúdo do PATCH como na seção 3.
3. Confira o diff: 12 arquivos novos, 9 alterados, nenhum removido ou renomeado.
4. Execute os testes ou a verificação manual. Crie seu commit e envie quando estiver satisfeito. Esta entrega não fez esse envio automaticamente.

Se a sua versão já tiver diferenças em algum arquivo listado, faça a mesclagem considerando o commit-base. Não substitua arquivos de outra versão apenas porque o nome coincide.

## 6. Verificação manual após instalar

1. Abra o ERP e confira se seus registros, metas, tema escolhido e indicadores continuam disponíveis.
2. No cabeçalho do **Aurora Live**, encontre **Central de Trabalho**, junto de **Copiar Resumo** e **Exportar**. Em telas pequenas, alguns botões exibem somente o ícone, com descrição acessível.
3. Abra a Central: o período inicial é o mês atual. Compare as cinco contagens com os registros desse período. Clique em cada indicador e confira se a quantidade encontrada corresponde à contagem do card. Cada card limpa filtros complementares para que isso seja possível.
4. Combine tipo, status, ID, CNJ e observação; remova um chip; teste **Limpar todos os filtros**. A limpeza global seleciona todos os períodos. Teste intervalo personalizado, inclusive um intervalo invertido: ações devem ficar bloqueadas enquanto as datas forem inválidas.
5. Abra detalhes, veja os alertas, retorne à lista. Em uma base de teste, use **Abrir no cadastro** e confira o registro selecionado. Essa ação não salva nada; cancelar no formulário conserva a base.
6. Clique em **Atualizar consulta**: ela relê os dados já disponíveis no ERP, sem solicitar nova sincronização. A linha de origem informa isso explicitamente.
7. Com uma seleção conhecida, use **Exportar resultados**. Confirme os filtros e a ordem no exportador existente. Gere Excel e PDF. Excel conserva sete colunas e o título mesclado; PDF conserva seis colunas e omite observações.
8. Use **Copiar Resumo** na Central. Leia o aviso: apenas o período é transferido; o resumo abrange todos os registros desse período segundo suas regras originais, não somente a lista filtrada. Edite a prévia, feche, peça outro período e teste **Manter minha edição** e **Substituir prévia**.
9. Se desejar testar a IA com sua integração real, configure sua chave pelo caminho já existente e clique em **Analisar com Aurora**. Deve haver resposta curta com fatos calculados pelo ERP. Nenhuma análise deve disparar só por abrir, filtrar ou cadastrar. Teste também **Detalhado com Aurora AI** no resumo.
10. Durante uma análise, mude o filtro ou feche a janela: a resposta anterior não deve aparecer na seleção seguinte. Sem chave ou com rede indisponível, consulta, indicadores e exportação continuam utilizáveis.
11. Alterne entre os 11 temas. Confira a Central em uma tela larga e no celular. No Glassy CRM, o diálogo utiliza os tokens e a transparência do tema, sem inserir um carrossel novo na tela principal.
12. Feche com `Esc`, abra novamente e confira o foco e a ausência de erros de carregamento no console. Faça também os testes habituais do cadastro, CNJ, metas, chat, nuvem, gráficos e mascotes em ambiente de teste.

## 7. Testes executados e reprodução

O relatório detalhado está em `tests/results/central-trabalho.json`. A versão entregue passou por 338 testes automatizados (248 existentes e 90 novos), três suítes de navegador e comparação integral do patch aplicado em uma cópia limpa da base. Os 349 arquivos resultantes coincidiram com os 349 arquivos do ZIP completo por SHA-256. Ambos os ZIPs passaram pela verificação de integridade.

As três suítes verificam a Central, o exportador e o resumo em 11 temas, nas larguras 1366 e 375 pixels (66 combinações). Há verificações adicionais em 320 × 568, modo `file://`, foco, downloads reais, efeitos ativos e erros/warnings de console. Os endpoints Groq e Google foram simulados; nenhuma chave ou base de produção foi usada. Leia os limites no manual funcional antes de interpretar esses testes como homologação em todos os dispositivos.

Para reproduzir com Node.js 24 ou superior, Python 3 e acesso para instalar as dependências:

```bash
cd tests
npm install
python -m pip install -r requirements-export.txt
npx playwright install chromium
npm test
npm run browser
npm run browser:export
npm run browser:work
```

Os arquivos de teste já possuem os cenários e interceptações. `ERP_TEST_OUTPUT` permite escolher uma pasta absoluta de artefatos de teste; por padrão, usam `tests/.artifacts`. `ERP_CHROMIUM_PATH` permite apontar para um Chromium já instalado. Esses recursos são somente de desenvolvimento; não são necessários para abrir o ERP em produção.

Caso altere `js/auroraAgent.js` posteriormente, execute na raiz:

```bash
node scripts/build-aurora.cjs
```

Atualize o módulo e o bundle juntos. Esta entrega já inclui o bundle gerado.

## 8. Problemas comuns

- **Botão ausente:** confira se o `index.html` atualizado foi realmente publicado e faça recarga forçada.
- **Botão sem ação:** confira a existência e a capitalização de `js/work-center/core.js`, `ai.js`, `view.js` e das dependências `js/export/`. Um caminho aninhado por engano causa 404.
- **Visual sem acabamento:** verifique `css/work-center.css` e a requisição correspondente no navegador. Não renomeie pastas.
- **IA indisponível:** confirme a chave na configuração existente, disponibilidade/cota da Groq e se o chat está ocupado. Os testes simulados não certificam sua chave, conta ou conectividade real.
- **Registro não abre no cadastro:** um registro sem `_uid`, removido ou com `_uid` duplicado é bloqueado para evitar editar o item errado. Corrija a origem pelo procedimento já existente; a Central não inventa identificadores.
- **Contagens parecem diferentes do resumo:** a Central aplica período e filtros da lista; o resumo transfere só período e mantém seus acumulados e regras existentes. O aviso de escopo é intencional.
- **Arquivo `agent.bundle.js` diverge:** use os dois arquivos do pacote ou regenere com o script, sem misturar versões.

## 9. Como reverter

1. Feche abas do ERP e preserve o backup feito antes da instalação.
2. Restaure os **nove arquivos marcados Substituir** na seção 4, usando sua cópia anterior (ou o commit-base se ele era exatamente sua versão).
3. Remova apenas os **12 arquivos marcados Criar**, desde que tenham sido adicionados por este patch e não tenham alterações suas posteriores. Não apague as pastas `js/`, `css/`, `tests/` nem outros arquivos.
4. Se o patch foi publicado em um único commit, a reversão desse commit também é uma opção, desde que você confira o diff e preserve trabalhos posteriores.
5. Publique a reversão e recarregue sem cache. Não apague LocalStorage nem restaure/limpe a planilha por causa desta mudança de interface: não houve migração ou regravação de dados pela Central.

## 10. Inventário e rastreabilidade

`MANIFESTO_CENTRAL_TRABALHO.json` registra a base, os caminhos novos/alterados e os hashes dos arquivos finais, exceto seu próprio hash para evitar autorreferência. Manuais e manifestos antigos foram mantidos como histórico de entregas anteriores; seus números não substituem o manifesto desta atualização.
