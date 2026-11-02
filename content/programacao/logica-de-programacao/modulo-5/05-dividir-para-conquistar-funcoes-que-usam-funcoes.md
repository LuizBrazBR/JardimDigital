---
title: "5.5 Dividir para conquistar: funções que usam funções"
tags:
  - logica-de-programacao
  - javascript
  - funcoes
---

Quinta e última aula do módulo 5. As aulas anteriores mostraram as peças: criar e chamar uma função (5.1), dar entradas a ela (5.2), devolver um resultado (5.3) e entender onde cada variável existe (5.4). Esta aula mostra **para que** tudo isso serve quando os programas crescem.

A ideia central já apareceu na [[programacao/logica-de-programacao/modulo-1/02-pensando-como-programador|aula 1.2]], com outro nome: a **[[glossario/decomposicao|decomposição]]**. Lá, "organizar a festa de aniversário" era grande demais para começar, e virou partes menores: convidados, cardápio, decoração. Cada parte era resolvida sozinha, e depois tudo se juntava.

Com funções, a decomposição sai do papel e vai para o código. Um problema grande vira várias funções pequenas, cada uma resolvendo uma parte, e uma função pode chamar outra para montar a solução inteira. Esse jeito de trabalhar tem nome: **[[glossario/dividir-para-conquistar|dividir para conquistar]]**.

## Funções que respondem sim ou não

Comece por uma função bem pequena:

```js
function ehPar(numero) {
  return numero % 2 === 0;
}

console.log(ehPar(4)); // true
console.log(ehPar(7)); // false
```

A linha `return numero % 2 === 0` junta duas coisas que você já conhece:

1. `numero % 2 === 0` é uma comparação, como as da [[programacao/logica-de-programacao/modulo-2/04-comparacoes|aula 2.4]]. O JavaScript calcula a comparação primeiro, e ela vira um valor: `true` ou `false`.
2. O `return` devolve esse valor para quem chamou, seja ele `true` ou `false`.

| Chamada | `numero % 2` | `numero % 2 === 0` vira | A função devolve |
|---|---|---|---|
| `ehPar(4)` | `0` | `true` | `true` |
| `ehPar(7)` | `1` | `false` | `false` |

O `return` não escolhe nada: ele não é um `if`. Só entrega o valor que a comparação produziu, qualquer que seja.

Muita gente, no começo, escreve assim:

```js
function ehPar(numero) {
  if (numero % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
```

Funciona, mas é um caminho mais longo para o mesmo lugar. Se a comparação já dá `true` quando é para devolver `true`, e `false` quando é para devolver `false`, dá para devolver a própria comparação.

Como a função devolve um [[glossario/booleano|booleano]], a chamada pode ir direto num `if`:

```js
if (ehPar(10)) {
  console.log("10 é par");
}
```

Lido em voz alta, o `if (ehPar(10))` fica quase uma frase: "se 10 é par". O nome começa com `eh` porque quer dizer "é", sem o acento, que o costume evita em nomes, como se viu na [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]. Em inglês, essas funções costumam começar com `is`: `isEven`, "é par".

## Uma função chamando outra

Agora, duas funções, em que a segunda usa a primeira:

```js
function maiorDeDois(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function maiorDeTres(a, b, c) {
  const maiorEntreAeB = maiorDeDois(a, b);
  return maiorDeDois(maiorEntreAeB, c);
}

console.log(maiorDeDois(4, 9));      // 9
console.log(maiorDeTres(4, 9, 2));   // 9
console.log(maiorDeTres(4, 9, 15));  // 15
```

A `maiorDeTres` não compara nada sozinha. Ela pede ajuda à `maiorDeDois` duas vezes: primeiro para achar o maior entre `a` e `b`, depois para comparar esse vencedor com o `c`. É como um torneio: o vencedor da primeira partida enfrenta o terceiro jogador.

Passo a passo, em `maiorDeTres(4, 9, 15)`:

| Passo | O que acontece |
|---|---|
| 1 | A `maiorDeTres` começa, com `a = 4`, `b = 9` e `c = 15` |
| 2 | Chama `maiorDeDois(4, 9)` e **espera** a resposta |
| 3 | Dentro da `maiorDeDois`, `4 > 9` dá `false`, e ela devolve 9 |
| 4 | De volta à `maiorDeTres`: o `maiorEntreAeB` recebe 9 |
| 5 | Chama `maiorDeDois(9, 15)` e espera de novo |
| 6 | `9 > 15` dá `false`, e a `maiorDeDois` devolve 15 |
| 7 | A `maiorDeTres` devolve esse 15 para quem a chamou |

É a regra da [[programacao/logica-de-programacao/modulo-5/01-o-que-e-uma-funcao-e-como-criar-uma|aula 5.1]], só que agora de dentro de uma função: a chamada entra na outra função, roda tudo lá e volta para a linha seguinte. Enquanto isso, a função que chamou fica parada, esperando.

Repare também nos nomes. As duas funções têm parâmetros chamados `a` e `b`, e isso não dá confusão nenhuma: pela [[programacao/logica-de-programacao/modulo-5/04-escopo-variaveis-locais-e-globais|aula 5.4]], cada função tem os seus, que só valem lá dentro.

## O maior de três, de novo

Este problema já apareceu na [[programacao/logica-de-programacao/modulo-3/04-condicoes-compostas-e-ou-nao|aula 3.4]], resolvido de outro jeito:

```js
// aula 3.4: tudo de uma vez
if (a >= b && a >= c) {
  console.log(a + " é o maior");
} else if (b >= a && b >= c) {
  console.log(b + " é o maior");
} else {
  console.log(c + " é o maior");
}
```

```js
// aula 5.5: dividido em dois problemas menores
function maiorDeTres(a, b, c) {
  const maiorEntreAeB = maiorDeDois(a, b);
  return maiorDeDois(maiorEntreAeB, c);
}
```

A versão da aula 3.4 olha os três números ao mesmo tempo. Para cada um, pergunta "este é maior ou igual aos outros dois?", com um `&&` juntando as duas comparações. São até quatro comparações, e um cuidado extra: com `>` no lugar de `>=`, um empate fazia o programa apontar o número errado.

A versão com funções também acha o maior de três, mas por outro caminho: ela não olha os três números de uma vez. Primeiro acha o maior entre dois deles, e depois compara esse vencedor com o terceiro. Ou seja, ela **troca** o problema de três números por dois problemas de "o maior de dois", que a [[programacao/logica-de-programacao/modulo-3/02-if-else-o-outro-caminho|aula 3.2]] já sabia resolver com um `if`/`else`. É exatamente o dividir para conquistar: o problema que parecia novo vira um problema velho, usado duas vezes.

Ela também tem vantagens práticas:

- **São sempre só duas comparações**, sem `&&`.
- **O empate não atrapalha.** Em `maiorDeTres(15, 15, 9)`, a primeira chamada compara 15 com 15. O `15 > 15` dá `false`, e a função devolve o `b`, que também vale 15. Como ela devolve um **valor**, e não "qual dos três é o maior", tanto faz qual dos dois 15 saiu.
- **Cresce fácil.** O maior de quatro é uma linha só:

```js
function maiorDeQuatro(a, b, c, d) {
  return maiorDeDois(maiorDeTres(a, b, c), d);
}

console.log(maiorDeQuatro(3, 8, 1, 12)); // 12
```

Com o jeito da aula 3.4, quatro números pediriam quatro degraus, cada um com três comparações ligadas por `&&`.

### E com muitos números?

E se fossem cem números? Escrever `maiorDeDois(maiorDeDois(maiorDeDois(...` cem vezes não dá. Aqui entra o laço, junto com a função.

Repare no que a `maiorDeTres` faz: guarda o maior até agora e compara com o próximo. É o [[glossario/acumulador|acumulador]] da [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], que servia para qualquer jeito de juntar. Em vez de somar, o jeito de juntar agora é "ficar com o maior".

Um exemplo: dois números somam 10. Qual dupla dá o maior produto? 1 × 9, 2 × 8, 3 × 7...

```js
let maior = 0;

for (let i = 1; i <= 9; i++) {
  const produto = i * (10 - i);
  maior = maiorDeDois(maior, produto);
}

console.log(maior); // 25, que é 5 × 5
```

A cada volta, a linha `maior = maiorDeDois(maior, produto)` compara o maior até agora com o produto da vez, e fica com o vencedor. O laço diz **quantas vezes** comparar, e a função diz **como** comparar. Os dois não competem: trabalham juntos.

Começar em 0 funciona aqui porque todos os produtos são positivos. Se pudesse haver números negativos, o começo seguro seria `-Infinity`, o menos infinito: qualquer número ganha dele. (O `Infinity` apareceu na aula 2.3, no `10 / 0`.)

O [[programacao/logica-de-programacao/modulo-6/index|módulo 6]] traz as listas, a partir da [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|aula 6.1]], e a aula 7.2 volta a esse problema de achar o maior, agora numa lista de verdade.

## Decomposição, padrão e abstração

Na [[programacao/logica-de-programacao/modulo-1/02-pensando-como-programador|aula 1.2]], o [[glossario/pensamento-computacional|pensamento computacional]] tinha três pilares. O dividir para conquistar usa os três ao mesmo tempo:

| Pilar | No `maiorDeTres` |
|---|---|
| [[glossario/decomposicao\|Decomposição]] | o maior de três é quebrado em duas partes menores |
| [[glossario/padrao\|Padrão]] | as duas partes são o mesmo problema, o maior de dois. Por isso, uma função só resolve as duas |
| [[glossario/abstracao\|Abstração]] | quem usa a `maiorDeDois` não precisa pensar no `if`/`else` lá de dentro. Basta o nome |

Nem toda divisão tem um padrão. No boletim, mais abaixo, a `calcularMedia` e a `situacao` são partes **diferentes** uma da outra: ali, é só decomposição. Mas, no sentido mais estrito da computação, "dividir para conquistar" é justamente o caso em que as partes são **o mesmo problema, em tamanho menor**: o maior de três vira o maior de dois, e o *merge sort* põe uma lista em ordem pondo em ordem as duas metades dela. Nesse sentido, decomposição e padrão andam sempre juntos.

## Não repetir código

A primeira grande razão para criar funções é não escrever a mesma lógica duas vezes. Imagine um programa que confere notas em três lugares diferentes:

```js
if (nota1 >= 0 && nota1 <= 10) {
  // ...
}

// muitas linhas depois...

if (nota2 >= 0 && nota2 <= 10) {
  // ...
}
```

A regra "uma nota vale de 0 a 10" está escrita em vários lugares. Se a escola passar a dar notas de 0 a 100, é preciso achar e trocar cada uma, e uma esquecida vira um erro que ninguém nota. Com uma função, a regra fica num lugar só:

```js
function notaValida(nota) {
  return nota >= 0 && nota <= 10;
}

if (notaValida(nota1)) {
  // ...
}

if (notaValida(nota2)) {
  // ...
}
```

Mudou a regra, muda uma linha. É a mesma ideia do `mostrarLinha` da aula 5.1, agora para uma regra, e não só para uma linha de enfeite.

Esse conselho é tão conhecido que tem sigla: **[[glossario/dry|DRY]]**, do inglês *Don't Repeat Yourself*, "não se repita".

## O nome conta a história

A segunda grande razão é dar nome às ideias. Compare:

```js
if (n % 2 === 0 && n >= 0 && n <= 10) {
  // ...
}

if (ehPar(n) && notaValida(n)) {
  // ...
}
```

As duas linhas fazem a mesma coisa. Na primeira, quem lê precisa decifrar as contas. Na segunda, lê "se é par e é uma nota válida". O nome da função esconde o **como** e mostra o **o quê**.

Por isso, o nome importa. `maiorDeDois`, `ehPar` e `calcularMedia` dizem o que fazem. Já `funcao1`, `fazCoisa` ou `teste` obrigam quem lê a abrir a função para descobrir para que ela serve. Daqui a um mês, quem vai abrir é você.

## Uma função, uma tarefa

Lembra do controle remoto da [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]]? Cada botão faz uma coisa só: um aumenta o volume, outro troca o canal. Imagine um botão que aumenta o volume, troca o canal e desliga a TV, tudo junto. Ninguém conseguiria usá-lo para só aumentar o volume.

Uma função que faz muitas coisas ao mesmo tempo tem o mesmo problema:

```js
function processarAluno(nome, n1, n2) {
  const media = (n1 + n2) / 2;
  console.log(media);
  if (media >= 7) {
    console.log(nome + " aprovado");
  } else {
    console.log(nome + " reprovado");
  }
}
```

Ela calcula a média, mostra a média, decide a situação e mostra a situação. Se outra parte do programa precisar só da média, para somar com outra coisa, não tem como pegar: a função não devolve nada, só mostra. Dividindo em funções com uma tarefa cada:

```js
function calcularMedia(n1, n2) {
  return (n1 + n2) / 2;
}

function situacao(media) {
  if (media >= 7) {
    return "aprovado";
  }
  return "reprovado";
}

function mostrarBoletim(nome, n1, n2) {
  const media = calcularMedia(n1, n2);
  console.log(nome + ": média " + media + ", " + situacao(media));
}

mostrarBoletim("Ana", 8, 7); // Ana: média 7.5, aprovado
mostrarBoletim("Rui", 5, 6); // Rui: média 5.5, reprovado
```

Agora cada função tem uma tarefa só:

| Função | Tarefa | Mostra algo? |
|---|---|---|
| `calcularMedia` | faz a conta | não: devolve |
| `situacao` | decide aprovado ou reprovado | não: devolve |
| `mostrarBoletim` | junta as outras e mostra o resultado | sim: é a tarefa dela |

A `calcularMedia` pode ser usada em qualquer lugar que precise de uma média, sem levar junto um `console.log` que ninguém pediu. Se a nota de aprovação mudar de 7 para 6, a mudança é na `situacao`, e em mais lugar nenhum. E só uma função fala com a tela, como a aula 5.3 recomendava: quem calcula devolve, e quem chamou decide o que mostrar.

Um jeito de perceber uma função fazendo coisas demais: tente dizer o que ela faz numa frase. Se a frase precisar de vários "e" ("calcula a média **e** mostra **e** decide **e** mostra de novo"), é hora de dividir.

## O módulo 5 inteiro

| Aula | A peça | Em uma frase |
|---|---|---|
| 5.1 | criar e chamar | um trecho com nome, que só roda quando é chamado |
| 5.2 | parâmetros e argumentos | as entradas: o nome na definição, o valor na chamada |
| 5.3 | `return` | a saída: devolver para o programa, e não só mostrar |
| 5.4 | escopo | o que é da função fica na função |
| 5.5 | dividir para conquistar | funções pequenas, cada uma com uma tarefa, chamando umas às outras |

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| função que responde sim ou não | `function ehPar(numero) { return numero % 2 === 0; }` | `def eh_par(numero): return numero % 2 == 0` |
| costume para nomes | camelCase: `maiorDeDois` | palavras com `_`: `maior_de_dois` |
| o maior de vários, já pronto | `Math.max(4, 9, 15)` | `max(4, 9, 15)` |

```python
def maior_de_dois(a, b):
    if a > b:
        return a
    return b

def maior_de_tres(a, b, c):
    return maior_de_dois(maior_de_dois(a, b), c)

print(maior_de_tres(4, 9, 15))  # 15
```

As duas linguagens já trazem prontas funções que acham o maior: `Math.max` no JavaScript e `max` no Python. Escrever `maiorDeDois` à mão é para entender a ideia. No dia a dia, usa-se a pronta, e o tempo vai para os problemas que ainda não têm função pronta.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> function ehPar(numero) {
>   return numero % 2 === 0;
> }
>
> console.log(ehPar(7));
> console.log(ehPar(0));
> ```
>
> > [!success]- Resposta
> > `false` e depois `true`. O 7 deixa resto 1 na divisão por 2. O 0 deixa resto 0, então é par.

> [!question] 2. O que aparece no console?
> ```js
> function ehMaiorDeIdade(idade) {
>   return idade >= 18;
> }
>
> if (ehMaiorDeIdade(16)) {
>   console.log("pode entrar");
> } else {
>   console.log("não pode entrar");
> }
> ```
>
> > [!success]- Resposta
> > `não pode entrar`. A chamada devolve `false`, porque `16 >= 18` é falso, e o `if` vai para o `else`.

> [!question] 3. O que aparece no console?
> ```js
> function maiorDeDois(a, b) {
>   if (a > b) {
>     return a;
>   }
>   return b;
> }
>
> function maiorDeTres(a, b, c) {
>   const maiorEntreAeB = maiorDeDois(a, b);
>   return maiorDeDois(maiorEntreAeB, c);
> }
>
> console.log(maiorDeTres(15, 15, 9));
> ```
>
> > [!success]- Resposta
> > `15`. Na primeira chamada, `15 > 15` dá `false`, e a função devolve o `b`, que também vale 15. Na segunda, `15 > 9` dá `true`, e sai 15. O empate não atrapalha, porque a função devolve o valor.

> [!question] 4. O que aparece no console?
> ```js
> function dobro(n) {
>   return n * 2;
> }
>
> function quadruplo(n) {
>   return dobro(dobro(n));
> }
>
> console.log(quadruplo(3));
> ```
>
> > [!success]- Resposta
> > `12`. A `quadruplo` usa a `dobro` duas vezes: `dobro(3)` devolve 6, e `dobro(6)` devolve 12. Quatro vezes é o dobro do dobro.

> [!question] 5. Em que ordem aparecem as mensagens?
> ```js
> function a() {
>   console.log("A começa");
>   b();
>   console.log("A termina");
> }
>
> function b() {
>   console.log("B");
> }
>
> a();
> ```
>
> > [!success]- Resposta
> > `A começa`, `B` e `A termina`. A `a` para na chamada `b()`, espera a `b` rodar inteira e só depois segue para a última linha.

> [!question] 6. Como escrever esta função de um jeito mais curto?
> ```js
> function ehImpar(n) {
>   if (n % 2 !== 0) {
>     return true;
>   } else {
>     return false;
>   }
> }
> ```
>
> > [!success]- Resposta
> > Devolvendo a própria comparação:
> >
> > ```js
> > function ehImpar(n) {
> >   return n % 2 !== 0;
> > }
> > ```
> >
> > Ou, reaproveitando a `ehPar`, com o `!` da aula 2.5, que inverte o booleano:
> >
> > ```js
> > function ehImpar(n) {
> >   return !ehPar(n);
> > }
> > ```

> [!question] 7. O que aparece no console?
> ```js
> function calcularMedia(n1, n2) {
>   return (n1 + n2) / 2;
> }
>
> function situacao(media) {
>   if (media >= 7) {
>     return "aprovado";
>   }
>   return "reprovado";
> }
>
> function mostrarBoletim(nome, n1, n2) {
>   const media = calcularMedia(n1, n2);
>   console.log(nome + ": média " + media + ", " + situacao(media));
> }
>
> mostrarBoletim("Bia", 10, 6);
> ```
>
> > [!success]- Resposta
> > `Bia: média 8, aprovado`. A `calcularMedia` devolve `(10 + 6) / 2`, que é 8. A `situacao(8)` devolve `"aprovado"`. A `mostrarBoletim` junta tudo numa linha e mostra.

> [!question] 8. Escreva o código.
> Usando a `maiorDeDois` e a `maiorDeTres`, escreva uma `maiorDeQuatro(a, b, c, d)`.
>
> > [!success]- Resposta
> > ```js
> > function maiorDeQuatro(a, b, c, d) {
> >   return maiorDeDois(maiorDeTres(a, b, c), d);
> > }
> > ```
> >
> > O maior dos três primeiros enfrenta o quarto. Também daria para escrever `maiorDeDois(maiorDeDois(a, b), maiorDeDois(c, d))`, como as semifinais de um torneio.

> [!question] 9. Escreva o código.
> Escreva uma `menorDeDois(a, b)` e, usando ela, uma `menorDeTres(a, b, c)`. Teste com `menorDeTres(7, 3, 5)`, que deve dar 3.
>
> > [!success]- Resposta
> > ```js
> > function menorDeDois(a, b) {
> >   if (a < b) {
> >     return a;
> >   }
> >   return b;
> > }
> >
> > function menorDeTres(a, b, c) {
> >   return menorDeDois(menorDeDois(a, b), c);
> > }
> >
> > console.log(menorDeTres(7, 3, 5)); // 3
> > ```
> >
> > É a `maiorDeDois` com o sinal virado. A `menorDeTres` faz a chamada de dentro direto como argumento, sem guardar numa variável antes: dá no mesmo.

> [!question] 10. Esta função faz coisas demais. Como dividir?
> ```js
> function processarCompra(preco, quantidade) {
>   const total = preco * quantidade;
>   console.log(total);
>   if (total >= 100) {
>     console.log("Frete grátis");
>   } else {
>     console.log("Frete: 15");
>   }
> }
> ```
>
> > [!success]- Resposta
> > Ela calcula o total, mostra o total, decide o frete e mostra o frete. Um jeito de dividir: uma função para cada conta ou decisão, que devolve, e uma só que mostra.
> >
> > ```js
> > function calcularTotal(preco, quantidade) {
> >   return preco * quantidade;
> > }
> >
> > function calcularFrete(total) {
> >   if (total >= 100) {
> >     return 0;
> >   }
> >   return 15;
> > }
> >
> > function mostrarCompra(preco, quantidade) {
> >   const total = calcularTotal(preco, quantidade);
> >   console.log("Total: " + total);
> >   console.log("Frete: " + calcularFrete(total));
> > }
> >
> > mostrarCompra(30, 4); // Total: 120 e Frete: 0
> > ```
> >
> > Agora o total e o frete podem ser usados em outras contas, e a regra do frete grátis mora num lugar só.

## De onde vêm as palavras

- **[[glossario/dividir-para-conquistar|Dividir para conquistar]]**: tradução do latim *dīvide et imperā*, ao pé da letra "divide e governa". Começou como conselho de política e de guerra: separar os inimigos para dominá-los um de cada vez. A tradição atribui a frase a Filipe II da Macedônia, pai de Alexandre, o Grande. Na computação, a ideia virou um jeito de montar algoritmos. Um dos primeiros, de 1945, é atribuído ao matemático John von Neumann: um método de pôr uma lista em ordem dividindo-a em metades.
- **Dividir**: do latim *dīvidere*, "separar, repartir", de *dis-* ("em dois") + uma raiz que quer dizer "separar". Segundo o Wiktionary, da mesma raiz vem *vidua*, a **viúva**, a mulher separada do marido.
- **Conquistar**: possivelmente do latim *conquīrere*, "procurar com empenho, ir em busca; juntar, reunir", de *con-* + *quaerere*, "buscar, pedir, querer". O *quaerere* deu também o nosso **querer**. Conquistar é, na origem, **ir buscar**.
- **[[glossario/dry|Repetir]]**: do latim *repetere*, "voltar a; recomeçar, repetir", de *re-* ("de novo") + *petere*, "dirigir-se a, buscar, pedir". O *petere* deu o nosso **pedir**. Repetir é ir buscar de novo o que já foi buscado.
- **Responsabilidade**: de *responsável*, que veio pelo francês *responsable*, do latim *respondēre*, "responder". O *respondēre* é *re-* + *spondēre*, "prometer, comprometer-se". O responsável é **quem responde** por alguma coisa. Do mesmo *spondēre* vem *spōnsus*, que deu **esposo**: aquele com quem se fez uma promessa.

> [!tip] Para guardar
> - Dividir para conquistar: quebrar um problema grande em funções pequenas, cada uma resolvendo uma parte, e juntar tudo.
> - Uma função pode chamar outra. A que chamou espera a outra terminar e segue com o valor devolvido.
> - Uma função que responde sim ou não pode devolver a própria comparação: `return numero % 2 === 0;`.
> - Muitas vezes, um problema novo vira um problema velho usado mais de uma vez: o maior de três é o maior de dois, duas vezes.
> - DRY: a mesma lógica não deve estar escrita em dois lugares. Mudou a regra, muda um lugar só.
> - Bons nomes dizem o que a função faz: `ehPar`, `calcularMedia`. Nomes como `funcao1` não dizem nada.
> - Uma função, uma tarefa. Funções que calculam devolvem, e quem chama decide o que mostrar.

Fontes: MDN: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) · Wikipedia: [Divide and conquer](https://en.wikipedia.org/wiki/Divide_and_conquer), [Divide-and-conquer algorithm](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm), [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) · Wiktionary: [divide and conquer](https://en.wiktionary.org/wiki/divide_and_conquer), [dīvide et imperā](https://en.wiktionary.org/wiki/divide_et_impera), [dīvidō](https://en.wiktionary.org/wiki/divido), [conquistar](https://en.wiktionary.org/wiki/conquistar), [conquīrō](https://en.wiktionary.org/wiki/conquiro), [quaerō](https://en.wiktionary.org/wiki/quaero), [repetō](https://en.wiktionary.org/wiki/repeto), [petō](https://en.wiktionary.org/wiki/peto), [responsável](https://en.wiktionary.org/wiki/respons%C3%A1vel), [respondeō](https://en.wiktionary.org/wiki/respondeo), [spondeō](https://en.wiktionary.org/wiki/spondeo), [esposo](https://en.wiktionary.org/wiki/esposo)
