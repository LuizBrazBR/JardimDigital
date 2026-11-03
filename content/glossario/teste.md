---
title: Teste
---

> [!abstract] Definição
> **Rodar um pedaço do código com dados cuja resposta já se conhece, para conferir se ele faz o que devia.**

O teste só funciona quando a resposta certa é conhecida antes de rodar. Para contar quantas idades da lista `15, 22, 17, 30, 18, 12, 45` são 18 ou mais, conta-se na mão primeiro: são 4. Se o código mostrar 4, passou. Se mostrar 3, tem erro.

Testar **aos poucos** ajuda a achar onde o erro está. Escreve-se um pedaço, confere-se com um `console.log`, e só então vem o próximo. Se algo der errado, foi no último pedaço, porque os anteriores já tinham sido conferidos. É o passo 4 do roteiro da [[programacao/logica-de-programacao/modulo-7/01-como-atacar-um-problema-de-programacao|aula 7.1]].

Os melhores dados de teste incluem os valores do limite, as bordas da [[programacao/logica-de-programacao/modulo-3/03-else-if-varias-condicoes-em-cadeia|aula 3.3]]. Com o 18 na lista, um `>` escrito no lugar de `>=` conta uma pessoa a menos. Sem o 18, os dois sinais dão o mesmo resultado, e o erro passa.

## De onde vem a palavra

O português pegou *teste* do inglês *test*. O caminho até lá:

| Língua | Palavra | Sentido |
|---|---|---|
| latim | *testum* | vaso de barro, tampa de vaso de barro |
| francês antigo | *test* | vaso de barro, especialmente o pote em que se provavam metais |
| inglês | *test* | o pote dos metais e, depois, qualquer prova |

Nesse pote, os metais preciosos eram derretidos para serem provados e purificados: era assim que se via se o ouro era bom. O sentido de "prova" veio por comparação. Como quem trabalha com metais põe o ouro à prova, o professor põe à prova o que o aluno sabe, e o programador, o código.

Fontes: Wiktionary: [teste](https://en.wiktionary.org/wiki/teste), [test](https://en.wiktionary.org/wiki/test)
