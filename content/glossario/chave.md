---
title: Chave (key)
---

> [!abstract] Definição
> **O nome de uma informação dentro de um [[glossario/objeto|objeto]].** Em `{ nome: "Ana" }`, a chave é `nome`, e o valor é `"Ana"`. Juntos, a chave e o valor formam uma [[glossario/propriedade|propriedade]].

```js
let pessoa = { nome: "Ana", idade: 20 };
//             ↑ chave      ↑ chave

console.log(pessoa.nome);    // a chave escrita no código
let campo = "idade";
console.log(pessoa[campo]);  // a chave guardada numa variável: 20
```

A chave faz no objeto o papel que o [[glossario/indice|índice]] faz no array: é por ela que se chega ao valor. A diferença é que o índice é uma posição, 0, 1, 2, e a chave é um nome, que diz o que a informação é.

Cuidado com a palavra. Em português, **as chaves** também são os sinais `{` e `}`, que abrem e fecham o objeto. Em inglês, não há confusão: a chave do objeto é *key*, e os sinais são *braces*.

Ver a aula [[programacao/logica-de-programacao/modulo-6/04-objetos-descrevendo-uma-coisa-com-chave-e-valor|Objetos: descrevendo uma coisa com chave e valor]].

## De onde vem a palavra

Do latim *clāvis*, "chave". A ideia é a mesma da chave de porta: com ela, você abre o lugar onde o valor está guardado.

Do *clāvis* vieram também a **clave** da música e a **clavícula**, do latim *clāvicula*, "chavezinha", o osso do ombro. E o **conclave**, de *con-*, "junto", e *clāvis*: um lugar que se fecha à chave, como a reunião em que os cardeais escolhem o papa a portas trancadas.

Fontes: MDN: [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) · Wiktionary: [chave](https://en.wiktionary.org/wiki/chave), [clāvis](https://en.wiktionary.org/wiki/clavis), [clāvicula](https://en.wiktionary.org/wiki/clavicula), [conclave](https://en.wiktionary.org/wiki/conclave)
