---
title: Depuração
---

> [!abstract] Definição
> **O trabalho de achar a causa de um erro no código e consertá-la.** Em inglês, *debugging*. O erro em si, no jargão, é o *bug*.

Depurar não é mudar coisas ao acaso até funcionar. É investigar, mais ou menos nesta ordem:

1. **Ler a mensagem de erro**, quando houver uma. Ela diz o tipo do erro, o motivo e a linha.
2. **Isolar o trecho**: testar cada pedaço do programa sozinho, com uma entrada cuja resposta já se conhece, até achar o pedaço que erra.
3. **Olhar os valores** com `console.log`, no ponto em que eles mudam, como dentro de um laço.
4. **Testar uma [[glossario/hipotese|hipótese]]**: um palpite sobre a causa. Muda-se só aquilo e roda-se de novo, para ver se o resultado muda como o previsto.

O caso mais difícil é quando não aparece erro nenhum: o programa roda até o fim e só a resposta está errada. Em JavaScript isso é comum, porque um índice que não existe dá `undefined`, uma conta com `undefined` dá `NaN`, e o programa segue em frente sem avisar.

Além do `console.log`, existe o **depurador** (*debugger*), uma ferramenta do navegador e de editores como o VS Code. Ele pausa o programa numa linha escolhida e mostra o valor de todas as variáveis naquele instante.

Ver a aula [[programacao/logica-de-programacao/modulo-7/04-quando-da-errado-depurando-seu-codigo|7.4 Quando dá errado: depurando seu código]].

## De onde vem a palavra

*Depurar* vem do latim medieval *dēpūrāre*, "purificar, limpar", de *dē-*, que reforça o sentido, e *pūrus*, "puro, limpo". Depurar o código é limpá-lo dos erros. O mesmo *pūrus* está em **puro** e **purificar**.

*Debug* é o inglês *de-* + *bug*: "tirar o *bug*". E o *bug*, hoje "inseto", vem do inglês medieval *bugge*, que era "espantalho, assombração".

O sentido de "defeito" é mais velho que os computadores. Engenheiros já falavam em *bugs* no século 19, e Thomas Edison usou a palavra numa carta de 1878. A história mais famosa é de 1947: na Universidade Harvard, quem operava o computador Mark II achou uma mariposa presa num relé e a colou no caderno de registro, com a nota *First actual case of bug being found*, "primeiro caso real de *bug* encontrado". Era uma piada, e só tinha graça porque a palavra já era usada. Quem tornou a história conhecida foi Grace Hopper, que trabalhava com esse computador.

Fontes: Wiktionary: [depurar](https://en.wiktionary.org/wiki/depurar), [dēpūrō](https://en.wiktionary.org/wiki/depuro), [pūrus](https://en.wiktionary.org/wiki/purus), [debug](https://en.wiktionary.org/wiki/debug), [bug](https://en.wiktionary.org/wiki/bug) · Wikipedia: [Bug (engineering)](https://en.wikipedia.org/wiki/Bug_(engineering))
