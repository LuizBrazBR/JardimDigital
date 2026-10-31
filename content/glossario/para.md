---
title: Para (for)
---

> [!abstract] Definição
> **Um [[glossario/laco|laço]] que junta numa linha só as três peças da repetição: o começo, a condição e a mudança.** Em JavaScript, se escreve com `for` ("para"): `for (inicialização; condição; incremento) { ... }`.

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// mostra de 1 a 5
```

As três partes ficam nos parênteses, separadas por ponto e vírgula:

| Parte | No exemplo | Quando roda |
|---|---|---|
| [[glossario/inicializacao\|inicialização]] | `let i = 1` | uma vez só, antes de tudo |
| condição | `i <= 5` | antes de cada volta |
| [[glossario/incremento\|incremento]] | `i++` | no fim de cada volta |

O incremento é escrito antes do [[glossario/bloco|bloco]], mas roda depois dele. E a variável criada com `let` nos parênteses só existe dentro do laço: usá-la depois dá `ReferenceError`.

O `for` serve bem quando se sabe **quantas voltas** o laço vai dar, como "de 1 a 100". Quando só se sabe quando parar, como "peça a senha até a pessoa acertar", o [[glossario/enquanto|enquanto]] (`while`) costuma ser mais claro.

Ver a aula [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|for: o laço contado]].

## De onde vem a palavra

*Para* vem de uma forma mais antiga, *pera*, do galego-português antigo, que juntava o latim *per* ("através de") e *ad* ("a, para").

O inglês *for* vem do inglês antigo *for*, do protogermânico *\*furi*. São primos o alemão *für*, o holandês *voor* e, mais longe, o latim *per*, o mesmo que está dentro do *para*.

Na programação, a palavra começou em alemão: na linguagem Superplan, criada entre 1949 e 1951 pelo suíço Heinz Rutishauser, o laço se escrevia com *für*. O Superplan influenciou o ALGOL 58, e os descendentes do ALGOL usam *for*. O formato de três partes com ponto e vírgula veio da linguagem B e ficou famoso com o C, de onde o JavaScript o herdou.

Fontes: Wiktionary: [para](https://en.wiktionary.org/wiki/para), [for](https://en.wiktionary.org/wiki/for) · Wikipedia: [Superplan](https://en.wikipedia.org/wiki/Superplan), [Loop (statement)](https://en.wikipedia.org/wiki/Loop_(statement))
