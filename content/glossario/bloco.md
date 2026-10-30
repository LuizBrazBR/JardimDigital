---
title: Bloco
---

> [!abstract] Definição
> **Um grupo de instruções entre chaves `{ }`, que funciona como uma unidade.** O bloco de um `if` roda inteiro, ou não roda nada.

```js
if (saldo >= preco) {
  console.log("Compra aprovada!");
  console.log("Produto enviado!");
}
// as duas linhas rodam juntas, ou nenhuma roda
```

Sem as chaves, o `if` fica só com a primeira instrução depois dele. Por isso, a regra é pôr chaves sempre. O recuo, os espaços no começo da linha, não conta para o JavaScript: é só para quem lê. No Python é o contrário: não há chaves, e o próprio recuo forma o bloco.

Ver a aula [[programacao/logica-de-programacao/modulo-3/01-tomando-decisoes-com-if|Tomando decisões com if]].

## De onde vem a palavra

Do francês *bloc*, que veio do holandês médio *blok*, "tronco de árvore". No francês antigo, *bloc* era uma **tora**, um pedaço grande e inteiriço de madeira. Daí o sentido de peça maciça, como um bloco de pedra, e o de grupo que anda junto, como um bloco de carnaval.

> [!tip] Parente do log
> O [[glossario/log|log]] do `console.log` também é, em inglês, uma tora. São duas palavras da programação que nasceram como um pedaço de madeira.

Fontes: Wiktionary: [bloc](https://en.wiktionary.org/wiki/bloc), [bloco](https://pt.wiktionary.org/wiki/bloco)
