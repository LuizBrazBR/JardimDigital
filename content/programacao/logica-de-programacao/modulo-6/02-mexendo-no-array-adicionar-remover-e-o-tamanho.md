---
title: "6.2 Mexendo no array: adicionar, remover e o tamanho"
tags:
  - logica-de-programacao
  - javascript
  - arrays
---

Segunda aula do módulo 6. Na [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|aula 6.1]], ficou uma pergunta no ar: se um carrinho pode ter 1 produto ou 30, como o programa guarda todos? Com variáveis separadas, não tem jeito. Os nomes `preco1`, `preco2` são escritos no código antes de o programa rodar, e, rodando, ele não cria um `preco5` sozinho.

O **[[glossario/array|array]]** resolve isso porque o tamanho dele muda **com o programa rodando**. O nome continua um só, e as posições aumentam ou diminuem conforme a necessidade. Esta aula mostra como.

## Um array cresce e encolhe

Pense numa lista de compras pendurada na geladeira. Durante a semana, você anota o que vai acabando. No mercado, risca o que já pôs no carrinho. A folha é sempre a mesma, mas a quantidade de itens muda o tempo todo.

Com o array é igual. Ele pode começar vazio, `[]`, e ir ganhando elementos, ou perdendo, enquanto o programa roda. Para isso, o JavaScript traz quatro ferramentas prontas:

| Ferramenta | O que faz | Onde |
|---|---|---|
| `push` | adiciona | no fim |
| `pop` | tira | do fim |
| `unshift` | adiciona | no começo |
| `shift` | tira | do começo |

## Método: uma função que vem com o array

Essas ferramentas se usam com um ponto depois do nome do array:

```js
compras.push("café");
```

O jeito de escrever você já conhece. Na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]], `console.log` era "o `log` que fica dentro do `console`". Aqui, `compras.push` é "o `push` que fica dentro de `compras`". E os parênteses fazem a chamada, como em qualquer [[glossario/funcao|função]] da [[programacao/logica-de-programacao/modulo-5/01-o-que-e-uma-funcao-e-como-criar-uma|aula 5.1]].

Uma função que vem dentro de um valor e trabalha com ele se chama **[[glossario/metodo|método]]**. O `push` é um método dos arrays, e o `log` é um método do `console`. Todo array já nasce com esses métodos: você não precisa criar nada.

Vale comparar com o `length`, da aula 6.1, que também vem depois de um ponto:

| | `compras.length` | `compras.push("café")` |
|---|---|---|
| o que é | um valor que o array guarda | um método, uma função do array |
| parênteses | não leva | leva |
| o que faz | só informa o tamanho | muda o array |

## `push`: adicionando no fim

```js
let compras = ["arroz", "feijão"];

compras.push("café");
console.log(compras);        // [ 'arroz', 'feijão', 'café' ]
console.log(compras.length); // 3
```

O `"café"` entra depois do último elemento, e o `length` passa de 2 para 3 sozinho. Ninguém precisa atualizá-lo.

Dá para adicionar vários de uma vez, separados por vírgula. Eles entram na ordem em que foram escritos:

```js
compras.push("leite", "pão");
console.log(compras);        // [ 'arroz', 'feijão', 'café', 'leite', 'pão' ]
console.log(compras.length); // 5
```

### Em que índice o novo elemento entra

Antes do primeiro `push`, `compras` tinha 2 elementos, nos índices 0 e 1. O `"café"` entrou no índice 2, que era justamente o `length` daquele momento.

Na aula 6.1, `frutas[frutas.length]` dava `undefined`, porque o índice `length` é o primeiro que ainda não existe. É exatamente ali que o `push` põe o valor novo: na primeira posição livre, logo depois do último.

### Começando do zero

O `push` mostra a sua força quando o array começa vazio e cresce dentro de um laço. Este programa guarda os números pares de 1 a 10:

```js
let pares = [];

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    pares.push(i);
  }
}

console.log(pares);        // [ 2, 4, 6, 8, 10 ]
console.log(pares.length); // 5
```

Em cada volta em que o `i` é par, o `push` acrescenta uma posição. O array começou com 0 elementos e terminou com 5, e em nenhum lugar do código está escrito "5". Com variáveis separadas, seria preciso ter criado `par1` até `par5` antes de rodar, sabendo de antemão quantos pares iam aparecer.

## `pop`: tirando do fim

O `pop` faz o contrário do `push`: tira o último elemento.

```js
let compras = ["arroz", "feijão", "café"];

let tirado = compras.pop();

console.log(tirado);         // café
console.log(compras);        // [ 'arroz', 'feijão' ]
console.log(compras.length); // 2
```

Ele faz duas coisas de uma vez:

1. **Muda o array.** O último elemento sai, e o `length` cai de 3 para 2.
2. **Devolve o elemento que tirou.** É o `return` da [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]]: a chamada `compras.pop()` vale `"café"`, e por isso dá para guardar esse valor numa variável, como em `let tirado = compras.pop();`.

Se o valor tirado não interessa, é só não guardar. A linha `compras.pop();`, sozinha, tira o último e pronto.

O `pop` vai com os parênteses vazios. Ele sempre tira o último, e o que estiver entre os parênteses é ignorado:

```js
let letras = ["a", "b", "c"];

letras.pop("a");
console.log(letras); // [ 'a', 'b' ]: saiu o "c", não o "a"
```

Tirar um elemento do meio, escolhendo qual, é trabalho para outros métodos, que esta aula não mostra.

### E se o array estiver vazio?

```js
let vazio = [];

console.log(vazio.pop()); // undefined
```

Não dá erro. Sem nada para tirar, o `pop` devolve `undefined`, o mesmo "nada" que aparece quando se pede um índice que não existe, na aula 6.1.

### A pilha de pratos

Juntos, o `push` e o `pop` funcionam como uma pilha de pratos. Você põe um prato **em cima** da pilha e, quando precisa de um, tira o **de cima**. O último prato que entrou é o primeiro que sai.

Em programação, um array usado assim, só com `push` e `pop`, se chama **pilha** (*stack*, em inglês). Este laço tira os pratos um a um, até a pilha acabar:

```js
let pilha = ["prato 1", "prato 2", "prato 3"];

while (pilha.length > 0) {
  console.log("tirei o", pilha.pop());
}

console.log(pilha); // []

// saída:
// tirei o prato 3
// tirei o prato 2
// tirei o prato 1
// []
```

Os pratos saem na ordem contrária à de entrada. E o `while`, da [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|aula 4.2]], para sozinho: cada `pop` diminui o `length`, e quando ele chega a 0, a condição `pilha.length > 0` fica falsa.

O botão "voltar" do navegador funciona assim. Cada página que você abre entra no topo da pilha, e o "voltar" tira a de cima, levando você para a anterior.

## `unshift` e `shift`: mexendo no começo

Estes dois são o `push` e o `pop` do outro lado do array:

- `unshift` **adiciona** um ou mais valores no começo.
- `shift` **tira** o primeiro elemento e o **devolve**, como o `pop` faz com o último.

```js
let fila = ["Bia", "Caio"];

fila.unshift("Ana");
console.log(fila); // [ 'Ana', 'Bia', 'Caio' ]

let atendida = fila.shift();
console.log(atendida); // Ana
console.log(fila);     // [ 'Bia', 'Caio' ]
```

Num array vazio, o `shift` também devolve `undefined`, sem erro.

### Mexer no começo muda o índice de todo mundo

Aqui está a grande diferença para o `push` e o `pop`. Quando um elemento entra ou sai **do começo**, todos os outros mudam de índice:

| Momento | Índice 0 | Índice 1 | Índice 2 |
|---|---|---|---|
| início | `"Bia"` | `"Caio"` | |
| depois de `fila.unshift("Ana")` | `"Ana"` | `"Bia"` | `"Caio"` |
| depois de `fila.shift()` | `"Bia"` | `"Caio"` | |

A `"Bia"` estava no índice 0, foi para o 1 com o `unshift` e voltou para o 0 com o `shift`. Quem guardou "a Bia está no índice 0" antes do `unshift` vai achar a `"Ana"` lá.

É a fila do banco: quando a pessoa da frente é atendida e sai, todo mundo anda um passo, e quem era o segundo vira o primeiro. Daí o nome: em inglês, *shift* é "deslocar, mudar de lugar".

Por isso o `unshift` e o `shift` são bem menos usados que o `push` e o `pop`. Com 3 elementos, tanto faz. Mas, num array muito grande, mudar o índice de todos os elementos dá mais trabalho ao computador. O `push` e o `pop` mexem só no fim, e os outros ficam onde estavam.

Usando `push` para entrar e `shift` para sair, o array vira uma **fila** de verdade: entra no fim, sai do começo, e o primeiro a chegar é o primeiro a ser atendido.

## Os quatro métodos juntos

| Método | O que faz | Onde | O que devolve |
|---|---|---|---|
| `push(valor)` | adiciona um ou mais valores | no fim | o novo tamanho |
| `pop()` | tira um elemento | do fim | o elemento tirado |
| `unshift(valor)` | adiciona um ou mais valores | no começo | o novo tamanho |
| `shift()` | tira um elemento | do começo | o elemento tirado |

> [!tip] Para não trocar os nomes
> Em cada par, o nome mais comprido é o que **adiciona**: `push` (4 letras) contra `pop` (3), e `unshift` (7) contra `shift` (5). E os dois que têm *shift* no nome são os que mexem no começo.

## O `length` sempre acompanha

Seja qual for o método, o `length` mostra o tamanho do momento. Acompanhe um array do começo ao fim:

```js
let lista = [];
lista.push("a");
lista.push("b", "c");
lista.pop();
lista.unshift("z");
lista.shift();
```

| Linha | `lista` depois dela | `lista.length` |
|---|---|---|
| `let lista = [];` | `[]` | 0 |
| `lista.push("a");` | `[ 'a' ]` | 1 |
| `lista.push("b", "c");` | `[ 'a', 'b', 'c' ]` | 3 |
| `lista.pop();` | `[ 'a', 'b' ]` | 2 |
| `lista.unshift("z");` | `[ 'z', 'a', 'b' ]` | 3 |
| `lista.shift();` | `[ 'a', 'b' ]` | 2 |

## Os erros mais comuns

**Esquecer os parênteses.** Sem eles, o método não é chamado. Nada muda, e nenhum erro avisa, como o `saudar;` da aula 5.1:

```js
let compras = ["arroz", "feijão"];

compras.pop;
console.log(compras); // [ 'arroz', 'feijão' ]: nada saiu
```

**Guardar o resultado do `push` no próprio array.** O `push` já muda o array por dentro. O que ele devolve é o novo tamanho, um número. Guardando esse número de volta, o array se perde:

```js
let compras = ["arroz"];

compras = compras.push("café");
console.log(compras); // 2
```

Passo a passo: o `push` põe o `"café"` no array, que fica com 2 elementos, e devolve 2. Depois, o `=` guarda esse 2 em `compras`, no lugar do array. O certo é só `compras.push("café");`, sem o `compras =`.

**Achar que o `pop` tira o que está entre parênteses.** Como no exemplo do `letras.pop("a")`, lá em cima: o `pop` sempre tira o último.

> [!info]- E com `const`, o `push` funciona? (clique para abrir)
> Funciona:
>
> ```js
> const compras = [];
>
> compras.push("café");
> console.log(compras); // [ 'café' ]
> ```
>
> É o que a aula 6.1 mostrou para a troca de um elemento. O `const` impede que `compras` passe a guardar **outro** array. Mexer no mesmo array, trocando, pondo ou tirando elementos, é permitido.

> [!info]- E se eu atribuir numa posição depois do fim? (clique para abrir)
> Com o `=` da aula 6.1, dá para pôr um valor no índice `length`, a primeira posição livre. O efeito é o mesmo do `push`:
>
> ```js
> let frutas = ["maçã"];
>
> frutas[frutas.length] = "uva"; // o mesmo que frutas.push("uva")
> console.log(frutas); // [ 'maçã', 'uva' ]
> ```
>
> Mas, se o índice passar da primeira posição livre, ficam buracos no meio:
>
> ```js
> let frutas = ["maçã", "banana", "uva"];
>
> frutas[5] = "kiwi";
> console.log(frutas);        // [ 'maçã', 'banana', 'uva', <2 empty items>, 'kiwi' ]
> console.log(frutas.length); // 6
> ```
>
> Os índices 3 e 4 ficaram vazios (*empty items*), e ler qualquer um deles dá `undefined`. Para pôr no fim, o `push` é mais seguro: ele sempre acha a posição certa.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| adicionar no fim | `compras.push("café")` | `compras.append("café")` |
| adicionar vários no fim | `compras.push("leite", "pão")` | `compras.extend(["leite", "pão"])` |
| tirar do fim | `compras.pop()` | `compras.pop()` |
| adicionar no começo | `compras.unshift("água")` | `compras.insert(0, "água")` |
| tirar do começo | `compras.shift()` | `compras.pop(0)` |
| tirar de uma lista vazia | devolve `undefined` | `IndexError: pop from empty list` |

```python
compras = ["arroz", "feijão"]

compras.append("café")
print(compras)        # ['arroz', 'feijão', 'café']

tirado = compras.pop()
print(tirado)         # café

compras.insert(0, "água")
print(compras)        # ['água', 'arroz', 'feijão']

primeiro = compras.pop(0)
print(primeiro)       # água
```

A ideia é a mesma, e os nomes mudam:

- **Adicionar no fim** é `append`, "acrescentar". Ele põe um valor só. Para vários, existe o `extend`, "estender", que recebe uma lista.
- **O `pop` do Python aceita um índice.** Vazio, tira o último, como no JavaScript. Com um número, tira daquela posição: `pop(0)` tira o primeiro, o trabalho do `shift`.
- **Para pôr no começo**, o `insert` recebe a posição e o valor: `insert(0, "água")` põe a `"água"` no índice 0.
- **Lista vazia**: o Python para o programa com um erro, e o JavaScript segue com `undefined`, como na aula 6.1.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let numeros = [1, 2];
>
> numeros.push(3);
> console.log(numeros);
> console.log(numeros.length);
> ```
>
> > [!success]- Resposta
> > `[ 1, 2, 3 ]` e depois `3`. O `3` entra no fim, e o `length` cresce junto.

> [!question] 2. O que aparece no console?
> ```js
> let letras = ["a", "b", "c"];
>
> let x = letras.pop();
> console.log(x);
> console.log(letras);
> ```
>
> > [!success]- Resposta
> > `c` e depois `[ 'a', 'b' ]`. O `pop` tira o último elemento e devolve esse valor, que fica guardado no `x`.

> [!question] 3. O que aparece no console?
> ```js
> let fila = ["Bia", "Caio"];
>
> fila.unshift("Ana");
> console.log(fila[0]);
> console.log(fila[1]);
> ```
>
> > [!success]- Resposta
> > `Ana` e depois `Bia`. O `unshift` põe a `"Ana"` no começo, e todos os outros andam uma posição: a `"Bia"`, que estava no índice 0, foi para o 1.

> [!question] 4. O que aparece no console?
> ```js
> let fila = ["Ana", "Bia", "Caio"];
>
> let primeira = fila.shift();
> console.log(primeira);
> console.log(fila.length);
> console.log(fila[0]);
> ```
>
> > [!success]- Resposta
> > `Ana`, depois `2` e depois `Bia`. O `shift` tira a `"Ana"` e a devolve. Sobram 2 elementos, e a `"Bia"` passa a ser a primeira, no índice 0.

> [!question] 5. O que aparece no console?
> ```js
> let vazio = [];
>
> console.log(vazio.pop());
> ```
>
> > [!success]- Resposta
> > `undefined`. Não há nada para tirar, e o `pop` devolve `undefined` em vez de dar erro.

> [!question] 6. Qual é o `length` no fim?
> ```js
> let a = [];
>
> a.push("x");
> a.push("y", "z");
> a.pop();
> ```
>
> > [!success]- Resposta
> > `2`. Passo a passo: 0 no começo, 1 depois do primeiro `push`, 3 depois do segundo, que põe dois valores, e 2 depois do `pop`. O array termina como `[ 'x', 'y' ]`.

> [!question] 7. Por que o array não mudou?
> ```js
> let compras = ["arroz", "feijão"];
>
> compras.pop;
> console.log(compras); // [ 'arroz', 'feijão' ]
> ```
>
> > [!success]- Resposta
> > Faltaram os parênteses. `compras.pop` sem eles só cita o método e não o chama. O certo é `compras.pop();`.

> [!question] 8. O que aparece no console?
> ```js
> let t = ["a", "b", "c"];
>
> t.pop("a");
> console.log(t);
> ```
>
> > [!success]- Resposta
> > `[ 'a', 'b' ]`. O `pop` sempre tira o último elemento, e o `"a"` entre os parênteses é ignorado.

> [!question] 9. O que aparece no console, e por quê?
> ```js
> let compras = ["arroz"];
>
> compras = compras.push("café");
> console.log(compras);
> ```
>
> > [!success]- Resposta
> > `2`. O `push` põe o `"café"` no array e devolve o novo tamanho, 2. O `compras =` guarda esse 2 no lugar do array, que se perde. Bastava `compras.push("café");`.

> [!question] 10. O que aparece no console?
> ```js
> let multiplos = [];
>
> for (let i = 1; i <= 10; i++) {
>   if (i % 3 === 0) {
>     multiplos.push(i);
>   }
> }
>
> console.log(multiplos);
> ```
>
> > [!success]- Resposta
> > `[ 3, 6, 9 ]`. O laço passa pelos números de 1 a 10, e o `push` só roda quando o resto da divisão por 3 é 0.

> [!question] 11. Em que ordem aparecem os números?
> ```js
> let pilha = [10, 20, 30];
>
> while (pilha.length > 0) {
>   console.log(pilha.pop());
> }
> ```
>
> > [!success]- Resposta
> > `30`, `20` e `10`. Cada `pop` tira o último que sobrou. O laço para quando o `length` chega a 0.

> [!question] 12. Escreva o código.
> Crie um array vazio chamado `historico`. Com `push`, ponha nele `"página 1"`, `"página 2"` e `"página 3"`. Depois, como se a pessoa apertasse "voltar", tire a última página, mostre qual saiu e mostre o array.
>
> > [!success]- Resposta
> > ```js
> > let historico = [];
> >
> > historico.push("página 1");
> > historico.push("página 2");
> > historico.push("página 3");
> >
> > let saiu = historico.pop();
> > console.log(saiu);      // página 3
> > console.log(historico); // [ 'página 1', 'página 2' ]
> > ```
> >
> > Os três `push` também podiam ser um só: `historico.push("página 1", "página 2", "página 3");`.

## De onde vêm as palavras

- **[[glossario/metodo|Método]]**: do latim *methodus*, do grego *méthodos*, formado por *metá* e *hodós*, "caminho". No grego, *hodós* era a estrada, a viagem e também "o jeito de fazer alguma coisa". Método é o caminho que se segue para chegar a um resultado. Na programação, é o jeito pronto que um valor tem de fazer uma tarefa: o array sabe pôr e tirar elementos. Do mesmo *hodós* vem o grego *éxodos*, a saída, o caminho para fora, que deu o nosso **êxodo**.
- **push**: em inglês, "empurrar". Veio do francês *pousser* e, antes, do latim *pulsāre*, "bater, golpear". Do mesmo *pulsāre* vem o nosso **pulsar**, como o coração que pulsa. O `push` empurra um valor para dentro do array.
- **pop**: uma onomatopeia, uma palavra que imita um som, no caso um estalo curto. Em inglês, serve também para ações rápidas: sair de repente, pular fora. A pipoca, *popcorn*, é o milho (*corn*) que estoura. O `pop` faz o último elemento pular fora do array.
- **shift**: do inglês antigo *sciftan*, "dividir, repartir; arrumar, organizar". Hoje, em inglês, quer dizer "mudar de lugar, deslocar", que é o que acontece no `shift`: todos os elementos se deslocam uma posição. É a mesma palavra da tecla **Shift** do teclado.
- **unshift**: *un-*, que desfaz, como o "des-" de "desfazer", mais *shift*. É o contrário do `shift`: em vez de tirar do começo, põe.
- **Pilha** (*stack*): o nome em inglês vem da comparação com uma pilha de pratos, em que só dá para pôr e tirar por cima. A ideia apareceu pela primeira vez num texto de computação em 1946, com o matemático inglês Alan Turing, que chamou o pôr e o tirar de outro jeito: *bury* e *unbury*, "enterrar" e "desenterrar".

> [!tip] Para guardar
> - O array não tem tamanho fixo: ganha e perde elementos com o programa rodando.
> - Um método é uma função que vem dentro de um valor. Chama-se com ponto e parênteses: `compras.push("café")`.
> - `push` adiciona no fim, e `pop` tira do fim. `unshift` adiciona no começo, e `shift` tira do começo.
> - `pop` e `shift` devolvem o elemento que tiraram. Num array vazio, devolvem `undefined`, sem erro.
> - `push` e `unshift` devolvem o novo tamanho. Não guarde esse número no próprio array.
> - Mexer no começo muda o índice de todos os outros elementos. Por isso `push` e `pop` são os mais usados.
> - O `length` sempre mostra o tamanho do momento, sem que ninguém precise atualizá-lo.

Fontes: MDN: [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push), [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), [shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift), [unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift), [Method](https://developer.mozilla.org/en-US/docs/Glossary/Method), [Sparse arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays) · Python: [More on Lists](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists) · Wikipedia: [Stack (abstract data type)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) · Wiktionary: [method](https://en.wiktionary.org/wiki/method), [ὁδός](https://en.wiktionary.org/wiki/%E1%BD%81%CE%B4%CF%8C%CF%82), [push](https://en.wiktionary.org/wiki/push), [pop](https://en.wiktionary.org/wiki/pop), [shift](https://en.wiktionary.org/wiki/shift)
