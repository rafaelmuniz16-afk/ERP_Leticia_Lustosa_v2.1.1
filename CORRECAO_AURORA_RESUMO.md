# Correção — Detalhado com Aurora AI

Data: 20/10/2026. Esta entrega é o **projeto completo corrigido**, baseado no ZIP anterior do Copiar Resumo. O repositório remoto não foi alterado.

## Problema confirmado

A validação anterior procurava palavras e expressões sem considerar algumas negações. Foram reproduzidos bloqueios de frases factualmente compatíveis com os dados, como:

- “A meta mensal ainda não foi atingida.”
- “O cadastro no ERP não comprova baixa judicial.”
- “A bonificação calculada não é pagamento garantido.”, com financeiro autorizado.

A expressão operacional “encerramentos reais” também podia ser confundida com valores financeiros. Além disso, um comentário inválido ou repetido invalidava toda a análise; não havia tentativa de corrigir a resposta.

A resposta real recebida pela usuária não foi capturada. Portanto, estes são defeitos reproduzidos no código entregue, sem afirmar que uma frase específica foi a resposta enviada pela Groq naquele momento.

## O que mudou

1. A validação reconhece as negações específicas acima quando sustentadas pelo contexto, sem liberar afirmações falsas na mesma frase. A checagem de números, HTML, fundamentos desconhecidos e valores financeiros não autorizados continua ativa.
2. Espaços e quebras de apresentação são normalizados. Uma cerca JSON completa é tolerada, mas prosa arbitrária não é convertida em análise.
3. Cada comentário é validado individualmente. Comentários repetidos ou inválidos são descartados, preservando apenas comentários realmente aprovados. Se nenhum passar, a análise continua sem sucesso.
4. A chamada de relatório pede **JSON Schema estrito**, com as chaves `comments`, `basis` e `text`, e uma lista exata de fundamentos permitidos para aquele contexto. Isso evita depender exclusivamente de instruções no prompt para os nomes dos campos.
5. O prompt explica que os identificadores dos fundamentos não devem ser traduzidos e usa um exemplo válido de estrutura.
6. Somente o relatório usa esforço de raciocínio baixo, limite de 2.048 tokens e timeout de 15 segundos por modelo. Uma resposta com `finish_reason: length` é identificada como truncada; não é aceita como análise concluída.
7. Uma resposta vazia, inválida ou truncada permite **uma única tentativa corretiva**, com limite de 4.096 tokens e instrução para produzir um comentário curto. Não há repetição infinita, execução de ferramentas ou reenvio do texto rejeitado. O fallback de modelos já existente pode atuar em cada tentativa conforme suas regras originais.
8. Falhas de chave, cancelamento e recusa explícita do provedor não acionam a tentativa corretiva. Erros persistentes mantêm o resumo simples com uma mensagem clara.
9. O bundle local foi regenerado para incluir a mesma correção no modo `file://`.

Os números continuam sendo calculados pelo JavaScript existente. A IA escreve somente comentários. Regras financeiras, registros, metas, LocalStorage, temas, mídias e integração com a planilha não foram alterados por esta correção.

A validação textual é uma proteção prática, não uma verificação semântica perfeita de toda frase possível. A prévia permanece editável para revisão antes de compartilhar.

## Como instalar

1. Guarde a pasta anterior como backup.
2. Extraia o novo ZIP em uma pasta separada.
3. Use o conteúdo da pasta interna `ERP_Leticia_Lustosa_v2.1.1/`. O `index.html` deve continuar na raiz do projeto, ao lado de `js/`, `css/` e `assets/`.
4. Você pode substituir o projeto completo. Para atualizar apenas a correção em uma cópia que já possui o Copiar Resumo anterior, substitua juntos estes cinco arquivos:

| Arquivo | Correção |
|---|---|
| `js/reports/ai.js` | Validação, aproveitamento dos comentários aprovados e tentativa corretiva limitada |
| `js/reports/view.js` | Mensagens de falha após a tentativa corretiva, truncamento e recusa |
| `js/aurora/report-prompt.js` | Prompt compatível com a validação e esquema de resposta |
| `js/auroraAgent.js` | Parâmetros opcionais de relatório no transporte e identificação de respostas incompletas |
| `js/aurora/agent.bundle.js` | Equivalente atualizado para abertura por arquivo local |

5. Atualize também os testes/documentos se desejar manter a cópia de desenvolvimento completa:
   - `tests/whatsapp-browser.cjs` — modificado;
   - `tests/whatsapp-ai-regression.test.cjs` — novo;
   - `MANUAL_COPIAR_RESUMO_WHATSAPP.md` — atualizado;
   - `CORRECAO_AURORA_RESUMO.md` — novo.
6. Após publicar, espere a atualização do GitHub Pages e faça **Ctrl+Shift+R** (ou o comando de recarregar sem cache do seu navegador). No modo local, feche a aba anterior e abra o `index.html` da pasta corrigida.
7. Abra **Aurora Live → Copiar Resumo → Detalhado com Aurora AI → Gerar com Aurora**. Os comentários devem aparecer na seção **Análise da Aurora**, com o indicador **Detalhado · Aurora AI**.

Não substitua apenas `agent.bundle.js` ou apenas `auroraAgent.js`: o modo local e o modo HTTP carregam entradas diferentes. Os cinco arquivos acima precisam pertencer à mesma revisão.

## Testes desta correção

**87 testes automatizados aprovados:** os 66 testes anteriores mais 21 regressões específicas. As regressões exercitam o adaptador real do bundle, com `fetch` simulado, incluindo o esquema, a chave fictícia no cabeçalho, os limites de tokens, a resposta truncada, a tentativa corretiva, o cancelamento e o payload original das observações automáticas.

O teste integrado em Chromium também passou: primeira resposta simulada truncada → uma tentativa corretiva → comentário válido exibido no modal. O teste confirmou frases que antes eram bloqueadas, chat separado, cópia, cadastro/edição/exclusão, validação CNJ, meta, atualização simulada da nuvem e modo `file://`. As verificações de layout foram repetidas nos 11 temas em desktop/celular, além do viewport 320×568. Não houve erros nem warnings de console nesses cenários.

Groq e Google Planilhas foram simulados; não houve chamada com credenciais reais nem alteração de dados da usuária. Não foi realizada homologação com uma chave real da Groq. Os testes anteriores não tinham coberto essas variações de linguagem; foram ampliados para evitar repetir o falso bloqueio.

Para reexecutar, use os comandos de teste do manual principal. Não é necessário instalar dependências para utilizar o ERP.

## Voltar à entrega anterior

Restaure os cinco arquivos de execução acima a partir do ZIP anterior, todos da mesma versão, e recarregue sem cache. Não limpe o LocalStorage ou a planilha. Os relatórios não fazem migração de dados.

## Referências técnicas consultadas

- [Groq — Structured Outputs](https://console.groq.com/docs/structured-outputs): suporte a esquema estrito dos modelos GPT-OSS usados no projeto.
- [Groq — Reasoning](https://console.groq.com/docs/reasoning): configuração de esforço de raciocínio e separação do conteúdo final.

As opções novas são exclusivas do relatório; o chat e as observações automáticas mantêm seus parâmetros anteriores.
