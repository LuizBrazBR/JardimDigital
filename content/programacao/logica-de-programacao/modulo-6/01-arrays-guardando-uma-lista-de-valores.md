---
title: "6.1 Arrays: guardando uma lista de valores"
tags:
  - logica-de-programacao
  - javascript
  - arrays
---

Primeira aula do módulo 6, o das coleções. Até aqui, cada valor do programa morou numa variável própria: `let nome = "Ana"`, `let idade = 20`. Uma variável, um valor.

Esta aula traz o **[[glossario/array|array]]**: um valor só que guarda vários outros, um depois do outro, numa ordem. Por ser um valor só, ele cabe numa variável só. Em português, também se diz **lista** ou **vetor**.

## O problema: uma variável para cada valor

Imagine o carrinho de uma loja com quatro produtos. Com o que você sabe até agora, cada preço precisa de uma variável:

```js
let preco1 = 10;
let preco2 = 25;
let preco3 = 8;
let preco4 = 40;

let total = preco1 + preco2 + preco3 + preco4;
console.log(total); // 83
```

Com quatro produtos, funciona. Os problemas aparecem quando o carrinho muda:

- **Não dá para saber quantos são.** Se a pessoa põe um quinto produto, é preciso criar `preco5` e mexer na conta do total. E quem escreve o programa não sabe de antemão quantos produtos cada pessoa vai comprar: pode ser 1, pode ser 30.
- **Um laço não consegue passar por eles.** O [[glossario/acumulador|acumulador]] da [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]] somaria tudo num laço, se desse para dizer "o preço número `i`". Só que, para o JavaScript, `preco1` e `preco2` são nomes tão diferentes quanto `nome` e `idade`. O número no fim é um pedaço do nome, e o laço não tem como trocá-lo a cada volta.

## A ideia: uma folha com vários itens

Pense numa lista de compras escrita num papel. É uma folha só, mas nela cabem vários itens, um por linha e numa ordem: o primeiro, o segundo, o terceiro.

O array é essa folha. Em vez de uma variável para cada valor, uma variável só, com todos os valores dentro, cada um na sua posição.

## Criando um array

Um array se escreve entre **colchetes**, com os valores separados por **vírgula**. Depois, ele vai para uma variável, como qualquer outro valor:

```js
let precos = [10, 25, 8, 40];
let frutas = ["maçã", "banana", "uva"];
```

| Parte | No exemplo | Para que serve |
|---|---|---|
| os colchetes | `[` e `]` | marcam onde o array começa e onde termina |
| os valores | `"maçã"`, `"banana"`, `"uva"` | são o que o array guarda. Cada um se chama **elemento** |
| as vírgulas | `,` | separam um elemento do outro |

Mostrado no console, o array aparece inteiro, com os colchetes:

```js
console.log(precos); // [ 10, 25, 8, 40 ]
console.log(frutas); // [ 'maçã', 'banana', 'uva' ]
```

O Node mostra os textos com aspas simples, mesmo que você tenha escrito com aspas duplas. É só o jeito de ele mostrar: como na [[programacao/logica-de-programacao/modulo-2/02-tipos-de-dados|aula 2.2]], `"uva"` e `'uva'` são o mesmo texto.

Mais duas coisas que vale saber:

- **Um array pode começar vazio:** `let carrinho = [];`. Os elementos entram depois, e como fazer isso é o assunto da [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]].
- **Dá para misturar tipos**, como em `["Ana", 20, true]`. O JavaScript aceita, mas o costume é guardar coisas do mesmo tipo num array: uma lista de preços, uma lista de nomes.

## A posição de cada elemento: o índice

Cada elemento tem um número, que diz em que posição ele está. Esse número é o **[[glossario/indice|índice]]**. E aqui está o ponto que mais confunde no começo: **o índice começa no 0**, e não no 1.

| Como se fala | Índice | Elemento |
|---|---|---|
| o 1º elemento | `0` | `"maçã"` |
| o 2º elemento | `1` | `"banana"` |
| o 3º elemento | `2` | `"uva"` |

O array `frutas` tem três elementos, e os índices dele são 0, 1 e 2. O índice 3 não existe nele.

### Por que começa no 0

Pense num prédio. O andar da entrada é o **térreo**, e o "primeiro andar" é o de cima. Em muitos elevadores, o botão do térreo é o **0**. O número do andar diz quantos andares você sobe a partir da entrada: no térreo, nenhum; no 1º andar, um; no 2º, dois.

O índice funciona igual. Ele diz **quantos passos** o elemento está depois do começo do array:

- `"maçã"` está logo no começo, a zero passos: índice 0.
- `"banana"` está um passo depois: índice 1.
- `"uva"` está dois passos depois: índice 2.

Por isso, o índice é sempre **um a menos** que a posição falada: o 3º elemento tem índice 2. Contar do 0 é o costume do JavaScript, do Python e da maior parte das linguagens que você vai encontrar.

### Lendo um elemento

Para pegar um elemento, escreva o nome do array e, colado nele, o índice entre colchetes:

```js
let frutas = ["maçã", "banana", "uva"];

console.log(frutas[0]); // maçã
console.log(frutas[1]); // banana
console.log(frutas[2]); // uva
```

`frutas[1]` se lê "frutas na posição 1", ou "o elemento de índice 1 de frutas".

Repare que os colchetes aparecem com dois papéis:

- **Sozinhos, com valores dentro**, como em `[10, 25, 8]`, eles **criam** um array.
- **Colados num nome**, como em `frutas[1]`, eles **pegam** um elemento de um array que já existe.

Um elemento pode ser usado onde você usaria uma variável: numa conta, numa comparação, num `if`.

```js
let precos = [10, 25, 8, 40];

console.log(precos[0] + precos[1]); // 35

if (precos[3] > 30) {
  console.log("produto caro"); // aparece: precos[3] vale 40
}
```

### O índice pode ser uma variável ou uma conta

Entre os colchetes pode ir qualquer coisa que dê um número: o número escrito direto, uma variável ou uma conta. O JavaScript calcula primeiro o que está entre os colchetes e depois pega o elemento daquela posição.

```js
let frutas = ["maçã", "banana", "uva"];
let i = 1;

console.log(frutas[i]);     // banana (i vale 1)
console.log(frutas[i + 1]); // uva (i + 1 vale 2)
```

É isso que resolve o problema do carrinho. Em `preco1`, o número era um pedaço do nome. Em `precos[i]`, o número é um valor guardado numa variável, e uma variável pode mudar a cada volta de um laço. Passar pelo array inteiro com um laço é o assunto da aula 6.3. Lá volta o laço da [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]] que começa no 0 e para com `<`.

## Quantos elementos: o `length`

Todo array sabe quantos elementos tem. Essa informação fica no **`length`**, "comprimento" em inglês:

```js
let frutas = ["maçã", "banana", "uva"];

console.log(frutas.length); // 3
console.log([].length);     // 0, o array vazio
```

O ponto é o mesmo do `console.log`, da [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]]: quer dizer "de dentro de". `frutas.length` é "o `length` que fica dentro de `frutas`".

O `length` vai **sem parênteses**. Ele não é uma função que se chama, como o `log`: é um valor que o array já carrega, como uma etiqueta colada nele dizendo "3 itens". Com parênteses, o JavaScript tenta chamar o 3 como se fosse uma função, e dá erro:

```js
frutas.length(); // TypeError: frutas.length is not a function
```

A mensagem quer dizer "frutas.length não é uma função".

### O último índice é `length - 1`

Os índices começam no 0, então o último é sempre um a menos que o tamanho. Com 3 elementos, os índices são 0, 1 e 2: o último é o 2, que é 3 − 1.

Por isso, para pegar o último elemento, se escreve:

```js
let frutas = ["maçã", "banana", "uva"];

console.log(frutas[frutas.length - 1]); // uva
```

O JavaScript resolve de dentro para fora:

| Passo | O que ele calcula | Resultado |
|---|---|---|
| 1 | `frutas.length` | `3` |
| 2 | `3 - 1` | `2` |
| 3 | `frutas[2]` | `"uva"` |

Por que não escrever `frutas[2]` direto? Porque o `2` só serve para um array de 3 elementos. A linha com `length - 1` pega o último de um array de qualquer tamanho:

```js
let cores = ["azul", "verde", "roxo", "preto", "branco"];

console.log(cores[cores.length - 1]); // branco
// cores.length é 5, e 5 - 1 = 4, o índice do "branco"
```

> [!warning] O engano mais comum: `length` sem o `- 1`
> ```js
> let frutas = ["maçã", "banana", "uva"];
>
> console.log(frutas[frutas.length]); // undefined
> ```
> O `frutas.length` vale 3, e o índice 3 não existe: os índices vão até o 2. É o "erro por um" da [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]], a conta que erra por uma unidade. O tamanho é 3, mas o último índice é 2.

## Trocando um elemento

Para trocar o valor de uma posição, use o `=` com o elemento do lado esquerdo:

```js
let frutas = ["maçã", "banana", "uva"];

frutas[1] = "pera";
console.log(frutas); // [ 'maçã', 'pera', 'uva' ]
```

É a [[glossario/atribuicao|atribuição]] da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]: guarda o valor da direita no lugar da esquerda. Só que o lugar agora é uma posição do array, e não uma variável inteira. A `"banana"` sai, a `"pera"` entra no mesmo lugar, e os outros elementos ficam onde estavam. O array continua com 3 elementos.

Também dá para usar o valor que já está lá, como em `idade = idade + 1`:

```js
let notas = [7, 9, 6];

notas[0] = notas[0] + 1;
console.log(notas); // [ 8, 9, 6 ]
```

Primeiro o lado direito: `notas[0]` vale 7, e 7 + 1 dá 8. Depois, o 8 é guardado de volta na posição 0.

> [!info]- E se o array estiver num `const`? (clique para abrir)
> A aula 2.1 recomenda começar com `const`. Com um array, o `const` funciona assim:
>
> ```js
> const frutas = ["maçã", "banana", "uva"];
>
> frutas[1] = "pera";
> console.log(frutas); // [ 'maçã', 'pera', 'uva' ]: funcionou
>
> frutas = ["kiwi", "manga"];
> // TypeError: Assignment to constant variable.
> ```
>
> O `const` impede que `frutas` passe a guardar **outro** array, e por isso a última linha dá erro. Trocar o que está nas posições do **mesmo** array é permitido.

## Um índice que não existe

Pedir uma posição que o array não tem não dá erro:

```js
let frutas = ["maçã", "banana", "uva"];

console.log(frutas[3]);  // undefined
console.log(frutas[10]); // undefined
```

O array tem os índices 0, 1 e 2. Para o 3 e o 10, o JavaScript devolve `undefined`, o "nada" da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]: naquela posição não há nada guardado.

O cuidado é o mesmo da [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|aula 5.2]], com os argumentos que faltam. Como não aparece erro, o programa segue com o `undefined`, e o problema só se mostra mais adiante. Numa conta, por exemplo, ele vira `NaN`:

```js
let precos = [10, 25, 8, 40];

console.log(precos[4] * 2); // NaN
// precos[4] não existe e vale undefined, e undefined * 2 dá NaN
```

Quando aparecer um `undefined` ou um `NaN` vindo de um array, vale conferir o índice. Muitas vezes é o `length` no lugar de `length - 1`.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| nome | array | lista (*list*) |
| criar | `["maçã", "banana", "uva"]` | `["maçã", "banana", "uva"]` |
| primeiro elemento | `frutas[0]` | `frutas[0]` |
| tamanho | `frutas.length` | `len(frutas)` |
| trocar um elemento | `frutas[1] = "pera"` | `frutas[1] = "pera"` |
| índice que não existe | `undefined`, sem erro | `IndexError: list index out of range` |
| `frutas[-1]` | `undefined` | `"uva"`, o último |

```python
frutas = ["maçã", "banana", "uva"]

print(frutas[0])    # maçã
print(len(frutas))  # 3
print(frutas[-1])   # uva

frutas[1] = "pera"
print(frutas)       # ['maçã', 'pera', 'uva']

print(frutas[10])   # IndexError: list index out of range
```

A ideia é a mesma, e a escrita é quase igual. As diferenças:

- **O tamanho.** No Python, ele se pede com a função `len`, de *length*, e não com um ponto.
- **O índice que não existe.** O Python para o programa com um erro. O JavaScript segue em frente com `undefined`, como faz com o argumento que falta.
- **O índice negativo.** No Python, ele conta do fim: `-1` é o último, `-2` o penúltimo. No JavaScript, `frutas[-1]` dá `undefined`. (O JavaScript tem outro jeito de contar do fim, o `frutas.at(-1)`, que devolve `"uva"`. Com os colchetes, não.)

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Qual é o índice da `"banana"`?
> ```js
> let frutas = ["maçã", "banana", "uva", "manga"];
> ```
>
> > [!success]- Resposta
> > `1`. Ela é o 2º elemento, e o índice é sempre um a menos que a posição falada, porque a contagem começa no 0.

> [!question] 2. O que aparece no console?
> ```js
> let cores = ["azul", "verde", "roxo"];
>
> console.log(cores[0]);
> console.log(cores[2]);
> ```
>
> > [!success]- Resposta
> > `azul` e depois `roxo`. O índice 0 é o primeiro elemento, e o índice 2, o terceiro.

> [!question] 3. O que aparece no console?
> ```js
> let animais = ["gato", "cão", "peixe", "pato"];
>
> console.log(animais.length);
> ```
>
> > [!success]- Resposta
> > `4`. O `length` conta os elementos, e são quatro. Os índices vão de 0 a 3, mas o tamanho é 4.

> [!question] 4. Qual é o índice do último?
> Um array tem 7 elementos. Qual é o índice do último deles?
>
> > [!success]- Resposta
> > `6`. O último índice é sempre `length - 1`: 7 − 1 = 6. Os índices vão de 0 a 6, e de 0 a 6 são sete números.

> [!question] 5. O que aparece no console?
> ```js
> let numeros = [5, 10, 15];
>
> console.log(numeros[3]);
> ```
>
> > [!success]- Resposta
> > `undefined`. O array tem os índices 0, 1 e 2, e o índice 3 não existe. O JavaScript não dá erro: devolve `undefined`.

> [!question] 6. O que aparece no console?
> ```js
> let letras = ["a", "b", "c", "d"];
> let i = 2;
>
> console.log(letras[i]);
> console.log(letras[i - 1]);
> ```
>
> > [!success]- Resposta
> > `c` e depois `b`. Na primeira linha, `i` vale 2, e `letras[2]` é `"c"`. Na segunda, `i - 1` vale 1, e `letras[1]` é `"b"`. O `i` não muda: a conta `i - 1` só é feita para escolher a posição.

> [!question] 7. O que aparece no console?
> ```js
> let pets = ["gato", "cão", "peixe"];
>
> pets[0] = "coelho";
> console.log(pets);
> console.log(pets.length);
> ```
>
> > [!success]- Resposta
> > `[ 'coelho', 'cão', 'peixe' ]` e depois `3`. O `"coelho"` entra no lugar do `"gato"`, na posição 0. Trocar um elemento não muda o tamanho do array.

> [!question] 8. O que aparece no console?
> ```js
> let pontos = [3, 7, 2];
>
> pontos[1] = pontos[1] * 2;
> console.log(pontos);
> ```
>
> > [!success]- Resposta
> > `[ 3, 14, 2 ]`. Primeiro o lado direito: `pontos[1]` vale 7, e 7 × 2 dá 14. Depois, o 14 é guardado de volta na posição 1.

> [!question] 9. Este código devia mostrar o último nome. Por que não mostra?
> ```js
> let nomes = ["Ana", "Bia", "Caio"];
>
> console.log(nomes[nomes.length]);
> ```
>
> > [!success]- Resposta
> > Porque `nomes.length` vale 3, e o índice 3 não existe: os índices vão de 0 a 2. A linha mostra `undefined`. Para pegar o último, falta o `- 1`:
> >
> > ```js
> > console.log(nomes[nomes.length - 1]); // Caio
> > ```

> [!question] 10. Por que este código dá erro?
> ```js
> let notas = [8, 6, 9];
>
> console.log(notas.length());
> ```
>
> > [!success]- Resposta
> > Porque o `length` não é uma função: é um valor que o array guarda. Com os parênteses, o JavaScript tenta chamá-lo e dá `TypeError: notas.length is not a function`. O certo é `notas.length`, sem parênteses, que vale 3.

> [!question] 11. Escreva o código.
> Crie um array `temperaturas` com os valores 22, 25, 19 e 30. Depois, mostre no console:
>
> - a primeira temperatura;
> - a última, usando o `length`;
> - a soma da primeira com a última.
>
> > [!success]- Resposta
> > ```js
> > let temperaturas = [22, 25, 19, 30];
> >
> > console.log(temperaturas[0]);                          // 22
> > console.log(temperaturas[temperaturas.length - 1]);    // 30
> > console.log(temperaturas[0] + temperaturas[temperaturas.length - 1]); // 52
> > ```
> >
> > Para a última, `temperaturas[3]` também mostraria 30. Com o `length - 1`, a linha continua certa mesmo que o array ganhe ou perca temperaturas.

## De onde vêm as palavras

- **[[glossario/array|Array]]**: do inglês médio *arrayen*, "pôr em ordem", que veio do anglo-normando *arraier* e, antes, do latim vulgar *arrēdō*, "arrumar, pôr em ordem". Lá no fundo, a raiz é germânica e queria dizer "pronto, preparado": *array* e o inglês *ready*, "pronto", vêm da mesma palavra, por dois caminhos diferentes. Em inglês, *array* também é a tropa em formação, e *battle array* é a "ordem de batalha", os soldados alinhados em fileiras. Um array é isso: valores em fila, cada um no seu lugar.
- **Vetor**: do latim *vector*, "o que carrega, transportador", de *vehō*, "carregar, transportar". Do mesmo *vehō* vem *vehiculum*, o nosso **veículo**. A palavra passou pela matemática e pela física, onde um vetor pode ser escrito como uma lista de números em ordem, e daí chegou à programação.
- **Lista**: veio do italiano *lista*, de uma palavra germânica que queria dizer "faixa, tira, borda". No francês antigo, *liste* era a borda, a faixa, a **tira de papel** e também a lista: os nomes escritos numa tira de papel. A **listra**, a faixa de cor numa camiseta, é uma variante da mesma palavra *lista*.
- **[[glossario/indice|Índice]]**: do latim *index*, "o que aponta, indicador", e também o **dedo indicador**, de *in-* + *dīcō*, "dizer, indicar". O índice aponta para uma posição do array, como um dedo. O *index* latino já era também a lista de um livro, de onde vem o índice que fica no começo ou no fim dos livros. E era o **delator**, quem aponta o culpado. Do mesmo *dīcō* vem o nosso **dizer**, e também o *iūdex*, o **juiz**: de *iūs*, "direito", + *dīcō*, quem diz o direito.
- **Elemento**: do latim *elementum*, "princípio, rudimento", que no plural queria dizer também **as letras do alfabeto**, as peças de que a escrita é feita. A origem é incerta. Uma das hipóteses, bem discutida, diz que a palavra viria das letras L, M e N, ditas em sequência como quem recita o alfabeto: "el, em, en".
- **length**: em inglês, "comprimento", do inglês antigo *lengþu*, que é *long*, "comprido", com um final que faz do adjetivo um substantivo, como o *-ura* faz de **alto** a **altura**. O `length` de um array é o comprimento da fila.

> [!tip] Para guardar
> - Um array é um valor só que guarda vários valores em ordem, e por isso cabe numa variável só. Cada valor de dentro é um elemento.
> - Ele se cria com colchetes e vírgulas: `let frutas = ["maçã", "banana", "uva"];`.
> - Cada elemento tem um índice, a sua posição, e o índice começa no 0: o 1º elemento tem índice 0.
> - Para ler um elemento, use o nome e o índice entre colchetes: `frutas[0]`. O índice pode ser uma variável ou uma conta.
> - O `length` diz quantos elementos o array tem. Vai sem parênteses.
> - O último índice é `length - 1`, e não `length`.
> - Para trocar um elemento, use o `=`: `frutas[1] = "pera";`. O tamanho não muda.
> - Um índice que não existe não dá erro: devolve `undefined`.

Fontes: MDN: [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [Array: length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), [Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) · Python: [Lists](https://docs.python.org/3/tutorial/introduction.html#lists) · Wiktionary: [array](https://en.wiktionary.org/wiki/array), [vector](https://en.wiktionary.org/wiki/vector), [vehō](https://en.wiktionary.org/wiki/veho), [lista](https://en.wiktionary.org/wiki/lista), [list](https://en.wiktionary.org/wiki/list), [listra](https://en.wiktionary.org/wiki/listra), [index](https://en.wiktionary.org/wiki/index), [índice](https://en.wiktionary.org/wiki/%C3%ADndice), [iūdex](https://en.wiktionary.org/wiki/iudex), [elementum](https://en.wiktionary.org/wiki/elementum), [length](https://en.wiktionary.org/wiki/length)
