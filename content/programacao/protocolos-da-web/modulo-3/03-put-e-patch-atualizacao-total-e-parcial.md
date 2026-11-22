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

> [!info]- O formato do PATCH define o que cada instrução faz
> No JSON Merge Patch, omitir `email` preserva seu valor. Enviar `{"email":null}` pede para remover o campo, se a API aceitar essa mudança. Outros formatos de `PATCH` podem usar uma lista de operações. Normalmente o alvo já existe. A especificação permite criação em certas condições, conforme o formato e as regras da API.

## O que acontece ao repetir o pedido

A [[glossario/idempotencia|idempotência]] é a propriedade de um pedido cujo efeito pretendido é igual quando ele é feito uma vez ou repetido com os mesmos dados. Compare dois pedidos que uma API poderia oferecer para um estoque que começa em 10.

| Pedido | Após uma vez | Após duas vezes |
|---|---|---|
| Definir o estoque como 12 | 12 | 12 |
| Adicionar duas unidades ao estoque | 12 | 14 |

O `PUT` é idempotente porque cada envio pede para gravar a mesma versão. No `PATCH`, a operação determina o efeito de repetir o pedido. Definir `ativo` como `false` novamente deixa a conta desativada. Acrescentar duas unidades novamente soma outras duas. Isso importa se a conexão cair antes de chegar a resposta. O cliente pode ficar sem saber se o primeiro pedido foi aplicado.

> [!info]- A resposta pode mudar mesmo quando o efeito é igual
> Um `PUT` pode retornar `201 Created` na primeira vez e `200 OK` na segunda, quando o recurso já existe. A versão final pedida é a mesma nos dois casos. A aula 3.5 volta a essa diferença.

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

> [!tip] Para guardar
> Use `PUT` para enviar a versão completa dos dados que a API permite substituir. Use `PATCH` para enviar mudanças no formato aceito pela API. Antes de enviar, confira o endereço do recurso e o que o servidor fará com os campos omitidos.
