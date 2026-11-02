---
title: Método (method)
---

> [!abstract] Definição
> **Uma [[glossario/funcao|função]] que vem dentro de um valor e trabalha com ele.** Chama-se com o nome do valor, um ponto, o nome do método e os parênteses: `compras.push("café")`.

```js
let compras = ["arroz"];

compras.push("café");          // método do array: põe no fim
console.log(compras.pop());    // método do array: tira do fim e devolve. Mostra café
console.log(compras.length);   // não é método: é um valor, e vai sem parênteses. Mostra 1
```

O ponto quer dizer "de dentro de": `compras.push` é "o `push` que fica dentro de `compras`". O `console.log` também é um método: o `log` do `console`. Todo array já nasce com os seus métodos, como `push`, `pop`, `shift` e `unshift`, e não é preciso criá-los.

Como em qualquer função, sem os parênteses o método não é chamado, e nenhum erro avisa.

O `length` também vem depois do ponto, mas não é método: é uma [[glossario/propriedade|propriedade]], uma informação que o array guarda, e por isso vai sem parênteses. Para decidir, a pergunta é "isso é uma informação ou uma ação?".

Ver a aula [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|Mexendo no array: adicionar, remover e o tamanho]].

## De onde vem a palavra

Do latim *methodus*, do grego *méthodos*, formado por *metá* e *hodós*, "caminho". No grego, *hodós* era a estrada, a viagem e também "o jeito de fazer alguma coisa". Método é o caminho que se segue para chegar a um resultado. Na programação, é o jeito pronto que um valor tem de fazer uma tarefa.

Do mesmo *hodós* vem o grego *éxodos*, a saída, o caminho para fora, que deu o nosso **êxodo**.

Fontes: MDN: [Method](https://developer.mozilla.org/en-US/docs/Glossary/Method) · Wiktionary: [method](https://en.wiktionary.org/wiki/method), [ὁδός](https://en.wiktionary.org/wiki/%E1%BD%81%CE%B4%CF%8C%CF%82)
