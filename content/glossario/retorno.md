---
title: Retorno (return)
---

> [!abstract] Definição
> **O valor que uma [[glossario/funcao|função]] devolve para quem a chamou.** Em JavaScript, a palavra `return` encerra a função e entrega esse valor no lugar da [[glossario/chamada|chamada]].

```js
function somar(a, b) {
  return a + b;          // devolve o resultado
}

let total = somar(2, 3); // a chamada vale 5
console.log(total * 2);  // 10
```

Quando o programa roda, a chamada é trocada pelo valor que ela devolve: `somar(2, 3) * 2` vira `5 * 2`. Por isso, o valor devolvido pode ser guardado numa variável, usado numa conta, comparado num `if` ou passado como [[glossario/argumento|argumento]] para outra função.

Devolver é diferente de mostrar. O `console.log` [[glossario/imprimir|imprime]] o valor na tela, para a pessoa ler, mas o programa não consegue usar o que foi mostrado. Uma função sem `return` devolve `undefined`, mesmo que tenha mostrado alguma coisa pelo caminho.

O `return` encerra a função na hora. O que vem depois dele não roda, e um `return` dentro de um [[glossario/laco|laço]] encerra o laço e a função de uma vez. O valor precisa começar na mesma linha do `return`: com `return` sozinho na linha, a função devolve `undefined`.

O `return` é uma [[glossario/palavra-reservada|palavra reservada]]. No Python, ele se escreve igual, e a função sem `return` devolve `None`.

Ver a aula [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|return: devolvendo um resultado]].

## De onde vem a palavra

O inglês *return* vem do francês antigo *retorner*, do latim medieval *retornare*, "virar de volta", de *re-* ("de volta") + *tornare* ("virar, girar"). O português tem o mesmo par: **retornar** e **retorno**. O `return` faz o programa **voltar** para a linha que chamou a função, levando o valor junto.

O *tornare* vem de *tornus*, o **torno**, a máquina que gira a madeira para arredondá-la, e este do grego *tórnos*. No português, *tornar* ainda tem o sentido de "voltar" em frases como "ele tornou a ligar", isto é, ligou de novo.

O resultado também volta: como se viu no verbete [[glossario/saida|saída]], *resultado* vem do latim *resultāre*, "pular de volta".

Fontes: MDN: [return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) · Wiktionary: [return](https://en.wiktionary.org/wiki/return), [retornar](https://en.wiktionary.org/wiki/retornar), [tornar](https://en.wiktionary.org/wiki/tornar), [torno](https://en.wiktionary.org/wiki/torno), [tornus](https://en.wiktionary.org/wiki/tornus)
