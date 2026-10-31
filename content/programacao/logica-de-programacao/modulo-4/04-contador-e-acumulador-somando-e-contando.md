---
title: "4.4 Contador e acumulador: somando e contando"
tags:
  - logica-de-programacao
  - javascript
  - lacos
---

Quarta aula do módulo 4. Nas aulas 4.1 a 4.3, o laço mostrava números na tela. Agora ele passa a **calcular**: somar, contar, tirar a média. Esta aula não traz nenhuma palavra nova da linguagem. Ela ensina uma **técnica**, um jeito de juntar o que você já sabe (variável, laço, `if` e `%`) que aparece em quase todo programa. É um [[glossario/padrao|padrão]]: o mesmo formato serve para muitos problemas diferentes.

## O problema: o laço não guarda nada

Quanto dá 1 + 2 + 3 + 4 + 5? Com o que você viu até agora, o laço passa por todos esses números:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Mas ele só **mostra** cada número e segue em frente. A cada volta, o `i` ganha um valor novo, e o anterior se perde. Para chegar ao total, falta um lugar onde a conta vá se juntando de uma volta para a outra.

Esse lugar é uma variável criada **fora** do laço. Ela funciona como um cofrinho: a cada volta cai uma moeda, e o cofre vai guardando o total. O laço passa, e o cofrinho fica.

## A receita em três passos

Toda vez que um laço precisa calcular alguma coisa, o caminho é o mesmo:

1. **Antes do laço**, crie a variável, com um valor inicial.
2. **Dentro do laço**, atualize a variável a cada volta.
3. **Depois do laço**, use o resultado.

Os dois jeitos mais comuns de usar essa receita têm nome: o **acumulador** e o **contador**.

## Acumulador: juntando um total

Um **[[glossario/acumulador|acumulador]]** é uma variável que junta valores, um pouco a cada volta. Veja a soma de 1 até 5, com os três passos marcados:

```js
let n = 5;
let soma = 0;                  // 1. antes: o cofrinho começa vazio

for (let i = 1; i <= n; i++) {
  soma = soma + i;             // 2. dentro: cai o i no cofrinho
}

console.log(soma);             // 3. depois: o resultado
// saída: 15
```

A linha `soma = soma + i` se lê da direita para a esquerda, como o `i = i + 1` da aula 2.1: pega o total que já tinha, soma o `i` e guarda o resultado de volta na `soma`.

| Volta | `i` | `soma` antes | Conta | `soma` depois |
|---|---|---|---|---|
| 1ª | 1 | 0 | 0 + 1 | 1 |
| 2ª | 2 | 1 | 1 + 2 | 3 |
| 3ª | 3 | 3 | 3 + 3 | 6 |
| 4ª | 4 | 6 | 6 + 4 | 10 |
| 5ª | 5 | 10 | 10 + 5 | 15 |

Repare que a `soma` depois de uma volta é a `soma` antes da volta seguinte. É isso que a variável fora do laço faz: leva o resultado de uma volta para a outra.

Como na aula 4.3, existe um atalho: `soma += i` é o mesmo que `soma = soma + i`.

### Por que começar do 0: o valor neutro

O valor inicial não pode ser qualquer um. Se a `soma` começasse em 10, o resultado seria 25, e não 15: o 10 entraria na conta sem ter sido chamado. O valor inicial precisa ser um que não mude nada. Esse valor se chama **[[glossario/elemento-neutro|elemento neutro]]** da operação.

Na soma, o neutro é o 0, porque somar 0 não muda um número: 7 + 0 dá 7. Mas cada operação tem o seu. Na multiplicação, o neutro é o **1**: 7 × 1 dá 7. Veja o que acontece quando o acumulador multiplica:

```js
let produto = 1;

for (let i = 1; i <= 5; i++) {
  produto = produto * i;
}

console.log(produto); // 120, que é 1 x 2 x 3 x 4 x 5
```

Se o `produto` começasse em 0, o resultado seria 0, e continuaria 0 por mais voltas que o laço desse: qualquer número vezes 0 dá 0.

Até para juntar texto existe um neutro: o texto vazio, `""`. Juntar `""` a um texto não muda nada, como se viu com o `+` na aula 2.2:

```js
let texto = "";

for (let i = 1; i <= 5; i++) {
  texto = texto + i;
}

console.log(texto); // "12345"
```

| Operação do acumulador | Começa em | Porque |
|---|---|---|
| somar | `0` | 7 + 0 = 7 |
| multiplicar | `1` | 7 × 1 = 7 |
| juntar texto | `""` | `"abc" + ""` dá `"abc"` |

Então o acumulador não serve só para somar. A ideia dele é **juntar**: guardar, de uma volta para a outra, o resultado do que já passou. Quem escolhe **como** juntar é a linha de dentro do laço, com `+`, `*` ou outra operação. O valor inicial só precisa ser o neutro dessa operação.

Com o `+`, tem uma pegadinha: a linha de dentro pode ser exatamente a mesma, `x = x + i`, e o resultado mudar conforme o valor inicial. Começando em `0`, o `+` soma, e de 1 a 5 dá `15`. Começando em `""`, ele junta texto, como na aula 2.2, e dá `"12345"`. Aqui, é o valor inicial que decide o que o `+` faz.

## Contador: quantas vezes algo acontece

Um **[[glossario/contador|contador]]** é um acumulador mais simples: em vez de somar valores diferentes, ele soma sempre **1**. Normalmente, só quando uma condição é verdadeira. É ele que responde perguntas como "quantos números pares existem de 1 a 10?":

```js
let total = 10;
let quantidadePares = 0;           // 1. antes: nenhum par contado ainda

for (let i = 1; i <= total; i++) {
  if (i % 2 === 0) {               // resto 0 na divisão por 2: é par
    quantidadePares = quantidadePares + 1;   // 2. dentro: mais um
  }
}

console.log(quantidadePares);      // 3. depois: 5
```

O teste do par é o `%` da aula 2.3: um número par dividido por 2 não deixa resto. Volta a volta:

| `i` | `i % 2` | É par? | `quantidadePares` depois |
|---|---|---|---|
| 1 | 1 | não | 0 |
| 2 | 0 | sim | 1 |
| 3 | 1 | não | 1 |
| 4 | 0 | sim | 2 |
| 5 | 1 | não | 2 |
| 6 | 0 | sim | 3 |
| 7 | 1 | não | 3 |
| 8 | 0 | sim | 4 |
| 9 | 1 | não | 4 |
| 10 | 0 | sim | 5 |

O laço dá 10 voltas, mas o contador só anda em 5 delas, as que passam pelo `if`. Nas outras, ele fica parado.

Pense no porteiro de um show com um contador de mão, aquele aparelhinho que faz "clique". Ele não clica para cada pessoa que passa na calçada, só para quem entra. O `if` é a porta.

O atalho da linha do contador é o `++` da aula 4.1: `quantidadePares++`.

### Acumulador ou contador?

| | Acumulador | Contador |
|---|---|---|
| Responde | "quanto dá no total?" | "quantas vezes?" |
| A cada vez, soma | um valor que muda (o `i`, um preço, uma nota) | sempre 1 |
| Começa em | o neutro da conta (0 na soma, 1 na multiplicação) | 0 |
| Exemplo | o total da compra | quantos produtos estão no carrinho |

Os dois podem ficar dentro de um `if`. A soma só dos pares de 1 a 10, por exemplo, é um acumulador com filtro: `if (i % 2 === 0) { soma = soma + i; }` dá 2 + 4 + 6 + 8 + 10 = 30.

### Você já viu os dois juntos

Lembra do cofrinho da [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|aula 4.2]], que guardava 150 reais por mês até chegar a 1000?

```js
let total = 0;
let meses = 0;

while (total < 1000) {
  total = total + 150;
  meses = meses + 1;
}
```

O `total` é um acumulador: começa em 0 e recebe 150 a cada volta. O `meses` é um contador: começa em 0 e recebe 1 a cada volta. A técnica já estava lá, só ainda não tinha nome. E ela funciona igual no `while` e no `for`.

## Os dois juntos: a média

A média é a soma dividida pela quantidade. Então ela precisa dos dois: um acumulador para a soma e um contador para a quantidade.

```js
let n = 5;
let soma = 0;        // acumulador
let quantidade = 0;  // contador

for (let i = 1; i <= n; i++) {
  soma = soma + i;
  quantidade = quantidade + 1;
}

let media = soma / quantidade;
console.log(media); // 3, porque 15 / 5 = 3
```

Nesse exemplo, o contador nem era necessário: o laço dá sempre `n` voltas, e daria para dividir direto por `n`. O contador faz falta quando **não** se sabe de antemão quantos números vão entrar na conta, como na média só dos pares:

```js
let soma = 0;
let quantidade = 0;

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    soma = soma + i;
    quantidade = quantidade + 1;
  }
}

console.log(soma, quantidade, soma / quantidade); // 30 5 6
```

Aqui, o laço dá 10 voltas, mas só 5 números entram na média. Quem sabe disso é o contador.

> [!warning] E se nenhum número entrar na conta?
> Se nenhum número passar pelo `if`, a `soma` e a `quantidade` terminam em 0, e `0 / 0` dá `NaN`, como se viu na aula 2.3. Quando isso puder acontecer, confira se a `quantidade` é maior que 0 antes de dividir.

## Os erros mais comuns

**1. Criar a variável dentro do laço.**

```js
for (let i = 1; i <= 5; i++) {
  let soma = 0;       // errado: zera o cofrinho a cada volta
  soma = soma + i;
  console.log(soma);
}

// saída: 1, 2, 3, 4 e 5, em vez de 1, 3, 6, 10 e 15
```

A linha `let soma = 0` roda em **toda** volta e esvazia o cofrinho antes de cada moeda. No fim de cada volta, a `soma` é só o `i`. E um `console.log(soma)` depois do laço daria `ReferenceError: soma is not defined`: a variável criada dentro das chaves só existe ali dentro, como o `i` do `for` na [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]]. O passo 1 da receita é **antes** do laço, por um motivo.

**2. Esquecer o valor inicial.**

```js
let soma;   // sem valor: undefined

for (let i = 1; i <= 3; i++) {
  soma = soma + i;
}

console.log(soma); // NaN
```

Uma variável criada sem valor vale `undefined`, como na aula 2.1. Na primeira volta, a conta vira `undefined + 1`, que dá `NaN`. E, a partir daí, `NaN` mais qualquer coisa continua `NaN`.

**3. Esquecer de somar o que já tinha.**

```js
let soma = 0;

for (let i = 1; i <= 5; i++) {
  soma = i;   // deveria ser soma = soma + i
}

console.log(soma); // 5
```

Sem o `soma +`, cada volta joga fora o total e guarda só o `i` da vez. No fim, sobra só o último número.

**4. Mostrar dentro do laço achando que é o resultado.** Com o `console.log(soma)` dentro das chaves, aparecem `1`, `3`, `6`, `10` e `15`: os totais parciais, um por volta. Isso não é um erro, e ajuda a conferir se a conta está andando certo. Mas a resposta é só o último. Para mostrar só o resultado, o `console.log` vai depois do `}`.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| acumular | `soma += i` | `soma += i` |
| contar | `quantidade++` | `quantidade += 1` |
| é par? | `i % 2 === 0` | `i % 2 == 0` |

```python
quantidade_pares = 0

for i in range(1, 11):
    if i % 2 == 0:
        quantidade_pares += 1

print(quantidade_pares)  # 5
```

O Python não tem `++`, então o contador usa `+= 1`. E, por costume, os nomes de variável no Python usam *snake_case*: `quantidade_pares`, e não `quantidadePares` (ver [[glossario/camel-case|camelCase]]). Ele também tem uma soma pronta, o `sum`: `sum(range(1, 6))` dá 15, a mesma conta do acumulador.

> [!info]- O menino que não precisou do laço (clique para abrir)
> Uma história famosa conta que, quando Carl Friedrich Gauss estava no primário, o professor, J. G. Büttner, mandou a turma somar os números de 1 a 100. Gauss deu a resposta, 5050, muito antes do que o professor esperava. Ele teria percebido que os números formam pares com a mesma soma: 1 + 100, 2 + 99, 3 + 98... São 50 pares de 101, e 50 × 101 = 5050. É o mesmo Gauss que organizou a matemática do [[glossario/resto|resto]].
>
> Daí sai uma fórmula para a soma de 1 até `n`: `n * (n + 1) / 2`. Dá para conferir uma coisa com a outra:
>
> ```js
> let soma = 0;
> for (let i = 1; i <= 100; i++) {
>   soma = soma + i;
> }
> console.log(soma, 100 * (100 + 1) / 2); // 5050 5050
> ```
>
> A fórmula só serve para essa conta específica. O acumulador serve para qualquer uma: somar preços, notas, só os pares, só os que terminam em 7.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let soma = 0;
> for (let i = 1; i <= 4; i++) {
>   soma = soma + i;
> }
> console.log(soma);
> ```
>
> > [!success]- Resposta
> > `10`. A `soma` passa por 1, 3, 6 e 10: é 1 + 2 + 3 + 4.

> [!question] 2. O que aparece no console?
> Repare no que é somado a cada volta:
>
> ```js
> let soma = 0;
> for (let i = 1; i <= 3; i++) {
>   soma = soma + 10;
> }
> console.log(soma);
> ```
>
> > [!success]- Resposta
> > `30`. O laço dá 3 voltas, e cada uma soma 10, sem usar o `i`. A `soma` passa por 10, 20 e 30.

> [!question] 3. O que aparece no console?
> ```js
> let contador = 0;
> for (let i = 1; i <= 10; i++) {
>   if (i % 3 === 0) {
>     contador++;
>   }
> }
> console.log(contador);
> ```
>
> > [!success]- Resposta
> > `3`. O contador só anda quando o `i` é múltiplo de 3, ou seja, divisível por 3: no 3, no 6 e no 9.

> [!question] 4. O que aparece no console?
> ```js
> let produto = 1;
> for (let i = 1; i <= 4; i++) {
>   produto = produto * i;
> }
> console.log(produto);
> ```
>
> > [!success]- Resposta
> > `24`. O `produto` passa por 1, 2, 6 e 24: é 1 × 2 × 3 × 4.

> [!question] 5. E se o produto começasse em 0?
> ```js
> let produto = 0;
> for (let i = 1; i <= 4; i++) {
>   produto = produto * i;
> }
> console.log(produto);
> ```
>
> > [!success]- Resposta
> > `0`. Na primeira volta, 0 × 1 dá 0, e depois 0 vezes qualquer número continua 0. Na multiplicação, o valor neutro é o 1.

> [!question] 6. Onde está o erro?
> A pessoa queria ver os totais parciais `1`, `3` e `6`:
>
> ```js
> for (let i = 1; i <= 3; i++) {
>   let soma = 0;
>   soma = soma + i;
>   console.log(soma);
> }
> ```
>
> > [!success]- Resposta
> > Aparecem `1`, `2` e `3`. A `soma` é criada dentro do laço, então volta a 0 em toda volta. A linha `let soma = 0;` precisa ir para antes do `for`.

> [!question] 7. O que aparece no console?
> ```js
> let soma;
> for (let i = 1; i <= 3; i++) {
>   soma = soma + i;
> }
> console.log(soma);
> ```
>
> > [!success]- Resposta
> > `NaN`. A `soma` começa como `undefined`, e `undefined + 1` dá `NaN`. Faltou o valor inicial: `let soma = 0;`.

> [!question] 8. Escreva o código.
> Quantos números de 1 a 100 terminam em 7? Dica da aula 2.3: `i % 10` dá o último algarismo do `i`.
>
> > [!success]- Resposta
> > Um contador com filtro. Aparece `10`: são o 7, 17, 27, 37, 47, 57, 67, 77, 87 e 97.
> >
> > ```js
> > let quantidade = 0;
> > for (let i = 1; i <= 100; i++) {
> >   if (i % 10 === 7) {
> >     quantidade++;
> >   }
> > }
> > console.log(quantidade);
> > ```

> [!question] 9. Escreva o código.
> Quanto dá a soma dos números ímpares de 1 a 9?
>
> > [!success]- Resposta
> > Um acumulador com filtro. Aparece `25`, que é 1 + 3 + 5 + 7 + 9. Ímpar é o que deixa resto na divisão por 2:
> >
> > ```js
> > let soma = 0;
> > for (let i = 1; i <= 9; i++) {
> >   if (i % 2 !== 0) {
> >     soma = soma + i;
> >   }
> > }
> > console.log(soma);
> > ```
> >
> > Outro jeito, sem `if`: começar no 1 e andar de 2 em 2, com `for (let i = 1; i <= 9; i += 2)`, como na aula 4.3.

> [!question] 10. Acumulador ou contador?
> (a) Quantos alunos tiraram nota acima de 7. (b) O valor total de uma compra. (c) Quantas vezes a pessoa errou a senha. (d) Quantos quilômetros alguém correu na semana, somando os sete dias.
>
> > [!success]- Resposta
> > (a) Contador: soma 1 para cada aluno que passa no `if`. (b) Acumulador: soma o preço de cada produto. (c) Contador: soma 1 a cada erro. (d) Acumulador: soma os quilômetros de cada dia.

## De onde vêm as palavras

- **[[glossario/acumulador|Acumular]]**: do latim *accumulāre*, *ad-* ("a, para") + *cumulāre*, "empilhar", de *cumulus*, "monte, pilha". Acumular é **amontoar**, pôr uma coisa em cima da outra. De *cumulus* vem também o nosso **cúmulo**: "é o cúmulo!" é "é o máximo", o topo da pilha. E as nuvens **cúmulos**, as que parecem montes de algodão, ganharam esse nome do químico inglês Luke Howard, um meteorologista amador.
- **[[glossario/contador|Contador]]**: de *contar* + *-dor*, "quem conta". Como se viu na [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]], *contar* vem do latim *computāre*, e por isso *contador* e **computador** são primos: os dois são "o que faz as contas".
- **Soma**: do latim *summa*, de *summus*, "o mais alto", o superlativo de *superus*, "de cima". *Summa* era primeiro o topo, o ponto mais alto. Depois passou a ser "o principal" e, enfim, "o total". O *summus* também está em **sumo**, como o sumo sacerdote e o sumo pontífice, os mais altos.
- **Total**: do latim medieval *tōtālis*, de *tōtus*, "todo, inteiro". O total é a conta inteira.
- **[[glossario/elemento-neutro|Neutro]]**: do latim *neuter*, de *ne* ("não") + *uter* ("um ou outro"): **nem um, nem outro**. É o que não toma partido, como um país neutro numa guerra. O valor neutro é o que não puxa a conta para lado nenhum.
- **Média**: o feminino de *médio*, do latim *medius*, "do meio". A média fica no meio dos números. *Medius* deu também **meio**, e a *media nox* dos romanos é a nossa **meia-noite**, o meio da noite.
- **Par** e **ímpar**: do latim *pār*, "igual", e *impār*, "desigual", *in-* ("não") + *pār*. Um número par se divide em duas metades **iguais**. O ímpar não. E o *par* de sapatos é a mesma palavra: duas coisas iguais.

> [!tip] Para guardar
> - Para um laço calcular algo, use a receita: crie a variável **antes** do laço, atualize **dentro** dele e use o resultado **depois**.
> - Acumulador: junta valores a cada volta (`soma = soma + i`). Responde "quanto dá no total?".
> - Contador: soma sempre 1, geralmente dentro de um `if` (`quantidade++`). Responde "quantas vezes?".
> - O valor inicial é o neutro da conta: 0 para somar, 1 para multiplicar, `""` para juntar texto.
> - Criar a variável dentro do laço zera o cofrinho a cada volta. Esquecer o valor inicial dá `NaN`.
> - Média = acumulador ÷ contador. Se o contador terminar em 0, a divisão dá `NaN`.

Fontes: MDN: [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [Addition assignment (+=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment), [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) · Wikipedia: [Carl Friedrich Gauss](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss) · Wiktionary: [accumulō](https://en.wiktionary.org/wiki/accumulo), [cumulus](https://en.wiktionary.org/wiki/cumulus), [contador](https://en.wiktionary.org/wiki/contador), [summa](https://en.wiktionary.org/wiki/summa), [summus](https://en.wiktionary.org/wiki/summus), [tōtālis](https://en.wiktionary.org/wiki/totalis), [tōtus](https://en.wiktionary.org/wiki/totus), [neuter](https://en.wiktionary.org/wiki/neuter), [medius](https://en.wiktionary.org/wiki/medius), [média](https://en.wiktionary.org/wiki/m%C3%A9dia), [pār](https://en.wiktionary.org/wiki/par), [impār](https://en.wiktionary.org/wiki/impar), [ímpar](https://en.wiktionary.org/wiki/%C3%ADmpar), [sumo](https://en.wiktionary.org/wiki/sumo), [meio](https://en.wiktionary.org/wiki/meio)
