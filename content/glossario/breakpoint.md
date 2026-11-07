---
title: Breakpoint
---

> [!abstract] Definição
> **Uma marca que você põe numa linha do programa para o [[glossario/depuracao|depurador]] pausar ali e mostrar o valor de todas as variáveis naquele instante.** Em português, "ponto de parada". No dia a dia, muita gente encurta para *break*.

Com o programa parado, dá para:

- **olhar as variáveis**: no VS Code, na seção VARIABLES; no Chrome, na seção *Scope* da aba *Sources*;
- **continuar até a próxima parada**: F5 no VS Code, F8 no Chrome. As linhas do meio rodam normalmente, só não são acompanhadas uma por uma;
- **avançar uma linha por vez**, com o *Step Over*: F10 nos dois. Se a linha chama uma função, ela roda inteira de uma vez;
- **entrar na função** que a linha chama, com o *Step Into*: F11 nos dois. Para sair dela e voltar a quem a chamou, Shift+F11.

No VS Code, o breakpoint se põe clicando na margem à esquerda do número da linha, e aparece uma bolinha vermelha. No Chrome, clicando no número da linha, na aba *Sources*. Escrever `debugger;` no código faz o mesmo, se as ferramentas do desenvolvedor estiverem abertas. Se não estiverem, a linha não faz nada.

**Não é o [[glossario/interromper|break]] do laço.** O `break` é um comando do programa: encerra o laço de vez e fica no código. O breakpoint é uma marca da ferramenta: pausa o programa enquanto você investiga, e depois o programa continua de onde parou. A marca nem fica dentro do arquivo.

O breakpoint faz o mesmo trabalho do `console.log`, olhar os valores, por outro caminho. O `console.log` mostra só os valores que você escolheu, mas de todas as voltas de uma vez. O breakpoint mostra todos os valores, mas de um momento só.

Ver a aula [[programacao/logica-de-programacao/modulo-7/04-quando-da-errado-depurando-seu-codigo|7.4 Quando dá errado: depurando seu código]].

## De onde vem a palavra

*Breakpoint* é o inglês *break*, "quebrar", mais *point*, "ponto". O breakpoint quebra a execução por um tempo, num ponto escolhido.

O *point* veio, pelo francês antigo *point*, do latim *pūnctum*, "furo, picada, ponto". E o *pūnctum* vem do verbo *pungere*, "picar, furar". O nosso **ponto** vem do mesmo *pūnctum*, pelo galego-português *ponto*. Um ponto era, na origem, a marca de uma picada. O breakpoint é a marca que você põe numa linha.

Sobre o *break*, ver [[glossario/interromper|interromper]].

Fontes: Chrome DevTools: [Pause your code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints) · VS Code: [Debugging](https://code.visualstudio.com/docs/editor/debugging) · MDN: [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) · Wiktionary: [breakpoint](https://en.wiktionary.org/wiki/breakpoint), [point](https://en.wiktionary.org/wiki/point), [pūnctum](https://en.wiktionary.org/wiki/punctum), [pungō](https://en.wiktionary.org/wiki/pungo), [ponto](https://en.wiktionary.org/wiki/ponto)
