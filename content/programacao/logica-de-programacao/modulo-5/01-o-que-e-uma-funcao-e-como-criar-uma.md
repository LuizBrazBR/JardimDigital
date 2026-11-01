---
title: "5.1 O que é uma função e como criar uma"
tags:
  - logica-de-programacao
  - javascript
  - funcoes
---

Primeira aula do módulo 5, o das funções. Até aqui, o curso ensinou a **guardar** valores (módulo 2), a **escolher** um caminho (módulo 3) e a **repetir** (módulo 4). Em todos esses programas, o código roda de cima para baixo, na ordem em que foi escrito. O `if` pula um trecho e o laço volta algumas linhas, mas tudo acontece ali, no lugar onde o código está escrito.

Esta aula traz uma peça nova: a **[[glossario/funcao|função]]**, um trecho de código com nome. Você escreve o trecho uma vez e, depois, em qualquer ponto do programa, basta escrever o nome dele para que ele rode.

## O problema: o mesmo trecho em lugares diferentes

Imagine o recibo de uma padaria, com uma linha de separação entre as partes:

```js
console.log("====================");
console.log("PADARIA DO BAIRRO");
console.log("====================");
console.log("2 pães ......... 1,50");
console.log("1 leite ........ 5,00");
console.log("====================");
console.log("Volte sempre!");
```

A linha de `=` aparece três vezes, copiada e colada. Funciona, mas tem dois problemas:

- **Mudar dá trabalho.** Se o dono da padaria quiser a linha com `-` em vez de `=`, é preciso trocar nos três lugares. Num programa maior, com a mesma linha em vinte lugares, é fácil esquecer um.
- **O laço não resolve.** O laço do módulo 4 repete um trecho várias vezes **seguidas**, no mesmo lugar. Aqui, as repetições estão espalhadas, com outras linhas no meio. Não há laço que dê conta disso.

## A ideia: escrever uma vez, usar pelo nome

Pense na letra de uma música impressa num folheto. O refrão aparece inteiro uma vez só. Nas outras vezes, o folheto traz só a palavra **"Refrão"**. Quem canta vê o aviso, canta o refrão que já está escrito lá em cima e volta para o verso seguinte.

A função é o refrão do código. Você escreve o trecho uma vez, com um nome, e nos outros lugares escreve só o nome.

## Criando uma função

Em JavaScript, uma função se cria assim:

```js
function saudar() {
  console.log("Bom dia!");
}
```

Cada parte tem um papel:

| Parte | No exemplo | Para que serve |
|---|---|---|
| a palavra `function` | `function` | avisa que aqui começa uma função. É uma [[glossario/palavra-reservada\|palavra reservada]], como o `if` e o `for` |
| o nome | `saudar` | é por ele que você vai usar a função depois |
| os parênteses | `()` | é onde entram as entradas da função. Aqui estão vazios: as entradas ficam para a aula 5.2 |
| o corpo | `{ ... }` | é o [[glossario/bloco\|bloco]] com o que a função faz quando roda |

Criar uma função assim se chama **declarar** a função, a mesma palavra usada para criar uma variável com `let` (a [[glossario/declaracao|declaração]]). Também se diz **definir** a função.

### Como escolher o nome

O nome de uma função segue as mesmas regras do nome de variável, da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]: sem espaços, sem começar com número e, por costume, em [[glossario/camel-case|camelCase]], como `mostrarLinha`. E maiúscula conta: `mostrarLinha` e `mostrarlinha` são dois nomes diferentes.

Há um costume a mais. Uma variável **guarda** alguma coisa, então o nome dela costuma ser um substantivo: `idade`, `total`. Uma função **faz** alguma coisa, então o nome dela costuma ser um verbo: `saudar`, `mostrarLinha`, `calcularTotal`. Quem lê o código já sabe, pelo verbo, o que vai acontecer.

## Definir não é executar

Rode este programa:

```js
function saudar() {
  console.log("Bom dia!");
}
```

Não aparece nada no console, e o código está certo. **Definir** uma função não roda o que está dentro dela. Só deixa o trecho guardado, com um nome, esperando a hora de ser usado.

É como salvar um contato no celular. Você salva "Padaria" na agenda, com o número, e nada acontece: o telefone da padaria não toca. Ele só toca quando você abre o contato e **liga**.

Para rodar o corpo da função, é preciso **[[glossario/chamada|chamar]]** a função: escrever o nome dela seguido de parênteses.

```js
function saudar() {
  console.log("Bom dia!");
}

saudar();

// saída: Bom dia!
```

O `saudar();` é a **chamada**. Em inglês, aliás, o mesmo verbo serve para as duas coisas: *call* é "ligar" para alguém e também "chamar" uma função.

Uma função pode ser chamada quantas vezes você quiser. Cada chamada roda o corpo inteiro de novo:

```js
saudar();
saudar();
saudar();

// saída: Bom dia!, três vezes
```

E uma função que nunca é chamada nunca roda. O trecho fica no programa, como um contato salvo para o qual ninguém liga.

### Para onde o programa vai na chamada

Quando o programa chega a uma chamada, ele **sai** da linha onde está, **entra** no corpo da função, roda tudo o que está lá e depois **volta** para a linha seguinte à chamada.

```js
function saudar() {
  console.log("Bom dia!");
}

console.log("antes");
saudar();
console.log("depois");

// saída:
// antes
// Bom dia!
// depois
```

Passo a passo:

| Passo | O programa está em | O que acontece |
|---|---|---|
| 1 | `function saudar() {...}` | guarda a função com o nome `saudar`. Não mostra nada |
| 2 | `console.log("antes")` | mostra `antes` |
| 3 | `saudar();` | sai dessa linha e entra no corpo do `saudar` |
| 4 | `console.log("Bom dia!")`, dentro da função | mostra `Bom dia!`. O corpo acabou, então o programa volta |
| 5 | `console.log("depois")` | segue da linha depois da chamada e mostra `depois` |

É o "Refrão" do folheto: você vai até o refrão, canta, e volta para o verso seguinte.

### Os parênteses são a chamada

Na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]], os parênteses do `console.log` eram o dedo apertando o botão do controle remoto. Na sua função, é igual: sem os parênteses, nada roda.

```js
saudar;   // só cita o nome: não mostra nada e não dá erro
saudar(); // chama a função: mostra Bom dia!
```

O `saudar;` sem parênteses não dá erro, e por isso o engano é difícil de notar: o programa roda, só que a função, não.

Já um nome escrito errado dá erro, o mesmo de uma variável que não existe:

```js
function mostrarLinha() {
  console.log("====================");
}

mostrarlinha(); // ReferenceError: mostrarlinha is not defined
```

Com o `l` minúsculo, `mostrarlinha` é outro nome, e esse nunca foi criado.

## O recibo com uma função

De volta à padaria. Com uma função, a linha de `=` fica escrita num lugar só:

```js
function mostrarLinha() {
  console.log("====================");
}

mostrarLinha();
console.log("PADARIA DO BAIRRO");
mostrarLinha();
console.log("2 pães ......... 1,50");
console.log("1 leite ........ 5,00");
mostrarLinha();
console.log("Volte sempre!");
```

A saída é igual à de antes:

```
====================
PADARIA DO BAIRRO
====================
2 pães ......... 1,50
1 leite ........ 5,00
====================
Volte sempre!
```

A diferença aparece na hora de mudar. Para trocar os `=` por `-`, basta mexer numa linha, a de dentro da função, e as três linhas do recibo mudam juntas. Não tem como esquecer uma, porque só existe uma.

O código também fica mais fácil de ler. `mostrarLinha()` diz **o que** acontece ali, e quem lê não precisa contar sinais de igual para entender que é uma linha de separação.

## Dentro do corpo, cabe de tudo

O corpo de uma função é um bloco, como os do `if` e do `for`. Ali cabe qualquer coisa que você já sabe escrever: variáveis, `if`, laços, e quantas linhas forem necessárias.

```js
function contagemRegressiva() {
  for (let i = 3; i >= 1; i--) {
    console.log(i);
  }
  console.log("Já!");
}

contagemRegressiva();

// saída:
// 3
// 2
// 1
// Já!
```

O contrário também vale: uma chamada pode ficar dentro de um laço ou de um `if`. Aqui, o laço chama a função duas vezes, e cada chamada roda a contagem inteira:

```js
for (let rodada = 1; rodada <= 2; rodada++) {
  console.log("Rodada", rodada);
  contagemRegressiva();
}

// saída:
// Rodada 1
// 3
// 2
// 1
// Já!
// Rodada 2
// 3
// 2
// 1
// Já!
```

Lembra o [[glossario/laco-aninhado|laço aninhado]] da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]]: o laço que está na função roda inteiro em cada volta do laço de fora. A diferença é que o laço de dentro agora tem nome e mora em outro lugar do código.

## Você já usava uma função

Desde a aula 1.5, você escreve `console.log("...")`. O `console.log` é uma função, só que pronta: veio com o navegador ou o Node, e não foi você quem escreveu. Os parênteses depois do `log` fazem a chamada, como no `saudar()`.

A diferença está no que vai entre os parênteses. No `console.log`, vai o texto a mostrar, o **argumento**, que a aula 1.5 chamou de entrada do `log`. No `saudar`, não vai nada, e por isso ele mostra sempre o mesmo `Bom dia!`. Dar entradas às suas funções, para que façam algo diferente a cada chamada, é o assunto da aula 5.2.

> [!info]- E se a chamada vier antes da função? (clique para abrir)
> Em JavaScript, isto funciona:
>
> ```js
> avisar();
>
> function avisar() {
>   console.log("aviso");
> }
>
> // saída: aviso
> ```
>
> Antes de rodar a primeira linha, o JavaScript passa pelo arquivo inteiro e já guarda as funções criadas com `function`. Por isso a chamada encontra a função, mesmo que ela esteja mais abaixo. Em inglês, isso se chama *hoisting*, "içamento", como se as funções fossem puxadas para o topo do arquivo.
>
> Mesmo assim, o costume é definir primeiro e chamar depois: quem lê o código de cima para baixo encontra a função antes de vê-la em uso. E nem toda linguagem aceita a ordem invertida. No Python, chamar antes de definir dá erro.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| criar | `function saudar() { ... }` | `def saudar():` e o corpo recuado embaixo |
| chamar | `saudar();` | `saudar()` |
| chamar antes de criar | funciona | `NameError: name 'saudar' is not defined` |

```python
def saudar():
    print("Bom dia!")

saudar()
saudar()
```

No Python, a palavra é `def`, de *define*, "definir". O corpo não tem chaves: é marcado pelo recuo, como nos `if` e nos laços. A chamada é igual nas duas linguagens: o nome seguido de parênteses.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> function despedir() {
>   console.log("Tchau!");
> }
> ```
>
> > [!success]- Resposta
> > Nada. A função foi definida, mas ninguém a chamou. Sem uma chamada, o corpo nunca roda.

> [!question] 2. O que aparece no console?
> ```js
> function despedir() {
>   console.log("Tchau!");
> }
>
> despedir();
> despedir();
> ```
>
> > [!success]- Resposta
> > `Tchau!` duas vezes, uma por chamada.

> [!question] 3. Em que ordem aparecem as letras?
> ```js
> function meio() {
>   console.log("B");
> }
>
> console.log("A");
> meio();
> console.log("C");
> ```
>
> > [!success]- Resposta
> > `A`, `B` e `C`. A definição da função não mostra nada. Depois, o programa mostra `A`, entra na função na chamada, mostra `B`, volta e mostra `C`.

> [!question] 4. Em que ordem aparecem as letras?
> ```js
> function meio() {
>   console.log("B");
>   console.log("C");
> }
>
> console.log("A");
> meio();
> console.log("D");
> meio();
> ```
>
> > [!success]- Resposta
> > `A`, `B`, `C`, `D`, `B` e `C`. Cada chamada roda o corpo inteiro, as duas linhas. A primeira chamada vem entre o `A` e o `D`, e a segunda, depois do `D`.

> [!question] 5. O que aparece no console?
> ```js
> function saudar() {
>   console.log("Bom dia!");
> }
>
> saudar;
> ```
>
> > [!success]- Resposta
> > Nada, e sem erro. Sem os parênteses, o `saudar;` só cita o nome da função, mas não a chama.

> [!question] 6. Por que este código dá erro?
> ```js
> function mostrarTitulo() {
>   console.log("Minha lista");
> }
>
> mostrartitulo();
> ```
>
> > [!success]- Resposta
> > Porque maiúscula conta. A função se chama `mostrarTitulo`, com `T` maiúsculo, e a chamada usa `mostrartitulo`, com `t` minúsculo, um nome que nunca foi criado. O erro é `ReferenceError: mostrartitulo is not defined`.

> [!question] 7. Quantas vezes aparece `oi`?
> ```js
> function repetir() {
>   for (let i = 1; i <= 3; i++) {
>     console.log("oi");
>   }
> }
>
> repetir();
> repetir();
> ```
>
> > [!success]- Resposta
> > `6`. Cada chamada roda o laço inteiro, com 3 voltas. São 2 chamadas: 2 × 3 = 6.

> [!question] 8. Quantas vezes aparece `oi`?
> ```js
> function dizerOi() {
>   console.log("oi");
> }
>
> for (let i = 1; i <= 4; i++) {
>   dizerOi();
> }
> ```
>
> > [!success]- Resposta
> > `4`. O laço dá 4 voltas e chama a função uma vez em cada volta.

> [!question] 9. O que está faltando?
> ```js
> function saudar {
>   console.log("Bom dia!");
> }
> ```
>
> > [!success]- Resposta
> > Os parênteses depois do nome: `function saudar() {`. Mesmo sem entradas, eles são obrigatórios. Sem eles, o JavaScript não entende o código e dá `SyntaxError: Unexpected token '{'`.

> [!question] 10. Escreva o código.
> Reescreva este trecho com uma função, para que a linha de estrelas fique escrita num lugar só:
>
> ```js
> console.log("**********");
> console.log("Bem-vindo!");
> console.log("**********");
> console.log("Escolha uma opção");
> console.log("**********");
> ```
>
> > [!success]- Resposta
> > ```js
> > function mostrarEstrelas() {
> >   console.log("**********");
> > }
> >
> > mostrarEstrelas();
> > console.log("Bem-vindo!");
> > mostrarEstrelas();
> > console.log("Escolha uma opção");
> > mostrarEstrelas();
> > ```
> >
> > O nome pode ser outro, desde que diga o que a função faz. A saída é a mesma do trecho original.

## De onde vêm as palavras

- **[[glossario/funcao|Função]]**: do latim *functiō*, "cumprimento, execução" de uma tarefa, de *fungor*, "cumprir, executar, desempenhar". Uma função é um trecho que **cumpre uma tarefa**, o mesmo sentido de "a função do goleiro". Do *fungor* vem também *dēfungor*, "terminar de cumprir", que passou a querer dizer "morrer": *vītā dēfūnctus*, "aquele que terminou a vida", deu o nosso **defunto**. Na matemática, a palavra entrou com Leibniz, numa carta de 1673, e da matemática chegou à programação.
- **[[glossario/chamada|Chamar]]**: do latim *clāmāre*, "gritar, clamar", que no latim medieval ganhou também o sentido de "chamar pelo nome". Chamar uma função é isso: dizer o nome dela para que ela venha fazer o seu trabalho. Da mesma família são **clamar**, **clamor**, **exclamar**, **proclamar** e **reclamar**. O inglês *call* vem de outra raiz, germânica, também com o sentido de "gritar, chamar".
- **Definir**: do latim *dēfīnīre*, "pôr limites, demarcar", de *dē-* + *fīnīre*, "limitar, terminar", que vem de *fīnis*, "fim, limite, fronteira". Definir é **traçar as bordas** de uma coisa: onde ela começa e onde termina. Na função, as chaves fazem esse papel. O *fīnis* é também o nosso **fim**, e o **infinito** do [[glossario/laco-infinito|laço infinito]] é o que não tem fim.

> [!tip] Para guardar
> - Uma função é um trecho de código com nome: escrito uma vez, usado quantas vezes for preciso.
> - Ela se cria com `function`, o nome, os parênteses e o corpo entre chaves.
> - Definir a função não roda nada. Só a chamada, o nome seguido de `()`, roda o corpo.
> - Na chamada, o programa entra na função, roda o corpo inteiro e volta para a linha seguinte.
> - Sem os parênteses, a função não roda, e nenhum erro avisa.
> - Para mudar o que a função faz, basta mexer num lugar, e todas as chamadas mudam juntas.
> - O nome segue as regras de variável e costuma ser um verbo: `saudar`, `mostrarLinha`.

Fontes: MDN: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) · Wikipedia: [History of the function concept](https://en.wikipedia.org/wiki/History_of_the_function_concept) · Wiktionary: [função](https://en.wiktionary.org/wiki/fun%C3%A7%C3%A3o), [functiō](https://en.wiktionary.org/wiki/functio), [fungor](https://en.wiktionary.org/wiki/fungor), [dēfungor](https://en.wiktionary.org/wiki/defungor), [defunto](https://en.wiktionary.org/wiki/defunto), [chamar](https://en.wiktionary.org/wiki/chamar), [clāmō](https://en.wiktionary.org/wiki/clamo), [call](https://en.wiktionary.org/wiki/call), [definir](https://en.wiktionary.org/wiki/definir), [dēfīniō](https://en.wiktionary.org/wiki/definio), [fīnis](https://en.wiktionary.org/wiki/finis)
