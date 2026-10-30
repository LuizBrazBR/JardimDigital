---
title: "2.3 Operadores aritméticos e o resto com %"
aliases:
  - programacao/logica-de-programacao/07-operadores-aritmeticos
tags:
  - logica-de-programacao
  - javascript
  - operadores
---

Terceira aula do módulo 2. Na [[programacao/logica-de-programacao/modulo-2/02-tipos-de-dados|aula anterior]], o `+` apareceu fazendo dois trabalhos, somar e juntar texto. Agora entram todos os **[[glossario/operador|operadores]] [[glossario/aritmetica|aritméticos]]**, os que fazem conta, e um deles quase ninguém conhece da escola: o `%`, que dá o **[[glossario/resto|resto]]** de uma divisão.

## Os cinco operadores

| Operador | No papel | Faz | Exemplo | Resultado |
|---|---|---|---|---|
| `+` | + | soma | `10 + 3` | `13` |
| `-` | − | subtração | `10 - 3` | `7` |
| `*` | × | multiplicação | `10 * 3` | `30` |
| `/` | ÷ | divisão | `9 / 2` | `4.5` |
| `%` | (não tem) | resto da divisão | `10 % 3` | `1` |

Por que `*` e `/`, e não `×` e `÷`? Porque o teclado não tem `×` nem `÷`. E usar a letra `x` como "vezes" confundiria com uma variável chamada `x`. Então ficaram os símbolos que o teclado tinha: o asterisco e a barra.

Repare no `9 / 2`: dá `4.5`, com a parte quebrada. Em JavaScript, a divisão nunca joga fora as casas decimais.

## O resto, na conta armada

Lembra da conta de dividir com chave, da escola?

```
 50 | 12
-48   4    ← quociente: quantas vezes o 12 coube no 50
---
  2        ← resto: o que sobrou
```

São 50 ovos em caixas de 12: dá para fechar 4 caixas, e sobram 2 ovos soltos. O `/` responde "quanto dá a divisão" (`50 / 12` dá `4.166...`). O `%` responde só **quanto sobrou**:

```js
console.log(50 % 12); // 2
console.log(10 % 3);  // 1   → 3 cabe 3 vezes no 10 (dá 9) e sobra 1
console.log(20 % 4);  // 0   → divisão exata, não sobra nada
console.log(3 % 10);  // 3   → o 10 não cabe nenhuma vez no 3, então sobra tudo
```

A regra de sempre vale: **dividendo = divisor × quociente + resto**. No primeiro exemplo, 50 = 12 × 4 + 2.

E um detalhe que explica quase todos os usos do `%`: **o resto é sempre menor que o divisor**. Qualquer número `% 2` dá 0 ou 1. Qualquer número `% 7` dá algo de 0 a 6. Não importa o tamanho do número, o resultado fica preso nessa faixa.

> [!warning] `%` não é porcentagem
> Em programação, `50 % 10` **não** é "50 por cento de 10", nem "10% de 50". É o resto de 50 dividido por 10, que dá `0`.
>
> Para calcular 10% de 50, faz-se a conta: `50 * 10 / 100` ou `50 * 0.1`, que dão `5`.

## Para que serve o `%`, afinal?

Na aula, o único uso que aparece é descobrir se um número é par ou ímpar. Parece pouco, mas o `%` aparece em muito lugar.

### 1. Par, ímpar e "divisível por"

Número par dividido por 2 não deixa resto. Ímpar deixa 1:

```js
console.log(8 % 2); // 0 → par
console.log(7 % 2); // 1 → ímpar
```

A mesma ideia vale para qualquer divisor. Resto 0 quer dizer "divisível": `15 % 3` dá `0`, então 15 é múltiplo de 3. É assim que um programa faz algo **a cada N vezes**. Por exemplo, um cartão fidelidade em que a cada 10 cafés o próximo é grátis: o café é grátis quando o número da compra `% 10` dá `0`.

### 2. Contas que dão a volta: relógio e calendário

O relógio não passa de 23h. Depois das 23h vem 0h, e a conta recomeça. O `% 24` faz exatamente isso:

```js
// São 22h. Que horas serão daqui a 5 horas?
console.log((22 + 5) % 24); // 3 → 3 da manhã, e não "27 horas"
```

O mesmo vale para os dias da semana. Numerando de 0 (domingo) a 6 (sábado):

```js
// Hoje é sábado (6). Que dia será daqui a 10 dias?
console.log((6 + 10) % 7); // 2 → terça-feira
```

Como o resto de `% 7` fica sempre entre 0 e 6, o resultado sempre cai num dia que existe. Dá para somar 10 dias ou 1000: a conta dá a volta sozinha.

Revezamentos funcionam igual. Se três pessoas se revezam na louça, o número do dia `% 3` diz de quem é a vez: 0, 1, 2, 0, 1, 2...

### 3. Quebrar em unidades: segundos em minutos

Um vídeo tem 200 segundos. Quanto é isso em minutos e segundos?

```js
const total = 200;
const segundos = total % 60;                 // 20 → o que sobra depois de tirar os minutos inteiros
const minutos = (total - segundos) / 60;     // 3  → tira a sobra, e a divisão fica exata
console.log(`${minutos}:${segundos}`);       // 3:20
```

O `%` pega a sobra, e a sobra é justamente a parte menor: os segundos que não chegam a fechar um minuto. A mesma conta transforma minutos em horas, centavos em reais, dias em semanas.

### 4. O último algarismo

Dividir por 10 deixa de resto o último algarismo. Dividir por 100 deixa os dois últimos:

```js
console.log(1234 % 10);  // 4
console.log(1234 % 100); // 34
```

> [!example]- O `%` escondido no seu CPF (clique para abrir)
> Os dois últimos números do CPF, depois do traço, não são sorteados: são **dígitos verificadores**, calculados a partir dos nove primeiros com o resto da divisão por 11. Usando o exemplo da Wikipédia, o CPF 123.456.789:
>
> 1. Multiplica-se cada algarismo por 10, 9, 8, ..., 2 e somam-se os resultados: 1×10 + 2×9 + 3×8 + ... + 9×2 = **210**.
> 2. Calcula-se o resto: `210 % 11` dá **1**.
> 3. Se o resto der 0 ou 1, o dígito é 0. Se der outro número, o dígito é 11 menos o resto. Aqui deu 1, então o primeiro dígito é **0**.
>
> O segundo dígito sai da mesma conta, incluindo o dígito que acabou de ser calculado. Ele dá **9**, e o CPF completo fica 123.456.789-09.
>
> Para que isso serve: quando alguém digita um número errado num formulário, a conta quase sempre deixa de bater, e o sistema avisa na hora, sem precisar consultar a Receita. Códigos de barras de boletos usam truques parecidos.

## A ordem das contas

Como na escola: primeiro multiplicação e divisão, depois soma e subtração. O `%` entra no grupo da multiplicação. O nome técnico dessa regra é **[[glossario/precedencia|precedência]]**.

| Ordem | O quê | Exemplo | Como o JavaScript resolve |
|---|---|---|---|
| 1º | o que está entre parênteses | `(2 + 3) * 4` | `5 * 4` → `20` |
| 2º | `*`, `/` e `%` | `2 + 3 * 4` | `2 + 12` → `14` |
| 3º | `+` e `-` | `2 + 10 % 3` | `2 + 1` → `3` |

Quando dois operadores do mesmo grupo aparecem juntos, a conta anda **da esquerda para a direita**, como na leitura. Foi o que aconteceu com o `1 + 2 + "3"` da aula passada:

```js
console.log(10 / 2 * 5); // 25 → primeiro 10 / 2 = 5, depois 5 * 5. Não é 10 / 10.
console.log(10 - 4 - 3); // 3  → primeiro 10 - 4 = 6, depois 6 - 3
```

### O erro clássico: a média

Lembra da média das [[programacao/logica-de-programacao/modulo-1/03-entrada-processamento-saida|aulas 1.3]] e [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|2.1]]? Ela tinha parênteses por um motivo:

```js
const nota1 = 8;
const nota2 = 6;

console.log(nota1 + nota2 / 2);   // 11 → errado: dividiu só o 6
console.log((nota1 + nota2) / 2); // 7  → certo
```

Sem parênteses, o JavaScript divide primeiro e soma depois. O programa roda sem erro nenhum e entrega uma média 11, de notas que vão até 10. É um erro de **lógica**: o computador fez exatamente o que foi escrito, só que o escrito não era o que se queria.

> [!tip] Parêntese a mais não faz mal
> `2 + (3 * 4)` dá o mesmo que `2 + 3 * 4`, mas deixa a intenção clara para quem lê. Na dúvida, use.

## Um operador que a aula não mostrou: a potência

Para "elevado a", o JavaScript usa dois asteriscos:

```js
console.log(2 ** 3);  // 8  → 2 × 2 × 2
console.log(10 ** 2); // 100
```

A potência vem antes até da multiplicação: `2 * 3 ** 2` dá `18`, porque primeiro faz 3² = 9.

> [!warning] `^` não é potência em JavaScript
> Em calculadora e em planilha, `2^3` é 2 elevado a 3. Em JavaScript, `2 ^ 3` dá `1`, sem erro nenhum. O `^` existe, mas faz outra coisa, uma operação com os bits do número, assunto bem mais avançado.

## Lógica ou JavaScript?

Somar, dividir e pegar o resto são ideias da lógica, que existem em qualquer linguagem. O que muda é o símbolo:

| A ideia | JavaScript | Python | Pseudocódigo | Planilha (Excel) |
|---|---|---|---|---|
| resto | `10 % 3` | `10 % 3` | `10 mod 3` | `=MOD(10;3)` |
| potência | `2 ** 3` | `2 ** 3` | `2 ^ 3` | `=2^3` |
| divisão sem a parte quebrada | `Math.floor(9 / 2)` | `9 // 2` | `9 div 2` | `=QUOCIENTE(9;2)` |

O pseudocódigo muda um pouco de livro para livro, mas `mod` e `div` são as formas mais comuns.

Repare que o `^` é potência na planilha, mas não em JavaScript. E que o Python tem um operador próprio para a divisão que joga fora as casas decimais (`9 // 2` dá `4`). O JavaScript não tem: é preciso o `Math.floor()`, uma ferramenta que arredonda para baixo.

> [!info]- Esquisitices das contas (clique para abrir)
> - **Dividir por zero não dá erro.** `10 / 0` dá `Infinity` (infinito), e `0 / 0` dá `NaN`. O resto por zero, `10 % 0`, também dá `NaN`. Em muitas linguagens, isso derrubaria o programa. Em JavaScript, o programa segue com um valor estranho.
> - **Resto de número negativo é negativo.** `-7 % 2` dá `-1`, e não `1`. Em JavaScript, o resto fica com o sinal do número que está sendo dividido. Por isso, para testar se um número é ímpar, é mais seguro perguntar "o resto é diferente de 0?" do que "o resto é 1?". No Python, `-7 % 2` dá `1`: aqui as linguagens discordam.
> - **O resto funciona com decimais.** `7.5 % 2` dá `1.5`: o 2 cabe três vezes no 7,5 e sobra 1,5.
> - **O problema da aula passada continua.** `0.1 * 3` dá `0.30000000000000004`, pelo mesmo motivo do `0.1 + 0.2`.

## Treine

> [!question] O que aparece no console?
> 1. `console.log(17 % 5);`
> 2. `console.log(4 % 10);`
> 3. `console.log(50 % 10);`
> 4. `console.log(10 - 2 * 3);`
> 5. `console.log((10 - 2) * 3);`
> 6. `console.log(12 / 4 * 3);`
> 7. Hoje é quarta-feira (3, contando de 0 = domingo). Que dia será daqui a 100 dias? Escreva a conta.
> 8. Um filme tem 135 minutos. Escreva as contas que dão as horas e os minutos.

> [!success]- Respostas (clique para abrir)
> 1. `2`: o 5 cabe 3 vezes no 17 (dá 15), e sobram 2.
> 2. `4`: o 10 não cabe nenhuma vez no 4, então sobra tudo.
> 3. `0`: 50 dividido por 10 é exato. Não é porcentagem.
> 4. `4`: a multiplicação vem primeiro (2 × 3 = 6), depois 10 − 6.
> 5. `24`: o parêntese força a subtração primeiro (8), depois 8 × 3.
> 6. `9`: mesmo grupo, então da esquerda para a direita: 12 / 4 = 3, depois 3 × 3.
> 7. `(3 + 100) % 7` dá `5`: sexta-feira.
> 8. Minutos: `135 % 60` dá `15`. Horas: `(135 - 135 % 60) / 60` dá `2`. O filme tem 2h15.

## De onde vêm as palavras

- **[[glossario/aritmetica|Aritmética]]**: do grego *arithmētikḗ (tékhnē)*, "a arte de contar", de *arithmós*, "número". O mesmo *arithmós* está no fim de **logaritmo**.
- **[[glossario/resto|Resto]]**: de *restar*, do latim *restāre*, "ficar para trás, sobrar", de *re-* + *stāre*, "estar de pé, ficar". É o mesmo *stāre* de [[glossario/constante|constante]]. O resto é **o que fica** quando a divisão acaba.
- **[[glossario/resto|Módulo]]**: outro nome do `%`, por isso o *mod* do pseudocódigo. Do latim *modulus*, "pequena medida". Foi Gauss, em 1801, quem organizou a matemática dos restos, hoje chamada aritmética modular.
- **[[glossario/precedencia|Precedência]]**: de *preceder*, do latim *praecēdere*, "ir na frente". A multiplicação tem precedência porque vai na frente da soma.
- **Asterisco**: do grego *asterískos*, "estrelinha", de *astḗr*, "estrela". Da mesma família de **astro**, **astronomia** e **desastre**, que vem do italiano *disastro*, de *dis-* + *astro*: um acontecimento sob uma estrela ruim.
- **O sinal %**: vem do italiano *per cento*, "por cem". Copistas medievais abreviavam como "p cento", depois como um "pc" com um laço, e o desenho foi se simplificando até virar `%`. O uso como resto veio da linguagem B, de Ken Thompson, antecessora do C, e o JavaScript herdou.

> [!tip] Para guardar
> - `+`, `-`, `*` (vezes) e `/` (dividido) fazem as contas de sempre. `**` é potência.
> - `%` dá o **resto** da divisão: `10 % 3` dá `1`. Não tem nada a ver com porcentagem.
> - O resto é sempre menor que o divisor. Por isso o `%` serve para par ou ímpar, para fazer algo "a cada N vezes", para contas que dão a volta (horas, dias da semana) e para quebrar unidades (segundos em minutos).
> - Primeiro `*`, `/` e `%`, depois `+` e `-`. Empate: da esquerda para a direita. Na dúvida, parênteses.

Fontes: MDN: [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder), [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence) · Wikipedia: [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic), [Percent sign](https://en.wikipedia.org/wiki/Percent_sign), [Cadastro de Pessoas Físicas](https://pt.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas) · Wiktionary: [asterisk](https://en.wiktionary.org/wiki/asterisk), [disaster](https://en.wiktionary.org/wiki/disaster)
