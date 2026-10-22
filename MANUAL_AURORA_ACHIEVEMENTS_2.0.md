# Aurora Achievements 2.0 — manual completo

## 1. O que foi implementado

Uma evolução da área **Conquistas e marcos** da Aurora Live, com exatamente **70 níveis e 350 missões**, cinco por nível. Não há menu lateral novo nem painel independente. O botão **Ver Missões** reutiliza a janela de conquistas já existente. O ajuste visual mantém no card somente emblema, número, título, resumo de conclusão e uma pequena barra; as cinco missões ficam na janela.

O nível 1 é **Novato**, o 30 é **Especialista de Elite** e o 70 é **Lenda da Aurora**. Todos os títulos são exclusivos. Os emblemas são SVGs locais: dez símbolos combinados com sete faixas de ornamentação produzem 70 composições distintas, sem imagens externas ou dependências adicionais.

## 2. Entenda o nível atual

O sistema avalia o nível 1. Se as cinco missões estiverem completas, avalia o 2 e assim por diante. **O primeiro nível com alguma missão pendente é o nível atual**. Não é necessário clicar para receber níveis: o histórico pode liberar várias etapas numa avaliação.

Exemplo: se as cinco missões do nível 12 estiverem completas e o nível 13 tiver três completas, a interface mostra nível 13 e 3 de 5 missões. No último nível, a conclusão das cinco missões mostra **Jornada concluída**. Nunca há nível 71.

As cinco missões de cada nível são obrigatórias. Uma missão pode oferecer caminhos alternativos: basta atender uma condição ligada por **OU**. Quando houver **E**, todas são necessárias. Essas alternativas fazem parte do catálogo, estão visíveis e não são atalhos secretos.

## 3. Seu histórico tem o mesmo valor

Todos os registros disponíveis, de todos os anos, participam. Não existe exigência de produzir depois do desbloqueio. Um marco cumprido no passado é reconhecido quando a progressão chega ao nível correspondente.

Na primeira confirmação do fluxo existente de dados, uma única animação discreta destaca o nível reconhecido no card. A mensagem local é anunciada para tecnologias assistivas e pode ser consultada na janela de missões. Nenhuma janela é aberta automaticamente e não há sequência de dezenas de animações. Enquanto a nuvem ainda não confirmou, dados já disponíveis no navegador permitem visualizar o nível, mas o aviso aguarda a confirmação. Se a conexão falhar, as conquistas continuam calculáveis sobre o histórico local disponível.

Ao mudar de navegador, o nível é reconstruído quando os registros forem recuperados. O sistema só consegue reconhecer aquilo que está nos dados disponíveis: registros apagados ou não recuperados não são estimados.

## 4. Como ler as missões

Na janela, cada missão mostra nome, estado, valores atuais e exigidos, além de barra com informação textual acessível. No card, a barra resume quantas das cinco missões do nível estão concluídas. Valores acima do alvo são exibidos, mas a barra para em 100%.

- Regra simples: 145 / 200 encerramentos equivale a 72,5%.
- Regra **E**: o percentual é o menor percentual das condições, pois todas são necessárias.
- Regra **OU**: o percentual é o maior percentual das alternativas, pois basta uma.

Nunca somamos unidades incompatíveis, como dias e processos. Os estados são identificados por texto e símbolos, além da cor.

## 5. Como explorar a jornada

1. Na Aurora Live, encontre **Aurora Achievements 2.0**.
2. Veja o título, emblema, número do nível e resumo de conclusão. Não há lista de missões no card.
3. Clique em **Ver Missões**. A janela abre no nível atual, com cinco missões e o próximo título.
4. Para consultar a jornada completa, escolha qualquer nível no seletor, use as setas ou os botões numerados da faixa de dez níveis.
5. Leia as cinco missões e o estado da etapa.
6. Feche pelo botão, por Escape ou clicando fora da janela. O foco retorna ao botão de abertura.

A jornada renderiza somente cinco missões e dez botões de nível por vez. O seletor permite acessar diretamente qualquer uma das 70 etapas.

- **Concluído:** todas as missões foram atendidas e os pré-requisitos anteriores também.
- **Nível atual:** primeira etapa com pelo menos uma missão pendente.
- **Bloqueado:** depende de concluir as etapas anteriores; seus requisitos continuam consultáveis.
- **Requisito alcançado — aguardando desbloqueio:** o histórico já atende aquela missão futura, mas o nível ainda não está liberado. Isso não aumenta o total de missões reconhecidas antes da hora.

## 6. Quais registros e métricas participam

São utilizadas exclusivamente informações existentes: `_uid`, data de finalização, tipo, Panjud e recusa. O mecanismo não precisa de CNJ, ID de caso, observações, horário de trabalho, número de acessos ou prazo judicial.

As métricas incluem total acumulado; confirmações válidas; Ônus, Acordo e Êxito; diversidade; dias com produção e com confirmação; semanas, meses e anos com produção; melhor sequência histórica de dias úteis; melhores dia, semana, mês e ano; dias com pelo menos três registros; semanas com cinco; meses com dez.

**Data:** deve ser uma data civil válida, igual ou anterior à data atual do ERP (America/Fortaleza). O componente de data de valores ISO com horário é preservado, como nos demais módulos. Datas inválidas e futuras não entram em nenhuma métrica de conquistas; continuam intactas no cadastro.

**Identidade:** cópias do mesmo `_uid` contam uma vez. Se cópias desse `_uid` divergem em data, tipo ou status, o grupo inteiro fica fora da avaliação, pois não há versão confiável para escolher. Essa situação aparece em **Critérios e qualidade do histórico**. Linhas sem `_uid` são preservadas como registros distintos; repetir a mesma referência de objeto na memória não a conta duas vezes. Não deduplicamos pelo número CNJ ou pelo ID do caso: o mesmo processo pode ter registros legítimos distintos.

**Confirmação:** exige exatamente `panjud === 'Sim'` e `recusado === 'Não'`. Recusas, conflito Sim/Sim e status desconhecidos ou ausentes não são confirmação. Esses registros ainda podem compor a produção cadastrada quando a data é válida. Não há alteração dos critérios do ERP ou normalização gravada nos registros.

**Tipos:** são os valores cadastrados `Ônus`, `Acordo` e `Êxito`. Outro valor não concede marco por tipo. Missões de tipo ou diversidade oferecem uma alternativa por dias produtivos, pois a distribuição da carteira não depende inteiramente do usuário.

## 7. Períodos e consistência

- Dia: data de finalização registrada, contada uma vez como dia produtivo, independentemente do volume.
- Semana: segunda a domingo, identificada pela data completa da segunda-feira. Uma semana que cruza dezembro/janeiro continua sendo uma única semana real. Semanas de anos diferentes não se confundem pelo número da semana.
- Mês: ano e mês civil da data de finalização. Outubro de 2025 e outubro de 2026 são períodos diferentes.
- Ano: ano civil da data de finalização.
- Melhor sequência: maior sequência histórica de segundas a sextas com produção. Sábados e domingos não são exigidos nem rompem a sequência. Feriados, férias e folgas não são conhecidos; a sequência não representa presença ou ausência no emprego.

Os recordes históricos continuam reconhecidos na virada do ano, desde que os registros ainda estejam disponíveis. O mês de referência usado pelo financeiro não é confundido com o mês civil destas missões.

## 8. Metas mensais e conquistas anteriores

As metas existentes não têm histórico anual/versionado completo. Por isso, **nenhuma das 350 missões atribui uma meta vigente a anos anteriores**. O indicador da meta atual permanece na Aurora Live, com seu funcionamento original, mas não bloqueia a jornada.

Os marcos de volume, recordes e constância foram incorporados às categorias do novo catálogo. O recorde de conquistas é histórico; os indicadores existentes de comparação de hoje com o ano atual permanecem separados e identificados. Não há duas listas concorrentes de recompensas na interface.

Os contratos `achievements` e `achievementCatalog` continuam disponíveis em `AuroraLiveInsights.build`. Quando recebe a progressão integrada, o catálogo contém as 350 missões e `achievements` contém somente as reconhecidas. A assinatura antiga permanece como compatibilidade para consumidores isolados e os testes anteriores. O ERP integrado usa o catálogo 2.0.

## 9. Curva de dificuldade

| Nível | Marco acumulado | Etapa |
|---|---:|---|
| 1 | 5 | Novato |
| 10 | 100 | Primeiros Passos |
| 20 | 500 | Aprendizado |
| 30 | 1.000 | Especialização |
| 40 | 2.000 | Alto Desempenho |
| 50 | 3.500 | Maestria |
| 60 | 6.000 | Elite |
| 70 | 10.000 | Lenda da Aurora |

O volume é apenas uma das cinco missões. Também há confirmação, repertório, dias produtivos e períodos. Os desafios diários chegam a 20, semanais a 80 e mensais a 200, com alternativas de constância. Um desafio anual pode usar uma rota de histórico distribuído em vários anos. O catálogo completo descreve os alvos exatos.

O balanceamento foi validado com dados sintéticos, inclusive uma carteira de tipo único. Isso não torna o ritmo simulado uma recomendação de trabalho. A dificuldade real depende do histórico e da distribuição da produção. Não há punição, perda financeira ou mudança nas metas por não completar uma missão.

## 10. Animações e acessibilidade

A animação curta de evolução destaca o emblema e o título dentro do card, sem mudar sua altura. A mensagem correspondente é anunciada para leitores de tela e exibida na janela de missões quando aberta. Não há abertura automática, bloqueio de cliques, mudança de foco ou chamada de IA. Avançar vários níveis produz um único reconhecimento, não uma animação por nível.

Para desativar, abra a jornada e desmarque **Animações discretas de conquistas**. A preferência é salva separadamente. `prefers-reduced-motion` também desativa os movimentos, independentemente da preferência local. A mensagem textual continua acessível.

A jornada tem navegação por teclado, foco contido enquanto aberta, retorno de foco, Escape, nomes acessíveis para níveis e barras e estado explícito em texto. Os emblemas são decorativos: o título e o número adjacentes fornecem seu significado ao leitor de tela.

## 11. Reavaliação e armazenamento

As avaliações reutilizam o ciclo existente de atualização da Aurora Live. Não há outra sincronização, timer recorrente, tabela ou API. A mesma versão dos dados reaproveita o resultado agregado. Alterar apenas observações ou filtros não recalcula missões; corrigir data, tipo, status, identidade ou lista de registros invalida o resultado. A mudança de data atual também reavalia os registros futuros que se tornaram elegíveis.

Uma edição de ano anterior também atualiza conquistas, mesmo quando os indicadores do ano atual permanecem iguais. As estatísticas são agregadas antes de avaliar as 350 regras, sem 350 varreduras do histórico. Acima de 20 mil linhas, a avaliação é dividida em lotes que cedem tempo ao navegador; uma avaliação anterior é cancelada se os dados forem atualizados. Durante o cálculo, a área informa que o histórico está sendo reavaliado. Não há timer recorrente novo.

O único armazenamento novo é **`aurora_achievements_ui_v2`**, contendo versão do catálogo, preferência de animação e controle dos avisos já apresentados. Não contém registros, CNJs, observações, credenciais ou nível concedido sem comprovação. Falha de armazenamento não impede o funcionamento durante a sessão.

Exclusão ou correção pode reduzir o nível. O maior marco já apresentado é usado **somente para evitar repetir avisos** ao restaurar dados; ele nunca mantém uma missão concluída contra os dados. Mudanças de versão do catálogo provocam revalidação. Em outro navegador, o reconhecimento histórico pode ser apresentado novamente uma vez.

## 12. Aurora AI, dados e preservação

As conquistas funcionam sem Groq e sem chave de API. Mensagens básicas são locais. A leitura do nível está disponível em `window.AuroraAchievements.getSnapshot()`, com métricas agregadas e resultados; não envia processos à IA. Não foram acrescentadas chamadas automáticas ao chat nem ferramentas para modificar dados.

Cadastro, cálculos financeiros, metas, planilhas, resumo WhatsApp, Central de Trabalho, exportação, temas, mídias e Easter Eggs mantêm seus arquivos e regras, exceto os pontos de integração da exibição de conquistas listados no manual do patch. Não foi feita alteração remota no GitHub.

## 13. Instalação, reversão, arquivos e testes

Para o ajuste visual compacto, consulte **LEIA_ME_AJUSTE_VISUAL_ACHIEVEMENTS.md**. A documentação **MANUAL_PATCH_AURORA_ACHIEVEMENTS.md**, o manifesto e o relatório originais registram a entrega inicial 2.0; os resultados específicos do ajuste visual estão no novo LEIA_ME. O ZIP completo inclui todos os arquivos da base, mídias, dependências de execução e licenças; dependências de desenvolvimento dos testes são instaladas por `npm ci` em `tests`, como antes.

Para reverter, use a versão do repositório no commit base informado naquele manual. Substitua os arquivos modificados pelos originais e remova os arquivos novos da funcionalidade. Não apague os dados do navegador ou da planilha. A chave auxiliar nova pode permanecer sem efeito, pois o sistema anterior não a lê; apagar somente essa chave reinicia preferências/avisos, não dados.

Os testes e seus resultados estão em **RELATORIO_TESTES_AURORA_ACHIEVEMENTS.md** e em `tests/results/aurora-achievements.json`. Há testes estruturais do catálogo, dados históricos, desbloqueio, cache, armazenamento, DOM, responsividade, temas e regressão dos recursos existentes. Serviços externos são simulados: nenhum teste envia dados à planilha real ou usa credenciais reais.

## 14. Limitações conhecidas

1. A comprovação é limitada aos registros disponíveis e aos campos realmente existentes.
2. Não existe calendário individual de trabalho; a sequência de segunda a sexta não mede presença.
3. As metas antigas não podem ser reconstruídas com confiança e não concedem missões.
4. Linhas sem `_uid` não permitem provar se duas linhas idênticas são cópias ou eventos distintos; preservamos linhas distintas e informamos essa condição.
5. Identidades duplicadas conflitantes ficam pendentes de correção pelo usuário; o sistema não escolhe nem corrige registros.
6. Algumas metas exigem confirmações válidas no Panjud; recusa não pode substituí-las.
7. A preferência de animação e o histórico de avisos pertencem ao navegador; a progressão matemática é reconstruída dos dados.
8. O balanceamento é determinístico e foi validado em cenários sintéticos, não sobre dados pessoais da produção. O relatório registra o ambiente e os tempos medidos.
