---
title: "2.2 Tipos de dados: número, texto e booleano"
aliases:
  - programacao/logica-de-programacao/06-tipos-de-dados
tags:
  - logica-de-programacao
  - javascript
  - tipos-de-dados
---

Segunda aula do módulo 2. Na [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula anterior]], as variáveis guardaram valores. Esta mostra que todo valor tem um **[[glossario/tipo-de-dado|tipo]]**, e o tipo decide o que dá para fazer com ele.

> [!example] No caixa do mercado
> - O preço do pão é um **número**: dá para somar com o preço do leite.
> - O nome do cliente é **texto**: somar dois nomes não faz sentido, mas dá para escrever um depois do outro.
> - "Já pagou?" só tem duas respostas: **sim ou não**.
>
> São os três tipos desta aula.

## Os três tipos básicos

| Tipo | Em JavaScript | Exemplos | Serve para |
|---|---|---|---|
| número | `number` | `25`, `19.9`, `-3` | contas, quantidades, preços |
| texto | `string` | `"Maria"`, `'oi'` | nomes, mensagens, qualquer coisa escrita |
| verdadeiro ou falso | `boolean` | `true`, `false` | respostas de sim ou não |

Em JavaScript, inteiros e números com casas decimais são o mesmo tipo: `25` e `19.9` são os dois `number`. Muitas linguagens separam os dois.

### Quem decide o tipo

Ninguém escreve o tipo. O JavaScript olha o valor e descobre sozinho:

- entre aspas (ou crase) → `string`
- `true` ou `false`, sem aspas → `boolean`
- número sem aspas → `number`

O tipo pertence ao **valor**, e não à variável. A mesma variável criada com `let` pode guardar um número e, depois, um texto:

```js
let x = 5;
console.log(typeof x); // number
x = "oi";
console.log(typeof x); // string
```

Isso dá liberdade, mas também abre espaço para confusão. O [[glossario/typescript|TypeScript]] existe justamente para prender cada variável a um tipo e avisar quando alguém mistura.

### `typeof`: perguntando o tipo

`typeof` é um **[[glossario/operador|operador]]**: uma palavra ou símbolo que faz uma operação com valores, como o `+` e o `-`. Ele recebe um valor e devolve o nome do tipo, em texto:

```js
console.log(typeof 25);      // number
console.log(typeof "Maria"); // string
console.log(typeof true);    // boolean
```

Como é um operador, e não uma ferramenta como o `console.log`, não precisa de parênteses: escreve-se `typeof idade`.

## Booleano: a resposta de uma pergunta

A aula apresenta o **[[glossario/booleano|booleano]]** como "ligado ou desligado". Mas onde ele mais aparece é como **resposta**: toda comparação devolve um booleano.

```js
console.log(10 > 5);       // true

let idade = 16;
console.log(idade >= 18);  // false  (>= quer dizer "maior ou igual")
```

É com respostas assim que um programa escolhe caminhos: "se for maior de idade, faça isto; se não, faça aquilo". Por isso o booleano, com só dois valores, é tão importante.

`true` e `false` vão sem aspas e em minúsculas. `"true"`, com aspas, é uma string. `True`, com maiúscula, o JavaScript não conhece: dá `ReferenceError`.

## "10" não é 10

`"10"` é um texto que por acaso tem dois algarismos. `10` é um número. No console, os dois aparecem iguais, mas se comportam de jeitos diferentes:

| Expressão | Aparece no console | Tipo | Por quê |
|---|---|---|---|
| `10 + 5` | `15` | number | dois números: o `+` soma |
| `"10" + 5` | `105` | string | um lado é texto: o `+` junta |
| `"5" + 3` | `53` | string | idem |
| `5 + "3"` | `53` | string | tanto faz de que lado está o texto |
| `"10" - 5` | `5` | number | o `-` só sabe fazer conta: transforma o texto em número |
| `"10" * 2` | `20` | number | o mesmo vale para `*` (vezes) e `/` (dividido) |

### Por que só o `+` engana

O `+` tem dois trabalhos: somar números e juntar textos. Quando aparece texto de um dos lados, o JavaScript escolhe juntar. O `-`, o `*` e o `/` só têm um trabalho, que é fazer conta, então tentam transformar o texto em número.

### Transformando texto em número

Números chegam como texto o tempo todo: tudo o que alguém digita num campo de formulário, por exemplo, chega como string. Para transformar, existe o `Number()`:

```js
console.log("10" + 5);          // 105
console.log(Number("10") + 5);  // 15
```

Se o texto não for um número, o resultado é `NaN`:

```js
console.log(Number("abc"));    // NaN
console.log(Number("19,90"));  // NaN  → com vírgula não funciona; tem que ser "19.90"
```

`NaN` quer dizer *Not a Number*, "não é um número". Por ironia, `typeof NaN` dá `number`.

## Juntando textos

### Concatenação, com `+`

```js
const nome = "Carlos";
const idade = 30;

console.log("Nome: " + nome + ", idade: " + idade);
// Nome: Carlos, idade: 30
```

**[[glossario/string|Concatenar]]** é colar um texto no fim do outro. O número `30` virou texto para poder ser colado.

O `+` não põe espaço nenhum: os espaços precisam estar dentro das aspas. `"Nome:" + nome` dá `Nome:Carlos`, tudo grudado.

### Template string: um texto com lacunas

A outra forma usa **crase** no lugar das aspas. Dentro dela, `${ }` abre uma lacuna onde entra o valor de uma variável:

```js
console.log(`Nome: ${nome}, idade: ${idade}`);
// Nome: Carlos, idade: 30
```

A **[[glossario/template-string|template string]]** é mais fácil de ler: a frase aparece inteira, do jeito que vai sair, em vez de picotada entre vários `+`. E dentro da lacuna cabe qualquer conta, não só um nome:

```js
console.log(`Ano que vem: ${idade + 1}`);
// Ano que vem: 31
```

> [!warning] Só funciona com crase
> Com aspas comuns, a lacuna vira texto comum: `console.log("Nome: ${nome}")` mostra `Nome: ${nome}`, letra por letra.

> [!tip] Onde fica a crase no teclado
> No teclado brasileiro (ABNT2), a crase fica na tecla do acento agudo, ao lado do P: é **Shift + ´**. Como é uma tecla de acento, ela espera a próxima letra para formar `à`. Para sair só a crase, aperte **Shift + ´** e depois **espaço**.

## Lógica ou JavaScript?

Continuando a separação da aula passada: a ideia de tipo existe em toda linguagem, e só os nomes mudam.

| A ideia | JavaScript | Python | Pseudocódigo |
|---|---|---|---|
| número inteiro | `number` | `int` | inteiro |
| número com casas decimais | `number` | `float` | real |
| texto | `string` | `str` | caractere, texto |
| verdadeiro ou falso | `boolean` | `bool` | lógico |

O JavaScript junta inteiros e decimais num tipo só, e o Python separa. Em Python, o verdadeiro e o falso se escrevem com maiúscula: `True` e `False`.

Repare no nome que o pseudocódigo dá ao verdadeiro ou falso: **lógico**. É o tipo da própria lógica.

> [!info]- Duas esquisitices do number (clique para abrir)
> - `let preco = 19.90;` e depois `console.log(preco)` mostra `19.9`. O número não guarda zeros que não mudam o valor. Para mostrar "R$ 19,90", é preciso formatar o texto, o que é assunto para outra hora.
> - `0.1 + 0.2` dá `0.30000000000000004`. O computador guarda os números em binário, e alguns decimais, como 0,1, não cabem exatos em binário, do mesmo jeito que 1/3 não cabe exato em decimal (0,333...). A diferença é minúscula, mas aparece. Não é coisa só do JavaScript: acontece em quase toda linguagem.

## Treine

> [!question] O que aparece no console?
> 1. `console.log(typeof "42");`
> 2. `console.log("7" + 3);`
> 3. `console.log("7" - 3);`
> 4. `console.log(1 + 2 + "3");`
> 5. `console.log("1" + 2 + 3);`
> 6. `const nome = "Ana"; console.log("Oi, ${nome}");`

> [!success]- Respostas (clique para abrir)
> 1. `string`: tem aspas, então é texto, mesmo parecendo número.
> 2. `73`: um lado é texto, e o `+` junta.
> 3. `4`: o `-` só faz conta, então transforma `"7"` em 7.
> 4. `33`: o JavaScript resolve da esquerda para a direita. `1 + 2` dá `3` (dois números, soma). Depois, `3 + "3"` junta e dá `"33"`.
> 5. `123`: `"1" + 2` já dá o texto `"12"`. Daí em diante tudo é junção: `"12" + 3` dá `"123"`.
> 6. `Oi, ${nome}`: com aspas comuns, a lacuna não funciona. Com crase, sairia `Oi, Ana`.

## De onde vêm as palavras

- **[[glossario/tipo-de-dado|Tipo]]**: do grego *týpos*, "marca, impressão", de *týptō*, "bater". É a marca que uma pancada deixa. Coisas com a mesma marca são do mesmo tipo. Daí também os *tipos* da imprensa e a **tipografia**.
- **[[glossario/tipo-de-dado|Dado]]**: do latim *datum*, "o que foi dado", de *dare*, "dar". Dados são as informações entregues ao programa.
- **[[glossario/booleano|Booleano]]**: como *algoritmo*, vem do nome de uma pessoa: o matemático inglês **George Boole**, que em 1854 publicou um livro fazendo contas com verdadeiro e falso.
- **[[glossario/operador|Operador]]**: do latim *operātor*, "trabalhador", de *opus*, "obra". O `+` é quem faz o trabalho com os dois valores.
- **[[glossario/template-string|Crase]]**: do grego *krâsis*, "mistura". Em português, crase é a fusão de duas vogais (*a* + *a* = *à*), e o sinal que marca essa fusão ganhou o mesmo apelido.
- **[[glossario/template-string|Template]]**: em inglês, "molde, gabarito", um modelo com espaços para preencher.

> [!tip] Para guardar
> - Todo valor tem um tipo: `number` (número), `string` (texto, entre aspas ou crase) e `boolean` (`true` ou `false`).
> - `typeof` diz o tipo de um valor.
> - Perto de um texto, o `+` junta em vez de somar: `"10" + 5` dá `"105"`. Para transformar texto em número, `Number()`.
> - Para montar frases com variáveis, a template string, com crase e `${ }`.

Fontes: MDN: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) · Wikipedia: [George Boole](https://en.wikipedia.org/wiki/George_Boole)
