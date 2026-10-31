---
title: "2.1 Variáveis: guardando valores com let e const"
aliases:
  - programacao/logica-de-programacao/05-variaveis-let-e-const
tags:
  - logica-de-programacao
  - javascript
  - variaveis
---

Primeira aula do módulo 2. Na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula anterior]], `console.log(Olá)` dava `ReferenceError: Olá is not defined`: o JavaScript procurava um nome que ninguém tinha criado. Esta aula ensina a criar esses nomes, que se chamam **[[glossario/variavel|variáveis]]**.

## Variável: um nome para um valor

A aula usa a imagem de uma caixa com etiqueta. A etiqueta é o **nome**, e o que está dentro é o **valor**. Quando o programa precisa do valor, procura pelo nome.

```js
let nome = "Ana";
console.log(nome); // Ana
```

Sem variáveis, o programa não teria onde guardar nada: nem o nome de quem está usando, nem o resultado de uma conta.

Com isso, a regra das aspas da aula passada fica completa:

```js
console.log("nome"); // nome  → com aspas: texto, repetido como está
console.log(nome);   // Ana   → sem aspas: o valor guardado na variável
```

Sem aspas, o JavaScript procura uma variável com aquele nome. Se achar, usa o valor dela. Se não achar, dá `ReferenceError`.

## A linha por partes

```js
let idade = 20;
```

| Pedaço | Nome técnico | O que faz |
|---|---|---|
| `let` | declaração | avisa: "vou criar um nome novo" |
| `idade` | nome da variável | a etiqueta |
| `=` | atribuição | guarda o valor da direita no nome da esquerda |
| `20` | valor | o conteúdo |
| `;` | fim da instrução | o mesmo da aula passada |

Criar a variável é **[[glossario/declaracao|declarar]]**. Guardar um valor nela é **[[glossario/atribuicao|atribuir]]**. Em `let idade = 20;`, as duas coisas acontecem na mesma linha.

### O `=` não é "igual"

Na matemática, `=` afirma que os dois lados são iguais. Na programação, `=` é uma **ordem**: "calcule o lado direito e guarde o resultado no esquerdo". Lê-se "idade **recebe** 20".

A diferença aparece numa linha que, na matemática, seria absurda:

```js
let idade = 20;
idade = idade + 1;
console.log(idade); // 21
```

O JavaScript resolve primeiro o lado direito: pega o valor atual de `idade` (20) e soma 1. Depois guarda o resultado (21) de volta em `idade`. Por isso muitos livros de lógica escrevem a atribuição com uma seta, que mostra a direção: `idade ← idade + 1`.

## `let` e `const`

> [!example] Quadro branco e placa de bronze
> - `let` é um **quadro branco** com um título em cima: dá para apagar e escrever outra coisa quantas vezes quiser.
> - `const` é uma **placa de bronze**: depois de gravada, fica como está.

### `let`: o valor pode mudar

Para trocar o valor, escreve-se só o nome, **sem** repetir o `let`:

```js
let idade = 20;
idade = 21;          // apaga o quadro e escreve de novo
console.log(idade);  // 21
```

Repetir o `let` seria pedir um segundo quadro com o mesmo título, e o JavaScript não deixa:

```js
let idade = 20;
let idade = 21;
// SyntaxError: Identifier 'idade' has already been declared
```

A mensagem diz "o identificador 'idade' já foi declarado". *Identificador* é o nome técnico do nome da variável.

### `const`: o valor fica fixo

Escreve-se igual ao `let`, mas depois de criada, a variável não aceita outro valor:

```js
const DIAS_DA_SEMANA = 7;
DIAS_DA_SEMANA = 8;
// TypeError: Assignment to constant variable.
```

A mensagem quer dizer "atribuição a uma variável constante". É o terceiro tipo de erro do curso, o **TypeError**: o código está bem escrito (não é `SyntaxError`) e o nome existe (não é `ReferenceError`), mas a operação não é permitida para aquela variável. Esse erro só aparece quando a linha roda, então as linhas anteriores executam normalmente.

Como a placa já nasce gravada, o `const` exige o valor na hora de criar:

```js
const total;
// SyntaxError: Missing initializer in const declaration
```

Ou seja, "falta o valor inicial na declaração com const".

### Por que preferir `const`

A aula recomenda usar `const` sempre que der. Há dois motivos:

- **Quem lê o código fica tranquilo.** Ao ver `const`, você sabe que aquele valor é o mesmo do começo ao fim. Não precisa procurar se alguém o trocou no meio do caminho.
- **O JavaScript vigia por você.** Se o valor for trocado sem querer, o programa para com um erro, em vez de seguir com o valor errado.

Na prática: comece com `const`. Se depois precisar mudar o valor, troque para `let`.

## Variável vazia

Com `let`, dá para criar a variável sem valor e guardar algo depois:

```js
let resposta;
console.log(resposta); // undefined
resposta = 42;
console.log(resposta); // 42
```

É o mesmo `undefined` da aula passada, o jeito de o JavaScript dizer "nada". A caixa existe, mas está vazia.

## Dando nomes

O JavaScript tem regras para os nomes, e os programadores têm costumes. A aula usa `nomeDoAluno` e `PI` sem explicar por que estão escritos desse jeito. Os dois são costumes:

| Nome | Funciona? | Por quê |
|---|---|---|
| `nomeDoAluno` | sim | o costume do JavaScript: palavras coladas, e cada uma, a partir da segunda, começa com maiúscula. Chama-se [[glossario/camel-case\|camelCase]] |
| `PI`, `DIAS_DA_SEMANA` | sim | tudo maiúsculo, com `_` entre as palavras: o costume para valores fixos conhecidos de antemão |
| `x` | sim, mas não diz nada | daqui a uma semana, nem você vai lembrar o que `x` guarda |
| `média` | sim, mas evite | acento funciona, mas o costume é escrever nomes sem acento |
| `nome do aluno` | não | o espaço quebra o nome em pedaços, e dá erro de sintaxe |
| `nome-do-aluno` | não | o JavaScript lê o `-` como sinal de menos |
| `1nome` | não | nome não pode começar com número |
| `let`, `const` | não | são palavras reservadas da própria linguagem |

Nem todo `const` vai em maiúsculas. Em `const media = (nota1 + nota2) / 2`, o valor não muda depois de calculado, mas é calculado durante o programa, então o nome fica em camelCase. As maiúsculas ficam para valores que já se sabem antes de o programa rodar, como o PI ou os dias da semana.

E maiúsculas contam: `idade` e `Idade` são duas variáveis diferentes.

## Juntando tudo: a média, agora de verdade

Na [[programacao/logica-de-programacao/modulo-1/03-entrada-processamento-saida|aula 1.3]], o programa da média de duas notas ficou só em comentários. Agora ele roda:

```js
// Entrada
const nota1 = 7;
const nota2 = 9;

// Processamento
const media = (nota1 + nota2) / 2;

// Saída
console.log("Média:", media);
// Média: 8
```

Cada parte do ciclo entrada, processamento e saída tem o seu lugar, e as variáveis levam os valores de uma parte para a outra. Por enquanto, a "entrada" está escrita no próprio código. Receber um valor digitado por alguém é outro assunto.

Dois detalhes:

- Os parênteses em `(nota1 + nota2) / 2` fazem a soma acontecer antes da divisão, como na matemática. Sem eles, o JavaScript divide primeiro: `7 + 9 / 2` dá `11.5`.
- O JavaScript usa **ponto** nos números decimais, e não vírgula: `3.14`, `11.5`. A vírgula separa argumentos, como no `console.log("Média:", media)`.

> [!info] E o `var`?
> Em código antigo e em muitos tutoriais aparece uma terceira palavra: `var idade = 20;`. É o jeito antigo de criar variáveis, de antes de 2015, quando `let` e `const` entraram na linguagem. O `var` tem comportamentos que confundem até gente experiente, e hoje a recomendação é usar só `let` e `const`.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let a = 5;
> a = a + 2;
> console.log(a);
> ```
>
> > [!success]- Resposta
> > `7`: `a` recebe o valor atual dele (5) mais 2.

> [!question] 2. O que aparece no console?
> ```js
> let cor = "azul";
> console.log("cor");
> ```
>
> > [!success]- Resposta
> > `cor`: com aspas, é texto. Para ver `azul`, seria `console.log(cor)`.

> [!question] 3. O que aparece no console?
> ```js
> let x = 10;
> let y = x;
> x = 20;
> console.log(y);
> ```
>
> > [!success]- Resposta
> > `10`: pegadinha. `y = x` copia o valor que `x` tinha **naquele momento**. Mudar `x` depois não mexe em `y`.

> [!question] 4. O que aparece no console?
> ```js
> let nome;
> console.log(nome);
> ```
>
> > [!success]- Resposta
> > `undefined`: a variável existe, mas está vazia.

> [!question] 5. O que aparece no console?
> ```js
> const dias = 7;
> dias = 8;
> ```
>
> > [!success]- Resposta
> > Erro: `TypeError: Assignment to constant variable.`, porque `dias` foi criada com `const`.

## Isso ainda é lógica de programação?

Sim. Lógica de programação é o raciocínio por trás dos programas, e esse raciocínio usa algumas peças que existem em quase toda linguagem: guardar valores, decidir entre caminhos, repetir passos. A variável é a primeira delas. O curso usa JavaScript para essas peças rodarem de verdade, em vez de ficarem no papel.

O jeito de separar as duas coisas: **a ideia é lógica, a escrita é JavaScript**. Compare com Python, outra linguagem muito usada:

| A ideia (lógica) | JavaScript | Python |
|---|---|---|
| guardar um valor com um nome | `let idade = 20;` | `idade = 20` |
| trocar o valor | `idade = 21;` | `idade = 21` |
| valor que não deve mudar | `const PI = 3.14;` | `PI = 3.14` |
| mostrar na tela | `console.log(idade);` | `print(idade)` |

A coluna da esquerda vale para qualquer linguagem. As outras mudam de uma linguagem para outra. O Python nem tem `const`: o nome em maiúsculas avisa que o valor não deve mudar, mas a linguagem não impede a troca. Quem aprende a ideia, quando muda de linguagem, só precisa aprender a escrita nova.

## De onde vêm as palavras

- **[[glossario/variavel|Variável]]**: do latim *variābilis*, de *variāre*, "mudar", que vem de *varius*, "variado". **O que pode mudar.**
- **[[glossario/constante|Constante]]**: do latim *cōnstāns*, de *cōnstāre*: *con-* (junto) + *stāre* (estar de pé). **O que fica firme.** *Estar* vem do mesmo *stāre*, e *custar* vem do próprio *cōnstāre*.
- **[[glossario/atribuicao|Atribuição]]**: do latim *attribuere*: *ad-* (para) + *tribuere* (dar, repartir). **Dar algo a alguém**: o valor é dado ao nome.
- **[[glossario/declaracao|Declarar]]**: do latim *dēclārāre*, de *clārus*, "claro". **Deixar claro**: declarar uma variável é avisar o JavaScript de que aquele nome existe.
- **let**: em inglês, "deixar, permitir". É o "seja" da matemática: os livros em inglês escrevem *let x = 5*, "seja x igual a 5". Na programação, a palavra é antiga: o BASIC, de 1964, já tinha o comando `LET`.
- **const**: abreviação do inglês *constant*, "constante".
- **[[glossario/camel-case|camelCase]]**: as maiúsculas no meio do nome lembram as corcovas de um camelo.

> [!tip] Para guardar
> - Variável é um nome para um valor. Sem aspas, o JavaScript procura a variável; com aspas, é texto.
> - `=` não é "igual", é "recebe": o valor da direita vai para o nome da esquerda.
> - `let` pode mudar, `const` não. Na dúvida, comece com `const`.
> - Nomes claros, em camelCase: `nomeDoAluno`, e não `x`.

Fontes: MDN: [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [guia de estilo de JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript) · Wikipedia: [Dartmouth BASIC](https://en.wikipedia.org/wiki/Dartmouth_BASIC)
