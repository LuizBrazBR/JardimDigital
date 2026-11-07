---
title: Hipótese
---

> [!abstract] Definição
> **Um palpite sobre a causa de um problema, feito de um jeito que dá para pôr à prova.**

Na [[glossario/depuracao|depuração]], uma boa hipótese diz o que está errado e o que deve mudar quando for consertado. Por exemplo: "a soma dá `NaN` porque o laço usa `i <= lista.length` e passa um índice do fim. Com `<`, a soma de `[7, 8, 6]` deve dar 21".

Para testar:

1. **Diga antes o que espera ver.** Aqui, o 21.
2. **Mude só aquilo.** Se mudar duas coisas de uma vez e o resultado melhorar, não dá para saber qual delas ajudou. Se não melhorar, pode-se desfazer junto a mudança certa.
3. **Rode e compare.** Deu o previsto? A hipótese se confirmou. Não deu? Desfaça a mudança e tente outro palpite.

Ver a aula [[programacao/logica-de-programacao/modulo-7/04-quando-da-errado-depurando-seu-codigo|7.4 Quando dá errado: depurando seu código]].

## De onde vem a palavra

*Hipótese* veio do latim tardio *hypothesis*, que o latim tirou do grego *hupóthesis*. A palavra grega vem do verbo *hupotíthēmi*, "pôr debaixo, propor". Entre os sentidos de *hupóthesis* estão "base" e "suposição".

A hipótese é o que se põe por baixo para construir em cima: uma base provisória, que o teste confirma ou derruba.

Fontes: Wiktionary: [hipótese](https://en.wiktionary.org/wiki/hip%C3%B3tese), [ὑπόθεσις](https://en.wiktionary.org/wiki/%E1%BD%91%CF%80%CF%8C%CE%B8%CE%B5%CF%83%CE%B9%CF%82)
