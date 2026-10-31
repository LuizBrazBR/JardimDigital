---
title: Enquanto (while)
---

> [!abstract] Definição
> **Um [[glossario/laco|laço]] que repete um bloco de código enquanto uma condição for verdadeira.** Em JavaScript, se escreve com `while` ("enquanto"): `while (condição) { ... }`.

```js
let i = 1;

while (i <= 5) {
  console.log(i);
  i = i + 1;
}
```

O formato é o de uma [[glossario/condicional|condicional]] (`if`), com uma diferença: depois de rodar o [[glossario/bloco|bloco]], o `while` volta para conferir a condição de novo. Só segue em frente quando ela dá `false`.

As três peças do laço ficam espalhadas:

| Peça | Onde fica | No exemplo |
|---|---|---|
| começo | antes do `while` | `let i = 1;` |
| condição | entre os parênteses | `i <= 5` |
| mudança | dentro das chaves | `i = i + 1;` |

O `i` é a **variável de controle**: é ela que decide quando o laço para. Se nada no bloco mudar essa variável na direção certa, a condição nunca fica falsa, e o resultado é um [[glossario/laco-infinito|laço infinito]].

O `while` serve bem quando se sabe **quando parar**, mas não **quantas voltas** vão ser necessárias, como em "peça a senha até a pessoa acertar".

Ver a aula [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|while: repetindo enquanto for verdade]].

## De onde vem a palavra

*Enquanto* vem do galego-português antigo *enquanto*, de *en* ("em") + *quanto*. O espanhol tem a mesma construção: *en cuanto*.

O inglês *while* vem do inglês antigo *hwīl*, "um tempo, um período". Até hoje, *a while* é "um tempo", e a conjunção *while* quer dizer "durante o tempo em que". O alemão *Weile*, "um tempo", é primo. A raiz indo-europeia, *\*kʷyeh₁-*, queria dizer "descansar", e está também no latim *tranquillus*, o nosso **tranquilo**.

Fontes: Wiktionary: [enquanto](https://en.wiktionary.org/wiki/enquanto), [while](https://en.wiktionary.org/wiki/while)
