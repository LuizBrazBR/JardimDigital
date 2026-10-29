---
title: 1. O que é programar e o que é um algoritmo
aliases:
  - programacao/logica-de-programacao/o-que-e-programar-e-algoritmo
tags:
  - logica-de-programacao
  - algoritmo
---

Resumo da primeira aula do curso de Lógica de Programação. São as duas ideias que sustentam todo o resto: variáveis, condições, repetições e funções são só jeitos de escrever [[glossario/algoritmo|algoritmos]] que o computador consiga executar.

## Programar

> [!abstract] Definição
> **[[glossario/programar|Programar]] é dar instruções precisas e ordenadas para o computador executar.**

O detalhe que muda tudo: o computador faz **exatamente** o que você manda. Nem mais, nem menos, e na ordem em que você mandou.

> [!example] O sanduíche
> Peça a alguém que nunca fez um sanduíche: "faça um sanduíche de pão com manteiga". Se a pessoa seguir só as palavras, sem nenhum conhecimento prévio, pode tentar passar manteiga no pacote fechado. Ninguém disse "abra o pacote", "pegue duas fatias", "abra o pote", "use a faca".

O computador é essa pessoa. Ele não tem senso comum, não adivinha o que você quis dizer e não completa os passos que você pulou por achar óbvios.

## Algoritmo

> [!abstract] Definição
> **Um [[glossario/algoritmo|algoritmo]] é uma sequência de passos bem definida e ordenada para resolver um problema ou realizar uma tarefa.**

A definição não fala em computador. Algoritmos existem muito antes dele, e a gente usa vários todo dia:

- **Receita de bolo**: transforma ingredientes soltos em um bolo pronto.
- **Trocar um pneu**: leva do "pneu furado" ao "carro rodando de novo".

| Passo | O que fazer |
|---|---|
| 1 | Separar os ingredientes: farinha, ovos, açúcar, leite e fermento |
| 2 | Misturar os ingredientes secos e os líquidos em uma tigela |
| 3 | Bater a massa até ficar homogênea |
| 4 | Untar a forma e despejar a massa dentro dela |
| 5 | Assar no forno preaquecido por cerca de 40 minutos |
| 6 | Esperar esfriar antes de desenformar e servir |

Programar, então, é escrever um algoritmo numa linguagem que o computador entende e executa, como o JavaScript.

## Ordem e precisão

**A ordem faz parte da solução.** Na troca de pneu, os passos são sempre os mesmos, mas não dá para colocar o estepe antes de tirar a roda furada, nem abaixar o carro antes de apertar as porcas. Com a ordem trocada, o algoritmo falha, ou alguém se machuca.

**Precisão é não depender de adivinhação.**

| Vago | Preciso |
|---|---|
| "Misture os ingredientes" | "Misture a farinha, o açúcar e o fermento numa tigela, depois adicione os ovos e o leite" |

Um bom hábito é escrever o algoritmo em comentários antes do código. O trecho abaixo já é um arquivo JavaScript válido: comentários (`//`) não executam nada, só organizam o raciocínio.

```js
// Algoritmo: trocar um pneu furado
// 1. Parar o carro em um local seguro e sinalizar
// 2. Pegar o estepe, o macaco e a chave de rodas
// 3. Afrouxar um pouco as porcas da roda furada (ainda com o carro no chão)
// 4. Levantar o carro com o macaco
// 5. Terminar de tirar as porcas e retirar a roda furada
// 6. Colocar a roda do estepe no lugar
// 7. Colocar e apertar as porcas
// 8. Abaixar o carro e apertar as porcas com mais força
```

Repare no passo 3: as porcas são afrouxadas **com o carro ainda no chão**. Com a roda no ar, ela giraria junto com a chave. É o tipo de detalhe que uma pessoa faz sem pensar e que um algoritmo precisa dizer.

## De onde vêm as palavras

- **[[glossario/algoritmo|Algoritmo]]** vem do nome de uma pessoa: o matemático persa **al-Khwārizmī** (séc. IX), cujo livro de aritmética chegou à Europa em latim começando com *Dixit Algorizmi*, "disse al-Khwārizmī". A palavra **algarismo** tem a mesma origem.
- **[[glossario/programar|Programar]]** vem do grego *prógramma*, "aviso público", de *pro-* (antes) + *gráphō* (escrever). Um programa é, desde a origem, **algo escrito antes**.

> [!tip] Para guardar
> - **Algoritmo** é a receita: os passos, na ordem certa.
> - **Programar** é escrever essa receita para o computador, sem pular nada que pareça óbvio.
> - O computador não adivinha. Faz **exatamente** o que você mandou.
