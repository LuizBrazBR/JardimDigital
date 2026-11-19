---
title: Sessão
---

> [!abstract] Definição
> **Conjunto de dados que uma aplicação associa a uma interação com um usuário**, como a identidade depois do login e o prazo de validade.

O servidor pode guardar a sessão temporariamente na memória do programa ou num armazenamento externo, como um banco de dados ou cache compartilhado. Se ficar apenas na memória, desaparece quando o programa para; se ficar num armazenamento persistente, pode sobreviver à reinicialização. Muitas vezes o navegador envia um ID de sessão num [[glossario/cookie|cookie]], e o servidor usa esse ID para encontrar os dados da sessão. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].

## De onde vem a palavra

Do latim *sessio*, "ato de estar sentado", de *sedere*, "sentar-se". Uma sessão era uma reunião em que as pessoas ficavam sentadas, como a de um tribunal ou de um parlamento. Em computação, passou a ser o período em que você "fica" conectado a um sistema.

Fontes: Wiktionary: [session](https://en.wiktionary.org/wiki/session)
