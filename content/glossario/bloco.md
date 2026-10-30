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

## O bloco pode ficar sozinho

Até o módulo 2, as instruções vinham soltas, uma por linha. Com chaves em volta, elas rodam do mesmo jeito:

```js
console.log("oi");
console.log("tchau");

{
  console.log("oi");
  console.log("tchau");
}

// os dois trechos mostram oi e tchau
```

Isso é JavaScript válido. As chaves não são uma peça do `if`: o bloco é uma instrução da própria linguagem, que junta várias instruções numa só. O `if` e o `else` mandam numa instrução só, e por isso usam um bloco: assim, essa instrução única carrega quantas linhas forem necessárias.

Sozinho, o bloco não decide nada. O que está dentro roda uma vez, na sua vez, como se estivesse solto. Isso tem duas consequências:

- **Um bloco que se solta do `if` ou do `else` roda sempre.** É a pegadinha da [[programacao/logica-de-programacao/modulo-3/02-if-else-o-outro-caminho|aula 3.2]]: com `else (condição)` e a `{` na linha de baixo, o bloco fica sem dono e roda em qualquer caso, sem erro nenhum.
- **Uma variável criada dentro do bloco só existe lá dentro.** Vale para `let` e `const`:

```js
{
  let mensagem = "oi";
  console.log(mensagem); // oi
}
console.log(mensagem);   // ReferenceError: mensagem is not defined
```

Esse "lá dentro" e "lá fora" se chama escopo, e é o assunto do módulo 5.

Ver as aulas [[programacao/logica-de-programacao/modulo-3/01-tomando-decisoes-com-if|Tomando decisões com if]] e [[programacao/logica-de-programacao/modulo-3/02-if-else-o-outro-caminho|if/else: o outro caminho]].

## De onde vem a palavra

Do francês *bloc*, que veio do holandês médio *blok*, "tronco de árvore". No francês antigo, *bloc* era uma **tora**, um pedaço grande e inteiriço de madeira. Daí o sentido de peça maciça, como um bloco de pedra, e o de grupo que anda junto, como um bloco de carnaval.

> [!tip] Mais madeira
> O [[glossario/log|log]] do `console.log` também é, em inglês, uma tora, e [[glossario/codigo|código]] vem do latim *cōdex*, tronco de árvore. São três palavras da programação que nasceram como madeira.

Fontes: Wiktionary: [bloc](https://en.wiktionary.org/wiki/bloc), [bloco](https://pt.wiktionary.org/wiki/bloco)
