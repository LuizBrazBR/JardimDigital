---
title: Imprimir (print)
---

> [!abstract] Definição
> **Na programação, mostrar um texto na tela, no [[glossario/console|console]] ou no terminal.** Em JavaScript, se imprime com `console.log`, e em Python, com `print`. Nada sai no papel.

```js
console.log("Bom dia!"); // imprime: Bom dia!
```

Imprimir é para a pessoa que olha a tela. O programa não lê de volta o que imprimiu: o texto mostrado não fica guardado em lugar nenhum. Para que um valor calculado numa [[glossario/funcao|função]] continue sendo usado, a função precisa devolvê-lo com [[glossario/retorno|return]].

```js
function somarImprimindo(a, b) {
  console.log(a + b);  // só imprime
}

function somar(a, b) {
  return a + b;        // devolve
}

let x = somarImprimindo(2, 3); // imprime 5, mas x fica undefined
let y = somar(2, 3);           // não imprime nada, e y vale 5
```

Ver as aulas [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|Seu primeiro código: console.log]] e [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|return: devolvendo um resultado]].

## De onde vem a palavra

Do latim *imprimere*, "apertar sobre, marcar", de *in-* + *premere*, "apertar". Imprimir era **marcar apertando**, como faz um carimbo ou uma prensa.

Do mesmo *premere* vêm **impressão**, **comprimir**, **deprimir**, **oprimir** e **reprimir**. O inglês *print* também vem de lá, pelo inglês médio *emprinten*, "marcar, gravar".

O sentido de "mostrar na tela" vem dos computadores antigos, em que a saída muitas vezes saía mesmo em papel. O nome ficou depois que a saída passou para a tela.

Fontes: Wiktionary: [imprimir](https://en.wiktionary.org/wiki/imprimir), [imprimō](https://en.wiktionary.org/wiki/imprimo), [premō](https://en.wiktionary.org/wiki/premo), [print](https://en.wiktionary.org/wiki/print)
