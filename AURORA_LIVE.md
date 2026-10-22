# Aurora Live — atualização incremental

Base: `rafaelmuniz16-afk/ERP_Leticia_Lustosa_v2.1`, branch `main`, commit `ec1bd073cb4b9c65e681adffe5e956d0d6b2505c`.

Nenhum commit ou push foi realizado. O pacote contém o projeto inteiro, incluindo as nove imagens, sete trilhas MP3 e o vídeo do repositório. Não inclui credenciais, cache de navegador, dependências de teste ou dados de produção.

## Instalação

Extraia o ZIP e copie o conteúdo da pasta `ERP_Leticia_Lustosa_v2.1` para a pasta publicada do repositório. `index.html`, `css`, `js` e `assets` ficam juntos. Não é necessário instalar dependências ou compilar. Use GitHub Pages ou outro servidor HTTP/HTTPS; o agente existente usa módulos ES, que podem ser bloqueados em `file://`.

As configurações de API, fontes, Chart.js e SweetAlert permanecem as existentes. As chaves de negócio e os dados no LocalStorage não são migrados ou apagados. Não foi feita nenhuma escrita na planilha de produção durante o desenvolvimento.

## Organização do painel

O card existente `#sideAuroraCard` foi ampliado e transferido da sidebar para a área principal, logo após os KPIs. Não há um segundo Aurora Live. Foram preservados `#sideAuroraMsg` e as classes `.side-aurora-*`, incluindo as variações de nome e símbolo de cada tema.

Seis blocos: Power Level, Leticia vs. Leticia, Aurora Observa, Radar Financeiro, Evolução e Conquistas. O layout usa três colunas, duas abaixo de 1200 px e uma abaixo de 600 px. O card deixa de ficar sujeito à ocultação da sidebar em celulares e à limitação de 270 px no menu superior. Todos os novos estilos ficam dentro de `#sideAuroraCard`, reutilizando tokens e fontes existentes.

O Radar conserva integralmente `get15BusinessDiagnostics()`, suas quinze mensagens, fórmulas, ordem e mês selecionado. Continua alternando a cada 8,5 segundos e aceita clique no card. Há também botões acessíveis para avançar e pausar. Clicar em controles ou na explicação dos indicadores não avança acidentalmente a mensagem. A transição continua usando 220 ms; movimento reduzido é respeitado pelo CSS.

## Fórmulas e significado dos dados

### Power Level — Hoje

`Power Level = arredondar(encerramentos de hoje / média histórica × 100)`.

- **100** representa a própria média, não uma meta inventada.
- A média usa os últimos **20 dias anteriores com encerramentos**, exigindo pelo menos **três dias**. Quando há menos, a tela apresenta “Histórico em formação”.
- Hoje e histórico usam a **data de finalização** (`data`), todos os tipos e situações Panjud, somente datas válidas do **ano atual**, sem datas futuras.
- Dias sem registros não entram no denominador dessa média: o ERP não informa presença, férias ou jornada de cada dia.
- O índice pode ultrapassar 100. A barra completa em 100, e o número mantém o valor real do índice. Não há pesos financeiros, pontos artificiais ou participação da IA.
- O percentual é `(hoje / média − 1) × 100`, apresentado com uma casa decimal. Hoje é um período incompleto; a interface explicita isso.

### Leticia vs. Leticia

Compara hoje ao melhor dia **anterior** do mesmo ano, usando datas completas. Empatar não é superar: `faltam = máximo(0, recorde anterior − hoje + 1)`. Ao superar, o card destaca o novo recorde e preserva a referência anterior na mensagem. Sem um dia anterior, o primeiro dia forma a referência e não dispara um recorde fictício. O melhor dia exibido já inclui hoje, se ele for maior.

As métricas de hoje não mudam quando o usuário filtra outro mês na tabela. O Radar Financeiro continua seguindo esse filtro.

### Meta e ritmo diário

O bloco novo usa a meta vigente de `metas[mês atual]`. A estrutura existente não atribui um ano à meta; isso não foi alterado. Para evitar misturar anos nos novos indicadores, os registros confirmados são restringidos ao ano da data de finalização e ao mês de referência atual.

`ritmo diário = teto((meta mensal − confirmados anteriores a hoje) / dias úteis restantes, incluindo hoje)`.

O numerador é fixado pelo saldo anterior a hoje: a referência não diminui artificialmente a cada registro feito hoje. A comparação é com os casos de hoje com `panjud = Sim` e mês de referência atual. Conta segunda a sexta; não existe calendário de feriados no ERP. Não cria ritmo diário nos fins de semana, com meta ausente/zero ou quando a meta já estava atingida antes de hoje.

Os cálculos financeiros antigos não foram alterados. Por isso o Radar e as novas métricas têm escopos explicitamente distintos: o Radar segue a regra mensal original; as novas métricas validam data/ano e evitam registros futuros.

### Evolução e marcos

- Barras: últimos sete dias corridos, incluindo hoje. Zero significa nenhum encerramento registrado naquele dia, não ausência de trabalho.
- Evolução percentual: sete dias **completos**, anteriores a hoje, contra os sete anteriores a eles. Só aparece com cobertura de 14 dias no ano atual. Sem registros no período-base, exibe contagens e não divide por zero.
- Sequência: dias de segunda a sexta consecutivos com encerramentos. Hoje, enquanto sem registro, não quebra a sequência anterior. Feriados não são descontados. Fins de semana não interrompem a sequência.
- Catálogo inicial: 50 e 100 encerramentos no ano, meta mensal, recorde de hoje e sequência de cinco dias úteis. São derivados dos dados atuais; exclusões ou correções podem remover marcos que deixaram de ser verdadeiros. Não são troféus permanentes armazenados à parte.

Datas inválidas ficam fora das novas comparações, com aviso discreto no detalhamento. Nenhum registro é reescrito.

## Insights, eventos e IA

Os quinze diagnósticos são envolvidos em objetos com `id`, categoria, prioridade, origem e texto. O Radar conserva sua própria rotação. Recordes, metas, marcos, constância e desempenho são detectados separadamente por regras locais, sem inserir novas frases no array financeiro.

Fluxo: alteração confirmada → snapshot local → comparação com snapshot confirmado anterior → evento que acabou de se tornar verdadeiro → prioridade → comentário local imediato → eventual geração.

Eventos, em ordem de prioridade:

1. Novo recorde do ano.
2. Meta mensal atingida.
3. Ritmo diário necessário alcançado.
4. Marcos de 100 e 50 encerramentos no ano.
5. Sequência de cinco dias úteis.
6. Pelo menos 25% acima da média, com histórico suficiente.
7. Pelo menos 90% do recorde anterior, quando esse recorde tem dez casos ou mais e ainda não foi superado.

Os limiares de 25%/90% são critérios explícitos de relevância para notificações, não pesos do Power Level. Uma produtividade parcial abaixo da média usa leitura local, sem disparar cobranças por IA.

### Controle de chamadas

- A primeira carga estabelece uma referência; conquistas antigas não provocam uma sequência de chamadas.
- Apenas dados confirmados no carregamento/sincronização ou em operações bem-sucedidas do formulário/agente podem gerar eventos.
- A rotação de 8,5 segundos, troca de tema, busca, renderização e paginação **não chamam a IA**.
- Alterações próximas são agrupadas por 1,5 segundo; vence o evento de maior prioridade.
- Máximo de **três eventos generativos por dia** e intervalo de **45 minutos**, por navegador/origem.
- O ID impede repetição: recordes e ritmo diário por dia, meta mensal por ano/mês, marcos quantitativos por ano.
- `aurora_live_events_v1` armazena somente IDs, datas e contadores, limitados a 100 entradas. A reserva acontece antes da rede; erro ou recarga não repete automaticamente o evento.
- Web Locks coordena abas quando disponível; o restante do controle usa LocalStorage e memória. Se o armazenamento estiver indisponível, o controle vale durante a sessão. Não há limite centralizado entre dispositivos.
- A consulta usa o **mesmo transporte, chave e lista de modelos** de `js/auroraAgent.js`. A lógica normal do chat mantém ferramentas, histórico e voz. O Live não executa ferramentas nem escreve no chat/memória da Aurora.
- O transporte existente pode tentar dois modelos: o limite de três eventos permite, no máximo, **seis requisições HTTP** nesse fluxo por dia. O timeout do Live é de oito segundos por tentativa, até dezesseis segundos no total. O chat mantém seu timeout original de trinta segundos.

### Resposta e fallback

A IA recebe apenas estatísticas agregadas e a classificação já feita pelo ERP. Não recebe IDs ou números de processos. Retorna JSON com o mesmo evento e um comentário curto. Números só são aceitos como tokens autorizados, por exemplo `{{hoje}}`, substituídos pelos valores do JavaScript. Respostas com algarismos livres, percentuais inventados, tokens desconhecidos, JSON inválido ou certas afirmações incompatíveis são descartadas.

Essa validação controla os números e a estrutura; não constitui uma verificação semântica infalível de qualquer texto gerado. O fato local permanece disponível abaixo da mensagem da IA.

Chave ausente, chat ocupado, rate limit, modelo indisponível, erro, timeout ou resposta rejeitada mantêm a mensagem local adequada ao evento. O ERP não aguarda a geração para concluir gravações. Respostas atrasadas são descartadas se os dados mudarem. A página oculta cancela geração/timers; a retomada não duplica o intervalo.

## Arquivos

Criados:

| Arquivo | Responsabilidade |
| --- | --- |
| `js/aurora/live/metrics.js` | Cálculos puros de datas, média, índice, recordes, metas e evolução. |
| `js/aurora/live/insights.js` | Categorias, critérios de eventos, contexto e catálogo de marcos. |
| `js/aurora/live/personality.js` | Deduplicação, limites, geração, cancelamento e fallback. |
| `js/aurora/live/view.js` | Apresentação dos números, barras, marcos, observação e Radar. |
| `css/aurora-live.css` | Layout e estilos isolados do card, sem biblioteca nova. |
| `tests/aurora-live.test.cjs` | Testes locais sem dependências externas. |
| `AURORA_LIVE.md` | Esta documentação. |

Modificados:

- `index.html`: amplia/reposiciona o mesmo card e carrega seus arquivos.
- `js/core/diagnostics.js`: orquestra o painel e gerencia um único ciclo; a função financeira original é preservada integralmente.
- `js/core/render.js`: notifica a apresentação após renderizar.
- `js/core/init.js`: clique, pausa e início local do ciclo, inclusive sem nuvem.
- `js/core/records.js`: notifica operações confirmadas.
- `js/core/aurora.js`: disponibiliza o callback ao contexto do agente.
- `js/aurora/dispatcher.js`: notifica cadastro e alteração de meta pelo agente.
- `js/auroraAgent.js`: permite usar o transporte existente para comentário sem ferramentas; mantém o fluxo de chat.
- `js/aurora/prompts.js`: acrescenta um prompt exclusivo de observação; mantém o prompt original.
- `README.md`, `MIDIAS.md`, `VALIDACAO.md`: instruções e identificação do relatório histórico.

Não foram modificados: cálculos financeiros, API de nuvem, estado de negócio, helpers, CNJ, voz, catálogo de ferramentas, os dez CSS de temas, o sistema de efeitos, assets ou regras de auditoria.

## Validação executada e limites

### Testes de lógica

Execute `node --test tests/aurora-live.test.cjs` (Node 18+). São 21 testes cobrindo: vazio, histórico curto, índice acima/abaixo da média, janela de vinte dias, anos diferentes, datas inválidas/futuras, empate/superação, primeiro dia, metas/Panjud/referência, fins de semana, semanas completas, janeiro, sequência, correções/exclusões, preservação dos quinze textos, validação da resposta, baseline sem IA, confirmação, prioridade, deduplicação persistida, cooldown, orçamento, fallback, cancelamento e 100 mil registros.

### Integração executada

Foi executado um harness DOM com os scripts reais, módulos ES, Chart.js e SweetAlert existentes; a rede e reprodução de mídias foram simuladas. Foram verificados:

- Ordem de carregamento e existência de um único card.
- Inicialização com dados, vazio, poucos registros e falha da nuvem.
- Avanço por clique, pausa e retomada do Radar.
- Dez temas × três layouts × duas densidades: aplicação da identidade e manutenção do estado, **sem medição visual**.
- Filtro mensal preservando métricas de hoje.
- Cadastro, edição da data, exclusão, metas e sincronização pelos handlers originais.
- CNJ válido aceito; CNJ inválido bloqueado antes da gravação.
- Cadastro/meta pela Aurora Dispatcher.
- Chat com chamada de ferramenta e retorno ao usuário.
- Geração bem-sucedida, JSON inválido, 503, falha de rede, timeout, recarga e repetição de renderização.
- Nenhum erro de JavaScript nos cenários integrados, usando stubs para as APIs de mídia que o harness não implementa.

Todos os arquivos JS passaram pela verificação de sintaxe. IDs HTML são únicos, referências locais existem e os arquivos de mídia/temas foram comparados byte a byte com o commit de origem. Nenhuma dependência de desenvolvimento foi adicionada à aplicação.

### Verificações que não puderam ser executadas

O navegador local falhou ao iniciar por restrição de sockets do ambiente; o navegador remoto bloqueou a prévia local. Portanto **não foi possível validar visualmente em um navegador real** as larguras, fontes, sobreposição, overflow, FPS ou a experiência de teclado/leitor de tela. O CSS responsivo e suas relações de especificidade foram revisados no código, mas isso não equivale a testes visuais. Não há capturas de tela ou medições de FPS desta versão.

As respostas Groq e Apps Script foram simuladas nos testes. Não foi consumida a chave real, nem alterada a planilha, nem validada uma inferência real dos modelos. Os arquivos de mídia foram preservados e conferidos por hash; sua reprodução não foi retestada em navegador.

As verificações acima descrevem o que de fato foi executado; não são uma garantia de ausência de regressões em todos os navegadores.
