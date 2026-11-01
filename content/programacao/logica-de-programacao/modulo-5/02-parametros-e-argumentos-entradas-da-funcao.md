---
title: "5.2 Parâmetros e argumentos: entradas da função"
tags:
  - logica-de-programacao
  - javascript
  - funcoes
---

Segunda aula do módulo 5. Na [[programacao/logica-de-programacao/modulo-5/01-o-que-e-uma-funcao-e-como-criar-uma|aula 5.1]], a função `saudar` mostrava sempre a mesma coisa: `Bom dia!`. E se você quiser cumprimentar cada pessoa pelo nome? Com o que se viu até agora, seria preciso uma função para cada uma:

```js
function saudarAna() {
  console.log("Bom dia, Ana!");
}

function saudarCarlos() {
  console.log("Bom dia, Carlos!");
}
```

É o copiar e colar que a função veio evitar. As duas funções são iguais, menos o nome da pessoa. Esse pedaço que muda deveria ser uma **[[glossario/entrada|entrada]]** da função: uma informação que chega de fora, a cada chamada.

## A ficha com um campo em branco

Pense numa ficha de inscrição em papel. Ela traz um campo assim:

```
Nome: ______________________
```

O campo tem duas partes: um **rótulo**, "Nome", que diz o que vai ali, e um **espaço em branco**, que cada pessoa preenche. A ficha é a mesma para todo mundo. O que muda é o que cada um escreve no espaço.

Uma função com entrada funciona assim:

- O **[[glossario/parametro|parâmetro]]** é o rótulo. Você o escreve uma vez, ao **definir** a função.
- O **[[glossario/argumento|argumento]]** é o que se escreve no espaço. Ele vem a cada **chamada**, e pode ser diferente em cada uma.

## O parâmetro: o nome da entrada, na definição

```js
function saudar(nome) {
  console.log("Bom dia, " + nome + "!");
}
```

Os parênteses, que na aula 5.1 ficavam vazios, agora têm uma palavra: `nome`. Esse é o parâmetro. É um nome que você inventa, com as mesmas regras de nome de variável, e que dentro do corpo funciona como uma variável. Aqui, ele aparece no meio do texto, [[glossario/string|concatenado]] com `+`, como na aula 1.5.

Repare que, quando você escreve a função, ainda não se sabe quanto o `nome` vale. É o espaço em branco da ficha. O valor só chega na hora da chamada.

O parâmetro também só existe **dentro** da função. Fora dela, o nome `nome` não significa nada:

```js
saudar("Ana");
console.log(nome); // ReferenceError: nome is not defined
```

Por que é assim é o assunto da aula 5.4, sobre o escopo.

## O argumento: o valor, na chamada

Na chamada, o valor vai entre os parênteses:

```js
saudar("Ana");
saudar("Carlos");
saudar("Mariana");

// saída:
// Bom dia, Ana!
// Bom dia, Carlos!
// Bom dia, Mariana!
```

O `"Ana"`, o `"Carlos"` e o `"Mariana"` são os argumentos. É uma função só, e cada chamada mostra uma frase diferente, porque cada uma entrega um argumento diferente.

### O que acontece na chamada

Na chamada `saudar("Ana")`, antes de rodar o corpo, o JavaScript guarda o argumento no parâmetro. É como se o corpo ganhasse uma linha a mais no começo:

```js
// saudar("Ana") roda como se fosse:
let nome = "Ana";
console.log("Bom dia, " + nome + "!");
```

E cada chamada começa do zero. O `nome` da chamada anterior não fica guardado:

| Chamada | O `nome` vale | O console mostra |
|---|---|---|
| `saudar("Ana")` | `"Ana"` | `Bom dia, Ana!` |
| `saudar("Carlos")` | `"Carlos"` | `Bom dia, Carlos!` |
| `saudar("Mariana")` | `"Mariana"` | `Bom dia, Mariana!` |

## Parâmetro x argumento

Os dois nomes parecem querer dizer a mesma coisa, mas cada um tem o seu lugar:

| | Parâmetro | Argumento |
|---|---|---|
| Onde aparece | na **definição**, nos parênteses depois do nome da função | na **chamada**, nos parênteses da chamada |
| O que é | um nome, que espera um valor | o valor de verdade |
| Quantas vezes se escreve | uma vez só | uma vez em cada chamada |
| No exemplo | `nome`, em `function saudar(nome)` | `"Ana"`, em `saudar("Ana")` |
| Na ficha | o rótulo "Nome" | o que a pessoa escreve no espaço |

No dia a dia, muita gente diz "passar um parâmetro" querendo dizer argumento. Não é a palavra exata, mas é comum. Quando a diferença importa, vale a tabela: o parâmetro mora na definição, e o argumento chega na chamada.

## Mais de uma entrada

Uma função pode ter vários parâmetros, separados por vírgula. Na chamada, os argumentos vão do mesmo jeito, também separados por vírgula:

```js
function somar(a, b) {
  const resultado = a + b;
  console.log(resultado);
}

somar(2, 3);   // 5
somar(10, 20); // 30
```

A função tem dois parâmetros, `a` e `b`, e cada chamada entrega dois argumentos. Em `somar(2, 3)`, é como se o corpo começasse com `let a = 2;` e `let b = 3;`.

### A ordem importa

O JavaScript liga os argumentos aos parâmetros **pela posição**: o primeiro argumento vai para o primeiro parâmetro, o segundo para o segundo, e assim por diante. Na soma, trocar a ordem não muda nada, porque 2 + 3 e 3 + 2 dão 5. Na subtração, muda:

```js
function subtrair(a, b) {
  console.log(a - b);
}

subtrair(10, 3); // 7, porque a = 10 e b = 3
subtrair(3, 10); // -7, porque a = 3 e b = 10
```

Com texto, a troca fica ainda mais visível:

```js
function apresentar(nome, idade) {
  console.log(nome + " tem " + idade + " anos");
}

apresentar("Ana", 30); // Ana tem 30 anos
apresentar(30, "Ana"); // 30 tem Ana anos
```

O JavaScript não olha o que o argumento é. Ele não sabe que `30` tem cara de idade e `"Ana"` tem cara de nome: só vê que o `30` veio primeiro e o põe no `nome`. Aqui está a diferença para a ficha de papel. Na ficha, cada espaço tem o rótulo do lado, e ninguém escreve a idade no campo do nome. Na chamada, os argumentos vão **sem rótulo**, e só a ordem diz onde cada um entra.

## O argumento pode ser uma variável ou uma conta

O argumento não precisa ser um valor escrito ali mesmo. Pode ser uma variável:

```js
let cliente = "Bia";
saudar(cliente); // Bom dia, Bia!
```

O nome da variável de fora não precisa ser igual ao do parâmetro. A variável se chama `cliente`, e o parâmetro, `nome`. O que viaja para dentro da função é o **valor**, o `"Bia"`, e não o nome da variável. Lá dentro, só existe o `nome`.

O argumento também pode ser uma conta. O JavaScript calcula a conta primeiro, e só o resultado entra na função:

```js
let x = 4;
let y = 6;

somar(x, y);         // 10
somar(x + 1, y * 2); // 17, porque entram 5 e 12
```

## Argumento faltando, argumento sobrando

E se a chamada trouxer menos argumentos do que a função tem parâmetros? O JavaScript não reclama. O parâmetro que ficou sem argumento vale **`undefined`**, o "nada" da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]], como uma variável criada sem valor:

```js
saudar();          // Bom dia, undefined!
apresentar("Ana"); // Ana tem undefined anos
somar(2);          // NaN
```

No `somar(2)`, o `a` vale 2 e o `b` vale `undefined`. A conta `2 + undefined` dá `NaN`, o "não é um número" da aula 2.2, o mesmo que aparecia na aula 4.4 quando o acumulador ficava sem valor inicial.

E se vierem argumentos **a mais**? Também não dá erro. Os que sobram são ignorados:

```js
somar(1, 2, 3); // 3: o 1 vai para o a, o 2 para o b, e o 3 fica de fora
```

Em nenhum dos dois casos aparece uma mensagem de erro. O programa roda e mostra um resultado estranho, e cabe a você notar. Por isso, quando aparecer um `undefined` ou um `NaN` que você não esperava, vale conferir se a chamada tem todos os argumentos, e na ordem certa.

> [!info]- Um valor para quando o argumento faltar (clique para abrir)
> Dá para escolher um valor para o parâmetro usar quando a chamada não trouxer argumento. Ele vai na definição, depois de um `=`:
>
> ```js
> function saudar(nome = "visitante") {
>   console.log("Bom dia, " + nome + "!");
> }
>
> saudar("Ana"); // Bom dia, Ana!
> saudar();      // Bom dia, visitante!
> ```
>
> Esse valor se chama **valor padrão**. Ele só é usado quando falta o argumento. Quando o argumento vem, o valor padrão é deixado de lado.

## Você já passava argumentos

Desde a aula 1.5, o `"oi"` de `console.log("oi")` era um argumento. E, na aula 4.5, apareceu `console.log("Achei:", i)`: dois argumentos, separados por vírgula, como no `somar(2, 3)`. O `console.log` aceita quantos argumentos você quiser e mostra todos, com um espaço entre eles.

A diferença é que o `console.log` já veio pronto. Agora, as funções com entradas são as suas.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| definir com parâmetros | `function somar(a, b) { ... }` | `def somar(a, b):` e o corpo recuado |
| chamar com argumentos | `somar(2, 3);` | `somar(2, 3)` |
| argumento faltando | o parâmetro vale `undefined` | `TypeError: ... missing 1 required positional argument` |
| argumento sobrando | é ignorado | `TypeError: ... takes 2 positional arguments but 3 were given` |
| valor padrão | `function saudar(nome = "visitante")` | `def saudar(nome="visitante"):` |

```python
def saudar(nome):
    print("Bom dia, " + nome + "!")

saudar("Ana")   # Bom dia, Ana!
saudar()        # TypeError: saudar() missing 1 required positional argument: 'nome'
```

A ideia de parâmetro e argumento é a mesma nas duas linguagens. A diferença está no cuidado: o Python para o programa com um erro quando falta ou sobra argumento, e o JavaScript segue em frente, com `undefined` no lugar do que faltou.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Qual é o parâmetro e qual é o argumento?
> ```js
> function gritar(frase) {
>   console.log(frase + "!!!");
> }
>
> gritar("Socorro");
> ```
>
> > [!success]- Resposta
> > O parâmetro é `frase`, o nome que aparece na definição. O argumento é `"Socorro"`, o valor que vai na chamada. O console mostra `Socorro!!!`.

> [!question] 2. O que aparece no console?
> ```js
> function dobro(n) {
>   console.log(n * 2);
> }
>
> dobro(5);
> dobro(10);
> ```
>
> > [!success]- Resposta
> > `10` e `20`. Na primeira chamada, o `n` vale 5, e na segunda, 10.

> [!question] 3. O que aparece no console?
> ```js
> function subtrair(a, b) {
>   console.log(a - b);
> }
>
> subtrair(3, 10);
> ```
>
> > [!success]- Resposta
> > `-7`. O primeiro argumento vai para o primeiro parâmetro: o `a` vale 3 e o `b` vale 10. A conta é `3 - 10`.

> [!question] 4. O que aparece no console?
> ```js
> function apresentar(nome, idade) {
>   console.log(nome + " tem " + idade + " anos");
> }
>
> apresentar(25, "Leo");
> ```
>
> > [!success]- Resposta
> > `25 tem Leo anos`. Os argumentos estão na ordem trocada. O JavaScript não percebe: põe o `25` no `nome` e o `"Leo"` na `idade`, porque só olha a posição.

> [!question] 5. O que aparece no console?
> ```js
> function saudar(nome) {
>   console.log("Bom dia, " + nome + "!");
> }
>
> saudar();
> ```
>
> > [!success]- Resposta
> > `Bom dia, undefined!`. A chamada não trouxe argumento, então o `nome` ficou valendo `undefined`. Não aparece erro nenhum.

> [!question] 6. O que aparece no console?
> ```js
> function somar(a, b) {
>   console.log(a + b);
> }
>
> somar(4);
> ```
>
> > [!success]- Resposta
> > `NaN`. O `a` vale 4, mas o `b` ficou sem argumento e vale `undefined`. A conta `4 + undefined` não dá um número.

> [!question] 7. O que aparece no console?
> ```js
> function saudar(nome) {
>   console.log("Bom dia, " + nome + "!");
> }
>
> let pessoa = "Rui";
> saudar(pessoa);
> ```
>
> > [!success]- Resposta
> > `Bom dia, Rui!`. A variável se chama `pessoa`, e o parâmetro, `nome`, mas tudo bem: o que entra na função é o valor, o `"Rui"`.

> [!question] 8. O que aparece no console?
> ```js
> function somar(a, b) {
>   console.log(a + b);
> }
>
> somar("2", 3);
> ```
>
> > [!success]- Resposta
> > `23`. É a pegadinha da aula 1.5: o `"2"`, entre aspas, é texto. Quando um dos lados do `+` é texto, o JavaScript gruda em vez de somar.

> [!question] 9. O que aparece no console?
> ```js
> function repetir(texto, vezes) {
>   for (let i = 1; i <= vezes; i++) {
>     console.log(texto);
>   }
> }
>
> repetir("oi", 3);
> ```
>
> > [!success]- Resposta
> > `oi` três vezes. O `texto` vale `"oi"` e o `vezes` vale 3. O parâmetro `vezes` entra na condição do laço, então é o argumento que decide quantas voltas o laço dá.

> [!question] 10. Escreva o código.
> Na aula 5.1, a função `mostrarLinha` mostrava sempre uma linha de 20 sinais de `=`. Escreva uma `mostrarLinha(tamanho)` que mostre uma linha com a quantidade de `=` pedida na chamada. Assim, `mostrarLinha(5)` deve mostrar `=====`.
>
> > [!success]- Resposta
> > Dá para usar o acumulador de texto da aula 4.4: um laço com `tamanho` voltas, que junta um `=` a cada volta.
> >
> > ```js
> > function mostrarLinha(tamanho) {
> >   let texto = "";
> >   for (let i = 1; i <= tamanho; i++) {
> >     texto = texto + "=";
> >   }
> >   console.log(texto);
> > }
> >
> > mostrarLinha(5);  // =====
> > mostrarLinha(10); // ==========
> > ```

## De onde vêm as palavras

- **[[glossario/parametro|Parâmetro]]**: pelo francês *paramètre*, do latim moderno *parametrum*, formado com o grego *para-*, "ao lado", e *métron*, "medida". É uma **medida ao lado**. Na matemática, o parâmetro é um valor que fica fixo durante uma conta, mas pode ser trocado de uma conta para outra. Na função é igual: durante uma chamada, o `nome` vale `"Ana"`; na próxima, pode valer outra coisa. O *métron* está também em **metro**, **métrica**, **geometria** e **termômetro**.
- **[[glossario/argumento|Argumento]]**: do latim *argūmentum*, "prova, evidência", de *arguō*, "tornar claro, provar, mostrar". Muitos estudiosos ligam o *arguō* a uma raiz indo-europeia, *\*h₂erǵ-*, que quer dizer "branco, brilhante". É a mesma de *argentum*, "prata", de onde vem o nome da **Argentina**, a terra do Rio da Prata. Argumentar seria **fazer brilhar**, deixar claro. Na matemática e na astronomia, argumento é a quantidade da qual depende o cálculo de outra: é o valor de onde a função parte. Daí o sentido na programação.
- **undefined**: em inglês, "não definido", de *un-* ("não") + *defined* ("definido"). É o mesmo *definir* da aula 5.1, que vem do latim *fīnis*, "limite": o parâmetro que ficou sem argumento não teve o seu valor marcado.

> [!tip] Para guardar
> - O parâmetro é o nome da entrada, escrito nos parênteses da definição: `function saudar(nome)`.
> - O argumento é o valor de verdade, escrito nos parênteses da chamada: `saudar("Ana")`.
> - Na chamada, o argumento é guardado no parâmetro, como se o corpo começasse com `let nome = "Ana";`.
> - Com vários parâmetros, os argumentos entram pela ordem, separados por vírgula. Trocar a ordem pode trocar o resultado.
> - O argumento pode ser um valor, uma variável ou uma conta. O que entra é sempre o valor.
> - Argumento faltando vira `undefined`, e argumento sobrando é ignorado. O JavaScript não avisa nenhum dos dois.
> - A mesma função, com argumentos diferentes, dá resultados diferentes.

Fontes: MDN: [Functions: function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters), [Parameter](https://developer.mozilla.org/en-US/docs/Glossary/Parameter), [Argument](https://developer.mozilla.org/en-US/docs/Glossary/Argument), [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) · Wiktionary: [parameter](https://en.wiktionary.org/wiki/parameter), [μέτρον](https://en.wiktionary.org/wiki/%CE%BC%CE%AD%CF%84%CF%81%CE%BF%CE%BD), [παρά](https://en.wiktionary.org/wiki/%CF%80%CE%B1%CF%81%CE%AC), [argumento](https://en.wiktionary.org/wiki/argumento), [argūmentum](https://en.wiktionary.org/wiki/argumentum), [arguō](https://en.wiktionary.org/wiki/arguo), [argentum](https://en.wiktionary.org/wiki/argentum), [Argentina](https://en.wiktionary.org/wiki/Argentina), [argument](https://en.wiktionary.org/wiki/argument), [undefined](https://en.wiktionary.org/wiki/undefined)
