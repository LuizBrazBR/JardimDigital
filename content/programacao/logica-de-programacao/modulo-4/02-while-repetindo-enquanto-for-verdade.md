---
title: "4.2 while: repetindo enquanto for verdade (e o loop infinito)"
tags:
  - logica-de-programacao
  - javascript
  - lacos
---

Segunda aula do módulo 4. A [[programacao/logica-de-programacao/modulo-4/01-por-que-repetir-a-ideia-de-laco|aula 4.1]] apresentou a ideia de [[glossario/laco|laço]]: repetir um bloco enquanto uma condição for verdadeira. Agora vem a primeira forma de escrever isso em JavaScript, o **`while`**, que em inglês quer dizer "enquanto".

## O `while` é um `if` que volta

O formato é o mesmo do `if`: a palavra, a condição entre parênteses e o [[glossario/bloco|bloco]] entre chaves.

```js
while (condição) {
  // o que repetir
}
```

A diferença está no que acontece **depois** do bloco. O `if` pergunta uma vez, roda o bloco (ou não) e segue em frente. O `while` roda o bloco e **volta para perguntar de novo**. Só segue em frente quando a resposta for `false`.

Dá para ver a diferença trocando só a palavra. Primeiro, com `if`:

```js
let i = 1;

if (i <= 5) {
  console.log(i);
  i = i + 1;
}

// saída: 1
```

O `if` perguntou "o `i` é até 5?", ouviu "sim", mostrou o 1, somou 1 ao `i` e acabou. Agora, o mesmo código com `while`:

```js
let i = 1;

while (i <= 5) {
  console.log(i);
  i = i + 1;
}

console.log("Terminou! i agora vale", i);

// saída:
// 1
// 2
// 3
// 4
// 5
// Terminou! i agora vale 6
```

Depois de mostrar o 1 e somar 1, o `while` volta e pergunta de novo: "o `i`, que agora vale 2, é até 5?". Sim, então roda outra vez. E assim por diante, até a resposta ser "não".

Como o `if` e o `for`, o `while` é uma [[glossario/palavra-reservada|palavra reservada]]: `let while = 1;` dá `SyntaxError: Unexpected token 'while'`.

## As três peças, espalhadas

Na aula 4.1, todo laço tinha três peças: um começo, uma condição e uma mudança a cada volta. No `for`, as três ficavam juntas, dentro dos parênteses. No `while`, elas ficam **espalhadas**:

| Peça | Onde fica | No exemplo |
|---|---|---|
| começo | **antes** do `while` | `let i = 1;` |
| condição | entre os parênteses | `i <= 5` |
| mudança | **dentro** das chaves | `i = i + 1;` |

A variável que decide quando o laço para, o `i` do exemplo, se chama **variável de controle**. A linha `i = i + 1` também poderia ser `i++`, o atalho da aula 4.1.

Como as peças ficam em lugares diferentes, é fácil esquecer uma delas. A que mais some é a mudança, e é aí que nasce o laço infinito, logo abaixo.

### Volta a volta

| Volta | `i` no começo da volta | `i <= 5`? | O que acontece |
|---|---|---|---|
| 1ª | 1 | `true` | mostra 1, e o `i` vira 2 |
| 2ª | 2 | `true` | mostra 2, e o `i` vira 3 |
| 3ª | 3 | `true` | mostra 3, e o `i` vira 4 |
| 4ª | 4 | `true` | mostra 4, e o `i` vira 5 |
| 5ª | 5 | `true` | mostra 5, e o `i` vira 6 |
| (fim) | 6 | `false` | o laço para, sem mostrar nada |

Por que o "Terminou!" diz que o `i` vale 6, e não 5? Porque o laço só para quando a condição dá `false`, e o primeiro valor que faz `i <= 5` dar `false` é o 6. Depois de um `while`, a variável de controle guarda sempre o valor que **derrubou** a condição.

### A ordem dentro do bloco importa

Troque de lugar as duas linhas do bloco, com a mudança antes do `console.log`:

```js
let i = 1;

while (i <= 5) {
  i = i + 1;
  console.log(i);
}

// saída: 2, 3, 4, 5 e 6, um em cada linha
```

Agora o 1 nunca aparece, e o 6 aparece. Na 1ª volta, o `i` vale 1, passa no teste, vira 2 e só **então** é mostrado. Na 5ª volta, o `i` vale 5, passa no teste, vira 6 e é mostrado. A condição confere o valor no começo da volta, e o `console.log` mostra o valor do momento em que ele roda.

## O laço infinito

Se a condição nunca der `false`, o laço nunca para. É o **[[glossario/laco-infinito|laço infinito]]** (em inglês, *infinite loop*). O jeito mais comum de criar um é esquecer a mudança:

```js
// NÃO RODE: este laço nunca termina
let contador = 1;

while (contador <= 5) {
  console.log(contador);
  // falta mudar o contador aqui dentro
}
```

O `contador` começa em 1 e nada no bloco mexe nele. Então `contador <= 5` é `true` na 1ª volta, na 2ª, na milésima, para sempre. A tela se enche de `1`. É a criança do esconde-esconde da aula 4.1, que fala "1, 1, 1..." e nunca chega ao 10.

### O que acontece no computador

- **No navegador**, a aba congela. Os botões param de responder e a página não rola. Enquanto o laço roda, o JavaScript da página não faz mais nada: nem atende cliques, nem redesenha a tela. Depois de um tempo, o navegador avisa que a página não está respondendo e oferece fechá-la.
- **No terminal**, com o Node, o programa nunca termina. Com um `console.log` dentro do laço, as linhas descem sem parar. Para interromper, aperte **Ctrl+C**.

Nada disso estraga o computador. Basta fechar a aba ou apertar Ctrl+C, corrigir o código e rodar de novo.

### Quatro jeitos de criar um laço infinito

**1. Esquecer a mudança.** É o exemplo de cima.

**2. Mudar para o lado errado.**

```js
let i = 1;

while (i <= 5) {
  console.log(i);
  i = i - 1; // deveria ser i + 1
}
```

O `i` muda, mas na direção errada: 1, 0, -1, -2... Ele se afasta do 6 em vez de chegar perto, e continua menor que 5 para sempre. Não basta a variável mudar: ela precisa mudar **na direção** que leva a condição a dar `false`.

**3. Mudar fora das chaves.**

```js
let i = 1;

while (i <= 5) {
  console.log(i);
}
i = i + 1; // fora do bloco
```

A linha da mudança existe, mas está depois do `}`. Ela só rodaria quando o laço acabasse, e o laço nunca acaba, porque lá dentro o `i` continua valendo 1. É o mesmo recado do `if` da aula 3.1: o que conta é estar **dentro** das chaves, e não perto delas.

**4. Pular o alvo com `!==`.**

```js
let n = 1;

while (n !== 10) {
  n = n + 2;
}
```

O `n` passa por 1, 3, 5, 7, 9, 11, 13... Ele chega perto do 10, mas pula por cima, e nunca é **exatamente** 10. A condição "é diferente de 10?" fica `true` para sempre. Com `n < 10`, o laço para assim que o `n` passa do 10, mesmo pulando: termina com `n` valendo 11.

> [!tip] Prefira `<` e `<=` a `!==` na condição
> "É diferente do alvo?" só para se o valor cair **exatamente** no alvo. "É menor que o alvo?" para assim que o valor chegar **ou passar**. Na dúvida, use `<`, `<=`, `>` ou `>=`.

### A checagem antes de rodar

Antes de rodar um `while`, faça três perguntas:

1. A variável de controle foi criada **antes** do `while`?
2. A condição usa essa variável?
3. Dentro das chaves, alguma linha muda essa variável **na direção** que leva a condição a dar `false`?

Se o programa travar enquanto você testa um laço, comece por essas três perguntas.

> [!info]- Laços infinitos de propósito (clique para abrir)
> Alguns programas repetem "para sempre" de propósito. Um jogo redesenha a tela, volta após volta, até o jogador sair. Um servidor fica esperando pedidos o dia inteiro. Esses programas costumam usar `while (true)`, uma condição que nunca dá `false`, com uma saída escrita lá dentro do bloco, o `break`, que aparece na aula 4.5. A diferença para o laço infinito por engano é que esses têm uma porta de saída planejada.

## Quando o `while` brilha: sem saber quantas voltas

Você guarda 150 reais por mês. Em quantos meses junta 1000 reais?

```js
let total = 0;
let meses = 0;

while (total < 1000) {
  total = total + 150;
  meses = meses + 1;
}

console.log(meses, total); // 7 1050
```

| Mês | `total` depois do depósito |
|---|---|
| 1 | 150 |
| 2 | 300 |
| 3 | 450 |
| 4 | 600 |
| 5 | 750 |
| 6 | 900 |
| 7 | 1050 |

Repare que o número de voltas, 7, era justamente a **pergunta**. Ninguém precisou dizer ao laço quantas vezes rodar: ele só sabia quando parar, "quando o total chegar a 1000". Por isso o total final é 1050, e não 1000: o depósito do 7º mês passa da meta, e só depois disso a condição dá `false`.

É o mesmo caso da senha da aula 4.1: "enquanto a senha estiver errada, pergunte de novo". O laço não sabe quantas vezes vai rodar, só sabe quando parar. Para quando você já sabe o número de voltas, como "de 1 a 100", existe o `for`, que é o assunto da aula 4.3.

## O `while` pode não dar nenhuma volta

A condição é conferida **antes** da primeira volta. Se ela já começar `false`, o bloco não roda nem uma vez:

```js
let i = 10;

while (i <= 5) {
  console.log(i);
  i = i + 1;
}

console.log("fim");

// saída: fim
```

> [!info]- E se eu quiser pelo menos uma volta? O `do...while` (clique para abrir)
> O JavaScript tem uma variação que roda o bloco **primeiro** e pergunta **depois**:
>
> ```js
> let i = 10;
>
> do {
>   console.log("rodou com", i);
>   i = i + 1;
> } while (i <= 5);
>
> // saída: rodou com 10
> ```
>
> A condição é falsa desde o começo, mas o bloco rodou uma vez, porque a pergunta só vem no fim. É útil quando a primeira volta tem de acontecer de qualquer jeito, como mostrar um menu antes de perguntar se a pessoa quer sair. Repare no `;` depois do `while (...)`: no `do...while`, ele é necessário. O curso não usa essa forma, mas ela aparece em código por aí.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| enquanto | `while (i <= 5) { ... }` | `while i <= 5:` |
| somar 1 | `i = i + 1` ou `i++` | `i = i + 1` ou `i += 1` |

```python
i = 1
while i <= 5:
    print(i)
    i = i + 1
print("Terminou! i agora vale", i)
```

Como no `if` da aula 3.1, o Python não usa parênteses nem chaves: o bloco são as linhas recuadas. E o Python não tem `i++`: escrever isso dá `SyntaxError`. Lá, usa-se `i = i + 1` ou o atalho `i += 1`, que também existe no JavaScript.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> let i = 1;
> while (i <= 3) {
>   console.log(i);
>   i = i + 1;
> }
> ```
>
> > [!success]- Resposta
> > `1`, `2` e `3`, um em cada linha. Quando o `i` vira 4, `4 <= 3` dá `false`, e o laço para.

> [!question] 2. O que aparece no console?
> Repare na ordem das linhas dentro do bloco:
>
> ```js
> let i = 1;
> while (i <= 3) {
>   i = i + 1;
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > `2`, `3` e `4`. O `i` muda antes de ser mostrado. Na última volta, ele vale 3, passa no teste, vira 4 e só então aparece.

> [!question] 3. Quanto vale o `i` no final?
> ```js
> let i = 1;
> while (i <= 3) {
>   i = i + 1;
> }
> console.log(i);
> ```
>
> > [!success]- Resposta
> > `4`, o primeiro valor que faz `i <= 3` dar `false`. Depois do laço, a variável de controle guarda o valor que derrubou a condição.

> [!question] 4. Este laço termina? O que aparece?
> ```js
> let n = 10;
> while (n > 0) {
>   console.log(n);
>   n = n - 2;
> }
> ```
>
> > [!success]- Resposta
> > Termina. Aparecem `10`, `8`, `6`, `4` e `2`. Aqui, diminuir é a direção certa: o `n` desce até 0, e `0 > 0` dá `false`.

> [!question] 5. Este laço termina?
> ```js
> let n = 1;
> while (n !== 10) {
>   n = n + 2;
> }
> ```
>
> > [!success]- Resposta
> > Não. O `n` passa por 1, 3, 5, 7, 9, 11... e pula o 10, então "é diferente de 10?" fica `true` para sempre. Com `while (n < 10)`, o laço para quando o `n` vira 11.

> [!question] 6. Este laço termina?
> ```js
> let x = 1;
> while (x <= 5) {
>   console.log(x);
>   x = x - 1;
> }
> ```
>
> > [!success]- Resposta
> > Não. O `x` muda, mas para o lado errado: 1, 0, -1, -2... Ele nunca passa de 5. O certo era `x = x + 1`.

> [!question] 7. Onde está o erro?
> A pessoa queria mostrar 1, 2 e 3, mas o programa travou:
>
> ```js
> let i = 1;
> while (i <= 3) {
>   console.log(i);
> }
> i = i + 1;
> ```
>
> > [!success]- Resposta
> > A mudança está fora das chaves. Dentro do laço, o `i` vale 1 para sempre, e o `1` aparece sem parar. A linha `i = i + 1;` precisa ir para dentro do bloco, antes do `}`.

> [!question] 8. Reescreva com `while`:
> ```js
> for (let i = 1; i <= 3; i++) {
>   console.log(i);
> }
> ```
>
> > [!success]- Resposta
> > Cada peça vai para o seu lugar: o começo antes, a condição nos parênteses e a mudança no fim do bloco.
> >
> > ```js
> > let i = 1;
> > while (i <= 3) {
> >   console.log(i);
> >   i++;
> > }
> > ```

> [!question] 9. Quantas voltas o laço dá? E o que aparece?
> ```js
> let total = 0;
> while (total < 100) {
>   total = total + 30;
> }
> console.log(total);
> ```
>
> > [!success]- Resposta
> > 4 voltas, e aparece `120`. O total passa por 30, 60, 90 e 120. Com 90, ainda vale `90 < 100`, então vem mais uma volta, que passa da meta.

## De onde vêm as palavras

- **while**: do inglês antigo *hwīl*, "um tempo, um período", do protogermânico *\*hwīlō*. Até hoje, *a while* é "um tempo" em inglês. Como conjunção, *while* é "durante o tempo em que", ou seja, "enquanto". Primos: o alemão *Weile*, "um tempo", e o norueguês *hvile*, "descanso". A raiz indo-europeia, *\*kʷyeh₁-*, queria dizer "descansar", e está também no latim *tranquillus*, o nosso **tranquilo**.
- **[[glossario/enquanto|Enquanto]]**: do galego-português antigo *enquanto*, de *en* ("em") + *quanto*. O espanhol tem a mesma construção: *en cuanto*.
- **[[glossario/laco-infinito|Infinito]]**: do latim *īnfīnītus*, *in-* ("não") + *fīnītus* ("limitado, terminado"), de *fīnis*, "fim, limite, fronteira". O infinito é o que não tem fim. O português tem também a forma popular da mesma palavra, que veio pela fala: **infindo**, o que não finda. *Fīnis* está ainda em **fim**, **final**, **definir** e **confins**.
- **Controle**: do francês *contrôle*, antes *contrerole*, de *contre* ("contra") + *role* ("rolo"). Atrás está o latim medieval *contrarotulus*, "cópia de um rolo". Era a segunda via de um registro de contas, usada para conferir a primeira: controlar era checar uma lista contra a outra. A variável de controle é a que o laço confere a cada volta.

> [!tip] Para guardar
> - `while (condição) { ... }` repete o bloco enquanto a condição der `true`. É um `if` que volta para perguntar de novo.
> - No `while`, as três peças ficam espalhadas: o começo antes, a condição nos parênteses e a mudança dentro das chaves.
> - Depois do laço, a variável de controle guarda o valor que derrubou a condição.
> - Laço infinito: a condição nunca dá `false`. As causas comuns são esquecer a mudança, mudar para o lado errado, mudar fora das chaves e usar `!==` com um alvo que pode ser pulado.
> - No terminal, Ctrl+C interrompe um laço infinito. No navegador, feche a aba.
> - O `while` serve quando você sabe **quando parar**, mas não **quantas voltas** vai dar.
> - Se a condição já começar `false`, o bloco não roda nenhuma vez.

Fontes: MDN: [while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while), [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while), [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · Wiktionary: [while](https://en.wiktionary.org/wiki/while), [enquanto](https://en.wiktionary.org/wiki/enquanto), [infinito](https://en.wiktionary.org/wiki/infinito), [īnfīnītus](https://en.wiktionary.org/wiki/infinitus), [fīnis](https://en.wiktionary.org/wiki/finis), [contrôle](https://en.wiktionary.org/wiki/contr%C3%B4le), [control](https://en.wiktionary.org/wiki/control)
