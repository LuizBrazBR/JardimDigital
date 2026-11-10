---
title: Cache
---

> [!abstract] Definição
> **Uma cópia guardada de algo que já foi buscado, para não precisar buscar de novo.** O navegador guarda no cache imagens, estilos e scripts que já baixou, e usa a cópia na próxima vez.

Com o cache, a página abre mais rápido e o [[glossario/servidor|servidor]] recebe menos pedidos. Quem diz por quanto tempo uma cópia vale é o servidor, num cabeçalho da [[glossario/resposta|resposta]], como o `cache-control: max-age=600`, "pode guardar por 10 minutos". Ver a aula [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|1.3 O papel do navegador e do servidor]].

## De onde vem a palavra

Do francês *cache*, "esconderijo", de *cacher*, "esconder". Era o lugar onde exploradores e caçadores escondiam comida e mantimentos para pegar na volta. O cache do navegador é isso: um estoque guardado para não precisar buscar de novo.

Fontes: MDN: [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) · Wiktionary: [cache](https://en.wiktionary.org/wiki/cache)
