---
title: CRLF
---

> [!abstract] Definição
> **O par de caracteres invisíveis que termina cada linha de uma mensagem HTTP/1.1: o CR, `\r`, e o LF, `\n`.** A linha em branco que separa os [[glossario/cabecalho|cabeçalhos]] do [[glossario/corpo|corpo]] é um CRLF logo depois de outro: `\r\n\r\n`.

O Windows costuma terminar as linhas dos arquivos de texto com CRLF; o Linux e o Mac, só com LF. O VS Code mostra qual é, no canto de baixo, à direita. Num texto do JavaScript, `"\r\n"` escreve os dois caracteres. Ver a aula [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|2.1 A anatomia de uma requisição HTTP]].

## De onde vem a palavra

Iniciais do inglês *carriage return*, "retorno do carro", e *line feed*, "avanço de linha". Na máquina de escrever, eram os dois movimentos no fim de cada linha: o carro, a peça que segura o papel, voltava para a esquerda, e o rolo subia o papel uma linha. Os computadores herdaram os dois como caracteres.

Fontes: IETF: [RFC 9112, HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112) · Wiktionary: [carriage return](https://en.wiktionary.org/wiki/carriage_return), [line feed](https://en.wiktionary.org/wiki/line_feed)
