---
title: Retry (nova tentativa)
aliases:
  - nova tentativa
  - tentar de novo
---

> [!abstract] Definição
> **Mandar de novo um pedido que falhou ou ficou sem resposta, na esperança de que agora dê certo.** Muitas [[glossario/biblioteca|bibliotecas]] HTTP fazem isso sozinhas, sem o programador pedir.

O cuidado é que o cliente nem sempre sabe se o primeiro pedido chegou a ser aplicado: a conexão pode cair depois de o servidor gravar e antes de a resposta voltar. Repetir um pedido [[glossario/idempotencia|idempotente]], como um `PUT`, é seguro, porque o estado final é o mesmo. Repetir um `POST` pode criar duas coisas ou cobrar duas vezes. Ver a aula [[programacao/protocolos-da-web/modulo-3/05-metodos-seguros-idempotentes-e-erros-comuns-de-semantica|3.5 Métodos seguros, idempotentes e erros comuns de semântica]].

## De onde vem a palavra

Do inglês *re-*, "de novo", e *try*, "tentar". O *try* veio do inglês médio *trien*, "separar, peneirar, escolher, julgar", do francês antigo *trier*, "escolher, separar". O sentido de "tentar" nasceu de "pôr à prova", como num julgamento. *Retry* é "tentar outra vez".

Fontes: IETF: [RFC 9110, seção 9.2.2: Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2) · Wiktionary: [retry](https://en.wiktionary.org/wiki/retry), [try](https://en.wiktionary.org/wiki/try)
