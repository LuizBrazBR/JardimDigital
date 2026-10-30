---
title: Resto
---

> [!abstract] Definição
> **O que sobra quando uma divisão não é exata.** Em JavaScript, quem calcula o resto é o operador `%`: `10 % 3` dá `1`, porque o 3 cabe três vezes no 10 (dá 9) e sobra 1. Também se chama **módulo**, ou *mod*.

O resto é sempre menor que o divisor: qualquer número `% 7` dá algo de 0 a 6. Por isso o `%` serve para contas que dão a volta, como horas e dias da semana, para saber se um número é par (`n % 2` dá `0`) e para fazer algo a cada N vezes. Exemplos na aula [[programacao/logica-de-programacao/07-operadores-aritmeticos|Operadores aritméticos e o resto com %]].

> [!warning] Não é porcentagem
> `50 % 10` não é "50 por cento de 10": é o resto de 50 dividido por 10, que dá `0`.

## De onde vêm as palavras

### Resto

De *restar*, do latim *restāre*:

| Parte | Latim | Sentido |
|---|---|---|
| *re-* | *re-* | de novo, para trás |
| *-star* | *stāre* | estar de pé, ficar |

*Restāre* era "ficar para trás, continuar de pé", e daí "sobrar". O resto é **o que fica** depois que a divisão termina. É o mesmo *stāre* de [[glossario/constante|constante]], *o que fica firme*.

### Módulo

Do latim *modulus*, "pequena medida", diminutivo de *modus*, "medida, modo". Da mesma família vêm **modo** e **molde**.

Em 1801, o matemático alemão Carl Friedrich Gauss publicou as *Disquisitiones Arithmeticae* (*Investigações Aritméticas*), onde organizou a matemática dos restos. Nela, o número pelo qual se divide se chama *modulus*. Daí o nome **aritmética modular**, e daí o *mod*.

O exemplo mais famoso é o relógio: 9h mais 4 horas dá 1h, e não 13h. É uma conta "módulo 12": quando passa de 12, recomeça.

### O símbolo %

Vem do italiano *per cento*, "por cem". Copistas da Idade Média abreviavam como "p cento" e, depois, como um "pc" com um laço. Com o tempo, o desenho foi se simplificando até virar `%`.

O uso do `%` como resto começou na linguagem B, criada por Ken Thompson no fim dos anos 1960. Do B, passou para o C, e do C, para as linguagens que copiaram o jeito de escrever dele, como o [[glossario/javascript|JavaScript]].

Fontes: Wiktionary: [resto](https://en.wiktionary.org/wiki/resto), [modulus](https://en.wiktionary.org/wiki/modulus) · Wikipedia: [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic), [Percent sign](https://en.wikipedia.org/wiki/Percent_sign) · MDN: [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
