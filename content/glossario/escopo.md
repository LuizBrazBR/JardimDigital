---
title: Escopo (scope)
---

> [!abstract] Definição
> **O trecho do programa onde um nome de [[glossario/variavel|variável]] vale.** Fora do escopo, para o JavaScript, o nome não existe, e usá-lo dá `ReferenceError: ... is not defined`.

```js
const loja = "Padaria do Bairro"; // global: vale no programa inteiro

function precoComDesconto(preco) {
  const desconto = preco * 0.1;   // local: só vale dentro da função
  return preco - desconto;
}

console.log(loja);     // Padaria do Bairro
console.log(desconto); // ReferenceError: desconto is not defined
```

Há dois tipos:

| | Onde é criada | Onde existe |
|---|---|---|
| **variável local** | dentro de uma [[glossario/funcao|função]] ou de um [[glossario/bloco|bloco]], com `let` ou `const` | só ali dentro, e só enquanto aquele trecho roda |
| **variável global** | fora de qualquer função | no programa inteiro |

De dentro se vê o de fora, e de fora não se vê o de dentro: a função lê as variáveis globais, mas ninguém de fora lê as locais dela. Os [[glossario/parametro|parâmetros]] também são locais.

Cada chamada da função cria as suas variáveis locais, que somem quando ela termina. Uma variável local com o mesmo nome de uma global é outra variável: lá dentro, ela esconde a global, que não muda. Em inglês, isso se chama *shadowing*, "fazer sombra".

Com `let` e `const`, o bloco de um `if`, de um `for` ou de um `while` também é um escopo. O `var`, o jeito antigo, ignora os blocos e respeita só as funções. No Python, só a função cria um escopo novo.

Ver a aula [[programacao/logica-de-programacao/modulo-5/04-escopo-variaveis-locais-e-globais|Escopo: variáveis locais e globais]].

## De onde vem a palavra

Do latim *scopus*, "alvo", do grego *skopós*. No grego, *skopós* era primeiro o **vigia**, a sentinela no alto, e depois também o **alvo**, aquilo para onde se olha. Vem da raiz de *sképtomai*, "observar", a mesma de **cético**. O **bispo** também é parente: vem do grego *epískopos*, o supervisor que vigia a comunidade.

Na programação, o escopo é o alcance de um nome: até onde ele é visto, como o alcance da vista do vigia.

**Local** vem do latim tardio *locālis*, "de um lugar", de *locus*, "lugar". **Lugar** é a mesma palavra latina, que chegou ao português por outro caminho: *local* veio pelos livros, e *lugar* foi mudando na boca do povo. **Global** é de *globo* + *-al*, do latim *globus*, "bola, esfera": o que vale no globo inteiro.

Fontes: MDN: [Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) · Wiktionary: [scope](https://en.wiktionary.org/wiki/scope), [scopus](https://en.wiktionary.org/wiki/scopus), [σκοπός](https://en.wiktionary.org/wiki/%CF%83%CE%BA%CE%BF%CF%80%CF%8C%CF%82), [bispo](https://en.wiktionary.org/wiki/bispo), [local](https://en.wiktionary.org/wiki/local), [lugar](https://en.wiktionary.org/wiki/lugar), [globus](https://en.wiktionary.org/wiki/globus)
