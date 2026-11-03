---
title: "6.3 Percorrendo arrays: for e for...of"
tags:
  - logica-de-programacao
  - javascript
  - arrays
  - lacos
---

Terceira aula do módulo 6. Nas aulas [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|6.1]] e [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|6.2]], o array guardou valores, ganhou e perdeu elementos e informou o seu tamanho. Falta o que mais se faz com ele no dia a dia: passar por todos os elementos, um de cada vez, e fazer alguma coisa com cada um. Isso se chama **[[glossario/percorrer|percorrer]]** o array. Também se diz **[[glossario/iteracao|iterar]]**, do inglês *iterate*.

## Para que percorrer

Pense no caixa do supermercado. Ele pega um produto do carrinho, passa no leitor, o preço entra na conta, e ele pega o próximo, até o carrinho esvaziar. Tanto faz se o carrinho tem 3 ou 30 produtos: o trabalho é o mesmo, repetido uma vez para cada um, e no fim sai o total.

Percorrer um array é isso: **fazer alguma coisa com cada elemento**, seja somar, contar, conferir, mostrar cada um de um jeito ou separar alguns. Antes de ver como, vale responder duas dúvidas que aparecem logo.

### "Mas o `console.log` já mostra o array inteiro"

Mostra:

```js
let precos = [10, 25, 8, 40];

console.log(precos); // [ 10, 25, 8, 40 ]
```

Só que mostrar é para a pessoa ler. Como se viu na [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]], o programa não consegue usar o que foi mostrado. Você vê os quatro preços na tela, mas o programa não fica sabendo o total, nem quantos passam de 10.

E não dá para escolher o formato. O array inteiro sempre aparece com colchetes e vírgulas. Para escrever uma linha como "Produto 1: 10 reais" para cada preço, o programa precisa pegar os elementos um por um.

### "Mas dá para pegar cada um com os colchetes"

Também dá:

```js
let precos = [10, 25, 8, 40];

let total = precos[0] + precos[1] + precos[2] + precos[3];
console.log(total); // 83
```

Funciona, mas só para um array com exatamente 4 elementos, porque a linha foi escrita para esse tamanho. Na aula 6.2, o array mudava de tamanho com o programa rodando. Veja a mesma linha em arrays de outros tamanhos:

```js
let maisPrecos = [10, 25, 8, 40, 17];
console.log(maisPrecos[0] + maisPrecos[1] + maisPrecos[2] + maisPrecos[3]); // 83

let menosPrecos = [10, 25, 8];
console.log(menosPrecos[0] + menosPrecos[1] + menosPrecos[2] + menosPrecos[3]); // NaN
```

- **Com 5 preços**, o `17` fica de fora. O total sai errado, e nenhum erro avisa.
- **Com 3 preços**, o `menosPrecos[3]` não existe e vale `undefined`, como na aula 6.1. A conta fica `43 + undefined`, que dá `NaN`.

E com mil preços seria preciso escrever mil `precos[...]`. É o mesmo problema das variáveis separadas da aula 6.1: o código é escrito antes de o programa rodar e não sabe quantos elementos vão existir.

O laço resolve isso, porque pergunta o tamanho na hora. Ele dá uma volta para cada elemento que o array tiver naquele momento, sejam 3, 5 ou mil. O JavaScript tem dois jeitos de escrever esse laço.

## O `for` pelo índice

O primeiro jeito é o `for` da [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]], com o contador `i` fazendo o papel de índice:

```js
let frutas = ["maçã", "banana", "uva"];

for (let i = 0; i < frutas.length; i++) {
  console.log(i + ": " + frutas[i]);
}
// 0: maçã
// 1: banana
// 2: uva
```

Cada peça está ali por um motivo:

| Peça | Por quê |
|---|---|
| `let i = 0` | o primeiro índice é 0 |
| `i < frutas.length` | o último índice é `length - 1`, então o laço precisa parar antes de o `i` chegar ao `length` |
| `i++` | anda de um em um, sem pular nenhuma posição |
| `frutas[i]` | pega o elemento da posição em que o `i` está |

Volta a volta:

| Volta | `i` | `i < frutas.length`? | `frutas[i]` | Mostra |
|---|---|---|---|---|
| 1 | 0 | `0 < 3`: sim | `"maçã"` | `0: maçã` |
| 2 | 1 | `1 < 3`: sim | `"banana"` | `1: banana` |
| 3 | 2 | `2 < 3`: sim | `"uva"` | `2: uva` |
| — | 3 | `3 < 3`: não | | o laço para |

O `i` chega a 3, mas aí a condição já é falsa, e o `frutas[3]`, que não existe, nunca é lido. E, como a condição usa o `frutas.length`, o mesmo laço serve para um array de qualquer tamanho.

### Por que `<` e não `<=`

Com `<=`, o laço dá uma volta a mais, com o `i` valendo 3:

```js
let frutas = ["maçã", "banana", "uva"];

for (let i = 0; i <= frutas.length; i++) {
  console.log(i + ": " + frutas[i]);
}
// 0: maçã
// 1: banana
// 2: uva
// 3: undefined
```

É o "erro por um" da aula 4.3 e o `frutas[frutas.length]` da aula 6.1, agora dentro de um laço. Numa soma, essa volta a mais soma um `undefined`, e o total vira `NaN`.

## O `for...of`: direto aos valores

O segundo jeito dispensa o índice. A cada volta, ele põe o próximo elemento numa variável:

```js
let frutas = ["maçã", "banana", "uva"];

for (let fruta of frutas) {
  console.log(fruta);
}
// maçã
// banana
// uva
```

A primeira linha se lê quase em português: "**para cada** `fruta` **de** `frutas`". O `of` é o "de" do inglês, e o laço se chama **[[glossario/para-cada|para cada]]**.

Volta a volta:

| Volta | `fruta` vale | Mostra |
|---|---|---|
| 1 | `"maçã"` | `maçã` |
| 2 | `"banana"` | `banana` |
| 3 | `"uva"` | `uva` |
| — | os elementos acabaram | o laço para |

Não tem `i`, não tem condição e não tem `frutas[i]`. O laço começa no primeiro elemento, vai até o último e para sozinho quando eles acabam.

A variável `fruta` é criada pelo próprio laço, e o nome quem escolhe é você. O costume é usar o singular do nome do array: `fruta` para `frutas`, `preco` para `precos`, `nome` para `nomes`. Assim a linha se explica sozinha. E, como o `i` do `for` na aula 4.3, essa variável só existe dentro do laço.

> [!info]- E com `const`, funciona? (clique para abrir)
> Funciona:
>
> ```js
> for (const fruta of frutas) {
>   console.log(fruta);
> }
> ```
>
> Parece estranho, porque a `fruta` muda a cada volta. Mas, no `for...of`, cada volta cria uma `fruta` nova, que recebe um valor só e fica com ele até o fim da volta. Muita gente prefere o `const` aqui, justamente para deixar claro que a variável não vai ser trocada dentro do laço.
>
> No `for` pelo índice, não dá. Ali o `i++` muda o mesmo `i`, e um `const i` dá `TypeError: Assignment to constant variable.`, "atribuição a uma variável constante".

> [!info]- O `for` e o `of` são palavras reservadas? (clique para abrir)
> O `for` é. É a mesma [[glossario/palavra-reservada|palavra reservada]] do laço da aula 4.3, e não pode ser nome de variável: `let for = 1;` dá `SyntaxError`.
>
> O `of` não é. Ele só tem um sentido especial num lugar: dentro dos parênteses de um `for`, logo depois da variável. Fora dali, é um nome comum, e `let of = 5;` funciona. A MDN chama esse tipo de palavra de "identificador com sentido especial": ela tem um papel em certos lugares, sem ser reservada. Mesmo assim, não vale a pena usar `of` como nome de variável, porque o código fica confuso.
>
> Já o `in`, do erro do `for...in` mais abaixo, é reservado, porque tem outros usos na linguagem.
>
> E o `for...of` não é só para arrays. Ele percorre qualquer coisa que tenha elementos em sequência, como um texto, letra por letra:
>
> ```js
> for (let letra of "uva") {
>   console.log(letra);
> }
> // u
> // v
> // a
> ```
>
> Com algo que não tem elementos, como um número, ele dá erro: `for (let x of 123)` dá `TypeError: 123 is not iterable`, "123 não é iterável", ou seja, não dá para percorrê-lo.

## O que o `for...of` tem de melhor

Veja os dois fazendo a mesma coisa:

```js
let frutas = ["maçã", "banana", "uva"];

// pelo índice
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// direto aos valores
for (let fruta of frutas) {
  console.log(fruta);
}
```

| | `for` pelo índice | `for...of` |
|---|---|---|
| o que você escreve | o começo, a condição, o passo e o `frutas[i]` | só a variável e o array |
| como se lê | "do `i` 0 até antes do tamanho, de um em um, pegue `frutas[i]`" | "para cada fruta de frutas" |
| onde dá para errar | em cada uma das três peças | quase em nada |

O ganho maior está na última linha. No `for` pelo índice, você mesmo escreve as três peças, e cada uma pode sair errada:

- **`i <= frutas.length`** dá uma volta a mais, com `undefined`, como se viu acima.
- **`let i = 1`** pula o primeiro elemento, porque o primeiro índice é 0.
- **Sem o `i++`**, o `i` fica no 0 para sempre, e o laço não para: é o laço infinito da [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|aula 4.2]].

No `for...of`, essas peças não existem, então esses erros também não. Ele sempre passa por todos os elementos, do primeiro ao último, sem nenhum a mais e nenhum a menos.

## Quando o índice faz falta

Então o `for...of` é sempre melhor? Para o caso mais comum, que é passar por todos os elementos e usar o valor de cada um, sim. Mas, como ele não tem o `i`, algumas tarefas ficam difíceis ou impossíveis com ele. Para essas, o `for` pelo índice continua sendo o caminho.

### Saber a posição

Para numerar uma lista, é preciso saber em que posição cada elemento está:

```js
let tarefas = ["lavar a louça", "estudar", "varrer"];

for (let i = 0; i < tarefas.length; i++) {
  console.log(`${i + 1}. ${tarefas[i]}`);
}
// 1. lavar a louça
// 2. estudar
// 3. varrer
```

O `i + 1` existe porque as pessoas contam a partir do 1, e os índices começam no 0.

### Mudar os elementos do array

Este código tenta dar 1 ponto a mais em cada nota, mas o array não muda:

```js
let notas = [5, 7, 9];

for (let nota of notas) {
  nota = nota + 1;
}

console.log(notas); // [ 5, 7, 9 ]
```

A `nota` recebe o valor de cada elemento, mas é uma variável separada, criada pelo laço. Mudar a `nota` muda só a `nota`, e o array fica como estava. É como copiar o preço de um produto num papel e corrigir o papel: a etiqueta na prateleira continua igual.

Para mudar o array, é preciso escrever na posição dele, como na troca de elementos da aula 6.1. E, para isso, é preciso o índice:

```js
let notas = [5, 7, 9];

for (let i = 0; i < notas.length; i++) {
  notas[i] = notas[i] + 1;
}

console.log(notas); // [ 6, 8, 10 ]
```

### Andar de outro jeito

O `for...of` só anda para a frente, do primeiro ao último, de um em um. Com o índice, dá para andar de trás para a frente, com o `i--` da aula 4.3:

```js
let frutas = ["maçã", "banana", "uva"];

for (let i = frutas.length - 1; i >= 0; i--) {
  console.log(frutas[i]);
}
// uva
// banana
// maçã
```

O laço começa no último índice, `length - 1`, e desce até o 0. Do mesmo jeito, com `i += 2`, dá para andar de dois em dois.

### Qual usar

| Preciso de... | Use |
|---|---|
| só o valor de cada elemento: somar, contar, mostrar, conferir | `for...of` |
| a posição de cada elemento, por exemplo para numerar | `for` pelo índice |
| mudar os elementos do próprio array | `for` pelo índice |
| andar de trás para a frente, ou pulando | `for` pelo índice |

E o `while`? Ele continua bom quando não se sabe quantas voltas o laço vai dar. Um exemplo é o laço da pilha de pratos da aula 6.2, que tirava pratos com o `pop` até a pilha acabar. Para passar por todos os elementos de um array, o `for` e o `for...of` são mais diretos.

## O que dá para fazer percorrendo

Voltando ao caixa do supermercado: o laço só passa pelos produtos. O que importa é o que acontece em cada volta, e os usos mais comuns juntam o laço com coisas que você já conhece.

### Somar: o acumulador

O acumulador da [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]] funciona igual. É uma variável criada **antes** do laço, começando em 0, que recebe cada valor:

```js
let precos = [10, 25, 8, 40];

let total = 0;
for (let preco of precos) {
  total = total + preco;
}

console.log(total); // 83
```

| Volta | `preco` | `total` antes | `total` depois |
|---|---|---|---|
| 1 | 10 | 0 | 10 |
| 2 | 25 | 10 | 35 |
| 3 | 8 | 35 | 43 |
| 4 | 40 | 43 | 83 |

Com 5 preços, com 3 ou com mil, o mesmo laço dá o total certo, porque faz uma volta para cada preço que existir. Assim se resolve o problema dos colchetes do começo da aula.

Dentro de uma função, do [[programacao/logica-de-programacao/modulo-5/index|módulo 5]], fica melhor ainda. Um array também pode ser argumento, e a função, escrita uma vez, soma qualquer um:

```js
function somar(numeros) {
  let total = 0;
  for (let numero of numeros) {
    total = total + numero;
  }
  return total;
}

console.log(somar([10, 25, 8, 40]));     // 83
console.log(somar([10, 25, 8, 40, 17])); // 100
console.log(somar([10, 25, 8]));         // 43
console.log(somar([]));                  // 0
```

Com o array vazio, o laço não dá nenhuma volta, e o `total` fica no 0 do começo, o valor neutro da aula 4.4.

### Contar: o contador

```js
let precos = [10, 25, 8, 40];

let quantos = 0;
for (let preco of precos) {
  if (preco > 10) {
    quantos = quantos + 1;
  }
}

console.log(quantos); // 2
```

É o contador da aula 4.4, com o `if` fazendo o papel do porteiro do show: só o 25 e o 40 passam. O 10 fica de fora, porque `10 > 10` é falso.

### Mostrar cada um do seu jeito

É o que o `console.log` do array inteiro não faz:

```js
let precos = [10, 25, 8, 40];

for (let preco of precos) {
  console.log(`Produto: ${preco} reais`);
}
// Produto: 10 reais
// Produto: 25 reais
// Produto: 8 reais
// Produto: 40 reais
```

### Montar outro array

Com o `push` da aula 6.2, o laço pode separar alguns elementos num array novo:

```js
let precos = [10, 25, 8, 40];
let caros = [];

for (let preco of precos) {
  if (preco > 10) {
    caros.push(preco);
  }
}

console.log(caros);  // [ 25, 40 ]
console.log(precos); // [ 10, 25, 8, 40 ]
```

O `precos` continua inteiro. O laço só leu os valores dele, e quem ganhou elementos foi o `caros`.

### Procurar e achar o maior

Mais dois trabalhos se fazem percorrendo um array:

- **procurar um elemento**, como saber se o `"café"` está na lista de compras;
- **achar o maior**, como descobrir o preço mais alto do array `precos`.

O "achar o maior" já apareceu nas aulas 3.4 e 5.5, mas com variáveis separadas, como o `a`, o `b` e o `c` da `maiorDeTres(a, b, c)`. Ali, o código foi escrito para exatamente três valores, e com quatro já foi preciso outra função, a `maiorDeQuatro`. Num array, a quantidade de elementos só se sabe com o programa rodando. Quem resolve é o laço: ele percorre o array e vai ficando com o maior até agora, como a aula 5.5 começou a mostrar em "E com muitos números?". A aula 5.5 também avisou que o problema voltaria na aula 7.2, "agora numa lista de verdade". É lá que esses dois trabalhos aparecem.

## Array como argumento

A função `somar`, lá em cima, recebeu um array inteiro pelo parâmetro `numeros`. Isso vale para qualquer função. Como na [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|aula 5.2]], o parâmetro recebe o valor que vier na chamada, e um array é um valor como outro qualquer, assim como um número, um texto ou um booleano:

```js
function primeiro(lista) {
  return lista[0];
}

console.log(primeiro(["Ana", "Bia"])); // Ana
console.log(primeiro([7, 3, 9]));      // 7
```

O caminho contrário também funciona: uma função pode **devolver** um array. Ela monta o array com `push` e o devolve no `return`:

```js
function paresAte(limite) {
  let pares = [];
  for (let i = 2; i <= limite; i += 2) {
    pares.push(i);
  }
  return pares;
}

console.log(paresAte(10)); // [ 2, 4, 6, 8, 10 ]
```

### O cuidado: a função recebe o mesmo array

Aqui, o array se comporta de um jeito diferente do número. Compare:

```js
function dobrar(n) {
  n = n * 2;
}

let x = 5;
dobrar(x);
console.log(x); // 5: o x de fora não mudou
```

```js
function adicionarCafe(lista) {
  lista.push("café");
}

let compras = ["arroz"];
adicionarCafe(compras);
console.log(compras); // [ 'arroz', 'café' ]: o array de fora mudou
```

- **Com o número**, o `n` recebe o valor 5 e é uma variável à parte, como a `nota` do `for...of`. Mudar o `n` não mexe no `x`.
- **Com o array**, os nomes `lista` e `compras` apontam para **o mesmo array**. A função não recebe uma cópia. Por isso, o `push` feito pelo nome `lista`, dentro da função, aparece no `compras`, fora dela.

Passar um número é como ditar um telefone para alguém: a pessoa anota no papel dela, e o que ela rabiscar ali não muda o seu. Passar um array é como emprestar o seu caderno: o que ela escrever nele vai estar lá quando o caderno voltar.

O perigo é a função mudar o array **sem querer**. Esta função soma os preços tirando um por um com o `pop`, como na pilha de pratos da aula 6.2. O total sai certo, mas o array de quem chamou fica vazio:

```js
function somarTirando(numeros) {
  let total = 0;
  while (numeros.length > 0) {
    total = total + numeros.pop();
  }
  return total;
}

let precos = [10, 25, 8, 40];

console.log(somarTirando(precos)); // 83
console.log(precos);               // []: os preços sumiram
```

Quem chamou só queria o total e perdeu os preços, sem nenhum erro avisando. A `somar` do começo da aula não tem esse problema: percorrer com `for` ou `for...of` só lê os elementos, e o array volta inteiro.

| Dentro da função | O array de quem chamou |
|---|---|
| ler: `lista[0]`, `lista.length`, percorrer com `for` ou `for...of` | fica igual |
| usar `push`, `pop`, `shift` ou `unshift` | muda |
| escrever numa posição: `lista[0] = ...` | muda |

Quando a função existe justamente para mudar o array, como a `adicionarCafe`, tudo bem. Só vale deixar isso claro no nome, como a [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]] mostrou em "O nome conta a história": `adicionarCafe` avisa que mexe na lista, e `somar` dá a entender que só lê.

> [!info]- E se a função trocar o parâmetro por outro array? (clique para abrir)
> ```js
> function trocar(lista) {
>   lista = ["outro"];
> }
>
> let compras = ["arroz"];
> trocar(compras);
> console.log(compras); // [ 'arroz' ]: não mudou
> ```
>
> O `=` não mexe no array: ele faz o nome `lista` passar a guardar um array novo. Daí em diante, `lista` e `compras` deixam de apontar para o mesmo array, e o de fora fica como estava. É a mesma diferença que o `const` da aula 6.2 mostrou: trocar a variável por outro array é uma coisa, e mexer no array é outra. Só o que mexe no array aparece fora da função.

## Os erros mais comuns

**Usar `<=` no `for` pelo índice.** O laço dá uma volta a mais, em que o elemento vale `undefined`. Numa soma, o resultado vira `NaN`:

```js
let precos = [10, 25, 8, 40];
let total = 0;

for (let i = 0; i <= precos.length; i++) {
  total = total + precos[i];
}

console.log(total); // NaN
```

Na última volta, o `i` vale 4, o `precos[4]` vale `undefined`, e `83 + undefined` dá `NaN`.

**Começar o `i` no 1.** O primeiro elemento, que está no índice 0, fica de fora, e nenhum erro avisa.

**Achar que mudar a variável do `for...of` muda o array.** Como no exemplo das notas, lá em cima: a variável recebe o valor, mas não é o elemento. Para mudar o array, use o `for` pelo índice.

**Mudar sem querer o array que a função recebeu.** Com `pop`, `shift` ou `lista[i] = ...` dentro de uma função, o array de quem chamou muda junto. Se a função só precisa ler, basta percorrer com `for` ou `for...of`, como na seção "Array como argumento".

**Escrever `in` no lugar de `of`.**

```js
let frutas = ["maçã", "banana", "uva"];

for (let fruta in frutas) {
  console.log(fruta);
}
// 0
// 1
// 2
```

Não dá erro, mas a `fruta` recebe as posições, `"0"`, `"1"` e `"2"`, escritas como texto, e não as frutas. O `for...in` existe no JavaScript e serve para outra coisa: ele passa pelos nomes das posições, não pelos valores. Para os valores de um array, o certo é `of`. A troca é comum porque, no Python, o laço que faz o trabalho do `for...of` se escreve justamente com `in`, como se vê logo abaixo.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| cada valor | `for (let fruta of frutas)` | `for fruta in frutas:` |
| cada índice | `for (let i = 0; i < frutas.length; i++)` | `for i in range(len(frutas)):` |
| o índice e o valor juntos | `for` pelo índice, com `i` e `frutas[i]` | `for i, fruta in enumerate(frutas):` |
| somar tudo | um laço com acumulador | `sum(precos)` ou um laço |

```python
frutas = ["maçã", "banana", "uva"]

for fruta in frutas:
    print(fruta)
# maçã
# banana
# uva

for i in range(len(frutas)):
    print(i, frutas[i])
# 0 maçã
# 1 banana
# 2 uva

for i, fruta in enumerate(frutas):
    print(i + 1, fruta)
# 1 maçã
# 2 banana
# 3 uva
```

- **O `in` do Python faz o papel do `of` do JavaScript.** Cuidado ao passar de uma linguagem para a outra: no JavaScript, o `in` entrega as posições.
- **O `for` do Python é sempre um "para cada".** Como na aula 4.3, ele não tem três partes. Para passar pelos índices, ele percorre os números que o `range` produz, de 0 até antes do `len(frutas)`, o tamanho.
- **O `enumerate`**, "enumerar", entrega a posição e o valor juntos, a cada volta. Com ele, dá para numerar sem escrever `frutas[i]`.
- **O `sum`**, da aula 4.4, já soma uma lista inteira sem laço nenhum.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let numeros = [4, 8, 15];
>
> for (let i = 0; i < numeros.length; i++) {
>   console.log(numeros[i] * 2);
> }
> ```
>
> > [!success]- Resposta
> > `8`, `16` e `30`. O `i` passa pelos índices 0, 1 e 2, e cada elemento aparece multiplicado por 2.

> [!question] 2. O que aparece no console?
> ```js
> let nomes = ["Ana", "Bia"];
>
> for (let nome of nomes) {
>   console.log("Oi, " + nome);
> }
> ```
>
> > [!success]- Resposta
> > `Oi, Ana` e depois `Oi, Bia`. A cada volta, o `nome` recebe o próximo elemento do array.

> [!question] 3. Quantas voltas o laço dá, e o que aparece?
> ```js
> let vazio = [];
>
> for (let x of vazio) {
>   console.log(x);
> }
> console.log("fim");
> ```
>
> > [!success]- Resposta
> > Nenhuma volta, e só aparece `fim`. O array não tem elementos, então o laço acaba antes de começar. Não dá erro.

> [!question] 4. O que está errado?
> O programa devia mostrar as três letras, mas mostra só duas.
>
> ```js
> let letras = ["a", "b", "c"];
>
> for (let i = 1; i < letras.length; i++) {
>   console.log(letras[i]);
> }
> ```
>
> > [!success]- Resposta
> > O `i` começa no 1, e o primeiro elemento está no índice 0. Aparecem só `b` e `c`. O certo é `let i = 0`.

> [!question] 5. O que aparece no console?
> ```js
> let cores = ["azul", "verde"];
>
> for (let i = 0; i <= cores.length; i++) {
>   console.log(cores[i]);
> }
> ```
>
> > [!success]- Resposta
> > `azul`, `verde` e `undefined`. Com `<=`, o laço dá uma volta a mais, com o `i` valendo 2, e o índice 2 não existe. O certo é `i < cores.length`.

> [!question] 6. O que aparece no console?
> ```js
> let pontos = [3, 7, 2];
> let soma = 0;
>
> for (let p of pontos) {
>   soma = soma + p;
> }
> console.log(soma);
> ```
>
> > [!success]- Resposta
> > `12`. A `soma` começa em 0 e recebe cada ponto: 0 + 3 = 3, 3 + 7 = 10 e 10 + 2 = 12.

> [!question] 7. O que aparece no console?
> ```js
> let idades = [12, 18, 25, 16, 30];
> let adultos = 0;
>
> for (let idade of idades) {
>   if (idade >= 18) {
>     adultos = adultos + 1;
>   }
> }
> console.log(adultos);
> ```
>
> > [!success]- Resposta
> > `3`. O contador só anda quando a idade é 18 ou mais: no 18, no 25 e no 30.

> [!question] 8. Por que o array não mudou? Como corrigir?
> ```js
> let valores = [1, 2, 3];
>
> for (let valor of valores) {
>   valor = valor * 2;
> }
> console.log(valores); // [ 1, 2, 3 ]
> ```
>
> > [!success]- Resposta
> > O `valor` recebe o valor de cada elemento, mas é uma variável separada. Mudar o `valor` não muda o array. Para mudar o array, é preciso escrever na posição dele, com o índice:
> >
> > ```js
> > for (let i = 0; i < valores.length; i++) {
> >   valores[i] = valores[i] * 2;
> > }
> > console.log(valores); // [ 2, 4, 6 ]
> > ```

> [!question] 9. O que aparece no console?
> ```js
> let bichos = ["gato", "cão"];
>
> for (let bicho in bichos) {
>   console.log(bicho);
> }
> ```
>
> > [!success]- Resposta
> > `0` e `1`. Com `in`, o laço passa pelas posições, e não pelos valores. Para ver `gato` e `cão`, o certo é `for (let bicho of bichos)`.

> [!question] 10. `for` ou `for...of`?
> Para cada tarefa, qual dos dois laços serve melhor?
>
> 1. Mostrar cada nome de uma lista.
> 2. Mostrar a lista numerada: "1. Ana", "2. Bia".
> 3. Dobrar cada número, mudando o próprio array.
> 4. Somar todos os preços.
>
> > [!success]- Resposta
> > 1. `for...of`: só precisa do valor.
> > 2. `for` pelo índice: o número vem da posição, `i + 1`.
> > 3. `for` pelo índice: para mudar o array, é preciso escrever em `numeros[i]`.
> > 4. `for...of`: só precisa do valor, que vai para o acumulador.

> [!question] 11. Escreva o código.
> Dado o array `let numeros = [3, 8, 10, 7, 4];`, monte um array novo chamado `pares` só com os números pares, usando `for...of` e `push`. Mostre o `pares`.
>
> > [!success]- Resposta
> > ```js
> > let numeros = [3, 8, 10, 7, 4];
> > let pares = [];
> >
> > for (let numero of numeros) {
> >   if (numero % 2 === 0) {
> >     pares.push(numero);
> >   }
> > }
> >
> > console.log(pares); // [ 8, 10, 4 ]
> > ```
> >
> > O `%` da aula 2.3 dá o resto da divisão. Quando o resto da divisão por 2 é 0, o número é par.

> [!question] 12. Escreva o código.
> Mostre os elementos de `let semana = ["seg", "ter", "qua"];` de trás para a frente: `qua`, `ter` e `seg`.
>
> > [!success]- Resposta
> > ```js
> > let semana = ["seg", "ter", "qua"];
> >
> > for (let i = semana.length - 1; i >= 0; i--) {
> >   console.log(semana[i]);
> > }
> > ```
> >
> > O `i` começa no último índice, `semana.length - 1`, que é 2, e desce até o 0. O `for...of` não serviria, porque ele só anda para a frente.

> [!question] 13. Escreva a função.
> Escreva uma função `contarMaioresQue(numeros, limite)` que devolva quantos números do array são maiores que o `limite`. Teste com `contarMaioresQue([10, 25, 8, 40], 10)`, que deve dar 2.
>
> > [!success]- Resposta
> > ```js
> > function contarMaioresQue(numeros, limite) {
> >   let quantos = 0;
> >   for (let numero of numeros) {
> >     if (numero > limite) {
> >       quantos = quantos + 1;
> >     }
> >   }
> >   return quantos;
> > }
> >
> > console.log(contarMaioresQue([10, 25, 8, 40], 10)); // 2
> > console.log(contarMaioresQue([10, 25, 8, 40], 30)); // 1
> > ```
> >
> > O contador é criado dentro da função, mas fora do laço, e o `return` devolve o resultado depois que o laço termina.

> [!question] 14. O que aparece no console?
> ```js
> function zerarPrimeiro(lista) {
>   lista[0] = 0;
> }
>
> let notas = [7, 8, 9];
> zerarPrimeiro(notas);
> console.log(notas);
> ```
>
> > [!success]- Resposta
> > `[ 0, 8, 9 ]`. A função recebe o mesmo array, e não uma cópia. Escrever em `lista[0]` muda o array que o `notas` guarda, fora da função.

> [!question] 15. O que aparece no console?
> ```js
> function contarTirando(lista) {
>   let quantos = 0;
>   while (lista.length > 0) {
>     lista.pop();
>     quantos = quantos + 1;
>   }
>   return quantos;
> }
>
> let fila = ["Ana", "Bia", "Caio"];
> console.log(contarTirando(fila));
> console.log(fila);
> ```
>
> > [!success]- Resposta
> > `3` e depois `[]`. A contagem sai certa, mas cada `pop` tira um elemento do mesmo array que a `fila` guarda, e ele termina vazio. Para só contar, bastava o `fila.length`, ou percorrer com `for...of`, que não muda nada.

> [!question] 16. O que aparece no console?
> ```js
> function dobrar(n) {
>   n = n * 2;
>   return n;
> }
>
> let x = 4;
> console.log(dobrar(x));
> console.log(x);
> ```
>
> > [!success]- Resposta
> > `8` e depois `4`. O `n` recebe o valor 4 e é uma variável à parte. A função dobra o `n` e devolve 8, mas o `x` de fora continua 4. Com um número, a função nunca mexe na variável de quem chamou.

## De onde vêm as palavras

- **[[glossario/percorrer|Percorrer]]**: do latim *percurrere*, formado por *per-*, "através, ao longo", e *currere*, "correr". Percorrer é correr de um lado ao outro, passando por tudo o que está no caminho. Do *percurrere* vem também o francês *parcourir*, "percorrer", e dele o **parkour**, o esporte de atravessar a cidade correndo e saltando os obstáculos. E o latim *currere* é primo distante do inglês *horse*, "cavalo", o bicho que corre.
- **[[glossario/iteracao|Iterar]]**: do latim *iterāre*, "repetir", de *iterum*, "de novo". Iterar é fazer outra vez, e percorrer um array é fazer a mesma coisa outra vez para cada elemento.
- **of**: em inglês, "de". Vem do inglês antigo *of*, "de, para fora de", que era a forma fraca, falada sem força, da palavra *æf*. A forma forte da mesma palavra virou o inglês **off**, "fora, desligado". Então *of* e *off* começaram como uma palavra só, que se separou em duas.
- **[[glossario/para-cada|Cada]]**: do latim *cata*, "por, para cada", que o latim tomou emprestado do grego *katá*. O *for...of* se lê "para cada... de...", e o "cada" desse nome é uma palavra grega que chegou ao português pelo latim.

> [!tip] Para guardar
> - Percorrer é passar por cada elemento do array, um de cada vez, fazendo alguma coisa com cada um.
> - O `console.log(array)` só mostra. Os colchetes à mão só servem para um tamanho fixo. O laço serve para qualquer tamanho.
> - No `for` pelo índice, o `i` vai de 0 até antes do `length`: `i < array.length`, nunca `<=`.
> - O `for...of` entrega direto o valor de cada elemento, sem `i`, e não tem como errar o começo nem o fim.
> - Use o `for` pelo índice quando precisar da posição, quando for mudar os elementos do array ou para andar de outro jeito.
> - O acumulador, o contador e o `push` funcionam igual dentro do laço. O acumulador e o contador são criados antes do laço.
> - Um array pode ser argumento e também pode ser devolvido por uma função.
> - A função recebe o mesmo array, e não uma cópia. Se ela mexer nele, com `push`, `pop` ou `lista[i] = ...`, o array de quem chamou muda junto. Percorrer com `for` ou `for...of` só lê e não muda nada.
> - É `of`, e não `in`. No JavaScript, o `in` entrega as posições.

Fontes: MDN: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in), [Lexical grammar: identifiers with special meanings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers_with_special_meanings), [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · Python: [for Statements](https://docs.python.org/3/tutorial/controlflow.html#for-statements), [enumerate](https://docs.python.org/3/library/functions.html#enumerate) · Wiktionary: [percorrer](https://en.wiktionary.org/wiki/percorrer), [percurrō](https://en.wiktionary.org/wiki/percurro), [currō](https://en.wiktionary.org/wiki/curro), [of](https://en.wiktionary.org/wiki/of), [cada](https://en.wiktionary.org/wiki/cada), [iterō](https://en.wiktionary.org/wiki/itero)
