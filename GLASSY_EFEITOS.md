# Glassy CRM — efeitos, surpresa Matrix e status da nuvem

Atualização incremental para a versão que já possui o Glassy CRM e o carrossel em Configurações → Temas.

## Instalação

Extraia o ZIP na raiz do ERP, preservando os caminhos abaixo, e substitua os arquivos existentes. Recarregue a página com Ctrl+F5.

| Arquivo | Alteração |
|---|---|
| `css/themes/glassy-crm.css` | Status da nuvem ajustado à barra de 80 px; estilos do fundo, partículas, cristal e surpresa Matrix. |
| `js/themes/assets.js` | Glassy reutiliza `Cyberpunk.png` e `Cyberpunk.mp3`, com o resolvedor de caminhos existente. |
| `js/themes/glassy-registry.js` | Adiciona o canvas ambiente e o mascote de cristal ao tema. |
| `js/themes/effects/glassy-crm.js` | Animação ambiente, partículas de clique, mensagens do mascote e reconstrução Matrix da foto; mantém o carrossel nas configurações. |
| `GLASSY_EFEITOS.md` | Instruções desta atualização. |

A foto e a música já existem em `assets/images/Cyberpunk.png` e `assets/audio/Cyberpunk.mp3` na versão fornecida. O resolvedor também mantém suporte à raiz e às demais pastas de mídia existentes. Não é necessário duplicá-las.

## Uso

Selecione Glassy CRM. Com os efeitos visuais ativados em Configurações, o fundo ganha iluminação ciano/violeta em movimento, trilhas luminosas e resposta suave ao ponteiro. Os cliques produzem pequenas partículas digitais.

O cristal no canto inferior direito tem mensagens próprias. **Dez toques no cristal** abrem a surpresa com a música Cyberpunk e a foto de Rafael e Letícia sendo formada por caracteres digitais em cascata. Após a formação, as cascatas continuam passando pela imagem. A foto mantém sua proporção.

A trilha começa na abertura da surpresa e é interrompida no fechamento, na troca de tema e quando a página fica oculta, pelo gerenciamento de mídia já existente. Se o navegador bloquear a reprodução, o controle de áudio oferecido pelo ERP permite iniciá-la manualmente.

O modo de movimento reduzido e a preferência de efeitos são respeitados: o retrato aparece completo e estático nesses modos, e a surpresa continua acessível.

## Sidebar

O título da conexão, o indicador com seu texto e o contador foram centralizados e distribuídos verticalmente dentro da barra compacta. O contador possui um destaque próprio e aceita quebra para valores extensos. Os textos Online, Offline e Verificando continuam sendo atualizados pelo core. O layout superior possui tratamento próprio; o comportamento responsivo da barra permanece o existente.

## Desempenho e preservação

- Fundo limitado a 38 trilhas, resolução controlada e desenho a até 30 quadros por segundo.
- Foto convertida em glifos uma vez por abertura; a animação reutiliza a composição pronta por colunas.
- Até 36 partículas simultâneas, removidas automaticamente.
- Recursos de mídia carregados na abertura da surpresa.
- Frames, áudio, listeners e partículas gerenciados pelo escopo atual dos temas e liberados na troca.
- Sem leitura de pixels por `getImageData`, evitando o bloqueio dessa operação ao abrir arquivos locais.
- Sem novas dependências ou alterações nas regras de negócio, Aurora, cálculos, banco, nuvem ou dados do LocalStorage.

## Validação

Passaram os testes automatizados do carrossel: onze temas, navegação, restauração da grade, recarga e abertura via HTTP/arquivo local em DOM simulado.

Os testes dos novos efeitos verificaram partículas limitadas, dez cliques no mascote, mídias corretas, composição real em canvas, modo estático, pausa do áudio, fechamento e troca com a surpresa aberta, ciclos repetidos de montagem e preservação dos cálculos/dados locais. Não foram registrados erros de console nesses cenários. A sintaxe JS/CSS foi validada e o retrato gerado pelo canvas foi inspecionado.

Não foi possível executar um navegador real neste ambiente; alinhamento visual final, comportamento dos dispositivos e FPS real devem ser conferidos ao abrir o ERP. A nuvem e a Groq não receberam chamadas de produção nos testes.
