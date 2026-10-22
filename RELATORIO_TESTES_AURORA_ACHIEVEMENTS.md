# Relatório de testes — Aurora Achievements 2.0

## Versão e ambiente

- Base: `b3b2b2bb919620bc22724d922d17885150edbad0` — 349 arquivos conferidos por hash Git.
- Catálogo: 2.0.0, exatamente 70 níveis e 350 missões, cinco por nível.
- Ambiente: Node.js 24.19.0, Chromium 153.0.8010.0, Playwright 1.62.1 e JSDOM 30.1.3, Linux.
- Dados sintéticos e serviços externos interceptados. Nenhum acesso à planilha real, chamada real à Groq ou alteração no GitHub.

## Testes automatizados

**386 passaram; 0 falhas; 0 ignorados.** São 338 testes existentes, 36 do motor/catálogo e 12 da nova interface.

O catálogo foi validado quanto a contagem, IDs, títulos, emblemas, condições distintas, métricas, operadores e pré-requisitos. Testes deliberadamente inválidos confirmam a detecção de referências circulares, alvo impossível de tipos, métrica ausente e duplicações. Um histórico construtivo comprova as 350 missões; outro de tipo único comprova que a distribuição da carteira não impede chegar ao fim.

Progressão: ausência de registros, quatro de cinco missões, quinta missão, desbloqueio sequencial, vários níveis retroativos, requisito futuro alcançado com nível ainda bloqueado, conclusão do nível 70 e ausência de nível 71.

Dados: anos e meses distintos; semanas de segunda a domingo, incluindo virada do ano; datas inválidas/futuras; mesmo CNJ e ID de caso em registros legítimos; deduplicação por `_uid`; identidades conflitantes; linhas sem identidade; tipos; Panjud/recusa/status conflitantes; melhores dia, semana, mês e ano; sequência histórica; correções e exclusões.

Estado: recarga, histórico recuperado, armazenamento vazio/indisponível/corrompido, versão antiga, redução/restauração sem falsa subida, preferência de animação e ausência de dados pessoais no resultado. Cache detecta edição histórica; avaliação cooperativa equivale à síncrona e cancela resultados obsoletos.

Regressões unitárias existentes: Aurora Live, Glassy/efeitos, resumo e transporte de IA, filtros, XLSX, PDF, Central de Trabalho e interfaces. Os testes de PDF verificam conteúdo, orientação, acentos, cabeçalhos, seleção e paginação em 5, 40 e 350 registros, além de ID longo. Os de XLSX verificam as sete colunas e o cabeçalho mesclado.

## Testes de navegador

| Suíte | Layouts | Resultado |
|---|---:|---|
| Conquistas: níveis 1, 30, 60 e 70 × 11 temas × desktop/mobile | 88 | Passou |
| Central de Trabalho: 11 temas × desktop/mobile | 22 | Passou |
| Central de Exportação: 11 temas × desktop/mobile | 22 | Passou |
| Resumo WhatsApp: 11 temas × desktop/mobile | 22 | Passou |
| Total das matrizes | 154 | Sem erros de página/console |

Além das matrizes: largura de 320 px, rolagem, foco circular e retorno de foco, Escape, níveis bloqueados, recarga, movimento reduzido/normal, preferência de animações, execução por `file://` e abertura nos onze temas com efeitos ativos. Foram inspecionadas capturas de tela de desktop e celular; a lista mostra apenas cinco missões por etapa.

Os testes de resumo também exercitam cadastro, edição, exclusão, bloqueio de CNJ inválido, meta, sincronização simulada, clipboard, chat separado e recuperação de resposta truncada. Exportação e Central de Trabalho geram downloads reais de XLSX/PDF com a seleção e ordem esperadas, usando as bibliotecas locais. Dados, cálculos e armazenamento dos registros são comparados antes/depois.

As conquistas não fazem chamadas à Groq. O teste de histórico amplo verifica que eventos continuam sendo atendidos enquanto 25 mil linhas são avaliadas em lotes.

## Balanceamento e desempenho

A curva é testada com dez registros por dia útil e 60% de confirmações. Todos os níveis são alcançáveis nesse cenário e nenhum avanço exige mais de 700 registros adicionais na amostragem de 50 em 50. O cenário é uma ferramenta de comparação, não uma recomendação de produtividade. A exigência mensal máxima foi ajustada para 200 durante a validação para reduzir um salto intermediário. Há rotas alternativas por constância; não se exige distribuir artificialmente os tipos nem superar recordes após desbloquear um nível.

Medições da última execução no navegador:

| Registros | Primeira avaliação síncrona | Consulta com cache |
|---|---:|---:|
| 10.000 | 10.3 ms | 3.0 ms |
| 100.000 | 147.6 ms | 27.4 ms |

Acima de 20 mil linhas, a interface usa a avaliação em lotes para ceder execução ao navegador. Os tempos acima são do motor síncrono isolado; variam com equipamento, distribuição de dados e carga do ambiente, e não constituem garantia de latência.

## Preservação e pacote

Os 349 arquivos originais permanecem. Somente `index.html`, três pontos de integração JavaScript e `tests/package.json` foram modificados. Os módulos de cadastro, cálculos financeiros, metas, sincronização, auditoria/histórico, chat, exportação, resumo e temas mantêm seu conteúdo original. As 25 mídias/assets e os 214 arquivos em `vendor` são idênticos por hash. Os caminhos locais de scripts e estilos do HTML são conferidos na montagem.

O projeto completo tem 363 arquivos. O patch tem 19: 14 novos e 5 modificados; 0 removidos ou renomeados. Inclui os testes novos, os manuais, o catálogo e este relatório. Não inclui dependências de desenvolvimento instaladas, capturas de tela ou artefatos temporários dos testes.

## Teste de reconstrução do patch

**Concluído:** patch aplicado em cópia limpa; 386 testes passaram nessa cópia; a Central de Trabalho passou novamente em 22 layouts; os arquivos foram comparados por SHA-256 com o pacote completo. Após registrar os resultados, os pacotes foram reconstruídos e comparados novamente. As atualizações finais foram somente de documentação e manifesto.

O procedimento extrai o patch em cópia limpa da base, verifica todos os caminhos e conteúdos e compara com o ZIP completo. A equivalência usa SHA-256 por arquivo e a integridade CRC de ambos os ZIPs. Não há etapas manuais de edição de código.

## Reprodução

Dentro de `tests`, após `npm ci`:

```bash
npm test
npx playwright install chromium
npm run browser:achievements
npm run browser:work
npm run browser:export
npm run browser
```

Os testes de PDF também requerem Python com `pypdf`, como na suíte anterior. É possível definir `ERP_CHROMIUM_PATH` para Chromium existente e `ERP_TEST_OUTPUT` para resultados temporários. Os resultados estruturados acompanham `tests/results/aurora-achievements.json`.

## Limitações declaradas

- Não houve acesso ou gravação na planilha de produção nem uso de chave real da Groq; autenticação e disponibilidade dos serviços reais não foram testadas.
- Os testes de navegador foram executados em Chromium/Linux; Safari, Firefox e dispositivos físicos não foram executados.
- As mídias foram preservadas por hash. Não foi confirmada reprodução sonora/vídeo de todos os Easter Eggs nem permissões de autoplay de cada navegador.
- Auditoria e histórico tiveram preservação de código; não foi executada uma suíte ponta a ponta exclusiva de todas as ações dessas janelas.
- Acessibilidade foi verificada no DOM, por teclado e por inspeção visual; não foi realizada auditoria formal com leitor de tela ou certificação WCAG.
- A curva foi validada com históricos sintéticos. A comprovação real depende dos registros disponíveis, sem metas históricas inventadas ou calendário individual de folgas.
