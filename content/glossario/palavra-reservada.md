---
title: Palavra reservada
---

> [!abstract] Definição
> **Uma palavra que a linguagem guardou para si e que, por isso, não pode ser usada como nome de variável.** Em JavaScript, `if`, `const`, `true` e `false` são algumas delas.

```js
let if = 5;     // SyntaxError: Unexpected token 'if'
const true = 1; // SyntaxError: Unexpected token 'true'
let If = 5;     // funciona: com maiúscula, é outra palavra
```

Cada palavra reservada tem um papel fixo na linguagem: `if` abre uma [[glossario/condicional|condicional]], `const` [[glossario/declaracao|declara]] uma constante, e `true` e `false` são os dois valores [[glossario/booleano|booleanos]]. Outras vêm mais adiante: `else`, `switch`, `while`, `for`, `function`, `return`.

Nem todo nome conhecido é reservado. `console` e `log` são nomes que o navegador ou o Node deixam prontos, e não fazem parte da linguagem. Em inglês, fala-se em *reserved word* e também em *keyword*, "palavra-chave".

Ver a aula [[programacao/logica-de-programacao/modulo-3/01-tomando-decisoes-com-if|Tomando decisões com if]] e a lista completa no MDN.

## De onde vem a palavra

*Reservar* vem do latim *reservāre*:

| Parte | Latim | Sentido |
|---|---|---|
| *re-* | *re-* | de volta, para trás |
| *-servar* | *servāre* | guardar, conservar, vigiar |

Reservar é **guardar à parte**, para um uso só, como uma mesa reservada num restaurante: está vazia, mas não é para qualquer um. A palavra reservada está no idioma, mas só a linguagem pode usá-la.

O mesmo *servāre* está em **conservar**, **preservar** e **observar**. Este último vem do sentido de "vigiar, prestar atenção".

Fontes: MDN: [Lexical grammar: reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words) · Wiktionary: [reservō](https://en.wiktionary.org/wiki/reservo), [servō](https://en.wiktionary.org/wiki/servo)
