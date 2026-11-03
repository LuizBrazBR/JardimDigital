---
title: Registro (record)
---

> [!abstract] Definição
> **O conjunto das informações de uma coisa só, guardadas juntas.** Num [[glossario/array|array]] de [[glossario/objeto|objetos]], cada objeto é um registro, e o array é a lista de registros.

```js
let tarefas = [
  { titulo: "estudar JavaScript", concluida: true },  // um registro
  { titulo: "lavar louça", concluida: false }         // outro registro
];

console.log(tarefas[1].titulo); // lavar louça
```

Uma lista de registros funciona como uma planilha: cada registro é uma linha, e cada [[glossario/propriedade|propriedade]] é uma coluna. Por isso, todos os registros da lista devem ter as mesmas [[glossario/chave|chaves]], escritas do mesmo jeito. É o mesmo jeito de organizar de uma tabela num banco de dados, em que cada linha também se chama registro.

Ver a aula [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|Array de objetos: uma lista de registros]].

## De onde vem a palavra

Do latim medieval *registrum*, que veio do latim tardio *regesta*, "lista, coisas registradas", e este do latim *regerere*, "levar de volta; registrar", formado por *re-*, "de volta", e *gerere*, "levar". Registrar é levar uma informação para um livro, onde ela fica guardada.

Fontes: Wiktionary: [registro](https://en.wiktionary.org/wiki/registro), [regerō](https://en.wiktionary.org/wiki/regero)
