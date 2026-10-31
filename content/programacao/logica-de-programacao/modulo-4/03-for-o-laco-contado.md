---
title: "4.3 for: o laço contado"
tags:
  - logica-de-programacao
  - javascript
  - lacos
---

Terceira aula do módulo 4. Na [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|aula 4.2]], o `while` repetia um bloco enquanto a condição desse `true`, mas as três peças do laço ficavam espalhadas pelo código: o começo antes, a condição nos parênteses e a mudança dentro das chaves. O **`for`** junta as três num lugar só, a primeira linha do laço. É o laço mais usado quando já se sabe quantas voltas ele vai dar.

## Do `while` ao `for`

Os dois laços abaixo mostram os números de 1 a 5. Primeiro, com `while`:

```js
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
```

Agora, com `for`:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

A saída é a mesma: `1`, `2`, `3`, `4` e `5`, um em cada linha. O que mudou foi o lugar de cada peça:

| Peça | No `while` | No `for` |
|---|---|---|
| começo | numa linha **antes** do laço | 1ª parte dos parênteses: `let i = 1` |
| condição | entre os parênteses | 2ª parte: `i <= 5` |
| mudança | última linha **dentro** das chaves | 3ª parte: `i++` |

No `for`, as chaves ficam só com o que de fato se repete, o `console.log(i)`. Tudo o que controla o laço (de onde ele começa, até onde vai, como anda) cabe na primeira linha. Lendo só ela, dá para saber o laço inteiro.

## As três partes

Dentro dos parênteses do `for` vão três partes, separadas por **ponto e vírgula**:

```js
for (inicialização; condição; incremento) {
  // o que repetir
}
```

- **[[glossario/inicializacao|Inicialização]]** (`let i = 1`): cria a variável de controle e dá a ela o primeiro valor. Roda **uma vez só**, antes de tudo.
- **Condição** (`i <= 5`): é conferida **antes de cada volta**, inclusive antes da primeira. Se der `true`, o bloco roda. Se der `false`, o laço acaba.
- **[[glossario/incremento|Incremento]]** (`i++`): roda **no fim de cada volta**, depois do bloco. Como na aula 4.1, `i++` é o atalho de `i = i + 1`.

### Escrito numa ordem, rodado em outra

Aqui está a pegadinha: o incremento é escrito **antes** do bloco, mas roda **depois** dele. Siga o computador num laço de três voltas:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

1. Inicialização: o `i` nasce valendo 1. Essa parte não roda mais.
2. Condição: `1 <= 3`? `true`. O bloco mostra **1**.
3. Incremento: o `i` vira 2.
4. Condição: `2 <= 3`? `true`. O bloco mostra **2**.
5. Incremento: o `i` vira 3.
6. Condição: `3 <= 3`? `true`. O bloco mostra **3**.
7. Incremento: o `i` vira 4.
8. Condição: `4 <= 3`? `false`. O laço termina, e o programa segue para a linha depois do `}`.

Depois da inicialização, o computador gira sempre na mesma ordem: **condição, bloco, incremento**, e de volta à condição, até ela dar `false`. É o mesmo caminho do `while` da aula 4.2, só que escrito de um jeito mais curto.

## Contando de outros jeitos

A terceira parte não precisa ser `i++`. Qualquer mudança serve, desde que leve a condição a dar `false` um dia.

**De 2 em 2.** `i += 2` é o atalho de `i = i + 2`, do mesmo jeito que `i++` é o de `i = i + 1`:

```js
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}

// saída: 0, 2, 4, 6, 8 e 10, um em cada linha
```

| Volta | `i` no começo da volta | `i <= 10`? | Mostra | `i` depois do `i += 2` |
|---|---|---|---|---|
| 1ª | 0 | `true` | 0 | 2 |
| 2ª | 2 | `true` | 2 | 4 |
| 3ª | 4 | `true` | 4 | 6 |
| 4ª | 6 | `true` | 6 | 8 |
| 5ª | 8 | `true` | 8 | 10 |
| 6ª | 10 | `true` | 10 | 12 |
| (fim) | 12 | `false` | nada, o laço para | - |

São seis voltas. O 12 nunca aparece: é o valor que derruba a condição.

**De trás para frente.** Com `i--`, o contrário de `i++`, o laço desce. A condição se inverte junto: o laço continua **enquanto o `i` for maior ou igual** ao número final.

```js
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
console.log("Lá vou eu!");

// saída: 5, 4, 3, 2, 1 e depois Lá vou eu!
```

**Até um número guardado numa variável.** O fim do laço não precisa estar escrito direto no código:

```js
let n = 4;

for (let i = 1; i <= n; i++) {
  console.log("3 x", i, "=", 3 * i);
}

// saída:
// 3 x 1 = 3
// 3 x 2 = 6
// 3 x 3 = 9
// 3 x 4 = 12
```

Para a tabuada ir até o 10, basta trocar o `n` para 10. O laço muda de tamanho sem mexer em mais nada.

## De 0 até n: quantas voltas?

Um padrão muito comum é começar a contar do 0. E com ele vem uma dúvida que pega todo mundo: quantas voltas o laço dá?

```js
let n = 10;

for (let i = 0; i <= n; i++) {
  console.log(i);
}

// saída: 0, 1, 2 e assim por diante, até 10
```

São **11** voltas, e não 10. De 1 a 10 são dez números, e o 0 é mais um.

Pense numa cerca de 10 metros, com uma estaca a cada metro: uma no metro 0, outra no metro 1, e assim até o metro 10. São 11 estacas, porque a do começo também conta. Errar por um, para mais ou para menos, é tão comum que tem nome em inglês: *off-by-one error*, o "erro por um". Também se diz *fencepost error*, o "erro da estaca de cerca".

Três laços parecidos, três resultados diferentes:

| Laço | Valores do `i` | Voltas |
|---|---|---|
| `for (let i = 1; i <= 10; i++)` | de 1 a 10 | 10 |
| `for (let i = 0; i <= 10; i++)` | de 0 a 10 | 11 |
| `for (let i = 0; i < 10; i++)` | de 0 a 9 | 10 |

Uma conta rápida, para laços que andam de 1 em 1: com `<=`, de `a` até `b` dá `b - a + 1` voltas. Com `<`, o `b` fica de fora, e dá `b - a`. De 0 até 10 com `<=`: 10 - 0 + 1 = 11.

A última linha da tabela, que começa no 0 e para com `<`, vai aparecer muito no módulo 6, porque as listas do JavaScript começam a contar do 0.

## Depois do `for`, a variável some

Aqui o `for` e o `while` se comportam diferente. No `while`, a variável é criada fora do laço e continua existindo depois dele: na aula 4.2, o `i` terminava valendo 6. No `for`, a variável criada com `let` dentro dos parênteses só existe **dentro** do laço:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}

console.log("fim:", i);

// saída: 1, 2 e 3, e depois
// ReferenceError: i is not defined
```

Fora do laço, para o JavaScript, aquele `i` nunca existiu. Isso tem uma vantagem: dá para escrever vários `for` seguidos, todos com `i`, sem que um atrapalhe o outro. Um nome que só vale dentro de um pedaço do código é o assunto da aula 5.4, sobre **escopo**.

Se você precisar do valor depois do laço, crie a variável antes do `for`, e deixe na primeira parte só a atribuição, sem o `let`:

```js
let i;

for (i = 1; i <= 3; i++) {
  console.log(i);
}

console.log("fim:", i); // fim: 4
```

## O `for` também pode travar

Com as três partes na mesma linha, fica difícil esquecer a mudança, e o risco do laço infinito da aula 4.2 cai bastante. Mas não some. Estes dois laços nunca terminam:

```js
// NÃO RODE: este laço nunca termina
for (let i = 1; i <= 5; i--) {
  console.log(i);
}
```

O `i` desce (1, 0, -1, -2...) e nunca passa de 5. É o "mudar para o lado errado" da aula 4.2. O certo seria `i++`.

```js
// NÃO RODE: este laço nunca termina
for (let i = 1; i <= 5; ) {
  console.log(i);
}
```

Aqui, a terceira parte ficou vazia. O JavaScript aceita: os dois `;` são obrigatórios, mas as partes, não. Só que, sem incremento, o `i` vale 1 para sempre.

A vantagem do `for` é que esses erros ficam à vista. As três perguntas da checagem da aula 4.2 (a variável foi criada? a condição usa essa variável? ela muda na direção certa?) se respondem lendo uma linha só.

## Dois erros de digitação

**Vírgula no lugar de ponto e vírgula.**

```js
for (let i = 1, i <= 5, i++) {
  console.log(i);
}

// SyntaxError: Identifier 'i' has already been declared
```

A mensagem nem fala em vírgula. É que, depois de um `let`, a vírgula serve para criar **várias variáveis de uma vez**, como em `let a = 1, b = 2;`. Então o JavaScript leu `let i = 1, i ...` como se você estivesse criando o `i` duas vezes, o erro da [[glossario/declaracao|declaração]] repetida. Quando um `for` der um erro estranho, confira os separadores: são dois `;`.

**Ponto e vírgula depois dos parênteses.**

```js
for (let i = 1; i <= 3; i++); {
  console.log("oi");
}

// saída: oi (uma vez só)
```

Esse não dá erro nenhum, e por isso é pior. O `;` logo depois do `)` encerra o `for` ali mesmo: o laço dá as três voltas sem fazer nada. O bloco das chaves fica solto e roda uma vez só, depois do laço, como qualquer linha comum. Entre o `)` e o `{` não vai nada.

## `for` ou `while`?

Os dois fazem o mesmo trabalho: todo `for` pode ser reescrito como `while`, e o contrário também. A escolha é sobre qual deixa o código mais claro.

| Antes de o laço começar, você sabe... | Use | Exemplos |
|---|---|---|
| quantas voltas ele vai dar, ou consegue calcular | `for` | mostrar de 1 a 100; repetir algo 5 vezes; a tabuada do 7 |
| só quando ele deve parar | `while` | pedir a senha até a pessoa acertar; jogar um dado até sair 6 |

A pergunta que decide é: "dá para dizer o número de voltas antes de o laço começar?". Na tabuada, são 10, sempre. Na senha, depende da pessoa.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| de 0 a 10 | `for (let i = 0; i <= 10; i++)` | `for i in range(0, 11):` |
| de 2 em 2 | `for (let i = 0; i <= 10; i += 2)` | `for i in range(0, 11, 2):` |
| de 5 a 1 | `for (let i = 5; i >= 1; i--)` | `for i in range(5, 0, -1):` |

```python
for i in range(5, 0, -1):
    print(i)
print("Lá vou eu!")
```

O `for` do Python não tem três partes. O `range` produz a sequência de números, e o `for` passa por ela, um número de cada vez. O terceiro número do `range` é o passo. E o segundo, como na aula 4.1, fica de fora: `range(5, 0, -1)` desce de 5 até 1, sem chegar ao 0.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> for (let i = 1; i <= 4; i++) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > `1`, `2`, `3` e `4`, um em cada linha. Quando o `i` vira 5, `5 <= 4` dá `false`, e o laço para.

> [!question] 2. Quantas voltas este laço dá?
> ```js
> for (let i = 0; i <= 10; i++) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > 11 voltas, de 0 a 10. O 0 também conta: 10 - 0 + 1 = 11.

> [!question] 3. E este, quantas voltas dá? Qual é o último número?
> ```js
> for (let i = 0; i < 10; i++) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > 10 voltas, de 0 a 9. O último número é o 9: quando o `i` chega a 10, `10 < 10` dá `false`.

> [!question] 4. O que aparece no console?
> ```js
> for (let i = 0; i <= 10; i += 5) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > `0`, `5` e `10`. O `i` anda de 5 em 5. Depois do 10, ele vira 15, e `15 <= 10` dá `false`.

> [!question] 5. O que aparece no console?
> ```js
> for (let i = 3; i >= 1; i--) {
>   console.log(i);
> }
> console.log("Já!");
> ```
>
> > [!success]- Resposta
> > `3`, `2`, `1` e depois `Já!`. O `i` desce. Quando vira 0, `0 >= 1` dá `false`, o laço acaba, e o programa segue para o `console.log("Já!")`.

> [!question] 6. Reescreva com `for`:
> ```js
> let i = 2;
> while (i <= 8) {
>   console.log(i);
>   i = i + 2;
> }
> ```
>
> > [!success]- Resposta
> > Cada peça vai para a sua parte dos parênteses: o começo na 1ª, a condição na 2ª e a mudança na 3ª. A saída é `2`, `4`, `6` e `8`.
> >
> > ```js
> > for (let i = 2; i <= 8; i += 2) {
> >   console.log(i);
> > }
> > ```

> [!question] 7. O que acontece?
> ```js
> for (let i = 1; i <= 3; i++) {
>   console.log(i);
> }
> console.log("fim:", i);
> ```
>
> > [!success]- Resposta
> > Aparecem `1`, `2` e `3`, e depois o programa para com `ReferenceError: i is not defined`. O `i` criado com `let` nos parênteses do `for` só existe dentro do laço.

> [!question] 8. Onde está o erro?
> A pessoa queria mostrar de 1 a 5, mas o programa travou:
>
> ```js
> for (let i = 1; i <= 5; i--) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > O incremento anda para o lado errado. Com `i--`, o `i` passa por 1, 0, -1, -2... e nunca passa de 5, então a condição fica `true` para sempre. O certo é `i++`.

> [!question] 9. Quantas vezes aparece `oi`?
> Repare no que vem logo depois dos parênteses:
>
> ```js
> for (let i = 1; i <= 3; i++); {
>   console.log("oi");
> }
> ```
>
> > [!success]- Resposta
> > Uma vez só. O `;` depois do `)` encerra o `for` ali: o laço dá três voltas sem fazer nada. O bloco com o `console.log` fica solto e roda uma vez, depois do laço.

> [!question] 10. `for` ou `while`?
> (a) Mostrar a tabuada do 3, de 1 a 10. (b) Jogar um dado até sair 6. (c) Mostrar "Bom dia" 7 vezes.
>
> > [!success]- Resposta
> > (a) `for`: são 10 voltas, sempre. (b) `while`: não dá para saber quantas jogadas vão ser, só quando parar. (c) `for`: são 7 voltas.

## De onde vêm as palavras

- **for**: do inglês antigo *for*, do protogermânico *\*furi*. São primos o alemão *für*, o holandês *voor* e, mais longe, o latim *per*, "através de, por meio de". Na programação, a palavra começou em alemão. Na linguagem Superplan, criada entre 1949 e 1951 pelo suíço Heinz Rutishauser, o laço se escrevia com *für*. O Superplan influenciou o ALGOL 58, de cuja criação Rutishauser participou, e os descendentes do ALGOL usam *for*. Já o formato de três partes, separadas por ponto e vírgula, veio depois: foi inventado por Stephen C. Johnson para a linguagem B e ficou famoso com o C. O JavaScript, que escreve muita coisa do jeito do C, herdou esse formato.
- **[[glossario/para|Para]]**: o nome do `for` em português. Vem de uma forma mais antiga, *pera*, do galego-português antigo, que juntava o latim *per* ("através de") e *ad* ("a, para"). Então o *for* do inglês e o *para* do português são parentes distantes: os dois levam ao latim *per*.
- **[[glossario/incremento|Incremento]]**: do latim *incrēmentum*, "crescimento, aumento", de *incrēscō*, "crescer, aumentar", que é *in-* + *crēscō*, "crescer". Incrementar é **fazer crescer**. O contrário, **decremento**, vem de *dēcrēmentum*, "diminuição", de *dēcrēscō*, "decrescer". *Crēscō* deu o nosso **crescer** e, pelo particípio *crēscēns*, **crescente**. A raiz indo-europeia, *\*ḱer-*, "crescer", está também no latim *creō*, de onde vem **criar**.
- **[[glossario/inicializacao|Inicialização]]**: de *inicial*, de *início*, que vem do latim *initium*, "começo". *Initium* vem de *ineō*, "entrar", formado por *in* ("em, para dentro") + *eō* ("ir"). Ao pé da letra, o começo é a **entrada**.
- **Contar**, de "o laço contado": do latim *computāre*, "calcular, fazer as contas", de *con-* ("junto") + *putāre*. *Putāre* queria dizer primeiro "limpar, podar" e, em sentido figurado, "avaliar, considerar, pensar". Do mesmo *computāre* vieram, por caminhos diferentes, **contar**, **computar** e **computador**: este último entrou no português direto do latim *computātōrem*, e é primo de **contador**. Até o **conto**, a história, é da família: vem do latim *computus*, "cálculo".

> [!tip] Para guardar
> - `for (inicialização; condição; incremento) { ... }` junta as três peças do laço numa linha só, separadas por `;`.
> - A inicialização roda uma vez. A condição é conferida antes de cada volta. O incremento roda no fim de cada volta.
> - O incremento é escrito antes do bloco, mas roda depois dele.
> - A mudança pode ser `i++`, `i--`, `i += 2`... desde que leve a condição a dar `false`.
> - De 0 até 10 com `<=` são 11 voltas. Com `<=`, de `a` até `b` dá `b - a + 1`. Com `<`, dá `b - a`.
> - A variável criada com `let` nos parênteses do `for` só existe dentro do laço.
> - Use o `for` quando souber quantas voltas o laço vai dar, e o `while` quando só souber quando parar.

Fontes: MDN: [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [Addition assignment (+=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment) · Wikipedia: [Superplan](https://en.wikipedia.org/wiki/Superplan), [Loop (statement)](https://en.wikipedia.org/wiki/Loop_(statement)), [ALGOL](https://en.wikipedia.org/wiki/ALGOL), [Off-by-one error](https://en.wikipedia.org/wiki/Off-by-one_error) · Wiktionary: [for](https://en.wiktionary.org/wiki/for), [para](https://en.wiktionary.org/wiki/para), [incrēmentum](https://en.wiktionary.org/wiki/incrementum), [incrēscō](https://en.wiktionary.org/wiki/incresco), [crēscō](https://en.wiktionary.org/wiki/cresco), [dēcrēmentum](https://en.wiktionary.org/wiki/decrementum), [initium](https://en.wiktionary.org/wiki/initium), [contar](https://en.wiktionary.org/wiki/contar), [computō](https://en.wiktionary.org/wiki/computo), [putō](https://en.wiktionary.org/wiki/puto), [computador](https://en.wiktionary.org/wiki/computador), [conto](https://en.wiktionary.org/wiki/conto)
