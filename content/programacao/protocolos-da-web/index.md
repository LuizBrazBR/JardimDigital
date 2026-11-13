---
title: Protocolos da Web
cssclasses:
  - sem-listagem
---

Resumos das aulas do curso de Protocolos da Web, a trilha que veio depois da [[programacao/logica-de-programacao/index|Lógica de Programação]] no caminho para o back-end. O curso é sobre como os programas conversam pela internet: o HTTP, os seus pedidos e respostas, os formatos de dados e o desenho de uma API. Os resumos estão divididos em módulos, como no curso.

## [[programacao/protocolos-da-web/modulo-1/index|Módulo 1 – Como a web funciona: cliente e servidor]]

1. [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|Cliente e servidor: o modelo por trás da web]]
2. [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|O que acontece quando você digita uma URL e aperta Enter]]
3. [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|O papel do navegador e do servidor]]
4. [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|Endereços na internet: IP, DNS e porta]]
5. [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|O que é um back-end e o que ele faz]]

## Módulo 2 – HTTP por dentro

1. A anatomia de uma requisição HTTP
2. A anatomia de uma resposta HTTP
3. HTTP não tem memória: o que significa ser stateless
4. As versões do HTTP: 1.1, 2 e 3
5. HTTP vs HTTPS: por que o TLS importa

## Módulo 3 – Métodos HTTP

1. GET: o método para ler dados
2. POST: o método para criar recursos
3. PUT e PATCH: atualização total e parcial
4. DELETE, HEAD e OPTIONS: remover e consultar
5. Métodos seguros, idempotentes e erros comuns de semântica

## Módulo 4 – Status codes

1. As classes de status code: 1xx a 5xx
2. 2xx: a requisição deu certo
3. 3xx: redirecionamentos
4. 4xx: o erro é do cliente
5. 5xx e a escolha do status certo

## Módulo 5 – Headers, cookies e negociação de conteúdo

1. Headers: o que são e para que servem
2. Content-Type e Accept: a negociação de conteúdo
3. Cache: Cache-Control, ETag e o 304
4. Authorization: Bearer e Basic
5. Cookies, sessão e uma introdução a CORS

## Módulo 6 – JSON e formatos de dados

1. A sintaxe do JSON: tipos, objetos e arrays
2. Aninhamento e estruturas de dados complexas
3. Serialização e desserialização: do objeto ao texto e de volta
4. Por que o JSON virou o padrão das APIs
5. Alternativas ao JSON e o papel do Content-Type

## Módulo 7 – REST e design de APIs

1. REST: recursos e os princípios por trás de uma boa API
2. Modelando URLs: recursos, hierarquia e o fim dos verbos
3. CRUD na prática: ação, método, URL e status certos
4. Versionamento, paginação e filtros
5. Erros consistentes e o que faz uma API bem desenhada
