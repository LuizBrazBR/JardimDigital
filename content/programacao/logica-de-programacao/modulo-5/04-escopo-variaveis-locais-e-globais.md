---
title: "5.4 Escopo: variáveis locais e globais"
tags:
  - logica-de-programacao
  - javascript
  - funcoes
---

Quarta aula do módulo 5. Ela responde a uma pergunta que já apareceu várias vezes no curso: por que uma variável às vezes "some"?

- Na [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]], o `i` do `for` dava `ReferenceError` depois do laço.
- Na [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], a `soma` criada dentro do laço também não existia depois dele.
- Na [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|aula 5.2]], o parâmetro `nome` não existia fora da função.

Em todos esses casos, a variável existia, mas só num pedaço do código. Esse pedaço se chama **[[glossario/escopo|escopo]]**: o trecho do programa onde um nome vale.

## Quem vê quem

Pense num carro com insulfilm, aquela película escura nos vidros. Quem está dentro do carro enxerga a rua normalmente. Quem está na rua não enxerga o que há dentro do carro.

A função é o carro. De dentro dela, dá para ver as variáveis de fora. De fora, ninguém vê as variáveis de dentro.

## Variável local: só dentro da função

Uma variável criada dentro de uma função, com `let` ou `const`, é uma **variável local**. Ela só existe ali dentro:

```js
function precoComDesconto(preco) {
  const desconto = preco * 0.1;
  return preco - desconto;
}

console.log(precoComDesconto(200)); // 180
console.log(desconto);              // ReferenceError: desconto is not defined
```

O `desconto` foi criado no corpo da função. Fora dela, para o JavaScript, esse nome nunca existiu. O parâmetro `preco` também é local, como se viu na aula 5.2: ele é uma variável da função, criada na chamada.

Se o valor de dentro for necessário fora, o caminho é o da [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]]: devolver com `return` e guardar o resultado numa variável de fora.

### Cada chamada tem as suas

As variáveis locais são criadas a cada chamada e somem quando a função termina. A função não lembra nada da chamada anterior:

```js
function contar() {
  let vezes = 0;
  vezes++;
  console.log(vezes);
}

contar(); // 1
contar(); // 1, e não 2
```

Na segunda chamada, o `let vezes = 0` roda de novo e cria um `vezes` novo, valendo 0. O `vezes` da primeira chamada já não existe. É o mesmo que acontecia com a `soma` criada dentro do laço, na aula 4.4: a linha que cria a variável roda de novo e começa tudo do zero.

## Variável global: vista de todo lugar

Uma variável criada fora de qualquer função é uma **variável global**. Ela existe no programa inteiro, e as funções conseguem lê-la:

```js
const loja = "Padaria do Bairro";

function mostrarCabecalho() {
  console.log("Bem-vindo à " + loja);
}

mostrarCabecalho(); // Bem-vindo à Padaria do Bairro
```

A `loja` não é parâmetro e não foi criada dentro da função. Mesmo assim, a função a enxerga, porque olha de dentro do carro para a rua.

### Dentro da função, dá para mudar uma global

Se a variável global foi criada com `let`, a função também pode mudar o valor dela:

```js
let contador = 0;

function somarUm() {
  contador = contador + 1; // sem let: mexe no contador de fora
}

somarUm();
somarUm();
console.log(contador); // 2
```

Repare que não há `let` dentro da função. A linha `contador = contador + 1` só muda o valor de uma variável que já existe, a de fora. Diferente do `vezes` do exemplo anterior, o `contador` não some quando a função termina, porque não é dela: é do programa.

## Mesmo nome dentro e fora

E se a função criar uma variável local com o mesmo nome de uma global? São duas variáveis diferentes. Lá dentro, vale a mais próxima, a local:

```js
let mensagem = "de fora";

function teste() {
  let mensagem = "de dentro";
  console.log(mensagem);
}

teste();               // de dentro
console.log(mensagem); // de fora
```

Dentro da função, o nome `mensagem` passa a ser o da variável local, e a global fica escondida. A global não muda: quando a função termina, a local some, e o `mensagem` de fora continua valendo `"de fora"`. É o que acontecia com o `i` de dois laços aninhados na [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]]: o `i` de dentro escondia o de fora. Em inglês, isso se chama *shadowing*, de *shadow*, "sombra": a variável de dentro faz sombra na de fora.

O `let` faz toda a diferença:

| Dentro da função | O que acontece |
|---|---|
| `pontos = 0;` | muda a variável global `pontos` |
| `let pontos = 0;` | cria uma variável local nova, que esconde a global. A global não muda |

## Duas funções, o mesmo nome

Como cada variável local só existe na sua função, duas funções podem usar o mesmo nome sem problema:

```js
function precoComDesconto(preco) {
  const final = preco * 0.9;
  return final;
}

function precoComFrete(preco) {
  const final = preco + 15;
  return final;
}

console.log(precoComDesconto(100)); // 90
console.log(precoComFrete(100));    // 115
```

Há dois `final` e dois `preco`, um em cada função, e um não atrapalha o outro. É como dois carros, cada um com uma mochila chamada "mochila" no banco de trás. Ninguém confunde uma com a outra, porque cada uma está no seu carro.

## Por que preferir variáveis locais

À primeira vista, a variável local parece uma limitação. Na verdade, é uma proteção.

**Uma função com variáveis locais é uma caixa fechada.** O que ela precisa entra pelos parâmetros, o resultado sai pelo `return`, e o resto fica lá dentro. Para entender uma função assim, basta ler a própria função. Você pode até copiá-la para outro programa, e ela continua funcionando, porque não depende de nada de fora.

**Uma variável global que muda é um risco.** Qualquer função pode mexer nela. Se ela aparecer com um valor errado, o culpado pode estar em qualquer parte do programa, e é preciso procurar em todas. Num programa de dez linhas, isso é fácil. Num de mil, não.

A regra prática: guarde nas variáveis locais o que é de uma função só, e passe o resto por parâmetros e `return`. Globais com `const`, como o nome de uma loja ou uma taxa fixa, não fazem mal, porque ninguém consegue mudá-las. O cuidado é com as globais de `let`.

> [!warning] Esquecer o `let` dentro da função
> Este código parece criar uma variável local, mas não cria:
>
> ```js
> function calcular() {
>   total = 10; // faltou o let
> }
>
> calcular();
> console.log(total); // 10
> ```
>
> Como não existe nenhum `total`, nem dentro nem fora, e falta o `let`, o JavaScript cria uma variável **global** sem avisar. O `total` escapa da função, e qualquer parte do programa passa a enxergá-lo. Em alguns ambientes, no chamado modo estrito, o mesmo código dá `ReferenceError: total is not defined`. Num arquivo comum, ele roda calado. Por isso, ao criar uma variável, sempre use `let` ou `const`.

## Não é só a função: o bloco também

Com `let` e `const`, o escopo não é só a função. É qualquer [[glossario/bloco|bloco]] entre chaves: o de um `if`, o de um `for`, o de um `while`.

```js
if (true) {
  let aviso = "oi";
}

console.log(aviso); // ReferenceError: aviso is not defined
```

É por isso que o `i` do `for`, na aula 4.3, não existia depois do laço, e que a `soma` criada dentro do laço, na aula 4.4, também não. O corpo de uma função também é um bloco, e as regras são as mesmas.

Os blocos podem ficar um dentro do outro, como uma função com um `for` dentro, e a regra do insulfilm vale em cada nível: de dentro se vê o de fora, de fora não se vê o de dentro.

```js
const limite = 3;              // global

function mostrar() {
  let titulo = "Contagem";     // local da função
  console.log(titulo);

  for (let i = 1; i <= limite; i++) {
    let dobro = i * 2;         // local do bloco do for
    console.log(i, dobro);     // vê i, dobro, titulo e limite
  }

  // aqui, i e dobro já não existem, mas titulo e limite ainda existem
}
```

> [!info]- E o `var`? (clique para abrir)
> A [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]] disse que o `var`, o jeito antigo de criar variáveis, tem comportamentos que confundem. Este é um deles: o `var` respeita o escopo da função, mas **ignora** os blocos.
>
> ```js
> if (true) {
>   var v = 1;
> }
>
> console.log(v); // 1: com var, a variável escapa do bloco do if
> ```
>
> Com `let`, essa última linha daria `ReferenceError`. Foi para ter variáveis que respeitam os blocos que o `let` e o `const` entraram na linguagem, em 2015.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| variável criada dentro da função | local | local |
| variável criada dentro de um `if` ou de um `for` | só existe no bloco (com `let` ou `const`) | continua existindo depois do bloco |
| ler uma global dentro da função | pode | pode |
| mudar uma global dentro da função | pode, sem `let` | precisa avisar antes, com `global` |

```python
contador = 0

def somar_um():
    global contador        # avisa que o contador é o de fora
    contador = contador + 1

somar_um()
print(contador)            # 1

for i in range(3):
    pass

print(i)                   # 2: no Python, o i continua existindo
```

No Python, só a função cria um escopo novo. O `if` e o `for` não criam, então a variável de dentro deles continua existindo depois. E, para mudar uma global dentro da função, é preciso escrever `global` antes. Sem isso, `contador = ...` criaria uma variável local nova, com o mesmo nome.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que acontece na última linha?
> ```js
> function precoComDesconto(preco) {
>   const desconto = preco * 0.1;
>   return preco - desconto;
> }
>
> precoComDesconto(200);
> console.log(desconto);
> ```
>
> > [!success]- Resposta
> > `ReferenceError: desconto is not defined`. O `desconto` é uma variável local: só existe dentro da função, e só durante a chamada.

> [!question] 2. O que aparece no console?
> ```js
> const taxa = 5;
>
> function comTaxa(valor) {
>   return valor + taxa;
> }
>
> console.log(comTaxa(10));
> ```
>
> > [!success]- Resposta
> > `15`. A `taxa` é global, e a função consegue lê-la de dentro.

> [!question] 3. O que aparece no console?
> ```js
> let mensagem = "de fora";
>
> function teste() {
>   let mensagem = "de dentro";
>   console.log(mensagem);
> }
>
> teste();
> console.log(mensagem);
> ```
>
> > [!success]- Resposta
> > `de dentro` e depois `de fora`. O `let` dentro da função cria uma variável local nova, que esconde a global lá dentro. A global não muda.

> [!question] 4. O que aparece no console?
> ```js
> let contador = 0;
>
> function somarUm() {
>   contador = contador + 1;
> }
>
> somarUm();
> somarUm();
> somarUm();
> console.log(contador);
> ```
>
> > [!success]- Resposta
> > `3`. Sem `let` dentro da função, a linha muda o `contador` global. Cada chamada soma 1 a ele.

> [!question] 5. E agora, com `let` dentro da função?
> ```js
> let pontos = 10;
>
> function zerar() {
>   let pontos = 0;
> }
>
> zerar();
> console.log(pontos);
> ```
>
> > [!success]- Resposta
> > `10`. O `let pontos = 0` criou uma variável local nova, que sumiu quando a função terminou. A global nem foi tocada. Para zerar a global, seria preciso tirar o `let`: `pontos = 0;`.

> [!question] 6. O que aparece no console?
> ```js
> function contar() {
>   let vezes = 0;
>   vezes++;
>   console.log(vezes);
> }
>
> contar();
> contar();
> ```
>
> > [!success]- Resposta
> > `1` e `1`. Cada chamada cria um `vezes` novo, valendo 0, e soma 1. A função não lembra o `vezes` da chamada anterior.

> [!question] 7. O que acontece na última linha?
> ```js
> if (10 > 5) {
>   let resposta = "sim";
> }
>
> console.log(resposta);
> ```
>
> > [!success]- Resposta
> > `ReferenceError: resposta is not defined`. O `if` deu `true` e o bloco rodou, mas a `resposta` foi criada com `let` dentro do bloco, e só existe ali.

> [!question] 8. O que aparece no console?
> ```js
> function dobrar(n) {
>   n = n * 2;
>   return n;
> }
>
> let n = 5;
> console.log(dobrar(n));
> console.log(n);
> ```
>
> > [!success]- Resposta
> > `10` e depois `5`. São dois `n` diferentes: o parâmetro, local da função, e a variável global. Na chamada, o valor 5 é guardado no parâmetro, e só o parâmetro é dobrado. A global continua valendo 5.

> [!question] 9. No Python, o que aparece?
> ```python
> for i in range(3):
>     pass
>
> print(i)
> ```
>
> > [!success]- Resposta
> > `2`. No Python, o `for` não cria um escopo novo, então o `i` continua existindo depois do laço, com o último valor que recebeu. O mesmo laço em JavaScript, com `let i`, daria `ReferenceError` na última linha.

> [!question] 10. O que está errado, e como corrigir?
> ```js
> function calcularMedia(a, b) {
>   const media = (a + b) / 2;
> }
>
> calcularMedia(6, 8);
> console.log(media);
> ```
>
> > [!success]- Resposta
> > A `media` é local da função, e a última linha dá `ReferenceError: media is not defined`. Para usar o valor fora, a função precisa devolvê-lo com `return`, e quem chama guarda o resultado numa variável:
> >
> > ```js
> > function calcularMedia(a, b) {
> >   const media = (a + b) / 2;
> >   return media;
> > }
> >
> > const m = calcularMedia(6, 8);
> > console.log(m); // 7
> > ```

## De onde vêm as palavras

- **[[glossario/escopo|Escopo]]**: do latim *scopus*, "alvo", do grego *skopós*. No grego, *skopós* era primeiro o **vigia**, a sentinela no alto, e depois também o **alvo**, aquilo para onde se olha. Vem da raiz de *sképtomai*, "observar", a mesma de **cético**, quem examina antes de acreditar. O **bispo** também é parente: vem do grego *epískopos*, o supervisor que vigia a comunidade. Na programação, o escopo é o alcance de um nome, até onde ele é visto, como o alcance da vista do vigia.
- **Local**: do latim tardio *locālis*, "de um lugar", de *locus*, "lugar". E **lugar** é a mesma palavra latina, que chegou ao português por outro caminho: *local* veio pelos livros, quase igual ao latim, e *lugar* foi mudando na boca do povo ao longo dos séculos. A variável local é a variável **de um lugar só**.
- **Global**: de *globo* + *-al*. *Globo* vem do latim *globus*, "bola, esfera". Global é o que vale **no globo inteiro**. A variável global vale no programa todo.

> [!tip] Para guardar
> - Escopo é o trecho do programa onde um nome vale.
> - Variável local: criada dentro de uma função ou de um bloco, com `let` ou `const`. Só existe ali dentro, e só enquanto aquele trecho roda.
> - Variável global: criada fora de qualquer função. Existe no programa inteiro.
> - De dentro se vê o de fora. De fora não se vê o de dentro.
> - Cada chamada cria as suas variáveis locais. A função não lembra nada da chamada anterior.
> - Com `let`, o mesmo nome dentro da função cria outra variável, que esconde a de fora. Sem `let`, a função mexe na de fora.
> - Prefira variáveis locais, parâmetros e `return`. Globais com `let` podem ser mudadas por qualquer parte do programa.

Fontes: MDN: [Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope), [Functions: function scopes and closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scopes_and_closures), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) · Python: [Tutorial, Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions) · Wiktionary: [scope](https://en.wiktionary.org/wiki/scope), [scopus](https://en.wiktionary.org/wiki/scopus), [σκοπός](https://en.wiktionary.org/wiki/%CF%83%CE%BA%CE%BF%CF%80%CF%8C%CF%82), [bispo](https://en.wiktionary.org/wiki/bispo), [local](https://en.wiktionary.org/wiki/local), [locālis](https://en.wiktionary.org/wiki/localis), [lugar](https://en.wiktionary.org/wiki/lugar), [locus](https://en.wiktionary.org/wiki/locus), [global](https://en.wiktionary.org/wiki/global), [globus](https://en.wiktionary.org/wiki/globus)
