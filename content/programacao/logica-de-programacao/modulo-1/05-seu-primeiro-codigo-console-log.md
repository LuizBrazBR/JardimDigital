---
title: "1.5 Seu primeiro código: console.log"
aliases:
  - programacao/logica-de-programacao/04-seu-primeiro-codigo-console-log
tags:
  - logica-de-programacao
  - javascript
  - console
---

Última aula do módulo 1. Até aqui, os algoritmos ficaram no papel ou em comentários. Agora o [[glossario/codigo|código]] roda de verdade.

A aula ensina um comando só, o `console.log`. Só que, no caminho, aparecem várias peças que ela usa sem explicar: o ponto, os parênteses, as aspas, o ponto e vírgula, os `//`, o "erro de sintaxe" e onde, afinal, o código roda. Este resumo abre cada uma delas.

## Onde o código roda

Para rodar [[glossario/javascript|JavaScript]], é preciso um programa que leia as instruções e as execute. Há dois jeitos comuns.

### Jeito 1: no navegador, sem instalar nada

Todo navegador já entende JavaScript e tem um [[glossario/console|console]] embutido.

1. Abra uma aba em branco: digite `about:blank` na barra de endereço. Assim, as mensagens do site que estava aberto não se misturam com as suas.
2. Aperte **Ctrl+Shift+J** (Chrome ou Edge). Outro caminho: **F12** e depois a aba **Console**.
3. Digite `console.log("Olá, mundo!")` e aperte **Enter**.

> [!warning] Duas coisas estranhas no console do navegador
> - **Aparece um `undefined` embaixo da mensagem.** Não é erro. O console do navegador mostra também o "resultado" de cada comando digitado, e o `console.log` não tem resultado nenhum, ele só escreve. `undefined` é o jeito de o JavaScript dizer "nada".
> - **Colar código pode ser bloqueado.** Na primeira vez que você tenta colar algo, o Chrome mostra um aviso e pede para digitar uma frase de confirmação. É uma proteção contra golpes em que alguém convence a pessoa a colar um código que rouba a conta dela. Para código que você mesmo escreveu e entende, não há problema.

### Jeito 2: no computador, com Node.js

O JavaScript nasceu para rodar dentro do navegador. O **Node.js** (2009) é um programa que roda JavaScript direto no computador, sem navegador. É isso que os cursos costumam pedir para instalar, junto com um **editor de código**, como o VS Code. O editor é um bloco de notas turbinado: colore o código, aponta erros e completa nomes.

O caminho fica assim:

1. Crie um arquivo `primeiro.js`. O `.js` no fim do nome avisa que ele contém JavaScript.
2. Escreva `console.log("Olá, mundo!");` dentro dele e salve.
3. Abra o **terminal**, a janela onde se digitam comandos (no VS Code: menu *Terminal* → *Novo Terminal*), e rode `node primeiro.js`.

| | Navegador | Node.js |
|---|---|---|
| Instalar | nada | Node.js, e um editor |
| Onde se escreve | direto no console, uma linha por vez | num arquivo `.js` |
| Bom para | testar uma linha rápida | programas com várias linhas |

No Node, o `undefined` não aparece. Ele mostra só o que o `console.log` escreveu.

## O que é o console

É uma tela só de texto, feita para quem programa. Quem usa um site ou aplicativo nunca a vê. Na [[programacao/logica-de-programacao/modulo-1/03-entrada-processamento-saida|aula anterior]], o console foi apresentado como o lugar onde a **saída** dos programas vai aparecer, e é para isso que serve o `console.log`.

Programadores vivem nele: para testar um trecho, para ver quanto vale alguma coisa no meio do programa, para descobrir por que algo não funciona.

## `console.log` por partes

```js
console.log("Olá, mundo!");
```

> [!example] Um controle remoto
> `console` é o controle. O **ponto** escolhe um botão dele, e `log` é esse botão. Os **parênteses** são o dedo apertando. O que vai dentro dos parênteses é o que você quer que apareça.

### `console` e o ponto

`console` é um nome que guarda várias ferramentas dentro dele. O ponto quer dizer **"de dentro de"**: `console.log` é "o `log` que fica dentro do `console`". Esse ponto aparece o tempo todo em JavaScript.

O `log` não é o único botão do controle:

- `console.error("...")`: mostra a mensagem como erro (em vermelho, no navegador)
- `console.warn("...")`: mostra como aviso (em amarelo)
- `console.clear()`: limpa o console

### `log`: registrar

Em inglês, [[glossario/log|log]] é **registro**, como um diário de bordo. `console.log` é **registrar no console**: escrever uma linha nele.

### Os parênteses: executar agora

Os parênteses mandam a ferramenta trabalhar. Escreva `console.log` sem parênteses num arquivo e rode: não aparece nada. Você apontou para o botão, mas não apertou.

O que vai dentro dos parênteses se chama **argumento**: a informação entregue para a ferramenta trabalhar. É a **entrada** do `log`. O que aparece no console é a **saída**.

Dá para passar mais de um argumento, separados por vírgula. O console junta tudo com um espaço:

```js
console.log("Total:", 2 + 3);
// Total: 5
```

### As aspas: texto é texto

Texto entre aspas tem nome técnico: **[[glossario/string|string]]**. As aspas dizem ao JavaScript: "não tente entender isto, só repita".

```js
console.log("2 + 3"); // 2 + 3
console.log(2 + 3);   // 5
```

Com aspas, é um texto que por acaso tem números. Sem aspas, é uma conta: o JavaScript calcula primeiro e mostra o resultado. É o ciclo da aula passada numa linha só: o processamento (a soma) e depois a saída (o `log`).

Aspas duplas e simples funcionam igual: `"oi"` e `'oi'` são a mesma coisa. Só precisam abrir e fechar com o mesmo tipo.

### O ponto e vírgula: fim da instrução

O `;` marca onde termina uma **instrução**, um comando completo. Sem ele, o JavaScript tenta adivinhar onde cada instrução acaba, e quase sempre acerta. Por isso a aula diz que "na maioria das vezes" funciona. Pôr o `;` sempre tira o "quase" da conversa.

### Maiúsculas contam

Para o JavaScript, `console` e `Console` são nomes diferentes. Só o primeiro existe.

### Os `//`: comentários

Nos exemplos da aula, depois do código vêm linhas como `// saída:`. Elas **não** são parte do que aparece no console. São **comentários**: notas para quem lê. Tudo o que vem depois de `//`, até o fim da linha, o JavaScript ignora. A aula usa comentários para mostrar qual seria a saída.

### A ordem: de cima para baixo

Com várias instruções, o JavaScript executa uma de cada vez, de cima para baixo, como os passos de um [[glossario/algoritmo|algoritmo]]:

```js
console.log("Bem-vindo à lógica de programação!");
console.log(2 + 3);
console.log(10 - 4);

// Bem-vindo à lógica de programação!
// 5
// 6
```

## Quando dá erro: lendo a mensagem

Erro assusta no começo, mas a mensagem é uma pista. No Node, depois do nome do arquivo e do número da linha, ela aparece assim:

```
console.log("oi";
            ^^^^
SyntaxError: missing ) after argument list
```

- A primeira linha mostra o código com problema, e os `^^^^` apontam onde o JavaScript se perdeu.
- A linha seguinte diz o **tipo** do erro e o **motivo**, em inglês. No navegador, a mesma mensagem aparece em vermelho, começando com `Uncaught`.

Por enquanto, dois tipos bastam:

| Tipo | O que quer dizer | O que acontece |
|---|---|---|
| `SyntaxError` | erro de [[glossario/sintaxe\|sintaxe]]: a "gramática" do código está errada, e o JavaScript não consegue nem ler | **nada** roda, nem as linhas que estavam certas |
| `ReferenceError` | a gramática está certa, mas apareceu um nome que o JavaScript não conhece | as linhas anteriores rodam, e o programa para no erro |

Os erros comuns da aula, com a mensagem de verdade (testadas no Node):

| Você escreveu | Mensagem | Em português | O que houve |
|---|---|---|---|
| `console.log(Olá, mundo!);` | `SyntaxError: missing ) after argument list` | falta um `)` depois dos argumentos | sem aspas, o JavaScript tenta ler as palavras como código, e o `!` não faz sentido ali |
| `console.log(Olá);` | `ReferenceError: Olá is not defined` | `Olá` não foi definido | sem aspas, `Olá` vira um nome que o JavaScript procura e não acha |
| `console.log("oi";` | `SyntaxError: missing ) after argument list` | falta um `)` | o parêntese abriu e nunca fechou |
| `console.log("oi);` | `SyntaxError: Invalid or unexpected token` | símbolo inválido ou inesperado | as aspas abriram e não fecharam |
| `Console.log("oi");` | `ReferenceError: Console is not defined` | `Console` não foi definido | com C maiúsculo, é outro nome, e ele não existe |

## Treine

> [!question] O que aparece no console?
> 1. `console.log("5 + 5");`
> 2. `console.log(5 + 5);`
> 3. `console.log("Resultado:", 5 + 5);`
> 4. `console.log("5" + 5);`
> 5. `console.log(oi);`

> [!success]- Respostas (clique para abrir)
> 1. `5 + 5`: está entre aspas, então é texto e aparece igualzinho.
> 2. `10`: sem aspas, é conta.
> 3. `Resultado: 10`: dois argumentos, juntados com um espaço.
> 4. `55`: pegadinha. Quando um dos lados do `+` é texto, o JavaScript **gruda** em vez de somar. O nome disso é *concatenar*.
> 5. Erro: `ReferenceError: oi is not defined`. Sem aspas, `oi` é um nome que o JavaScript não conhece.

## Por que "Olá, mundo!"?

É uma tradição. A primeira versão conhecida é de 1972, num tutorial de Brian Kernighan para a linguagem B, no Bell Labs. Em 1978, o livro *The C Programming Language*, de Kernighan e Dennis Ritchie, abriu com um programa que escrevia `hello, world`, e o costume pegou.

Desde então, o primeiro programa em quase toda linguagem é escrever essa frase. Ela serve de teste: se aparece na tela, o caminho do código até a saída está funcionando.

## De onde vêm as palavras

- **[[glossario/codigo|Código]]**: do latim *cōdex*, forma popular de *caudex*, **tronco de árvore**. Virou o nome das tabuinhas de madeira em que se escrevia, depois "livro", depois "livro de leis" e "sistema de sinais". Hoje é também o texto de um programa.
- **[[glossario/log|Log]]**: em inglês, uma **tora de madeira**. Os navios mediam a velocidade jogando na água um pedaço de madeira preso a uma corda com nós, e anotavam as medições no *logbook*, o diário de bordo. *Log* virou "registro".
- **[[glossario/sintaxe|Sintaxe]]**: do grego *sýntaxis*, de *sýn* (junto) + *táxis* (arranjo, ordem). **Pôr as coisas juntas, em ordem.** Erro de sintaxe é peça fora do lugar.
- **[[glossario/string|String]]**: em inglês, **cordão, fio**. Os caracteres vêm um atrás do outro, como contas num fio.
- **[[glossario/javascript|JavaScript]]**: um nome de marketing. A linguagem se chamou Mocha, depois LiveScript, e virou JavaScript em 1995, pegando carona na fama da linguagem Java.

> [!tip] Duas palavras que nasceram numa árvore
> *Código* vem de um tronco, e *log* de uma tora. O `console.log` da sua primeira linha de código tem madeira dos dois lados.

> [!tip] Para guardar
> - `console.log(...)` escreve no console o que estiver dentro dos parênteses.
> - Texto vai entre aspas. Sem aspas, o JavaScript tenta entender como código: a conta é calculada, e um nome desconhecido dá erro.
> - O ponto pega algo de dentro, os parênteses executam e as maiúsculas contam.
> - Erro não é bronca, é pista: leia o tipo e o motivo.

Fontes: Wikipedia: ["Hello, World!" program](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program), [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
