---
title: DRY (não se repita)
---

> [!abstract] Definição
> **O conselho de não escrever a mesma lógica em dois lugares do programa.** A sigla vem do inglês *Don't Repeat Yourself*, "não se repita". Se a mesma regra aparece em vários lugares, ela deve virar uma [[glossario/funcao|função]], chamada onde for preciso.

```js
// a regra "nota vale de 0 a 10" num lugar só
function notaValida(nota) {
  return nota >= 0 && nota <= 10;
}

notaValida(nota1);
notaValida(nota2);
```

O problema da repetição aparece na hora de mudar. Se a regra está copiada em cinco lugares e muda, é preciso achar e trocar as cinco. Uma esquecida vira um erro que ninguém nota. Com a regra numa função, muda-se uma linha.

O princípio foi formulado por Andy Hunt e Dave Thomas no livro *The Pragmatic Programmer* (O Programador Pragmático), de 1999: "todo conhecimento deve ter uma representação única, sem ambiguidade e oficial dentro de um sistema". O código que se repete ganhou, de brincadeira, o apelido contrário: **WET**, "molhado", que costuma ser lido como *write everything twice*, "escreva tudo duas vezes", ou *we enjoy typing*, "a gente adora digitar".

Ver a aula [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|Dividir para conquistar: funções que usam funções]] e o verbete [[glossario/dividir-para-conquistar|dividir para conquistar]].

## De onde vem a palavra

Em inglês, *dry* quer dizer "seco", e daí o trocadilho com *wet*, "molhado".

*Repetir* vem do latim *repetere*, "voltar a; recomeçar, repetir", de *re-* ("de novo") + *petere*, "dirigir-se a, buscar, pedir". O *petere* deu o nosso **pedir**. Repetir é ir buscar de novo o que já foi buscado.

Fontes: Wikipedia: [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) · Wiktionary: [repetō](https://en.wiktionary.org/wiki/repeto), [petō](https://en.wiktionary.org/wiki/peto)
