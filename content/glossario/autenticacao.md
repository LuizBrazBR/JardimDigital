---
title: Autenticação
---

> [!abstract] Definição
> **Conferir quem está fazendo um pedido.** Responde à pergunta "quem é você?". Não confundir com **autorização**, que responde "o que você pode fazer?".

Como o [[glossario/http|HTTP]] não tem memória, cada [[glossario/requisicao|requisição]] precisa provar de novo quem é, levando algo que o [[glossario/back-end|back-end]] criou no login: um [[glossario/cookie|cookie]] de sessão ou um **token** no cabeçalho `Authorization`. Sem autenticação, o back-end responde **401**. Autenticado, mas sem permissão para aquilo, responde **403**. Num prédio, a portaria que confere o documento e dá o crachá autentica; a catraca que decide se o crachá abre aquele andar autoriza. Ver a aula [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|1.5 O que é um back-end e o que ele faz]].

## De onde vêm as palavras

**Autenticar** vem de **autêntico**, do grego *authentikós*, "original, verdadeiro", de *authéntēs*, "quem age por conta própria, o autor": conferir que algo é verdadeiro. **Autorizar** vem do latim medieval *auctōrizāre*, de *auctor*, "autor, fiador, quem garante", de *augēre*, "aumentar". O mesmo *auctor* deu **autor** e **autoridade**.

Fontes: MDN: [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401), [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403) · Wiktionary: [authentic](https://en.wiktionary.org/wiki/authentic), [auctor](https://en.wiktionary.org/wiki/auctor)
