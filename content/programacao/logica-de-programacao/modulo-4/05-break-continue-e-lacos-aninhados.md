---
title: "4.5 break, continue e laços aninhados"
tags:
  - logica-de-programacao
  - javascript
  - lacos
---

Quinta e última aula do módulo 4. Até aqui, todo laço ia do começo ao fim, e só parava quando a condição dava `false`. Esta aula dá mais controle sobre o que acontece lá dentro, com dois comandos: o **`break`**, que para o laço no meio, e o **`continue`**, que pula uma volta sem parar o resto. Depois vem o **laço dentro de laço**, para repetir uma repetição inteira.

## `break`: parar no meio

Você procura a chave de casa num molho com dez chaves. Testa a primeira, a segunda, a terceira... e, quando a certa entra na fechadura, para. Não faz sentido testar as outras sete.

O **[[glossario/interromper|break]]** faz isso num laço: encerra o laço **na hora**, mesmo que a condição ainda dê `true`. Veja como achar o primeiro número de 1 a 20 que é divisível por 7:

```js
for (let i = 1; i <= 20; i++) {
  if (i % 7 === 0) {
    console.log("Achei:", i);
    break;
  }
}

console.log("fim");

// saída:
// Achei: 7
// fim
```

Do 1 ao 6, o `if` dá `false`, e nada acontece. No 7, `7 % 7` dá 0: o programa mostra `Achei: 7` e chega ao `break`. O laço acaba ali, sem passar pelo 8, pelo 9 nem por mais nenhum. A execução pula para a primeira linha depois do `}` do laço, o `console.log("fim")`.

Sem o `break`, o laço iria até o 20 e acharia dois números, o 7 e o 14. Às vezes é isso que se quer. Mas quando só o **primeiro** interessa, o `break` evita as voltas que sobrariam: aqui, o laço deu 7 voltas em vez de 20.

Repare que o `break` não encerra o **programa**. Ele só encerra o laço, e o programa segue normalmente a partir do `}`.

> [!info] É o mesmo `break` do `switch`
> Na aula 3.5, o `break` era o "pare e saia" do `switch`: pulava para depois do `}` dele. No laço, ele faz a mesma coisa. Sai do bloco em que está e segue para depois do `}`.

### `while (true)` com `break`

Na aula 4.2, apareceu a ideia de um laço que roda "para sempre" de propósito, com uma saída planejada lá dentro. A saída é o `break`:

```js
let n = 1;

while (true) {
  if (n * n > 50) {
    break;
  }
  n++;
}

console.log(n); // 8, porque 8 x 8 = 64 é o primeiro quadrado acima de 50
```

A condição `true` nunca dá `false`, então a única porta de saída é o `break`. Isso é útil quando a hora de parar é mais fácil de escrever lá dentro do que nos parênteses. O cuidado é o mesmo do laço infinito da aula 4.2: se o `if` do `break` nunca der `true`, o laço nunca termina.

## `continue`: pular uma volta

Agora você folheia uma revista e pula as páginas de propaganda. Você não fecha a revista quando aparece um anúncio: só vira a página e segue folheando.

O **[[glossario/continuar|continue]]** faz isso: pula **o resto da volta atual** e vai direto para a próxima. O laço não acaba. Veja os números de 1 a 10, sem os múltiplos de 3:

```js
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue;
  }
  console.log(i);
}

// saída: 1, 2, 4, 5, 7, 8 e 10, um em cada linha
```

| `i` | `i % 3 === 0`? | O que acontece |
|---|---|---|
| 1 | `false` | mostra 1 |
| 2 | `false` | mostra 2 |
| 3 | `true` | `continue`: pula o `console.log` e vai para a próxima volta |
| 4 | `false` | mostra 4 |
| 5 | `false` | mostra 5 |
| 6 | `true` | pula |
| ... | ... | ... |

Quando o `i` é 3, 6 ou 9, o `continue` faz o computador pular tudo o que vem abaixo dele dentro das chaves. No `for`, a próxima volta começa pelo incremento, como na [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]]: o `i++` roda, a condição é conferida, e o laço segue.

Esse mesmo resultado sai com um `if` comum, sem `continue`:

```js
for (let i = 1; i <= 10; i++) {
  if (i % 3 !== 0) {
    console.log(i);
  }
}
```

Com uma linha só dentro do laço, as duas formas são igualmente boas. O `continue` ajuda quando a volta tem muitas linhas: em vez de pôr todas dentro de um `if`, você descarta logo no começo os casos que não interessam, e o resto do código fica sem recuo extra.

### A armadilha do `continue` no `while`

No `for`, o incremento está nos parênteses, então ele roda mesmo depois de um `continue`. No `while`, a mudança fica dentro das chaves, e o `continue` pode pular por cima dela:

```js
// NÃO RODE: este laço nunca termina
let i = 0;

while (i < 5) {
  if (i === 2) {
    continue;
  }
  console.log(i);
  i++;
}
```

Quando o `i` chega a 2, o `continue` volta para a condição **antes** do `i++`. O `i` continua valendo 2, o `continue` acontece de novo, e assim para sempre. É o "esquecer a mudança" da aula 4.2, só que disfarçado. A saída é mudar a variável **antes** de qualquer `continue`:

```js
let i = 0;

while (i < 5) {
  i++;
  if (i === 3) {
    continue;
  }
  console.log(i);
}

// saída: 1, 2, 4 e 5
```

### `break` ou `continue`?

| | `break` | `continue` |
|---|---|---|
| O que faz | encerra o laço inteiro | pula só o resto desta volta |
| Para onde vai | a linha depois do `}` do laço | a próxima volta (no `for`, passando pelo incremento) |
| No dia a dia | achou a chave, guarda o molho | pula a propaganda, continua folheando |

## Laço dentro de laço

Um laço pode ter outro laço dentro do seu bloco. Isso se chama **[[glossario/laco-aninhado|laço aninhado]]** (em inglês, *nested loop*). Serve quando é preciso repetir uma repetição inteira: uma tabuada para cada número, uma linha de quadradinhos para cada linha de uma grade.

```js
for (let tabuada = 1; tabuada <= 3; tabuada++) {
  console.log("Tabuada do", tabuada);

  for (let vez = 1; vez <= 3; vez++) {
    console.log(tabuada, "x", vez, "=", tabuada * vez);
  }
}
```

A saída tem 12 linhas: 3 títulos e 9 contas.

```
Tabuada do 1
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
Tabuada do 2
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
Tabuada do 3
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
```

### A ordem das voltas

A regra é: **para cada volta do laço de fora, o laço de dentro roda inteiro, do começo ao fim.** O de fora só dá o próximo passo quando o de dentro termina.

| Volta de fora | `tabuada` | O laço de dentro... |
|---|---|---|
| 1ª | 1 | começa do zero: `vez` vale 1, 2 e 3 |
| 2ª | 2 | começa do zero de novo: `vez` vale 1, 2 e 3 |
| 3ª | 3 | começa do zero mais uma vez: `vez` vale 1, 2 e 3 |

Repare que o `let vez = 1` roda de novo em cada volta de fora. É por isso que a `vez` recomeça do 1: a inicialização do `for` de dentro é uma linha do bloco do `for` de fora.

Pense num relógio digital. Para cada hora, os minutos passam por todos os valores, de 00 a 59. Só quando chegam ao fim é que a hora avança, e os minutos recomeçam do 00. As horas são o laço de fora, e os minutos, o de dentro:

```js
let minutosNoDia = 0;

for (let hora = 0; hora < 24; hora++) {
  for (let minuto = 0; minuto < 60; minuto++) {
    minutosNoDia++;
  }
}

console.log(minutosNoDia); // 1440, que é 24 x 60
```

O `minutosNoDia` é um [[glossario/contador|contador]], a técnica da [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], contando quantas vezes o bloco de dentro rodou.

### Um nome para cada laço

Cada laço precisa da sua própria variável de controle. Os nomes costumam ser `i` e `j`, como se viu na aula 4.1, ou nomes que dizem o que contam, como `tabuada` e `vez`, ou `linha` e `coluna`.

Se os dois laços usarem `let i`, o JavaScript aceita, mas lá dentro o `i` passa a ser só o do laço de dentro. O `i` de fora fica escondido, e não dá para usá-lo no bloco de dentro. Com nomes diferentes, os dois ficam à vista.

### Desenhando uma grade

Dois laços servem para montar linhas e colunas. Com o acumulador de texto da aula 4.4, dá para desenhar um retângulo de 3 linhas e 5 colunas:

```js
for (let linha = 1; linha <= 3; linha++) {
  let texto = "";

  for (let coluna = 1; coluna <= 5; coluna++) {
    texto = texto + "*";
  }

  console.log(texto);
}

// saída:
// *****
// *****
// *****
```

O laço de dentro junta 5 asteriscos no `texto`, e o de fora mostra esse texto e passa para a próxima linha.

Repare onde está o `let texto = ""`: **dentro** do laço de fora. Na aula 4.4, criar o acumulador dentro do laço era um erro, porque zerava o total a cada volta. Aqui, zerar é justamente o que se quer: cada linha começa vazia. A regra da receita continua valendo, mas o "antes do laço" é antes do laço que **junta**, o de dentro.

Trocando o `5` por `linha`, o laço de dentro passa a dar um número diferente de voltas em cada linha: 1 na primeira, 2 na segunda, 3 na terceira.

```js
for (let linha = 1; linha <= 3; linha++) {
  let texto = "";

  for (let coluna = 1; coluna <= linha; coluna++) {
    texto = texto + "*";
  }

  console.log(texto);
}

// saída:
// *
// **
// ***
```

## O custo: multiplica, não soma

Se o laço de fora dá `n` voltas e o de dentro dá `m`, o bloco de dentro roda `n × m` vezes. **Multiplica**, porque o de dentro roda inteiro para cada volta do de fora.

| Voltas de fora | Voltas de dentro | Total de voltas do bloco de dentro |
|---|---|---|
| 3 | 3 | 9 |
| 5 | 5 | 25 |
| 10 | 10 | 100 |
| 100 | 100 | 10.000 |
| 1000 | 1000 | 1.000.000 |

Dois laços de 100 voltas, um **depois** do outro, dão 100 + 100 = 200 voltas. Os mesmos dois, um **dentro** do outro, dão 10.000. E, com um terceiro laço lá dentro, seriam 100 × 100 × 100, um milhão. É por isso que vale reparar quando um laço está dentro de outro: o número de voltas cresce bem mais rápido do que parece olhando o código.

## `break` e `continue` em laços aninhados

O `break` e o `continue` só valem para o laço **mais de dentro** em que estão. Eles não alcançam o laço de fora:

```js
for (let a = 1; a <= 3; a++) {
  for (let b = 1; b <= 3; b++) {
    if (b === 2) {
      break;
    }
    console.log(a, b);
  }
}

// saída: 1 1, 2 1 e 3 1, um em cada linha
```

Em cada volta de fora, o laço de dentro mostra o `b = 1`, chega ao `b = 2` e para. Mas só ele para. O de fora segue para o próximo `a`, e o de dentro recomeça.

> [!info]- E para sair dos dois de uma vez? (clique para abrir)
> O JavaScript permite dar um nome a um laço, com um **rótulo** seguido de dois-pontos, e usar esse nome no `break`:
>
> ```js
> externo: for (let a = 1; a <= 3; a++) {
>   for (let b = 1; b <= 3; b++) {
>     if (a * b === 4) {
>       break externo;
>     }
>     console.log(a, b);
>   }
> }
>
> // saída: 1 1, 1 2, 1 3 e 2 1
> ```
>
> Quando `a * b` dá 4, no `a = 2` e `b = 2`, o `break externo` encerra o laço chamado `externo`, e com ele o de dentro. Funciona, mas é pouco usado. Muitas vezes, o código fica mais claro separado em funções, que são o assunto do módulo 5.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| parar o laço | `break;` | `break` |
| pular a volta | `continue;` | `continue` |
| laço aninhado | um `for` dentro das chaves do outro | um `for` recuado dentro do outro |

```python
for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(i)
```

As duas palavras são as mesmas no Python e funcionam do mesmo jeito. Lá, como sempre, sem ponto e vírgula e com o bloco marcado pelo recuo. O Python não tem rótulos: para sair de dois laços de uma vez, é preciso outro caminho.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> for (let i = 1; i <= 10; i++) {
>   if (i === 4) {
>     break;
>   }
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > `1`, `2` e `3`. Quando o `i` vira 4, o `break` encerra o laço antes do `console.log`, então o 4 não aparece.

> [!question] 2. E com `continue` no lugar do `break`?
> ```js
> for (let i = 1; i <= 10; i++) {
>   if (i === 4) {
>     continue;
>   }
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > Os números de 1 a 10, menos o 4: `1`, `2`, `3`, `5`, `6`, `7`, `8`, `9` e `10`. O `continue` só pula a volta do 4, e o laço segue.

> [!question] 3. O que aparece no console?
> Repare que o `console.log` agora vem antes do `if`:
>
> ```js
> for (let i = 1; i <= 10; i++) {
>   console.log(i);
>   if (i === 4) {
>     break;
>   }
> }
> ```
>
> > [!success]- Resposta
> > `1`, `2`, `3` e `4`. Na volta do 4, o `console.log` roda primeiro, e só depois o `break` encerra o laço.

> [!question] 4. O que aparece no console?
> ```js
> for (let i = 1; i <= 8; i++) {
>   if (i % 2 !== 0) {
>     continue;
>   }
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > `2`, `4`, `6` e `8`. Os ímpares deixam resto na divisão por 2, então o `continue` pula a volta deles. Só os pares chegam ao `console.log`.

> [!question] 5. O que aparece no console?
> ```js
> for (let i = 1; i <= 20; i++) {
>   if (i % 30 === 0) {
>     console.log("Achei:", i);
>     break;
>   }
> }
> console.log("fim");
> ```
>
> > [!success]- Resposta
> > Só `fim`. Nenhum número de 1 a 20 é divisível por 30, então o `if` nunca dá `true`, e o `break` nunca acontece. O laço vai até o fim sem achar nada.

> [!question] 6. Quanto vale o `voltas` no final?
> ```js
> let voltas = 0;
> for (let a = 1; a <= 4; a++) {
>   for (let b = 1; b <= 3; b++) {
>     voltas++;
>   }
> }
> console.log(voltas);
> ```
>
> > [!success]- Resposta
> > `12`. O laço de fora dá 4 voltas, e em cada uma o de dentro dá 3: 4 × 3 = 12.

> [!question] 7. O que aparece no console, e em que ordem?
> ```js
> for (let a = 1; a <= 2; a++) {
>   for (let b = 1; b <= 3; b++) {
>     console.log(a, b);
>   }
> }
> ```
>
> > [!success]- Resposta
> > `1 1`, `1 2`, `1 3`, `2 1`, `2 2` e `2 3`, um em cada linha. Com o `a` valendo 1, o `b` passa por 1, 2 e 3. Só depois o `a` vira 2, e o `b` recomeça do 1.

> [!question] 8. O que aparece no console?
> ```js
> for (let a = 1; a <= 3; a++) {
>   for (let b = 1; b <= 3; b++) {
>     if (b === 2) {
>       break;
>     }
>     console.log(a, b);
>   }
> }
> ```
>
> > [!success]- Resposta
> > `1 1`, `2 1` e `3 1`. O `break` só encerra o laço de dentro, o do `b`. O de fora continua, e em cada volta dele o de dentro recomeça, mostra o `b = 1` e para no 2.

> [!question] 9. Este laço termina?
> ```js
> let i = 0;
> while (i < 5) {
>   if (i === 2) {
>     continue;
>   }
>   console.log(i);
>   i++;
> }
> ```
>
> > [!success]- Resposta
> > Não. Aparecem `0` e `1`, e quando o `i` chega a 2, o `continue` pula o `i++`. O `i` fica valendo 2 para sempre. Para corrigir, o `i++` precisa vir antes do `continue`.

> [!question] 10. Escreva o código.
> Use dois laços para mostrar este desenho, com 4 linhas:
>
> ```
> *
> **
> ***
> ****
> ```
>
> > [!success]- Resposta
> > O laço de fora conta as linhas, e o de dentro junta tantos asteriscos quanto o número da linha. O `texto` começa vazio em cada linha:
> >
> > ```js
> > for (let linha = 1; linha <= 4; linha++) {
> >   let texto = "";
> >   for (let coluna = 1; coluna <= linha; coluna++) {
> >     texto = texto + "*";
> >   }
> >   console.log(texto);
> > }
> > ```

## De onde vêm as palavras

- **break**: do inglês antigo *brecan*, "quebrar", do protogermânico *\*brekaną*, da raiz indo-europeia *\*bʰreg-*, "quebrar". O `break` quebra o laço. É primo do latim *frangō*, "quebrar, despedaçar", de onde vêm *fragmentum*, *fragilis* e *frāctiō*: o nosso **fragmento**, **frágil** e **fração**. A fração é um pedaço "quebrado" do inteiro.
- **[[glossario/interromper|Interromper]]**: do latim *interrumpere*, *inter-* ("entre, no meio") + *rumpere* ("quebrar, romper"). Interromper é **quebrar no meio**, o que o `break` faz com o laço. O *rumpere* deu também o nosso **romper**.
- **continue**: do francês antigo *continuer*, do latim *continuāre*, "juntar, seguir sem interrupção", de *continuus*, "contínuo, sem interrupção". Por trás está *continēre*, "manter junto, conter", de *con-* ("junto") + *tenēre* ("segurar"). Parece estranho que o comando que **pula** se chame "continue", mas o nome fala do laço, e não da volta: a volta é abandonada, e o laço **continua**.
- **[[glossario/laco-aninhado|Aninhado]]**: de *aninhar*, *a-* + *ninho* + *-ar*, pôr no ninho. *Ninho* vem do latim *nīdus*, da raiz indo-europeia *\*nisdós*, formada por *\*ni* ("embaixo") + *\*sed-* ("sentar"): o ninho é **onde o pássaro se senta**. O inglês *nest*, de *nested loop*, vem da mesma raiz, e o *\*sed-* está também no inglês *sit*, "sentar". Um laço aninhado fica acomodado dentro do outro, como no ninho.

> [!tip] Para guardar
> - `break` encerra o laço na hora. O programa segue na linha depois do `}` do laço.
> - `continue` pula o resto da volta atual e vai para a próxima. No `for`, o incremento ainda roda.
> - No `while`, um `continue` antes da mudança da variável cria um laço infinito.
> - `while (true)` só termina com um `break` lá dentro.
> - Num laço aninhado, o de dentro roda inteiro para cada volta do de fora.
> - O bloco de dentro roda `n × m` vezes: o custo multiplica, não soma.
> - `break` e `continue` só valem para o laço mais de dentro em que estão.

Fontes: MDN: [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break), [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue), [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label), [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · Wiktionary: [break](https://en.wiktionary.org/wiki/break), [frangō](https://en.wiktionary.org/wiki/frango), [frāctiō](https://en.wiktionary.org/wiki/fractio), [interromper](https://en.wiktionary.org/wiki/interromper), [interrumpō](https://en.wiktionary.org/wiki/interrumpo), [rumpō](https://en.wiktionary.org/wiki/rumpo), [continue](https://en.wiktionary.org/wiki/continue), [continuō](https://en.wiktionary.org/wiki/continuo), [continuus](https://en.wiktionary.org/wiki/continuus), [contineō](https://en.wiktionary.org/wiki/contineo), [aninhar](https://en.wiktionary.org/wiki/aninhar), [ninho](https://en.wiktionary.org/wiki/ninho), [nīdus](https://en.wiktionary.org/wiki/nidus), [nest](https://en.wiktionary.org/wiki/nest)
