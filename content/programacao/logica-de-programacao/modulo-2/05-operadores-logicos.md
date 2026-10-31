---
title: "2.5 Operadores lógicos: e, ou, não"
aliases:
  - programacao/logica-de-programacao/09-operadores-logicos
tags:
  - logica-de-programacao
  - javascript
  - operadores
---

Quinta e última aula do módulo 2. Na [[programacao/logica-de-programacao/modulo-2/04-comparacoes|aula anterior]], cada comparação fazia uma pergunta e devolvia `true` ou `false`. Só que muitas regras da vida real juntam várias perguntas: "tem 18 anos **e** tem carteira?", "comprou acima de 100 **ou** tem cupom?". Os operadores **[[glossario/logica|lógicos]]** juntam respostas assim, ou invertem uma resposta.

## Os três operadores

| Operador | Lê-se | Dá `true` quando | Exemplo | Resultado |
|---|---|---|---|---|
| `&&` | e | os **dois** lados são `true` | `true && false` | `false` |
| `\|\|` | ou | **pelo menos um** lado é `true` | `true \|\| false` | `true` |
| `!` | não | o valor era `false` (ele inverte) | `!true` | `false` |

O `&&` e o `||` ficam entre dois valores, como o `+`. O `!` fica grudado na frente de um valor só, como o sinal de menos em `-5`.

> [!tip] Onde ficam no teclado
> - `&` (o "e comercial"): **Shift + 7**.
> - `|` (a "barra vertical", que em programação se chama *pipe*): no teclado brasileiro (ABNT2), na tecla entre o Shift da esquerda e o Z, com **Shift**. Em alguns notebooks, ela muda de lugar.

> [!warning] São dois sinais, e não um
> `&` e `|` sozinhos também existem, mas fazem outra coisa: uma conta com os bits do número, como o `^` da [[programacao/logica-de-programacao/modulo-2/03-operadores-aritmeticos|aula 2.3]]. `true & false` dá `0`, um número, e não um booleano. Para "e" e "ou", é sempre `&&` e `||`.

## A tabela-verdade

Como cada lado só pode ser `true` ou `false`, há só quatro combinações possíveis. Dá para listar todas numa **[[glossario/tabela-verdade|tabela-verdade]]**:

| A | B | `A && B` | `A \|\| B` | `!A` |
|---|---|---|---|---|
| `true` | `true` | `true` | `true` | `false` |
| `true` | `false` | `false` | `true` | `false` |
| `false` | `true` | `false` | `true` | `true` |
| `false` | `false` | `false` | `false` | `true` |

Não precisa decorar. Basta lembrar do jeito de cada um:

- O `&&` é **exigente**: um único `false` estraga tudo. Só dá `true` na primeira linha.
- O `||` é **tolerante**: um único `true` basta. Só dá `false` na última linha.

> [!example] Fechaduras e portas
> - **E**: uma porta com duas fechaduras. Para entrar, precisa abrir **as duas**.
> - **OU**: uma casa com duas portas. Para entrar, basta **uma** estar aberta.
>
> Os circuitos elétricos funcionam do mesmo jeito. Dois interruptores em sequência (em série) só acendem a lâmpada se os dois estiverem ligados: é um E. Dois interruptores lado a lado (em paralelo) acendem se qualquer um estiver ligado: é um OU. Foi essa ponte entre lógica e circuitos que Claude Shannon mostrou em 1937 (ver [[glossario/booleano|booleano]]).

## Juntando comparações

O uso mais comum é juntar as comparações da aula passada:

```js
const idade = 20;
const temCarteira = true;
console.log(idade >= 18 && temCarteira); // true → as duas condições valem

const totalCompra = 150;
const temCupom = false;
console.log(totalCompra > 100 || temCupom); // true → uma já basta
```

### O "ou" do JavaScript não é o "ou" do português

No dia a dia, "ou" costuma querer dizer "um dos dois, mas não os dois": "café ou chá?" pede para escolher um. O `||` não funciona assim. Se os dois lados forem `true`, o resultado é `true`.

```js
// Meia-entrada: estudante, ou quem tem 60 anos ou mais
const ehEstudante = true;
const idadeCliente = 70;
console.log(ehEstudante || idadeCliente >= 60); // true
```

Uma estudante de 70 anos cumpre as duas condições e paga meia, claro. O `||` quer dizer "pelo menos um".

### O "não"

O `!` inverte a resposta. Mas ele inverte a **pergunta**, e não o tempo lá fora:

```js
const chovendo = false;  // "está chovendo?" → não
console.log(!chovendo);  // true  → "NÃO está chovendo?" → sim, é verdade
console.log(chovendo);   // false → a variável continua igual: segue sem chover
```

O jeito de não se confundir é ler `true` como **"é verdade"** e `false` como **"é mentira"**, sempre a respeito da frase escrita:

| Escrito | A frase | Resposta | Quer dizer |
|---|---|---|---|
| `chovendo` | "está chovendo" | `false` | é mentira que está chovendo |
| `!chovendo` | "**não** está chovendo" | `true` | é verdade que não está chovendo |

As duas linhas dizem a mesma coisa sobre o tempo: não chove. O `true` não quer dizer "chuva". Ele confirma a frase que foi perguntada, e a frase agora tem um "não".

> [!example] Como numa conversa
> — Está chovendo? — Não. *(isso é o `chovendo`: `false`)*
> — Então não está chovendo? — Exato, não está. *(isso é o `!chovendo`: `true`)*
>
> A segunda resposta é um "sim" para a pergunta, embora fale de algo que não acontece.

#### Para que serve o `!`

O `!` aparece quando o programa precisa agir justamente quando algo **não** acontece:

- Mostrar o botão "Entrar" só para quem **não** está logado: `const mostrarBotaoEntrar = !estaLogado;`
- Mostrar o aviso "esgotado" quando o produto **não** tem estoque: `const mostrarEsgotado = !temEstoque;`
- Fazer um botão de liga e desliga, em que cada clique troca o valor:

```js
let somLigado = true;
somLigado = !somLigado; // clicou no botão de mudo
console.log(somLigado); // false
somLigado = !somLigado; // clicou de novo
console.log(somLigado); // true
```

A linha `somLigado = !somLigado` não precisa saber se o som estava ligado ou desligado: ela sempre troca para o outro. Botões de mudo, de tema escuro e de favoritar seguem essa ideia.

Mais para a frente, com as decisões do tipo "se isso, faça aquilo", o `!` aparece o tempo todo: "se **não** estiver logado, mostre a tela de login".

#### Com comparações, troque o `!` pelo contrário

Com comparações, quase sempre existe um jeito mais simples do que pôr `!` na frente: usar a comparação contrária.

| Em vez de | Escreva | Lê-se |
|---|---|---|
| `!(a === b)` | `a !== b` | "a é diferente de b" |
| `!(idade >= 18)` | `idade < 18` | "idade menor que 18" |
| `!(idade > 18)` | `idade <= 18` | "idade até 18" |

Repare na fronteira, de novo: o contrário de "maior que" é "menor **ou igual**", e não só "menor". Se a idade não é maior que 18, ela pode ser exatamente 18.

## A ordem: quem vai primeiro

Quando tudo aparece junto, o JavaScript segue esta ordem de [[glossario/precedencia|precedência]]:

| Ordem | O quê |
|---|---|
| 1º | o que está entre parênteses |
| 2º | `!` (não) |
| 3º | as contas (`**`, depois `*` `/` `%`, depois `+` `-`) |
| 4º | as comparações (`>`, `<`, `>=`, `<=`, `===`, `!==`) |
| 5º | `&&` (e) |
| 6º | `\|\|` (ou) |
| 7º | `=` (atribuição) |

Em geral, as contas vêm primeiro, depois as comparações, depois a lógica. Faz sentido: o `&&` precisa das respostas das comparações para trabalhar. E a atribuição fica por último, para guardar o resultado pronto:

```js
const podeDirigir = idade >= 18 && temCarteira;
// 1. idade >= 18        → true
// 2. true && temCarteira → true && true → true
// 3. podeDirigir recebe true
```

### A exceção: o `!` vai antes de tudo

O `!` fica grudado no que está logo à direita dele, e é resolvido antes até das contas. Por isso a aula usou parênteses em `!(idadeVisitante >= 18)`. Sem eles, dá errado:

```js
const idadeVisitante = 15;
console.log(!(idadeVisitante >= 18)); // true  → certo
console.log(!idadeVisitante >= 18);   // false → errado!
```

Na segunda linha, o `!` pegou só o `idadeVisitante`, e não a comparação inteira. Para o JavaScript, um número diferente de zero conta como "verdadeiro", então `!15` dá `false`. Depois, ele compara `false >= 18`, que também dá `false`. Não dá erro nenhum, só a resposta errada. É mais um motivo para trocar o `!` pela comparação contrária: `idadeVisitante < 18`.

### `&&` antes de `||`, como vezes antes de mais

Entre os dois, o `&&` vai primeiro. Isso tem explicação. Na álgebra de [[glossario/booleano|Boole]], pensando `true` como 1 e `false` como 0, o E funciona como **multiplicação**: 1 × 1 = 1, e qualquer coisa vezes 0 dá 0, como um `false` estragando o `&&`. O OU lembra a **soma**: só dá 0 se os dois forem 0. E multiplicação vem antes de soma.

Na prática, isso muda resultados. Na festa:

```js
// Entra quem tem convite e está na lista, ou quem é amigo do organizador
const podeEntrar = (temConvite && estaNaLista) || ehAmigo;

// Entra quem tem convite, e além disso está na lista ou é amigo
const podeEntrar2 = temConvite && (estaNaLista || ehAmigo);
```

São duas regras diferentes. Um amigo do organizador sem convite entra na primeira festa, mas fica de fora da segunda. Sem parênteses, `temConvite && estaNaLista || ehAmigo` vira a primeira regra, porque o `&&` vai antes. Funciona, mas quem lê precisa saber disso de cabeça.

> [!tip] Misturou `&&` com `||`? Ponha parênteses
> Como na média da aula 2.3: parêntese a mais não faz mal, e deixa claro qual regra se quis escrever.

> [!info]- O JavaScript é preguiçoso (clique para abrir)
> O JavaScript resolve o `&&` e o `||` da esquerda para a direita, e para assim que já sabe a resposta:
> - Em `false && ...`, o resultado vai ser `false` de qualquer jeito. Ele nem olha o lado direito.
> - Em `true || ...`, o resultado vai ser `true` de qualquer jeito. Também nem olha.
>
> ```js
> false && console.log("oi"); // não mostra nada: o lado direito nem rodou
> true && console.log("oi");  // mostra oi
> ```
>
> Isso se chama **[[glossario/curto-circuito|curto-circuito]]**, de novo uma palavra de circuito elétrico. Vai ser útil mais para a frente, para pôr do lado esquerdo uma verificação que protege o lado direito.

> [!info]- Para ir além: as leis de De Morgan (clique para abrir)
> Como se nega uma regra com E ou com OU? Trocando um pelo outro:
> - `!(a && b)` é o mesmo que `!a || !b`
> - `!(a || b)` é o mesmo que `!a && !b`
>
> Em palavras: fica de fora da festa quem **não** tem (convite **e** nome na lista). Ou seja, quem não tem convite **ou** não está na lista. Basta faltar uma das duas coisas.
>
> São as **leis de De Morgan**, do matemático inglês Augustus De Morgan (1806–1871). Ele era amigo de George Boole: em 1847, os dois publicaram livros de lógica no mesmo dia. De Morgan também foi professor de Ada Lovelace.
>
> Na [[programacao/logica-de-programacao/modulo-3/04-condicoes-compostas-e-ou-nao|aula 3.4]], elas aparecem na prática: o `else` de um `if` com "e" recebe quem falhou em pelo menos uma das perguntas, ou seja, um "ou".

## Lógica ou JavaScript?

E, ou e não são o coração da lógica. Toda linguagem tem os três. Algumas usam símbolos, outras usam as próprias palavras:

| A ideia | JavaScript | Python | Pseudocódigo | Planilha (Excel) |
|---|---|---|---|---|
| e | `a && b` | `a and b` | `a e b` | `=E(A1;B1)` |
| ou | `a \|\| b` | `a or b` | `a ou b` | `=OU(A1;B1)` |
| não | `!a` | `not a` | `nao a` | `=NÃO(A1)` |

O Python escreve em inglês o que o JavaScript escreve com símbolos: `idade >= 18 and tem_carteira` quase se lê em voz alta. Os símbolos `&&` e `||` são os mesmos do C, a linguagem de onde o JavaScript herdou tantos outros sinais.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> console.log(5 > 3 && 2 > 4);
> ```
>
> > [!success]- Resposta
> > `false`: `5 > 3` é verdade, mas `2 > 4` não é, e o `&&` exige os dois.

> [!question] 2. O que aparece no console?
> ```js
> console.log(5 > 3 || 2 > 4);
> ```
>
> > [!success]- Resposta
> > `true`: `5 > 3` já basta para o `||`.

> [!question] 3. O que aparece no console?
> ```js
> console.log(!(5 > 3));
> ```
>
> > [!success]- Resposta
> > `false`: `5 > 3` dá `true`, e o `!` inverte.

> [!question] 4. O que aparece no console?
> ```js
> console.log(true && false || true);
> ```
>
> > [!success]- Resposta
> > `true`: o `&&` vai primeiro. `true && false` dá `false`, e depois `false || true` dá `true`.

> [!question] 5. O que aparece no console?
> ```js
> console.log(!true || !false);
> ```
>
> > [!success]- Resposta
> > `true`: os `!` vão primeiro. `!true` dá `false`, `!false` dá `true`, e `false || true` dá `true`.

> [!question] 6. O que aparece no console?
> ```js
> const n = 12;
> console.log(n % 2 === 0 && n > 10);
> ```
>
> > [!success]- Resposta
> > `true`: 12 é par (`12 % 2 === 0`) e é maior que 10.

> [!question] 7. Reescreva sem o `!`:
> ```js
> !(nota >= 7)
> ```
>
> > [!success]- Resposta
> > `nota < 7`.

> [!question] 8. Escreva a linha do frete
> Uma loja dá frete grátis para compras acima de 200, ou para clientes VIP. Escreva a linha que guarda isso em `freteGratis`, usando as variáveis `total` e `ehVip`.
>
> > [!success]- Resposta
> > `const freteGratis = total > 200 || ehVip;`. Um cliente VIP com compra de 300 também ganha, porque o `||` aceita os dois lados verdadeiros.

## De onde vêm as palavras

- **[[glossario/logica|Lógica]]**: do grego *logikḗ*, de *lógos*, "palavra, fala, razão". É a arte de raciocinar direito, que dá nome ao curso e ao tipo **lógico** do pseudocódigo.
- **Conjunção, disjunção e negação**: os nomes técnicos do E, do OU e do NÃO. *Conjunção* vem do latim *coniungere*, "unir junto", o mesmo verbo de **cônjuge**, a pessoa unida a outra no casamento. A conjunção só é verdadeira se os dois lados estiverem juntos. *Disjunção* é o contrário, "separar": basta um lado. *Negação* vem de *negāre*, "dizer não".
- **&**: é a palavra latina *et*, "e", escrita às pressas. Já no século I, na escrita cursiva dos romanos, o E e o T às vezes saíam emendados num traço só, e com o tempo o desenho ficou irreconhecível. Em inglês, o sinal chegou a ser ensinado às crianças como a 27ª letra do alfabeto, recitada como *and per se and*, "e, sozinho, quer dizer *and*". De tanto ser recitado, isso virou o nome dele: *ampersand*.
- **[[glossario/tabela-verdade|Verdade]]**: do latim *vēritās*, de *vērus*, "verdadeiro". Da mesma família vêm **verificar** (*vērificāre*, "tornar verdadeiro") e **veredicto** ("dito verdadeiro").

> [!tip] Para guardar
> - `&&` (e): `true` só se os **dois** lados forem `true`.
> - `||` (ou): `true` se **pelo menos um** lado for `true`, inclusive os dois.
> - `!` (não): inverte. Com comparações, prefira a comparação contrária: `!(idade >= 18)` é `idade < 18`.
> - A ordem: contas, comparações, `&&`, `||` e, por último, `=`. O `!` é a exceção e vai antes de tudo.
> - Misturou `&&` com `||`? Ponha parênteses.

Fontes: MDN: [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND), [Logical OR (\|\|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR), [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence) · Wikipedia: [Ampersand](https://en.wikipedia.org/wiki/Ampersand), [Augustus De Morgan](https://en.wikipedia.org/wiki/Augustus_De_Morgan), [Truth table](https://en.wikipedia.org/wiki/Truth_table) · Wiktionary: [logic](https://en.wiktionary.org/wiki/logic), [coniungō](https://en.wiktionary.org/wiki/coniungo), [verify](https://en.wiktionary.org/wiki/verify)
