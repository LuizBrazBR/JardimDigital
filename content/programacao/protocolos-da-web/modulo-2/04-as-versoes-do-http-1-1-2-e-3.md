---
title: "2.4 As versões do HTTP: 1.1, 2 e 3"
tags:
  - protocolos-da-web
  - http
---

Até aqui, os exemplos mostraram requisições e respostas no formato legível do HTTP/1.1: texto organizado em linhas. Essa versão foi padronizada em 1997 e continua em uso, mas não é a única. HTTP/2 e HTTP/3 mudaram a forma de transportar as mensagens para melhorar o uso da rede. Os conceitos que você já aprendeu — método, caminho, status, cabeçalhos e corpo — continuam valendo.

## HTTP/1.1: texto e conexões persistentes

No HTTP/1.1, as mensagens são texto. Uma requisição pode ser lida assim:

```http
GET /produtos/42 HTTP/1.1
Host: api.loja.com
Accept: application/json
```

O HTTP/1.1 também permite manter uma conexão TCP aberta e reutilizá-la para outras requisições, em vez de abrir uma conexão nova para cada uma. Isso é chamado de **conexão persistente** (*keep-alive*).

Em geral, o navegador envia uma requisição e espera sua resposta antes de enviar a próxima pela mesma conexão. O HTTP/1.1 também define *pipelining*, que permite enviar várias requisições sem esperar cada resposta, mas o suporte foi limitado: as respostas precisam chegar na ordem das requisições. Se uma resposta demora, as seguintes ficam bloqueadas atrás dela. Esse atraso é chamado de **head-of-line blocking** (bloqueio de fila) na camada HTTP.

Para contornar a espera, os navegadores costumam abrir várias conexões TCP com o mesmo servidor. Isso permite avançar em mais de uma transferência, mas cada conexão tem custos de estabelecimento e recursos próprios.

## HTTP/2: binário e multiplexado

O HTTP/2, padronizado em 2015, mantém a semântica do HTTP: métodos, status, cabeçalhos e corpos continuam com o mesmo sentido. A diferença é a forma de transmissão. Em vez de linhas de texto, os dados são organizados em **frames**, num formato binário.

No HTTP/2, as informações da linha de requisição aparecem como pseudo-cabeçalhos: campos especiais que começam com `:`. O bloco abaixo é uma representação legível para estudo, não os bytes transmitidos na rede:

```http
:method: GET
:scheme: https
:authority: api.loja.com
:path: /produtos/42
accept: application/json
user-agent: Mozilla/5.0
```

A principal mudança é a **multiplexação**: várias requisições e respostas podem avançar ao mesmo tempo, intercaladas em uma única conexão TCP. Assim, uma resposta lenta não precisa impedir que outra resposta completa seja entregue primeiro na camada HTTP.

O HTTP/2 também comprime os cabeçalhos com **HPACK**. Como muitos cabeçalhos se repetem entre requisições — por exemplo, `User-Agent` e, quando aplicável, `Cookie` — a compressão evita reenviar todos os mesmos dados integralmente a cada vez.

Ainda existe uma limitação: o HTTP/2 usa TCP, que entrega os bytes em ordem. Se um segmento TCP se perde, o TCP precisa recuperá-lo antes de entregar os dados seguintes à aplicação. Isso pode atrasar todos os fluxos HTTP/2 naquela conexão, mesmo que a perda diga respeito aos dados de apenas um deles. É o **head-of-line blocking na camada de transporte**.

## HTTP/3: QUIC sobre UDP

O HTTP/3, padronizado em 2022, usa o **QUIC** em vez do TCP. O QUIC é um protocolo de transporte que funciona sobre UDP e oferece fluxos independentes. Se dados de um fluxo se perdem, a recuperação atrasa esse fluxo, mas os outros podem continuar avançando.

O QUIC também integra o estabelecimento de segurança TLS à conexão. Isso pode reduzir o tempo necessário para começar a trocar dados, especialmente quando há uma conexão nova. A negociação e o ganho real dependem da rede e da situação da conexão.

| Versão | Formato das mensagens | Transporte | Característica marcante |
|---|---|---|---|
| **HTTP/1.1** | Texto | TCP; normalmente uma requisição por vez em cada conexão | Formato legível e amplamente compatível |
| **HTTP/2** | Binário, em frames | TCP, com multiplexação na camada HTTP | Vários fluxos compartilham uma conexão |
| **HTTP/3** | Binário, em frames | QUIC sobre UDP | Perda em um fluxo não bloqueia a entrega nos demais fluxos |

## Quem escolhe a versão?

Em geral, a aplicação não precisa escolher uma versão para cada pedido. Cliente e servidor negociam qual protocolo usar durante o estabelecimento da conexão, conforme o suporte de ambos e as condições da rede. Ferramentas de desenvolvimento, como a aba Network do navegador, mostram qual versão foi usada.

As versões mudam a eficiência e o transporte da conversa. Os conceitos de método, caminho, status, cabeçalhos e corpo continuam sendo a base para entender o que cliente e servidor estão dizendo.

> [!tip] Para guardar
> - **HTTP/1.1** transmite mensagens em texto e reutiliza conexões TCP.
> - **HTTP/2** usa frames binários, multiplexa fluxos numa conexão TCP e comprime cabeçalhos com HPACK.
> - **HTTP/3** usa QUIC sobre UDP; a perda de dados num fluxo não impede os demais de avançar.
> - Método, caminho, status, cabeçalhos e corpo continuam presentes nas três versões.

