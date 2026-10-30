---
title: "2.4 Comparações: = x === e os sinais de comparação"
aliases:
  - programacao/logica-de-programacao/08-comparacoes
tags:
  - logica-de-programacao
  - javascript
  - operadores
---

Quarta aula do módulo 2. Na [[programacao/logica-de-programacao/modulo-2/03-operadores-aritmeticos|aula anterior]], os operadores faziam contas e devolviam números. Agora entram os que fazem **perguntas** e devolvem `true` ou `false`: os operadores de **[[glossario/comparacao|comparação]]**.

O booleano já tinha aparecido assim na [[programacao/logica-de-programacao/modulo-2/02-tipos-de-dados|aula 2.2]]: toda comparação devolve um [[glossario/booleano|booleano]]. Uma comparação é uma conta como outra qualquer, só que o resultado é uma resposta de sim ou não. Assim como `2 + 3` vira `5`, `5 > 3` vira `true`.

## Os seis sinais

| Operador | No papel | Pergunta | Exemplo | Resultado |
|---|---|---|---|---|
| `===` | = | é igual a? | `5 === 5` | `true` |
| `!==` | ≠ | é diferente de? | `5 !== 3` | `true` |
| `>` | > | é maior que? | `5 > 3` | `true` |
| `<` | < | é menor que? | `5 < 3` | `false` |
| `>=` | ≥ | é maior ou igual a? | `5 >= 5` | `true` |
| `<=` | ≤ | é menor ou igual a? | `5 <= 4` | `false` |

Como o `×` e o `÷` da aula passada, o `≠`, o `≥` e o `≤` não existem no teclado. Por isso, viraram dois sinais juntos. O `!` quer dizer "não": `!==` é "não é igual".

> [!warning] O igual vem por último
> É `>=`, `<=` e `!==`, na ordem em que se fala: "maior **ou igual**". Invertido, não funciona:
> - `5 =< 3` dá `SyntaxError: Invalid left-hand side in assignment`. O JavaScript leu o `=` primeiro e achou que era uma atribuição.
> - `5 => 3` dá `SyntaxError: Malformed arrow function parameter list`. O `=>` existe, mas é outra coisa, bem mais avançada.

### Maior, ou maior ou igual?

`5 >= 5` dá `true`, mas `5 > 5` dá `false`. O `>=` inclui o próprio número, e o `>` não. Na vida real, essa diferença decide quem fica de fora:

```js
const idade = 18;
console.log(idade > 18);  // false → quem acabou de fazer 18 ficou de fora
console.log(idade >= 18); // true  → "a partir de 18 anos"
```

"Maior de idade" quer dizer 18 anos **ou mais**, então a pergunta certa é `idade >= 18`. Errar a fronteira é um dos erros de lógica mais comuns: o programa roda, mas trata errado justamente quem está no limite.

## Esquerda e direita: quem pergunta?

A comparação se lê como uma frase, da esquerda para a direita:

```js
const idadeAna = 25;
const idadeBruno = 30;

console.log(idadeAna > idadeBruno); // false → "a idade da Ana é maior que a do Bruno?"
```

O lado esquerdo é o assunto da pergunta, e o lado direito é com quem ele está sendo comparado. Mas ninguém pergunta para ninguém: o JavaScript olha os dois lados, responde, e a comparação inteira vira a resposta.

**Nos sinais de maior e menor, a ordem muda a resposta.** `5 > 3` dá `true`, e `3 > 5` dá `false`. Trocar os lados de lugar obriga a virar o sinal: `idade >= 18` e `18 <= idade` fazem a mesma pergunta.

**No `===` e no `!==`, a ordem não importa.** "A Ana tem a mesma idade do Bruno?" e "o Bruno tem a mesma idade da Ana?" são a mesma pergunta. `5 === 3` e `3 === 5` dão os dois `false`.

> [!example] A boca do jacaré
> O truque da escola continua valendo: o `>` e o `<` são uma boca de jacaré, que sempre abre para o maior. Em `5 > 3`, a boca abre para o 5. Se a boca estiver aberta para o lado maior, a resposta é `true`.

## `=` e `===`: mandar e perguntar

O mesmo sinal de igual aparece de três jeitos, e cada um faz uma coisa:

| Sinal | Nome | O que faz | Lê-se |
|---|---|---|---|
| `=` | [[glossario/atribuicao\|atribuição]] | guarda um valor numa variável | "idade **recebe** 18" |
| `===` | igualdade estrita | pergunta se os dois lados são iguais, em valor e em tipo | "idade **é igual a** 18?" |
| `==` | igualdade solta | pergunta, mas antes converte um dos lados | evite |

A diferença é a de "feche a porta" para "a porta está fechada?". O `=` dá uma **ordem**. O `===` faz uma **pergunta**.

### Por que o engano é perigoso

Trocar `===` por `=` nem sempre dá erro. Muitas vezes o programa roda e faz outra coisa:

```js
let idade = 30;
console.log(idade = 18); // 18 → não perguntou nada: guardou 18 e mostrou o valor guardado
console.log(idade);      // 18 → os 30 se perderam
```

A intenção era perguntar "a idade é 18?". O que aconteceu foi a idade virar 18.

Com `const`, o mesmo engano dá `TypeError: Assignment to constant variable.`, e o erro aparece na hora em vez de passar despercebido. É mais um motivo para preferir `const`, como na [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]].

### Por que evitar o `==`

O `==` tenta "ajudar": quando os tipos são diferentes, converte um dos lados antes de comparar. Por isso `"5" == 5` dá `true`. Só que as regras dessa conversão são cheias de surpresas:

| Comparação | Com `==` | Com `===` |
|---|---|---|
| `"5"` e `5` | `true` | `false` |
| `0` e `""` (texto vazio) | `true` | `false` |
| `0` e `"0"` | `true` | `false` |
| `""` e `"0"` | `false` | `false` |
| `false` e `"0"` | `true` | `false` |

Repare nas três do meio. Com `==`, o 0 é igual ao texto vazio, e o 0 é igual ao `"0"`, mas o texto vazio **não** é igual ao `"0"`. Na matemática, se A é igual a B e A é igual a C, então B é igual a C. No `==`, nem isso vale.

O `===` não converte nada: tipos diferentes já dão `false`. É uma regra só, fácil de prever. O mesmo vale para o par `!=` e `!==`: prefira o `!==`.

> [!tip] Quando o número chega como texto
> Lembra que tudo o que se digita num formulário chega como texto? Se alguém digitar 5, chega `"5"`, e `"5" === 5` dá `false`. A saída não é trocar para `==`, e sim converter antes, com o `Number()` da aula 2.2: `Number("5") === 5` dá `true`.

> [!info]- De onde vem a confusão entre `=` e `===` (clique para abrir)
> - **1557**: o galês Robert Recorde inventa o sinal `=`, num livro de álgebra. Para não escrever "é igual a" toda hora, desenhou duas linhas paralelas do mesmo tamanho, porque, segundo ele, não existem duas coisas mais iguais do que essas.
> - **1957**: o FORTRAN, uma das primeiras linguagens de programação, usa o `=` para atribuição: `X = X + 2`. O sinal de "é igual" passa a querer dizer "recebe".
> - **1958 a 1960**: o ALGOL faz o contrário. Mantém o `=` para comparar e cria o `:=` para atribuir. O Pascal e outras linguagens seguiram essa linha.
> - **Fim dos anos 1960**: a linguagem B, a mesma que deu o `%` para o resto, fica com o `=` para atribuir e cria o `==` para comparar. O C copiou, e o JavaScript herdou do C.
> - O `==` do JavaScript convertia os tipos, e daí vieram as surpresas. O `===` foi a forma de comparar sem conversão.

## Juntando com a aula passada: par ou ímpar

Na aula 2.3, o `%` dava `0` ou `1`, e a decisão ficava de cabeça. Agora o código responde sozinho:

```js
const numero = 7;
console.log(numero % 2 === 0); // false → não é par
console.log(numero % 2 !== 0); // true  → é ímpar
```

As contas são feitas antes das comparações: o JavaScript calcula `7 % 2`, que dá `1`, e só depois pergunta `1 === 0`.

A ordem completa fica assim: **primeiro as contas, depois as comparações, e por último a atribuição**. Por isso esta linha funciona:

```js
const idade = 16;
const podeVotar = idade >= 16;
console.log(podeVotar); // true
```

O JavaScript compara primeiro (`16 >= 16` dá `true`) e só então guarda o `true` em `podeVotar`.

> [!tip] Booleano tem nome de pergunta
> Variáveis que guardam `true` ou `false` costumam ter nome de pergunta de sim ou não: `podeVotar`, `ehPar`, `temDesconto`. Em código escrito em inglês: `canVote`, `isEven`, `hasDiscount`. Lendo o nome, já se sabe que a resposta é sim ou não.

## Comparando textos

O `===` também compara textos, e maiúscula conta, como em todo o JavaScript:

```js
console.log("Ana" === "Ana"); // true
console.log("Ana" === "ana"); // false
```

O `<` e o `>` também funcionam com textos e comparam em ordem alfabética: `"abacate" < "banana"` dá `true`. Mas há duas pegadinhas:

- **Maiúsculas vêm antes de todas as minúsculas.** `"Zebra" < "abacate"` dá `true`.
- **Números em texto são comparados letra por letra.** `"10" < "9"` dá `true`, porque o primeiro caractere, `"1"`, vem antes do `"9"`, como "abacate" vem antes de "banana". Com números de verdade, `10 < 9` dá `false`. É mais um caso em que `"10"` não é `10`.

## Lógica ou JavaScript?

Comparar é lógica pura, e toda linguagem compara. O que muda é o símbolo, e justamente o do "igual" é o que mais varia:

| A ideia | JavaScript | Python | Pseudocódigo | Planilha (Excel) |
|---|---|---|---|---|
| guardar um valor | `x = 5` | `x = 5` | `x <- 5` | (escreve-se na célula) |
| é igual? | `x === 5` | `x == 5` | `x = 5` | `=A1=5` |
| é diferente? | `x !== 5` | `x != 5` | `x <> 5` | `=A1<>5` |
| é maior ou igual? | `x >= 5` | `x >= 5` | `x >= 5` | `=A1>=5` |

- No pseudocódigo, a atribuição é uma seta, e o `=` fica livre para comparar, como na matemática. A confusão entre mandar e perguntar praticamente não existe ali.
- O `==` do Python não converte tipos: `"5" == 5` dá `False`. Ele se comporta como o `===` do JavaScript.
- Na planilha, o primeiro `=` só avisa que começa uma fórmula, e o segundo compara. O resultado aparece como VERDADEIRO ou FALSO.

> [!info]- Esquisitices (clique para abrir)
> - **`NaN === NaN` dá `false`.** O `NaN` não é igual a nada, nem a ele mesmo. Para saber se um valor é `NaN`, existe o `Number.isNaN()`.
> - **`0.1 + 0.2 === 0.3` dá `false`.** É a conta da aula 2.2, que dá `0.30000000000000004`. Comparar números com casas decimais com `===` pode falhar por causa dessa diferença minúscula.
> - **`true == 1` dá `true`**, porque o `==` transforma o `true` em `1`. Com `===`, dá `false`.

## Treine

> [!question] O que aparece no console?
> 1. `console.log(10 >= 10);`
> 2. `console.log(10 > 10);`
> 3. `console.log("7" === 7);`
> 4. `console.log("7" == 7);`
> 5. `console.log(15 % 2 === 0);`
> 6. `console.log("Brasil" === "brasil");`
> 7. `let x = 3; console.log(x = 5);`
> 8. Um filme é para maiores de 14 anos: quem tem 14 já pode ver. Escreva a comparação que guarda em `podeAssistir` se a pessoa pode entrar.

> [!success]- Respostas (clique para abrir)
> 1. `true`: o `>=` inclui o próprio número.
> 2. `false`: 10 não é maior que 10.
> 3. `false`: um lado é texto e o outro é número, e o `===` não converte.
> 4. `true`: o `==` converte o `"7"` em 7 antes de comparar. Funciona, mas é justamente o que se evita.
> 5. `false`: `15 % 2` dá `1`, e `1 === 0` é falso. 15 é ímpar.
> 6. `false`: maiúscula conta.
> 7. `5`: isso é uma atribuição, não uma comparação. O `x` passou a valer 5.
> 8. `const podeAssistir = idade >= 14;`. Com `idade > 14`, quem tem exatamente 14 ficaria de fora.

## De onde vêm as palavras

- **[[glossario/comparacao|Comparar]]**: do latim *comparāre*, de *compar*, "igual a outro", que é *com-* ("junto") + *pār* ("igual"). Comparar é pôr duas coisas lado a lado para ver se são **pares**. É o mesmo *pār* do número **par**, e *ímpar* vem do latim *impār*, "desigual".
- **[[glossario/sinal-de-igual|Igual]]**: do latim *aequālis*, de *aequus*, "igual, plano, nivelado". Da mesma família vêm **equação**, **equilíbrio** e **equinócio**, a data em que o dia e a noite duram quase o mesmo tanto.
- **Diferente**: do latim *differre*, de *dis-* ("para longe, separado") + *ferre* ("levar"). Coisas diferentes são as que foram **levadas cada uma para um lado**. O *ferre* também está em **transferir**, **preferir** e **conferir**.
- **Maior** e **menor**: já eram palavras de comparação em latim, *māior* e *minor*, as formas comparativas de "grande" e "pequeno". Primos curiosos: **mestre** vem de *magister*, de *magis*, "mais", e **ministro** vem de *minister*, de *minus*, "menos". O mestre era o que mandava. O ministro era o ajudante.

> [!tip] Para guardar
> - Comparações devolvem `true` ou `false`: `===`, `!==`, `>`, `<`, `>=` e `<=`.
> - Lê-se da esquerda para a direita. Nos sinais de maior e menor, trocar os lados obriga a virar o sinal. No `===`, tanto faz a ordem.
> - `=` manda guardar. `===` pergunta se é igual. Trocar um pelo outro pode não dar erro e mudar o valor da variável sem ninguém perceber.
> - Use `===` e `!==`, e deixe de lado o `==` e o `!=`. Se um número chegar como texto, converta com `Number()` antes de comparar.
> - Contas primeiro, comparações depois, atribuição por último: `const ehPar = numero % 2 === 0;`

Fontes: MDN: [Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality), [Equality (==)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) · Wikipedia: [Equals sign](https://en.wikipedia.org/wiki/Equals_sign) · Wiktionary: [compare](https://en.wiktionary.org/wiki/compare), [aequus](https://en.wiktionary.org/wiki/aequus), [differō](https://en.wiktionary.org/wiki/differo), [magister](https://en.wiktionary.org/wiki/magister), [minister](https://en.wiktionary.org/wiki/minister)
