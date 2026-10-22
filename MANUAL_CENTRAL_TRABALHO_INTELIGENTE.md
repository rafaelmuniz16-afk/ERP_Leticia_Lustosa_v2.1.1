# Central de Trabalho Inteligente — uso e arquitetura

ERP_Leticia_Lustosa_v2.1.1 · 21/10/2026.
Base: `469229297c35a53e268284f34973451fb794a36a`.
Instalação e reversão: consulte `MANUAL_PATCH_GITHUB.md`.

## O que foi acrescentado

A Central é uma janela de consulta acessada pelo terceiro botão no cabeçalho do Aurora Live, ao lado das ações existentes de resumo e exportação. Não substitui o Radar Financeiro, não acrescenta outra navegação lateral e não cria um segundo cadastro. Reutiliza os dados já disponíveis no ERP, o motor de filtros/exportação, o validador CNJ, o formulário de edição e o transporte Groq existentes.

A janela oferece cinco indicadores, atalhos combináveis, filtros com chips removíveis, tabela paginada, detalhes completos, conferências determinísticas, análise opcional da Aurora e acesso aos exportadores e ao resumo existentes. Os 11 temas usam os mesmos tokens do sistema. No Glassy CRM há transparência e desfoque; os efeitos e o carrossel já existentes não foram reimplementados nem movidos por esta entrega.

## Indicadores: significado exato

Todos os cinco cards usam o mesmo período ativo, inicialmente o mês atual. Filtros de ID, CNJ, tipo, status, referência, observações e conferência afetam a lista e suas contagens auxiliares, mas não alteram o escopo temporal dos cards. Ao clicar em um card, os filtros complementares são substituídos pelo critério daquele indicador, preservando o período. Isso garante que a lista aberta tenha a quantidade anunciada no card.

| Indicador | Regra |
| --- | --- |
| Não confirmados no Panjud | Valor original de `panjud` exatamente igual a `Não`. |
| Recusados no Panjud | Valor original de `recusado` exatamente igual a `Sim`. |
| Confirmados no Panjud | Valor original de `panjud` exatamente igual a `Sim`. |
| Registrados hoje | Campo de data de encerramento válido, igual à data local de hoje, dentro do período ativo. |
| Registros para conferência | Quantidade de registros com pelo menos um alerta; cada registro conta uma única vez no card. |

Um registro com `panjud === 'Sim'` e `recusado === 'Sim'` aparece nos dois cards correspondentes e recebe alerta de conflito. As contagens não são parcelas mutuamente exclusivas. Valores legados fora de `Sim`/`Não` não são silenciosamente transformados em status oficial na Central; aparecem como fora do padrão. O alerta de conflito também reconhece variantes normalizadas para sinalizar a necessidade de conferência.

“Registrados hoje” usa a **data de encerramento existente**, não um horário de criação inexistente. “Não confirmado” é uma condição do cadastro, não uma conclusão de pendência jurídica. A Central não verifica o andamento real em um tribunal.

## Períodos e filtros

Períodos: hoje, ontem, semana atual, semana anterior, mês atual, mês anterior, últimos 7 dias, últimos 30 dias, ano atual, todos e intervalo personalizado. Semanas começam na segunda-feira. Os intervalos de últimos dias incluem hoje. As regras de datas são reutilizadas do motor de exportação; limites são inclusivos.

Mês/ano/semana atuais usam o intervalo completo correspondente, permitindo visualizar datas futuras indevidas para conferência. Registros sem data válida aparecem em **Todos os períodos**, pois não é possível situá-los em um intervalo confiável. O mês de referência é um filtro independente da data de encerramento.

Atalhos rápidos podem combinar status, tipos oficiais, hoje, conferências e presença/ausência de observações. “Todos no período” limpa os critérios complementares e mantém o intervalo. “Limpar todos os filtros” remove também a restrição temporal e seleciona todos os períodos. “Com inconsistências” alterna o filtro de conferência. Observações vazias podem ser filtradas, mas não constituem por si um erro.

A busca complementar inclui ID, número do processo com ou sem máscara, tipo, mês de referência, confirmação, recusa e trecho da observação. ID/CNJ/observação usam busca textual, sem interpretação por IA. Os chips mostram as restrições ativas e permitem remoção individual. A ordenação usa os critérios do exportador, com direção crescente/decrescente. A tabela mostra até 25 linhas por página e rolagem horizontal própria em telas pequenas.

## Conferências de dados

As conferências são projeções somente leitura. Nenhuma regra corrige, apaga, salva ou normaliza permanentemente o registro de origem.

- ID ou número CNJ duplicado na base inteira, inclusive quando o outro registro está fora do período ou do filtro atual.
- Número CNJ ausente/inválido usando `ERPProcessCNJ.isValid` existente, com a regra matemática já usada pelo formulário.
- Data ausente, inválida ou futura.
- Mês de referência ausente/inválido ou divergente do mês da data de encerramento.
- Status ausente/fora do padrão e conflito entre confirmação e recusa.
- Tipo de encerramento fora dos tipos oficiais ou campos essenciais ausentes.

Os detalhes mostram todos os alertas aplicáveis. Uma linha pode possuir vários, por isso a soma dos motivos pode superar a quantidade de registros para conferência. Observação vazia é opcional e foi excluída desse detector. Ausência de alertas não certifica a validade jurídica do caso.

## Detalhes e edição segura

“Ver detalhes” exibe os campos completos e os alertas daquela linha. Textos são inseridos como texto, sem transformar observações em HTML. Esta proteção localizada não é uma refatoração geral de segurança do ERP.

“Abrir no cadastro” procura o `_uid` original na base atual, fecha a Central e chama `startEdit` existente. Nunca identifica o registro apenas pelo número CNJ ou pelo ID exibido. Se o UID estiver ausente, duplicado ou tiver sido removido da base, a navegação é bloqueada com mensagem. Não há salvamento automático; continuam valendo a validação, os botões e o fluxo do formulário original.

## Atualização e integridade

Ao abrir, a Central captura uma projeção dos registros disponíveis em memória. O evento `erp:rendered`, emitido ao final da renderização existente, permite atualizar a consulta quando o ERP recebe mudanças. O foco da janela também verifica se a fonte mudou. Esses listeners são removidos ao fechar a Central; não foi criado polling ou um novo temporizador de sincronização.

“Atualizar consulta” relê somente a memória atual. A indicação de nuvem reproduz o estado disponível na interface e informa que a base pode incluir cache. Não inventa uma hora de última sincronização nem certifica que o servidor está atualizado. Nenhuma rotina da Central grava LocalStorage, modifica `bd`, salva metas ou chama o endpoint de sincronização. O único atraso local recorrente durante digitação é um debounce curto de busca, cancelado no fechamento.

Cálculos, regras de negócio e fluxos de cadastro/edição/exclusão, metas, nuvem, auditoria, gráficos e chat continuam nas implementações existentes. O evento novo não transporta dados pessoais. A seleção/filtros da Central permanecem apenas na sessão da página; não criam chaves de armazenamento persistente.

## Aurora: acionamento e limites

A análise só ocorre ao clicar em **Analisar com Aurora**. Abrir a janela, aplicar filtros, trocar tema ou receber registros não dispara IA. O JavaScript calcula todas as quantidades e fornece os fatos; a Aurora redige até três comentários curtos associados a esses fatos. Os números apresentados são montados pelo JavaScript e não extraídos de uma frase inventada pelo modelo.

O contexto enviado contém o período, contagens agregadas, distribuição por tipos oficiais, tipos não reconhecidos agrupados como “Outros”, motivos de conferência e distribuição por data. Distribuições com mais de 90 entradas são agrupadas por mês. Não são enviados IDs, CNJs, observações, valores digitados nos filtros nem nomes livres de tipos legados. O contexto ainda contém estatísticas de trabalho: elas são enviadas à Groq, como parte da integração já existente, somente quando você solicita.

O adaptador usa a chave e o transporte da Aurora já presentes no projeto. Não inclui ferramentas de alteração de registros. A validação local exige JSON compatível, fatos conhecidos e comentários curtos, bloqueando números livres, markup, links e algumas afirmações incompatíveis. Uma resposta inválida ou truncada permite uma única tentativa de reparo no nível da análise; o transporte mantém o comportamento de fallback de modelos que já existia. Não há chamadas ilimitadas.

A validação não prova semanticamente toda frase produzida por uma IA. Os comentários são apoio à revisão humana e não diagnóstico jurídico, garantia financeira ou certificação do cadastro. A interface mantém esse limite visível.

Mudança de filtro, atualização da fonte, fechamento ou nova revisão invalida a solicitação anterior. O controlador cancela o pedido quando possível e descarta respostas tardias. Antes de mostrar uma resposta, confere novamente a fonte, inclusive alterações ainda sem evento. Falta de chave, chat ocupado, indisponibilidade, recusa ou resposta incompatível produz mensagem local sem desabilitar consulta e exportação. O comportamento de validação do resumo detalhado existente continua coberto por sua suíte própria.

## Exportar a seleção

“Exportar resultados” e o acesso à central avançada abrem o diálogo de exportação existente com uma cópia de todos os critérios atuais e da ordenação. Não são exportadas somente as 25 linhas da página: é transferida a consulta inteira. O exportador recaptura os dados mais recentes, portanto o usuário deve conferir a contagem exibida antes de gerar o arquivo caso a base tenha mudado.

Foram acrescentados ao motor compartilhado o modo de status literal e o filtro de conferência. O exportador continua abrindo por conta própria com seu padrão normalizado original; quando recebe uma consulta da Central, mantém o modo literal visível. Isso evita que uma seleção rigorosa de `Sim`/`Não` se amplie silenciosamente após a transferência. Ambos os critérios têm chips removíveis.

A geração continua nos arquivos originais: Excel com sete colunas e título A1:G2, PDF em retrato com seis colunas e sem observações. Não foi criado outro gerador, formato ou biblioteca. As dependências locais continuam carregadas sob demanda, e o cancelamento existente é preservado.

## Copiar resumo: escopo explicitamente diferente

O resumo existente aceita período, não todos os filtros detalhados da Central. Por isso a transferência inclui um aviso visível de que **todos os registros do período** serão considerados, preservando os acumulados e regras oficiais do resumo. Não se apresenta o resumo como se correspondesse exclusivamente às linhas filtradas por tipo, ID, status, observação ou conferência.

O limite final é hoje, de acordo com a validação do resumo. Um intervalo inteiramente futuro é bloqueado. Em “Todos os períodos”, usa-se a menor e a maior data válida até hoje; base sem datas válidas usa hoje. Datas inválidas e futuras não são introduzidas no resumo por essa passagem.

Se você já editou a prévia, a confirmação existente decide se a nova seleção deve substituí-la. **Manter minha edição** preserva a prévia e o período anterior; o aviso informa que o período solicitado não foi aplicado. **Substituir prévia** aplica a nova seleção. Fechar um diálogo para abrir o outro não devolve indevidamente o foco ao fundo da página.

## Estrutura do código

| Responsabilidade | Arquivo |
| --- | --- |
| Markup, botão e ordem de carregamento | `index.html` |
| Estilos isolados por `#erpWorkDialog` | `css/work-center.css` |
| Snapshot, indicadores, conferências compartilhadas, filtros e contexto | `js/work-center/core.js`, `js/export/data.js`, `js/export/filters.js` |
| Controle do diálogo, debounce, detalhes, cancelamento e handoffs | `js/work-center/view.js` |
| Prompt, contrato e validação opcional da IA | `js/work-center/ai.js` |
| Transporte Groq e build clássico correspondente | `js/auroraAgent.js`, `js/aurora/agent.bundle.js` |
| Notificação após renderização existente | `js/core/render.js` |
| Entrada no exportador e no resumo existentes | `js/export/view.js`, `js/reports/view.js` |

A lista completa de arquivos novos/modificados está no manual de instalação. Nenhuma migração de arquitetura, dependência de produção nova ou alteração em arquivos de música/foto/vídeo faz parte desta atualização.

## Performance, responsividade e acessibilidade

O snapshot é construído na abertura e quando a fonte efetivamente muda; a UI trabalha com 25 linhas por página. A busca usa debounce de 120 ms. Não se abre uma conexão ou um loop de sincronização adicional. Listeners, solicitações e timers temporários são limpos ao fechar. Há teste determinístico com 10.000 registros, mas isso não é uma promessa de tempo fixo em qualquer aparelho.

O diálogo usa rolagem interna, cartões adaptativos e tabela com rolagem própria. O título, controles e ações possuem rótulos; há foco visível, fechamento por Esc e circulação de foco. Em detalhes, Esc retorna primeiro à lista. O CSS respeita `prefers-reduced-motion` e usa tokens de cores/tipografia já definidos. O Glassy recebe seu tratamento translúcido sem propagar estilos para outros temas.

## Evidências e limites de validação

Foram aprovados 338 testes automatizados: 248 regressões existentes e 90 testes novos (51 de projeções/regras, 17 de IA, 22 de interface). Três suítes de navegador exercitam a Central, exportação e resumo em 11 temas × 2 larguras, além de verificações em 320 px, modo arquivo local, efeitos ativos e foco.

Os fluxos exercitam filtros/ordem, detalhes, UID correto em duplicidades, cancelamento/respostas obsoletas, transferência do resumo, proteção de prévia, transporte da Aurora, recuperação de resposta truncada, cadastros/edição/exclusão, CNJ, metas, nuvem, clipboard e downloads. O XLSX e o PDF gerados a partir da seleção foram abertos/inspecionados. Os registros, cálculos e armazenamento foram comparados nos fluxos somente leitura. O patch aplicado à base limpa foi testado novamente e comparado por hash com o projeto completo.

**Limites:** os testes de navegador utilizaram Chromium headless e fixtures artificiais identificadas como dados de teste. Groq e Google foram interceptados com respostas controladas; não foram usadas credenciais reais nem alterados registros da sua conta. Fontes remotas foram substituídas por fallback na execução controlada. Safari, Firefox, leitores de tela reais, aparelhos físicos, conexão/cotas reais da Groq/Google, áudio audível e reprodução integral dos vídeos não foram homologados nesta etapa. Os assets originais foram preservados por hash, e as regressões existentes de temas continuaram aprovadas. A verificação não afirma ausência absoluta de bugs em condições não exercitadas.

O arquivo `tests/results/central-trabalho.json` consolida a execução. `MANIFESTO_CENTRAL_TRABALHO.json` identifica a base e os arquivos finais. O repositório remoto não foi modificado automaticamente.
