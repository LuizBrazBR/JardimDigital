---
title: Callback
---

> [!abstract] Definição
> **Uma função entregue como [[glossario/argumento|argumento]] a outra função, para que essa outra a chame quando precisar.**

Uma função também é um valor, como um número ou um texto, e por isso pode ser entregue a outra função. Num exemplo pequeno:

```js
function fazerDuasVezes(tarefa) {
  tarefa(); // chama a função que recebeu
  tarefa();
}

function dizerOi() {
  console.log("oi");
}

fazerDuasVezes(dizerOi); // oi, oi
```

A `dizerOi` é o callback: vai sem parênteses, entregue como valor, e quem a chama é a `fazerDuasVezes`, nas linhas `tarefa()`.

No curso, o método que recebe um callback é o `sort()`, e o callback é a [[glossario/funcao-de-comparacao|função de comparação]]:

```js
function compararNumeros(a, b) {
  return a - b;
}

const numeros = [10, 1, 2];

numeros.sort(compararNumeros); // entrega a função, sem parênteses

console.log(numeros); // [1, 2, 10]
```

Você não chama a `compararNumeros`. O `sort()` chama, cada vez que precisa comparar dois itens, e escolhe os pares sozinho.

O detalhe que mais engana são os parênteses. `compararNumeros`, sem eles, é a função, entregue para ser usada depois. `compararNumeros()`, com eles, chama a função na hora, e o que vai adiante é só o resultado dela. É a diferença entre deixar o seu número de telefone com alguém e fazer você mesmo a ligação.

Ver a [[programacao/logica-de-programacao/modulo-7/03-colocando-em-ordem-a-ideia-de-ordenacao|aula 7.3]].

## De onde vem a palavra

Do inglês *call back*, "ligar de volta, chamar de volta":

| Parte | Sentido |
|---|---|
| *call* | "chamar", do inglês antigo e do nórdico antigo *kalla*, "chamar, gritar" |
| *back* | "de volta" |

A imagem é a do telefone. Você deixa o seu número, e a outra pessoa **liga de volta** quando tiver o que dizer. No código, você deixa a função, e quem a recebeu chama de volta quando precisa dela.

Fontes: MDN: [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) · Wiktionary: [callback](https://en.wiktionary.org/wiki/callback), [call](https://en.wiktionary.org/wiki/call)
