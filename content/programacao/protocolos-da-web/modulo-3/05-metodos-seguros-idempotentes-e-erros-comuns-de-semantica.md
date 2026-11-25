---
title: "3.5 Métodos seguros, idempotentes e erros comuns de semântica"
tags:
  - protocolos-da-web
  - http
---

Na [[programacao/protocolos-da-web/modulo-3/04-delete-head-e-options-remover-e-consultar|aula 3.4]], fechamos a lista dos sete métodos. Duas palavras apareceram várias vezes pelo caminho: "seguro", na [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|aula 3.1]], e "idempotente", na [[programacao/protocolos-da-web/modulo-3/03-put-e-patch-atualizacao-total-e-parcial|aula 3.3]]. Agora vamos defini-las com precisão. Elas não são teoria: navegadores, caches, proxies e bibliotecas HTTP decidem coisas sozinhos, olhando só para elas.

> [!abstract] Definição
> **Um método é *seguro* quando o pedido não solicita nenhuma mudança no servidor. Um método é *idempotente* quando mandar o mesmo pedido várias vezes deixa o servidor no mesmo estado final que mandar uma vez só.**

## Por que essas duas propriedades importam

Pense em tudo o que fica entre o seu código e o servidor, ou que roda do lado do cliente:

- O **navegador** decide se pode repetir um pedido sozinho, como ao recarregar a página.
- Um [[glossario/cache|cache]] ou um [[glossario/proxy|proxy]] decide se pode guardar uma resposta e entregá-la de novo.
- Uma **[[glossario/biblioteca|biblioteca]] HTTP** decide se pode tentar de novo um pedido que falhou. Biblioteca é um conjunto de código pronto, escrito por outras pessoas, que o seu programa usa para não refazer o trabalho. As bibliotecas HTTP montam e enviam os pedidos por você. O `requests`, do Python, e o `axios`, do JavaScript, são exemplos.

Nenhum desses programas lê a documentação da sua API nem entende o que o pedido faz. Eles só enxergam o método. Por isso o HTTP responde, para cada método, a duas perguntas que dão para decidir sem conhecer a API:

| Pergunta | Propriedade |
|---|---|
| Posso mandar esse pedido sem medo de ele mudar alguma coisa? | **Seguro** |
| Se eu mandar de novo, o resultado piora ou se multiplica? | **Idempotente** |

### O que é "semântica" aqui

O título fala em erros de **[[glossario/semantica|semântica]]**. Em palavras simples: **cada método foi feito para um trabalho**. O `GET` foi feito para ler, o `PUT` para substituir, o `DELETE` para remover. Um erro de semântica é **programar um método para fazer outra coisa**, diferente do trabalho para o qual ele foi feito. O exemplo clássico é um `GET` que apaga dados.

Isso é diferente de errar a escrita do pedido. Um `GET` que apaga dados está escrito certinho, o servidor aceita e responde `200`. Nada quebra na hora. O problema aparece depois: os outros programas (navegador, cache, crawler) acreditam que o `GET` só lê e agem em cima disso. É por isso que esses erros são difíceis de notar e perigosos.

## Método seguro

> [!abstract] Definição
> **Um método é seguro quando o pedido não solicita mudança no servidor.** Chamar uma vez ou cem vezes tem o mesmo efeito sobre os dados: nenhum.

Os métodos seguros são o `GET`, o `HEAD` e o `OPTIONS`. Os três só consultam: ler um recurso, ler só o status e os cabeçalhos, descobrir os métodos aceitos.

Duas confusões comuns:

- **"Seguro" não tem a ver com ataques nem com HTTPS.** Quer dizer apenas "não pede para mudar nada". Um `GET` pode trafegar por uma conexão desprotegida e continuar sendo um método seguro.
- **Seguro não quer dizer que não custa nada.** O servidor gasta processamento para responder e anota o acesso num [[glossario/log|log]]. Isso não conta: o cliente não pediu essa anotação e não responde por ela. O que conta é o cliente não pedir uma mudança nos dados. É o mesmo ponto do [[glossario/efeito-colateral|efeito colateral]] da aula 3.1.

> [!example] Olhar a vitrine
> Olhar a vitrine de uma loja uma vez ou cem vezes não muda as mercadorias. Você gasta o seu tempo e talvez o vendedor perceba, mas a loja continua igual. A comparação vai até aqui: na vitrine, o vidro impede que você mexa nas coisas. No HTTP, quem impede um `GET` de mudar dados é o programador do back-end. Nada no protocolo o obriga, e é por isso que o erro mais comum desta aula existe.

> [!info]- E o TRACE?
> A especificação do HTTP lista também o `TRACE` entre os métodos seguros. Ele devolve ao cliente o pedido exatamente como o servidor o recebeu, e serve para diagnosticar o caminho. É raro, então o curso não o usa. Hoje, para diagnosticar, se usa o DevTools, o `curl -v` e os logs do servidor.
>
> Há também um motivo de segurança para ele ter caído em desuso. Como o `TRACE` devolve o pedido inteiro, um site malicioso podia usá-lo para ler cabeçalhos sensíveis, como cookies, que o JavaScript normalmente não consegue ler. Esse ataque se chama *Cross-Site Tracing*. Por isso a maioria dos servidores vem com o `TRACE` desativado, e a especificação manda o cliente não enviar cookies nem credenciais num `TRACE`. [RFC 9110, métodos seguros](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1) · [MDN, TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/TRACE)

## Método idempotente

> [!abstract] Definição
> **Um método é idempotente quando mandar o mesmo pedido várias vezes deixa o servidor no mesmo estado final que mandar uma vez.** Repetir não piora nem multiplica o efeito.

"Estado final" é o que o servidor guarda depois do pedido. Compare três pedidos num carrinho de compras que guarda a quantidade de canetas. Em cada linha, o carrinho começa com 1 caneta e não há outras mudanças no meio:

| Pedido | Depois de 1 vez | Depois de 2 vezes | Idempotente? |
|---|---|---|---|
| `PUT /carrinho/caneta` com o corpo `5` ("a quantidade é 5") | 5 canetas | 5 canetas | Sim |
| `POST /carrinho/caneta` ("some mais uma") | 2 canetas | 3 canetas | Não |
| `DELETE /carrinho/caneta` | sem canetas | sem canetas | Sim |

O `PUT` diz **como o recurso deve ficar**, então repetir só grava a mesma coisa de novo. O `POST` desse exemplo diz **o que fazer a partir do que já existe**, então cada envio soma mais um. O `DELETE` leva ao mesmo ponto final: depois da primeira vez, o item já foi removido, e a segunda vez não tem mais o que remover.

> [!example] Ir ao canal 5, ou passar para o próximo canal
> No controle da TV, digitar "5" leva ao canal 5. Digitar de novo continua no canal 5: é idempotente. A tecla "próximo canal" é diferente. Cada aperto leva a um canal novo. A comparação vai até aqui: no HTTP, idempotente não é sobre a TV ficar parada. É sobre o **efeito pedido** ser o mesmo. O servidor ainda pode anotar cada tentativa no log, e a resposta pode ser diferente.

### Idempotente não quer dizer "a resposta é igual"

A palavra descreve o **efeito no servidor**, não o texto da resposta. O `DELETE` da tabela acima responde `204` na primeira vez e `404 Not Found` na segunda, porque o item já tinha sumido. O estado final é igual, e por isso o método é idempotente. O `PUT` do mesmo jeito: pode responder `201 Created` na primeira vez (criou) e `200 OK` nas seguintes (substituiu), como a aula 3.3 antecipou. [RFC 9110, métodos idempotentes](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)

## Como as duas propriedades se relacionam

- **Todo método seguro também é idempotente.** Se o pedido não muda nada, mandá-lo uma vez ou cem dá o mesmo estado final: o mesmo de antes.
- **Nem todo método idempotente é seguro.** O `PUT` e o `DELETE` mudam o servidor, então não são seguros. Mas repetir não muda o resultado final, então são idempotentes.

| Método | Seguro | Idempotente | Corpo no pedido | Uso típico |
|---|---|---|---|---|
| `GET` | Sim | Sim | Não | Ler um recurso |
| `HEAD` | Sim | Sim | Não | Ler só os cabeçalhos de um recurso |
| `OPTIONS` | Sim | Sim | Em geral, não | Descobrir os métodos aceitos |
| `PUT` | Não | Sim | Sim | Substituir um recurso inteiro |
| `DELETE` | Não | Sim | Normalmente não | Remover um recurso |
| `PATCH` | Não | Depende | Sim | Alterar parte de um recurso |
| `POST` | Não | Em geral, não | Sim | Criar um recurso ou disparar uma ação |

O `PATCH` fica no meio do caminho porque a idempotência depende da instrução. O JSON Merge Patch da aula 3.3, com `{"estoque":12}`, grava o mesmo valor a cada envio e é idempotente. Uma instrução do tipo "adicione duas unidades" não é. O `POST` também pode ser idempotente em casos específicos, mas o HTTP não promete isso: quem desenhou a API é quem sabe.

## Quem aproveita cada propriedade

| Programa | O que faz com a propriedade |
|---|---|
| Navegador | Recarrega uma página vinda de `GET` sem perguntar. Se ela veio de um `POST`, pergunta antes (aula 3.1). |
| Cache e proxy | Guardam respostas de `GET`, que é seguro, e entregam a cópia sem perguntar ao servidor. |
| [[glossario/crawler\|Crawler]], [[glossario/prefetch\|prefetch]] e [[glossario/extensao-de-navegador\|extensões de navegador]] | Seguem links com `GET`, sem uma pessoa clicando. Uma extensão de navegador é um programa que a pessoa instala no navegador para ganhar funções extras. Algumas leem os links da página para pré-visualizá-los ou checar os que estão quebrados. |
| Biblioteca HTTP | Repete sozinha os pedidos idempotentes quando a conexão falha. |

### O caso do retry: a conexão que cai

Repetir um pedido por conta própria se chama [[glossario/retry|retry]], "nova tentativa". Veja por que ele só é seguro para métodos idempotentes:

1. O cliente envia `PUT /produtos/8` com estoque 12.
2. O servidor recebe, grava e começa a responder.
3. A conexão cai antes de a resposta chegar. O cliente fica sem saber se o pedido foi aplicado.
4. O cliente reenvia o mesmo pedido.

Se for um `PUT`, o segundo envio grava o estoque 12 de novo. O estado final é o mesmo, então não há nada a temer. Agora troque o pedido por `POST /pedidos`: se o primeiro já tinha criado o pedido, o segundo cria **outro**. E num `POST /pagamentos`, a pessoa é cobrada duas vezes.

Por isso a especificação diz que o cliente não deve repetir sozinho um pedido de método não idempotente, a menos que saiba que aquele pedido específico é idempotente. [RFC 9110, métodos idempotentes](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)

> [!info]- E se eu precisar repetir um POST com segurança?
> Algumas APIs, como as de pagamento, aceitam um cabeçalho com um código único por operação, geralmente chamado `Idempotency-Key`. Se o mesmo pedido chegar duas vezes com o mesmo código, o servidor executa uma vez só e devolve o mesmo resultado na segunda. Isso não é regra do HTTP: é uma convenção de cada API. Existe uma proposta da IETF em andamento para padronizá-la. [IETF, Idempotency-Key](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/)

## Erros comuns de semântica

### 1. Usar GET para alterar dados

É o erro mais clássico: um endereço como `GET /produtos/42/excluir` ou `GET /carrinho/limpar`.

```http
GET /api/carrinho/limpar HTTP/1.1
Host: loja.exemplo.com
```

Como o `GET` promete não mudar nada, crawlers, extensões de navegador e proxies podem disparar essa chamada sem nenhuma intenção de causar dano, e o carrinho do usuário é esvaziado sem ele fazer nada. A aula 3.1 mostrou esse caminho com um crawler que apaga um usuário. Quem responde por isso é quem escreveu o back-end, não quem fez o pedido.

O jeito certo é usar um método que diga que há mudança:

```http
POST /api/carrinho/limpar HTTP/1.1
Host: loja.exemplo.com
Content-Length: 0
```

```http
HTTP/1.1 204 No Content
```

O `Content-Length: 0` diz que o corpo tem 0 bytes: aqui o pedido não leva dados, só a ação. Ainda melhor é tratar o carrinho como um recurso que pode ser removido:

```http
DELETE /api/carrinho HTTP/1.1
Host: loja.exemplo.com
```

```http
HTTP/1.1 204 No Content
```

Repare que, nas duas versões, crawlers e pré-carregamento não alcançam a ação, porque eles só mandam `GET`.

### 2. Usar POST para tudo

Se todo pedido, inclusive uma leitura simples, vira `POST`, você perde o que o `GET` dava: o cache guardar a resposta, o navegador repetir o pedido sozinho e a busca poder ser salva ou compartilhada como link, porque os filtros ficam escondidos no corpo. A regra da aula 3.1 continua valendo: `GET` quando os dados cabem na URL, e `POST` só quando não cabem.

### 3. Confundir PUT com PATCH

Os dois erros são parentes:

- **Mandar um objeto parcial num `PUT`.** Numa API que substitui o recurso, um perfil que era `{"nome":"Ana","email":"ana@exemplo.com"}` e recebe um `PUT` com `{"nome":"Ana Costa"}` pode ficar sem o `email`. O `PUT` descreve a ficha **inteira**.
- **Implementar um `PATCH` que se comporta como `PUT`.** Se o `PATCH` da sua API exige a ficha completa para funcionar, ele perdeu a razão de existir, que é mudar só uma parte.

### 4. Não repetir PUT e DELETE por precaução

Alguns clientes evitam o retry automático em todos os métodos "para não arriscar". Com `PUT` e `DELETE` isso é cautela demais, porque eles foram desenhados justamente para aguentar a repetição. Dois cuidados:

- Num retry de `DELETE`, um `404` na segunda tentativa costuma querer dizer que a primeira funcionou e o recurso já saiu. O objetivo foi atingido.
- Se o item **nunca** existiu, o `404` também aparece. Para saber qual dos dois casos é, o cliente precisa lembrar se já tinha enviado a primeira tentativa.

## Veja com os próprios olhos

Vamos fazer um servidor de carrinho para ver as diferenças acontecerem. Crie `carrinho.js`:

```js
const http = require("node:http");

const carrinho = { caneta: 1 };

const servidor = http.createServer(async (requisicao, resposta) => {
  let corpo = "";
  for await (const pedaco of requisicao) {
    corpo += pedaco;
  }

  const rota = `${requisicao.method} ${requisicao.url}`;
  let status = 404;
  let texto = "";

  if (rota === "GET /carrinho") {
    status = 200;
    texto = JSON.stringify(carrinho);
  } else if (rota === "GET /carrinho/limpar") {
    delete carrinho.caneta;
    status = 200;
    texto = JSON.stringify(carrinho);
  } else if (rota === "PUT /carrinho/caneta") {
    carrinho.caneta = Number(corpo);
    status = 200;
    texto = JSON.stringify(carrinho);
  } else if (rota === "POST /carrinho/caneta") {
    carrinho.caneta = (carrinho.caneta ?? 0) + 1;
    status = 200;
    texto = JSON.stringify(carrinho);
  } else if (rota === "DELETE /carrinho/caneta") {
    if ("caneta" in carrinho) {
      delete carrinho.caneta;
      status = 204;
    }
  }

  resposta.writeHead(status, { "Content-Type": "application/json" });
  resposta.end(texto);
});

servidor.listen(3000, () => console.log("Servidor em http://localhost:3000"));
```

A rota `GET /carrinho/limpar` está ali de propósito, para mostrar o erro 1. Não faça isso numa API de verdade. Como ler o código, uma peça por vez:

| Trecho | O que faz |
|---|---|
| `const carrinho = { caneta: 1 };` | É a memória do servidor, o seu [[glossario/estado\|estado]]: um objeto com a quantidade de cada item. Começa com 1 caneta. Se você parar o servidor, o carrinho volta a esse valor. |
| `async (requisicao, resposta) => { ... }` | A função que o `http` roda a cada pedido. O `async` na frente permite usar `await` dentro dela. |
| `for await (const pedaco of requisicao) { corpo += pedaco; }` | O corpo de um pedido chega aos pedaços. O `for await` espera cada pedaço chegar e o cola no texto `corpo`. Num pedido sem corpo, como o `GET`, `corpo` continua `""`. |
| `` `${requisicao.method} ${requisicao.url}` `` | Uma [[glossario/template-string\|template string]] que junta o método e o caminho, como `PUT /carrinho/caneta`. As rotas abaixo comparam com esse texto. |
| `let status = 404; let texto = "";` | Valores iniciais. Se nenhuma rota combinar, a resposta é `404` e sem corpo. |
| `Number(corpo)` | O corpo chega como texto (`"5"`). O `Number` o converte no número `5`, como na aula 3.1. |
| `(carrinho.caneta ?? 0) + 1` | O `??` usa o valor da direita (`0`) quando o da esquerda não existe. Se o carrinho não tem caneta, a conta é `0 + 1`, e se tem, soma 1 à quantidade. |
| `"caneta" in carrinho` | Dá `true` se o objeto tem a chave `caneta`. Serve para o `DELETE` saber se há o que remover. |
| `delete carrinho.caneta` | O `delete` do JavaScript remove a chave do objeto. Só divide o nome com o método HTTP `DELETE`. |
| `resposta.writeHead(status, {...})` e `resposta.end(texto)` | Enviam o status e o cabeçalho, e depois o corpo. No `204`, o texto é vazio. |

Rode `node carrinho.js`. Em **outro** terminal do PowerShell, prepare o texto que o `curl.exe` mostrará no fim de cada resposta:

```powershell
$final = "`n[status %{http_code}]"
```

O `-w` do curl imprime esse texto depois da resposta, e o `%{http_code}` vira o status. O `-s` esconde a barra de progresso. Primeiro o `PUT` duas vezes:

```powershell
curl.exe -s -w $final -X PUT -d 5 http://localhost:3000/carrinho/caneta
curl.exe -s -w $final -X PUT -d 5 http://localhost:3000/carrinho/caneta
```

O `-d 5` manda o corpo `5`. Este servidor não olha o `Content-Type`, mas uma API de verdade olharia (assunto do módulo 5).

```text
{"caneta":5}
[status 200]
{"caneta":5}
[status 200]
```

Mesma coisa nas duas vezes: idempotente. Agora o `POST`, que soma:

```powershell
curl.exe -s -w $final -X POST http://localhost:3000/carrinho/caneta
curl.exe -s -w $final -X POST http://localhost:3000/carrinho/caneta
```

```text
{"caneta":6}
[status 200]
{"caneta":7}
[status 200]
```

Cada envio mudou o resultado: não é idempotente. Agora o `DELETE` duas vezes e a conferência:

```powershell
curl.exe -s -w $final -X DELETE http://localhost:3000/carrinho/caneta
curl.exe -s -w $final -X DELETE http://localhost:3000/carrinho/caneta
curl.exe -s -w $final http://localhost:3000/carrinho
```

```text
[status 204]
[status 404]
{}
[status 200]
```

(Nos `204` e `404` não há corpo, então o PowerShell mostra só o status, depois de uma linha em branco.) As **respostas** foram diferentes, `204` e depois `404`, mas o **estado final** foi o mesmo: o carrinho ficou `{}` em ambos. É o que significa "idempotente".

Por fim, o erro 1. Ponha uma caneta de volta e depois "visite o link", como um crawler faria:

```powershell
curl.exe -s -w $final -X PUT -d 3 http://localhost:3000/carrinho/caneta
curl.exe -s -w $final http://localhost:3000/carrinho/limpar
curl.exe -s -w $final http://localhost:3000/carrinho
```

```text
{"caneta":3}
[status 200]
{}
[status 200]
{}
[status 200]
```

Um simples `GET` esvaziou o carrinho. Ninguém "clicou em limpar". Quem seguiu o link nem sabia o que ele fazia. Pare o servidor com **Ctrl+C**.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Seguro e idempotente
> Para cada pedido, diga se o método é seguro e se é idempotente. a) `DELETE /api/tarefas/9`. b) `POST /api/pedidos`, que cria um pedido novo a cada envio. c) `HEAD /arquivos/a.txt`. d) `PUT /perfis/4`, mandando a mesma ficha completa duas vezes.
>
> > [!success]- Resposta
> > a) Não é seguro, porque remove a tarefa. É idempotente: depois da primeira vez ela já não existe, e repetir não muda isso. b) Não é seguro, nem idempotente: cada envio pode criar outro pedido. c) É seguro e idempotente: só consulta. d) Não é seguro, porque grava. É idempotente: gravar a mesma ficha de novo deixa o estado igual.

> [!question] 2. A conexão caiu
> Seu programa enviou `PUT /produtos/8` com estoque 12 e a conexão caiu antes da resposta. Ele pode reenviar sozinho? E se o pedido fosse `POST /pagamentos`?
>
> > [!success]- Resposta
> > O `PUT` pode ser reenviado: se o primeiro já tinha gravado, o segundo grava o mesmo estoque 12, e o estado final é o mesmo. O `POST /pagamentos` não deve ser reenviado sozinho: se o primeiro já tinha cobrado, o segundo cobra de novo. Só dá para repetir se a API tiver um mecanismo próprio, como um código de idempotência, ou se o cliente conferir antes o que aconteceu.

> [!question] 3. Corrigir o endereço
> Uma API publica um texto com `GET /api/posts/10/publicar`. O que há de errado? Escreva duas alternativas.
>
> > [!success]- Resposta
> > Uma ação que muda dados está num método seguro. Um crawler ou um pré-carregamento pode publicar o texto sem ninguém pedir. Alternativas: `POST /api/posts/10/publicar`, tratando como uma ação, ou `PATCH /api/posts/10` com `{"publicado":true}`, se a API aceitar JSON Merge Patch. A segunda ainda é idempotente, porque grava sempre o mesmo valor.

> [!question] 4. O 404 do segundo DELETE
> Você enviou `DELETE /api/favoritos/8` e recebeu `204`. Sem saber, o programa repetiu o pedido e recebeu `404`. A remoção falhou?
>
> > [!success]- Resposta
> > Não. O `204` já mostrou que a remoção foi concluída. O `404` do segundo pedido só diz que não havia mais o que remover. O estado final é o mesmo, e é isso que o `DELETE` promete.

> [!question] 5. Duas frases, uma conclusão
> Explique com as suas palavras por que todo método seguro é idempotente, mas o `PUT` é idempotente sem ser seguro.
>
> > [!success]- Resposta
> > Um método seguro não muda nada, então repetir o pedido deixa tudo como estava, e isso é idempotência. O `PUT` muda o servidor (grava a versão enviada), então não é seguro. Mas gravar a mesma versão de novo deixa o estado igual, então é idempotente.

> [!question] 6. Buscar com POST
> Um painel mostra uma lista de produtos filtrada por categoria, e a busca é enviada com `POST /api/produtos/buscar`, com a categoria no corpo. São poucos filtros, curtos. O que o painel perde e o que seria melhor?
>
> > [!success]- Resposta
> > Perde o cache da resposta, o repetir automático e o link da busca, que não poderia ser salvo nem compartilhado. Seria melhor `GET /api/produtos?categoria=eletronicos`, porque os dados cabem na URL.

## De onde vêm as palavras

- **[[glossario/metodo-seguro|Seguro]]**: do latim *sēcūrus*, de *sē-*, "sem", e *cūra*, "preocupação": sem preocupação, um pedido que se pode mandar sem medo.
- **[[glossario/idempotencia|Idempotente]]**: do latim *idem*, "o mesmo", e *potens*, "que tem poder": o que tem o mesmo poder, ou efeito, ao ser repetido. Vem da matemática.
- **[[glossario/semantica|Semântica]]**: do grego *sēmantikós*, "que dá sinais, significativo", de *sēmaínō*, "indicar". O estudo do significado.
- **[[glossario/retry|Retry]]**: do inglês *re-*, "de novo", e *try*, "tentar".
- **[[glossario/biblioteca|Biblioteca]]**: do grego *bibliothḗkē*, de *biblíon*, "livro", e *thḗkē*, "caixa, estojo". Onde se guardam livros, e, em programação, onde se guardam códigos prontos.
- **[[glossario/extensao-de-navegador|Extensão]]**: do latim *extēnsiō*, "o ato de estender": uma parte que amplia o que o navegador consegue fazer.

> [!tip] Para guardar
> - **Seguro** é não pedir mudança no servidor: `GET`, `HEAD` e `OPTIONS`. **Idempotente** é repetir sem piorar: os seguros, mais `PUT` e `DELETE`.
> - Todo seguro é idempotente. Nem todo idempotente é seguro.
> - "Seguro" não é sobre ataques nem HTTPS. E "idempotente" é sobre o **estado final**, não sobre a resposta ser igual: um `DELETE` repetido pode dar `204` e depois `404`.
> - O `POST`, em geral, não é idempotente. O `PATCH` depende da instrução.
> - Programas que ninguém vê (navegador, cache, proxy, crawler, biblioteca HTTP) confiam nessas duas promessas. Usar um método para outro trabalho que não o dele é o erro de semântica.
> - Os erros mais comuns: `GET` que altera dados, `POST` para tudo, `PUT` com corpo parcial, `PATCH` que age como `PUT`, e evitar o retry em `PUT` e `DELETE`.
> - Só repita sozinho um pedido idempotente. Com `POST`, só se a API tiver um código de idempotência.

Fontes: IETF: [RFC 9110, 9.2.1: Safe Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1), [9.2.2: Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2), [Idempotency-Key](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) · MDN: [Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP), [Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) · curl: [Manual, --write-out](https://curl.se/docs/manpage.html#-w) · Wiktionary: [semantic](https://en.wiktionary.org/wiki/semantic), [σημαντικός](https://en.wiktionary.org/wiki/%CF%83%CE%B7%CE%BC%CE%B1%CE%BD%CF%84%CE%B9%CE%BA%CF%8C%CF%82), [retry](https://en.wiktionary.org/wiki/retry), [try](https://en.wiktionary.org/wiki/try), [βιβλιοθήκη](https://en.wiktionary.org/wiki/%CE%B2%CE%B9%CE%B2%CE%BB%CE%B9%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7), [extensão](https://en.wiktionary.org/wiki/extens%C3%A3o)
