---
title: "7.3 Colocando em ordem: a ideia de ordenação"
tags:
  - logica-de-programacao
  - javascript
  - arrays
  - algoritmos
---

Terceira aula do módulo 7. A [[programacao/logica-de-programacao/modulo-7/02-algoritmos-em-arrays-buscar-contar-e-achar-o-maior|aula 7.2]] ensinou a achar o menor valor de um array. Esta mostra que, repetindo essa receita do jeito certo, dá para pôr uma lista inteira em ordem. Depois vem o `sort()`, o método pronto do JavaScript para ordenar, e a pegadinha que ele esconde quando a lista tem números.

**[[glossario/ordenacao|Ordenar]]** é mudar os elementos de lugar até eles seguirem um critério: as notas da menor para a maior, os nomes em ordem alfabética, as tarefas pela prioridade. Da menor para a maior se chama ordem **crescente**. Da maior para a menor, ordem **decrescente**.

## Ordenação por seleção: a ideia

### Começando com cartas na mesa

Esqueça o código por um momento. Na mesa, há quatro cartas numeradas, em fila:

```
4   1   3   2
```

Você quer deixá-las em ordem crescente. Antes de mexer em qualquer carta, pense em como a fila vai ficar quando estiver pronta:

- no **1º lugar**, a menor carta de todas;
- no **2º lugar**, a menor das que sobraram;
- no **3º lugar**, a menor das que sobraram depois disso;
- e assim por diante.

Esse é o raciocínio inteiro. Em vez de tentar arrumar tudo de uma vez, você resolve **um lugar de cada vez**, da esquerda para a direita. E cada lugar se resolve com a receita que a aula 7.2 já mostrou: achar o menor.

### Passo a passo

**Passo 1: quem fica no 1º lugar?** Você olha as quatro cartas e acha a menor: o 1. Ela precisa ir para o 1º lugar, mas ele está ocupado pelo 4. Então as duas cartas trocam de lugar: o 1 vai para a frente, e o 4 vai para onde o 1 estava.

```
4   1   3   2     antes
1   4   3   2     depois de trocar o 1 com o 4
```

O 1º lugar está resolvido de vez. Nenhuma carta é menor que o 1, então nada vai tirá-lo dali, e ele sai da disputa. Daqui em diante, uma barra separa as duas partes da fila:

```
1 | 4   3   2
```

À esquerda da barra, o que já está no lugar certo. À direita, o trecho que ainda falta arrumar.

**Passo 2: quem fica no 2º lugar?** Agora você só olha o que está à direita da barra: 4, 3 e 2. A menor é o 2. O 2º lugar está com o 4, então o 2 e o 4 trocam:

```
1 | 4   3   2     antes
1   2 | 3   4     depois de trocar o 2 com o 4
```

A barra andou uma casa. O 2º lugar também está resolvido.

**Passo 3: quem fica no 3º lugar?** Sobraram o 3 e o 4. O menor é o 3, e ele já está no 3º lugar. Não há nada para trocar.

```
1   2   3 | 4
```

**E o 4?** Sobrou sozinho. Todas as outras cartas já foram escolhidas por serem menores, então ele é o maior, e já está no último lugar. Não há com quem comparar. Por isso o processo para quando sobra um item só: com 4 cartas, bastam 3 passos.

| Passo | Lugar a resolver | Trecho que ainda falta | Menor do trecho | Troca | Como fica a fila |
|---|---|---|---|---|---|
| 1 | 1º | 4, 1, 3, 2 (todas) | 1 | o 1 com o 4 | 1, 4, 3, 2 |
| 2 | 2º | 4, 3, 2 | 2 | o 2 com o 4 | 1, 2, 3, 4 |
| 3 | 3º | 3, 4 | 3 | nenhuma, já está no lugar | 1, 2, 3, 4 |

A cada passo, a parte resolvida cresce uma casa, e o trecho que falta diminui uma. Quando o trecho que falta tem um item só, acabou.

### Trocar não bagunça?

Uma dúvida comum no passo 1: o 4 foi parar no meio da fila, onde o 1 estava. Isso não estraga nada?

Não estraga, porque o trecho à direita da barra **já estava fora de ordem**. O 4 só mudou de lugar dentro dele, e os próximos passos vão cuidar do 4 também. A troca é o jeito mais simples de pôr o menor no lugar: ninguém precisa abrir espaço nem empurrar as outras cartas uma casa para o lado. São só duas cartas mudando de lugar.

### Por que "por seleção"

Porque cada passo **seleciona**, ou seja, escolhe, o menor do trecho que falta, e o põe no próximo lugar. Em inglês, o nome é *selection sort*.

## A ideia em código

Se as cartas ficaram claras, o código é a mesma coisa escrita para o computador. Ele precisa de duas peças.

### Peça 1: achar a posição do menor

A receita do campeão, na aula 7.2, guardava o **valor** do menor. Aqui isso não basta: para trocar o menor de lugar, é preciso saber **onde** ele está. Por isso o campeão vira uma posição, como na `posicaoDe` da aula 7.2. E a procura começa no início do trecho que falta, e não sempre no 0:

```js
function posicaoDoMenor(lista, inicio) {
  let posMenor = inicio; // o primeiro do trecho começa como campeão

  for (let i = inicio + 1; i < lista.length; i++) {
    if (lista[i] < lista[posMenor]) {
      posMenor = i; // achou um menor: guarda a posição dele
    }
  }

  return posMenor;
}

const numeros = [4, 1, 3, 2];

console.log(posicaoDoMenor(numeros, 0)); // 1
console.log(posicaoDoMenor(numeros, 2)); // 3
```

Na primeira chamada, a procura olha o array todo, e o menor, o 1, está na posição 1. Na segunda, ela começa na posição 2 e só olha o 3 e o 2. O menor desse trecho é o 2, que está na posição 3.

A comparação, `lista[i] < lista[posMenor]`, usa os valores, mas o que se guarda é a posição. É como no "achar quem é o maior" da aula 7.2, que comparava a nota e guardava o aluno inteiro.

E o `for` desta função tem um começo diferente: `let i = inicio + 1`. Vale ler com calma.

**O `i` pode começar de qualquer valor.** Quase todos os `for` até aqui começavam num número escrito direto, como 0 ou 1. Mas a primeira parte dos parênteses aceita qualquer valor, até uma conta. A aula 6.3 já fez isso, quando o laço de trás para a frente começou em `frutas.length - 1`. Aqui, a conta usa o `inicio`, o parâmetro que a função recebeu. Assim, quem chama a função escolhe onde a procura começa: `posicaoDoMenor(numeros, 0)` começa no 0, e `posicaoDoMenor(numeros, 2)` começa no 2.

**O `+ 1` não soma a cada volta.** Como a aula 4.3 mostrou, a primeira parte do `for` roda uma vez só, antes de tudo. Então `inicio + 1` é só a conta que dá o primeiro valor do `i`: com `inicio` valendo 0, o `i` começa em 1. Depois disso, quem faz o `i` andar, de volta em volta, é o `i++`, como em qualquer `for`.

**Por que uma casa depois do `inicio`?** Porque a posição `inicio` já é a campeã, desde a linha `let posMenor = inicio`. Se o `i` começasse no próprio `inicio`, a primeira volta compararia o campeão com ele mesmo, como `4 < 4`. Um número nunca é menor que ele mesmo, então essa comparação daria `false` sempre. Não estragaria o resultado, mas seria uma volta à toa.

Siga a primeira chamada, `posicaoDoMenor(numeros, 0)`, com `numeros` valendo `[4, 1, 3, 2]`:

| Momento | `i` | `lista[i] < lista[posMenor]`? | `posMenor` depois |
|---|---|---|---|
| antes do laço | ainda não existe | | 0 (o 4) |
| 1ª volta | 1, que vem de `0 + 1` | `1 < 4`: sim | 1 (o 1) |
| 2ª volta | 2, pelo `i++` | `3 < 1`: não | 1 |
| 3ª volta | 3, pelo `i++` | `2 < 1`: não | 1 |
| fim | 4, pelo `i++` | a condição `i < lista.length` vira `4 < 4`, que dá `false`, e o laço acaba | devolve 1 |

Repare em duas coisas:

- **O `+ 1` só aparece no começo.** Da 2ª volta em diante, quem soma é o `i++`.
- **Cada elemento é comparado com o campeão, e não com o vizinho.** Na 3ª volta, o 2 é comparado com o 1, que é o campeão até ali, e não com o 3, que está do lado dele.

Na segunda chamada, `posicaoDoMenor(numeros, 2)`, o campeão começa na posição 2, o 3, e o `i` começa em `2 + 1`, que é 3. Há uma volta só: `2 < 3` dá sim, e o `posMenor` vira 3. O `i++` leva o `i` para 4, e o laço acaba.

### Peça 2: trocar dois elementos de lugar

Parece fácil, mas tem um truque. Veja esta tentativa de trocar o 1º e o 2º elemento:

```js
const par = [1, 2];

par[0] = par[1]; // o 1º lugar recebe o 2
par[1] = par[0]; // o 2º lugar recebe o que está no 1º... que agora é o 2

console.log(par); // [2, 2]
```

O 1 sumiu. Na primeira linha, o 2 foi escrito por cima do 1, e o 1 se perdeu antes de ir para o outro lugar.

É como trocar o que está em dois copos, um com suco e outro com água. Não dá para despejar um no outro direto. Você precisa de um terceiro copo, vazio, para segurar um deles enquanto isso. No código, o terceiro copo é uma variável:

```js
const par = [1, 2];

const guardado = par[0]; // 1. o terceiro copo segura o 1
par[0] = par[1];         // 2. o 1º lugar recebe o 2
par[1] = guardado;       // 3. o 2º lugar recebe o 1 que estava guardado

console.log(par); // [2, 1]
```

### Juntando as peças

```js
function ordenarPorSelecao(lista) {
  // um passo para cada lugar, menos o último
  for (let lugar = 0; lugar < lista.length - 1; lugar++) {
    const posMenor = posicaoDoMenor(lista, lugar);

    // troca o menor com quem está no lugar
    const guardado = lista[lugar];
    lista[lugar] = lista[posMenor];
    lista[posMenor] = guardado;
  }
}

const numeros = [4, 1, 3, 2];

ordenarPorSelecao(numeros);

console.log(numeros); // [1, 2, 3, 4]
```

Cada volta do `for` é um passo das cartas. O `lugar` é a posição que está sendo resolvida, e é também onde fica a barra: tudo o que está antes do `lugar` já está pronto.

| Volta | `lugar` | Trecho olhado | `posMenor` | Troca | `numeros` depois |
|---|---|---|---|---|---|
| 1 | 0 | 4, 1, 3, 2 | 1 | `numeros[0]` com `numeros[1]` | `[1, 4, 3, 2]` |
| 2 | 1 | 4, 3, 2 | 3 | `numeros[1]` com `numeros[3]` | `[1, 2, 3, 4]` |
| 3 | 2 | 3, 4 | 2 | `numeros[2]` com ele mesmo | `[1, 2, 3, 4]` |

Na terceira volta, o menor já está no lugar, então `posMenor` é igual a `lugar`, e a troca tira o 3 e põe o mesmo 3 de volta. Não muda nada, mas também não atrapalha.

Três detalhes:

- **O laço vai até `lista.length - 1`**, e não até `lista.length`, porque o último lugar se resolve sozinho, como o 4 das cartas. Com 4 elementos, o `lugar` vale 0, 1 e 2: três passos.
- **São dois laços, um dentro do outro**, como os [[glossario/laco-aninhado|laços aninhados]] da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]]. O de fora escolhe o lugar. O de dentro, que está na `posicaoDoMenor`, procura o menor.
- **A função não tem `return`.** Ela mexe direto no array que recebeu, escrevendo nas posições. Como a [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]] mostrou, escrever numa posição, como em `lista[lugar] = ...`, muda o array de quem chamou. Por isso, depois de `ordenarPorSelecao(numeros)`, o próprio `numeros` está em ordem.

### Quanto trabalho isso dá?

Com as 4 cartas, o passo 1 faz 3 comparações, o passo 2 faz 2, e o passo 3 faz 1. São 6 ao todo. Com listas maiores, a conta cresce depressa:

| Itens na lista | Comparações |
|---|---|
| 4 | 3 + 2 + 1 = 6 |
| 10 | 45 |
| 100 | 4.950 |
| 1.000 | 499.500 |

De 100 para 1.000 itens, a lista ficou 10 vezes maior, e as comparações ficaram cerca de 100 vezes mais numerosas. É o "repete bastante trabalho" da aula: cada passo olha de novo quase tudo o que sobrou.

Existem jeitos mais espertos de ordenar, que comparam muito menos, e o `sort()` do JavaScript usa um deles. Por isso, no dia a dia, quase ninguém escreve a ordenação por seleção. Ela serve para entender a ideia, porque é a mais fácil de acompanhar.

## Na prática: o método `sort()`

O JavaScript já tem a ordenação pronta: o [[glossario/metodo|método]] `sort()`, que em inglês quer dizer "ordenar". Com textos, ele funciona direto:

```js
const nomes = ["Carlos", "Ana", "Bruno"];

nomes.sort();

console.log(nomes); // ["Ana", "Bruno", "Carlos"]
```

Duas coisas para notar:

- **O `sort()` muda o próprio array**, como o `push` e o `pop` da [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]]. Depois da linha `nomes.sort()`, o `nomes` já está em ordem. É o mesmo que a `ordenarPorSelecao` fazia.
- **Ele também devolve o array ordenado.** Por isso dá para escrever `console.log(numeros.sort())`, como no exemplo a seguir: o `sort()` ordena e entrega o resultado para o `console.log` mostrar.

### A pegadinha: o `sort()` compara como texto

Com números, o resultado assusta:

```js
const numeros = [10, 1, 2];

console.log(numeros.sort()); // [1, 10, 2]
```

O 10 ficou antes do 2. A explicação é o comentário da aula: **por [[glossario/padrao|padrão]], o `sort()` compara os itens como se fossem texto.** "Por padrão" quer dizer "quando você não diz nada". Sem outra instrução, o `sort()` transforma cada número em texto, `"10"`, `"1"` e `"2"`, e põe esses textos em ordem de dicionário.

E a ordem de dicionário não olha o tamanho do número. Ela olha um caractere por vez, da esquerda para a direita:

1. Compara o primeiro caractere das duas palavras. Se forem diferentes, está decidido, e o resto não importa: "abacaxi" vem antes de "bola", porque o **a** vem antes do **b**, e o tamanho das palavras não conta.
2. Se forem iguais, passa para o segundo caractere, e assim por diante.
3. Se uma palavra acabar antes, a mais curta vem primeiro: "mar" vem antes de "mares".

Aplicando isso aos três números:

| Comparação | O que decide | Quem vem antes |
|---|---|---|
| `"1"` e `"10"` | o 1º caractere é igual, e o `"1"` acaba antes | o `"1"`, como "mar" antes de "mares" |
| `"10"` e `"2"` | 1º caractere: `1` contra `2`, e o `1` vem antes | o `"10"`, e o `0` nem chega a ser olhado |
| `"1"` e `"2"` | 1º caractere: `1` contra `2` | o `"1"` |

Resultado: `"1"`, `"10"`, `"2"`. Para o dicionário, o 10 é só "uma palavra que começa com 1", e por isso fica junto do 1, antes de qualquer coisa que comece com 2.

Se ajudar, troque cada algarismo por uma letra: 0 vira **a**, 1 vira **b**, 2 vira **c**. Os números viram as palavras "b" (o 1), "ba" (o 10) e "c" (o 2). Em ordem de dicionário: b, ba, c. Ou seja: 1, 10, 2.

Por que o JavaScript faz assim? Porque o `sort()` precisa funcionar com qualquer array, e quase qualquer coisa pode virar texto. Comparar como texto foi o padrão escolhido. Com números, então, é você quem precisa dizer como comparar.

E o erro pode ficar escondido. Quando todos os números têm a mesma quantidade de algarismos, a ordem de texto dá o mesmo resultado que a ordem de número, e tudo parece certo:

```js
console.log([3, 1, 2].sort());       // [1, 2, 3]: certo, por sorte
console.log([5, 40, 100, 1].sort()); // [1, 100, 40, 5]: errado
```

É parecido com o campeão começando em 0, na aula 7.2: nenhuma mensagem de erro, só uma resposta errada.

## Dizendo ao `sort()` como comparar

### A pergunta por trás de toda ordenação

Volte às cartas. A ordenação por seleção inteira foi feita de uma pergunta só, repetida muitas vezes: **destes dois, qual vem primeiro?** No código, a pergunta era o `if (lista[i] < lista[posMenor])`.

O `sort()` também vive dessa pergunta. Ele pega dois itens do array, pergunta qual vem primeiro, muda os dois de lugar se precisar, e repete até tudo estar em ordem. Sem instrução, ele responde pela ordem de texto. Para números, você entrega a ele uma função que responde do jeito certo. Essa função se chama **[[glossario/funcao-de-comparacao|função de comparação]]**.

### Como a função responde

A função recebe dois itens, que se costuma chamar de `a` e `b`, e responde com um **número**. O `sort()` só olha o **sinal** desse número:

| A função devolve | Quer dizer | O que o `sort()` faz |
|---|---|---|
| um número negativo, como -1 ou -9 | o `a` vem antes | põe o `a` antes do `b` |
| um número positivo, como 1 ou 8 | o `b` vem antes | põe o `b` antes do `a` |
| zero | empate | deixa os dois como estão |

Por que um número, e não `true` ou `false`? Porque são **três** respostas possíveis: o `a` vem antes, o `b` vem antes, ou tanto faz. Um [[glossario/booleano|booleano]] só tem duas.

### A versão longa, com `if`

Escrita só com o que o curso já mostrou, a função de comparação para números fica assim:

```js
function compararNumeros(a, b) {
  if (a < b) {
    return -1; // a é menor: o a vem antes
  }
  if (a > b) {
    return 1; // a é maior: o b vem antes
  }
  return 0; // iguais: empate
}

const numeros = [10, 1, 2];

numeros.sort(compararNumeros);

console.log(numeros); // [1, 2, 10]
```

Repare na linha do `sort`: é `compararNumeros` **sem parênteses**. Com parênteses, `compararNumeros()`, você estaria chamando a função ali mesmo, na hora, sem `a` nem `b`. Sem parênteses, você está **entregando** a função ao `sort()`, para ele chamar quando precisar. É a diferença entre fazer uma ligação e deixar o seu número de telefone para alguém ligar depois.

Uma função entregue a outra, para essa outra chamar depois, tem um nome: **[[glossario/callback|callback]]**, do inglês *call back*, "ligar de volta". A `compararNumeros` é o número de telefone deixado com o `sort()`: ele liga de volta para ela cada vez que precisa comparar dois itens.

### De onde vêm o `a` e o `b`?

Quem escolhe é o `sort()`. Você nunca chama a `compararNumeros`: ele chama, quantas vezes precisar, cada vez com um par diferente. Dá para espiar pondo um `console.log` dentro dela:

```js
function compararNumeros(a, b) {
  console.log("comparando", a, "com", b);
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const numeros = [10, 1, 2];

numeros.sort(compararNumeros);
```

No Node e no Chrome, aparece:

```
comparando 1 com 10
comparando 2 com 1
comparando 2 com 10
comparando 2 com 1
```

Repare que o `a` nem sempre é o que está mais à esquerda no array: na primeira chamada, o `a` é o 1, e o 10 é o `b`. Os pares e a ordem das perguntas são escolha do `sort()`, que às vezes até repete uma pergunta, e outro navegador pode fazer outras. Não importa: a sua função só precisa responder certo para qualquer par que receber.

### O atalho: `a - b`

A versão com `if` funciona, mas existe um jeito mais curto de chegar ao mesmo sinal: a subtração.

```js
function compararNumeros(a, b) {
  return a - b;
}
```

Por que funciona? Veja o que a conta dá em cada caso:

| `a` | `b` | `a - b` | Sinal | Quem vem antes |
|---|---|---|---|---|
| 1 | 10 | -9 | negativo | o `a`, o 1 |
| 10 | 2 | 8 | positivo | o `b`, o 2 |
| 5 | 5 | 0 | zero | empate |

Se o `a` é menor que o `b`, `a - b` dá negativo, e o `a` vem antes. Se o `a` é maior, dá positivo, e o `b` vem antes. Se são iguais, dá zero. É exatamente o que a versão com `if` respondia. O tamanho do número não importa: para o `sort()`, -9 e -1 querem dizer a mesma coisa, porque ele só olha o sinal.

### A mesma função, cada vez mais curta

Agora dá para ler a linha da aula, `numeros.sort((a, b) => a - b)`. Ela é a mesma função de comparação, escrita de um jeito mais curto. Dá para chegar lá em três passos.

**1. Com nome, separada da chamada.** Como até agora:

```js
function compararNumeros(a, b) {
  return a - b;
}

numeros.sort(compararNumeros);
```

**2. Sem nome, escrita dentro da chamada.** Se a função só vai ser usada ali, ela não precisa de nome. Dá para escrevê-la direto no lugar onde seria entregue:

```js
numeros.sort(function (a, b) {
  return a - b;
});
```

Uma função sem nome se chama **função anônima**. O `sort()` a recebe do mesmo jeito que recebia a `compararNumeros`. A diferença é que ela foi escrita ali mesmo, dentro dos parênteses do `sort`.

**3. Com a seta `=>`.** O JavaScript tem uma forma ainda mais curta de escrever uma função: a ***[[glossario/arrow-function|arrow function]]***, "função de seta".

```js
numeros.sort((a, b) => a - b);
```

O que mudou, peça por peça:

| Na forma longa | Na forma com seta |
|---|---|
| `function (a, b)` | `(a, b)`: a palavra `function` sai, e ficam só os parâmetros |
| `{ return a - b; }` | `=> a - b`: a seta aponta para o resultado |

Quando o corpo da função é uma conta só, as chaves e o `return` podem sair, e o resultado da conta é devolvido sozinho. Dá para ler `(a, b) => a - b` em voz alta assim: **"recebe `a` e `b`, devolve `a - b`"**.

A [[programacao/logica-de-programacao/modulo-2/04-comparacoes|aula 2.4]] avisou que o `=>` "existe, mas é outra coisa, bem mais avançada". Era isto: a seta que cria uma função curta.

> [!warning] Com chaves, o `return` volta
> Se você puser chaves depois da seta, o `return` precisa ser escrito, como numa função comum:
>
> ```js
> numeros.sort((a, b) => { return a - b; }); // ordena
> numeros.sort((a, b) => { a - b; });        // não ordena
> ```
>
> Na segunda linha, a conta é feita, mas nada a devolve. A função devolve `undefined`, que o `sort()` trata como empate em todas as comparações, e a lista fica como estava.

### Do maior para o menor

Para a ordem decrescente, basta inverter a conta: `b - a`.

```js
const notas = [7, 10, 4];

notas.sort((a, b) => b - a);

console.log(notas); // [10, 7, 4]
```

| `a` | `b` | `b - a` | Sinal | Quem vem antes |
|---|---|---|---|---|
| 7 | 10 | 3 | positivo | o `b`, o 10 |
| 10 | 4 | -6 | negativo | o `a`, o 10 |

Nos dois casos, o maior fica com o lugar da frente. Para lembrar: com `a - b`, os valores sobem da esquerda para a direita (crescente). Com `b - a`, descem (decrescente).

### Ordenando objetos: o ranking

Num array de objetos, a função compara uma propriedade, como a aula 7.2 fez para achar o melhor aluno:

```js
const alunos = [
  { nome: "Ana", nota: 8 },
  { nome: "Bia", nota: 5 },
  { nome: "Caio", nota: 9 },
  { nome: "Duda", nota: 6 }
];

alunos.sort((a, b) => b.nota - a.nota);

for (const aluno of alunos) {
  console.log(aluno.nome + ": " + aluno.nota);
}
// Caio: 9
// Ana: 8
// Duda: 6
// Bia: 5
```

Aqui, o `a` e o `b` são alunos inteiros. A conta usa as notas, `b.nota - a.nota`, mas quem muda de lugar é o objeto todo, com o nome junto. É o ranking de notas, da maior para a menor, do começo da aula.

> [!info]- E com letras maiúsculas e acentos? (clique para abrir)
> Lá em cima, a ordem de texto foi comparada à de um dicionário. Para algarismos, a comparação é exata. Com letras, há duas diferenças. Por dentro, cada caractere tem um número, e o `sort()` compara esses números. Neles, todas as maiúsculas vêm antes de todas as minúsculas, e as letras com acento vêm depois de todas as letras sem acento:
>
> ```js
> console.log(["Zeca", "Élio", "ana", "Bia"].sort());
> // ["Bia", "Zeca", "ana", "Élio"]
> ```
>
> Para a ordem de um dicionário de verdade, existe o método `localeCompare`, que compara dois textos seguindo as regras de um idioma. Ele devolve um número negativo, positivo ou zero, justamente o que o `sort()` espera de uma função de comparação:
>
> ```js
> console.log(["Zeca", "Élio", "ana", "Bia"].sort((a, b) => a.localeCompare(b)));
> // ["ana", "Bia", "Élio", "Zeca"]
> ```

> [!info]- E se eu quiser guardar a ordem original? (clique para abrir)
> O `sort()` muda o próprio array, e a ordem antiga se perde. Guardar o resultado em outra variável não ajuda, porque os dois nomes apontam para o mesmo array:
>
> ```js
> const original = [3, 1, 2];
> const ordenada = original.sort((a, b) => a - b);
>
> console.log(ordenada); // [1, 2, 3]
> console.log(original); // [1, 2, 3]: o original também mudou
> ```
>
> Para ganhar uma cópia ordenada e deixar o original como estava, existe o `toSorted()`, que recebe a mesma função de comparação:
>
> ```js
> const original = [3, 1, 2];
> const ordenada = original.toSorted((a, b) => a - b);
>
> console.log(ordenada); // [1, 2, 3]
> console.log(original); // [3, 1, 2]
> ```
>
> O `toSorted()` é mais novo, de 2023, e funciona nos navegadores e no Node atuais.

## Os erros mais comuns

**1. Ordenar números sem a função.** `[5, 40, 100, 1].sort()` dá `[1, 100, 40, 5]`, sem aviso nenhum. Com números, entregue sempre a função: `sort((a, b) => a - b)`.

**2. Responder com `true` ou `false`.**

```js
const idades = [30, 12, 45];

idades.sort((a, b) => a > b);

console.log(idades); // [30, 12, 45]: nada mudou (no Node e no Chrome)
```

A função parece certa, mas devolve um booleano, e o `sort()` espera um número. Ele transforma o `true` em 1 e o `false` em 0. A resposta nunca é negativa, então o `sort()` nunca ouve "o `a` vem antes". Só ouve "o `b` vem antes" ou "empate", e isso não basta para ordenar. Use a subtração, `a - b`.

**3. Chamar a função em vez de entregá-la.**

```js
numeros.sort(compararNumeros()); // TypeError
```

Com os parênteses, a `compararNumeros` roda na hora, sem `a` nem `b`, e o que chega ao `sort()` é o resultado dela, um `NaN`, e não a função. O erro diz isso: `TypeError: The comparison function must be either a function or undefined`, "a função de comparação precisa ser uma função ou undefined". Entregue o nome sem parênteses: `numeros.sort(compararNumeros)`.

**4. Esquecer que o `sort()` muda o array.** Depois do `sort()`, a ordem antiga não existe mais. Se você ainda vai precisar dela, use o `toSorted()`, que devolve uma cópia ordenada.

**5. Trocar dois elementos sem o terceiro copo.** `lista[0] = lista[1]` seguido de `lista[1] = lista[0]` deixa os dois lugares com o mesmo valor. Guarde um deles numa variável antes.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| ordenar o próprio array | `numeros.sort((a, b) => a - b)` | `numeros.sort()` |
| ganhar uma cópia ordenada | `numeros.toSorted((a, b) => a - b)` | `sorted(numeros)` |
| do maior para o menor | `numeros.sort((a, b) => b - a)` | `numeros.sort(reverse=True)` |
| ordenar objetos pela nota, da maior para a menor | `alunos.sort((a, b) => b.nota - a.nota)` | `alunos.sort(key=lambda aluno: aluno["nota"], reverse=True)` |

```python
numeros = [10, 1, 2]
numeros.sort()
print(numeros)  # [1, 2, 10]

alunos = [
    {"nome": "Ana", "nota": 8},
    {"nome": "Bia", "nota": 5},
    {"nome": "Caio", "nota": 9},
]
alunos.sort(key=lambda aluno: aluno["nota"], reverse=True)
print(alunos[0]["nome"])  # Caio
```

- **O Python ordena números como números.** A pegadinha do texto não existe lá: `[10, 1, 2]` vira `[1, 2, 10]` sem função nenhuma.
- **O Python não pergunta "qual vem primeiro?", e sim "o que comparar?".** Em vez de uma função de comparação, ele recebe no `key` uma função que diz qual valor de cada item usar, como a nota de cada aluno. A conta do sinal fica por conta dele.
- **O `lambda` é a função curta do Python**, o equivalente da seta: `lambda aluno: aluno["nota"]` quer dizer "recebe um aluno, devolve a nota dele".
- **Com textos, o Python faz como o JavaScript**: as maiúsculas vêm antes das minúsculas, e `["uva", "Banana", "abacaxi"]` fica `['Banana', 'abacaxi', 'uva']`.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Faça a ordenação por seleção na mão. Como fica a lista depois de cada passo?
> ```js
> [5, 3, 8, 1]
> ```
>
> > [!success]- Resposta
> > - **Passo 1** (1º lugar): o menor de todos é o 1, que troca com o 5. Fica `[1, 3, 8, 5]`.
> > - **Passo 2** (2º lugar): do 3 em diante (3, 8, 5), o menor é o 3, que já está no lugar. Fica `[1, 3, 8, 5]`.
> > - **Passo 3** (3º lugar): sobraram o 8 e o 5. O menor é o 5, que troca com o 8. Fica `[1, 3, 5, 8]`.
> >
> > Sobrou só o 8, que já está no último lugar. Foram três passos para quatro itens.

> [!question] 2. Por que a ordenação por seleção pode parar quando sobra um item só?
>
> > [!success]- Resposta
> > Porque todos os outros itens já foram escolhidos, um por um, por serem os menores. O que sobra é o maior de todos, e o único lugar livre é o último, justamente o dele. Não há com quem compará-lo.

> [!question] 3. O que aparece no console, e por quê?
> ```js
> console.log([25, 100, 7].sort());
> ```
>
> > [!success]- Resposta
> > `[100, 25, 7]`. Sem função de comparação, o `sort()` compara como texto: `"25"`, `"100"` e `"7"`. Pelo primeiro caractere, o `1` vem antes do `2`, que vem antes do `7`. O tamanho dos números não conta. Para a ordem certa, `[7, 25, 100]`, use `sort((a, b) => a - b)`.

> [!question] 4. Quem fica antes?
> O `sort()` chamou a função abaixo com `a = 7` e `b = 3`. Qual dos dois vai ficar antes?
>
> ```js
> (a, b) => a - b
> ```
>
> > [!success]- Resposta
> > O 3. A conta dá `7 - 3`, que é 4, um número positivo, e positivo quer dizer "o `b` vem antes". Faz sentido: com `a - b`, a ordem é crescente, e o 3 é menor que o 7.

> [!question] 5. Reescreva com a seta. Em que ordem fica a lista?
> ```js
> const precos = [12, 40, 7];
>
> precos.sort(function (a, b) {
>   return b - a;
> });
> ```
>
> > [!success]- Resposta
> > ```js
> > precos.sort((a, b) => b - a);
> > ```
> >
> > A palavra `function` sai, a seta entra entre os parâmetros e a conta, e as chaves e o `return` saem, porque o corpo é uma conta só. Com `b - a`, a ordem é decrescente: `[40, 12, 7]`.

> [!question] 6. Por que este código não põe as idades em ordem?
> ```js
> const idades = [30, 12, 45];
>
> idades.sort((a, b) => a > b);
>
> console.log(idades); // [30, 12, 45]
> ```
>
> > [!success]- Resposta
> > Porque a função devolve `true` ou `false`, e o `sort()` espera um número. Ele transforma o `true` em 1 e o `false` em 0, e nenhum dos dois é negativo. Então a função nunca responde "o `a` vem antes", e a lista não fica em ordem. O certo é `idades.sort((a, b) => a - b)`, que dá `[12, 30, 45]`.

> [!question] 7. Escreva o código.
> Ordene os produtos do mais barato para o mais caro e mostre o **nome** do primeiro.
>
> ```js
> const produtos = [
>   { nome: "caderno", preco: 18 },
>   { nome: "caneta", preco: 3 },
>   { nome: "mochila", preco: 90 }
> ];
> ```
>
> > [!success]- Resposta
> > ```js
> > produtos.sort((a, b) => a.preco - b.preco);
> >
> > console.log(produtos[0].nome); // caneta
> > ```
> >
> > A conta usa o preço, e `a.preco - b.preco` põe os preços em ordem crescente. Quem muda de lugar é o produto inteiro, então o primeiro da lista ordenada é a caneta, com nome e preço juntos.

> [!question] 8. O que aparece no console? Como consertar?
> O código deveria trocar as duas cores de lugar.
>
> ```js
> const cores = ["azul", "verde"];
>
> cores[0] = cores[1];
> cores[1] = cores[0];
>
> console.log(cores);
> ```
>
> > [!success]- Resposta
> > Aparece `["verde", "verde"]`. A primeira linha escreve o `"verde"` por cima do `"azul"`, e o azul se perde. Na segunda, `cores[0]` já é `"verde"`. O conserto é guardar um deles antes, como no terceiro copo:
> >
> > ```js
> > const guardado = cores[0];
> > cores[0] = cores[1];
> > cores[1] = guardado;
> >
> > console.log(cores); // ["verde", "azul"]
> > ```

> [!question] 9. Qual a diferença entre estas duas linhas?
> ```js
> function compararNumeros(a, b) {
>   return a - b;
> }
>
> numeros.sort(compararNumeros);
> numeros.sort(compararNumeros());
> ```
>
> > [!success]- Resposta
> > A primeira **entrega** a função ao `sort()`, que a chama sozinho, com os pares que escolher. A segunda **chama** a função na hora, sem `a` nem `b`. A conta `undefined - undefined` dá `NaN`, e é esse `NaN` que chega ao `sort()`, no lugar da função. O resultado é `TypeError: The comparison function must be either a function or undefined`.

## De onde vêm as palavras

- **[[glossario/ordenacao|Ordenar]]**: do latim *ōrdināre*, "pôr em ordem, arrumar", feito de *ōrdō*, "ordem". O *ōrdō* era uma fileira, uma linha, uma série, e também a fileira de soldados e o posto de alguém numa classe. Ordenar é, na origem, **pôr em fila**, que é o que as cartas fizeram. De onde vem o próprio *ōrdō*, ninguém sabe ao certo.
- **[[glossario/ordenacao|Seleção]]**: do latim *sēlēctiō*, "escolha", de *sēligō*, "separar escolhendo", que junta *sē-*, "à parte", e *legō*, "juntar, escolher, ler". Selecionar é **escolher e pôr à parte**, como cada passo faz com o menor. O mesmo *legō* está no nosso **ler**, em **eleger** e em **coleção**.
- **[[glossario/ordenacao|Crescente]]**: do latim *crēscentem*, "que cresce", de *crēscō*, "crescer". Na ordem crescente, os valores crescem da esquerda para a direita. É a mesma palavra que deu o francês *croissant*, o pão com forma de lua crescente.
- **Sort**: o verbo inglês *sort*, "separar por tipo", veio do francês antigo *sortir*, "repartir", e do latim *sortīre*, "tirar a sorte, dividir, escolher". Tudo nasce do latim *sors*, que queria dizer "sorte, sina", e também "quinhão" e "classe". O substantivo *sort*, em inglês, é "tipo, espécie". E o nosso **sorte** vem do mesmo *sors*. O `sort()` e a sorte são parentes, embora o `sort()` não deixe nada ao acaso.
- **Trocar**: do latim medieval *trocāre*, de origem incerta. A hipótese mais provável é uma palavra dos francos, um povo germânico. O francês *troquer*, "permutar", é da mesma família.
- **[[glossario/callback|Callback]]**: do inglês *call back*, "ligar de volta". O *call*, "chamar", vem do inglês antigo e do nórdico antigo *kalla*, "chamar, gritar".
- **[[glossario/arrow-function|Arrow]]**: em inglês, "flecha". Vem de uma raiz indo-europeia que queria dizer "arco, flecha", a mesma do latim *arcus* e do nosso **arco**. A **seta** do português vem do latim *sagitta*, "flecha", pelo galego-português *saeta*. O `=>` tem esse nome porque parece uma seta deitada, apontando do que entra para o que sai.
- **Anônimo**: do grego *anṓnumos*, "sem nome", de *an-*, "sem", e *ónuma*, "nome". Chegou ao português pelo latim tardio *anōnymus*. Uma função anônima é, literalmente, uma função sem nome.

> [!tip] Para guardar
> - Ordenar é resolver um lugar de cada vez: o 1º lugar fica com o menor de todos, o 2º com o menor dos que sobraram, e assim por diante.
> - Ordenação por seleção: acha o menor do trecho que falta, troca com o primeiro desse trecho, e o trecho diminui uma casa. Quando sobra um, acabou.
> - Para trocar dois elementos de lugar, guarde um deles antes numa variável, como num terceiro copo.
> - O `sort()` muda o próprio array e também o devolve.
> - Sem instrução, o `sort()` compara como texto: `[10, 1, 2]` vira `[1, 10, 2]`. Com números, entregue sempre uma função de comparação.
> - A função de comparação recebe `a` e `b` e responde com um número: negativo, o `a` vem antes; positivo, o `b` vem antes; zero, empate.
> - `(a, b) => a - b` é uma função curta: "recebe `a` e `b`, devolve `a - b`". Ordena do menor para o maior. `b - a` ordena do maior para o menor.
> - Entregue a função sem parênteses. Quem a chama é o `sort()`, com os pares que ele escolher.
> - Para objetos, compare uma propriedade: `alunos.sort((a, b) => b.nota - a.nota)`.

Fontes: MDN: [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [Array.prototype.sort() em português](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), [Arrow functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare), [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) · Python: [Sorting Techniques](https://docs.python.org/3/howto/sorting.html) · Wikipedia: [Selection sort](https://en.wikipedia.org/wiki/Selection_sort) · Wiktionary: [ordenar](https://en.wiktionary.org/wiki/ordenar), [ōrdinō](https://en.wiktionary.org/wiki/ordino), [ōrdō](https://en.wiktionary.org/wiki/ordo), [seleção](https://en.wiktionary.org/wiki/sele%C3%A7%C3%A3o), [sēlēctiō](https://en.wiktionary.org/wiki/selectio), [sēligō](https://en.wiktionary.org/wiki/seligo), [crescente](https://en.wiktionary.org/wiki/crescente), [crēscō](https://en.wiktionary.org/wiki/cresco), [sort](https://en.wiktionary.org/wiki/sort), [sors](https://en.wiktionary.org/wiki/sors), [sorte](https://en.wiktionary.org/wiki/sorte), [trocar](https://en.wiktionary.org/wiki/trocar), [callback](https://en.wiktionary.org/wiki/callback), [call](https://en.wiktionary.org/wiki/call), [arrow](https://en.wiktionary.org/wiki/arrow), [seta](https://en.wiktionary.org/wiki/seta), [anónimo](https://en.wiktionary.org/wiki/an%C3%B3nimo)
