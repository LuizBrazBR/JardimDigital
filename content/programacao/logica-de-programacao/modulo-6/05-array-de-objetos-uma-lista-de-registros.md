---
title: "6.5 Array de objetos: uma lista de registros"
tags:
  - logica-de-programacao
  - javascript
  - arrays
  - objetos
---

Quinta e última aula do módulo 6. A [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|aula 6.1]] trouxe o array, uma lista de valores parecidos. A [[programacao/logica-de-programacao/modulo-6/04-objetos-descrevendo-uma-coisa-com-chave-e-valor|aula 6.4]] trouxe o objeto, que descreve uma coisa só com várias informações. Esta aula junta os dois num **array de objetos**: uma lista em que cada posição é um objeto completo. É a combinação mais usada na prática.

## Por que juntar os dois

Pense numa lista de tarefas. Um array de textos guarda os títulos, mas não diz quais já foram feitas:

```js
let tarefas = ["estudar JavaScript", "lavar louça", "fazer exercício"];
```

Dá para tentar resolver com um segundo array, posição por posição:

```js
let titulos    = ["estudar JavaScript", "lavar louça", "fazer exercício"];
let concluidas = [true, false, true];
```

O `concluidas[1]` diz se o `titulos[1]` foi feito. Funciona enquanto os dois arrays andarem juntos. Mas basta um `push` num deles sem o outro, ou um `shift` num só, para tudo se desencontrar: a tarefa 1 passa a mostrar se a tarefa 2 foi feita, e nenhum erro avisa. É o mesmo problema da posição que a aula 6.4 resolveu com o objeto.

A solução é guardar as informações de cada tarefa **juntas**, num objeto, e pôr os objetos num array:

```js
let tarefas = [
  { titulo: "estudar JavaScript", concluida: true },
  { titulo: "lavar louça", concluida: false },
  { titulo: "fazer exercício", concluida: true },
  { titulo: "ler um livro", concluida: false }
];
```

Cada objeto é um **[[glossario/registro|registro]]**: o conjunto das informações de uma tarefa. O array é a lista de registros.

### Uma planilha

Um array de objetos se parece com uma planilha. Cada objeto é uma **linha**, e cada propriedade é uma **coluna**:

| (posição) | `titulo` | `concluida` |
|---|---|---|
| 0 | `"estudar JavaScript"` | `true` |
| 1 | `"lavar louça"` | `false` |
| 2 | `"fazer exercício"` | `true` |
| 3 | `"ler um livro"` | `false` |

O próprio JavaScript mostra assim. O `console.table`, um irmão do `console.log`, desenha a tabela:

```js
console.table(tarefas);
// ┌─────────┬──────────────────────┬───────────┐
// │ (index) │ titulo               │ concluida │
// ├─────────┼──────────────────────┼───────────┤
// │ 0       │ 'estudar JavaScript' │ true      │
// │ 1       │ 'lavar louça'        │ false     │
// │ 2       │ 'fazer exercício'    │ true      │
// │ 3       │ 'ler um livro'       │ false     │
// └─────────┴──────────────────────┴───────────┘
```

Para a planilha fazer sentido, todos os objetos precisam ter as mesmas chaves, como todas as linhas têm as mesmas colunas. Se uma tarefa tiver `title` em vez de `titulo`, um laço que lê `tarefa.titulo` vai mostrar `undefined` nela.

Esse jeito de organizar é o mesmo de uma tabela num banco de dados, em que cada linha é um registro. E é também o formato em que os dados costumam chegar de um servidor na internet: uma lista de objetos, escrita num formato de texto chamado JSON.

> [!info]- O que é JSON? (clique para abrir)
> **JSON** é a sigla de *JavaScript Object Notation*, "notação de objetos do JavaScript". É um jeito de escrever dados como **texto**, com a mesma cara dos objetos e arrays do JavaScript, para mandá-los de um programa para outro, por exemplo de um servidor para um site. Uma lista de tarefas chega assim:
>
> ```json
> [
>   { "titulo": "estudar JavaScript", "concluida": true },
>   { "titulo": "lavar louça", "concluida": false }
> ]
> ```
>
> Quando a resposta é uma lista, o array de objetos é a forma mais comum. Muitas vezes, ele vem dentro de um objeto que traz outras informações junto, como o total de itens:
>
> ```json
> { "total": 2, "produtos": [ { "nome": "caneta", "preco": 3 }, { "nome": "lápis", "preco": 2 } ] }
> ```
>
> Aí o caminho até um valor junta tudo o que o módulo mostrou: `resposta.produtos[0].nome` vale `"caneta"`. E, quando a resposta é uma coisa só, como os dados de um usuário, ela vem como um objeto.
>
> O JSON é mais rigoroso que o JavaScript. As chaves vão **sempre** entre aspas duplas, os textos também só com aspas duplas, e não cabem funções, `undefined`, comentários nem vírgula depois do último item.
>
> Como o JSON é texto, o JavaScript precisa convertê-lo antes de usar. O `JSON.parse` transforma o texto em arrays e objetos de verdade, e o `JSON.stringify` faz o caminho contrário:
>
> ```js
> let texto = '[{ "titulo": "ler", "concluida": false }]';
>
> let tarefas = JSON.parse(texto);
> console.log(tarefas[0].titulo);       // ler
> console.log(JSON.stringify(tarefas)); // [{"titulo":"ler","concluida":false}]
> ```

## Lendo: primeiro a posição, depois a chave

```js
console.log(tarefas.length);    // 4
console.log(tarefas[0]);        // { titulo: 'estudar JavaScript', concluida: true }
console.log(tarefas[0].titulo); // estudar JavaScript
```

O `tarefas[0].titulo` se lê da esquerda para a direita, um passo de cada vez:

| Escrito | Vale |
|---|---|
| `tarefas` | o array inteiro, com os quatro objetos |
| `tarefas[0]` | o objeto da posição 0: `{ titulo: 'estudar JavaScript', concluida: true }` |
| `tarefas[0].titulo` | a propriedade `titulo` desse objeto: `"estudar JavaScript"` |

O `[0]` é do array, como na aula 6.1, e o `.titulo` é do objeto, como na aula 6.4. A ordem importa: primeiro se escolhe a linha, depois a coluna. O último registro, com o `length - 1` da aula 6.1, é `tarefas[tarefas.length - 1].titulo`, que vale `"ler um livro"`.

### Mudando e acrescentando

Para marcar uma tarefa como feita, escolha a linha e mude a coluna:

```js
tarefas[1].concluida = true; // "lavar louça" agora está feita
```

Para acrescentar uma tarefa, o `push` da aula 6.2 recebe um objeto inteiro:

```js
tarefas.push({ titulo: "regar as plantas", concluida: false });
console.log(tarefas.length); // 5
```

## Percorrendo

O `for...of` da [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]] funciona do mesmo jeito. A diferença é que, a cada volta, a variável recebe um objeto inteiro, e as propriedades dele se leem com ponto:

```js
let tarefas = [
  { titulo: "estudar JavaScript", concluida: true },
  { titulo: "lavar louça", concluida: false },
  { titulo: "fazer exercício", concluida: true },
  { titulo: "ler um livro", concluida: false }
];

for (let tarefa of tarefas) {
  if (tarefa.concluida) {
    console.log("[x] " + tarefa.titulo);
  } else {
    console.log("[ ] " + tarefa.titulo);
  }
}
// [x] estudar JavaScript
// [ ] lavar louça
// [x] fazer exercício
// [ ] ler um livro
```

| Volta | `tarefa` vale | `tarefa.titulo` | `tarefa.concluida` |
|---|---|---|---|
| 1 | o objeto da posição 0 | `"estudar JavaScript"` | `true` |
| 2 | o objeto da posição 1 | `"lavar louça"` | `false` |
| 3 | o objeto da posição 2 | `"fazer exercício"` | `true` |
| 4 | o objeto da posição 3 | `"ler um livro"` | `false` |

O nome segue o costume da aula 6.3, o singular do array: `tarefa` para `tarefas`. E o `if (tarefa.concluida)` não precisa de `=== true`. O `if` espera um `true` ou um `false`, e a `concluida` já é um deles.

Quando a posição faz falta, como para numerar, o `for` pelo índice continua servindo:

```js
for (let i = 0; i < tarefas.length; i++) {
  console.log(`${i + 1}. ${tarefas[i].titulo}`);
}
// 1. estudar JavaScript
// 2. lavar louça
// ...
```

### Aqui, o `for...of` consegue mudar

Na aula 6.3, o `for...of` não conseguia mudar os elementos do array: `nota = nota + 1` mudava só a variável. Com objetos, mudar uma **propriedade** funciona:

```js
for (let tarefa of tarefas) {
  tarefa.concluida = true;
}

console.log(tarefas[1].concluida); // true: o array mudou
```

É o mesmo motivo do "Array como argumento", da aula 6.3. A variável `tarefa` não recebe uma cópia: recebe o mesmo objeto que está no array. Então mexer numa propriedade dela é mexer no objeto do array.

O que continua sem funcionar é trocar a variável por outro objeto, como em `tarefa = { titulo: "outra", concluida: true }`. Isso só faz a variável `tarefa` guardar um objeto novo, e o array fica como estava. É a diferença que já apareceu no `const` da aula 6.2: mexer no objeto é uma coisa, trocar a variável por outro é outra.

> [!tip] Para não confundir: olhe o lado esquerdo do `=`
> - **Só um nome**, como `nota = nota + 1` ou `tarefa = { ... }`: troca o que a variável guarda, e o array fica como estava.
> - **Um nome com ponto**, como `tarefa.concluida = true`: mexe dentro do objeto, que é o mesmo do array.
> - **Um nome com colchetes**, como `notas[i] = 10`: mexe na posição do array.
>
> A [[programacao/logica-de-programacao/modulo-7/05-mini-projeto-uma-lista-de-tarefas|aula 7.5]] volta a isso com mais calma.

## Contando, buscando, separando e somando

O padrão é o da aula 6.3: percorrer o array e, a cada volta, fazer alguma coisa com as propriedades do objeto da vez. A única novidade é o ponto: em vez de `preco > 10`, aparece `tarefa.concluida` ou `item.preco`.

### Contar

```js
let totalConcluidas = 0;

for (let tarefa of tarefas) {
  if (tarefa.concluida) {
    totalConcluidas = totalConcluidas + 1;
  }
}

console.log(totalConcluidas); // 2
```

É o contador da aula 4.4: só anda quando a tarefa da vez está concluída.

### Buscar pelo título

```js
let buscada = "lavar louça";

for (let tarefa of tarefas) {
  if (tarefa.titulo === buscada) {
    console.log("encontrada, concluída: " + tarefa.concluida);
  }
}
// encontrada, concluída: false
```

A cada volta, o `if` compara o título da tarefa da vez com o texto procurado. Funciona, mas esse laço ainda tem dois pontos fracos:

- **Ele não para quando acha.** "lavar louça" é a segunda tarefa, mas o laço segue até a quarta, comparando à toa.
- **Se o título não existir, nada aparece.** Não sai aviso nenhum, e quem roda o programa fica sem saber se a busca rodou ou não.

O primeiro se resolve com o `break` da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]]. Ele funciona no `for...of` do mesmo jeito que no `for` e no `while`: encerra o laço na hora, e o programa segue depois do `}`.

O segundo pede uma variável que lembre se achou. Ela começa `false` e vira `true` quando o `if` acerta. Depois do laço, é ela que diz o que mostrar:

```js
let buscada = "lavar louça";
let achou = false;

for (let tarefa of tarefas) {
  if (tarefa.titulo === buscada) {
    console.log("encontrada, concluída: " + tarefa.concluida);
    achou = true;
    break; // já achou: não precisa olhar o resto
  }
}

if (!achou) {
  console.log("não encontrada");
}
// encontrada, concluída: false
```

Agora o laço dá só 2 voltas em vez de 4. E com `buscada = "passear"`, o `if` de dentro nunca dá `true`, o `achou` continua `false` até o fim, e aparece `não encontrada`.

> [!warning] Por que não um `else` dentro do laço?
> Parece mais simples escrever o aviso num `else`, junto do `if`:
>
> ```js
> for (let tarefa of tarefas) {
>   if (tarefa.titulo === buscada) {
>     console.log("encontrada, concluída: " + tarefa.concluida);
>     break;
>   } else {
>     console.log("não encontrada");
>   }
> }
> // não encontrada
> // encontrada, concluída: false
> ```
>
> Só que o `else` roda a **cada tarefa que não bate**, e não uma vez no fim. A primeira tarefa é "estudar JavaScript", que não é a buscada, e o aviso aparece antes mesmo de a busca chegar à segunda. Uma volta sozinha não sabe se o título está na lista: só dá para dizer "não encontrada" **depois** de olhar todas. Por isso o aviso fica fora do laço, e a variável `achou` leva a resposta até lá.

Dentro de uma [[glossario/funcao|função]], o `return` da [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]] faria os dois papéis de uma vez: sairia do laço assim que achasse, e a linha depois do laço só rodaria se não achasse. A aula 7.2 volta à busca com mais calma.

### Separar num array novo

Com o `push`, o laço monta a lista do que falta fazer:

```js
let pendentes = [];

for (let tarefa of tarefas) {
  if (!tarefa.concluida) {
    pendentes.push(tarefa.titulo);
  }
}

console.log(pendentes); // [ 'lavar louça', 'ler um livro' ]
```

O `!` é o "não" da [[programacao/logica-de-programacao/modulo-2/05-operadores-logicos|aula 2.5]]: `!tarefa.concluida` é verdadeiro quando a tarefa **não** está concluída. E o `pendentes` recebe só os títulos, e não os objetos inteiros.

### Somar: o carrinho, enfim

Na aula 6.1, a pergunta que abriu o módulo foi: como guardar um carrinho que pode ter 1 produto ou 30? Agora dá para guardar cada produto com o nome, o preço e a quantidade, e calcular o total:

```js
let carrinho = [
  { nome: "arroz", preco: 20, quantidade: 2 },
  { nome: "feijão", preco: 8, quantidade: 3 },
  { nome: "café", preco: 15, quantidade: 1 }
];

let total = 0;
for (let item of carrinho) {
  total = total + item.preco * item.quantidade;
}

console.log(total); // 79
```

| Volta | `item.nome` | `item.preco * item.quantidade` | `total` depois |
|---|---|---|---|
| 1 | arroz | 20 × 2 = 40 | 40 |
| 2 | feijão | 8 × 3 = 24 | 64 |
| 3 | café | 15 × 1 = 15 | 79 |

Com 3 produtos ou com 30, o mesmo laço dá o total certo. O array resolveu o "quantos", e o objeto resolveu o "o quê".

## Os erros mais comuns

**Pedir a propriedade ao array, e não ao objeto.**

```js
console.log(tarefas.titulo); // undefined
```

Quem tem `titulo` são os objetos, e não o array. Falta escolher qual objeto: `tarefas[0].titulo`, ou percorrer com um laço.

**Pedir uma posição que não existe.**

```js
console.log(tarefas[10].titulo); // TypeError: Cannot read properties of undefined (reading 'titulo')
```

Este é um dos erros mais comuns do JavaScript. O `tarefas[10]` não existe e vale `undefined`, como na aula 6.1. E pedir uma propriedade ao `undefined` dá erro. A mensagem quer dizer "não dá para ler propriedades de undefined (lendo 'titulo')". Repare na diferença: pedir uma chave que não existe a um objeto dá `undefined`, sem erro, mas pedir qualquer chave ao próprio `undefined` para o programa. Quando essa mensagem aparecer, confira o índice: muitas vezes é o `length` no lugar do `length - 1`.

**Usar `=` no lugar de `===` no `if`.**

```js
for (let tarefa of tarefas) {
  if (tarefa.concluida = true) { // um = só: atribuição
    totalConcluidas = totalConcluidas + 1;
  }
}
```

É o engano da [[programacao/logica-de-programacao/modulo-2/04-comparacoes|aula 2.4]], e aqui ele estraga os dados. Com um `=` só, o `if` não compara: ele **guarda** `true` na `concluida` de cada tarefa. O contador dá 4, e todas as tarefas passam a constar como feitas. O certo é `===`, ou só `if (tarefa.concluida)`.

**Chaves diferentes de um objeto para outro.** Se um registro tiver `titulo` e outro tiver `título`, com acento, ou `title`, o laço que lê `tarefa.titulo` mostra `undefined` nesse registro. Todos os objetos da lista precisam ter as mesmas chaves, escritas do mesmo jeito.

## Extra: array de arrays, a matriz

> [!note] Esta parte não está no curso
> As aulas do curso não falam de matriz, nem as do módulo 7. Mas ela aparece em quase todo curso de programação e é parente próxima do array de objetos, então fica aqui como complemento.

Um array pode guardar qualquer valor, inclusive outro array. Um array em que cada elemento é um array se chama **[[glossario/matriz|matriz]]**. Ela também é uma tabela, com linhas e colunas, mas as colunas não têm nome: têm posição. Por isso também se diz que ela é um array de **duas dimensões**, ou **bidimensional**: uma posição para a linha e outra para a coluna.

As notas de três alunos em três provas, por exemplo:

```js
let notas = [
  [7, 8, 6],  // aluno 0
  [9, 6, 9],  // aluno 1
  [10, 8, 9]  // aluno 2
];
```

| | prova 0 | prova 1 | prova 2 |
|---|---|---|---|
| **aluno 0** | 7 | 8 | 6 |
| **aluno 1** | 9 | 6 | 9 |
| **aluno 2** | 10 | 8 | 9 |

### Lendo e mudando

Como no array de objetos, primeiro a linha, depois a coluna. Só que as duas são posições, e as duas vão entre colchetes:

```js
console.log(notas[1]);    // [ 9, 6, 9 ]: a linha do aluno 1
console.log(notas[1][2]); // 9: aluno 1, prova 2

notas[0][1] = 9;          // muda a nota do aluno 0 na prova 1
```

| Escrito | Vale |
|---|---|
| `notas` | a matriz inteira |
| `notas[1]` | a linha 1, que é um array: `[9, 6, 9]` |
| `notas[1][2]` | o elemento 2 dessa linha: `9` |

Os tamanhos também vêm em dois passos. O `notas.length` dá quantas linhas existem, 3. O `notas[0].length` dá quantos elementos a linha 0 tem, também 3.

### Percorrendo: laço dentro de laço

Para passar por todos os elementos, um laço anda pelas linhas e, dentro dele, outro anda pelas colunas da linha da vez. São os laços aninhados da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]]:

```js
for (let linha = 0; linha < notas.length; linha++) {
  for (let coluna = 0; coluna < notas[linha].length; coluna++) {
    console.log(`aluno ${linha}, prova ${coluna}: ${notas[linha][coluna]}`);
  }
}
// aluno 0, prova 0: 7
// aluno 0, prova 1: 8
// aluno 0, prova 2: 6
// aluno 1, prova 0: 9
// ...
```

Para cada volta do laço de fora, o de dentro dá todas as suas voltas, como na tabuada da aula 4.5. O laço de dentro usa o `notas[linha].length`, o tamanho da linha da vez, e não um 3 fixo. Assim ele funciona mesmo que as linhas tenham tamanhos diferentes, o que o JavaScript permite.

Com `for...of`, fica mais curto. Aqui, a média de cada aluno:

```js
for (let linhaDeNotas of notas) {
  let soma = 0;
  for (let nota of linhaDeNotas) {
    soma = soma + nota;
  }
  console.log(soma / linhaDeNotas.length);
}
// 7
// 8
// 9
```

O de fora entrega uma linha inteira, um array, e o de dentro percorre esse array.

### Matriz ou array de objetos?

É a mesma escolha da aula 6.4, entre array e objeto, agora para tabelas:

| | Matriz | Array de objetos |
|---|---|---|
| cada linha é | um array | um objeto |
| cada coluna tem | uma posição: 0, 1, 2 | um nome: `titulo`, `concluida` |
| lê um valor com | `notas[1][2]` | `tarefas[1].concluida` |
| serve para | uma grade de valores do mesmo tipo | registros com informações diferentes |

Use a matriz quando todas as células guardam o mesmo tipo de coisa e a posição é o que importa: um tabuleiro de jogo da velha, os assentos de um cinema por fileira e número, uma tabela de notas. Use o array de objetos quando cada coluna é uma informação diferente, que merece um nome: uma lista de tarefas, de contatos, de produtos.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| array de objetos | `[{ titulo: "ler", concluida: false }]` | `[{"titulo": "ler", "concluida": False}]` |
| ler | `tarefas[0].titulo` | `tarefas[0]["titulo"]` |
| percorrer | `for (let tarefa of tarefas)` | `for tarefa in tarefas:` |
| matriz | `[[7, 8], [9, 6]]` | `[[7, 8], [9, 6]]` |
| ler na matriz | `notas[1][0]` | `notas[1][0]` |

```python
tarefas = [
    {"titulo": "estudar JavaScript", "concluida": True},
    {"titulo": "lavar louça", "concluida": False},
]

for tarefa in tarefas:
    if tarefa["concluida"]:
        print("[x] " + tarefa["titulo"])
    else:
        print("[ ] " + tarefa["titulo"])
# [x] estudar JavaScript
# [ ] lavar louça

notas = [[7, 8, 6], [9, 6, 9]]
print(notas[1][2])  # 9
```

- **O Python lê as propriedades só com colchetes e aspas**, como na aula 6.4: `tarefa["titulo"]`.
- **O verdadeiro e o falso vão com maiúscula**: `True` e `False`, como na aula 2.2.
- **A matriz é igual nas duas linguagens**: uma lista de listas, lida com dois pares de colchetes.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let alunos = [
>   { nome: "Ana", nota: 8 },
>   { nome: "Bia", nota: 5 },
>   { nome: "Caio", nota: 9 }
> ];
>
> console.log(alunos.length);
> console.log(alunos[2].nome);
> console.log(alunos[1].nota);
> ```
>
> > [!success]- Resposta
> > `3`, `Caio` e `5`. O array tem três objetos. O `alunos[2]` é o objeto do Caio, e o `.nome` lê o nome dele. O `alunos[1]` é o objeto da Bia, e o `.nota` lê a nota dela.

> [!question] 2. Por que aparece `undefined`?
> ```js
> let alunos = [{ nome: "Ana" }, { nome: "Bia" }];
>
> console.log(alunos.nome);
> ```
>
> > [!success]- Resposta
> > Porque quem tem a chave `nome` são os objetos, e não o array. Falta escolher o objeto: `alunos[0].nome` dá `Ana`. Para ver todos os nomes, é preciso percorrer o array.

> [!question] 3. O que aparece no console?
> ```js
> let lista = [
>   { item: "pão", comprado: false },
>   { item: "leite", comprado: false }
> ];
>
> lista[0].comprado = true;
> console.log(lista[0]);
> console.log(lista[1]);
> ```
>
> > [!success]- Resposta
> > `{ item: 'pão', comprado: true }` e depois `{ item: 'leite', comprado: false }`. O `lista[0]` escolhe o objeto do pão, e o `.comprado = true` muda só a propriedade dele.

> [!question] 4. O que aparece no console?
> ```js
> let contatos = [{ nome: "Ana", fone: "1111" }];
>
> contatos.push({ nome: "Bia", fone: "2222" });
> console.log(contatos.length);
> console.log(contatos[1].fone);
> ```
>
> > [!success]- Resposta
> > `2` e depois `2222`. O `push` põe o objeto da Bia no fim do array, na posição 1.

> [!question] 5. O que aparece no console?
> ```js
> let filmes = [
>   { titulo: "Up", ano: 2009 },
>   { titulo: "Coco", ano: 2017 }
> ];
>
> for (let filme of filmes) {
>   console.log(filme.titulo + " (" + filme.ano + ")");
> }
> ```
>
> > [!success]- Resposta
> > `Up (2009)` e depois `Coco (2017)`. A cada volta, o `filme` recebe um objeto inteiro, e o ponto lê as propriedades dele.

> [!question] 6. O que aparece no console?
> ```js
> let produtos = [
>   { nome: "caneta", estoque: 0 },
>   { nome: "lápis", estoque: 12 },
>   { nome: "borracha", estoque: 0 }
> ];
>
> let esgotados = 0;
> for (let produto of produtos) {
>   if (produto.estoque === 0) {
>     esgotados = esgotados + 1;
>   }
> }
> console.log(esgotados);
> ```
>
> > [!success]- Resposta
> > `2`. O contador só anda quando o estoque do produto da vez é 0: na caneta e na borracha.

> [!question] 7. Escreva o código.
> Com o array abaixo, monte um array `aprovados` só com os **nomes** de quem tirou 7 ou mais, e mostre-o.
>
> ```js
> let alunos = [
>   { nome: "Ana", nota: 8 },
>   { nome: "Bia", nota: 5 },
>   { nome: "Caio", nota: 9 }
> ];
> ```
>
> > [!success]- Resposta
> > ```js
> > let aprovados = [];
> >
> > for (let aluno of alunos) {
> >   if (aluno.nota >= 7) {
> >     aprovados.push(aluno.nome);
> >   }
> > }
> >
> > console.log(aprovados); // [ 'Ana', 'Caio' ]
> > ```
> >
> > O `push` recebe `aluno.nome`, e não o `aluno`, porque o array deve guardar só os nomes.

> [!question] 8. Escreva o código.
> Calcule o total do pedido abaixo, somando `preco * quantidade` de cada item.
>
> ```js
> let pedido = [
>   { nome: "suco", preco: 6, quantidade: 2 },
>   { nome: "pastel", preco: 9, quantidade: 3 }
> ];
> ```
>
> > [!success]- Resposta
> > ```js
> > let total = 0;
> >
> > for (let item of pedido) {
> >   total = total + item.preco * item.quantidade;
> > }
> >
> > console.log(total); // 39
> > ```
> >
> > O suco dá 6 × 2 = 12, e o pastel, 9 × 3 = 27. 12 + 27 = 39.

> [!question] 9. Por que dá erro?
> ```js
> let tarefas = [
>   { titulo: "ler", concluida: false },
>   { titulo: "correr", concluida: true }
> ];
>
> console.log(tarefas[2].titulo);
> ```
>
> > [!success]- Resposta
> > Dá `TypeError: Cannot read properties of undefined (reading 'titulo')`. O array tem só as posições 0 e 1, então o `tarefas[2]` vale `undefined`, e pedir uma propriedade ao `undefined` dá erro. O último é `tarefas[tarefas.length - 1]`, que é o `tarefas[1]`.

> [!question] 10. O que há de errado? O que aparece no console?
> ```js
> let tarefas = [
>   { titulo: "ler", concluida: false },
>   { titulo: "correr", concluida: false }
> ];
>
> let feitas = 0;
> for (let tarefa of tarefas) {
>   if (tarefa.concluida = true) {
>     feitas = feitas + 1;
>   }
> }
> console.log(feitas);
> console.log(tarefas[0].concluida);
> ```
>
> > [!success]- Resposta
> > Aparecem `2` e `true`, mas nenhuma tarefa estava feita. O `if` tem um `=` só, que não compara: ele guarda `true` na `concluida` de cada tarefa. Por isso o contador anda nas duas voltas, e os dados ficam errados. O certo é `if (tarefa.concluida === true)`, ou só `if (tarefa.concluida)`.

> [!question] 11. O que aparece no console?
> ```js
> let tarefas = [
>   { titulo: "ler", concluida: false },
>   { titulo: "correr", concluida: false }
> ];
>
> for (let tarefa of tarefas) {
>   tarefa.concluida = true;
> }
> console.log(tarefas[0].concluida);
> ```
>
> > [!success]- Resposta
> > `true`. A variável `tarefa` recebe o mesmo objeto que está no array, e não uma cópia. Mudar uma propriedade dela muda o objeto do array. É diferente do `nota = nota + 1` da aula 6.3, que trocava a variável inteira.

> [!question] 12. Escreva a função.
> Escreva uma função `contarConcluidas(tarefas)` que devolva quantas tarefas do array estão concluídas.
>
> > [!success]- Resposta
> > ```js
> > function contarConcluidas(tarefas) {
> >   let quantas = 0;
> >   for (let tarefa of tarefas) {
> >     if (tarefa.concluida) {
> >       quantas = quantas + 1;
> >     }
> >   }
> >   return quantas;
> > }
> >
> > console.log(contarConcluidas([
> >   { titulo: "ler", concluida: true },
> >   { titulo: "correr", concluida: false }
> > ])); // 1
> > ```
> >
> > O contador nasce dentro da função e fora do laço, como no exercício 13 da aula 6.3.

> [!question] 13. O que aparece no console? (extra: matriz)
> ```js
> let m = [
>   [1, 2, 3],
>   [4, 5, 6]
> ];
>
> console.log(m[0][2]);
> console.log(m[1][0]);
> console.log(m.length);
> console.log(m[0].length);
> ```
>
> > [!success]- Resposta
> > `3`, `4`, `2` e `3`. O `m[0][2]` é a linha 0, posição 2. O `m[1][0]` é a linha 1, posição 0. A matriz tem 2 linhas, e a linha 0 tem 3 elementos.

> [!question] 14. O que aparece no console? (extra: matriz)
> ```js
> let m = [
>   [1, 2],
>   [3, 4]
> ];
>
> let soma = 0;
> for (let linha of m) {
>   for (let valor of linha) {
>     soma = soma + valor;
>   }
> }
> console.log(soma);
> ```
>
> > [!success]- Resposta
> > `10`. O laço de fora entrega cada linha, e o de dentro soma os valores dela: 1 + 2 + 3 + 4 = 10.

> [!question] 15. Matriz ou array de objetos? (extra)
> Para cada caso, qual dos dois serve melhor?
>
> 1. Um tabuleiro de jogo da velha.
> 2. Uma agenda de contatos, cada um com nome, telefone e e-mail.
> 3. Os assentos de um cinema, por fileira e número, marcando se estão ocupados.
> 4. Os produtos de uma loja, cada um com nome, preço e estoque.
>
> > [!success]- Resposta
> > 1. Matriz: uma grade 3 × 3, em que todas as casas guardam o mesmo tipo de coisa.
> > 2. Array de objetos: cada contato tem informações diferentes, que merecem nome.
> > 3. Matriz: fileiras e números são posições, e cada assento guarda o mesmo tipo de coisa, `true` ou `false`.
> > 4. Array de objetos: nome, preço e estoque são informações diferentes.

## De onde vêm as palavras

- **[[glossario/registro|Registro]]**: do latim medieval *registrum*, que veio do latim tardio *regesta*, "lista, coisas registradas", e este do latim *regerere*, "levar de volta; registrar", formado por *re-*, "de volta", e *gerere*, "levar". Registrar é levar uma informação para um livro, onde ela fica guardada. Cada objeto do array é um registro: as informações de uma tarefa ou de um produto, anotadas juntas.
- **[[glossario/matriz|Matriz]]**: do latim *mātrīx*, "ventre; fonte, origem", formado a partir de *māter*, "mãe". O nome matemático foi dado em 1850 pelo inglês James Joseph Sylvester. Ele via a matriz como a origem de onde nascem vários cálculos, e no ano seguinte escreveu sobre eles saindo "do ventre de uma mãe comum". O mesmo sentido de origem está na **matriz** de uma empresa, a sede de onde saem as filiais.
- **Coluna**: do latim *columna*, "pilar". A coluna da planilha fica em pé, como um pilar.
- **Linha**: do latim *līnea*, "fio de linho", de *līnum*, "linho". Antes de ser um traço, a linha era um fio, e daí veio o sentido de uma fileira de coisas, uma atrás da outra.

> [!tip] Para guardar
> - Um array de objetos é uma lista de registros: cada posição guarda um objeto completo.
> - É como uma planilha: cada objeto é uma linha, e cada propriedade é uma coluna. Todos os objetos devem ter as mesmas chaves.
> - Para ler, primeiro a posição, depois a chave: `tarefas[0].titulo`.
> - No `for...of`, a variável recebe um objeto inteiro, e as propriedades se leem com ponto: `tarefa.titulo`.
> - Mudar uma propriedade dentro do `for...of` muda o objeto do array, porque a variável recebe o mesmo objeto.
> - Contar, buscar, separar e somar são os padrões da aula 6.3, com o ponto lendo a propriedade da vez.
> - Na busca, o `break` para o laço assim que acha. O "não encontrada" fica depois do laço, guiado por uma variável que começa `false`, e não num `else` lá dentro.
> - `tarefas[10].titulo`, com uma posição que não existe, dá `TypeError: Cannot read properties of undefined`.
> - Extra: uma matriz é um array de arrays. Lê-se com dois colchetes, `notas[1][2]`, e percorre-se com um laço dentro do outro.

Fontes: MDN: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects), [Indexed collections: multi-dimensional arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#multi-dimensional_arrays), [console.table()](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static) · Python: [Nested List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions), [Dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) · Wikipedia: [Matrix (mathematics)](https://en.wikipedia.org/wiki/Matrix_(mathematics)) · Wiktionary: [registro](https://en.wiktionary.org/wiki/registro), [regerō](https://en.wiktionary.org/wiki/regero), [matriz](https://en.wiktionary.org/wiki/matriz), [mātrīx](https://en.wiktionary.org/wiki/matrix), [columna](https://en.wiktionary.org/wiki/columna), [līnea](https://en.wiktionary.org/wiki/linea)
