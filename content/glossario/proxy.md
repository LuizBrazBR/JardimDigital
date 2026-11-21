---
title: Proxy
---

> [!abstract] Definição
> **Um programa que fica no meio do caminho entre o cliente e o servidor: recebe a requisição, repassa ao servidor e devolve a resposta.** O cliente fala com o proxy achando, ou sabendo, que fala com o servidor.

No caminho, o proxy pode fazer mais do que repassar. Pode guardar respostas num [[glossario/cache|cache]] e entregar a cópia no próximo pedido igual, sem perguntar ao servidor. Pode bloquear sites, como o proxy da rede de uma empresa, ou repartir os pedidos entre vários servidores, como um [[glossario/balanceador-de-carga|balanceador de carga]]. O `Server: cloudflare` que o `example.com` respondia na aula 2.1 é de um proxy desse tipo: a Cloudflare fica na frente do servidor do site.

Como o proxy decide sozinho o que pode guardar e repetir, ele olha o [[glossario/metodo-http|método]] de cada pedido: uma resposta de `GET` pode ser guardada; um `POST` passa direto. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

Do inglês médio *procucie*, contração de *procuracie*, que veio do anglo-normando e do latim medieval *procuratia*, do latim *prōcūrātiō*, de *prōcūrō*, "administrar, cuidar por alguém". Em inglês, *proxy* é o procurador, a pessoa que age em nome de outra, e também a procuração. Na rede, é o programa que faz o pedido em nome do cliente. A palavra portuguesa **procuração** tem a mesma origem.

Fontes: MDN: [Proxy server](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server) · Wiktionary: [proxy](https://en.wiktionary.org/wiki/proxy), [procuracy](https://en.wiktionary.org/wiki/procuracy)
