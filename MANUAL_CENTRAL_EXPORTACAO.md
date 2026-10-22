# Central de Exportação Personalizada

ERP Leticia Lustosa v2.1.1 — entrega de 21/10/2026.

## 1. O que foi entregue

Um botão **Exportar Dados**, ao lado de **Copiar Resumo** no cabeçalho da Aurora Live, abre uma central com filtros combináveis, prévia paginada, ordenação e geração local de Excel e PDF. Não há novo item na barra lateral nem novo card no dashboard.

A base desta entrega é o commit `6944dc331a7177a6ead2a7b5ed2d825c5dfdc133`, que era a versão mais recente da branch `main` consultada no GitHub. A correção anterior do resumo detalhado com Aurora já está nessa base e foi preservada.

Repositório: https://github.com/rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1.1

Nenhum commit, push, merge ou alteração remota foi realizado. O ZIP contém o projeto completo, incluindo todos os temas, mídias, módulos da Aurora, Copiar Resumo, testes e dependências locais de exportação.

## 2. Instalação e primeiro teste

1. Guarde uma cópia da pasta atual do ERP antes de substituir arquivos. O GitHub também permite baixar a versão atual em **Code → Download ZIP**.
2. Extraia o ZIP desta entrega. Entre na pasta `ERP_Leticia_Lustosa_v2.1.1` que está dentro dele.
3. Para testar uma cópia independente, abra o `index.html` dessa pasta. Também é possível servir a pasta por HTTP ou utilizar GitHub Pages. A exportação funciona em HTTP/HTTPS e em `file://`.
4. Não abra o `index.html` ainda dentro do visualizador do ZIP: os caminhos locais precisam da estrutura extraída.
5. Abra o ERP normalmente. Aguarde a carga habitual dos seus dados. A Central não sincroniza por conta própria.
6. Na Aurora Live, clique em **Exportar Dados**.
7. Confira o total disponível. Por padrão, a Central seleciona toda a base disponível, inclusive registros de outros meses e registros com campos inválidos.
8. Escolha os filtros, confira os chips, o contador e a prévia; escolha Excel ou PDF e clique em **Exportar**.
9. Abra o arquivo baixado e confira os registros antes de atualizar o projeto principal.

### Publicar depois de validar

Para substituir a instalação inteira, copie **o conteúdo** da pasta extraída para a raiz do projeto, preservando a posição de `index.html`, `css/`, `js/`, `assets/` e `vendor/`. Não crie acidentalmente uma segunda pasta de projeto dentro da raiz publicada. Não é necessário executar npm para usar o ERP.

No GitHub, utilize seu fluxo habitual de envio de arquivos ou Git. Antes de confirmar, confira a lista de alterações: os arquivos de produção já existentes só precisam de alteração em `index.html`; todo o restante da funcionalidade está em arquivos novos. As duas alterações em `tests/package*.json` são apenas dos testes.

Depois da publicação, recarregue com **Ctrl+F5**. Se o botão não aparecer, confirme que o `index.html` publicado é o novo e que `css/export-center.css` e `js/export/` foram enviados. Se a geração falhar, confirme a presença de **todos** os arquivos de `vendor/export/`, inclusive o arquivo de fontes.

Não apague o LocalStorage, não altere as chaves de cache, não substitua a planilha de dados e não modifique a integração com a nuvem para instalar esta funcionalidade.

## 3. Como a seleção funciona

### Leitura sem gravação

Ao abrir a Central, uma cópia de leitura dos campos necessários é criada a partir do array `bd` disponível na aplicação. A ordem e os objetos da base original permanecem intactos. A Central não chama funções de cadastro, edição, exclusão, sincronização, gravação de metas ou Aurora AI.

O aviso no topo informa o momento da leitura e o estado exibido pela conexão. “Online” não é tratado como prova de uma sincronização realizada naquele instante. Os registros podem vir do cache já carregado pelo ERP.

- **Reler dados disponíveis:** faz outra leitura da memória do ERP, sem solicitar sincronização.
- **Limpar filtros:** remove as condições e restaura a ordenação original.
- **Selecionar todos os registros:** também retorna à base inteira disponível, sem depender do mês do dashboard.
- **Usar filtros do dashboard:** importa explicitamente as condições atuais, sem mudar os controles ou a seleção do dashboard.

A seleção permanece estável enquanto a Central está aberta. Mudanças externas na base entram na Central ao reabrir a janela ou clicar em **Reler dados disponíveis**. Os períodos relativos, como “Hoje”, usam o calendário de Fortaleza no momento dessa leitura. Ao atravessar a meia-noite com a janela aberta, releia os dados para atualizar essa referência.

### E, OU e NÃO

Entre categorias diferentes, aplica-se **E**. Dentro de uma seleção múltipla, aplica-se **OU**. Os tipos excluídos precisam estar ausentes do registro, mesmo que também tenham sido escolhidos na inclusão.

Exemplo: `(Tipo = Ônus OU Acordo) E Recusado = Sim E Data entre 01/10/2026 e 20/10/2026`.

Nos controles de seleção múltipla, use Ctrl/Cmd + clique no computador; no celular, use o seletor nativo. Nenhuma seleção significa ausência de restrição. Na lista de tipos excluídos, nenhuma seleção significa que nenhum tipo será excluído.

Os chips mostram todas as condições ativas. Clique em um chip para remover a condição correspondente. Um chip com várias opções representa aquela categoria inteira. Nas observações, cada grupo tem seu próprio chip.

Intervalos incompletos, datas de filtro inválidas e condições textuais sem valor produzem uma mensagem e bloqueiam a exportação. Critérios válidos, mas contraditórios, resultam em zero registros. Nenhum filtro é abandonado silenciosamente para produzir resultados.

### Importação do dashboard

Os chips importados começam com **Dashboard**. Eles preservam as comparações do dashboard existente: mês de referência com seu fallback para o mês da data, tipo e Panjud literais, busca literal no ID ou processo e limites de data. A busca importada não é transformada silenciosamente em uma busca CNJ normalizada.

Esses chips podem ser removidos individualmente e combinados com os filtros próprios da Central. Há uma distinção intencional: o filtro próprio de mês de referência usa o campo cadastrado, sem preencher referências ausentes; o chip importado reproduz a regra já usada pelo dashboard. Assim, importar o dashboard mantém o conjunto esperado, enquanto a conferência de qualidade continua encontrando referências ausentes ou inválidas.

## 4. Lista completa dos filtros

### Período e datas

| Grupo | Opções |
|---|---|
| Geral | Todos os períodos; hoje; ontem; anteontem |
| Dias corridos | Últimos 7, 15, 30, 60 ou 90 dias, incluindo hoje |
| Semanas | Semana atual; semana anterior, de segunda a domingo |
| Meses | Mês atual; mês anterior |
| Trimestres | Trimestre atual; anterior, conforme o calendário civil |
| Semestres | Semestre atual; anterior: janeiro–junho e julho–dezembro |
| Anos | Ano atual; anterior |
| Personalizado | Data inicial e final, ambas inclusivas |
| Ano conhecido | Seleção múltipla de anos efetivamente existentes na data dos registros |

Os períodos atuais completos incluem todo o intervalo civil; por exemplo, mês atual inclui até o último dia do mês e pode encontrar cadastros futuros existentes. Últimos N dias termina no dia da leitura. Para localizar datas futuras explicitamente, use o filtro de qualidade correspondente.

Em **Filtros avançados**, também estão disponíveis:

- Data exatamente igual; antes; depois; no dia ou antes; no dia ou depois.
- Entre duas datas, inclusive; fora do intervalo, excluindo suas duas extremidades.
- Dia do mês de 1 a 31.
- Um ou vários dias da semana.
- Segunda a sexta-feira; somente sábado; somente domingo; finais de semana.

“Segunda a sexta-feira” não considera feriados, escalas ou dias efetivamente trabalhados.

Datas são comparadas por seus componentes de calendário, sem converter o instante para outro fuso. São reconhecidas datas ISO `AAAA-MM-DD`, a parte de calendário de timestamps ISO e datas brasileiras completas `DD/MM/AAAA`. Datas impossíveis, como 30/02, não são corrigidas. Um filtro específico de data não inclui registros cuja data não possa ser interpretada. Sem filtros de data, esses registros continuam disponíveis.

### Mês de referência

- Um ou vários meses de janeiro a dezembro, independentemente da data.
- Referência igual ao mês da data.
- Referência diferente do mês da data.
- Referência ausente ou inválida.

Uma referência válida contém um mês inteiro de 1 a 12, com ou sem zero inicial. Igualdade/divergência exige tanto referência válida quanto data válida. O modelo atual não possui ano de referência: o seletor de ano filtra **o ano da data do registro**, não um ano presumido da referência.

### Tipo de encerramento

- Ônus, Acordo e Êxito.
- Outros textos de tipo encontrados nos registros antigos.
- Tipo ausente/inválido.
- Seleção de vários tipos para inclusão.
- Seleção de vários tipos para exclusão.

Textos legados não são reclassificados. Na qualidade, qualquer tipo fora das três categorias oficiais é “desconhecido”. Valores não textuais ou vazios entram no filtro “ausente/inválido”.

### Encerrado e recusado no Panjud

Os campos `panjud` e `recusado` têm controles independentes, cada um com:

- Todos.
- Sim.
- Não.
- Ausente/inválido.
- Diferente de Sim, incluindo ausentes/inválidos.
- Diferente de Não, incluindo ausentes/inválidos.

A comparação própria da Central ignora caixa, acentos e espaços externos para reconhecer Sim/Não. O documento mantém o valor original. Isso não modifica os cálculos do ERP.

Atalhos disponíveis: todos os status; confirmados; não confirmados; recusados; não recusados; não confirmados e não recusados; confirmados e não recusados; ambos Sim; informações incompletas.

Nos atalhos, **não confirmado significa `panjud = Não`** e **não recusado significa `recusado = Não`**. Para incluir valores ausentes/inválidos, use “Diferente de Sim”. Os controles e chips mostram as condições aplicadas. O atalho modifica apenas os três controles de status; os demais filtros continuam valendo.

### ID do caso

Igual, contém, começa com, termina com, diferente, não contém, lista de IDs, vazio, preenchido, duplicado na base e único na base.

As listas aceitam vírgula ou quebra de linha. Para comparar IDs, são ignoradas caixa, acentuação, espaços externos e repetições de espaços internos. Zeros à esquerda permanecem significativos: `001` não é igual a `1`. A exportação mantém o texto original, inclusive seus espaços.

### Número do processo

Igual, contém, começa com, termina com, diferente, não contém, lista, vazio, preenchido, duplicado, único, CNJ válido e CNJ inválido/ausente.

As buscas numéricas comparam os dígitos e aceitam números mascarados ou sem máscara. Itens sem dígitos numa lista não passam a representar processos vazios. Duplicidades são calculadas na base inteira antes de qualquer filtro. Valores antigos com letras não são agrupados somente porque contêm o mesmo dígito.

O validador existente `ERPProcessCNJ.isValid` é reutilizado. Os filtros estruturais exigem 20 dígitos, apenas caracteres de formatação permitidos e verificador válido:

| Segmento | Entrada |
|---|---|
| Ano do processo | 4 dígitos |
| Ramo do Judiciário | 1 dígito |
| Tribunal | 2 dígitos |
| Unidade de origem | 4 dígitos |

São mostrados códigos, sem inventar nomes de comarcas ou varas. O ano do processo não é o ano da data de encerramento. Campo vazio não é classificado como “único”.

### Observações

- Vazias ou preenchidas.
- Contém ou não contém texto.
- Texto exato, começa com ou termina com.
- Qualquer palavra, todas as palavras ou nenhuma palavra.
- Uma de várias expressões, informadas uma por linha.
- Busca sempre sem distinção de caixa; ignorar acentos é uma opção, inicialmente ativada.

“Contém texto” pesquisa uma sequência literal. Os filtros de palavras comparam palavras completas: `garant` não encontra a palavra `garantia`. Não há expressão regular nem interpretação por IA. Letras, números e sublinhado compõem palavras; pontuação separa palavras.

**Exemplo do construtor:**

1. Adicione um grupo com “Contém texto: garantia”.
2. Nesse grupo, clique em **+ Alternativa (OU)** e informe “Contém texto: bloqueio”.
3. Clique em **+ Adicionar grupo (E)**, escolha “Contém texto: liberado” e marque **NÃO**.
4. O resultado é `(garantia OU bloqueio) E NÃO liberado`.

Não é necessário criar campos ou categorias no cadastro. O filtro não afirma que uma palavra representa uma pendência jurídica real.

### Qualidade dos registros

A lista usa OU entre as ocorrências selecionadas:

| Condição | Regra de conferência |
|---|---|
| ID duplicado | Mesmo ID normalizado em mais de um registro da base |
| Processo duplicado | Mesmo processo normalizado em mais de um registro |
| CNJ inválido ou ausente | Estrutura/verificador inválido ou campo vazio |
| Sem observações | Campo vazio ou apenas espaços |
| Data inválida ou ausente | Data impossível, não reconhecida ou vazia |
| Data futura | Dia posterior ao dia de referência da leitura |
| Referência divergente | Data e referência válidas, mas meses diferentes |
| Tipo desconhecido | Fora de Ônus, Acordo e Êxito, inclusive ausência |
| Status conflitantes/incompletos | Ambos Sim ou ao menos um campo não reconhecido como Sim/Não |
| Campo essencial ausente | ID, processo, tipo, data, Panjud, recusado ou referência vazio |
| Sem ocorrências detectadas | Nenhuma das ocorrências listadas acima |

“Sem ocorrências” é limitado a essas verificações; não comprova a correção jurídica ou cadastral do processo. Referência inválida, mas preenchida, também pode ser pesquisada pelo controle próprio de referência. Observação vazia é tratada como ocorrência de conferência, mesmo sendo permitida no cadastro.

Se uma linha apresentar vários problemas, ela continua aparecendo uma única vez. Registros distintos, mesmo idênticos, permanecem linhas distintas: não há exclusão ou deduplicação de dados.

## 5. Ordenação e prévia

Ordene por ordem original, data, ID, processo, tipo, referência, Panjud, recusado ou presença de observações. Há direção crescente/decrescente e ordenação secundária. Empates finais mantêm a posição original da base. Datas inválidas ficam ao final nas duas direções.

Para que uma ordenação secundária tenha efeito, escolha uma categoria principal que possa empatar, como Tipo. “Ordem original” como primeira opção já distingue todos os registros.

A prévia mostra 25 registros por página e as sete colunas, com rolagem horizontal quando necessário. Observações longas possuem rolagem na célula. O contador, distribuição por tipo, confirmados, recusados e intervalo das datas referem-se a **todos** os resultados filtrados.

A exportação inclui todos os resultados, nunca apenas a página visível. Trocar Excel por PDF não muda os filtros nem a ordem. Nenhum arquivo é gerado quando há zero resultados; não foi incluído um modo de planilha-modelo vazia.

## 6. Exportar Excel

Selecione **Excel (.xlsx)**. Opcionalmente, marque **Incluir aba de resumo e filtros**. Clique em **Exportar**.

A primeira aba chama-se **Encerramentos**:

- `A1:G2`: uma única região mesclada, com **ERP LETICIA LUSTOSA**, fundo azul-marinho, texto branco, negrito e fonte de 20 pontos.
- Linha 3: cabeçalhos, sem linhas extras antes deles.
- Linha 4 em diante: registros selecionados.
- Filtro automático, três primeiras linhas congeladas, larguras apropriadas, quebra de texto, bordas discretas e linhas alternadas.

| Coluna | Cabeçalho | Campo original |
|---|---|---|
| A | ID | `id` |
| B | Nº Processo | `processo` |
| C | Tipo de encerramento | `tipo` |
| D | Data | `data` |
| E | Encerrado no Panjud | `panjud` |
| F | Recusados no Panjud | `recusado` |
| G | Observações | `observacoes` |

ID e processo são strings reais. Textos começando com `=`, `+`, `-` ou `@` não são gravados como fórmulas, e nenhum apóstrofo visível é acrescentado ao dado. Sequências textuais que se parecem com escapes OOXML também são protegidas para não mudar o texto quando o arquivo for lido.

Datas válidas a partir de 1900 são datas do Excel, com formato `dd/mm/yyyy`. Datas inválidas ou anteriores a 1900 permanecem texto original. Observações mantêm acentos, conteúdo integral e quebras de linha.

A aba opcional **Resumo da Exportação** contém geração, período, origem da leitura, contagens, ordenação e filtros. Ela não desloca a tabela principal. Descrições excepcionalmente extensas de filtros são distribuídas em linhas de continuação nessa aba.

## 7. Exportar PDF

Selecione **PDF (.pdf)** e clique em **Exportar**.

- Documento com texto selecionável, A4 retrato.
- Título **ERP LETICIA LUSTOSA**, data de geração, período e total.
- Exatamente seis colunas, na mesma ordem de A até F da tabela acima.
- Nenhuma coluna, texto ou consulta de observações é incluído no PDF, mesmo quando observações foram usadas para filtrar.
- Cabeçalho repetido nas páginas e rodapé “Página X de Y”.
- Fonte Roboto local, acentos preservados, tabela de 8 pontos e CNJs completos.
- Linhas comuns são mantidas juntas. Campos excepcionalmente longos podem continuar na página seguinte para não perder conteúdo.

Os documentos têm uma identidade própria em azul-marinho e tons discretos. Os efeitos dos temas não são aplicados ao Excel ou ao PDF.

## 8. Nomes dos downloads e cancelamento

Padrão: `ERP_Leticia_Lustosa_Exportacao_Personalizada_AAAA-MM-DD.xlsx` ou `.pdf`, usando o dia de referência da leitura da Central. Nenhum ID ou número de processo é colocado automaticamente no nome do arquivo.

Durante a geração, os controles de seleção ficam bloqueados para evitar que a prévia mude no meio da tarefa. O botão não aceita exportações duplicadas simultâneas. É possível cancelar a geração ou fechar a Central; um resultado cancelado não é baixado posteriormente.

As bibliotecas e fontes são carregadas sob demanda. Em HTTP/HTTPS, a geração usa um Web Worker, encerrado no fim ou no cancelamento. Em `file://`, ou quando o navegador bloqueia Workers, há fallback local na página. URLs temporárias de download são liberadas depois de 30 segundos.

## 9. Organização técnica

| Arquivo novo | Responsabilidade |
|---|---|
| `js/export/data.js` | Cópia de leitura, calendário, projeções, duplicidades e estatísticas da seleção |
| `js/export/filters.js` | Critérios combináveis, períodos, validação, ordenação, atalhos e chips |
| `js/export/view.js` | Janela, controles, prévia, foco, snapshot e ciclo de exportação |
| `js/export/excel.js` | Estrutura e estilo do XLSX |
| `js/export/pdf.js` | Estrutura e paginação do PDF, sem observações |
| `js/export/documents.js` | Carregamento local, Worker/fallback, cancelamento e download |
| `js/export/worker.js` | Execução isolada da geração |
| `css/export-center.css` | Estilos escopados, tokens dos temas, responsividade e Glassy |
| `vendor/export/` | ExcelJS, pdfmake, fontes, versões fixas e licenças |
| `tests/export-fixtures.cjs` | Dados artificiais usados exclusivamente nos testes |
| `tests/export-filters.test.cjs` | Critérios, combinações, calendário, duplicidades e ordenação |
| `tests/export-excel.test.cjs` | Reabertura e conferência estrutural/conteúdo do XLSX |
| `tests/export-pdf.test.cjs` | Geração real, leitura do PDF, conteúdo, ordem e páginas |
| `tests/export-ui.test.cjs` | Leitura, falhas, cancelamento, estado e isolamento da interface |
| `tests/export-browser.cjs` | Navegador completo, temas, downloads, Workers e `file://` |
| `tests/requirements-export.txt` | Dependência Python para os testes de PDF |
| `tests/results/central-exportacao.json` | Registro resumido da validação desta entrega |
| `MANIFESTO_CENTRAL_EXPORTACAO.json` | Base, arquivos alterados/criados e hashes da entrega |
| `MANUAL_CENTRAL_EXPORTACAO.md` | Este manual |

### Arquivos existentes modificados

1. `index.html`: botão, estrutura semântica do diálogo e referências aos módulos/CSS novos.
2. `tests/package.json`: descrição dos testes e comando `browser:export`.
3. `tests/package-lock.json`: nome do pacote de testes atualizado, mantendo as dependências existentes.

Os demais **103 arquivos da base** foram preservados byte a byte, incluindo todos os 25 arquivos de mídia e o arquivo de texto já existente em `assets/audio/`. Não houve edição dos módulos de negócio, formulários, cálculos, nuvem, Aurora, temas, efeitos ou Copiar Resumo.

### Dependências locais

- ExcelJS **4.4.0**, MIT: https://github.com/exceljs/exceljs
- pdfmake **0.2.20**, MIT: https://github.com/bpampuch/pdfmake
- Roboto incluída no VFS dessa versão, SIL OFL 1.1.

Versões, origens, hashes e avisos estão em `vendor/export/THIRD_PARTY_NOTICES.md` e `vendor/export/licenses/`. Os geradores não dependem de CDN. As dependências externas já existentes no ERP — como a integração com a nuvem, Chart.js, SweetAlert e fontes dos temas — mantêm seu funcionamento anterior.

Os estilos novos usam os tokens do tema ativo e seletores exclusivos da Central. O Glassy usa superfície e desfoque compatíveis. Há suporte a `prefers-reduced-motion`, foco visível e navegação por teclado.

## 10. Testes executados

Foram usados registros artificiais controlados, nunca registros reais enviados para conversores ou IA.

- **248 testes automatizados aprovados**, incluindo os 87 testes existentes e 161 novos.
- Filtros isolados e combinados, limites inclusivos, meses/anos, ano bissexto, duplicidades, inválidos, observações com E/OU/NÃO, ordenação, limpeza e snapshot.
- Filtragem de 5.000 registros; XLSX com 1.000 registros gerado e reaberto.
- XLSX validado por ExcelJS e, em conferência independente, openpyxl. Prévia visual das duas abas renderizada por outro leitor.
- PDF com 5 registros/1 página, 40 registros/2 páginas e 350 registros/12 páginas: leitura por pypdf, ordem, seis cabeçalhos, A4, CNJs, acentos e ausência de observações conferidos.
- Caso adicional de ID excepcionalmente longo: preservação do conteúdo em páginas adicionais.
- PDFs curto e multipágina renderizados e inspecionados visualmente; XLSX principal e aba de resumo também inspecionados.
- Navegador Chromium: Central nos 11 temas a 1366×900 e 375×812, além de 320×568; foco, rolagem, dimensões, controles e retorno ao botão conferidos.
- Abertura e interação nos 11 temas com efeitos ativados; preferência por movimento reduzido coberta na matriz de layouts.
- Downloads reais de Excel e PDF com os mesmos 60 registros em ordem decrescente, superando as 25 linhas da página de prévia.
- Geração em Worker, cancelamento sem download atrasado, ausência de chamadas novas à nuvem ou Groq e preservação de base/armazenamento conferidos.
- Excel e PDF gerados por `file://` com bibliotecas locais.
- Regressão em navegador do Copiar Resumo, Aurora, cadastro, edição, exclusão, CNJ, meta e sincronização, com APIs simuladas.
- Nenhum erro ou warning de console nos testes completos da Central.

### Reexecutar os testes

Requisitos: Node.js 24 ou superior e Python com pypdf. Os programas são necessários somente para desenvolvimento/testes, não para usar o ERP.

Na pasta do projeto:

```bash
cd tests
npm ci
python -m pip install -r requirements-export.txt
npm test
npx playwright install chromium
npm run browser
npm run browser:export
```

Os testes de navegador interceptam os serviços e usam respostas simuladas. Eles não usam sua chave Groq nem gravam na sua planilha. Os arquivos de teste gerados ficam em `tests/.artifacts/`; essa pasta não é necessária para publicar o ERP. `ERP_TEST_OUTPUT` permite escolher outra pasta; `ERP_CHROMIUM_PATH` permite usar um executável Chromium já instalado.

## 11. Limitações conhecidas e decisões

- Excel aceita no máximo 32.767 caracteres por célula. Se um campo original ultrapassar esse limite, a exportação XLSX é bloqueada com aviso; o texto não é truncado. Não há alteração automática do registro.
- A altura visual de uma linha Excel é limitada pelo formato. Textos muito extensos permanecem íntegros, mas podem exigir expansão da área de leitura ou consulta na barra de fórmulas. A altura não reduz o conteúdo armazenado.
- Referência não possui ano próprio. Nenhum ano de referência foi inventado.
- Os favoritos/presets persistentes eram opcionais e não foram incluídos. As condições ficam em memória durante a aba atual; nenhum novo dado é gravado no LocalStorage.
- A disponibilidade total é a base já carregada pelo ERP. Sem sincronização recente, a Central não pode prometer que essa base corresponde à versão mais nova da planilha.
- Em `file://`, a geração roda na página porque navegadores costumam impedir Workers locais. Grandes PDFs podem causar uma pausa; o cancelamento impede o download, mas não interrompe instantaneamente uma etapa síncrona já em execução. HTTP/HTTPS com Workers é preferível para bases grandes.
- A geração em Worker possui limite de três minutos por tarefa. O volume prático depende da memória do dispositivo; não foi prometida exportação ilimitada. Foram testados filtros com 5.000 registros, XLSX com 1.000 e PDF com 350, além do caso de texto extremo.
- Roboto cobre os acentos e caracteres latinos verificados. Alfabetos/glyphs fora da cobertura da fonte, como alguns emojis e escritas específicas, não tiveram cobertura tipográfica universal validada no PDF.
- Excel e LibreOffice não foram abertos em aplicativos de desktop nesta validação. A estrutura e os valores do XLSX foram conferidos por leitores independentes; essa verificação não substitui um teste em todas as versões desses aplicativos.
- O navegador executado foi Chromium. Firefox, Safari e aparelhos físicos não foram executados; a responsividade foi verificada em viewports móveis.
- Google Planilhas e Groq foram simulados nos testes de regressão. Não foi feita gravação em produção nem consumo real da API da Aurora.
- Os efeitos e mídias já existentes foram preservados por comparação de hashes. Esta entrega não redesenhou nem refez uma auditoria artística de todos os Easter Eggs.

## 12. Reversão

1. Feche as abas abertas do ERP.
2. Restaure o backup da pasta que você guardou antes da instalação; ou restaure o `index.html` da base identificada no início deste manual.
3. Se reverter apenas o `index.html`, os módulos novos deixam de ser carregados. As pastas novas podem permanecer sem efeito. Se quiser removê-las, remova somente `js/export/`, `css/export-center.css` e `vendor/export/`, além dos novos testes/documentação da Central.
4. Para restaurar também os metadados de testes, recupere `tests/package.json` e `tests/package-lock.json` do backup.
5. Recarregue com Ctrl+F5.

Não remova `js/reports/`, `js/aurora/`, `js/themes/`, `assets/` ou outros diretórios antigos ao desfazer a Central. Não há migração de banco para reverter, e não é necessário limpar LocalStorage ou restaurar dados da nuvem.
