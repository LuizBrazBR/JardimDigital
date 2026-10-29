---
title: 2. Pensando como programador
aliases:
  - programacao/logica-de-programacao/pensando-como-programador
tags:
  - logica-de-programacao
  - pensamento-computacional
---

Segunda aula do curso. A [[programacao/logica-de-programacao/01-o-que-e-programar-e-algoritmo|primeira]] mostrou o que é um [[glossario/algoritmo|algoritmo]]. Esta responde à pergunta seguinte: **como se chega aos passos** quando o problema parece grande demais?

A resposta tem nome: **[[glossario/pensamento-computacional|pensamento computacional]]**. Seymour Papert usou a expressão em 1980, e Jeannette Wing a popularizou em 2006. Não precisa de computador nem de código. É um jeito de olhar para problemas, e se treina com a prática. Ele se apoia em três ideias:

| Ideia | Pergunta que ela faz | Em uma frase |
|---|---|---|
| [[glossario/decomposicao\|Decomposição]] | *Em que partes isso se divide?* | quebrar o grande em pedaços pequenos |
| [[glossario/padrao\|Padrões]] | *Já resolvi algo parecido?* | notar o que se repete e reaproveitar |
| [[glossario/abstracao\|Abstração]] | *O que importa aqui?* | ficar com o essencial e deixar o resto de fora |

## Decomposição

Problema grande trava qualquer um. "Organizar a festa de aniversário" não tem por onde começar. Quebrado em partes, cada uma fica simples:

- data e local
- lista de convidados e convites
- cardápio e compras
- decoração

Resolve-se uma parte de cada vez e depois junta tudo. Se uma parte ainda parecer grande, quebra de novo: "cardápio e compras" vira "definir o cardápio", "fazer a lista" e "ir ao mercado".

## Reconhecer padrões

Problemas diferentes muitas vezes têm o mesmo formato. Trocar a lâmpada da cozinha ou a do quarto é igual: desligar a energia, tirar a queimada, pôr a nova, religar. Muda o cômodo, o passo a passo é o mesmo.

Quem enxerga o padrão escreve a solução **uma vez** e reaproveita. Na programação, é isso que vira uma **função** (assunto de um módulo mais à frente): a mesma lógica usada várias vezes, em vez de reescrita a cada vez.

## Abstração

Toda boa solução deixa coisas de fora, de propósito. Não é preguiça, é foco.

O mapa do aplicativo de trânsito desenha ruas como linhas e lugares como ícones. A cor das casas e as árvores da calçada não aparecem, porque não ajudam ninguém a chegar ao destino. O mapa é útil **justamente** pelo que ele ignora.

## As três juntas: o total de uma compra

O exemplo da aula decompõe o cálculo de uma compra com desconto:

```js
// Problema: calcular o total de uma compra, com desconto quando for o caso

// Passo 1: somar o preço de todos os itens do carrinho
// Passo 2: ver se a soma passa do valor mínimo para ganhar desconto
// Passo 3: se passar, aplicar o desconto sobre a soma
// Passo 4: mostrar o valor final para o cliente
```

Dá para ver as três ideias no mesmo problema:

- **Decomposição**: "calcular a compra" virou quatro passos, cada um fácil sozinho.
- **Padrão**: o passo 1 é a mesma ação repetida para cada item (pegar o preço, somar ao total). Com 2 itens ou 200, o passo é o mesmo. Mais adiante, isso vira uma repetição no código.
- **Abstração**: para o total, cada produto é só um **preço**. Nome, foto, cor e marca ficam de fora.

## De onde vêm as palavras

Os três nomes descrevem, ao pé da letra, o que cada ideia faz:

- **[[glossario/decomposicao|Decompor]]**: *de-* (desfazer) + *compor*, do latim *con-* (junto) + *pōnere* (pôr). **Desfazer o que foi posto junto.**
- **[[glossario/padrao|Padrão]]**: do latim *patrōnus*, "patrono". No inglês medieval, *patron* já queria dizer também "exemplo", e daí veio *pattern*. Um padrão é um **modelo que se repete**.
- **[[glossario/abstracao|Abstrair]]**: do latim *ab-* (para longe de) + *trahere* (puxar). **Puxar para fora** só o que interessa.

> [!tip] Para guardar
> Diante de um problema grande:
> 1. **Decomponha**: em que partes ele se divide?
> 2. **Procure padrões**: alguma parte é igual a outra que já resolvi?
> 3. **Abstraia**: o que realmente importa para resolver isto?
>
> O algoritmo sai daí.
