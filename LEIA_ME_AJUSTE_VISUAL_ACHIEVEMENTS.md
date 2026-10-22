# Aurora Achievements 2.0 — ajuste visual compacto

## O que mudou

O card da Aurora Live mostra somente emblema, número e título do nível atual, quantidade de missões concluídas, uma pequena barra e o botão **Ver Missões**. As cinco missões não são renderizadas no card.

O botão abre a mesma janela de conquistas já existente, inicialmente no nível atual. Nela estão as cinco missões com descrição, estado e progresso; o próximo nível; e o seletor da jornada completa de 70 níveis. A janela tem rolagem interna, fecha por Escape ou pelo botão e devolve o foco a **Ver Missões**.

O reconhecimento de evolução destaca discretamente o emblema e o título, sem aumentar a altura do card. A mensagem correspondente é anunciada para tecnologias assistivas e exibida na janela. Movimento reduzido e a opção de desativar animações continuam respeitados.

Os indicadores anual e mensal continuam disponíveis em **Critérios e qualidade do histórico**, dentro da janela. Nenhum cálculo desses indicadores foi alterado.

## Instalação

Este patch é para o **Aurora Achievements 2.0 já instalado**, correspondente ao ZIP completo entregue anteriormente, com 363 arquivos:

`ERP_Leticia_Lustosa_v2.1.1_COMPLETO_Aurora_Achievements_2.0.zip`

SHA-256 dessa base: `99aea85e9f4d9f412e6d22a6a1b2fdaad456dfd90aecce4264239e0ed47b4c2f`.

1. Extraia o ZIP deste ajuste.
2. Na raiz do repositório, envie os arquivos e pastas extraídos, preservando os caminhos abaixo. Não envie o ZIP como se fosse o código e não crie uma pasta externa envolvendo seu conteúdo.
3. Substitua os seis arquivos existentes e acrescente este LEIA_ME. Prefira enviar o conjunto numa única atualização; se precisar separar, envie CSS e JavaScript antes de `index.html`.
4. Atualize o site com Ctrl+F5. Não limpe o LocalStorage nem os dados da planilha.

Se você ainda não instalou o Aurora Achievements 2.0, aplique primeiro a entrega anterior. Este patch contém apenas o ajuste visual. Nenhuma alteração remota foi feita no GitHub.

## Arquivos do patch

| Caminho | Alteração |
|---|---|
| `index.html` | Card resumido, botão Ver Missões e reorganização da janela existente; atualização das URLs de CSS/JS para evitar cache antigo. |
| `css/aurora-achievements.css` | Estilos compactos e animação no resumo, sem esticar a grade; aparência do modal nos temas. |
| `js/aurora/achievements/view.js` | Apresenta resumo no card e detalhes na janela; mantém o fluxo de navegação existente. |
| `tests/achievements-ui.test.cjs` | Atualiza as verificações de interface para card resumido e missões no modal. |
| `tests/achievements-browser.cjs` | Verifica alturas, ausência de missões no card e comportamento da janela nos 11 temas. |
| `MANUAL_AURORA_ACHIEVEMENTS_2.0.md` | Atualiza as instruções de uso para Ver Missões. |
| `LEIA_ME_AJUSTE_VISUAL_ACHIEVEMENTS.md` | Este resumo, instalação e resultados do ajuste. |

São **7 arquivos: 6 modificados e 1 novo; nenhum removido ou renomeado**. Os demais arquivos da instalação permanecem como estão. O manifesto e o relatório originais documentam a entrega inicial 2.0; este LEIA_ME registra a revisão visual.

## Preservação

`js/aurora/achievements/catalog.js` e `engine.js` são idênticos por SHA-256 aos da base. Permanecem os 70 níveis, 350 missões, critérios de conclusão, reconhecimento histórico e estado auxiliar existente. Não há mudança de versão do catálogo ou reinício de progresso.

Cadastro, cálculos, sincronização, módulos da Aurora Live, temas e mídias mantêm seus arquivos originais. Não foi alterado o CSS geral da grade nem aumentada a altura dos outros cards.

## Testes executados

- **386 testes automatizados passaram**, sem falhas ou testes ignorados.
- **88 cenários de layout passaram:** 11 temas × desktop/celular × níveis 1, 30, 60 e 70. Incluem Original, Claro, Escuro, Natal, Ano Novo, Páscoa, Festa Junina, Halloween, Terror, Cyberpunk e Glassy CRM.
- No desktop de 1366 px, os cards da segunda linha mediram aproximadamente **211 px**, e retirar temporariamente o card de conquistas não reduziu a altura do Radar: o resumo acrescentou **0 px** à linha nesses cenários. No celular de 375 px, o card de conquistas mediu **179 px**. São medições do ambiente de teste, não alturas fixas impostas ao layout.
- A janela apresentou cinco missões, barras e estados, acesso aos 70 níveis, próximo título, rolagem interna e ausência de transbordamento horizontal. Foram verificadas navegação por teclado, Escape e retorno do foco.
- Também passaram as verificações em 320 px, execução por `file://`, movimento reduzido/normal, opção de animação, recarga e abertura com efeitos dos temas ativos.
- Nenhum erro de página ou aviso de console nos testes de navegador. Capturas de desktop e celular foram inspecionadas, incluindo Original e Glassy CRM.
- O patch foi aplicado a uma cópia limpa da entrega anterior e o resultado comparado por SHA-256 com a versão visual atualizada: **364 arquivos equivalentes**, sem dependência omitida.

Ambiente: Chromium 153, Node.js 24 e Playwright/JSDOM. Dados e integrações externas foram simulados; não houve escrita na planilha real nem chamadas reais à Groq. Não foram executados testes em Safari, Firefox ou dispositivos físicos.

Para reproduzir, use `npm test` e `npm run browser:achievements` dentro de `tests`, com as dependências da suíte instaladas. O procedimento de instalação dessas dependências permanece no manual anterior.

## Reversão

Restaure os seis arquivos modificados a partir do ZIP completo anterior e remova apenas este LEIA_ME. Não é necessário alterar registros, metas, planilha ou LocalStorage.
