---
title: Framework
---

> [!abstract] Definição
> **Um programa pela metade, pronto para você completar.** Ele já traz o que todo programa daquele tipo tem, e você escreve só a parte que é sua. Quem decide quando cada parte sua roda é o framework.

Num site, por exemplo, mostrar telas, reagir a cliques e trocar de página é igual em quase todo projeto. O framework traz isso pronto, e você escreve as funções que dizem o que cada tela mostra e o que cada botão faz.

É a ideia da [[glossario/callback|callback]], em tamanho grande. No `sort((a, b) => a - b)`, da aula 7.3, você escreve só a regra de comparação, e o `sort()` decide quando chamá-la. Num framework, o programa inteiro funciona assim.

**Framework ou biblioteca?** Uma biblioteca (em inglês, *library*) é um conjunto de funções prontas que você chama quando quer. O resumo mais comum: **você chama a biblioteca, e o framework chama você.** Na prática, a fronteira não é exata: o [[glossario/react|React]] se apresenta como biblioteca, mas muita gente o chama de framework, porque ele organiza o projeto inteiro.

| Nome | Para quê | Linguagem |
|---|---|---|
| React, Angular, Vue | telas de sites e aplicativos | JavaScript |
| Express | servidores | JavaScript (Node.js) |
| Django, Flask | servidores | Python |
| pandas | analisar tabelas de dados (é uma biblioteca) | Python |

Ver a aula [[programacao/logica-de-programacao/modulo-7/05-mini-projeto-uma-lista-de-tarefas|7.5 Mini-projeto: uma lista de tarefas (e o próximo passo)]].

## De onde vem a palavra

Do inglês *frame*, "armação, estrutura", e *work*, "trabalho". Um framework é a armação, como o esqueleto de madeira de uma casa, em que o resto do trabalho se apoia.

O *frame* está ligado ao verbo do inglês medieval *framen*, "construir", que no inglês antigo, *framian*, queria dizer "avançar, ser útil".

Fontes: React: [react.dev](https://react.dev) · Wiktionary: [framework](https://en.wiktionary.org/wiki/framework), [frame](https://en.wiktionary.org/wiki/frame)
