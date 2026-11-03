---
title: "7.2 Algoritmos em arrays: buscar, contar e achar o maior"
tags:
  - logica-de-programacao
  - javascript
  - arrays
  - algoritmos
---

Segunda aula do módulo 7. A [[programacao/logica-de-programacao/modulo-7/01-como-atacar-um-problema-de-programacao|aula 7.1]] mostrou um roteiro para atacar qualquer problema. Esta traz três receitas que aparecem o tempo todo com arrays: **buscar** um elemento, **contar** quantos passam numa condição e **achar o maior** (ou o menor).

Nenhuma delas é nova. As três já apareceram aos pedaços: o contador na [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], o "maior até agora" na [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]] e na [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]], e a busca com `break` na [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|aula 6.5]]. Aqui elas aparecem inteiras, lado a lado.

E as três fazem o mesmo movimento: **percorrer o array e comparar cada elemento com alguma coisa**. O que muda é com o que se compara e o que se guarda pelo caminho.

## Buscar: a busca linear

Para saber se um valor está no array, o jeito mais simples é olhar os elementos um por um, do primeiro ao último, comparando cada um com o procurado. Isso se chama **[[glossario/busca-linear|busca linear]]**, porque anda em linha: um elemento depois do outro.

Dois finais são possíveis:

- **Achou**: pode parar na hora. O resto da lista não muda a resposta.
- **Chegou ao fim sem achar**: só então dá para dizer que o valor não está lá.

```js
const frutas = ["maçã", "banana", "uva", "pera"];

function contemFruta(lista, procurada) {
  for (const fruta of lista) {
    if (fruta === procurada) {
      return true; // achou: sai da função, e o laço para junto
    }
  }
  return false; // só chega aqui se o laço terminou sem achar
}

console.log(contemFruta(frutas, "uva"));   // true
console.log(contemFruta(frutas, "manga")); // false
```

Procurando `"uva"`:

| Volta | `fruta` | `fruta === "uva"`? | O que acontece |
|---|---|---|---|
| 1 | `"maçã"` | não | segue para a próxima |
| 2 | `"banana"` | não | segue para a próxima |
| 3 | `"uva"` | sim | `return true`: a função termina |

A `"pera"` nem é olhada. Procurando `"manga"`, o `if` não dá `true` em nenhuma das quatro voltas, o laço termina sozinho, e o programa chega ao `return false`.

### O `return` faz dois papéis

Na aula 6.5, a busca precisou de duas peças: um `break` para parar o laço e uma variável `achou` para lembrar, depois do laço, se tinha achado. Aqui, o `return` da [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]] faz as duas coisas sozinho:

- **Para tudo.** O `return` encerra a função inteira, e o laço junto com ela.
- **Separa os dois finais.** O `return false` está depois do laço. Se a função achou, ela já terminou no `return true` e nunca chega lá. Então, chegar ao `return false` já quer dizer "não achou".

Por isso a busca costuma morar dentro de uma função. É a mesma lógica da aula 6.5, com menos peças.

### Quantas comparações?

Se o procurado for o primeiro, basta uma comparação. Se for o último, ou se não estiver na lista, são tantas comparações quantos forem os elementos: 4 para a `"manga"`, um milhão numa lista de um milhão. Na busca linear, o trabalho cresce junto com a lista: uma lista duas vezes maior pode pedir o dobro de comparações.

Se a lista estiver em ordem, como as palavras de um dicionário, há jeitos mais rápidos de buscar. Ninguém procura "uva" no dicionário lendo da primeira página em diante. Pôr uma lista em ordem é o assunto da aula 7.3.

### E se eu quiser saber onde está?

Para devolver a **posição**, e não só sim ou não, o laço precisa do índice. Então entra o `for` pelo índice, da aula 6.3:

```js
function posicaoDe(lista, procurado) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === procurado) {
      return i;
    }
  }
  return -1;
}

console.log(posicaoDe(frutas, "uva"));   // 2
console.log(posicaoDe(frutas, "manga")); // -1
```

Por que `-1` para "não achou"? Porque o `0` já tem dono: é a posição do primeiro elemento. Se a função devolvesse `0` quando não acha, não daria para saber se a `"maçã"` está na posição 0 ou se a fruta não existe. Nenhum array tem posição `-1`, então esse valor não se confunde com uma resposta de verdade.

> [!info]- O JavaScript já tem isso pronto? (clique para abrir)
> Tem. O `includes` responde se o valor está no array, e o `indexOf` diz a posição, com o mesmo `-1` quando não acha:
>
> ```js
> console.log(frutas.includes("uva"));  // true
> console.log(frutas.indexOf("uva"));   // 2
> console.log(frutas.indexOf("manga")); // -1
> ```
>
> Por dentro, os dois fazem uma busca linear, como a `contemFruta` e a `posicaoDe`. No dia a dia, usa-se o pronto. Escrever à mão serve para entender o que ele faz.

## Contar

Contar quantos elementos passam numa condição é o [[glossario/contador|contador]] da aula 4.4: uma variável que começa em 0 e ganha 1 a cada vez que a condição dá `true`.

```js
const notas = [7, 3, 9, 5, 10, 4];

let aprovados = 0;

for (const nota of notas) {
  if (nota >= 6) {
    aprovados = aprovados + 1;
  }
}

console.log(aprovados); // 3
```

Passam o 7, o 9 e o 10. Cada nota é comparada com um limite **fixo**, o 6, escolhido antes de o laço começar. É isso que separa o contar do achar o maior, a seguir.

## Achar o maior

Aqui não existe um limite escolhido antes. Cada nota é comparada com **a maior até agora**, um valor que muda pelo caminho.

A receita lembra um torneio. O primeiro elemento começa como campeão, sem ter lutado com ninguém. Depois, cada elemento desafia o campeão. Se for maior, toma o lugar dele. No fim, quem estiver no lugar é o maior de todos.

```js
const notas = [7, 3, 9, 5, 10, 4];

let maiorNota = notas[0]; // o primeiro começa como campeão

for (const nota of notas) {
  if (nota > maiorNota) {
    maiorNota = nota; // achou uma maior: troca o campeão
  }
}

console.log(maiorNota); // 10
```

| Volta | `nota` | `maiorNota` antes | `nota > maiorNota`? | `maiorNota` depois |
|---|---|---|---|---|
| 1 | 7 | 7 | não | 7 |
| 2 | 3 | 7 | não | 7 |
| 3 | 9 | 7 | sim | 9 |
| 4 | 5 | 9 | não | 9 |
| 5 | 10 | 9 | sim | 10 |
| 6 | 4 | 10 | não | 10 |

Na primeira volta, o 7 é comparado com ele mesmo. `7 > 7` dá `false`, e nada muda. É uma comparação à toa, mas não atrapalha.

Repare também que, ao contrário da busca, este laço não pode parar no meio. Enquanto houver elementos para olhar, qualquer um deles pode ser maior que o campeão. O 10 só apareceu na quinta volta.

### Por que começar com `notas[0]`, e não com 0

É a pegadinha desta receita. Com notas, começar em 0 até funciona: toda nota é 0 ou mais, e a primeira que for maior que 0 já toma o lugar. Por isso o erro fica escondido.

Agora troque as notas por temperaturas de um lugar frio, todas abaixo de zero:

```js
const temperaturas = [-5, -2, -8];

let maior = 0;

for (const temperatura of temperaturas) {
  if (temperatura > maior) {
    maior = temperatura;
  }
}

console.log(maior); // 0
```

Nenhuma temperatura é maior que 0, então o `if` nunca dá `true`, e o `maior` termina valendo 0. O programa diz que a maior temperatura foi 0 grau, uma temperatura que **nem está na lista**.

E não aparece mensagem de erro nenhuma. O código roda até o fim, normalmente, e só a resposta está errada. É pior que um erro com aviso, porque nada chama a sua atenção.

Começando com o primeiro elemento, o problema some:

| Volta | `temperatura` | `maior` antes | `temperatura > maior`? | `maior` depois |
|---|---|---|---|---|
| 1 | -5 | -5 | não | -5 |
| 2 | -2 | -5 | sim | -2 |
| 3 | -8 | -2 | não | -2 |

O resultado é -2, o certo. Quem começa como campeão é alguém da lista, então o campeão é sempre um valor da lista. O 0 era um valor de fora, que entrou na disputa sem ter sido convidado.

É o conselho da aula 7.1 sobre testar: escolher dados que peguem o erro. Uma lista só com números positivos nunca mostraria esse defeito. Uma lista só com negativos mostra na hora.

> [!info]- E o `-Infinity` da aula 5.5? (clique para abrir)
> A aula 5.5 sugeriu outro começo seguro: `let maior = -Infinity`, o menos infinito. Qualquer número é maior que ele, então o primeiro elemento sempre toma o lugar. Também funciona.
>
> A diferença aparece com uma lista vazia:
>
> ```js
> const vazia = [];
> console.log(vazia[0]); // undefined
> ```
>
> Começando com `vazia[0]`, o resultado é `undefined`. Começando com `-Infinity`, o resultado é `-Infinity`. Nenhum dos dois é uma resposta de verdade, porque uma lista vazia não tem maior. Quando a lista puder vir vazia, confira o `length` antes.

## Achar o menor

A mesma receita, com o sinal virado: o campeão muda quando aparece alguém **menor**.

```js
let menorNota = notas[0];

for (const nota of notas) {
  if (nota < menorNota) {
    menorNota = nota;
  }
}

console.log(menorNota); // 3
```

E aqui a pegadinha do 0 é ainda mais fácil de ver. Com `let menorNota = 0`, nenhuma nota é menor que 0, e o resultado seria 0, mesmo com notas positivas comuns, como `[7, 3, 9]`. Começar com o primeiro elemento serve para os dois casos, o maior e o menor.

> [!info]- E o `Math.max` da aula 5.5, funciona com array? (clique para abrir)
> Funciona, com três pontos antes do nome do array:
>
> ```js
> console.log(Math.max(...notas)); // 10
> console.log(Math.min(...notas)); // 3
> ```
>
> Os três pontos abrem o array e entregam os elementos separados, como se fosse `Math.max(7, 3, 9, 5, 10, 4)`. Sem eles, o `Math.max` receberia o array inteiro como um valor só, e `Math.max(notas)` daria `NaN`, o "não é um número" da aula 2.3. E uma curiosidade: `Math.max(...[])`, com a lista vazia, dá `-Infinity`. É o mesmo começo seguro que a aula 5.5 sugeriu.

### Achar quem é o maior

Muitas vezes o que se quer não é o valor, e sim **quem**: o aluno com a maior nota, o produto mais barato. Num array de objetos, o campeão passa a ser o objeto inteiro:

```js
const alunos = [
  { nome: "Ana", nota: 8 },
  { nome: "Bia", nota: 5 },
  { nome: "Caio", nota: 9 },
  { nome: "Duda", nota: 6 }
];

let melhor = alunos[0];

for (const aluno of alunos) {
  if (aluno.nota > melhor.nota) {
    melhor = aluno;
  }
}

console.log(melhor.nome + " tirou " + melhor.nota); // Caio tirou 9
```

A comparação usa a nota, `aluno.nota > melhor.nota`, mas o que se guarda é o aluno, `melhor = aluno`. No fim, o `melhor` tem o nome e a nota juntos.

Com um empate, o `>` fica com o **primeiro** que chegou ao topo: se a Ana e a Bia tirassem 9, o resultado seria a Ana, porque `9 > 9` dá `false` e a Bia não toma o lugar. Com `>=`, ficaria o último, a Bia.

## O mesmo movimento

| Receita | Compara cada elemento com... | Guarda pelo caminho | Pode parar no meio? | Resposta |
|---|---|---|---|---|
| buscar | o valor procurado | nada | sim, quando acha | sim ou não (ou a posição) |
| contar | uma condição fixa, como `>= 6` | o contador | não | um número |
| achar o maior | o maior até agora | o campeão | não | um valor (ou quem é) |

Só a busca pode parar no meio, porque só nela a resposta não muda depois de encontrada. Nas outras duas, o último elemento ainda pode mudar o resultado: pode ser mais um para contar, ou um novo campeão.

## Os erros mais comuns

**1. O `else` com `return` dentro da busca.**

```js
function contemFruta(lista, procurada) {
  for (const fruta of lista) {
    if (fruta === procurada) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(contemFruta(["maçã", "banana", "uva"], "uva")); // false
```

Na primeira volta, a `"maçã"` não é a `"uva"`, o `else` roda, e o `return false` encerra a função ali mesmo. A busca só olhou o primeiro elemento. Ela só acerta quando o procurado é justamente o primeiro da lista. É o engano do `else` dentro do laço, da aula 6.5, agora com uma resposta errada em vez de um aviso a mais. O "não achou" só pode ser dito depois de olhar todos, por isso o `return false` vai depois do laço.

**2. Começar o maior, ou o menor, com 0.** Funciona por sorte quando os números são positivos e dá a resposta errada quando não são, sem aviso nenhum. Comece com o primeiro elemento: `let maior = lista[0]`.

**3. Copiar a receita do maior para o menor e esquecer o sinal.**

```js
const precos = [25, 8, 40, 12];

let menorPreco = precos[0];
for (const preco of precos) {
  if (preco > menorPreco) { // o sinal ficou o do maior
    menorPreco = preco;
  }
}

console.log(menorPreco); // 40
```

O nome da variável diz "menor", mas quem decide é o sinal. Com `>`, o código acha o maior. O certo é `preco < menorPreco`, que dá 8.

**4. Esquecer que a lista pode vir vazia.** Com `[]`, o `lista[0]` é `undefined`, e o resultado também. Se a lista puder chegar vazia, confira o `length` antes.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| está na lista? | `frutas.includes("uva")` | `"uva" in frutas` |
| o maior e o menor, prontos | `Math.max(...notas)`, `Math.min(...notas)` | `max(notas)`, `min(notas)` |
| começar o campeão | `let maiorNota = notas[0]` | `maior_nota = notas[0]` |

```python
frutas = ["maçã", "banana", "uva", "pera"]

def contem_fruta(lista, procurada):
    for fruta in lista:
        if fruta == procurada:
            return True
    return False

print(contem_fruta(frutas, "uva"))  # True
print("manga" in frutas)            # False

notas = [7, 3, 9, 5, 10, 4]

maior_nota = notas[0]
for nota in notas:
    if nota > maior_nota:
        maior_nota = nota

print(maior_nota)            # 10
print(max(notas), min(notas))  # 10 3
```

- **O `in` do Python faz a busca linear numa palavra só**: `"uva" in frutas` dá `True` ou `False`.
- **O `max` e o `min` recebem a lista direto**, sem os três pontos do JavaScript.
- **A receita do campeão é a mesma nas duas linguagens**: começa no primeiro, troca quando aparece um maior.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console, e quantas comparações cada chamada faz?
> ```js
> function contem(lista, procurado) {
>   for (const item of lista) {
>     if (item === procurado) {
>       return true;
>     }
>   }
>   return false;
> }
>
> console.log(contem([4, 8, 15], 8));
> console.log(contem([4, 8, 15], 16));
> ```
>
> > [!success]- Resposta
> > `true` e depois `false`. Procurando o 8, são **2** comparações: o 4 não é, o 8 é, e o `return true` encerra a função. Procurando o 16, são **3**: nenhum elemento bate, o laço termina, e a função chega ao `return false`.

> [!question] 2. Por que esta busca dá `false`, se a `"uva"` está na lista?
> ```js
> function contemFruta(lista, procurada) {
>   for (const fruta of lista) {
>     if (fruta === procurada) {
>       return true;
>     } else {
>       return false;
>     }
>   }
> }
>
> console.log(contemFruta(["pera", "uva"], "uva")); // false
> ```
>
> > [!success]- Resposta
> > Na primeira volta, a `"pera"` não é a `"uva"`, então o `else` roda e o `return false` encerra a função. A `"uva"` nunca chega a ser olhada. O `return false` precisa ficar **depois** do laço, sem `else`, para só rodar quando todos os elementos já foram olhados.

> [!question] 3. O que aparece no console?
> ```js
> const numeros = [3, 12, 7, 12, 1];
>
> let maior = numeros[0];
> for (const numero of numeros) {
>   if (numero > maior) {
>     maior = numero;
>   }
> }
>
> console.log(maior);
> ```
>
> > [!success]- Resposta
> > `12`. O `maior` começa em 3. Na segunda volta, o 12 é maior que 3 e toma o lugar. O 7 não passa do 12. O segundo 12 também não, porque `12 > 12` dá `false`. E o 1 não passa.

> [!question] 4. Por que aparece 0?
> O código deveria mostrar a maior temperatura da semana.
>
> ```js
> const temperaturas = [-3, -7, -1, -4];
>
> let maior = 0;
> for (const temperatura of temperaturas) {
>   if (temperatura > maior) {
>     maior = temperatura;
>   }
> }
>
> console.log(maior); // 0
> ```
>
> > [!success]- Resposta
> > Porque o `maior` começa em 0, e nenhuma temperatura é maior que 0. O `if` nunca dá `true`, e o 0, que nem está na lista, fica até o fim. O certo é começar com o primeiro elemento, `let maior = temperaturas[0];`. Aí o resultado é `-1`.

> [!question] 5. Este código deveria mostrar o menor preço. O que ele mostra, e por quê?
> ```js
> const precos = [25, 8, 40, 12];
>
> let menorPreco = precos[0];
> for (const preco of precos) {
>   if (preco > menorPreco) {
>     menorPreco = preco;
>   }
> }
>
> console.log(menorPreco);
> ```
>
> > [!success]- Resposta
> > Mostra `40`, o **maior** preço. O sinal `>` troca o campeão sempre que aparece um preço maior. Para o menor, o sinal tem de ser `<`: `if (preco < menorPreco)`. Aí aparece `8`.

> [!question] 6. Escreva o código.
> Conte quantas temperaturas da lista abaixo ficaram **abaixo de zero**, e mostre o resultado.
>
> ```js
> const temperaturas = [3, -2, 0, -5, 8];
> ```
>
> > [!success]- Resposta
> > ```js
> > let abaixoDeZero = 0;
> >
> > for (const temperatura of temperaturas) {
> >   if (temperatura < 0) {
> >     abaixoDeZero = abaixoDeZero + 1;
> >   }
> > }
> >
> > console.log(abaixoDeZero); // 2
> > ```
> >
> > São o -2 e o -5. O 0 não entra: "abaixo de zero" pede `< 0`, e `0 < 0` dá `false`.

> [!question] 7. Escreva uma função.
> A função `posicaoDe(lista, procurado)` deve devolver a posição do valor na lista, ou `-1` se ele não estiver lá. Teste com:
>
> ```js
> console.log(posicaoDe(["a", "b", "c"], "c")); // deve dar 2
> console.log(posicaoDe(["a", "b", "c"], "z")); // deve dar -1
> ```
>
> > [!success]- Resposta
> > ```js
> > function posicaoDe(lista, procurado) {
> >   for (let i = 0; i < lista.length; i++) {
> >     if (lista[i] === procurado) {
> >       return i;
> >     }
> >   }
> >   return -1;
> > }
> > ```
> >
> > O `for` pelo índice é necessário, porque a resposta é o `i`. O `for...of` daria o elemento, mas não a posição dele.

> [!question] 8. Escreva o código.
> Mostre o **nome** do produto mais barato da lista abaixo.
>
> ```js
> const produtos = [
>   { nome: "caneta", preco: 3 },
>   { nome: "caderno", preco: 18 },
>   { nome: "lápis", preco: 2 },
>   { nome: "borracha", preco: 4 }
> ];
> ```
>
> > [!success]- Resposta
> > ```js
> > let maisBarato = produtos[0];
> >
> > for (const produto of produtos) {
> >   if (produto.preco < maisBarato.preco) {
> >     maisBarato = produto;
> >   }
> > }
> >
> > console.log(maisBarato.nome); // lápis
> > ```
> >
> > A comparação usa o preço, mas o campeão guardado é o produto inteiro. Assim, no fim, dá para ler o nome dele.

> [!question] 9. Por que a busca pode parar no meio e o "achar o maior" não pode?
>
> > [!success]- Resposta
> > Na busca, quando o valor aparece, a resposta já é "sim", e nenhum elemento depois dele muda isso. No "achar o maior", ainda não olhar um elemento quer dizer não saber se ele é maior que o campeão. O maior pode ser justamente o último da lista. Por isso esse laço precisa ir até o fim.

## De onde vêm as palavras

- **Buscar**: do galego-português antigo *buscar*, de origem incerta. Uma hipótese liga a palavra a *bosque*. Outra, a uma raiz celta ligada a "ganho" e "vitória". Ninguém sabe ao certo.
- **[[glossario/busca-linear|Linear]]**: do latim *līneāris*, de *līnea*, "linha", com o final *-āris*, que forma adjetivos. Linear é **o que tem forma de linha**. A busca linear anda em linha, um elemento depois do outro. A *līnea*, como contou a aula 6.5, era antes um fio de linho.
- **[[glossario/maximo-e-minimo|Máximo]]**: do latim *maximus*, "o maior de todos", superlativo de *magnus*, "grande". O degrau do meio, o comparativo, era *maior*, a mesma forma do nosso **maior**: *magnus*, *maior*, *maximus*, como grande, maior, máximo.
- **[[glossario/maximo-e-minimo|Mínimo]]**: do latim *minimus*, "o menor de todos". O comparativo era *minor*, "menor". Mas o "pequeno", no latim, era *parvus*, uma palavra de outra raiz, como no português **bom**, **melhor**, **ótimo**, em que cada degrau tem uma origem diferente.
- **Campeão**: veio do italiano *campione*, do latim tardio *campiō*, "lutador". A palavra deu uma volta. O latim *campus*, "campo", foi parar nas línguas germânicas com o sentido de "campo de batalha", e daí veio um verbo para "lutar". Dele nasceu o nome do lutador, que voltou ao latim como *campiō*. O campeão é, na origem, **quem luta no campo**. Na receita do maior, ele defende o lugar contra cada novo desafiante.
- **[[glossario/contador|Contar]]**: do latim *computāre*, "calcular, fazer as contas", de *con-*, "junto", e *putāre*, que queria dizer "podar, limpar" e também "avaliar, pensar". O *computāre* entrou no português duas vezes: pelo caminho do povo, gastando-se com o uso, virou **contar**. Mais tarde, copiado direto dos livros, virou **computar**. Por isso contar e computar são a mesma palavra latina.

> [!tip] Para guardar
> - Buscar, contar e achar o maior fazem o mesmo movimento: percorrer o array e comparar cada elemento com alguma coisa.
> - Busca linear: olha um por um. Achou, para. Chegou ao fim sem achar, a resposta é "não está".
> - Numa função, o `return true` dentro do laço para tudo, e o `return false` vai **depois** do laço, sem `else`.
> - Para devolver a posição, use o `for` pelo índice e `-1` para "não achou", porque o `0` já é a posição do primeiro.
> - Contar: um contador que começa em 0 e compara cada elemento com uma condição fixa.
> - Achar o maior: o primeiro começa como campeão, e cada elemento maior toma o lugar. Para o menor, o sinal vira `<`.
> - Comece o campeão com `lista[0]`, e não com 0. Com 0, uma lista só de negativos dá 0, um valor que nem está nela, e sem aviso de erro.
> - Para saber **quem** é o maior, guarde o objeto inteiro e compare a propriedade: `if (aluno.nota > melhor.nota) melhor = aluno`.
> - Só a busca pode parar no meio. Contar e achar o maior precisam olhar todos os elementos.

Fontes: MDN: [Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), [Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max), [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) · Python: [Built-in Functions: max, min](https://docs.python.org/3/library/functions.html#max) · Wikipedia: [Linear search](https://en.wikipedia.org/wiki/Linear_search) · Wiktionary: [buscar](https://en.wiktionary.org/wiki/buscar), [linear](https://en.wiktionary.org/wiki/linear), [līneāris](https://en.wiktionary.org/wiki/linearis), [máximo](https://en.wiktionary.org/wiki/m%C3%A1ximo), [maximus](https://en.wiktionary.org/wiki/maximus), [magnus](https://en.wiktionary.org/wiki/magnus), [mínimo](https://en.wiktionary.org/wiki/m%C3%ADnimo), [minimus](https://en.wiktionary.org/wiki/minimus), [campeão](https://en.wiktionary.org/wiki/campe%C3%A3o), [campiō](https://en.wiktionary.org/wiki/campio), [contar](https://en.wiktionary.org/wiki/contar), [computō](https://en.wiktionary.org/wiki/computo), [putō](https://en.wiktionary.org/wiki/puto)
