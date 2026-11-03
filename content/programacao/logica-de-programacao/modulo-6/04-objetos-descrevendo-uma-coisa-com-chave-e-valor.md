---
title: "6.4 Objetos: descrevendo uma coisa com chave e valor"
tags:
  - logica-de-programacao
  - javascript
  - objetos
---

Quarta aula do módulo 6. Até aqui, o módulo foi todo do [[glossario/array|array]], uma lista de valores em ordem, cada um na sua posição. Esta aula traz a outra coleção do módulo, o **[[glossario/objeto|objeto]]**, que guarda várias informações sobre **uma coisa só**, cada uma com o seu nome.

## Uma coisa, várias informações

O array é bom para listas de coisas parecidas: os preços do carrinho, os nomes da turma, as tarefas do dia. Mas pense numa ficha de cadastro, com nome, idade e cidade. São informações diferentes sobre uma pessoa só.

Dá para tentar com um array:

```js
let ana = ["Ana", 20, "São Paulo"];

console.log(ana[1]); // 20
```

Funciona, mas o `ana[1]` não diz nada para quem lê. É preciso lembrar que a posição 0 é o nome, a 1 é a idade e a 2 é a cidade. E as posições podem mudar. Na [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]], um `unshift` no começo mudava o índice de todos os elementos:

```js
let ana = ["Ana", 20, "São Paulo"];

ana.unshift("aluna"); // alguém pôs um dado novo no começo
console.log(ana[1]);  // Ana: o ana[1] agora é o nome, e não a idade
```

Nenhum erro avisa. O programa continua rodando, só que com o dado errado. O objeto resolve isso trocando a posição por um **nome**.

## Criando um objeto

```js
let pessoa = {
  nome: "Ana",
  idade: 20,
  cidade: "São Paulo"
};

console.log(pessoa); // { nome: 'Ana', idade: 20, cidade: 'São Paulo' }
```

Cada linha de dentro é um par: um nome, dois-pontos e um valor. O nome se chama **[[glossario/chave|chave]]**, e cada par de chave e valor é uma **[[glossario/propriedade|propriedade]]** do objeto. A `pessoa` tem três propriedades: `nome`, `idade` e `cidade`.

| Peça | No exemplo | Para que serve |
|---|---|---|
| `{` e `}` | no começo e no fim | marcam onde o objeto começa e termina |
| chave | `nome`, `idade`, `cidade` | dá nome à informação |
| `:` | `nome: "Ana"` | separa a chave do valor |
| valor | `"Ana"`, `20`, `"São Paulo"` | é o conteúdo da informação |
| `,` | depois de cada par | separa um par do próximo (depois do último, é opcional) |

Os valores podem ser de qualquer tipo: texto, número, booleano e até um array.

```js
let aluno = {
  nome: "Caio",
  idade: 17,
  matriculado: true,
  notas: [7, 8.5, 9]
};
```

### Duas "chaves" diferentes

Em português, a palavra **chave** aparece com dois sentidos nesta aula, e vale separar:

- **as chaves**, os sinais `{` e `}`, que abrem e fecham o objeto;
- **a chave**, o nome de cada informação, como `nome` ou `idade`.

O inglês não tem esse problema. Os sinais são *braces*, e o nome da informação é *key*, a chave de porta. A ideia é essa mesma: com a chave, você abre o lugar onde o valor está guardado.

### As chaves do bloco e as do objeto

Os sinais `{ }` já apareceram no `if`, no `for` e na `function`, marcando um [[glossario/bloco|bloco]] de código. No objeto, eles fazem outro trabalho: guardam pares de chave e valor. O lugar diz qual é qual. Depois de um `=`, como em `let pessoa = { ... }`, é um objeto. Depois de um `if (...)`, de um `for (...)` ou de uma `function`, é um bloco.

## Lendo uma propriedade

Há duas formas de ler:

```js
let pessoa = { nome: "Ana", idade: 20 };

console.log(pessoa.nome);     // Ana
console.log(pessoa["idade"]); // 20
```

- **Com ponto**: `pessoa.nome`. É o mesmo ponto do `frutas.length`, da aula 6.1, e quer dizer "o `nome` que fica dentro de `pessoa`". Na aula 6.2, o `length` foi chamado de propriedade do array, e agora dá para ver de onde vem o nome: uma propriedade é uma informação com nome guardada dentro de um valor.
- **Com colchetes**: `pessoa["idade"]`, com o nome da chave **entre aspas**, como um texto.

Pedir uma chave que não existe dá `undefined`, sem erro, como pedir um índice que não existe num array:

```js
console.log(pessoa.altura); // undefined
```

## Por que existem duas formas

Se as duas leem a mesma coisa, por que não existe uma só? Porque elas funcionam de jeitos diferentes, e os colchetes cobrem dois casos que o ponto não cobre.

**No ponto, o nome da chave é escrito no código.** Em `pessoa.nome`, o `nome` é o próprio nome da chave, digitado ali. É fácil de ler, mas tem um limite: o nome precisa estar decidido na hora de escrever o código.

**Nos colchetes, vai um valor.** O que fica entre os colchetes é um texto, e um texto pode vir de qualquer lugar, inclusive de uma variável. Isso o ponto não consegue fazer:

```js
let pessoa = { nome: "Ana", idade: 20 };
let campo = "idade";

console.log(pessoa[campo]); // 20
console.log(pessoa.campo);  // undefined
```

| Escrito | O JavaScript entende | Resultado |
|---|---|---|
| `pessoa[campo]` | o valor da variável `campo`, que é `"idade"`, então vira `pessoa["idade"]` | `20` |
| `pessoa.campo` | a chave chamada `campo`, com esse nome mesmo | `undefined`, porque não existe chave `campo` |

Com os colchetes, a chave pode ser escolhida **com o programa rodando**. Ela pode vir de um parâmetro de função, de um laço ou de uma resposta da pessoa. Com o ponto, ela é sempre a que foi digitada. Uma função só pode mostrar qualquer propriedade:

```js
let pessoa = { nome: "Ana", idade: 20 };

function mostrar(objeto, chave) {
  console.log(chave + ": " + objeto[chave]);
}

mostrar(pessoa, "nome");  // nome: Ana
mostrar(pessoa, "idade"); // idade: 20
```

Com o ponto, seria preciso escrever uma função para cada chave.

**Nos colchetes, cabe qualquer nome.** No ponto, o nome da chave segue as mesmas regras de um nome de variável, da [[programacao/logica-de-programacao/modulo-2/01-variaveis-let-e-const|aula 2.1]]: sem espaço, sem hífen e sem começar com número. Uma chave como `"nome completo"`, com espaço, precisa de aspas na criação e de colchetes na leitura:

```js
let cadastro = { "nome completo": "Ana Souza" };

console.log(cadastro["nome completo"]); // Ana Souza
```

Com o ponto, `cadastro.nome completo` dá `SyntaxError`. O JavaScript lê `cadastro.nome` e depois tropeça no `completo`, que sobrou solto.

### O array usa os colchetes pelo mesmo motivo

Os colchetes do `frutas[0]`, da aula 6.1, são esses mesmos. Por dentro, o array também é um objeto: o `typeof` da [[programacao/logica-de-programacao/modulo-2/02-tipos-de-dados|aula 2.2]] diz `"object"` para os dois. As chaves de um array são as posições, `"0"`, `"1"`, `"2"`. Como no ponto o nome não pode começar com número, `frutas.0` dá `SyntaxError`, e o jeito de chegar ao elemento é com colchetes. Neles cabe qualquer valor, inclusive o `i` de um laço: `frutas[i]`.

Isso também explica o `for...in` da [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]], que entregava as posições como texto, `"0"`, `"1"` e `"2"`. Ele estava entregando os nomes das chaves do array.

### Qual usar

| Situação | Use |
|---|---|
| o nome da chave já está decidido quando você escreve o código | ponto: `pessoa.nome` |
| o nome da chave está numa variável ou num parâmetro | colchetes: `pessoa[campo]` |
| a chave tem espaço ou hífen, ou começa com número | colchetes: `cadastro["nome completo"]` |

No dia a dia, o ponto é o mais usado, por ser mais curto e mais fácil de ler.

## Mudando e criando propriedades

As duas formas também servem para **escrever**, com o `=`, como numa variável ou numa posição de array:

```js
let pessoa = { nome: "Ana", idade: 20 };

pessoa.idade = 21;        // muda, com ponto
pessoa["idade"] = 22;     // muda, com colchetes
pessoa.cidade = "Recife"; // cria uma propriedade nova

console.log(pessoa); // { nome: 'Ana', idade: 22, cidade: 'Recife' }
```

O `=` numa chave que já existe troca o valor. Numa chave que não existe, cria a propriedade. E tudo o que vale para ler vale para escrever: com colchetes, a chave pode vir de uma variável, como em `pessoa[campo] = 30`.

Esse "cria se não existir" tem um lado ruim. Um erro de digitação não dá erro: cria uma propriedade nova.

```js
let pessoa = { nome: "Ana", idade: 20 };

pessoa.idaed = 21;   // erro de digitação
console.log(pessoa); // { nome: 'Ana', idade: 20, idaed: 21 }
```

A `idade` continua 20, e o objeto ganhou uma `idaed` que ninguém queria.

> [!info]- E com `const`? (clique para abrir)
> Funciona como o array da aula 6.2:
>
> ```js
> const pessoa = { nome: "Ana" };
>
> pessoa.nome = "Bia";       // pode: mexe no mesmo objeto
> console.log(pessoa);       // { nome: 'Bia' }
>
> pessoa = { nome: "Caio" }; // TypeError: Assignment to constant variable.
> ```
>
> O `const` impede que `pessoa` passe a guardar outro objeto. Mexer nas propriedades do mesmo objeto é permitido.

> [!info]- E para apagar uma propriedade? (clique para abrir)
> Com o `delete`:
>
> ```js
> let pessoa = { nome: "Ana", idade: 20, cidade: "Recife" };
>
> delete pessoa.cidade;
> console.log(pessoa); // { nome: 'Ana', idade: 20 }
> ```
>
> Também vale com colchetes: `delete pessoa["cidade"]`.

## Array ou objeto?

| | Array | Objeto |
|---|---|---|
| cria com | `[ ]` | `{ }` |
| cada valor tem | uma posição, o índice: 0, 1, 2... | um nome, a chave |
| lê com | `frutas[0]` | `pessoa.nome` ou `pessoa["nome"]` |
| serve para | uma lista de coisas parecidas | uma coisa só, com várias características |
| a ordem | importa: é ela que dá a posição | não importa: ninguém procura pela posição |

A pergunta para decidir é: **é uma lista de coisas do mesmo tipo, ou uma coisa só com várias informações?**

- Os preços do carrinho são uma lista de números: array.
- Um produto, com nome, preço e estoque, é uma coisa só: objeto.
- Todos os produtos da loja, cada um com nome, preço e estoque, são uma lista de coisas em que cada coisa é um objeto: um array de objetos, o assunto da aula 6.5.

## Percorrendo um objeto

Na aula 6.3, o `for...of` deu erro com objetos, porque eles não são iteráveis. O laço deles é o `for...in`, que entrega o nome de cada chave:

```js
let pessoa = { nome: "Ana", idade: 20, cidade: "Recife" };

for (let chave in pessoa) {
  console.log(chave + ": " + pessoa[chave]);
}
// nome: Ana
// idade: 20
// cidade: Recife
```

Repare no `pessoa[chave]`. A cada volta, a variável `chave` guarda um nome diferente, e só os colchetes conseguem usar um nome que está numa variável. Com `pessoa.chave`, as três voltas mostrariam `undefined`, porque o JavaScript procuraria uma chave chamada `chave`. É o caso mais comum em que os colchetes fazem falta.

## Uma propriedade pode guardar uma função

O valor de uma propriedade pode ser até uma função. Nesse caso, ela se chama [[glossario/metodo|método]], como na aula 6.2. O `console` é um objeto, e o `log` é uma propriedade dele que guarda uma função. Por isso se escreve `console.log`, com o ponto:

```js
console.log(typeof console);     // object
console.log(typeof console.log); // function
```

Criar métodos nos seus próprios objetos fica fora desta aula.

## Os erros mais comuns

**Usar o ponto com uma variável.** O `pessoa.campo` procura uma chave chamada `campo`. Para usar o nome guardado na variável, o certo é `pessoa[campo]`.

**Esquecer as aspas nos colchetes.**

```js
let pessoa = { nome: "Ana" };

console.log(pessoa[nome]); // ReferenceError: nome is not defined
```

Sem as aspas, o `nome` é lido como uma variável, e ela não existe. Se existisse uma variável `nome`, seria pior: o JavaScript usaria o valor dela como chave, sem avisar. O certo é `pessoa["nome"]`, ou simplesmente `pessoa.nome`.

**Usar `=` no lugar de `:` dentro do objeto.**

```js
let pessoa = { nome = "Ana" }; // SyntaxError
```

Dentro do objeto, a chave e o valor se separam com dois-pontos. O `=` é para atribuir do lado de fora: `pessoa.nome = "Ana"`.

**Esquecer a vírgula entre os pares, ou usar ponto e vírgula.**

```js
let pessoa = { nome: "Ana" idade: 20 }; // SyntaxError: Unexpected identifier 'idade'
let outra = { nome: "Ana"; idade: 20 }; // SyntaxError: Unexpected token ';'
```

**Errar o nome da chave.** Na leitura, dá `undefined`. Na escrita, cria uma propriedade nova, como a `idaed` lá em cima. Nos dois casos, nenhum erro avisa.

## Lógica ou JavaScript?

O Python chama o objeto de **dicionário**, o `dict`:

| | JavaScript | Python |
|---|---|---|
| nome | objeto | dicionário (`dict`) |
| criar | `{ nome: "Ana", idade: 20 }` | `{"nome": "Ana", "idade": 20}` |
| ler | `pessoa.nome` ou `pessoa["nome"]` | `pessoa["nome"]` |
| mudar ou criar | `pessoa.idade = 21` | `pessoa["idade"] = 21` |
| chave que não existe | `undefined` | `KeyError` |
| percorrer as chaves | `for (let chave in pessoa)` | `for chave in pessoa:` |

```python
pessoa = {"nome": "Ana", "idade": 20}

print(pessoa["nome"])        # Ana
pessoa["idade"] = 21
pessoa["cidade"] = "Recife"
print(pessoa)                # {'nome': 'Ana', 'idade': 21, 'cidade': 'Recife'}

print(pessoa.get("altura"))  # None

for chave in pessoa:
    print(chave, pessoa[chave])
# nome Ana
# idade 21
# cidade Recife
```

- **No Python, as chaves vão entre aspas** já na criação, porque são textos.
- **Só existe a forma dos colchetes.** O `pessoa.nome` dá `AttributeError`. Isso mostra que o ponto do JavaScript é um atalho para o caso mais comum, e que o caso geral é o dos colchetes.
- **A chave que não existe para o programa** com `KeyError`. Para pedir sem esse risco, o `get` devolve `None`, o "nada" do Python, quando a chave não existe.
- **O `for` do Python num dicionário entrega as chaves**, como o `for...in` do JavaScript num objeto.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let carro = { marca: "Fiat", ano: 2015 };
>
> console.log(carro.marca);
> console.log(carro["ano"]);
> ```
>
> > [!success]- Resposta
> > `Fiat` e depois `2015`. As duas formas leem uma propriedade: o ponto, com o nome direto, e os colchetes, com o nome entre aspas.

> [!question] 2. O que aparece no console?
> ```js
> let livro = { titulo: "Dom Casmurro" };
>
> console.log(livro.autor);
> ```
>
> > [!success]- Resposta
> > `undefined`. O objeto não tem a chave `autor`, e pedir uma chave que não existe dá `undefined`, sem erro.

> [!question] 3. O que aparece no console?
> ```js
> let p = { nome: "Bia", idade: 30 };
>
> p.idade = 31;
> p.cidade = "Natal";
> console.log(p);
> ```
>
> > [!success]- Resposta
> > `{ nome: 'Bia', idade: 31, cidade: 'Natal' }`. O `=` na `idade`, que já existia, troca o valor. Na `cidade`, que não existia, cria a propriedade.

> [!question] 4. O que aparece no console?
> ```js
> let p = { nome: "Bia", idade: 30 };
> let campo = "nome";
>
> console.log(p[campo]);
> console.log(p.campo);
> ```
>
> > [!success]- Resposta
> > `Bia` e depois `undefined`. Nos colchetes, vai o valor da variável `campo`, que é `"nome"`. No ponto, o JavaScript procura uma chave chamada `campo`, que não existe.

> [!question] 5. Corrija o código.
> ```js
> let filme = { titulo = "Up", ano = 2009 };
> ```
>
> > [!success]- Resposta
> > Dentro do objeto, a chave e o valor se separam com dois-pontos, e não com `=`:
> >
> > ```js
> > let filme = { titulo: "Up", ano: 2009 };
> > ```

> [!question] 6. Por que dá erro? Como corrigir?
> ```js
> let p = { nome: "Caio" };
>
> console.log(p[nome]);
> ```
>
> > [!success]- Resposta
> > Dá `ReferenceError: nome is not defined`. Sem aspas, o `nome` é lido como uma variável, e ela não existe. O certo é `p["nome"]`, com aspas, ou `p.nome`.

> [!question] 7. O que aparece no console?
> ```js
> let conta = { saldo: 100 };
>
> conta.sado = 50;
> console.log(conta.saldo);
> console.log(conta);
> ```
>
> > [!success]- Resposta
> > `100` e depois `{ saldo: 100, sado: 50 }`. O erro de digitação em `sado` não dá erro: cria uma propriedade nova, e o `saldo` fica como estava.

> [!question] 8. Array ou objeto?
> Para cada caso, qual dos dois serve melhor?
>
> 1. As notas de uma turma.
> 2. Os dados de um celular: marca, modelo e preço.
> 3. Os nomes dos dias da semana.
> 4. Um endereço: rua, número e cidade.
>
> > [!success]- Resposta
> > 1. Array: uma lista de números parecidos.
> > 2. Objeto: uma coisa só, com informações diferentes.
> > 3. Array: uma lista de nomes, e a ordem importa.
> > 4. Objeto: uma coisa só, o endereço, com informações diferentes.

> [!question] 9. Por que dá erro? Como ler o valor?
> ```js
> let ficha = { "tipo sanguíneo": "O+" };
>
> console.log(ficha.tipo sanguíneo);
> ```
>
> > [!success]- Resposta
> > A chave tem espaço, e no ponto o nome segue as regras de nome de variável, que não aceitam espaço. O JavaScript lê `ficha.tipo` e tropeça no `sanguíneo`: `SyntaxError`. Com colchetes, cabe qualquer nome: `ficha["tipo sanguíneo"]`, que vale `"O+"`.

> [!question] 10. O que aparece no console?
> ```js
> let aluno = { nome: "Caio", notas: [7, 8, 9] };
>
> console.log(aluno.notas[1]);
> console.log(aluno.notas.length);
> ```
>
> > [!success]- Resposta
> > `8` e depois `3`. O `aluno.notas` é o array `[7, 8, 9]`. Daí, o `[1]` pega o elemento do índice 1, e o `.length` dá o tamanho do array.

> [!question] 11. O que aparece no console?
> ```js
> let precos = { arroz: 20, feijao: 8 };
>
> for (let item in precos) {
>   console.log(item, precos[item]);
> }
> ```
>
> > [!success]- Resposta
> > `arroz 20` e depois `feijao 8`. O `for...in` entrega o nome de cada chave na variável `item`, e o `precos[item]` lê o valor dela. Com `precos.item`, apareceria `undefined`.

> [!question] 12. Escreva o código.
> Crie um objeto `produto` com `nome` igual a `"caderno"`, `preco` igual a `15` e `emEstoque` igual a `true`. Depois, mude o preço para `18` usando colchetes e mostre o objeto.
>
> > [!success]- Resposta
> > ```js
> > let produto = {
> >   nome: "caderno",
> >   preco: 15,
> >   emEstoque: true
> > };
> >
> > produto["preco"] = 18;
> > console.log(produto); // { nome: 'caderno', preco: 18, emEstoque: true }
> > ```

> [!question] 13. Escreva a função.
> Escreva uma função `descrever(pessoa)` que receba um objeto com `nome` e `idade` e devolva um texto como `"Ana tem 20 anos"`. Teste com `descrever({ nome: "Ana", idade: 20 })`.
>
> > [!success]- Resposta
> > ```js
> > function descrever(pessoa) {
> >   return pessoa.nome + " tem " + pessoa.idade + " anos";
> > }
> >
> > console.log(descrever({ nome: "Ana", idade: 20 })); // Ana tem 20 anos
> > ```
> >
> > Um objeto, como um array, pode ser argumento. E vale o mesmo cuidado da aula 6.3: a função recebe o mesmo objeto, e não uma cópia. Se ela mudar uma propriedade, o objeto de quem chamou muda junto.

## De onde vêm as palavras

- **[[glossario/objeto|Objeto]]**: do latim *obiectus*, particípio de *obicere*, "lançar diante, pôr na frente", formado por *ob-*, "diante, contra", e *iacere*, "lançar". Objeto é o que foi posto diante de nós, uma coisa que se pode ver, apontar e descrever. Na programação, é o valor que descreve uma coisa. No latim, *obiectum* também queria dizer "acusação", o que se lança contra alguém.
- **[[glossario/chave|Chave]]**: do latim *clāvis*, "chave". Em português, a mesma palavra também dá nome aos sinais `{ }`, e é daí que vem a confusão desta aula. Do *clāvis* vieram também a **clave** da música e a **clavícula**, do latim *clāvicula*, "chavezinha", o osso do ombro. E o **conclave**, de *con-*, "junto", e *clāvis*: um lugar que se fecha à chave, como a reunião em que os cardeais escolhem o papa a portas trancadas.

> [!tip] Para guardar
> - Um objeto descreve uma coisa só, com várias informações. Cada informação tem um nome, a chave, e um valor.
> - Cria-se com `{ }`: `{ nome: "Ana", idade: 20 }`. Dois-pontos entre a chave e o valor, vírgula entre os pares.
> - Lê-se com ponto, `pessoa.nome`, ou com colchetes e aspas, `pessoa["nome"]`.
> - O ponto usa o nome escrito no código. Os colchetes usam um valor, que pode vir de uma variável (`pessoa[campo]`) e pode ter espaço (`cadastro["nome completo"]`).
> - As duas formas também servem para mudar e para criar: `pessoa.idade = 21` ou `pessoa["idade"] = 21`.
> - Chave que não existe dá `undefined` na leitura. Na escrita, cria a propriedade, e por isso um erro de digitação passa sem aviso.
> - Array para uma lista de coisas parecidas, objeto para uma coisa com várias características.
> - O laço dos objetos é o `for...in`, que entrega as chaves. O valor se lê com colchetes: `pessoa[chave]`.

Fontes: MDN: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects), [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors), [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete), [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) · Python: [Dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) · Wiktionary: [objeto](https://en.wiktionary.org/wiki/objeto), [obiectum](https://en.wiktionary.org/wiki/obiectum), [obiciō](https://en.wiktionary.org/wiki/obicio), [chave](https://en.wiktionary.org/wiki/chave), [clāvis](https://en.wiktionary.org/wiki/clavis), [clāvicula](https://en.wiktionary.org/wiki/clavicula), [conclave](https://en.wiktionary.org/wiki/conclave)
