---
title: Certificado
---

> [!abstract] Definição
> **O documento digital que prova que um servidor é o dono de um nome, como `loja.com.br`: a carteira de identidade do site.** O servidor mostra o certificado ao navegador no TLS, o passo de proteção do HTTPS.

O certificado traz os nomes para os quais vale (um `*` vale para qualquer nome naquela posição: `*.github.io` cobre `fulano.github.io`), quem assinou e a validade. Quem assina é uma **autoridade certificadora**, como a Let's Encrypt, que só dá o certificado a quem prova que controla o [[glossario/dominio|domínio]], por exemplo criando uma linha pedida por ela no [[glossario/dns|DNS]]. O navegador confere se o nome da barra de endereço está na lista do certificado; se não está, para e mostra o aviso "Sua conexão não é particular". Ver a aula [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|1.4 Endereços na internet: IP, DNS e porta]].

## De onde vem a palavra

De **certificar**, do latim *certificāre*, de *certus*, "certo", e *facere*, "fazer": tornar certo. *Certus* vem de *cernere*, "peneirar, separar, decidir", o mesmo de **discernir**. O certificado deixa certo quem é o dono do nome.

Fontes: Let's Encrypt: [How It Works](https://letsencrypt.org/how-it-works/) · Wiktionary: [certifico](https://en.wiktionary.org/wiki/certifico), [certus](https://en.wiktionary.org/wiki/certus), [cerno](https://en.wiktionary.org/wiki/cerno)
