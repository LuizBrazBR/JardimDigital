---
title: "3.4 DELETE, HEAD e OPTIONS: remover e consultar"
tags:
  - protocolos-da-web
  - http
---

Na [[programacao/protocolos-da-web/modulo-3/03-put-e-patch-atualizacao-total-e-parcial|aula 3.3]], usamos `PUT` e `PATCH` para atualizar o usuário 107. Agora vamos remover esse cadastro e aprender dois tipos de consulta. Pense em duas perguntas diferentes sobre um arquivo: «Qual é o tamanho dele?» e «Quais pedidos este endereço aceita?».

> [!abstract] Definição
> **[[glossario/delete|DELETE]] pede a remoção de um recurso do seu endereço. [[glossario/head|HEAD]] pede o status e os cabeçalhos de uma consulta sem baixar o corpo. [[glossario/options|OPTIONS]] pede informações sobre as operações disponíveis.**

## DELETE para remover um recurso

Na nossa [[glossario/api|API]], `/api/usuarios/107` é o endereço do [[glossario/recurso|recurso]] que queremos remover. O servidor identifica o cadastro pela [[glossario/url|URL]], então o exemplo envia a [[glossario/requisicao|requisição]] sem [[glossario/corpo|corpo]].

```http
DELETE /api/usuarios/107 HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer exemplo-credencial-107
```

A primeira linha pede a remoção do usuário 107. O [[glossario/cabecalho|cabeçalho]] `Host` identifica o servidor. Em `Authorization`, `Bearer` indica o modo de apresentar a credencial e `exemplo-credencial-107` representa o [[glossario/token|token]] que a API verificaria para decidir se o cliente tem permissão para remover o cadastro. Esse valor é ilustrativo. A [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|aula 3.1]] já mostrou um pedido com esse cabeçalho.

```http
HTTP/1.1 204 No Content
Date: Tue, 03 Feb 2026 15:00:00 GMT
```

O [[glossario/codigo-de-status|status]] `204 No Content` indica que a remoção foi concluída e que a [[glossario/resposta|resposta]] termina após os cabeçalhos. Se o servidor aceitar o trabalho para mais tarde, pode responder `202 Accepted`. Se concluir e enviar um corpo explicando o resultado, pode responder `200 OK`. [RFC 9110, DELETE](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.5)

> [!info]- O que acontece com os dados no servidor?
> O HTTP descreve a remoção do recurso do endereço. O servidor pode apagar os dados ou, por exemplo, arquivar o cadastro e deixar de disponibilizá-lo ali. Um `GET` posterior nesse endereço pode retornar `404 Not Found`. O HTTP também deixa o corpo do pedido `DELETE` sem um significado geral. Use um corpo apenas quando o servidor indicar que o aceita e documentar como o interpreta.

## HEAD para consultar o arquivo sem baixá-lo

Na [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|aula 2.1]], os [[glossario/metadados|metadados]] eram as informações escritas do lado de fora da caixa. Aqui, os cabeçalhos dizem o formato, o tamanho e a data da versão do arquivo que um `GET` entregaria. Isso ajuda quando você quer conferir se o endereço responde ou decidir se vale baixar o arquivo.

> [!abstract] O HEAD é um GET sem o corpo
> **O `HEAD` pergunta ao servidor o que um `GET` naquele mesmo endereço responderia, e o servidor devolve só a linha de status e os cabeçalhos.** Você não escolhe outro método para ele imitar: ele espelha sempre o `GET`.

Isso tem três consequências:

| Pergunta | Resposta |
|---|---|
| Para que serve? | Para ver o que o `GET` entregaria (tipo, tamanho, data) antes de baixar, ou só para saber se o endereço existe e responde (`200`, `404`...). |
| Ele testa `POST`, `PUT` ou `DELETE`? | Não. Ele só diz como o `GET` responderia ali. Para saber quais métodos o endereço aceita, o método é o `OPTIONS`, mais abaixo. |
| Ele muda alguma coisa no servidor? | Não. Assim como o `GET`, ele só consulta. |

```http
HEAD /arquivos/relatorio.txt HTTP/1.1
Host: arquivos.exemplo.com
```

```http
HTTP/1.1 200 OK
Date: Tue, 03 Feb 2026 15:00:00 GMT
Content-Type: text/plain
Content-Length: 13
Last-Modified: Tue, 03 Feb 2026 14:20:00 GMT
```

| Parte da resposta | O que informa |
|---|---|
| `200 OK` | O servidor respondeu com sucesso à consulta. |
| `Date` | A data e a hora da resposta. |
| `Content-Type: text/plain` | O arquivo é texto simples. |
| `Content-Length: 13` | Um `GET` nas mesmas condições teria um corpo de 13 bytes. |
| `Last-Modified` | A data e a hora da última alteração informada pelo servidor. |

O [[glossario/last-modified|cabeçalho Last-Modified]] mostra, neste exemplo, 3 de fevereiro de 2026 às 14h20 no horário de referência indicado por `GMT`. Aqui, o corpo do `GET` seria `Relatorio 107`, sem quebra de linha. São 13 bytes. O `HEAD` envia os cabeçalhos e nenhum desses 13 bytes. Um servidor pode omitir certos cabeçalhos se só conseguir calculá-los ao preparar o corpo. [RFC 9110, HEAD](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.2)

> [!example] Consultar a etiqueta de uma caixa
> No balcão, você pode perguntar quanto pesa a caixa antes de pedir para levá-la. O peso é a informação sobre a caixa, assim como `Content-Length` informa o tamanho do conteúdo. A comparação vai até a etiqueta. No HTTP, o servidor pode deixar o tamanho de fora se precisar montar o conteúdo para descobri-lo.

No PowerShell, você pode experimentar com `curl.exe`. A opção `-I` envia um `HEAD` e mostra primeiro a linha de status, depois os cabeçalhos que o servidor devolveu. Os valores dependem da resposta do site. [Manual do curl](https://curl.se/docs/manpage.html#-I)

```powershell
curl.exe -I https://example.com/
```

## OPTIONS para consultar os métodos disponíveis

Um cliente pode perguntar o que um endereço aceita antes de escolher qual [[glossario/metodo-http|método HTTP]] usar. Neste exemplo, o arquivo aceita leitura e consulta.

```http
OPTIONS /arquivos/relatorio.txt HTTP/1.1
Host: arquivos.exemplo.com
```

```http
HTTP/1.1 204 No Content
Date: Tue, 03 Feb 2026 15:00:00 GMT
Allow: GET, HEAD, OPTIONS
```

O cabeçalho [[glossario/allow|Allow]] anuncia os métodos que o servidor disponibiliza para aquele endereço. A lista do exemplo inclui `GET` para baixar, `HEAD` para consultar o status e os cabeçalhos e `OPTIONS` para perguntar pelas opções. Aqui o servidor enviou `204` e a lista coube nos cabeçalhos. Uma resposta `200 OK` também pode trazer um corpo que descreve as opções. [RFC 9110, OPTIONS](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.7)

### Quando o navegador envia OPTIONS antes de outro pedido

Este é o outro uso do `OPTIONS`: quem o envia, nesse caso, é o próprio navegador, sem você pedir. Para entender por quê, vamos por partes.

**Passo 1: o que é a origem.** A [[glossario/origem-web|origem]] de uma página é o endereço dela sem o caminho, formado por três peças: o esquema (`https`), o nome do servidor e a [[glossario/porta|porta]] (443 é a padrão do HTTPS, por isso não aparece escrita). Duas páginas só têm a mesma origem se as três peças forem iguais.

| Endereço | Origem | Mesma origem do painel? |
|---|---|---|
| `https://painel.exemplo.com/login` | `https` + `painel.exemplo.com` + 443 | (é o próprio painel) |
| `https://painel.exemplo.com/perfil` | `https` + `painel.exemplo.com` + 443 | Sim: só o caminho mudou. |
| `https://api.exemplo.com/usuarios` | `https` + `api.exemplo.com` + 443 | Não: o nome do servidor mudou. |

**Passo 2: por que o navegador se importa.** Uma página pode ter código JavaScript que faz um pedido e usa a resposta, por exemplo para mostrar seus dados na tela. Chamamos isso de "ler a resposta". Agora siga o caminho do [[glossario/cookie|cookie]]:

1. Você faz login no painel, e o navegador guarda o cookie da sua sessão.
2. O navegador anexa esse cookie **sozinho** em todo pedido para `painel.exemplo.com`, não importa qual página mandou o pedido.
3. Você abre, em outra aba, um site malicioso. O código dele faz um pedido para `https://painel.exemplo.com/meus-dados`.
4. O navegador anexa o seu cookie, e o painel responde com os **seus** dados, achando que é você.
5. Aqui entra a regra: o navegador **não entrega essa resposta** ao código do site malicioso. Ele só entrega a respostas de um servidor ao código que veio da **mesma origem** desse servidor.

Então o código que veio de `painel.exemplo.com` lê respostas de `painel.exemplo.com` normalmente, e é assim que o painel funciona. O código de outra origem não lê. A regra trata de quem pode **ler a resposta**, não de abas conversando entre si, e o cache não faz parte dela.

**Passo 3: o problema.** O painel (`painel.exemplo.com`) e a API (`api.exemplo.com`) são do mesmo dono, e o painel precisa conversar com a API. Mas, para o navegador, são origens diferentes, então ele barraria por padrão.

**Passo 4: a solução, o CORS.** [[glossario/cors|CORS]] é o combinado em que o servidor da API avisa o navegador, por cabeçalhos na resposta: "aceito pedidos que vêm do painel". Se o aviso não vier, o navegador não entrega a resposta ao código da página.

**Passo 5: onde entra o OPTIONS.** Um `DELETE` apaga coisas. Esperar a API responder para só então descobrir que ela não aceitava seria tarde demais, porque o apagamento já teria acontecido. Por isso, antes de enviar um pedido assim, o navegador faz uma pergunta que não apaga nada: um `OPTIONS` dizendo "o painel vai mandar um `DELETE`, você aceita?". Essa pergunta é a [[glossario/preflight-cors|consulta prévia, chamada preflight]]. Só se a resposta for "aceito" o navegador envia o `DELETE` de verdade.

> [!example] O porteiro do prédio
> Você mora num prédio (o painel) e quer mandar um entregador (o pedido) ao apartamento de um vizinho de outro prédio (a API). Antes de soltar o entregador, o porteiro (o navegador) liga para o outro prédio e pergunta: "vocês aceitam receber alguém do prédio painel, para fazer uma retirada?". Se disserem sim, ele libera. A comparação vai até aqui: quem decide e barra é o navegador, não a API. A API apenas responde à pergunta; ela não impede nada sozinha.

Veja a pergunta e a resposta de verdade:

```http
OPTIONS /api/usuarios/107 HTTP/1.1
Host: api.exemplo.com
Origin: https://painel.exemplo.com
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: authorization
```

```http
HTTP/1.1 204 No Content
Date: Tue, 03 Feb 2026 15:00:00 GMT
Access-Control-Allow-Origin: https://painel.exemplo.com
Access-Control-Allow-Methods: DELETE
Access-Control-Allow-Headers: Authorization
```

| Cabeçalho | Como ler |
|---|---|
| `Origin` | De onde veio o código que quer enviar o pedido. |
| `Access-Control-Request-Method` | Qual método o navegador pretende enviar depois. |
| `Access-Control-Request-Headers` | Quais cabeçalhos da aplicação precisam de permissão. Aqui, o navegador lista o nome `authorization`. |
| `Access-Control-Allow-Origin` | Qual origem a API aceita para esse acesso. |
| `Access-Control-Allow-Methods` | Quais métodos a API aceita nessa checagem. |
| `Access-Control-Allow-Headers` | Quais cabeçalhos a API aceita nessa checagem. Os nomes de cabeçalhos HTTP aceitam maiúsculas e minúsculas. |

Na consulta prévia, o navegador envia o nome `authorization`. O valor do token vai no pedido `DELETE` separado, depois que o navegador aprova a resposta da consulta. A API só processa a remoção ao receber esse segundo pedido e verifica a permissão do usuário. O `Allow` comum anuncia os métodos do recurso. O navegador verifica CORS pelos cabeçalhos `Access-Control-…`. A aula 5.5 volta ao assunto. [WHATWG Fetch, protocolo CORS](https://fetch.spec.whatwg.org/#cors-protocol)

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Confirmar a remoção
> Você enviou `DELETE /api/favoritos/8` e recebeu `204 No Content`. O que a resposta confirma? Onde você encontraria o corpo dela?
>
> > [!success]- Resposta
> > A remoção foi concluída. A resposta termina após os cabeçalhos, pois o status 204 indica ausência de corpo.

> [!question] 2. Conferir o tamanho antes de baixar
> Você quer saber o tamanho de `/arquivos/foto.jpg` sem baixá-la. Qual método usaria? Se a resposta trouxer `Content-Length: 5000`, quantos bytes do arquivo vieram no corpo?
>
> > [!success]- Resposta
> > Use `HEAD /arquivos/foto.jpg`. Nenhum byte do arquivo veio no corpo. O número 5000 indica o tamanho do corpo que um `GET` teria nas mesmas condições.

> [!question] 3. Ler a lista de métodos
> Um `OPTIONS /api/agenda/4` recebe `Allow: GET, HEAD, OPTIONS`. Qual dos métodos anunciados você escolheria para ler os dados da agenda? A consulta com `OPTIONS` já leu esses dados?
>
> > [!success]- Resposta
> > Escolha `GET` para receber os dados. O `OPTIONS` consultou os métodos disponíveis.

> [!question] 4. Distinguir a consulta da remoção
> O navegador enviou `OPTIONS /api/tarefas/9` com `Access-Control-Request-Method: DELETE` e recebeu a permissão de CORS. Qual pedido ainda precisa chegar à API para que ela avalie a remoção?
>
> > [!success]- Resposta
> > `DELETE /api/tarefas/9`. O `OPTIONS` foi a consulta prévia.

> [!tip] Para guardar
> Use `DELETE` para pedir a remoção, `HEAD` para consultar a resposta que um `GET` teria sem baixar seu corpo e `OPTIONS` para perguntar pelas opções. Em um preflight, o navegador consulta as permissões de CORS antes de enviar o pedido que motivou a consulta.
