# ERP de Encerramentos 2026 — projeto completo

Versão completa do ERP Letícia Lustosa v2.1.1 com Aurora Live, onze temas, Glassy CRM, carrossel nas configurações, efeitos Glassy e correção da inicialização do mascote.

Este pacote contém `index.html`, todas as pastas CSS/JS, imagens, músicas, vídeo, scripts, documentação e testes. Não depende dos ZIPs incrementais anteriores.

## Instalar e abrir

1. Extraia todo o ZIP na pasta do ERP, mantendo `css/`, `js/` e `assets/` ao lado de `index.html`. Para atualizar a pasta existente, substitua os arquivos correspondentes.
2. Recarregue com **Ctrl+F5**. As referências aos arquivos Glassy receberam versão de cache para evitar a combinação de scripts antigos e novos.
3. Abra `index.html` ou publique os arquivos no GitHub Pages. Também é possível servir a pasta por HTTP com `python -m http.server 8000` e acessar `http://localhost:8000`.

Não é necessário instalar dependências nem compilar. Chart.js, SweetAlert2, fontes e integrações externas continuam dependendo de internet. A Aurora usa módulos ES em HTTP/HTTPS e o bundle já incluído quando o HTML é aberto diretamente por `file://`.

Os dados existentes não são apagados nem migrados. A persistência do navegador continua vinculada à origem/endereço utilizado; use o mesmo endereço do ERP para continuar acessando o armazenamento atual.

## Glassy CRM

Em **Configurações → Temas**, selecione **Glassy CRM**.

- O seletor de temas aparece como carrossel somente no Glassy e dentro das configurações.
- Com efeitos ativados, há iluminação ambiente em movimento, trilhas luminosas e partículas nos cliques.
- O cristal no canto inferior direito responde desde o primeiro toque. **Dez toques** abrem a surpresa com a foto e música Cyberpunk e o retrato formado por caracteres ciano/roxo.
- Ao fechar a surpresa ou trocar de tema, o áudio é interrompido e os recursos são liberados.
- Efeitos desativados ou movimento reduzido do sistema interrompem a animação. O mascote continua funcionando e apresenta a foto Matrix estática.
- O status da nuvem e o contador são centralizados na sidebar de 80 px.

### Correção da falha de inicialização

A chamada a `matchMedia` usava `scope.window`, que é um Proxy de isolamento dos temas. APIs nativas podem rejeitar esse receptor com `TypeError: Illegal invocation`, interrompendo a função antes do registro dos cliques no mascote e do agendamento da animação.

A chamada agora usa `globalThis.matchMedia`, com o Window real. O isolamento de recursos e os demais temas permanecem intactos. O teste `tests/glassy-effects.test.cjs` reproduz a restrição do receptor e verifica tanto a inicialização quanto a abertura da surpresa após dez cliques, inclusive com efeitos desativados.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html` | Interface e ordem de carregamento. |
| `css/` | Estilos compartilhados, configurações, Aurora Live e carrossel. |
| `css/themes/` | Onze identidades visuais, incluindo Glassy CRM. |
| `js/core/` | Regras de negócio, cálculos, registros, nuvem e interface operacional. |
| `js/themes/` | Registro, preferências, mídias, seletor e ciclo de vida dos efeitos. |
| `js/aurora/` | Agente, ferramentas, integração e Aurora Live. |
| `js/forms/` | Máscara e validação CNJ existentes. |
| `assets/images/` | Fotos de todos os temas e recursos visuais. |
| `assets/audio/` | Sete trilhas MP3 originais. |
| `assets/video/` | Vídeo JumpScare original. |
| `tests/` | Testes de Aurora Live e regressão do Glassy. |
| `scripts/` | Empacotamento local do agente Aurora. |

As mídias originais foram preservadas. Glassy reutiliza `assets/images/Cyberpunk.png` e `assets/audio/Cyberpunk.mp3`. Os caminhos alternativos já reconhecidos pelo sistema continuam disponíveis.

## Testes

Com Node.js instalado, execute:

```bash
node --test tests/*.test.cjs
```

Também foram executados testes de integração em DOM simulado: onze temas, carrossel, efeitos, composição real em canvas, pausa de áudio, troca com popup aberto, cadastros, CNJ, metas e ferramentas da Aurora. A Groq e a nuvem foram simuladas nesses testes.

Não foi possível abrir o navegador de teste neste ambiente. A conferência visual final e a medição de FPS em navegador real permanecem pendentes; os testes em DOM e canvas não substituem essa verificação.

## Documentação adicional

- `AURORA_LIVE.md`: fórmulas, eventos e comportamento do painel.
- `MIDIAS.md`: mídias e resolução dos caminhos.
- `GLASSY_EFEITOS.md`: detalhes dos efeitos e da surpresa.
- `GLASSY_ATUALIZACAO.md`: histórico da mudança do carrossel para as configurações.

Os documentos de atualizações incrementais anteriores são mantidos como histórico. O presente ZIP já inclui todas essas alterações e a correção da inicialização.
