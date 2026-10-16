# Glassy Carousel em Configurações → Temas

Correção para o ERP v2.1.1 com a atualização Glassy CRM + Aurora já instalada.
O pacote contém somente quatro arquivos modificados, com o conteúdo completo de cada um.

## Instalação

Extraia o ZIP na raiz da pasta atual do ERP, onde fica `index.html`, substituindo os arquivos nos mesmos caminhos. Recarregue com Ctrl+F5.

| Arquivo | Alteração |
|---|---|
| `js/themes/effects/glassy-crm.js` | Substitui a coleção de cinema da tela principal pelo carrossel dos botões existentes de temas, dentro das configurações. |
| `css/glassy-carousel.css` | Apresentação em perspectiva, cartões de prévia e controles de navegação dentro do seletor. |
| `js/themes/settings.js` | Sincroniza a montagem e restaura o foco no tema ativo ao abrir Configurações. |
| `GLASSY_ATUALIZACAO.md` | Instruções atualizadas desta correção. |

Não é necessário modificar `index.html`, excluir arquivos antigos nem limpar o LocalStorage. As imagens de cinema do pacote anterior deixam de ser utilizadas e não são carregadas pelo carrossel.

## Comportamento

- O Glassy Carousel aparece exclusivamente em **Configurações → Temas**, quando **Glassy CRM** é o tema ativo.
- A tela principal não recebe carrossel nem modal de filmes.
- Os onze temas continuam disponíveis. As prévias usam as cores e os nomes do seletor existente.
- Setas, teclado (←/→, Home/End) e arraste horizontal permitem explorar as opções sem trocar automaticamente o tema.
- Clique em um cartão ou em **Aplicar tema** para usar a opção. A aplicação e a persistência continuam no fluxo original do ERP.
- Ao escolher outro tema, a grade original volta imediatamente, preservando os botões e os seus eventos. Para entrar novamente no carrossel, escolha Glassy CRM nessa grade.
- Ao reabrir Configurações, o tema ativo é centralizado. A preferência Glassy também funciona após recarregar a página.
- Layout, densidade e efeitos continuam nos controles existentes, abaixo do seletor.
- Não há rotação automática, timers, carregamento de pôsteres ou gravação adicional de dados. A animação de navegação respeita a preferência de movimento reduzido.

## Preservação e validação

Os arquivos da Aurora, regras de negócio, cálculos, registros, integrações e os estilos dos demais temas não foram alterados nesta correção. As correções da Aurora entregues na atualização anterior permanecem instaladas.

Testes automatizados em DOM simulado verificaram:

- carrossel contido exclusivamente no diálogo de Configurações;
- reutilização dos onze botões e preservação da aplicação/persistência;
- navegação circular, teclado, arraste e bloqueio de clique acidental após arrastar;
- abertura, fechamento e reabertura das configurações;
- três ciclos pelos onze temas, sem duplicação de componentes;
- restauração da grade e dos atributos originais ao sair do Glassy;
- recarga com Glassy persistido em HTTP e `file://`;
- ausência de novos timers e preservação dos cálculos/dados locais;
- ausência de erros de console nos cenários simulados.

A validação automatizada não substitui a inspeção visual: não foi possível executar um navegador real neste ambiente. Não houve chamada à Groq nem gravação na nuvem de produção.
