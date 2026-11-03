---
title: "7.1 Como atacar um problema de programação"
tags:
  - logica-de-programacao
  - javascript
  - resolucao-de-problemas
---

Primeira aula do módulo 7, o último do curso. Cada módulo até aqui trouxe peças novas: variáveis e operadores no 2, decisões no 3, repetição no 4, funções no 5, arrays e objetos no 6. Esta aula não traz peça nova. Ela mostra como usar as peças juntas quando aparece um [[glossario/problema|problema]] que você nunca viu.

A ideia de fundo é a da [[programacao/logica-de-programacao/modulo-1/02-pensando-como-programador|aula 1.2]]: um problema grande é feito de vários problemas pequenos. Lá, você ainda não sabia escrever o código de cada parte. Agora sabe.

## Por que não começar pelo código

Diante de um exercício, a vontade é abrir o editor e sair escrevendo. Às vezes dá certo. Muitas vezes, o código para no meio, e você não sabe qual deve ser a próxima linha. Ou você termina e descobre que respondeu outra pergunta: mostrou **quem** é maior de idade, quando o problema pedia **quantos** são.

O código é a última coisa a escrever. Antes dele vêm três passos que se resolvem em português, sem computador.

## O roteiro em quatro passos

| Passo | Pergunta | O que sai dele |
|---|---|---|
| 1. Entender | O que o problema pede como resposta? Com que dados eu começo? | uma frase dizendo qual é a resposta |
| 2. Quebrar em passos | Que ações, e em que ordem, levam dos dados à resposta? | uma lista de passos em português |
| 3. Escolher as ferramentas | O que cada passo precisa: variável, laço, `if`, array, função? | um esboço do que usar |
| 4. Escrever e testar aos poucos | O pedaço que acabei de escrever fez o que eu esperava? | um `console.log` que confirma, ou que mostra onde está o erro |

### 1. Entender o enunciado

O [[glossario/enunciado|enunciado]] é o texto que descreve o problema. Leia devagar e responda duas perguntas:

- **O que sai no fim?** Um número, um texto, uma lista, um sim ou não? Escreva a resposta numa frase: "a resposta é um número, a quantidade de pessoas com 18 anos ou mais".
- **Com o que eu começo?** Quais dados o problema dá: uma lista de idades, um carrinho com preços, o nome de um usuário.

Os detalhes também contam. "18 anos ou mais" inclui quem tem 18. "Mais de 18" não inclui. No código, essa diferença vira um `>=` ou um `>`, e você só a percebe se ler com calma.

### 2. Quebrar em passos

Escreva, em português mesmo, as ações que levam dos dados à resposta: frases curtas, uma ação por linha, na ordem em que acontecem. É a [[glossario/decomposicao|decomposição]] da aula 1.2, escrita como o [[glossario/pseudocodigo|pseudocódigo]] da [[programacao/logica-de-programacao/modulo-1/04-do-pseudocodigo-ao-fluxograma|aula 1.4]].

Se um passo ainda parecer grande, quebre-o de novo. "Calcular a média" vira "somar as notas" e "dividir a soma pela quantidade".

### 3. Escolher as ferramentas

Muitas vezes, uma palavra do passo indica qual peça do curso ele pede:

| Se o passo diz... | A ferramenta | Vista na |
|---|---|---|
| "guardar", "lembrar" um valor | uma variável | aula 2.1 |
| "uma lista de", "vários" | um array | aula 6.1 |
| as informações de uma coisa só (nome, preço, nota) | um objeto | aula 6.4 |
| "para cada", "um de cada vez" | um laço, como o `for...of` | aulas 4.1 e 6.3 |
| "se", "só os que", "quando" | um `if` | aula 3.1 |
| "quantos" | um contador | aula 4.4 |
| "o total", "a soma" | um acumulador | aula 4.4 |
| uma parte com nome próprio, ou que se repete | uma função | aulas 5.1 e 5.5 |

As palavras são pistas, e o passo pode pedir outra coisa. "Quantos itens tem a lista" é só um `.length`, da [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]], sem contador nenhum. Mas elas dão por onde começar.

### 4. Escrever e testar aos poucos

Não escreva o programa inteiro de uma vez. Escreva um pedaço pequeno, rode, e confira com um `console.log` se ele fez o que devia. Só então escreva o próximo.

Para conferir, você precisa saber **antes de rodar** o que deveria aparecer. Se você espera 7 idades e aparecem 7, o pedaço está certo. Se aparecem 6, o erro está no pedaço que acabou de escrever, porque o resto já tinha sido conferido.

Por isso, faça um [[glossario/teste|teste]] com dados cuja resposta você conhece: conte na mão primeiro. Se você não sabe que a resposta é 4, um 3 no console parece tão certo quanto um 4.

## Um exemplo do zero: quantos são maiores de idade

> Você tem as idades das pessoas inscritas numa oficina. Descubra quantas têm 18 anos ou mais.

### Passo 1: entender

- A resposta é **um número**: quantas pessoas têm 18 anos ou mais. Não é para mostrar quem são, só contar.
- O dado de partida é uma lista de idades.
- "18 anos ou mais" inclui quem tem exatamente 18.

Antes de escrever código, conte na mão com uma lista de exemplo:

`15, 22, 17, 30, 18, 12, 45`

Têm 18 ou mais: o 22, o 30, o 18 e o 45. A resposta certa é **4**. É com esse número que o código vai ser conferido.

### Passo 2: quebrar em passos

1. Ter a lista de idades.
2. Começar um contador em 0.
3. Olhar as idades, uma de cada vez.
4. Se a idade for 18 ou mais, somar 1 ao contador.
5. No fim, mostrar o contador.

A ordem importa. O contador começa **antes** de olhar as idades, porque precisa existir já na primeira. E o resultado só sai **depois** de olhar todas, porque antes disso a contagem não terminou.

### Passo 3: escolher as ferramentas

| Passo | Ferramenta |
|---|---|
| 1. ter a lista | um array: `const idades = [...]` |
| 2. contador em 0 | uma variável: `let maioresDeIdade = 0` |
| 3. uma de cada vez | um `for...of` |
| 4. se for 18 ou mais | um `if` com `>=` |
| 5. mostrar no fim | um `console.log` depois do laço |

O array usa `const`, porque a lista não vai ser trocada por outra. O contador usa `let`, porque muda a cada pessoa contada. E a variável do `for...of` também pode ser `const`, como a [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]] mostrou: cada volta cria uma variável nova.

### Passo 4: escrever e testar aos poucos

**Primeiro pedaço: só o laço.** Antes de decidir qualquer coisa, confira se o laço passa por todas as idades:

```js
const idades = [15, 22, 17, 30, 18, 12, 45];

for (const idade of idades) {
  console.log(idade);
}
// 15
// 22
// 17
// 30
// 18
// 12
// 45
```

Você esperava 7 idades, na ordem da lista. Apareceram 7. O laço está certo.

**Segundo pedaço: o `if`.** Ainda sem contador, mostre só as idades que passam na condição:

```js
for (const idade of idades) {
  if (idade >= 18) {
    console.log(idade);
  }
}
// 22
// 30
// 18
// 45
```

Você esperava o 22, o 30, o 18 e o 45. O 18 apareceu, então o `>=` está certo. Se aparecessem só três números, sem o 18, o erro estaria no sinal: um `>` no lugar do `>=`.

**Terceiro pedaço: o contador.** Agora o `console.log` de dentro do laço sai, e o contador entra no lugar dele:

```js
const idades = [15, 22, 17, 30, 18, 12, 45];

let maioresDeIdade = 0;

for (const idade of idades) {
  if (idade >= 18) {
    maioresDeIdade = maioresDeIdade + 1;
  }
}

console.log(maioresDeIdade); // 4
```

Você esperava 4, e apareceu 4. Só agora dá para confiar no resultado.

Imagine que você tivesse escrito tudo de uma vez e o console mostrasse 3. O erro poderia estar no laço, que talvez tenha pulado alguém. Poderia estar no `if`, com o sinal errado. Ou no contador, que talvez tenha começado em 1. Testando aos poucos, cada pedaço já foi conferido quando o próximo entra. Se algo der errado, foi no último.

## Um exemplo com duas respostas: a média da turma

> Uma turma tem a nota de cada aluno. Mostre a média da turma e o nome de quem ficou abaixo dela.

### Entender

Aqui são **duas** respostas: um número, a média, e uma lista de nomes, os de quem ficou abaixo dela. Os dados são registros com nome e nota, num array de objetos como os da [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|aula 6.5]]:

```js
const alunos = [
  { nome: "Ana", nota: 8 },
  { nome: "Bia", nota: 5 },
  { nome: "Caio", nota: 9 },
  { nome: "Duda", nota: 6 }
];
```

Na mão: a soma é 8 + 5 + 9 + 6 = 28, e a média é 28 ÷ 4 = 7. Abaixo de 7 ficaram a Bia, com 5, e a Duda, com 6.

### Quebrar em passos

1. Somar as notas de todos.
2. Dividir a soma pela quantidade de alunos. O resultado é a média.
3. Olhar os alunos de novo, um de cada vez. Se a nota for menor que a média, guardar o nome.
4. Mostrar a média e os nomes.

Repare no "de novo" do passo 3. Não dá para saber quem ficou abaixo da média enquanto as notas ainda estão sendo somadas, porque a média só existe depois que **todas** foram somadas. Então o código passa duas vezes pela lista: a primeira passada calcula a média, e a segunda compara cada nota com ela. Os passos em português mostram isso antes de existir qualquer código.

### Escolher as ferramentas

- Passos 1 e 2: um acumulador, como na [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], e o `alunos.length` para a quantidade.
- Passo 3: outro `for...of`, com um `if` e um `push` num array novo, como em "Separar num array novo", da aula 6.5.
- Passo 4: `console.log`.

### Escrever e testar aos poucos

Primeiro, só a média, conferida antes de seguir:

```js
let soma = 0;

for (const aluno of alunos) {
  soma = soma + aluno.nota;
}

const media = soma / alunos.length;
console.log(media); // 7
```

Você esperava 7, e apareceu 7. Agora vem a segunda passada:

```js
const abaixoDaMedia = [];

for (const aluno of alunos) {
  if (aluno.nota < media) {
    abaixoDaMedia.push(aluno.nome);
  }
}

console.log("Média: " + media); // Média: 7
console.log(abaixoDaMedia);     // [ 'Bia', 'Duda' ]
```

O `abaixoDaMedia` é `const` e recebe `push` mesmo assim. É o que a aula 6.2 mostrou: o `const` impede trocar o array por outro, mas deixa pôr e tirar elementos dele.

> [!info]- E se cada passo virasse uma função? (clique para abrir)
> Com o que a [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]] mostrou, dá para dar um nome a cada passo:
>
> ```js
> function calcularMedia(turma) {
>   let soma = 0;
>   for (const aluno of turma) {
>     soma = soma + aluno.nota;
>   }
>   return soma / turma.length;
> }
>
> function nomesAbaixoDe(turma, limite) {
>   const nomes = [];
>   for (const aluno of turma) {
>     if (aluno.nota < limite) {
>       nomes.push(aluno.nome);
>     }
>   }
>   return nomes;
> }
>
> const media = calcularMedia(alunos);
> console.log(media);                        // 7
> console.log(nomesAbaixoDe(alunos, media)); // [ 'Bia', 'Duda' ]
> ```
>
> Cada função é um passo da lista em português, e o nome diz qual. Testar aos poucos também fica mais fácil: dá para escrever só a `calcularMedia`, conferir o 7, e só então escrever a outra.

## Os erros mais comuns

**Responder outra pergunta.** Este código funciona, mas mostra **quem** tem 18 anos ou mais, e o problema pedia **quantos**:

```js
for (const idade of idades) {
  if (idade >= 18) {
    console.log(idade);
  }
}
// 22
// 30
// 18
// 45
```

É o segundo pedaço do exemplo, que servia de teste, entregue como se fosse a resposta. A frase do passo 1, "a resposta é um número", evita esse engano.

**Escrever tudo de uma vez.** Quando o resultado sai errado, não dá para saber qual parte errou. Escreva um pedaço, confira, e só então escreva o próximo.

**Testar sem saber a resposta.** Sem contar na mão, qualquer número no console parece certo. E escolha a lista de teste com cuidado. Com `[15, 22, 30]`, o `>` e o `>=` dão o mesmo resultado, 2, e um sinal errado passa despercebido. Com um 18 na lista, o `>` conta uma pessoa a menos, e o erro aparece. São as bordas da [[programacao/logica-de-programacao/modulo-3/03-else-if-varias-condicoes-em-cadeia|aula 3.3]]: o erro costuma aparecer no valor exato em que a resposta muda.

**Pôr um passo fora da ordem.** Na lista em português, o contador começa antes do laço. Se no código ele for parar dentro do laço, o `let maioresDeIdade = 0` roda em toda volta e zera a contagem. É o primeiro erro da aula 4.4. A ordem dos passos em português é a ordem das linhas no código.

## Lógica ou JavaScript?

Os passos 1, 2 e 3 do roteiro são iguais em qualquer linguagem, porque se fazem em português. Só o passo 4 muda. O mesmo exemplo em Python:

| | JavaScript | Python |
|---|---|---|
| a lista | `const idades = [15, 22, 17]` | `idades = [15, 22, 17]` |
| percorrer | `for (const idade of idades)` | `for idade in idades:` |
| contar | `maioresDeIdade = maioresDeIdade + 1` | `maiores_de_idade = maiores_de_idade + 1` |
| conferir | `console.log(maioresDeIdade)` | `print(maiores_de_idade)` |

```python
idades = [15, 22, 17, 30, 18, 12, 45]

maiores_de_idade = 0

for idade in idades:
    if idade >= 18:
        maiores_de_idade = maiores_de_idade + 1

print(maiores_de_idade)  # 4
```

- **O Python não tem `let` nem `const`**: a variável passa a existir na primeira vez que recebe um valor.
- **O `print` faz o papel do `console.log`**, inclusive para testar aos poucos.
- **Os nomes usam snake_case**, como na aula 4.4: `maiores_de_idade`, e não `maioresDeIdade`.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Que tipo de resposta cada enunciado pede?
> Para cada um, diga se a resposta é um número, um texto, uma lista ou um sim ou não.
>
> 1. "Quantos produtos estão sem estoque?"
> 2. "Quais alunos tiraram 10?"
> 3. "Qual é o total do carrinho?"
> 4. "Tem alguma tarefa atrasada?"
>
> > [!success]- Resposta
> > 1. Um número: uma contagem.
> > 2. Uma lista: os nomes de quem tirou 10.
> > 3. Um número: uma soma.
> > 4. Um sim ou não: um `true` ou um `false`.

> [!question] 2. Quebre em passos.
> Escreva, em português, os passos para resolver: "Numa lista de números, mostre quantos são pares."
>
> > [!success]- Resposta
> > 1. Ter a lista de números.
> > 2. Começar um contador em 0.
> > 3. Olhar os números, um de cada vez.
> > 4. Se o resto da divisão do número por 2 for 0, somar 1 ao contador.
> > 5. No fim, mostrar o contador.
> >
> > São os mesmos passos do exemplo das idades. Só a condição do passo 4 mudou. É o padrão da aula 1.2: um problema novo com o formato de um que já foi resolvido.

> [!question] 3. Escolha as ferramentas.
> Que ferramenta cada passo abaixo pede?
>
> 1. Ter a lista de preços do carrinho.
> 2. Começar o total em 0.
> 3. Para cada preço, somar ao total.
> 4. No fim, mostrar o total.
>
> > [!success]- Resposta
> > 1. Um array: `const precos = [...]`.
> > 2. Uma variável com `let`, porque o total vai mudar: `let total = 0`.
> > 3. Um `for...of`, e dentro dele `total = total + preco`. Juntos, os passos 2 e 3 são um acumulador.
> > 4. Um `console.log(total)` depois do laço.

> [!question] 4. O que aparece no console?
> ```js
> const notas = [7, 4, 9, 6];
>
> for (const nota of notas) {
>   if (nota > 6) {
>     console.log(nota);
>   }
> }
> ```
>
> > [!success]- Resposta
> > `7` e depois `9`. O 6 não aparece, porque o `>` só deixa passar o que é maior que 6. Se o enunciado pedisse "6 ou mais", este pedaço de teste já mostraria que o sinal está errado: o certo seria `>=`.

> [!question] 5. Onde está o erro?
> O problema pede para contar quantas pessoas têm 18 anos ou mais. O código mostra 1:
>
> ```js
> const idades = [18, 20, 15, 18];
> let maioresDeIdade = 0;
>
> for (const idade of idades) {
>   if (idade > 18) {
>     maioresDeIdade = maioresDeIdade + 1;
>   }
> }
>
> console.log(maioresDeIdade); // 1
> ```
>
> > [!success]- Resposta
> > Na mão, a resposta é 3: o 18, o 20 e o outro 18. O erro está no `if`: com `>`, só o 20 passa. O certo é `idade >= 18`.
> >
> > Com uma lista sem nenhum 18, como `[20, 15, 30]`, o `>` e o `>=` dariam o mesmo resultado, e o erro passaria despercebido.

> [!question] 6. Por que a resposta está errada?
> O problema pede para contar quantas notas ficaram acima da média. Na mão, a média de 6, 8 e 10 é 8, e só o 10 fica acima: a resposta certa é 1. Mas o código mostra 3:
>
> ```js
> const notas = [6, 8, 10];
> let soma = 0;
> let acimaDaMedia = 0;
>
> for (const nota of notas) {
>   soma = soma + nota;
>   const media = soma / notas.length;
>   if (nota > media) {
>     acimaDaMedia = acimaDaMedia + 1;
>   }
> }
>
> console.log(acimaDaMedia); // 3
> ```
>
> > [!success]- Resposta
> > A média é calculada dentro do laço, com uma soma que ainda não terminou:
> >
> > | Volta | `nota` | `soma` | `media` | `nota > media`? |
> > |---|---|---|---|---|
> > | 1 | 6 | 6 | 2 | sim |
> > | 2 | 8 | 14 | 4,67 (aproximadamente) | sim |
> > | 3 | 10 | 24 | 8 | sim |
> >
> > Só na última volta a média fica certa. Antes disso, cada nota é comparada com uma média menor do que a de verdade. O certo é passar duas vezes pela lista, como no exemplo da turma: a primeira calcula a média, e a segunda compara.
> >
> > ```js
> > let soma = 0;
> > for (const nota of notas) {
> >   soma = soma + nota;
> > }
> > const media = soma / notas.length;
> >
> > let acimaDaMedia = 0;
> > for (const nota of notas) {
> >   if (nota > media) {
> >     acimaDaMedia = acimaDaMedia + 1;
> >   }
> > }
> >
> > console.log(acimaDaMedia); // 1
> > ```

> [!question] 7. Resolva com o roteiro.
> Com a lista de compras abaixo, mostre o total da compra e quantos itens custam mais de 10 reais. Conte na mão primeiro, depois escreva o código aos poucos.
>
> ```js
> const compras = [
>   { nome: "arroz", preco: 25 },
>   { nome: "sal", preco: 3 },
>   { nome: "café", preco: 18 },
>   { nome: "pão", preco: 10 }
> ];
> ```
>
> > [!success]- Resposta
> > Na mão: o total é 25 + 3 + 18 + 10 = 56. Custam mais de 10 o arroz e o café, então são 2. O pão custa exatamente 10 e fica de fora, porque "mais de 10" pede `>`, e não `>=`.
> >
> > ```js
> > let total = 0;
> > let maisDe10 = 0;
> >
> > for (const item of compras) {
> >   total = total + item.preco;
> >   if (item.preco > 10) {
> >     maisDe10 = maisDe10 + 1;
> >   }
> > }
> >
> > console.log(total);    // 56
> > console.log(maisDe10); // 2
> > ```
> >
> > Aqui um laço só resolve as duas respostas, porque nenhuma depende da outra: a contagem não precisa do total. Na média da turma era diferente, porque a comparação precisava da média pronta.

## De onde vêm as palavras

- **[[glossario/problema|Problema]]**: do latim *problēma*, que veio do grego *próblēma*. O verbo grego por trás é *probállō*, "lançar diante". O primeiro sentido de *próblēma* era concreto: qualquer coisa lançada à frente, ou que se projeta para fora, e daí "obstáculo". Mais tarde veio "o que se propõe como tarefa", e, na geometria, o problema no sentido de hoje. Ao pé da letra, um problema é **o que foi posto na sua frente**.
- **[[glossario/enunciado|Enunciado]]**: de *enunciar*, do latim *ēnūntiāre*, "revelar, expressar, declarar". É *ē-*, "para fora", mais *nūntiāre*, da família de *nūntius*, o **mensageiro**. O enunciado é a mensagem que declara o problema.
- **[[glossario/teste|Teste]]**: veio do inglês *test*, que veio do francês antigo *test*, "vaso de barro, especialmente o pote em que se provavam metais", e este do latim *testum*, "vaso de barro". Nesse pote, os metais preciosos eram derretidos para serem provados e purificados. Daí o sentido passou, por comparação, para qualquer prova: como quem trabalha com metais põe o ouro à prova, o professor põe à prova o que o aluno sabe.
- **Resolver**: do latim *resolvere*, de *re-* mais *solvere*, "soltar, desatar". Entre os sentidos de *resolvere* estão "soltar" e "desembaraçar". Resolver um problema é, na origem, **desatar um nó**.
- **Roteiro**: de *rota*, "caminho", mais *-eiro*. Um roteiro é o que diz o caminho de uma viagem, e hoje também é o texto de um filme. O roteiro desta aula diz o caminho do enunciado até o código.

> [!tip] Para guardar
> - Antes do código: entenda o que o problema pede, quebre-o em passos em português e escolha a ferramenta de cada passo.
> - Escreva a resposta esperada numa frase: é um número, um texto, uma lista ou um sim ou não?
> - Conte na mão com uma lista pequena antes de rodar. Sem saber a resposta certa, não dá para conferir.
> - Ponha na lista de teste o valor exato do limite, como o 18. É nele que um `>` no lugar de `>=` aparece.
> - Escreva um pedaço, rode, confira com `console.log`, e só então escreva o próximo. Se algo der errado, foi no último pedaço.
> - A ordem dos passos em português vira a ordem do código: o contador nasce antes do laço, e o resultado sai depois dele.
> - Se um passo precisa de um valor que só fica pronto no fim do laço, como a média, ele vai num segundo laço.

Fontes: MDN: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), [console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) · Wiktionary: [problema](https://en.wiktionary.org/wiki/problema), [πρόβλημα](https://en.wiktionary.org/wiki/%CF%80%CF%81%CF%8C%CE%B2%CE%BB%CE%B7%CE%BC%CE%B1), [enunciar](https://en.wiktionary.org/wiki/enunciar), [ēnūntiō](https://en.wiktionary.org/wiki/enuntio), [nūntius](https://en.wiktionary.org/wiki/nuntius), [teste](https://en.wiktionary.org/wiki/teste), [test](https://en.wiktionary.org/wiki/test), [resolver](https://en.wiktionary.org/wiki/resolver), [resolvō](https://en.wiktionary.org/wiki/resolvo), [roteiro](https://en.wiktionary.org/wiki/roteiro)
