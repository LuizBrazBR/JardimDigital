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

Em geral, o navegador envia uma requisição e espera sua resposta antes de enviar a próxima pela mesma conexão. O HTTP/1.1 também define *pipelining*, que permite enviar várias requisições sem esperar cada resposta, mas o suporte foi limitado: as respostas precisam chegar na ordem das requisições. Se uma resposta demora, as seguintes ficam bloqueadas atrás dela. Esse atraso é chamado de **[[glossario/head-of-line-blocking|head-of-line blocking]]** (bloqueio de fila) na camada HTTP.

Para contornar a espera, os navegadores costumam abrir várias conexões TCP com o mesmo servidor. Isso permite avançar em mais de uma transferência, mas cada conexão tem custos de estabelecimento e recursos próprios.

> [!example] Duas encomendas, uma fila
> Um caminhão leva duas encomendas para o mesmo endereço. A primeira é um sofá que demora para descarregar; a segunda é uma carta. Se a regra exige descarregar na ordem em que foram carregadas, a carta espera junto com o sofá. No HTTP/1.1, a resposta de uma requisição pode segurar as respostas seguintes na mesma conexão. Abrir conexões paralelas equivale a mandar outro caminhão.

## HTTP/2: binário e multiplexado

O HTTP/2, padronizado em 2015, mantém a semântica do HTTP: métodos, status, cabeçalhos e corpos continuam com o mesmo sentido. A diferença é a forma de transmissão. Em vez de linhas de texto, os dados são organizados em **[[glossario/frame|frames]]**, num formato binário.

No HTTP/2, as informações da linha de requisição aparecem como pseudo-cabeçalhos: campos especiais que começam com `:`. O bloco abaixo é uma representação legível para estudo, não os bytes transmitidos na rede:

```http
:method: GET
:scheme: https
:authority: api.loja.com
:path: /produtos/42
accept: application/json
user-agent: Mozilla/5.0
```

A principal mudança é a **[[glossario/multiplexacao|multiplexação]]**: várias requisições e respostas podem avançar ao mesmo tempo, intercaladas em uma única conexão TCP. Assim, uma resposta lenta não precisa impedir que outra resposta completa seja entregue primeiro na camada HTTP.

Imagine que o navegador peça uma imagem grande e, logo depois, um ícone pequeno. O servidor pode enviar partes dos dois fluxos intercaladas. Se o ícone terminar primeiro, o navegador pode recebê-lo sem esperar a imagem inteira. Isso não torna a rede mais rápida por mágica; evita que uma resposta demorada obrigue todas as outras a esperar na camada HTTP.

O HTTP/2 também comprime os cabeçalhos com **[[glossario/hpack|HPACK]]**. Como muitos cabeçalhos se repetem entre requisições — por exemplo, `User-Agent` e, quando aplicável, `Cookie` — a compressão evita reenviar todos os mesmos dados integralmente a cada vez.

Ainda existe uma limitação: o HTTP/2 usa TCP, que entrega os bytes em ordem. Se um segmento TCP se perde, o TCP precisa recuperá-lo antes de entregar os dados seguintes à aplicação. Isso pode atrasar todos os fluxos HTTP/2 naquela conexão, mesmo que a perda diga respeito aos dados de apenas um deles. É o **[[glossario/head-of-line-blocking|head-of-line blocking]] na camada de transporte**.

## HTTP/3: QUIC sobre UDP

O HTTP/3, padronizado em 2022, usa o **[[glossario/quic|QUIC]]** em vez do [[glossario/tcp|TCP]]. O QUIC é um protocolo de transporte que funciona sobre [[glossario/udp|UDP]] e oferece fluxos independentes. Se dados de um fluxo se perdem, a recuperação atrasa esse fluxo, mas os outros podem continuar avançando.

O QUIC também integra o estabelecimento de segurança TLS à conexão. Isso pode reduzir o tempo necessário para começar a trocar dados, especialmente quando há uma conexão nova. A negociação e o ganho real dependem da rede e da situação da conexão.

| Versão | Formato das mensagens | Transporte | Característica marcante |
|---|---|---|---|
| **HTTP/1.1** | Texto | TCP; normalmente uma requisição por vez em cada conexão | Formato legível e amplamente compatível |
| **HTTP/2** | Binário, em frames | TCP, com multiplexação na camada HTTP | Vários fluxos compartilham uma conexão |
| **HTTP/3** | Binário, em frames | QUIC sobre UDP | Perda em um fluxo não bloqueia a entrega nos demais fluxos |

## Veja a negociação no navegador

Você não precisa decifrar os frames binários para descobrir qual versão foi usada. No Chrome, abra uma página HTTPS, pressione **F12**, escolha **Network / Rede**, recarregue e selecione uma requisição. Na lista, clique com o botão direito no cabeçalho das colunas e habilite **Protocol / Protocolo**, se ainda não aparecer. A coluna pode mostrar `http/1.1`, `h2` (HTTP/2) ou `h3` (HTTP/3).

Compare duas requisições do mesmo site. Se uma conexão já foi aberta, a próxima pode reutilizá-la; por isso, a negociação não precisa acontecer do zero em cada pedido. O protocolo que aparece é resultado do que o cliente e o servidor conseguiram combinar para aquela conexão.

## Treine

> [!question] 1. O ícone atrás da imagem
> Um navegador pede uma imagem grande e depois um ícone pequeno ao mesmo servidor. Em HTTP/1.1, pela mesma conexão e sem pipelining, o que pode acontecer? E o que a multiplexação do HTTP/2 permite?
>
> > [!success]- Resposta
> > No HTTP/1.1, o navegador normalmente espera a resposta da imagem antes de enviar a próxima requisição naquela conexão, ou abre outra conexão. No HTTP/2, pode enviar as duas pela mesma conexão e receber partes das respostas intercaladas; o ícone pode terminar primeiro.

> [!question] 2. Um pacote se perdeu
> Em HTTP/2, um segmento TCP que contém dados de uma resposta se perde. Por que outra resposta da mesma conexão também pode atrasar? O que muda no HTTP/3?
>
> > [!success]- Resposta
> > O TCP precisa recuperar os bytes perdidos antes de entregar os seguintes à aplicação, então os fluxos HTTP/2 daquela conexão podem esperar. No QUIC, os fluxos são independentes: a recuperação de um fluxo não exige que os outros parem.

> [!question] 3. O formato mudou?
> Uma equipe migrou de HTTP/1.1 para HTTP/2. Precisa trocar `GET` por outro método ou redesenhar o corpo JSON da API?
>
> > [!success]- Resposta
> > Não. Mudam o formato de transmissão e os mecanismos de transporte, mas a semântica de método, caminho, status, cabeçalhos e corpo continua.

> [!question] 4. Lendo a coluna Protocol
> No DevTools, a coluna Protocol mostra `h2`. O que isso diz? Significa que você verá os bytes binários como texto na aba Headers?
>
> > [!success]- Resposta
> > `h2` indica que aquela conexão usa HTTP/2. A aba Headers apresenta uma representação organizada para leitura; ela não mostra o fluxo binário literal enviado pela rede.

> [!question] 5. Quem escolheu HTTP/3?
> O código da aplicação não menciona HTTP/3, mas o navegador mostra `h3` no DevTools. Como isso pode acontecer?
>
> > [!success]- Resposta
> > Cliente e servidor negociam o protocolo durante o estabelecimento da conexão, conforme o suporte disponível. A aplicação normalmente trabalha com os conceitos HTTP sem escolher manualmente a versão em cada requisição.

## De onde vêm as palavras

- **Multiplexar** vem do latim *multiplex*, "com muitas partes". Em redes, vários fluxos compartilham um mesmo canal de comunicação.
- **Frame** significa "moldura" ou "quadro" em inglês. No HTTP/2 e no HTTP/3, é uma unidade estruturada que carrega parte da conversa.
- **QUIC** começou como sigla informal do Google, *Quick UDP Internet Connections*. Ao ser padronizado, a IETF decidiu que não é sigla: a RFC 9000 diz que "QUIC é um nome, não uma sigla".

