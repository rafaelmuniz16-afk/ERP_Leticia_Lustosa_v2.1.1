# Catálogo completo — 350 missões

Aurora Achievements 2.0 · versão 2.0.0.

70 níveis, cinco missões por nível. O nível atual é o primeiro ainda não concluído. O trabalho anterior conta integralmente. Cada nível exige todas as suas cinco missões; dentro de uma missão, OU permite qualquer alternativa, E exige todas. Os valores atuais e percentuais são calculados na interface, nunca fixados neste documento.

## Fonte e critérios comuns

Registros disponíveis, sem repetir _uid; data de finalização válida e não futura. Períodos civis por essa data, em todos os anos. Panjud: Sim e recusado: Não, exatamente como cadastrados.

Ônus, Acordo e Êxito usam a grafia cadastrada. Meses/anos são civis; semana = segunda a domingo identificada pela segunda-feira (inclusive quando cruza o ano). O mês de referência não participa. Datas futuras/inválidas não comprovam nenhuma missão. Registros de mesmo CNJ com _uid distintos continuam distintos. _uid repetido com campos relevantes conflitantes é excluído conservadoramente. Sem _uid, linhas distintas são preservadas. Sequência = melhor sequência de segunda a sexta, sem pressupor presença ou descontar feriados.

Metas sem versão anual não compõem as 350 missões. O indicador da meta vigente continua na Aurora Live. Missões de tipo/diversidade têm alternativas de dias produtivos. Recordes têm alternativas de constância; não é necessário produzir 20 registros num dia para concluir a jornada.

## Métricas

| Chave | Significado |
|---|---|
| total | encerramentos acumulados |
| confirmed | confirmações válidas no Panjud |
| onus | encerramentos Ônus |
| acordo | encerramentos Acordo |
| exito | encerramentos Êxito |
| types | tipos diferentes de encerramento |
| minType | encerramentos em cada um dos três tipos |
| diverseMonths | meses civis com os três tipos |
| days | dias distintos com produção |
| confirmedDays | dias distintos com confirmação válida |
| weeks | semanas distintas com produção |
| months | meses civis distintos com produção |
| years | anos distintos com produção |
| streak | dias úteis na melhor sequência histórica |
| daily | encerramentos no melhor dia |
| weekly | encerramentos na melhor semana |
| monthly | encerramentos no melhor mês civil |
| annual | encerramentos no melhor ano |
| days3 | dias com pelo menos três encerramentos |
| weeks5 | semanas com pelo menos cinco encerramentos |
| months10 | meses civis com pelo menos dez encerramentos |

## Curva planejada

Marcos acumulados: nível 1 = 5; 10 = 100; 20 = 500; 30 = 1.000; 40 = 2.000; 50 = 3.500; 60 = 6.000; 70 = 10.000. Confirmados: 1 no nível 1, depois 60% do marco acumulado (arredondado para cima). Dias produtivos: maior entre nível + 1 e marco acumulado ÷ 20 (arredondado para cima). Os outros critérios diversificam o histórico, sem exigir taxas perfeitas de recusa nem distribuição igual por tipo.

O teste construtivo usa dez registros por dia útil, 60% confirmados, desde 2020. A curva também permite carteira de tipo único pela rota alternativa. Isso é um cenário de validação, não uma recomendação ou meta diária de trabalho. Correções e exclusões podem reduzir a progressão.

## Nível 1 — Novato

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-1: símbolo 1 e faixa 1. Pré-requisito: nenhum.

### Trajetória · 5

- ID: `aa2-l01-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 5 encerramentos acumulados.
- Critério matemático e métricas: `total >= 5`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1

- ID: `aa2-l01-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 1

- ID: `aa2-l01-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (1 tipos diferentes de encerramento OU 3 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 1; days >= 3]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 1

- ID: `aa2-l01-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 2 dias distintos com produção.
- Critério matemático e métricas: `days >= 2`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 1

- ID: `aa2-l01-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (3 encerramentos no melhor dia OU 3 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 3; days >= 3]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 2 — Primeiro Passo

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-2: símbolo 2 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 1.

### Trajetória · 10

- ID: `aa2-l02-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 10 encerramentos acumulados.
- Critério matemático e métricas: `total >= 10`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 6

- ID: `aa2-l02-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 6 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 6`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 2

- ID: `aa2-l02-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (1 encerramentos Acordo OU 4 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 1; days >= 4]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 2

- ID: `aa2-l02-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 3 dias distintos com produção.
- Critério matemático e métricas: `days >= 3`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 2

- ID: `aa2-l02-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar 5 encerramentos na melhor semana.
- Critério matemático e métricas: `weekly >= 5`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 3 — Aprendiz

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-3: símbolo 3 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 2.

### Trajetória · 15

- ID: `aa2-l03-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 15 encerramentos acumulados.
- Critério matemático e métricas: `total >= 15`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 9

- ID: `aa2-l03-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 9 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 9`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 3

- ID: `aa2-l03-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (1 encerramentos Êxito OU 5 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 1; days >= 5]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 3

- ID: `aa2-l03-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (4 dias distintos com produção E (1 dias úteis na melhor sequência histórica OU 2 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 4; AO MENOS UMA [streak >= 1; weeks >= 2]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 3

- ID: `aa2-l03-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar 10 encerramentos no melhor mês civil.
- Critério matemático e métricas: `monthly >= 10`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 4 — Iniciante Dedicado

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-4: símbolo 4 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 3.

### Trajetória · 20

- ID: `aa2-l04-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 20 encerramentos acumulados.
- Critério matemático e métricas: `total >= 20`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 12

- ID: `aa2-l04-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 12 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 12`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 4

- ID: `aa2-l04-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (3 tipos diferentes de encerramento OU 6 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 3; days >= 6]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 4

- ID: `aa2-l04-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (5 dias distintos com produção E 2 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 5; confirmedDays >= 2]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 4

- ID: `aa2-l04-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (15 encerramentos no melhor ano OU (1 anos distintos com produção E 16 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 15; TODAS [years >= 1; total >= 16]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 5 — Explorador

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-5: símbolo 5 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 4.

### Trajetória · 30

- ID: `aa2-l05-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 30 encerramentos acumulados.
- Critério matemático e métricas: `total >= 30`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 18

- ID: `aa2-l05-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 18 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 18`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 5

- ID: `aa2-l05-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (1 encerramentos Acordo OU 7 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 1; days >= 7]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 5

- ID: `aa2-l05-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 6 dias distintos com produção.
- Critério matemático e métricas: `days >= 6`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 5

- ID: `aa2-l05-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (2 meses civis com pelo menos dez encerramentos OU (2 semanas distintas com produção E 6 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 2; TODAS [weeks >= 2; days >= 6]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 6 — Operador em Formação

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-6: símbolo 6 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 5.

### Trajetória · 40

- ID: `aa2-l06-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 40 encerramentos acumulados.
- Critério matemático e métricas: `total >= 40`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 24

- ID: `aa2-l06-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 24 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 24`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 6

- ID: `aa2-l06-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (2 encerramentos Êxito OU 9 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 2; days >= 9]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 6

- ID: `aa2-l06-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (7 dias distintos com produção E (1 dias úteis na melhor sequência histórica OU 3 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 7; AO MENOS UMA [streak >= 1; weeks >= 3]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 6

- ID: `aa2-l06-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (4 encerramentos no melhor dia OU 3 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 4; days3 >= 3]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 7 — Determinado

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-7: símbolo 7 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 6.

### Trajetória · 50

- ID: `aa2-l07-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 50 encerramentos acumulados.
- Critério matemático e métricas: `total >= 50`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 30

- ID: `aa2-l07-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 30 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 30`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 7

- ID: `aa2-l07-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (2 encerramentos Ônus OU 10 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 2; days >= 10]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 7

- ID: `aa2-l07-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (8 dias distintos com produção E 4 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 8; confirmedDays >= 4]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 7

- ID: `aa2-l07-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (8 encerramentos na melhor semana OU 4 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 8; weeks5 >= 4]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 8 — Desbravador

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-8: símbolo 8 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 7.

### Trajetória · 65

- ID: `aa2-l08-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 65 encerramentos acumulados.
- Critério matemático e métricas: `total >= 65`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 39

- ID: `aa2-l08-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 39 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 39`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 8

- ID: `aa2-l08-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (3 tipos diferentes de encerramento OU 11 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 3; days >= 11]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 8

- ID: `aa2-l08-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 9 dias distintos com produção.
- Critério matemático e métricas: `days >= 9`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 8

- ID: `aa2-l08-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (10 encerramentos no melhor mês civil OU 3 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 10; months10 >= 3]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 9 — Promessa da Aurora

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-9: símbolo 9 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 8.

### Trajetória · 80

- ID: `aa2-l09-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 80 encerramentos acumulados.
- Critério matemático e métricas: `total >= 80`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 48

- ID: `aa2-l09-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 48 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 48`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 9

- ID: `aa2-l09-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (3 encerramentos Êxito OU 12 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 3; days >= 12]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 9

- ID: `aa2-l09-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (10 dias distintos com produção E (2 dias úteis na melhor sequência histórica OU 4 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 10; AO MENOS UMA [streak >= 2; weeks >= 4]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 9

- ID: `aa2-l09-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (24 encerramentos no melhor ano OU (1 anos distintos com produção E 64 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 24; TODAS [years >= 1; total >= 64]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 10 — Iniciado

Primeiros Passos · Muito fácil a fácil. Emblema local aa2-emblem-10: símbolo 10 e faixa 1. Pré-requisito: concluir todas as cinco missões do nível 9.

### Trajetória · 100

- ID: `aa2-l10-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 100 encerramentos acumulados.
- Critério matemático e métricas: `total >= 100`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 60

- ID: `aa2-l10-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 60 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 60`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 10

- ID: `aa2-l10-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (3 encerramentos Ônus OU 13 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 3; days >= 13]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 10

- ID: `aa2-l10-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (11 dias distintos com produção E 5 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 11; confirmedDays >= 5]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 10

- ID: `aa2-l10-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (3 meses civis com pelo menos dez encerramentos OU (3 semanas distintas com produção E 11 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 3; TODAS [weeks >= 3; days >= 11]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 11 — Operador

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-11: símbolo 1 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 10.

### Trajetória · 125

- ID: `aa2-l11-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 125 encerramentos acumulados.
- Critério matemático e métricas: `total >= 125`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 75

- ID: `aa2-l11-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 75 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 75`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 11

- ID: `aa2-l11-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (4 encerramentos Acordo OU 15 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 4; days >= 15]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 11

- ID: `aa2-l11-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 12 dias distintos com produção.
- Critério matemático e métricas: `days >= 12`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 11

- ID: `aa2-l11-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (5 encerramentos no melhor dia OU 4 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 5; days3 >= 4]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 12 — Em Ascensão

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-12: símbolo 2 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 11.

### Trajetória · 150

- ID: `aa2-l12-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 150 encerramentos acumulados.
- Critério matemático e métricas: `total >= 150`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 90

- ID: `aa2-l12-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 90 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 90`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 12

- ID: `aa2-l12-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (3 tipos diferentes de encerramento OU 16 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 3; days >= 16]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 12

- ID: `aa2-l12-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (13 dias distintos com produção E (2 dias úteis na melhor sequência histórica OU 5 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 13; AO MENOS UMA [streak >= 2; weeks >= 5]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 12

- ID: `aa2-l12-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (23 encerramentos na melhor semana OU 6 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 23; weeks5 >= 6]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 13 — Guardião dos Registros

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-13: símbolo 3 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 12.

### Trajetória · 180

- ID: `aa2-l13-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 180 encerramentos acumulados.
- Critério matemático e métricas: `total >= 180`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 108

- ID: `aa2-l13-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 108 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 108`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 13

- ID: `aa2-l13-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (6 encerramentos Ônus OU 17 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 6; days >= 17]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 13

- ID: `aa2-l13-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (14 dias distintos com produção E 6 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 14; confirmedDays >= 6]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 13

- ID: `aa2-l13-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (22 encerramentos no melhor mês civil OU 5 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 22; months10 >= 5]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 14 — Persistente

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-14: símbolo 4 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 13.

### Trajetória · 220

- ID: `aa2-l14-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 220 encerramentos acumulados.
- Critério matemático e métricas: `total >= 220`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 132

- ID: `aa2-l14-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 132 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 132`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 14

- ID: `aa2-l14-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (7 encerramentos Acordo OU 18 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 7; days >= 18]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 14

- ID: `aa2-l14-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 15 dias distintos com produção.
- Critério matemático e métricas: `days >= 15`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 14

- ID: `aa2-l14-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (66 encerramentos no melhor ano OU (1 anos distintos com produção E 176 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 66; TODAS [years >= 1; total >= 176]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 15 — Analista

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-15: símbolo 5 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 14.

### Trajetória · 260

- ID: `aa2-l15-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 260 encerramentos acumulados.
- Critério matemático e métricas: `total >= 260`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 156

- ID: `aa2-l15-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 156 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 156`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 15

- ID: `aa2-l15-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (8 encerramentos Êxito OU 19 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 8; days >= 19]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 15

- ID: `aa2-l15-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (16 dias distintos com produção E (3 dias úteis na melhor sequência histórica OU 6 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 16; AO MENOS UMA [streak >= 3; weeks >= 6]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 15

- ID: `aa2-l15-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (4 meses civis com pelo menos dez encerramentos OU (4 semanas distintas com produção E 16 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 4; TODAS [weeks >= 4; days >= 16]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 16 — Estrategista Iniciante

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-16: símbolo 6 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 15.

### Trajetória · 300

- ID: `aa2-l16-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 300 encerramentos acumulados.
- Critério matemático e métricas: `total >= 300`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 180

- ID: `aa2-l16-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 180 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 180`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 16

- ID: `aa2-l16-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (3 tipos diferentes de encerramento OU 21 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 3; days >= 21]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 16

- ID: `aa2-l16-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (17 dias distintos com produção E 7 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 17; confirmedDays >= 7]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 16

- ID: `aa2-l16-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (6 encerramentos no melhor dia OU 6 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 6; days3 >= 6]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 17 — Guardião do Panjud

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-17: símbolo 7 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 16.

### Trajetória · 350

- ID: `aa2-l17-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 350 encerramentos acumulados.
- Critério matemático e métricas: `total >= 350`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 210

- ID: `aa2-l17-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 210 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 210`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 17

- ID: `aa2-l17-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (11 encerramentos Acordo OU 22 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 11; days >= 22]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 17

- ID: `aa2-l17-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 18 dias distintos com produção.
- Critério matemático e métricas: `days >= 18`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 17

- ID: `aa2-l17-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (53 encerramentos na melhor semana OU 9 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 53; weeks5 >= 9]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 18 — Conquistador

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-18: símbolo 8 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 17.

### Trajetória · 400

- ID: `aa2-l18-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 400 encerramentos acumulados.
- Critério matemático e métricas: `total >= 400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 240

- ID: `aa2-l18-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 240 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 240`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 18

- ID: `aa2-l18-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (12 encerramentos Êxito OU 24 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 12; days >= 24]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 18

- ID: `aa2-l18-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (20 dias distintos com produção E (3 dias úteis na melhor sequência histórica OU 7 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 20; AO MENOS UMA [streak >= 3; weeks >= 7]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 18

- ID: `aa2-l18-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (48 encerramentos no melhor mês civil OU 6 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 48; months10 >= 6]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 19 — Analista Experiente

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-19: símbolo 9 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 18.

### Trajetória · 450

- ID: `aa2-l19-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 450 encerramentos acumulados.
- Critério matemático e métricas: `total >= 450`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 270

- ID: `aa2-l19-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 270 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 270`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 19

- ID: `aa2-l19-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (14 encerramentos Ônus OU 27 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 14; days >= 27]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 19

- ID: `aa2-l19-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (23 dias distintos com produção E 10 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 23; confirmedDays >= 10]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 19

- ID: `aa2-l19-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (135 encerramentos no melhor ano OU (1 anos distintos com produção E 360 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 135; TODAS [years >= 1; total >= 360]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 20 — Veterano

Aprendizado · Fácil a moderada. Emblema local aa2-emblem-20: símbolo 10 e faixa 2. Pré-requisito: concluir todas as cinco missões do nível 19.

### Trajetória · 500

- ID: `aa2-l20-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 500 encerramentos acumulados.
- Critério matemático e métricas: `total >= 500`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 300

- ID: `aa2-l20-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 300 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 300`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 20

- ID: `aa2-l20-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (3 tipos diferentes de encerramento OU 29 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [types >= 3; days >= 29]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 20

- ID: `aa2-l20-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 25 dias distintos com produção.
- Critério matemático e métricas: `days >= 25`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 20

- ID: `aa2-l20-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (5 meses civis com pelo menos dez encerramentos OU (7 semanas distintas com produção E 25 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 5; TODAS [weeks >= 7; days >= 25]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 21 — Especialista

Especialização · Moderada. Emblema local aa2-emblem-21: símbolo 1 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 20.

### Trajetória · 550

- ID: `aa2-l21-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 550 encerramentos acumulados.
- Critério matemático e métricas: `total >= 550`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 330

- ID: `aa2-l21-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 330 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 330`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 21

- ID: `aa2-l21-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (17 encerramentos Êxito OU 33 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 17; days >= 33]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 21

- ID: `aa2-l21-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (28 dias distintos com produção E (3 dias úteis na melhor sequência histórica OU 10 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 28; AO MENOS UMA [streak >= 3; weeks >= 10]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 21

- ID: `aa2-l21-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (8 encerramentos no melhor dia OU 7 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 8; days3 >= 7]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 22 — Especialista em Ascensão

Especialização · Moderada. Emblema local aa2-emblem-22: símbolo 2 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 21.

### Trajetória · 600

- ID: `aa2-l22-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 600 encerramentos acumulados.
- Critério matemático e métricas: `total >= 600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 360

- ID: `aa2-l22-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 360 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 360`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 22

- ID: `aa2-l22-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (18 encerramentos Ônus OU 35 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 18; days >= 35]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 22

- ID: `aa2-l22-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (30 dias distintos com produção E 12 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 30; confirmedDays >= 12]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 22

- ID: `aa2-l22-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 11 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 11]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 23 — Mestre dos Registros

Especialização · Moderada. Emblema local aa2-emblem-23: símbolo 3 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 22.

### Trajetória · 650

- ID: `aa2-l23-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 650 encerramentos acumulados.
- Critério matemático e métricas: `total >= 650`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 390

- ID: `aa2-l23-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 390 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 390`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 23

- ID: `aa2-l23-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (20 encerramentos Acordo OU 38 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 20; days >= 38]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 23

- ID: `aa2-l23-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 33 dias distintos com produção.
- Critério matemático e métricas: `days >= 33`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 23

- ID: `aa2-l23-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (78 encerramentos no melhor mês civil OU 8 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 78; months10 >= 8]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 24 — Sentinela da Produtividade

Especialização · Moderada. Emblema local aa2-emblem-24: símbolo 4 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 23.

### Trajetória · 700

- ID: `aa2-l24-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 700 encerramentos acumulados.
- Critério matemático e métricas: `total >= 700`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 420

- ID: `aa2-l24-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 420 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 420`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 24

- ID: `aa2-l24-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (7 encerramentos em cada um dos três tipos OU 40 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 7; days >= 40]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 24

- ID: `aa2-l24-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (35 dias distintos com produção E (4 dias úteis na melhor sequência histórica OU 12 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 35; AO MENOS UMA [streak >= 4; weeks >= 12]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 24

- ID: `aa2-l24-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (210 encerramentos no melhor ano OU (1 anos distintos com produção E 560 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 210; TODAS [years >= 1; total >= 560]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 25 — Especialista Sênior

Especialização · Moderada. Emblema local aa2-emblem-25: símbolo 5 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 24.

### Trajetória · 750

- ID: `aa2-l25-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 750 encerramentos acumulados.
- Critério matemático e métricas: `total >= 750`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 450

- ID: `aa2-l25-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 450 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 450`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 25

- ID: `aa2-l25-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (23 encerramentos Ônus OU 43 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 23; days >= 43]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 25

- ID: `aa2-l25-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (38 dias distintos com produção E 16 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 38; confirmedDays >= 16]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 25

- ID: `aa2-l25-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (7 meses civis com pelo menos dez encerramentos OU (10 semanas distintas com produção E 38 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 7; TODAS [weeks >= 10; days >= 38]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 26 — Estrategista

Especialização · Moderada. Emblema local aa2-emblem-26: símbolo 6 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 25.

### Trajetória · 800

- ID: `aa2-l26-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 800 encerramentos acumulados.
- Critério matemático e métricas: `total >= 800`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 480

- ID: `aa2-l26-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 480 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 480`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 26

- ID: `aa2-l26-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (24 encerramentos Acordo OU 46 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 24; days >= 46]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 26

- ID: `aa2-l26-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 40 dias distintos com produção.
- Critério matemático e métricas: `days >= 40`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 26

- ID: `aa2-l26-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (9 encerramentos no melhor dia OU 9 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 9; days3 >= 9]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 27 — Guardião das Metas

Especialização · Moderada. Emblema local aa2-emblem-27: símbolo 7 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 26.

### Trajetória · 850

- ID: `aa2-l27-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 850 encerramentos acumulados.
- Critério matemático e métricas: `total >= 850`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 510

- ID: `aa2-l27-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 510 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 510`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 27

- ID: `aa2-l27-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (26 encerramentos Êxito OU 49 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 26; days >= 49]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 27

- ID: `aa2-l27-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (43 dias distintos com produção E (4 dias úteis na melhor sequência histórica OU 15 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 43; AO MENOS UMA [streak >= 4; weeks >= 15]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 27

- ID: `aa2-l27-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 14 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 14]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 28 — Referência Operacional

Especialização · Moderada. Emblema local aa2-emblem-28: símbolo 8 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 27.

### Trajetória · 900

- ID: `aa2-l28-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 900 encerramentos acumulados.
- Critério matemático e métricas: `total >= 900`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 540

- ID: `aa2-l28-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 540 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 540`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 28

- ID: `aa2-l28-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (9 encerramentos em cada um dos três tipos OU 51 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 9; days >= 51]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 28

- ID: `aa2-l28-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (45 dias distintos com produção E 18 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 45; confirmedDays >= 18]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 28

- ID: `aa2-l28-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (108 encerramentos no melhor mês civil OU 10 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 108; months10 >= 10]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 29 — Especialista Supremo

Especialização · Moderada. Emblema local aa2-emblem-29: símbolo 9 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 28.

### Trajetória · 950

- ID: `aa2-l29-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 950 encerramentos acumulados.
- Critério matemático e métricas: `total >= 950`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 570

- ID: `aa2-l29-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 570 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 570`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 29

- ID: `aa2-l29-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (29 encerramentos Acordo OU 54 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 29; days >= 54]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 29

- ID: `aa2-l29-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 48 dias distintos com produção.
- Critério matemático e métricas: `days >= 48`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 29

- ID: `aa2-l29-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (285 encerramentos no melhor ano OU (2 anos distintos com produção E 760 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 285; TODAS [years >= 2; total >= 760]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 30 — Especialista de Elite

Especialização · Moderada. Emblema local aa2-emblem-30: símbolo 10 e faixa 3. Pré-requisito: concluir todas as cinco missões do nível 29.

### Trajetória · 1000

- ID: `aa2-l30-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 600

- ID: `aa2-l30-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 600 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 30

- ID: `aa2-l30-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (30 encerramentos Êxito OU 56 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 30; days >= 56]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 30

- ID: `aa2-l30-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (50 dias distintos com produção E (5 dias úteis na melhor sequência histórica OU 17 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 50; AO MENOS UMA [streak >= 5; weeks >= 17]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 30

- ID: `aa2-l30-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (8 meses civis com pelo menos dez encerramentos OU (13 semanas distintas com produção E 50 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 8; TODAS [weeks >= 13; days >= 50]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 31 — Mestre da Consistência

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-31: símbolo 1 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 30.

### Trajetória · 1100

- ID: `aa2-l31-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.100 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1100`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 660

- ID: `aa2-l31-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 660 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 660`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 31

- ID: `aa2-l31-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (33 encerramentos Ônus OU 62 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 33; days >= 62]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 31

- ID: `aa2-l31-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (55 dias distintos com produção E 22 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 55; confirmedDays >= 22]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 31

- ID: `aa2-l31-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (10 encerramentos no melhor dia OU 11 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 10; days3 >= 11]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 32 — Mestre do Panjud

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-32: símbolo 2 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 31.

### Trajetória · 1200

- ID: `aa2-l32-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.200 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1200`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 720

- ID: `aa2-l32-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 720 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 720`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 32

- ID: `aa2-l32-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (12 encerramentos em cada um dos três tipos OU 67 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 12; days >= 67]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 32

- ID: `aa2-l32-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 60 dias distintos com produção.
- Critério matemático e métricas: `days >= 60`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 32

- ID: `aa2-l32-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 16 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 16]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 33 — Comandante Operacional

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-33: símbolo 3 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 32.

### Trajetória · 1300

- ID: `aa2-l33-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.300 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1300`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 780

- ID: `aa2-l33-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 780 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 780`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 33

- ID: `aa2-l33-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (39 encerramentos Êxito OU 72 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 39; days >= 72]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 33

- ID: `aa2-l33-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (65 dias distintos com produção E (5 dias úteis na melhor sequência histórica OU 22 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 65; AO MENOS UMA [streak >= 5; weeks >= 22]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 33

- ID: `aa2-l33-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (156 encerramentos no melhor mês civil OU 11 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 156; months10 >= 11]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 34 — Guardião da Excelência

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-34: símbolo 4 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 33.

### Trajetória · 1400

- ID: `aa2-l34-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.400 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 840

- ID: `aa2-l34-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 840 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 840`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 34

- ID: `aa2-l34-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (42 encerramentos Ônus OU 77 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 42; days >= 77]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 34

- ID: `aa2-l34-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (70 dias distintos com produção E 28 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 70; confirmedDays >= 28]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 34

- ID: `aa2-l34-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (420 encerramentos no melhor ano OU (2 anos distintos com produção E 1.120 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 420; TODAS [years >= 2; total >= 1120]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 35 — Mestre da Produtividade

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-35: símbolo 5 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 34.

### Trajetória · 1500

- ID: `aa2-l35-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.500 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1500`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 900

- ID: `aa2-l35-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 900 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 900`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 35

- ID: `aa2-l35-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (45 encerramentos Acordo OU 82 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 45; days >= 82]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 35

- ID: `aa2-l35-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 75 dias distintos com produção.
- Critério matemático e métricas: `days >= 75`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 35

- ID: `aa2-l35-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (9 meses civis com pelo menos dez encerramentos OU (19 semanas distintas com produção E 75 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 9; TODAS [weeks >= 19; days >= 75]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 36 — Estrategista Avançado

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-36: símbolo 6 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 35.

### Trajetória · 1600

- ID: `aa2-l36-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.600 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 960

- ID: `aa2-l36-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 960 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 960`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 36

- ID: `aa2-l36-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (16 encerramentos em cada um dos três tipos OU 88 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 16; days >= 88]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 36

- ID: `aa2-l36-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (80 dias distintos com produção E (6 dias úteis na melhor sequência histórica OU 27 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 80; AO MENOS UMA [streak >= 6; weeks >= 27]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 36

- ID: `aa2-l36-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (11 encerramentos no melhor dia OU 12 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 11; days3 >= 12]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 37 — Executor de Elite

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-37: símbolo 7 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 36.

### Trajetória · 1700

- ID: `aa2-l37-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.700 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1700`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1020

- ID: `aa2-l37-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.020 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1020`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 37

- ID: `aa2-l37-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (51 encerramentos Ônus OU 93 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 51; days >= 93]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 37

- ID: `aa2-l37-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (85 dias distintos com produção E 34 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 85; confirmedDays >= 34]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 37

- ID: `aa2-l37-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 19 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 19]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 38 — Guardião dos Marcos

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-38: símbolo 8 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 37.

### Trajetória · 1800

- ID: `aa2-l38-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.800 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1800`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1080

- ID: `aa2-l38-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.080 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1080`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 38

- ID: `aa2-l38-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (54 encerramentos Acordo OU 98 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 54; days >= 98]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 38

- ID: `aa2-l38-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 90 dias distintos com produção.
- Critério matemático e métricas: `days >= 90`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 38

- ID: `aa2-l38-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 13 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 13]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 39 — Comandante da Aurora

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-39: símbolo 9 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 38.

### Trajetória · 1900

- ID: `aa2-l39-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 1.900 encerramentos acumulados.
- Critério matemático e métricas: `total >= 1900`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1140

- ID: `aa2-l39-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.140 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1140`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 39

- ID: `aa2-l39-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (57 encerramentos Êxito OU 103 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 57; days >= 103]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 39

- ID: `aa2-l39-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (95 dias distintos com produção E (6 dias úteis na melhor sequência histórica OU 32 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 95; AO MENOS UMA [streak >= 6; weeks >= 32]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 39

- ID: `aa2-l39-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (570 encerramentos no melhor ano OU (2 anos distintos com produção E 1.520 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 570; TODAS [years >= 2; total >= 1520]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 40 — Mestre Supremo

Alto Desempenho · Moderada a difícil. Emblema local aa2-emblem-40: símbolo 10 e faixa 4. Pré-requisito: concluir todas as cinco missões do nível 39.

### Trajetória · 2000

- ID: `aa2-l40-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1200

- ID: `aa2-l40-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.200 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1200`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 40

- ID: `aa2-l40-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (20 encerramentos em cada um dos três tipos OU 108 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 20; days >= 108]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 40

- ID: `aa2-l40-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (100 dias distintos com produção E 40 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 100; confirmedDays >= 40]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 40

- ID: `aa2-l40-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (10 meses civis com pelo menos dez encerramentos OU (25 semanas distintas com produção E 100 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 10; TODAS [weeks >= 25; days >= 100]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 41 — Titã da Consistência

Maestria · Difícil. Emblema local aa2-emblem-41: símbolo 1 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 40.

### Trajetória · 2150

- ID: `aa2-l41-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.150 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2150`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1290

- ID: `aa2-l41-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.290 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1290`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 41

- ID: `aa2-l41-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (65 encerramentos Acordo OU 117 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 65; days >= 117]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 41

- ID: `aa2-l41-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 108 dias distintos com produção.
- Critério matemático e métricas: `days >= 108`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 41

- ID: `aa2-l41-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (13 encerramentos no melhor dia OU 14 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 13; days3 >= 14]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 42 — Titã dos Encerramentos

Maestria · Difícil. Emblema local aa2-emblem-42: símbolo 2 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 41.

### Trajetória · 2300

- ID: `aa2-l42-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.300 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2300`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1380

- ID: `aa2-l42-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.380 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1380`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 42

- ID: `aa2-l42-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (69 encerramentos Êxito OU 124 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 69; days >= 124]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 42

- ID: `aa2-l42-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (115 dias distintos com produção E (6 dias úteis na melhor sequência histórica OU 39 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 115; AO MENOS UMA [streak >= 6; weeks >= 39]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 42

- ID: `aa2-l42-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 21 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 21]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 43 — Arquiteto de Resultados

Maestria · Difícil. Emblema local aa2-emblem-43: símbolo 3 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 42.

### Trajetória · 2450

- ID: `aa2-l43-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.450 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2450`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1470

- ID: `aa2-l43-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.470 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1470`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 43

- ID: `aa2-l43-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (74 encerramentos Ônus OU 132 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 74; days >= 132]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 43

- ID: `aa2-l43-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (123 dias distintos com produção E 50 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 123; confirmedDays >= 50]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 43

- ID: `aa2-l43-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 15 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 15]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 44 — Soberano das Metas

Maestria · Difícil. Emblema local aa2-emblem-44: símbolo 4 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 43.

### Trajetória · 2600

- ID: `aa2-l44-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.600 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1560

- ID: `aa2-l44-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.560 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1560`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 44

- ID: `aa2-l44-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (26 encerramentos em cada um dos três tipos OU 139 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [minType >= 26; days >= 139]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 44

- ID: `aa2-l44-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 130 dias distintos com produção.
- Critério matemático e métricas: `days >= 130`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 44

- ID: `aa2-l44-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (780 encerramentos no melhor ano OU (2 anos distintos com produção E 2.080 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 780; TODAS [years >= 2; total >= 2080]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 45 — Mestre Lendário

Maestria · Difícil. Emblema local aa2-emblem-45: símbolo 5 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 44.

### Trajetória · 2750

- ID: `aa2-l45-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.750 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2750`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1650

- ID: `aa2-l45-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.650 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1650`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 45

- ID: `aa2-l45-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (83 encerramentos Êxito OU 147 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 83; days >= 147]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 45

- ID: `aa2-l45-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (138 dias distintos com produção E (7 dias úteis na melhor sequência histórica OU 46 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 138; AO MENOS UMA [streak >= 7; weeks >= 46]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 45

- ID: `aa2-l45-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (12 meses civis com pelo menos dez encerramentos OU (35 semanas distintas com produção E 138 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 12; TODAS [weeks >= 35; days >= 138]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 46 — Guardião Supremo

Maestria · Difícil. Emblema local aa2-emblem-46: símbolo 6 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 45.

### Trajetória · 2900

- ID: `aa2-l46-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 2.900 encerramentos acumulados.
- Critério matemático e métricas: `total >= 2900`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1740

- ID: `aa2-l46-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.740 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1740`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 46

- ID: `aa2-l46-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (87 encerramentos Ônus OU 155 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 87; days >= 155]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 46

- ID: `aa2-l46-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (145 dias distintos com produção E 58 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 145; confirmedDays >= 58]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 46

- ID: `aa2-l46-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (14 encerramentos no melhor dia OU 16 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 14; days3 >= 16]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 47 — Comandante de Elite

Maestria · Difícil. Emblema local aa2-emblem-47: símbolo 7 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 46.

### Trajetória · 3050

- ID: `aa2-l47-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 3.050 encerramentos acumulados.
- Critério matemático e métricas: `total >= 3050`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1830

- ID: `aa2-l47-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.830 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1830`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 47

- ID: `aa2-l47-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (92 encerramentos Acordo OU 163 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 92; days >= 163]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 47

- ID: `aa2-l47-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 153 dias distintos com produção.
- Critério matemático e métricas: `days >= 153`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 47

- ID: `aa2-l47-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 24 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 24]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 48 — Titã Operacional

Maestria · Difícil. Emblema local aa2-emblem-48: símbolo 8 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 47.

### Trajetória · 3200

- ID: `aa2-l48-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 3.200 encerramentos acumulados.
- Critério matemático e métricas: `total >= 3200`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 1920

- ID: `aa2-l48-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 1.920 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 1920`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 48

- ID: `aa2-l48-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (4 meses civis com os três tipos OU 170 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 4; days >= 170]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 48

- ID: `aa2-l48-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (160 dias distintos com produção E (7 dias úteis na melhor sequência histórica OU 54 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 160; AO MENOS UMA [streak >= 7; weeks >= 54]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 48

- ID: `aa2-l48-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 16 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 16]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 49 — Ícone da Produtividade

Maestria · Difícil. Emblema local aa2-emblem-49: símbolo 9 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 48.

### Trajetória · 3350

- ID: `aa2-l49-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 3.350 encerramentos acumulados.
- Critério matemático e métricas: `total >= 3350`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2010

- ID: `aa2-l49-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.010 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2010`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 49

- ID: `aa2-l49-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (101 encerramentos Ônus OU 178 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 101; days >= 178]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 49

- ID: `aa2-l49-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (168 dias distintos com produção E 68 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 168; confirmedDays >= 68]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 49

- ID: `aa2-l49-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (1.005 encerramentos no melhor ano OU (3 anos distintos com produção E 2.680 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 1005; TODAS [years >= 3; total >= 2680]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 50 — Lenda em Ascensão

Maestria · Difícil. Emblema local aa2-emblem-50: símbolo 10 e faixa 5. Pré-requisito: concluir todas as cinco missões do nível 49.

### Trajetória · 3500

- ID: `aa2-l50-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 3.500 encerramentos acumulados.
- Critério matemático e métricas: `total >= 3500`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2100

- ID: `aa2-l50-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.100 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2100`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 50

- ID: `aa2-l50-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (105 encerramentos Acordo OU 185 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 105; days >= 185]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 50

- ID: `aa2-l50-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 175 dias distintos com produção.
- Critério matemático e métricas: `days >= 175`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 50

- ID: `aa2-l50-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (13 meses civis com pelo menos dez encerramentos OU (44 semanas distintas com produção E 175 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 13; TODAS [weeks >= 44; days >= 175]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 51 — Guardião Lendário

Elite · Muito difícil. Emblema local aa2-emblem-51: símbolo 1 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 50.

### Trajetória · 3750

- ID: `aa2-l51-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 3.750 encerramentos acumulados.
- Critério matemático e métricas: `total >= 3750`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2250

- ID: `aa2-l51-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.250 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2250`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 51

- ID: `aa2-l51-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (113 encerramentos Êxito OU 199 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 113; days >= 199]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 51

- ID: `aa2-l51-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (188 dias distintos com produção E (8 dias úteis na melhor sequência histórica OU 63 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 188; AO MENOS UMA [streak >= 8; weeks >= 63]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 51

- ID: `aa2-l51-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (15 encerramentos no melhor dia OU 17 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 15; days3 >= 17]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 52 — Titã da Aurora

Elite · Muito difícil. Emblema local aa2-emblem-52: símbolo 2 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 51.

### Trajetória · 4000

- ID: `aa2-l52-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 4.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 4000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2400

- ID: `aa2-l52-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.400 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 52

- ID: `aa2-l52-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (5 meses civis com os três tipos OU 211 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 5; days >= 211]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 52

- ID: `aa2-l52-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (200 dias distintos com produção E 80 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 200; confirmedDays >= 80]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 52

- ID: `aa2-l52-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 26 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 26]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 53 — Mestre dos Mil Marcos

Elite · Muito difícil. Emblema local aa2-emblem-53: símbolo 3 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 52.

### Trajetória · 4250

- ID: `aa2-l53-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 4.250 encerramentos acumulados.
- Critério matemático e métricas: `total >= 4250`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2550

- ID: `aa2-l53-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.550 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2550`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 53

- ID: `aa2-l53-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (128 encerramentos Acordo OU 224 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 128; days >= 224]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 53

- ID: `aa2-l53-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 213 dias distintos com produção.
- Critério matemático e métricas: `days >= 213`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 53

- ID: `aa2-l53-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 18 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 18]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 54 — Soberano da Consistência

Elite · Muito difícil. Emblema local aa2-emblem-54: símbolo 4 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 53.

### Trajetória · 4500

- ID: `aa2-l54-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 4.500 encerramentos acumulados.
- Critério matemático e métricas: `total >= 4500`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2700

- ID: `aa2-l54-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.700 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2700`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 54

- ID: `aa2-l54-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (135 encerramentos Êxito OU 236 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 135; days >= 236]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 54

- ID: `aa2-l54-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (225 dias distintos com produção E (8 dias úteis na melhor sequência histórica OU 75 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 225; AO MENOS UMA [streak >= 8; weeks >= 75]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 54

- ID: `aa2-l54-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (1.350 encerramentos no melhor ano OU (3 anos distintos com produção E 3.600 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 1350; TODAS [years >= 3; total >= 3600]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 55 — Arquiteto da Excelência

Elite · Muito difícil. Emblema local aa2-emblem-55: símbolo 5 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 54.

### Trajetória · 4750

- ID: `aa2-l55-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 4.750 encerramentos acumulados.
- Critério matemático e métricas: `total >= 4750`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 2850

- ID: `aa2-l55-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 2.850 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 2850`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 55

- ID: `aa2-l55-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (143 encerramentos Ônus OU 249 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 143; days >= 249]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 55

- ID: `aa2-l55-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (238 dias distintos com produção E 96 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 238; confirmedDays >= 96]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 55

- ID: `aa2-l55-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (14 meses civis com pelo menos dez encerramentos OU (60 semanas distintas com produção E 238 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 14; TODAS [weeks >= 60; days >= 238]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 56 — Lenda dos Encerramentos

Elite · Muito difícil. Emblema local aa2-emblem-56: símbolo 6 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 55.

### Trajetória · 5000

- ID: `aa2-l56-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 5.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 5000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3000

- ID: `aa2-l56-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.000 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 56

- ID: `aa2-l56-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (5 meses civis com os três tipos OU 262 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 5; days >= 262]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 56

- ID: `aa2-l56-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 250 dias distintos com produção.
- Critério matemático e métricas: `days >= 250`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 56

- ID: `aa2-l56-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (16 encerramentos no melhor dia OU 19 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 16; days3 >= 19]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 57 — Mestre dos Recordes

Elite · Muito difícil. Emblema local aa2-emblem-57: símbolo 7 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 56.

### Trajetória · 5250

- ID: `aa2-l57-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 5.250 encerramentos acumulados.
- Critério matemático e métricas: `total >= 5250`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3150

- ID: `aa2-l57-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.150 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3150`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 57

- ID: `aa2-l57-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (158 encerramentos Êxito OU 275 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 158; days >= 275]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 57

- ID: `aa2-l57-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (263 dias distintos com produção E (9 dias úteis na melhor sequência histórica OU 88 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 263; AO MENOS UMA [streak >= 9; weeks >= 88]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 57

- ID: `aa2-l57-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 29 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 29]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 58 — Guardião do Legado

Elite · Muito difícil. Emblema local aa2-emblem-58: símbolo 8 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 57.

### Trajetória · 5500

- ID: `aa2-l58-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 5.500 encerramentos acumulados.
- Critério matemático e métricas: `total >= 5500`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3300

- ID: `aa2-l58-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.300 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3300`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 58

- ID: `aa2-l58-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (165 encerramentos Ônus OU 287 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 165; days >= 287]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 58

- ID: `aa2-l58-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (275 dias distintos com produção E 110 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 275; confirmedDays >= 110]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 58

- ID: `aa2-l58-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 20 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 20]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 59 — Soberano dos Resultados

Elite · Muito difícil. Emblema local aa2-emblem-59: símbolo 9 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 58.

### Trajetória · 5750

- ID: `aa2-l59-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 5.750 encerramentos acumulados.
- Critério matemático e métricas: `total >= 5750`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3450

- ID: `aa2-l59-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.450 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3450`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 59

- ID: `aa2-l59-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (173 encerramentos Acordo OU 300 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 173; days >= 300]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 59

- ID: `aa2-l59-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 288 dias distintos com produção.
- Critério matemático e métricas: `days >= 288`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 59

- ID: `aa2-l59-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (1.725 encerramentos no melhor ano OU (3 anos distintos com produção E 4.600 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 1725; TODAS [years >= 3; total >= 4600]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 60 — Lenda Operacional

Elite · Muito difícil. Emblema local aa2-emblem-60: símbolo 10 e faixa 6. Pré-requisito: concluir todas as cinco missões do nível 59.

### Trajetória · 6000

- ID: `aa2-l60-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 6.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 6000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3600

- ID: `aa2-l60-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.600 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 60

- ID: `aa2-l60-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (5 meses civis com os três tipos OU 312 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 5; days >= 312]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 60

- ID: `aa2-l60-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (300 dias distintos com produção E (9 dias úteis na melhor sequência histórica OU 100 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 300; AO MENOS UMA [streak >= 9; weeks >= 100]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 60

- ID: `aa2-l60-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (15 meses civis com pelo menos dez encerramentos OU (75 semanas distintas com produção E 300 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 15; TODAS [weeks >= 75; days >= 300]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 61 — Ascendente Supremo

Lendária · Extremamente difícil. Emblema local aa2-emblem-61: símbolo 1 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 60.

### Trajetória · 6400

- ID: `aa2-l61-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 6.400 encerramentos acumulados.
- Critério matemático e métricas: `total >= 6400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 3840

- ID: `aa2-l61-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 3.840 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 3840`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 61

- ID: `aa2-l61-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (192 encerramentos Ônus OU 333 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 192; days >= 333]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 61

- ID: `aa2-l61-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (320 dias distintos com produção E 128 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 320; confirmedDays >= 128]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 61

- ID: `aa2-l61-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (18 encerramentos no melhor dia OU 21 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 18; days3 >= 21]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 62 — Guardião Eterno

Lendária · Extremamente difícil. Emblema local aa2-emblem-62: símbolo 2 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 61.

### Trajetória · 6800

- ID: `aa2-l62-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 6.800 encerramentos acumulados.
- Critério matemático e métricas: `total >= 6800`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 4080

- ID: `aa2-l62-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 4.080 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 4080`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 62

- ID: `aa2-l62-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (204 encerramentos Acordo OU 353 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 204; days >= 353]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 62

- ID: `aa2-l62-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 340 dias distintos com produção.
- Critério matemático e métricas: `days >= 340`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 62

- ID: `aa2-l62-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 31 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 31]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 63 — Titã Lendário

Lendária · Extremamente difícil. Emblema local aa2-emblem-63: símbolo 3 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 62.

### Trajetória · 7200

- ID: `aa2-l63-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 7.200 encerramentos acumulados.
- Critério matemático e métricas: `total >= 7200`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 4320

- ID: `aa2-l63-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 4.320 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 4320`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 63

- ID: `aa2-l63-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (216 encerramentos Êxito OU 373 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 216; days >= 373]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 63

- ID: `aa2-l63-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (360 dias distintos com produção E (9 dias úteis na melhor sequência histórica OU 120 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 360; AO MENOS UMA [streak >= 9; weeks >= 120]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 63

- ID: `aa2-l63-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 21 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 21]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 64 — Soberano da Aurora

Lendária · Extremamente difícil. Emblema local aa2-emblem-64: símbolo 4 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 63.

### Trajetória · 7600

- ID: `aa2-l64-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 7.600 encerramentos acumulados.
- Critério matemático e métricas: `total >= 7600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 4560

- ID: `aa2-l64-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 4.560 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 4560`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 64

- ID: `aa2-l64-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (6 meses civis com os três tipos OU 393 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 6; days >= 393]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 64

- ID: `aa2-l64-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (380 dias distintos com produção E 152 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 380; confirmedDays >= 152]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 64

- ID: `aa2-l64-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (2.280 encerramentos no melhor ano OU (3 anos distintos com produção E 6.080 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 2280; TODAS [years >= 3; total >= 6080]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 65 — Mestre Imortal

Lendária · Extremamente difícil. Emblema local aa2-emblem-65: símbolo 5 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 64.

### Trajetória · 8000

- ID: `aa2-l65-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 8.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 8000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 4800

- ID: `aa2-l65-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 4.800 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 4800`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 65

- ID: `aa2-l65-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (240 encerramentos Acordo OU 413 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [acordo >= 240; days >= 413]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 65

- ID: `aa2-l65-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 400 dias distintos com produção.
- Critério matemático e métricas: `days >= 400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 65

- ID: `aa2-l65-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (17 meses civis com pelo menos dez encerramentos OU (100 semanas distintas com produção E 400 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 17; TODAS [weeks >= 100; days >= 400]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 66 — Lenda dos Sete Marcos

Lendária · Extremamente difícil. Emblema local aa2-emblem-66: símbolo 6 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 65.

### Trajetória · 8400

- ID: `aa2-l66-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 8.400 encerramentos acumulados.
- Critério matemático e métricas: `total >= 8400`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 5040

- ID: `aa2-l66-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 5.040 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 5040`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 66

- ID: `aa2-l66-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (252 encerramentos Êxito OU 434 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 252; days >= 434]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 66

- ID: `aa2-l66-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (420 dias distintos com produção E (10 dias úteis na melhor sequência histórica OU 140 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 420; AO MENOS UMA [streak >= 10; weeks >= 140]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um dia marcante · 66

- ID: `aa2-l66-m5`.
- Categoria: Recorde diário.
- Descrição e valor necessário: Alcançar (19 encerramentos no melhor dia OU 22 dias com pelo menos três encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [daily >= 19; days3 >= 22]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 67 — Guardião do Infinito

Lendária · Extremamente difícil. Emblema local aa2-emblem-67: símbolo 7 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 66.

### Trajetória · 8800

- ID: `aa2-l67-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 8.800 encerramentos acumulados.
- Critério matemático e métricas: `total >= 8800`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 5280

- ID: `aa2-l67-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 5.280 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 5280`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 67

- ID: `aa2-l67-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (264 encerramentos Ônus OU 454 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 264; days >= 454]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 67

- ID: `aa2-l67-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (440 dias distintos com produção E 176 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 440; confirmedDays >= 176]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Uma semana marcante · 67

- ID: `aa2-l67-m5`.
- Categoria: Semanal.
- Descrição e valor necessário: Alcançar (80 encerramentos na melhor semana OU 34 semanas com pelo menos cinco encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [weekly >= 80; weeks5 >= 34]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 68 — Entidade da Aurora

Lendária · Extremamente difícil. Emblema local aa2-emblem-68: símbolo 8 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 67.

### Trajetória · 9200

- ID: `aa2-l68-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 9.200 encerramentos acumulados.
- Critério matemático e métricas: `total >= 9200`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 5520

- ID: `aa2-l68-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 5.520 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 5520`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 68

- ID: `aa2-l68-m3`.
- Categoria: Diversidade.
- Descrição e valor necessário: Alcançar (6 meses civis com os três tipos OU 474 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [diverseMonths >= 6; days >= 474]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 68

- ID: `aa2-l68-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar 460 dias distintos com produção.
- Critério matemático e métricas: `days >= 460`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um mês marcante · 68

- ID: `aa2-l68-m5`.
- Categoria: Mensal.
- Descrição e valor necessário: Alcançar (200 encerramentos no melhor mês civil OU 23 meses civis com pelo menos dez encerramentos).
- Critério matemático e métricas: `AO MENOS UMA [monthly >= 200; months10 >= 23]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 69 — Lenda Absoluta

Lendária · Extremamente difícil. Emblema local aa2-emblem-69: símbolo 9 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 68.

### Trajetória · 9600

- ID: `aa2-l69-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 9.600 encerramentos acumulados.
- Critério matemático e métricas: `total >= 9600`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 5760

- ID: `aa2-l69-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 5.760 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 5760`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 69

- ID: `aa2-l69-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (288 encerramentos Êxito OU 494 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [exito >= 288; days >= 494]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 69

- ID: `aa2-l69-m4`.
- Categoria: Sequência.
- Descrição e valor necessário: Alcançar (480 dias distintos com produção E (10 dias úteis na melhor sequência histórica OU 160 semanas distintas com produção)).
- Critério matemático e métricas: `TODAS [days >= 480; AO MENOS UMA [streak >= 10; weeks >= 160]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Um ano marcante · 69

- ID: `aa2-l69-m5`.
- Categoria: Anual.
- Descrição e valor necessário: Alcançar (2.880 encerramentos no melhor ano OU (3 anos distintos com produção E 7.680 encerramentos acumulados)).
- Critério matemático e métricas: `AO MENOS UMA [annual >= 2880; TODAS [years >= 3; total >= 7680]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.

## Nível 70 — Lenda da Aurora

Lendária · Conquista máxima. Emblema local aa2-emblem-70: símbolo 10 e faixa 7. Pré-requisito: concluir todas as cinco missões do nível 69.

### Trajetória · 10000

- ID: `aa2-l70-m1`.
- Categoria: Acumulado.
- Descrição e valor necessário: Alcançar 10.000 encerramentos acumulados.
- Critério matemático e métricas: `total >= 10000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Confirmações · 6000

- ID: `aa2-l70-m2`.
- Categoria: Panjud.
- Descrição e valor necessário: Alcançar 6.000 confirmações válidas no Panjud.
- Critério matemático e métricas: `confirmed >= 6000`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Repertório · 70

- ID: `aa2-l70-m3`.
- Categoria: Tipos.
- Descrição e valor necessário: Alcançar (300 encerramentos Ônus OU 514 dias distintos com produção).
- Critério matemático e métricas: `AO MENOS UMA [onus >= 300; days >= 514]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Constância · 70

- ID: `aa2-l70-m4`.
- Categoria: Dias produtivos.
- Descrição e valor necessário: Alcançar (500 dias distintos com produção E 200 dias distintos com confirmação válida).
- Critério matemático e métricas: `TODAS [days >= 500; confirmedDays >= 200]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
### Histórico consistente · 70

- ID: `aa2-l70-m5`.
- Categoria: Especial.
- Descrição e valor necessário: Alcançar (18 meses civis com pelo menos dez encerramentos OU (125 semanas distintas com produção E 500 dias distintos com produção)).
- Critério matemático e métricas: `AO MENOS UMA [months10 >= 18; TODAS [weeks >= 125; days >= 500]]`.
- Fonte: histórico de registros, conforme os critérios comuns acima.
