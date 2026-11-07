---
title: "7.4 Quando dá errado: depurando seu código"
tags:
  - logica-de-programacao
  - javascript
  - depuracao
---

Quarta aula do módulo 7. Todo código dá errado de vez em quando, inclusive o de quem programa há anos. O que muda com a prática é o que se faz depois. Em vez de mexer em coisas ao acaso até funcionar, você investiga. Esse trabalho de achar o erro e consertá-lo se chama **[[glossario/depuracao|depuração]]**, em inglês *debugging*.

A [[programacao/logica-de-programacao/modulo-7/01-como-atacar-um-problema-de-programacao|aula 7.1]] já trazia o começo disso no passo 4: escrever um pedaço, rodar e conferir com `console.log`. Esta aula mostra o que fazer quando a conferência mostra que alguma coisa deu errado.

## Dois jeitos de dar errado

1. **O programa para e mostra uma mensagem de erro.** São o `SyntaxError` e o `ReferenceError` da [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]] e o `TypeError` da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]. Assusta, mas é o caso mais fácil, porque o próprio JavaScript diz o que houve e em que linha.
2. **O programa roda até o fim, sem aviso nenhum, e a resposta está errada.** Foi o caso do 0 que nem estava na lista de temperaturas, na [[programacao/logica-de-programacao/modulo-7/02-algoritmos-em-arrays-buscar-contar-e-achar-o-maior|aula 7.2]], e do `=` dentro do `if`, na [[programacao/logica-de-programacao/modulo-3/01-tomando-decisoes-com-if|aula 3.1]]. Nada chama a atenção. Só percebe quem sabe qual era a resposta certa.

## O roteiro

| Passo | A pergunta | Com o quê |
|---|---|---|
| 1. Ler a mensagem | O que o JavaScript diz que aconteceu, e onde? | a mensagem de erro, lida devagar |
| 2. Isolar o trecho | Em que pedaço do programa está o problema? | cada pedaço testado sozinho, com uma resposta que você já sabe |
| 3. Olhar os valores | O que as variáveis valem de verdade, naquele ponto? | `console.log` |
| 4. Testar uma hipótese | Se a causa for essa, o que vai mudar quando eu consertar? | uma mudança só, e rodar de novo |

Quando não aparece mensagem nenhuma, o passo 1 fica de fora, e você começa no 2.

## Passo 1: ler a mensagem

Uma peça nova antes do exemplo: o `toUpperCase`. É um [[glossario/metodo|método]] dos textos, como o `push` é um método dos arrays ([[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]]). Ele devolve o mesmo texto em letras maiúsculas: `"Ana".toUpperCase()` dá `"ANA"`.

```js
const nomes = ["Ana", "Bruno"];

console.log(nomes[0].toUpperCase());
console.log(nomes[5].toUpperCase());
```

No Node, aparece isto:

```
ANA
/caminho/do/arquivo.js:4
console.log(nomes[5].toUpperCase());
                     ^

TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    at Object.<anonymous> (/caminho/do/arquivo.js:4:22)
    ...
```

Parece muita coisa, mas cada pedaço tem uma função:

- **`ANA`**: a linha 3 rodou normalmente. Como na aula 1.5, as linhas antes do erro rodam, e o programa para no erro.
- **`arquivo.js:4`**: o erro foi na linha 4.
- **A linha de código com o `^` embaixo**: o `^` aponta o ponto exato em que o JavaScript travou, o `toUpperCase`.
- **`TypeError`**: o tipo do erro. Pela aula 2.1, o código está bem escrito e os nomes existem, mas a operação não pode ser feita com aquele valor.
- **O motivo**: *Cannot read properties of undefined (reading 'toUpperCase')* quer dizer "não dá para ler propriedades de `undefined` (lendo `toUpperCase`)". Ou seja, o que vem **antes** do ponto vale `undefined`. Nessa linha, antes do ponto está o `nomes[5]`.
- **As linhas que começam com `at`**: o caminho que o programa fez até o erro. A primeira repete o arquivo, a linha e a coluna (`4:22`). As outras, que eu cortei com `...`, são do próprio Node, e você pode ignorar.

A mensagem mostra **onde** o `undefined` foi usado. A pergunta seguinte é **de onde** ele veio. O array tem só os índices 0 e 1, e, como mostrou a [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|aula 6.1]], pedir um índice que não existe dá `undefined`, sem erro. O erro só estoura uma linha depois, quando alguém tenta usar esse `undefined`.

### A linha do erro nem sempre é a linha da causa

O mesmo engano, agora com uma função no meio:

```js
const nomes = ["Ana", "Bruno"];

function gritar(nome) {
  return nome.toUpperCase() + "!";
}

console.log(gritar(nomes[0]));
console.log(gritar(nomes[5]));
```

```
ANA!
/caminho/do/arquivo.js:4
  return nome.toUpperCase() + "!";
              ^

TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    at gritar (/caminho/do/arquivo.js:4:15)
    at Object.<anonymous> (/caminho/do/arquivo.js:8:13)
    ...
```

O erro aparece na linha 4, dentro da `gritar`. Mas a `gritar` está certa: com `"Ana"`, ela devolveu `"ANA!"`. O problema está na linha 8, que entregou o `nomes[5]`.

As linhas `at` mostram isso, lidas de cima para baixo:

1. `at gritar (...:4:15)`: o erro aconteceu dentro da `gritar`, na linha 4.
2. `at Object.<anonymous> (...:8:13)`: quem chamou a `gritar` foi a linha 8. `Object.<anonymous>` é o nome que o Node dá à parte do arquivo que fica fora de qualquer função.

Cada linha `at` é quem chamou a de cima. Quando a linha do erro parece certa, desça por elas até achar de onde veio o valor errado.

### As mensagens que mais aparecem

| Mensagem | Em português | Costuma ser |
|---|---|---|
| `ReferenceError: x is not defined` | `x` não foi definido | nome escrito errado (`totla` no lugar de `total`), ou variável usada fora do seu [[glossario/escopo\|escopo]] ([[programacao/logica-de-programacao/modulo-5/04-escopo-variaveis-locais-e-globais\|aula 5.4]]) |
| `TypeError: Cannot read properties of undefined (reading 'x')` | não dá para ler propriedades de `undefined` | o que vem antes do ponto é `undefined`: um índice que não existe, uma chave com nome errado, uma função sem `return` |
| `TypeError: x is not a function` | `x` não é uma função | nome de método errado, como `lista.puhs(1)`, ou um nome de função que virou outra coisa, como o `let console = 5` da aula 3.1 |
| `TypeError: Assignment to constant variable.` | atribuição a uma variável constante | mudar o valor de uma `const` (aula 2.1) |
| `SyntaxError: Unexpected token ...` | símbolo inesperado | um parêntese, chave ou aspas que abriu e não fechou, ou uma palavra reservada usada como nome |

## Quando não aparece erro nenhum

Este é o caso difícil. O programa abaixo deveria dizer se um aluno com as notas 7, 8 e 6 passou. A média é (7 + 8 + 6) / 3 = 7, então a resposta certa é "aprovado".

```js
function somar(lista) {
  let soma = 0;
  for (let i = 0; i <= lista.length; i++) {
    soma = soma + lista[i];
  }
  return soma;
}

function media(lista) {
  return somar(lista) / lista.length;
}

function situacao(nota) {
  if (nota >= 6) {
    return "aprovado";
  }
  return "reprovado";
}

console.log(situacao(media([7, 8, 6]))); // reprovado
```

Deu "reprovado", sem mensagem nenhuma. Os quatro passos, um de cada vez.

### Passo 2: isolar o trecho

São três funções, e qualquer uma delas pode ter o erro. Em vez de ler o programa inteiro procurando, teste **cada função sozinha**, com uma entrada cuja resposta você já sabe, como na aula 7.1:

```js
console.log(situacao(7));      // aprovado  (certo)
console.log(media([7, 8, 6])); // NaN       (devia ser 7)
console.log(somar([7, 8, 6])); // NaN       (devia ser 21)
```

- A `situacao` está certa: com 7, ela diz "aprovado".
- A `media` dá `NaN`. Mas ela só divide o resultado da `somar`. Se a `somar` errar, a `media` erra junto. Então vale testar a `somar`.
- A `somar` dá `NaN`, e não 21. O problema está nela. As outras duas eram inocentes: a `media` só repassou o valor errado.

E por que "reprovado", e não um aviso? Porque o `NaN` comparado com um número, por `>`, `<`, `>=`, `<=` ou `===`, dá sempre `false`. O `NaN >= 6` dá `false`, e a `situacao` foi para o "reprovado". O `NaN` passou por duas funções e chegou no fim parecendo uma resposta normal. É por isso que esse caso é o mais chato.

Isolar só foi fácil porque o programa estava dividido em funções. É o "dividir para conquistar" da [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]] ajudando de novo: cada pedaço pode ser testado separado dos outros.

### Passo 3: olhar os valores

Lida com pressa, a `somar` parece certa. Então, em vez de ler de novo, olhe o que ela faz de verdade. Um `console.log` dentro do laço mostra os valores a cada volta:

```js
function somar(lista) {
  let soma = 0;
  for (let i = 0; i <= lista.length; i++) {
    console.log("i =", i, "| lista[i] =", lista[i], "| soma =", soma);
    soma = soma + lista[i];
  }
  return soma;
}

somar([7, 8, 6]);

// i = 0 | lista[i] = 7 | soma = 0
// i = 1 | lista[i] = 8 | soma = 7
// i = 2 | lista[i] = 6 | soma = 15
// i = 3 | lista[i] = undefined | soma = 21
```

Até o `i = 2`, tudo certo. A soma chega a 21, que é a resposta certa. Mas o laço dá uma **quarta** volta, com `i = 3`, e o `lista[3]` não existe. Nessa volta, a conta é `21 + undefined`, e isso dá `NaN`.

Alguns cuidados que fazem o `console.log` ajudar mais:

- **Ponha um rótulo em cada valor**, como `"i =", i`. Sem rótulo, aparece `3 undefined 21`, e você precisa adivinhar qual número é qual.
- **Ponha o `console.log` onde os valores mudam**: dentro do laço, antes da linha suspeita. Repare que ele mostra a `soma` **antes** da conta da volta, e por isso aparece o 21, o último valor bom, logo antes de estragar.
- **Desconfie do que parece igual.** No Node, `console.log("10")` e `console.log(10)` mostram o mesmo `10`. Mas o primeiro é texto, e `"10" + 7` dá `"107"`. Se uma conta der um resultado estranho, olhe o tipo com o `typeof` da [[programacao/logica-de-programacao/modulo-2/02-tipos-de-dados|aula 2.2]]: `console.log(typeof preco)`.
- **Tire os `console.log` quando acabar.** Eles serviram para investigar, e não fazem parte da resposta.

### Passo 4: testar uma hipótese

Uma **[[glossario/hipotese|hipótese]]** é um palpite sobre a causa, que dá para pôr à prova. Aqui: "o laço dá uma volta a mais porque o limite usa `<=`. Com `<`, ele para no índice 2".

Antes de rodar, diga o que você espera ver se o palpite estiver certo: a `somar` dá 21, a `media` dá 7, e a `situacao` diz "aprovado". Depois, mude **só** aquilo:

```js
for (let i = 0; i < lista.length; i++) {
```

```js
console.log(somar([7, 8, 6]));           // 21
console.log(media([7, 8, 6]));           // 7
console.log(situacao(media([7, 8, 6]))); // aprovado
```

Deu o que você esperava, então a hipótese se confirmou. Era o [[glossario/erro-por-um|erro por um]] da [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|aula 4.3]]: com `<=` e o `length`, o laço passa um índice do fim.

Se não tivesse dado certo, você desfaria a mudança, voltando o código ao que era antes, e tentaria outro palpite. Mudanças que não ajudaram não devem ficar no código.

#### Por que uma mudança de cada vez

Imagine que, em vez de uma mudança, você fizesse duas de uma vez: trocou o `<=` por `<` e, por via das dúvidas, começou o `i` em 1.

```js
for (let i = 1; i < lista.length; i++) {
```

Agora o laço pula o primeiro elemento. A soma fica 8 + 6 = 14, a média fica perto de 4,67, e o resultado continua "reprovado". Parece que nenhuma das duas mudanças ajudou. Aí você desfaz as duas, e joga fora junto o `<`, que era o conserto certo.

Com uma mudança de cada vez, cada resultado diz alguma coisa. Se melhorou, foi aquela mudança. Se piorou, também foi ela, e é só desfazer.

## O valor estranho também é uma pista

Quando não há mensagem de erro, o resultado esquisito faz o papel dela. Alguns valores costumam vir sempre dos mesmos lugares:

| Apareceu | Costuma vir de |
|---|---|
| `undefined` | um índice que não existe (aula 6.1), uma função sem `return` ([[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado\|aula 5.3]]), um argumento que faltou na chamada ([[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao\|aula 5.2]]), uma chave com o nome errado ([[programacao/logica-de-programacao/modulo-6/04-objetos-descrevendo-uma-coisa-com-chave-e-valor\|aula 6.4]]) |
| `NaN` | uma conta com um `undefined` dentro, ou com um texto que não é número |
| texto grudado, como `"107"` no lugar de 17 | um dos lados do `+` é texto, e o `+` gruda em vez de somar (aula 1.5) |
| um `if` que sempre entra, ou que nunca entra | um `=` no lugar do `===` (aula 3.1), ou uma comparação com a variável errada |
| um item a mais ou a menos | o limite do laço (aula 4.3) |

## Os enganos mais comuns

**1. `=` no lugar de `===`.** Dentro do `if`, o `=` não pergunta: ele guarda o valor na variável, e o `if` recebe o valor guardado. Como a aula 3.1 mostrou, o resultado depende do valor. Com 18, o bloco roda sempre. Com 0, não roda nunca. E a variável perde o que tinha. Releia cada condição: `===` para comparar, `=` só para guardar.

**2. Uma volta a mais no laço.** Com `i <= lista.length`, o último `i` é um índice que não existe. Aparece um `undefined` no fim, e um `NaN` se ele entrar numa conta, como na `somar` lá de cima. Para percorrer um array pelo índice, use `i < lista.length`.

**3. Esquecer o `return`.** A conta lá dentro está certa, e um `console.log` dentro da função até mostra o valor certo. Mas quem chamou a função recebe `undefined`, como na aula 5.3. Toda função que deve entregar um resultado precisa de um `return`.

**4. Nomes parecidos.** Este código deveria contar 3 aprovados e mostra 0:

```js
const notas = [7, 3, 9, 5, 10];
let aprovados = 0;

for (const nota of notas) {
  if (notas >= 6) {
    aprovados = aprovados + 1;
  }
}

console.log(aprovados); // 0
```

A condição usa `notas`, a lista inteira, e não `nota`, a nota daquela volta. O JavaScript tenta transformar a lista num número para comparar com o 6, não consegue, e a comparação dá `false` todas as vezes. Não aparece erro, porque os dois nomes existem. Um `console.log("nota =", nota, "| notas >= 6:", notas >= 6)` dentro do laço mostra `nota = 7 | notas >= 6: false`, e o 7 deveria passar. Com isso, o erro fica na condição, e falta só achar o `s` a mais.

Nomes bem diferentes evitam o engano. Com `todasAsNotas` para a lista e `nota` para o item, um não se confunde com o outro.

## Outra ferramenta: o breakpoint

O `console.log` não é o único jeito de fazer o passo 3. Muita gente que programa no trabalho usa o **depurador**, em inglês *debugger*, uma ferramenta que vem no navegador e em editores como o VS Code. Com ele, você marca uma linha do programa, e o programa **pausa** quando chega nela. Essa marca é o **[[glossario/breakpoint|breakpoint]]**, o "ponto de parada". No dia a dia, muita gente encurta para *break*: "põe um break nessa linha".

### Não é o `break` do laço

O nome parece, mas são duas coisas diferentes:

| | o `break` da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados\|aula 4.5]] | o breakpoint |
|---|---|---|
| O que é | um comando do JavaScript, escrito no código | uma marca que você põe na ferramenta, ao lado da linha |
| O que faz | encerra o laço de vez, e o programa segue depois do `}` | pausa o programa inteiro naquela linha, até você mandar continuar |
| Quando age | toda vez que o programa roda | só enquanto você investiga, com o depurador ligado |
| Fica no programa pronto? | sim, faz parte da lógica | não: a marca nem fica dentro do arquivo |

As duas palavras vêm do inglês *break*, "quebrar". O `break` quebra o laço de vez. O breakpoint quebra a execução por um tempo, e depois ela continua de onde parou.

### Usando no VS Code

Com a `somar` que dava `NaN`, ainda com o `<=`:

1. Clique na margem à esquerda do número da linha `soma = soma + lista[i];`. Aparece uma bolinha vermelha: é o breakpoint. (A tecla F9 faz o mesmo na linha em que está o cursor.)
2. Aperte **F5** para rodar com o depurador. Se o VS Code perguntar qual, escolha **Node.js**.
3. O programa para nessa linha, **antes** de rodá-la. Na lateral, a seção **VARIABLES** (variáveis) mostra o que vale cada uma naquele instante: `i` é 0, `soma` é 0, `lista` é `[7, 8, 6]`.
4. Aperte **F5** de novo para continuar. O programa roda até passar pelo breakpoint outra vez e para de novo: agora `i` é 1 e `soma` é 7.
5. Na quarta parada, `i` é 3 e `soma` é 21. A `lista` só tem os índices 0, 1 e 2, e o problema aparece, o mesmo que o `console.log` mostrou.
6. Para parar de investigar, **Shift+F5**. Para tirar o breakpoint, clique na bolinha.

Além de continuar até a próxima parada, dá para andar **uma linha por vez**, com o *Step Over* (**F10**), e ver cada variável mudar.

### Usando no navegador

Sem instalar nada, dá para usar o `debugger;`. É uma linha de código que funciona como um breakpoint escrito à mão:

```js
function somar(lista) {
  let soma = 0;
  for (let i = 0; i <= lista.length; i++) {
    debugger; // pausa aqui, a cada volta
    soma = soma + lista[i];
  }
  return soma;
}

somar([7, 8, 6]);
```

Cole isso no console do navegador (F12, como na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]]) e aperte Enter. Como as ferramentas do desenvolvedor já estão abertas, o programa pausa no `debugger;` e mostra a aba *Sources*, com os valores na seção *Scope*. A tecla **F8** continua até a próxima volta.

Se as ferramentas do desenvolvedor estiverem fechadas, o `debugger;` não faz nada. Mesmo sem efeito, ele não deve ficar no programa pronto: apague-o quando achar o erro, como os `console.log`.

### `console.log` ou breakpoint?

Os dois servem para a mesma coisa, olhar os valores. O roteiro da aula não muda. O que muda é a ferramenta:

| | `console.log` | breakpoint |
|---|---|---|
| Precisa mexer no código? | sim: escrever e depois apagar | não (só o `debugger;` fica no código) |
| O que mostra | só os valores que você escolheu, de **todas** as voltas, numa lista | **todos** os valores, de um momento só |
| Para ver a volta seguinte | já está na lista | manda continuar |
| Onde funciona | em qualquer lugar onde o programa roda | onde houver um depurador, como o navegador e o VS Code |
| Ajuda mais quando | você quer ver a história de um valor, como os quatro `i` do laço de uma vez | você não sabe o que olhar, ou o programa é grande |

Nenhum dos dois é o jeito certo. Muita gente usa os dois, conforme o problema. E existe até um meio-termo: o *logpoint*, no VS Code e no Chrome. É um breakpoint que não pausa: ele escreve uma mensagem no console, como um `console.log`, mas sem mexer no arquivo.

## Lógica ou JavaScript?

O roteiro é o mesmo em qualquer linguagem. O que muda é o jeito como cada uma avisa.

| | JavaScript | Python |
|---|---|---|
| mostrar valores para investigar | `console.log("i =", i)` | `print("i =", i)` |
| índice que não existe | `undefined`, sem erro | `IndexError: list index out of range`, e o programa para |
| `=` dentro do `if` | roda, com o valor errado | `SyntaxError`, antes de rodar |
| o caminho até o erro | linhas `at`: a primeira é onde o erro aconteceu | o *Traceback*: leia de baixo para cima, a última linha é o tipo do erro |

A mesma soma com uma volta a mais, em Python:

```python
notas = [7, 8, 6]

def somar_notas(lista):
    soma = 0
    for i in range(len(lista) + 1):
        print("i =", i)
        soma = soma + lista[i]
    return soma

print(somar_notas(notas))
```

```
i = 0
i = 1
i = 2
i = 3
Traceback (most recent call last):
  File "arquivo.py", line 10, in <module>
    print(somar_notas(notas))
          ~~~~~~~~~~~^^^^^^^
  File "arquivo.py", line 7, in somar_notas
    soma = soma + lista[i]
                  ~~~~~^^^
IndexError: list index out of range
```

- **O Python para na hora.** No `i = 3`, ele avisa que o índice está fora da lista. O JavaScript seguiu em frente com o `undefined`, e o problema só apareceu bem depois, como um "reprovado". Por isso, em JavaScript, o sintoma costuma aparecer longe da causa.
- **O *Traceback* tem a ordem invertida.** *Most recent call last* quer dizer "a chamada mais recente por último". A última linha diz o erro, e logo acima está a linha em que ele aconteceu. No JavaScript, as linhas `at` vêm na ordem contrária: a primeira é onde o erro aconteceu.
- **O `=` no `if` nem chega a rodar.** `if nota = 10:` dá `SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?`, "talvez você quisesse `==`". (O `:=` é outro operador do Python, que fica fora desta aula.)

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console, e o que a mensagem quer dizer?
> ```js
> const alunos = [{ nome: "Ana" }, { nome: "Bia" }];
>
> for (let i = 0; i <= alunos.length; i++) {
>   console.log(alunos[i].nome);
> }
> ```
>
> > [!success]- Resposta
> > Aparecem `Ana` e `Bia`, e depois `TypeError: Cannot read properties of undefined (reading 'nome')`. Na terceira volta, o `i` vale 2, e o `alunos[2]` não existe: vale `undefined`. Ler o `.nome` de um `undefined` dá erro. O limite certo é `i < alunos.length`.

> [!question] 2. Qual é o tipo do erro, e como consertar?
> ```js
> let total = 10;
> console.log(totla);
> ```
>
> > [!success]- Resposta
> > `ReferenceError: totla is not defined`. O nome foi escrito errado: a variável se chama `total`, e `totla` é outro nome, que nunca foi criado. O conserto é `console.log(total);`.

> [!question] 3. O erro está na função ou na chamada?
> Este código mostra `22.5` e depois `NaN`.
>
> ```js
> const precos = [10, 25, 8];
>
> function comDesconto(preco) {
>   return preco * 0.9;
> }
>
> console.log(comDesconto(precos[1]));
> console.log(comDesconto(precos[3]));
> ```
>
> > [!success]- Resposta
> > Na chamada. A função está certa: testada sozinha, `comDesconto(10)` dá `9`. O problema é o `precos[3]`, porque o array só tem os índices 0, 1 e 2. O `undefined` entra na função, e `undefined * 0.9` dá `NaN`.

> [!question] 4. O que aparece no console, e por que o segundo valor sai errado?
> ```js
> function dobro(n) {
>   const resultado = n * 2;
>   console.log(resultado);
> }
>
> const x = dobro(4) + 1;
> console.log(x);
> ```
>
> > [!success]- Resposta
> > `8` e depois `NaN`. O `8` vem do `console.log` de dentro da função, e mostra que a conta está certa. Mas a função não tem `return`, então a chamada `dobro(4)` vale `undefined`. A conta fica `undefined + 1`, que dá `NaN`. O conserto é trocar o `console.log(resultado)` por `return resultado;`.

> [!question] 5. O que aparece no console?
> ```js
> let tentativas = 3;
>
> if (tentativas = 0) {
>   console.log("Acabaram as tentativas");
> }
>
> console.log(tentativas);
> ```
>
> > [!success]- Resposta
> > Só `0`. O `=` guardou o 0 em `tentativas`, e o 3 se perdeu. Depois, o `if` recebeu o 0, que conta como falso, e a mensagem não apareceu. São dois estragos de uma vez. Com `===`, a comparação daria `false` do mesmo jeito, mas o `tentativas` continuaria valendo 3.

> [!question] 6. Este código deveria mostrar 3, mas mostra 0. Onde está o erro?
> ```js
> const notas = [7, 3, 9, 5, 10];
> let aprovados = 0;
>
> for (const nota of notas) {
>   if (notas >= 6) {
>     aprovados = aprovados + 1;
>   }
> }
>
> console.log(aprovados);
> ```
>
> > [!success]- Resposta
> > Na condição: ela usa `notas`, a lista inteira, no lugar de `nota`, a nota da volta. Comparar a lista com o 6 dá `false` todas as vezes, e o contador nunca sobe. O certo é `if (nota >= 6)`, e aí aparece `3`.

> [!question] 7. Que `console.log` você colocaria, e onde, para achar o erro?
> A média de 8, 6 e 10 é 8, mas o código mostra `5.333333333333333`.
>
> ```js
> function media(lista) {
>   let soma = 0;
>   for (let i = 1; i < lista.length; i++) {
>     soma = soma + lista[i];
>   }
>   return soma / lista.length;
> }
>
> console.log(media([8, 6, 10]));
> ```
>
> > [!success]- Resposta
> > Um `console.log` dentro do laço, antes da soma:
> >
> > ```js
> > console.log("i =", i, "| lista[i] =", lista[i]);
> > ```
> >
> > Ele mostra:
> >
> > ```
> > i = 1 | lista[i] = 6
> > i = 2 | lista[i] = 10
> > ```
> >
> > O 8 nunca aparece, porque o `i` começa em 1, e o primeiro elemento fica no índice 0. A soma fica 6 + 10 = 16, e 16 / 3 dá cerca de 5,33. O conserto é `let i = 0`.

> [!question] 8. Por que este código mostra "reprovado", sem nenhum erro?
> ```js
> const media = NaN;
>
> if (media >= 6) {
>   console.log("aprovado");
> } else {
>   console.log("reprovado");
> }
> ```
>
> > [!success]- Resposta
> > Porque `NaN >= 6` dá `false`. O `NaN` comparado com qualquer número, por `>`, `<`, `>=`, `<=` ou `===`, dá `false`, então o programa vai para o `else`. O JavaScript não avisa nada. É assim que um `NaN` vindo de uma conta errada vira uma resposta que parece normal.

> [!question] 9. Um colega mudou três coisas de uma vez, e o programa passou a funcionar. Por que isso é um problema?
>
> > [!success]- Resposta
> > Porque ele não sabe qual das três mudanças consertou o erro. Talvez só uma fosse necessária, e as outras duas podem ter estragado alguma coisa que ainda não apareceu. Com uma mudança de cada vez, cada resultado diz algo: se melhorou ou piorou, foi aquela mudança.

## De onde vêm as palavras

- **[[glossario/depuracao|Depurar]]**: do latim medieval *dēpūrāre*, "purificar, limpar", de *dē-*, que reforça, e *pūrus*, "puro, limpo". Depurar o código é limpá-lo dos erros. É o mesmo *pūrus* de **puro** e **purificar**. No Brasil, *depurar* também é a tradução de *debug*.
- **[[glossario/depuracao|Debug]] e bug**: *debug* é *de-* + *bug*, "tirar o *bug*". *Bug* é "inseto" em inglês, e antes, no inglês medieval, *bugge* era "espantalho, assombração". O sentido de "defeito numa máquina" já existia entre engenheiros no século 19: Thomas Edison escreveu *bugs* numa carta de 1878. Em 1947, na Universidade Harvard, quem operava o computador Mark II achou uma mariposa presa num relé, uma das peças da máquina, e a colou no caderno de registro, com a nota *First actual case of bug being found*, "primeiro caso real de *bug* encontrado". A piada só funcionava porque a palavra já era usada. Quem espalhou a história foi Grace Hopper, que trabalhava com esse computador. O caderno, com a mariposa, está hoje num museu dos Estados Unidos, o Smithsonian.
- **[[glossario/breakpoint|Breakpoint]]**: do inglês *break*, "quebrar", e *point*, "ponto". O *point* veio, pelo francês antigo, do latim *pūnctum*, "furo, picada, ponto", de *pungere*, "picar, furar". É o mesmo *pūnctum* que deu o nosso **ponto**. Um ponto era, na origem, a marca de uma picada. O breakpoint é a marca que você põe numa linha para o programa parar ali.
- **Erro**: do latim *error*, ligado ao verbo *errāre*, que queria dizer "vagar, andar sem rumo, perder-se", e também "enganar-se". Errar era, na origem, perder o caminho. O português guarda os dois sentidos: quem erra a conta se engana, e o cavaleiro errante anda pelo mundo sem rumo certo.
- **[[glossario/hipotese|Hipótese]]**: do latim tardio *hypothesis*, do grego *hupóthesis*, de *hupotíthēmi*, "pôr debaixo, propor". Entre os sentidos gregos estão "base" e "suposição". A hipótese é o que se põe por baixo para construir em cima, uma base provisória que o teste confirma ou derruba.
- **Isolar**: veio do francês *isoler*, da família do latim *īnsula*, "ilha", que deu o italiano *isola*. Isolar é, na origem, **transformar em ilha**, como separar um trecho do resto do programa para testá-lo sozinho. Da mesma *īnsula* vêm **ilha** e **insular**.
- **Inspecionar**: do latim *īnspectiō*, "exame", de *īnspicere*, "examinar, olhar para dentro", de *in-*, "em, dentro", e *specere*, "olhar". O `console.log` deixa olhar para dentro do programa enquanto ele roda.

> [!tip] Para guardar
> - Depurar é investigar o erro em vez de mudar coisas ao acaso. Roteiro: ler a mensagem, isolar o trecho, olhar os valores, testar uma hipótese.
> - Uma mensagem de erro diz o **tipo**, o **motivo** e a **linha**. O `^` aponta onde o JavaScript travou.
> - *Cannot read properties of undefined* quer dizer que o que vem antes do ponto é `undefined`. Procure de onde ele veio.
> - A linha do erro é onde o problema apareceu, nem sempre onde ele nasceu. As linhas `at` mostram quem chamou quem.
> - Sem mensagem de erro, isole: teste cada função sozinha, com uma entrada cuja resposta você conhece.
> - No `console.log`, ponha um rótulo em cada valor e coloque-o onde os valores mudam, como dentro do laço.
> - Antes de mudar o código, diga o que espera ver. Mude uma coisa só, rode, e desfaça se não ajudou.
> - O breakpoint (no dia a dia, às vezes só "break") pausa o programa numa linha e mostra todas as variáveis. Não é o `break` do laço, que encerra o laço de vez. Ele faz o mesmo trabalho do `console.log`, por outro caminho.
> - O valor estranho é uma pista: `undefined` costuma ser índice, `return` ou argumento faltando; `NaN`, uma conta com `undefined` ou texto; uma volta a mais, o `<=` no lugar do `<`.

Fontes: MDN: [JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors), [String.prototype.toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) · Chrome DevTools: [Pause your code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints) · VS Code: [Debugging](https://code.visualstudio.com/docs/editor/debugging) · Python: [Tutorial, Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html) · Wikipedia: [Bug (engineering)](https://en.wikipedia.org/wiki/Bug_(engineering)) · Wiktionary: [depurar](https://en.wiktionary.org/wiki/depurar), [dēpūrō](https://en.wiktionary.org/wiki/depuro), [pūrus](https://en.wiktionary.org/wiki/purus), [debug](https://en.wiktionary.org/wiki/debug), [bug](https://en.wiktionary.org/wiki/bug), [errō](https://en.wiktionary.org/wiki/erro#Latin), [hipótese](https://en.wiktionary.org/wiki/hip%C3%B3tese), [ὑπόθεσις](https://en.wiktionary.org/wiki/%E1%BD%91%CF%80%CF%8C%CE%B8%CE%B5%CF%83%CE%B9%CF%82), [isolar](https://en.wiktionary.org/wiki/isolar), [isola](https://en.wiktionary.org/wiki/isola), [inspecionar](https://en.wiktionary.org/wiki/inspecionar), [īnspiciō](https://en.wiktionary.org/wiki/inspicio), [breakpoint](https://en.wiktionary.org/wiki/breakpoint), [point](https://en.wiktionary.org/wiki/point), [pūnctum](https://en.wiktionary.org/wiki/punctum), [pungō](https://en.wiktionary.org/wiki/pungo), [ponto](https://en.wiktionary.org/wiki/ponto)
