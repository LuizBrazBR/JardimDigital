---
title: "3.3 PUT e PATCH: atualização total e parcial"
tags:
  - protocolos-da-web
  - http
---

Na [[programacao/protocolos-da-web/modulo-3/02-post-o-metodo-para-criar-recursos|aula 3.2]], enviamos um `POST /api/usuarios` para criar um usuário. O servidor escolheu o número 107 dentro da [[glossario/colecao|coleção]], o conjunto de usuários. Agora que temos o endereço `/api/usuarios/107`, podemos pedir uma alteração naquele usuário específico.

> [!abstract] Definição
> **O [[glossario/put|PUT]] pede para substituir o conteúdo do recurso pela versão enviada. O [[glossario/patch|PATCH]] pede para aplicar mudanças específicas ao conteúdo atual.**

## O que vai no corpo

O usuário 107 é o [[glossario/recurso|recurso]]. O texto em [[glossario/json|JSON]] que descreve seus dados é uma [[glossario/representacao-http|representação]] dele. Cada dado com nome, como `email`, é um [[glossario/campo|campo]]. Em `"ativo": true`, `ativo` é o nome do campo e `true` é seu valor [[glossario/booleano|booleano]], que indica que a conta está ativa.

> [!example] A ficha do balcão
> Na aula 3.2, o atendente criou uma ficha e informou o número. Para atualizar a ficha 107, você pode entregar uma versão completa para substituir a ficha atual ou entregar uma instrução para corrigir um item. A primeira opção se parece com `PUT`. A segunda se parece com `PATCH`.
>
> Um atendente pode interpretar um bilhete livre. Uma API precisa receber o formato que documentou.

## PUT para substituir a versão atual

Imagine que a conta está ativa e Marina quer atualizar o nome. Se o cliente estiver enviando uma ficha completa, inclui também o e-mail e o valor de `ativo` que deseja guardar.

```http
PUT /api/usuarios/107 HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json
Content-Length: 71

{"nome":"Marina Silva Costa","email":"marina@exemplo.com","ativo":true}
```

O método e o [[glossario/caminho|caminho]] dizem para substituir a versão do usuário 107. O [[glossario/cabecalho|cabeçalho]] `Content-Type` diz que o [[glossario/corpo|corpo]] está em JSON. `Content-Length` conta os bytes do corpo em uma linha, sem quebra no fim. O `id` vem do endereço neste exemplo. A API pode reservar alguns dados para o servidor, como o identificador e a data de criação.

O servidor responde `200 OK` e devolve a ficha atualizada, com o identificador no corpo.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 80

{"id":107,"nome":"Marina Silva Costa","email":"marina@exemplo.com","ativo":true}
```

| Campo | Antes | Corpo do PUT | Depois |
|---|---|---|---|
| Nome | Marina Silva | Marina Silva Costa | Marina Silva Costa |
| E-mail | marina@exemplo.com | marina@exemplo.com | marina@exemplo.com |
| Ativo | `true` | `true` | `true` |

Como o corpo descreve a nova versão inteira, omitir um campo opcional pode removê-lo ou aplicar o valor padrão da API. Se o campo for obrigatório, o servidor pode rejeitar o pedido. Confira quais campos a API exige antes de enviar o `PUT`.

> [!info]- E se o endereço ainda estiver vazio?
> Se a API permitir criar naquele endereço, um `PUT /api/usuarios/107` pode criar o usuário 107. Nesse caso, a resposta é `201 Created`. Para um usuário que já existe, uma substituição aceita pode responder `200 OK` com um corpo ou `204 No Content` sem corpo. No `POST` de criação da [[programacao/protocolos-da-web/modulo-3/02-post-o-metodo-para-criar-recursos|aula 3.2]], o cliente apontou a coleção e recebeu do servidor o endereço individual.

## PATCH para aplicar uma mudança

Depois do `PUT`, Marina pode desativar a conta enviando a mudança no campo `ativo`. O exemplo usa [[glossario/json-merge-patch|JSON Merge Patch]], um formato que combina as mudanças enviadas com os dados atuais. O corpo `{"ativo":false}` pede para guardar `false` naquele campo e preservar nome e e-mail. Use o formato aceito pela API.

```http
PATCH /api/usuarios/107 HTTP/1.1
Host: api.exemplo.com
Content-Type: application/merge-patch+json
Content-Length: 15

{"ativo":false}
```

Uma possível resposta do servidor inclui a ficha completa.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 81

{"id":107,"nome":"Marina Silva Costa","email":"marina@exemplo.com","ativo":false}
```

| Campo | Antes | Corpo do PATCH | Depois |
|---|---|---|---|
| Nome | Marina Silva Costa | Omitido | Marina Silva Costa |
| E-mail | marina@exemplo.com | Omitido | marina@exemplo.com |
| Ativo | `true` | `false` | `false` |

### O método e o formato do corpo

| Pedaço da requisição | O que diz ao servidor |
|---|---|
| `PATCH /api/usuarios/107` | Aplique as mudanças ao usuário 107. |
| `Content-Type: application/merge-patch+json` | Leia o corpo pelas regras do JSON Merge Patch. |
| `{"ativo":false}` | Defina o valor de `ativo` como `false`. |

O HTTP define o método `PATCH`. Cada API escolhe quais formatos aceita para descrever as mudanças. O cabeçalho `Content-Type` identifica o formato usado naquele pedido. Outros formatos podem descrever as mudanças como uma lista de instruções. [RFC 5789, método PATCH](https://www.rfc-editor.org/rfc/rfc5789.html#section-2)

### Omitir, zerar ou remover um campo

Imagine um produto com os dados `{"nome":"Caderno","estoque":10}`. Se a API aceitar estas alterações, cada linha abaixo parte dos mesmos dados iniciais.

| Corpo em JSON Merge Patch | Resultado | O que aconteceu |
|---|---|---|
| `{"nome":"Caderno azul"}` | `{"nome":"Caderno azul","estoque":10}` | O estoque foi omitido do pedido e conservou o valor 10. |
| `{"estoque":0}` | `{"nome":"Caderno","estoque":0}` | O campo continua presente e vale zero. |
| `{"estoque":null}` | `{"nome":"Caderno"}` | O nome do campo e seu valor foram removidos do objeto. |

Nesse formato, `null` como valor de um campo no corpo é uma instrução para apagar o campo inteiro. Isso descreve o resultado no JSON. A API decide como guardar essa mudança e pode rejeitá-la se o campo for obrigatório. [RFC 7396, processamento do JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396.html#section-2)

> [!info]- E se o recurso ainda não existir?
> Normalmente o alvo do `PATCH` já existe. A especificação permite a criação em certas condições, conforme o formato e as regras da API.

## O que acontece ao repetir o pedido

A [[glossario/idempotencia|idempotência]] é a propriedade de um pedido cujo efeito pretendido é igual quando ele é feito uma vez ou repetido com os mesmos dados. Compare três pedidos para um produto que começa com estoque 10, sem outras alterações entre os envios.

| Pedido | Após uma vez | Após duas vezes |
|---|---|---|
| `PUT` com a ficha completa do produto e estoque 12 | 12 | 12 |
| `PATCH` com o corpo `{"estoque":12}` em JSON Merge Patch | 12 | 12 |
| `PATCH` numa API que aceita a instrução «adicione duas unidades» | 12 | 14 |

O HTTP define o `PUT` como idempotente porque cada envio pede para gravar a mesma versão. Para `PATCH`, a idempotência depende da instrução. No JSON Merge Patch da tabela, o número `12` é o valor desejado. A instrução «adicione duas unidades» usa o valor atual como ponto de partida, então cada envio soma mais duas. Essa soma é um exemplo de operação que outra API pode oferecer. [RFC 9110, idempotência](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) · [RFC 5789, método PATCH](https://www.rfc-editor.org/rfc/rfc5789.html#section-2)

Isso importa se a conexão cair antes de chegar a resposta. O cliente pode ficar sem saber se o primeiro pedido foi aplicado.

> [!info]- A resposta pode mudar mesmo quando o efeito é igual
> Um `PUT` pode retornar `201 Created` na primeira vez e `200 OK` na segunda, quando o recurso já existe. A versão final pedida é a mesma nos dois casos. A [[programacao/protocolos-da-web/modulo-3/05-metodos-seguros-idempotentes-e-erros-comuns-de-semantica|aula 3.5]] volta a essa diferença.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Trocar o preço de um produto
> A API aceita JSON Merge Patch em `/produtos/8`. O produto tem nome, preço e estoque. Escreva o método, o caminho e o corpo de um pedido para alterar só o preço para 35 reais. O campo se chama `preco`.
>
> > [!success]- Resposta
> > Use `PATCH /produtos/8` com `Content-Type: application/merge-patch+json` e corpo `{"preco":35}`. Omitir nome e estoque preserva seus valores nesse formato.

> [!question] 2. Entregar uma ficha completa
> Em `/perfis/4`, a API aceita substituição completa com `PUT` e exige os campos `nome` e `email`. Você quer trocar só o nome, mas enviou `{"nome":"Ana Costa"}` em um `PUT`. O servidor deve completar o e-mail com o valor anterior?
>
> > [!success]- Resposta
> > O corpo está incompleto pelas regras da API, que exige `email`. Para substituir a ficha com `PUT`, inclua também o e-mail que deseja guardar.

> [!question] 3. Repetir uma alteração
> Uma API aceita uma alteração que adiciona um rótulo a uma lista, inclusive quando o mesmo rótulo já existe. Você manda o mesmo pedido duas vezes. O efeito é idempotente?
>
> > [!success]- Resposta
> > Não. Depois do primeiro pedido há uma cópia adicional do rótulo. Depois do segundo há duas. O efeito acumulou.

> [!question] 4. Remover ou zerar o desconto
> Uma API aceita JSON Merge Patch. O produto está como `{"nome":"Caneta","desconto":5}`. Qual é o resultado de enviar `{"desconto":null}`? E se, partindo do cadastro original, você enviar `{"desconto":0}`?
>
> > [!success]- Resposta
> > Com `null`, o resultado é `{"nome":"Caneta"}`. Com zero, o resultado é `{"nome":"Caneta","desconto":0}`.

> [!tip] Para guardar
> Use `PUT` para enviar a versão completa dos dados que a API permite substituir. Use `PATCH` para enviar mudanças no formato aceito pela API. Antes de enviar, confira o endereço do recurso e o que o servidor fará com os campos omitidos.
