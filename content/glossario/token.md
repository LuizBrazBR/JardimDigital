---
title: Token
---

> [!abstract] Definição
> **Valor que um cliente apresenta para provar uma identidade ou permissão**, como no cabeçalho `Authorization: Bearer ...`.

Um token pode ser um identificador aleatório que o servidor procura num armazenamento ou conter informações assinadas, como um [[glossario/jwt|JWT]]. O cliente guarda e reenvia o token; a aplicação decide como validá-lo. Um token não é necessariamente criptografado nem precisa ser guardado num banco. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].

## De onde vem a palavra

Do inglês antigo *tācn*, "sinal, símbolo", da mesma raiz do alemão *Zeichen* e do português "teclar"? Não: a ligação é com o verbo "mostrar, indicar". Em inglês, *token* ficou para "sinal", "ficha" e "prova de algo", como a ficha de metrô. Em redes, é o valor que serve de prova de que você tem permissão.

Fontes: Wiktionary: [token](https://en.wiktionary.org/wiki/token)
