---
title: Função de comparação
---

> [!abstract] Definição
> **Uma função que recebe dois itens, `a` e `b`, e diz qual deles deve vir primeiro numa [[glossario/ordenacao|ordenação]].** Ela responde com um número, e só o sinal importa: negativo, o `a` vem antes; positivo, o `b` vem antes; zero, empate.

É o que o `sort()` do JavaScript recebe para saber como ordenar. Sem ela, o `sort()` compara os itens como texto, e `[10, 1, 2]` vira `[1, 10, 2]`.

```js
const numeros = [10, 1, 2];

numeros.sort((a, b) => a - b); // crescente:   [1, 2, 10]
numeros.sort((a, b) => b - a); // decrescente: [10, 2, 1]
```

A subtração funciona porque dá o sinal certo: se o `a` é menor, `a - b` é negativo, e o `a` vem antes. Para objetos, a conta usa uma propriedade, como em `alunos.sort((a, b) => b.nota - a.nota)`.

Três cuidados:

- **Responder com um número, e não com `true` ou `false`.** Uma função como `(a, b) => a > b` nunca dá negativo, e a lista não fica em ordem.
- **Entregar a função sem parênteses**: `numeros.sort(compararNumeros)`. Quem a chama é o `sort()`, quantas vezes precisar, com os pares que ele escolher. Por isso ela é um [[glossario/callback|callback]].
- **Não contar com a ordem das perguntas.** O `a` nem sempre é o item que está mais à esquerda no array.

Ver a [[programacao/logica-de-programacao/modulo-7/03-colocando-em-ordem-a-ideia-de-ordenacao|aula 7.3]].

## De onde vem a palavra

As duas palavras já têm verbete. **[[glossario/funcao|Função]]** vem do latim *functiō*, "cumprimento, execução" de uma tarefa. **[[glossario/comparacao|Comparação]]** vem do latim *comparāre*, de *com-*, "junto", e *pār*, "igual": pôr duas coisas lado a lado.

A função de comparação é, então, **a que cumpre a tarefa de pôr dois itens lado a lado** e dizer qual vem antes. Na documentação em inglês, o parâmetro do `sort()` se chama `compareFn`, abreviação de *compare function*, "função de comparar".

Fontes: MDN: [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [Array.prototype.sort() em português](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
