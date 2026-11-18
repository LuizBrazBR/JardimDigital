---
title: "2.3 HTTP não tem memória: o que significa ser stateless"
tags:
  - protocolos-da-web
  - http
---

Toda requisição HTTP que você viu até agora tem uma característica fundamental: o protocolo não guarda memória de uma requisição para a outra. Dizemos que o HTTP é **stateless**, ou **sem estado**. Essa é uma das decisões de design mais importantes do protocolo.

## O que significa não ter estado

Cada requisição HTTP é tratada como uma mensagem completa. Por padrão, o protocolo não diz ao servidor que a requisição atual veio do mesmo cliente que fez outra há dois segundos. As informações necessárias para entender e responder àquela mensagem vêm nela própria: na URL, nos cabeçalhos e, quando existe, no corpo.

Imagine esta sequência:

```http
POST /login HTTP/1.1
Host: api.loja.com
Content-Type: application/json
Content-Length: 49

{"email": "ana@exemplo.com", "senha": "12345678"}
```

```http
GET /pedidos HTTP/1.1
Host: api.loja.com
Accept: application/json
```

A primeira requisição envia os dados de login. A segunda pede os pedidos, mas não traz nenhuma credencial. Por si só, o HTTP não informa que as duas mensagens vieram da mesma pessoa. Se a aplicação exigir autenticação e não receber uma credencial válida na segunda requisição, pode responder com `401 Unauthorized`.

Isso difere de um programa de desktop que mantém na memória quem fez login e continua sabendo disso enquanto está aberto. O HTTP não mantém esse estado entre requisições.

## Como sites lembram quem você é

O protocolo não impede que uma aplicação mantenha estado. A aplicação pode guardar dados em um banco, cache ou memória do servidor. Mas, para relacionar uma nova requisição a uma sessão anterior, o cliente precisa enviar alguma identificação que o servidor possa reconhecer.

Dois mecanismos comuns são um **token** enviado no cabeçalho `Authorization` e um **identificador de sessão** guardado em um cookie. O navegador costuma reenviar o cookie automaticamente quando as regras daquele cookie se aplicam; um programa cliente pode incluir o token em cada pedido:

```http
GET /pedidos HTTP/1.1
Host: api.loja.com
Authorization: Bearer exemplo-de-token
```

```http
GET /pedidos/99 HTTP/1.1
Host: api.loja.com
Authorization: Bearer exemplo-de-token
```

O servidor recebe a credencial e a valida. No caso de uma sessão, pode consultar o identificador em um armazenamento; no caso de um token, pode validá-lo conforme o formato e as regras usados pela aplicação. Cookies, sessões e tokens serão aprofundados no módulo 5.

## Por que projetar assim

Como cada requisição contém o contexto necessário para tratá-la, qualquer servidor de um conjunto pode responder, desde que tenha acesso aos recursos e dados de que precisa. A aplicação não precisa direcionar cada cliente sempre ao mesmo servidor apenas porque ele guardou a conversa anterior na própria memória. Isso facilita distribuir o tráfego entre vários servidores.

O cliente precisa reenviar a identidade ou o contexto necessário. Com um cookie, o navegador pode fazer isso automaticamente. Com um token, o programa cliente costuma incluí-lo no cabeçalho `Authorization` em cada requisição.

> [!tip] Para guardar
> **Stateless** quer dizer que o HTTP não associa, por conta própria, uma requisição à anterior. A aplicação ainda pode manter estado; para recuperar esse contexto em outra requisição, ela usa dados enviados pelo cliente, como um cookie de sessão ou um token.

