# Copiar Resumo — ERP Letícia Lustosa v2.1.1

Atualização preparada em 20/10/2026, revisada com a correção da validação da Aurora AI. Veja também `CORRECAO_AURORA_RESUMO.md`. Projeto completo, com os 11 temas e todas as mídias.

## 1. Versão de origem e escopo

A base desta entrega é o repositório `rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1.1`, branch `main`, commit `1bebb48ca27f4b8c174bab9abffc937862619883`. Os 92 arquivos da origem foram conferidos contra os identificadores dos arquivos dessa revisão do GitHub. A entrega mantém todos eles; somente quatro arquivos existentes receberam alterações. As 25 mídias foram preservadas byte a byte.

Nenhum commit, push, merge ou alteração remota foi realizado. A atualização está somente neste pacote para você testar. Patches e demonstrações enviados separadamente em outras etapas não foram incorporados automaticamente: a referência é a revisão do GitHub acima.

O recurso **Copiar Resumo** foi integrado ao Aurora Live existente. Não adiciona opções ao menu, campos ao cadastro, banco de dados, serviços externos ou dependências de produção. Não implementa a Central de Trabalho nem a Central de Exportação.

## 2. Onde fica e como abrir

1. Abra o ERP normalmente e localize o painel **Aurora Live** no dashboard.
2. No cabeçalho do painel, clique no botão compacto **Copiar Resumo**, com ícone de cópia.
3. Em telas muito estreitas, ele mostra apenas o ícone; o nome acessível e o tooltip continuam disponíveis.
4. O modal abre no modo **Simples**, período **Hoje**, com informações financeiras desmarcadas.

O botão acompanha as cores do tema ativo. O modal usa as mesmas cores, superfícies, bordas e tipografia. No Glassy CRM, preserva o acabamento translúcido com desfoque. A superfície dos temas Claro e Escuro evita que os textos de trás prejudiquem a leitura.

Use **Tab** e **Shift+Tab** para navegar; o foco permanece dentro do modal. **Escape** ou o botão **×** fecham a janela e devolvem o foco ao botão de abertura. O conteúdo tem rolagem interna e a ação de cópia fica no rodapé.

## 3. Gerar o Resumo Simples

1. Mantenha **Simples** selecionado.
2. Escolha o período.
3. Se desejar, marque **Incluir informações financeiras**.
4. Leia a **Prévia editável**. Você pode rolar, selecionar e editar o texto inteiro.
5. Clique em **Copiar para WhatsApp**.
6. Abra a conversa desejada por sua própria iniciativa e cole o texto.

Abrir o modal, trocar períodos e usar o modo Simples **não chama a Groq**. Os números são calculados em JavaScript com a base que já está carregada no ERP. O botão **Atualizar prévia** refaz o resumo a partir dessa base; ele não solicita uma nova sincronização à nuvem.

Se quiser consultar uma mudança recente da planilha, use primeiro o botão de atualização já existente no ERP e depois atualize a prévia.

O nome “Copiar para WhatsApp” indica a formatação da mensagem. O ERP não abre o WhatsApp, não envia mensagens e não exige login nele. O mesmo texto pode ser colado em outro aplicativo.

## 4. Gerar o Resumo Detalhado com Aurora AI

1. Escolha o período e a opção financeira.
2. Selecione **Detalhado com Aurora AI**.
3. Clique explicitamente em **Gerar com Aurora**.
4. Aguarde a conclusão e revise a análise acrescentada à prévia.
5. Edite o texto se desejar e copie.

Selecionar o modo detalhado, por si só, não faz a chamada. Até a geração terminar, a prévia contém a base numérica local e é identificada como aguardando a Aurora.

A integração reutiliza a chave configurada no ERP, o transporte, os modelos e o mecanismo de fallback já existentes da Aurora. Não é necessário configurar outra IA. A chamada do relatório usa resposta JSON com esquema estrito, sem ferramentas de cadastro, edição ou exclusão, sem histórico de chat e sem gravação de memória. Não altera o controle dos eventos automáticos da Aurora Live.

A API recebe datas do intervalo, contagens agregadas, distribuição por tipo, acumulados mensais e fundamentos permitidos para os comentários. Não recebe números CNJ, IDs de casos, observações individuais ou registros completos. A chave continua sendo usada pelo transporte existente para autenticação; não é inserida no contexto do relatório.

A Aurora produz de um a três comentários curtos. Todos os blocos numéricos são montados pelo ERP. A resposta é validada quanto à estrutura, fundamentos disponíveis, números livres, conteúdo impróprio para a prévia e afirmações incompatíveis conhecidas. Ela é inserida como texto, sem interpretar HTML.

A validação automática reduz respostas inconsistentes, mas não é uma prova completa da veracidade de qualquer frase em linguagem natural. Revise a análise antes de compartilhar.

### Falhas e chamadas repetidas

- Sem chave, com falha de comunicação ou resposta rejeitada, o modal informa o problema e mantém o resumo simples disponível.
- Uma falha não recebe o rótulo de análise gerada com sucesso.
- Resposta inválida, vazia ou truncada permite uma única tentativa automática de correção; falhas de chave, recusa e cancelamento não recebem essa tentativa. O fallback de modelos do transporte existente continua independente.
- Comentários são validados individualmente: um comentário inválido é descartado; os demais só aparecem se forem aprovados. Se nenhum passar, não há sucesso artificial.
- O relatório usa limite de 2.048 tokens e esforço de raciocínio baixo; a tentativa corretiva dispõe de 4.096 tokens. O prazo por modelo é de 15 segundos. Esses parâmetros não mudam o chat nem as observações automáticas.
- Se o chat já estiver respondendo, o relatório pede que você aguarde.
- Cliques duplicados não iniciam duas gerações simultâneas do relatório.
- Respostas válidas podem ser reutilizadas por até cinco minutos para o mesmo contexto, em cache apenas na memória da aba, limitado a dez entradas.
- Fechar a janela, alterar filtros ou editar a prévia cancela a geração em andamento e descarta respostas atrasadas.
- Se a base mudar durante a geração, os números são atualizados e a análise antiga é descartada. Você pode gerar outra análise.

## 5. Períodos disponíveis

| Opção | Intervalo utilizado |
|---|---|
| Hoje | Data local atual usada pelo ERP |
| Ontem | Dia anterior completo, inclusive quando muda o mês ou ano |
| Semana atual | Segunda-feira até hoje; no domingo, a semana inteira |
| Mês atual | Primeiro dia do mês até hoje |
| Intervalo personalizado | Datas inicial e final informadas, ambas inclusivas |

As datas seguem a função local já existente no ERP, com referência de Fortaleza. Datas inválidas, intervalo invertido ou final posterior a hoje são recusados. Enquanto o filtro estiver inválido, a prévia anterior é preservada e a cópia/geração ficam bloqueadas até a correção.

A seleção do relatório é independente do filtro mensal do dashboard. Não altera esse filtro nem suas preferências salvas.

## 6. Como interpretar os números

### Produção do período

A produção usa a **data registrada do encerramento**, e não uma data de criação presumida. Só entram os registros cujas datas pertencem ao intervalo selecionado.

O texto separa:

- Encerramentos cadastrados: total de registros no período.
- Confirmados no Panjud: confirmação “Sim”, sem recusa “Sim”.
- Recusados no Panjud: recusa “Sim”.
- Ainda não confirmados, sem recusa: demais registros.
- Distribuição dos cadastrados entre Ônus, Acordo, Êxito e, se houver, Outros/sem classificação.

Um registro com Panjud “Não” não é automaticamente uma recusa. Se um registro antigo contiver confirmação e recusa simultâneas, a projeção do relatório considera a recusa e informa a inconsistência nas notas. O registro original permanece intacto. O dashboard continua usando suas regras existentes.

Datas inválidas e futuras são excluídas da análise e sinalizadas. Cadastro no ERP não é apresentado como comprovação de baixa judicial.

### Acompanhamento mensal

É uma seção separada da produção do período. Mostra acumulados por **mês de referência**, com a data de corte identificada em cada bloco. Portanto, um resumo de um dia pode mostrar a produção daquele dia e o acumulado mensal até aquele dia, sem misturar as duas métricas.

O ano é obtido da data do registro, pois o campo de referência existente guarda apenas o mês. Nunca são somados registros de anos diferentes no mesmo bloco. Se o mês de referência divergir do mês da data, isso é sinalizado. Um registro anterior ao mês civil pode integrar seu mês de referência, conforme a organização já usada pelo ERP.

Para cada mês mostrado, o corte é o menor entre o fim do período selecionado, o fim desse mês e hoje. Registros posteriores a esse corte não integram o acumulado daquele bloco. Isso representa uma consulta pelos dados e status atualmente disponíveis, não uma reconstrução histórica das alterações de status.

Intervalos com vários meses mostram blocos separados para os meses com produção/referência e para os meses dos limites do intervalo. Meses intermediários totalmente vazios não geram longas listas de blocos vazios.

### Metas e ritmo

A estrutura atual armazena metas por mês, sem ano e sem versões históricas. Por isso:

1. Metas de anos anteriores ficam indisponíveis; a meta atual não é atribuída a outro ano.
2. Para meses do ano atual, é utilizada a **configuração mensal vigente**, com aviso explícito. Ela não comprova qual era a meta em uma consulta passada.
3. Metas ausentes, inválidas ou não positivas não geram percentuais ou bonificação.
4. O atingimento usa confirmações válidas divididas pela meta configurada.
5. O restante nunca fica negativo.
6. Ritmo restante só é mostrado para o mês atual quando o relatório termina hoje.
7. Dias úteis seguem a função da Aurora Live: segunda a sexta, incluindo hoje quando útil, sem calendário de feriados. Isso não presume presença, férias ou dias efetivamente trabalhados.

Comparações aparecem apenas para períodos completos terminados antes de hoje, contra uma janela imediatamente anterior de igual duração, com histórico alcançando o início anterior e quantidade anterior positiva. Não se compara um dia ainda em andamento com um dia inteiro. A variação mede registros cadastrados, não eficiência, presença ou cumprimento de jornada.

## 7. Informações financeiras

A opção vem desmarcada. Sem autorização, os valores e os comentários financeiros ficam fora tanto da mensagem gerada quanto do contexto enviado à Aurora.

Quando marcada, o relatório reutiliza **`calcFinancial()`**, a mesma função do ERP, sobre o conjunto mensal identificado. Não há uma segunda tabela de taxas. Os multiplicadores e critérios financeiros existentes foram mantidos.

A informação é rotulada como **bonificação calculada acumulada**, pelas regras vigentes, e não como pagamento garantido. Sem meta aplicável, ela fica indisponível.

Se você escrever valores financeiros manualmente na prévia, a cópia respeitará esse texto. Desmarcar a opção não apaga silenciosamente uma edição sua: confirme a substituição para gerar novamente sem valores.

## 8. Edições e cópia

- O botão copia exatamente a prévia, inclusive quebras de linha, espaços e emojis.
- Ao editar manualmente, a prévia passa a ser identificada como editada por você.
- Alterar filtros, atualizar ou gerar outra análise após uma edição pede confirmação antes de substituí-la.
- **Manter minha edição** preserva o texto e restaura os filtros anteriores.
- **Substituir prévia** autoriza refazer o texto com a seleção escolhida.
- Fechar e reabrir na mesma aba preserva edições manuais. Recarregar a página descarta esse rascunho: ele não é salvo no LocalStorage ou na nuvem.
- A API Clipboard é tentada primeiro em contexto seguro. Se não funcionar, há tentativa com seleção e `execCommand('copy')`.
- Se os dois métodos falharem, o texto fica selecionado e o modal orienta **Ctrl+C**, **Cmd+C** ou toque longo → Copiar.

## 9. Arquivos modificados

| Caminho relativo à raiz | Alteração |
|---|---|
| `index.html` | Botão no cabeçalho do Aurora Live, estrutura semântica do modal e referências aos novos scripts/CSS |
| `js/core/calculations.js` | Extração do corpo de contagem para `calculateRows(rows, meta, month)`; `calculate()` mantém suas entradas e saídas existentes |
| `js/auroraAgent.js` | Importação do prompt de relatório e adaptador somente leitura `gerarResumoAurora()`/`AuroraSummaryAI` |
| `js/aurora/agent.bundle.js` | Bundle regenerado dos mesmos módulos, incluindo o adaptador, para execução por `file://` |

`calcFinancial()` não teve sua fórmula alterada. Cadastros, validação CNJ, nuvem, auditoria, memória, módulos do Aurora Live, runtime dos temas, CSS dos temas e mídias não foram editados.

## 10. Arquivos criados

| Caminho relativo | Responsabilidade |
|---|---|
| `css/whatsapp-summary.css` | Estilos isolados do botão/modal, responsividade, foco e movimento reduzido |
| `js/reports/metrics.js` | Períodos, projeção somente leitura, métricas e montagem do texto |
| `js/reports/ai.js` | Contexto agregado, validação, cancelamento, cache e controle de geração |
| `js/reports/view.js` | Eventos do modal, filtros, prévia, confirmação de edição e clipboard |
| `js/aurora/report-prompt.js` | Instruções específicas para os comentários da Aurora |
| `tests/whatsapp-metrics.test.cjs` | 27 testes de métricas e integração lógica da análise |
| `tests/whatsapp-ui.test.cjs` | 16 testes de interface/clipboard com DOM simulado |
| `tests/whatsapp-ai-regression.test.cjs` | 21 testes de regressão da validação e do transporte de relatórios |
| `tests/whatsapp-browser.cjs` | Teste integrado em Chromium, com todos os serviços externos interceptados |
| `tests/package.json` e `tests/package-lock.json` | Dependências e comandos exclusivos de desenvolvimento/teste |
| `MANUAL_COPIAR_RESUMO_WHATSAPP.md` | Este manual |
| `CORRECAO_AURORA_RESUMO.md` | Diagnóstico, alterações e instalação desta correção |

O ERP não carrega arquivos de `tests/`. As massas de teste são artificiais e ficam somente nesses testes; não alimentam a operação real.

## 11. Testes e resultados

### Testes automatizados de lógica e interface

**87 testes aprovados, nenhuma falha:**

- 21 testes existentes do Aurora Live.
- 2 testes existentes de efeitos Glassy.
- 27 novos testes de períodos, estados Panjud, anos, metas, financeiro, privacidade, validação e cancelamento da IA.
- 16 novos testes de abertura, fechamento, edição, confirmação, clipboard, fallback, falha da IA e concorrência.

Adicionalmente, foram comparadas as funções `calculate()` e `calcFinancial()` da origem e da entrega em **1.440 cenários**, variando meses, tipos, metas, confirmações e recusas. As saídas foram idênticas.

### Navegador real

O teste usa Chromium headless e dados exclusivamente de teste. Google Planilhas e Groq são interceptados e simulados. Nenhuma credencial real é usada.

Foram verificados o carregamento integral, abertura/fechamento do modal, foco, ausência de overflow horizontal, ação de cópia acessível e manutenção dos cálculos do dashboard nas **22 combinações** dos 11 temas com viewports **1366×900** e **375×812**. As capturas foram inspecionadas; a transparência excessiva do modal nos temas Claro/Escuro foi corrigida.

Temas: Original, Claro, Escuro, Natal, Ano-Novo, Páscoa, Festa Junina, Halloween, Terror, Cyberpunk e Glassy CRM.

Os fluxos integrados verificam recuperação de resposta truncada, aceitação das negações legítimas, geração explícita, autenticação com chave de teste, contexto agregado sem casos individuais, chamada de relatório sem ferramentas, chat convencional separado, cópia exata, bloqueio de CNJ inválido, cadastro/edição/exclusão, meta mensal e atualização da nuvem simulada.

A validação adicional inclui viewport **320×568**, teclado e carregamento pelo modo **`file://`**, usando o bundle clássico da Aurora. Todos esses cenários passaram, sem erros ou warnings de console. A sintaxe de 52 arquivos JavaScript, os caminhos locais do HTML e a reprodução do bundle também foram conferidos.

### O que essa validação não comprova

- Não houve chamada real à Groq ou ao Google Planilhas. Disponibilidade externa, permissões da planilha, saldo/limites da chave e qualidade de uma resposta real dependem do ambiente de uso.
- Clipboard foi validado com captura da chamada e fallbacks simulados; permissões reais do sistema operacional ainda podem exigir cópia manual.
- Os testes de navegador foram feitos em Chromium, não em aparelhos físicos, Safari ou Firefox.
- Fontes externas foram substituídas por fontes locais no ambiente de teste. Emojis podem aparecer como quadrados nesse ambiente reduzido; os caracteres originais são preservados na mensagem.
- Não houve auditoria formal completa com leitor de tela, medição de FPS em dispositivos reais ou reprodução auditiva de todas as músicas/vídeos. A preservação desses recursos foi verificada por identidade de arquivos, testes existentes e ausência de alteração nos módulos responsáveis.
- Histórico e auditoria mantiveram seus arquivos originais; não foi realizada escrita de auditoria na planilha real.

### Reexecutar os testes

Use **Node.js 24 ou superior**. Na raiz do projeto extraído:

```bash
npm ci --prefix tests
npm test --prefix tests
```

Para o teste completo de navegador:

```bash
cd tests
npx playwright install chromium
npm run browser
```

O teste de navegador intercepta todas as requisições externas, utiliza chave fictícia e rejeita destinos não previstos. As capturas e o resultado ficam em `tests/.artifacts/`. Não envie essa pasta ou `tests/node_modules/` para o GitHub; elas são geradas localmente. As dependências são apenas de teste e não são necessárias para abrir o ERP.

Se o ambiente já tiver Chromium instalado, o teste aceita `ERP_CHROMIUM_PATH` com o caminho do executável. Nesta validação foi usado Chromium 153, Playwright 1.62.1 e jsdom 30.1.3.

Para regenerar o bundle depois de uma futura edição dos módulos da Aurora:

```bash
node scripts/build-aurora.cjs
```

O ZIP já contém o bundle pronto. Não é preciso executar build para usar esta entrega.

## 12. Instalação e teste local

1. Antes de substituir, guarde uma cópia completa da pasta atual e da revisão do GitHub que você utiliza.
2. Extraia o ZIP em uma pasta separada. Dentro dela haverá `ERP_Leticia_Lustosa_v2.1.1/`.
3. Confirme que essa pasta contém `index.html`, `css/`, `js/`, `assets/`, `scripts/`, `tests/` e este manual.
4. Abra o `index.html` extraído para testar pelo modo local, ou sirva a pasta pelo servidor local que já utiliza.
5. A conexão com a planilha continua sendo a original. Para avaliar o resumo, basta consultar e copiar; não é necessário cadastrar registros fictícios na sua base real.
6. Configure a chave da Aurora somente pelo mecanismo já existente, caso o novo endereço local use outro armazenamento de navegador.
7. Confira alguns períodos conhecidos, as contagens Panjud e o financeiro opcional; revise uma análise da Aurora antes de compartilhar.
8. Teste a cópia em um campo de texto de sua escolha.

Não é necessário instalar Node, npm ou as dependências de teste para usar o ERP. Como na versão original, recursos externos continuam dependendo de internet. O modo `file://` utiliza o bundle clássico; HTTP/GitHub Pages utiliza os módulos ES.

## 13. Como substituir no GitHub após sua aprovação

Nenhuma destas etapas foi executada automaticamente.

1. No GitHub, abra o repositório correto: **ERP_Leticia_Lustosa_v2.1.1**.
2. Baixe um backup da versão que está lá e anote o commit atual. Se ele mudou em relação ao commit de origem deste manual, compare as alterações antes de substituir arquivos.
3. Extraia este ZIP. Entre na pasta interna `ERP_Leticia_Lustosa_v2.1.1/`.
4. Preserve essa estrutura de caminhos ao copiar os arquivos para sua cópia local do repositório. O `index.html` deve continuar na raiz publicada; não crie uma segunda pasta com o nome do projeto dentro dela.
5. Você pode substituir o conteúdo completo usando sua ferramenta Git habitual. Como esta atualização só modifica quatro arquivos existentes e acrescenta os listados, também pode enviar esses caminhos pelo navegador do GitHub, preservando as pastas.
6. Não apague `assets/`. As mídias foram incluídas integralmente, sem alteração de nome ou tamanho. Se o navegador do GitHub limitar o envio de arquivos grandes, mantenha as mídias existentes, que são idênticas, e envie apenas os arquivos modificados/criados, ou use seu cliente Git.
7. Antes de confirmar sua atualização, confira os quatro caminhos modificados e os arquivos novos nas tabelas deste manual. Não publique `node_modules/`, `.artifacts/`, exportações pessoais ou chaves adicionadas manualmente.
8. Após publicar, espere a atualização do GitHub Pages e recarregue a página sem cache. Verifique se o botão **Copiar Resumo** aparece no cabeçalho do Aurora Live.

A atualização não apaga nem migra LocalStorage. Entretanto, o navegador mantém armazenamentos diferentes para origens/endereços diferentes: testar em outra porta ou pasta local pode mostrar preferências distintas, sem que o ambiente anterior tenha perdido dados. Os dados da planilha não estão dentro deste ZIP.

## 14. Como voltar à versão anterior

A forma mais simples é restaurar a pasta/commit que você guardou antes da instalação.

Se quiser desfazer somente esta funcionalidade manualmente:

1. Restaure da sua cópia original os quatro arquivos da seção **Arquivos modificados**. Restaure também o bundle original: ele deve acompanhar o agente original.
2. Remova os arquivos novos listados na seção **Arquivos criados**, se desejar.
3. Recarregue o ERP sem cache e confira o Aurora Live.

Não limpe o LocalStorage nem apague a planilha para reverter esta atualização. Não há migração de dados a desfazer. Se você tiver feito cadastros ou alterações reais durante o uso do ERP, restaurar os arquivos do site não desfaz essas operações na nuvem.

## 15. Solução rápida de problemas

| Sintoma | O que conferir |
|---|---|
| Botão não aparece | Se `index.html`, `css/whatsapp-summary.css` e `js/reports/` são desta entrega; recarregue sem cache |
| Modal abre, mas o período está inválido | Preencha início/fim válidos e não posteriores a hoje |
| Prévia não muda após editar | Confirme a substituição da edição; esse bloqueio evita perda silenciosa do seu texto |
| Aurora pede chave | Configure a chave pelo fluxo existente da Aurora no mesmo endereço/origem usado para abrir o ERP |
| Aurora indisponível ou resposta rejeitada | Utilize o modo Simples; confira conexão/configuração e tente novamente quando necessário |
| Cópia não autorizada | Use o texto selecionado com Ctrl+C/Cmd+C ou toque longo; HTTPS normalmente oferece melhor suporte ao Clipboard |
| Números diferentes do filtro mensal do dashboard | Confira o período, ano, mês de referência, data de corte e notas; o resumo explicita essas dimensões e não muda o dashboard |
| Meta antiga indisponível | O ERP não guarda metas por ano; o relatório não inventa esse histórico |
| Dados antigos na prévia | Atualize o ERP pelo controle existente e depois clique em Atualizar prévia |
