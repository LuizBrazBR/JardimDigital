---
title: "2.5 HTTP vs HTTPS: por que o TLS importa"
tags:
  - protocolos-da-web
  - http
  - seguranca
---

Última aula do módulo 2. Na [[programacao/protocolos-da-web/modulo-2/04-as-versoes-do-http-1-1-2-e-3|aula 2.4]], vimos como as mensagens HTTP viajam. Agora falta a pergunta de quem pode **ler** essas mensagens no caminho. A [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|aula 1.2]] já citou o [[glossario/tls|TLS]] no passo 4 e prometeu abri-lo aqui.

Tudo o que você aprendeu até agora (linha de requisição, [[glossario/cabecalho|cabeçalhos]], [[glossario/corpo|corpo]]) é **igual** em HTTP e em HTTPS. O que muda não é a mensagem, e sim o **caminho** que ela faz pela rede.

## HTTP puro: o cartão-postal

Este é o login da Ana, da [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|aula 2.3]], mandado por HTTP puro:

```http
POST /login HTTP/1.1
Host: api.loja.com
Content-Type: application/json
Content-Length: 54

{"email": "ana@exemplo.com", "senha": "MinhaSenh@123"}
```

O `Content-Length: 54` está certo: são 54 bytes de corpo, como na [[programacao/protocolos-da-web/modulo-2/02-a-anatomia-de-uma-resposta-http|aula 2.2]].

Em HTTP puro, esses bytes viajam **como estão escritos**, em texto aberto. Quem está no caminho consegue ler tudo: o roteador do Wi-Fi da lanchonete, o provedor de internet ou alguém no mesmo Wi-Fi com um programa de **captura de pacotes** (como o Wireshark, que "escuta" o que passa pela rede e mostra o conteúdo). Esse alguém vê a URL, os cabeçalhos, o corpo e a senha `MinhaSenh@123`, legível.

> [!example] O cartão-postal
> Uma conversa em HTTP é como um cartão-postal: o carteiro, o porteiro e qualquer um que o segure lê o texto inteiro. O HTTPS põe o mesmo cartão dentro de um envelope lacrado.

O risco não é só a senha. Na aula 2.3, o servidor reconhecia a Ana por um [[glossario/cookie|cookie]] ou por um [[glossario/token|token]] no cabeçalho. Em HTTP puro, quem copia esse valor no caminho **entra como a Ana sem saber a senha**.

## Quem faz o quê: IP, TCP, TLS e HTTP

Antes do TLS, uma arrumação. Quando você abre `https://api.loja.com`, **quatro coisas diferentes** trabalham juntas, cada uma com um trabalho só. A maior confusão da aula vem de misturar essas quatro.

| Camada | O que ela faz | Na analogia da carta |
|---|---|---|
| **HTTP** | É a **conversa**: o pedido (`GET /pedidos`) e a resposta (`200 OK` com os dados). | O texto escrito na carta |
| **TLS** | **Protege** a conversa: prova quem é o servidor e embaralha tudo. | O envelope lacrado, com a identidade de quem enviou |
| **TCP** | **Liga** os dois computadores e garante que tudo chegue **inteiro e em ordem**, reenviando o que se perder. Não entende o conteúdo. | O carteiro que confirma cada entrega e refaz a que se perdeu |
| **IP** | Leva os pacotes até a **máquina certa**. É o endereço de onde o servidor está. Não garante nada. | O endereço da casa |

Só o HTTP é a conversa. Os outros três **carregam e protegem** o que o HTTP diz, e não sabem o que está escrito na carta.

Então, para as suas perguntas: o **IP** diz *onde* fica o servidor. O **TCP** faz a ligação com aquele endereço e cuida de entregar tudo certinho. O **TLS** entra **depois** que o TCP ligou, para proteger a ligação. E só **depois do TLS** o HTTP começa a falar:

```text
1. IP + TCP    acham o servidor e abrem a ligação
2. TLS         combinam a proteção (só no HTTPS)
3. HTTP        o pedido e a resposta, já protegidos
```

## HTTPS = HTTP + TLS

> [!abstract] Definição
> **[[glossario/https|HTTPS]] é o HTTP rodando por dentro do TLS, uma camada que embaralha a conversa e prova quem é o servidor.** O **S** é de *Secure*, "seguro". Os métodos, os códigos de status e os cabeçalhos são os mesmos do HTTP.

Na aula 2.4, você viu que o TLS 1.3 acrescenta mais uma ida e volta antes dos dados, e que o QUIC embute esse passo na própria conexão.

### O que o TLS combina (e o que ele não combina)

O TLS **não negocia tudo**. No começo da conexão, ele resolve três coisas:

1. **Quem é o servidor?** O servidor prova a identidade dele.
2. **Como embaralhar?** Os dois escolhem o método e criam a chave.
3. **De carona, qual versão do HTTP vamos usar?** Isso se chama **ALPN**.

A terceira é "de carona" porque o começo da conexão é o único momento em que os dois já se falam, antes de qualquer HTTP. Aproveita-se para combinar a versão (1.1, 2 ou 3) ali. Na prática, os navegadores só usam HTTP/2 e HTTP/3 dentro do TLS.

O **HTTP não negocia nada**: ele só faz o pedido e recebe a resposta. A pergunta "este servidor é mesmo o `api.loja.com`?" é do **TLS**, e a resposta vem no certificado.

## Como o servidor prova quem é

O problema: qualquer servidor pode dizer "eu sou a loja". Precisa de uma prova. Ela vem em duas peças.

### Peça 1: o certificado, o RG do site

O [[glossario/certificado|certificado]] é como um RG. Diz **de quem é** (`api.loja.com`), a **validade** e quem o **emitiu**.

Quem emite é uma [[glossario/autoridade-certificadora|autoridade certificadora]], que funciona como um **cartório**: só reconhece o RG depois de conferir que a pessoa é mesmo dona daquele nome. O seu navegador já traz uma lista de cartórios em que confia.

### Peça 2: a assinatura, para provar que o RG é dele

Só que um RG pode ser copiado. Se qualquer um pudesse mostrar o certificado da loja, o certificado não provaria nada. Então o servidor precisa mostrar que **é o dono verdadeiro**.

Isso é feito com um **par de chaves**, duas chaves diferentes ligadas entre si:

- A **chave privada** fica só com o servidor, como a sua assinatura de punho. Ninguém mais sabe fazer igual.
- A **chave pública** vai dentro do certificado. Todo mundo pode ter. Ela só serve para **conferir** a assinatura feita com a privada, não para assinar.

Na hora do aperto de mão, o servidor **assina** uma mensagem com a chave privada. O navegador confere essa [[glossario/assinatura-digital|assinatura]] com a chave pública do certificado. Se confere, só o dono da chave privada poderia ter feito aquilo. É a mesma ideia do JWT da aula 2.3.

### As quatro conferências do navegador

Ao receber o certificado e a assinatura, o navegador confere:

1. O **nome** do certificado bate com o do endereço que você digitou?
2. Quem emitiu é um **cartório** em que ele confia?
3. O certificado ainda está **dentro da validade**?
4. A **assinatura** confere com a chave pública?

Se qualquer uma falhar, o navegador **para** e mostra o aviso de conexão não segura. Nenhuma requisição é mandada.

## O que acontece, em ordem

Esse vai-e-vem do começo é o [[glossario/handshake|handshake]], "aperto de mão". No TLS 1.3, ele tem poucos passos:

1. **O cliente se apresenta:** "quero falar com `api.loja.com`. Sei embaralhar de tais jeitos." (Os nomes técnicos: *Client Hello*, e os "jeitos" são as [[glossario/cifra|cifras]], explicadas logo a seguir.)
2. **O servidor responde:** "vamos usar este jeito. Aqui está o meu certificado e a minha assinatura." (*Server Hello*.)
3. **O cliente faz as quatro conferências** da seção anterior.
4. **Os dois combinam a chave de embaralhar** (explicada a seguir).
5. **O HTTP começa**, e tudo vai embaralhado.

## Cifra e chave: o método e o segredo

Duas palavras que se misturam: **cifra** e **chave**.

- A **[[glossario/cifra|cifra]]** é o **método** de embaralhar uma mensagem. **Cifrar** é aplicar esse método.
- A **chave** é o **segredo** que o método usa.

Um exemplo antigo, a **cifra de César**: o método é "trocar cada letra pela que vem algumas casas depois no alfabeto", e a chave é **quantas casas**. Com a chave `3`, `A` vira `D`, e `LOJA` vira `ORMD`. Quem sabe o método e a chave desfaz: volta 3 casas. Quem só vê `ORMD` não entende nada.

O método pode ser público, e o que mantém a conversa secreta é a **chave**. Por isso o TLS não esconde qual cifra usa; esconde a chave.

As cifras de verdade são bem mais fortes que o César, e têm nomes como `AES`. Na primeira mensagem, o cliente manda uma **lista** das cifras que conhece, e o servidor escolhe uma da lista. É a isso que o passo 1 e o passo 2 do aperto de mão se referem.

## A chave que embaralha: a chave de sessão

São **dois tipos de chave**, com trabalhos diferentes:

| Chave | Quantas | Para que serve |
|---|---|---|
| **Par: pública e privada** | Duas, diferentes | **Provar quem é** o servidor (a assinatura) |
| **[[glossario/chave-de-sessao\|Chave de sessão]]** | Uma só, igual nos dois lados | **Embaralhar a conversa**: a mesma chave tranca e destranca |

Por que não usar o par de chaves para embaralhar tudo? Porque é lento. A chave única é muito mais rápida, então o TLS usa o par só para a prova de identidade e a chave única para o resto. A de sessão é criada **para aquela conexão** e jogada fora no fim.

> [!warning] Sessão de dois jeitos
> Cuidado: a "chave de sessão" do TLS não é a [[glossario/sessao|sessão]] da aula 2.3. A sessão da 2.3 é o registro que a **aplicação** guarda sobre o login da Ana. A chave de sessão é um segredo que o **TLS** cria para embaralhar **uma conexão**. São camadas diferentes, com um nome parecido.

> [!info]- Como os dois combinam a mesma chave sem mandá-la?
> Cada lado manda **a sua metade** de um segredo, e as metades podem passar abertas: ninguém consegue montar a chave só com elas. Esse truque se chama **Diffie-Hellman**, descrito em 1976 por Whitfield Diffie e Martin Hellman.
>
> Uma analogia com tintas: cada um tem uma cor secreta e há uma cor pública, que todos conhecem. Cada um mistura a sua cor secreta com a pública e **manda a mistura** para o outro. Depois, cada um acrescenta a sua cor secreta à mistura que recebeu. Os dois acabam com a **mesma** cor final. Quem só viu as misturas no caminho não consegue desmisturá-las para descobrir as cores secretas.
>
> A assinatura do servidor garante que a mistura veio mesmo dele, e não de um impostor.

## O que o TLS garante

| Garantia | O que quer dizer | Contra quê protege |
|---|---|---|
| **Confidencialidade** | Quem está no meio só vê bytes embaralhados. | Quem escuta a rede e lê senhas e tokens. |
| **Integridade** | Se alguém alterar um byte no caminho, a alteração é detectada e a conexão é encerrada. | Quem muda a mensagem em trânsito, por exemplo trocando o destino de um pagamento. |
| **Autenticidade** | O [[glossario/certificado\|certificado]] prova que o servidor é o dono do nome `api.loja.com`. | Um servidor impostor fingindo ser a loja. |

## O que o TLS não faz

O TLS protege o **caminho**, e só ele. Não o trate como proteção total:

- **Não esconde com quem você fala.** O IP de destino aparece, e o nome do site (`api.loja.com`) vai no começo do aperto de mão, num campo chamado [[glossario/sni|SNI]]. Quem escuta sabe que você visitou a loja, mas não vê o que você fez nela.
- **Não prova que o site é honesto.** O certificado prova que o servidor é o dono do **nome**. Um site de golpe com um nome parecido consegue um certificado legítimo para o nome dele. O cadeado diz "conversa protegida com esse nome", e não "site confiável".
- **Não protege o dado depois que ele chega.** Quando a requisição chega ao servidor, o TLS termina e o servidor lê tudo. O que ele faz com os dados (guardar a senha às claras, imprimir num log) é problema da aplicação.

## Veja na prática

Compare com o `curl.exe` (no PowerShell do Windows, `curl` é apelido do `Invoke-WebRequest`). O `-v`, de *verbose*, mostra o que acontece. O `-s -o NUL` esconde o progresso e descarta o corpo, para sobrar só a conversa:

```powershell
curl.exe -s -o NUL -v https://example.com
```

Recortei as linhas que importam, e a sua saída pode variar com a versão do curl:

```text
* schannel: disabled automatic use of client certificate
* ALPN: curl offers http/1.1
* ALPN: server accepted http/1.1
* Established connection to example.com (172.66.147.243 port 443)
* using HTTP/1.x
> GET / HTTP/1.1
> Host: example.com
...
< HTTP/1.1 200 OK
```

| Linha | O que mostra |
|---|---|
| `schannel` | O *Schannel* é a peça do Windows que faz o TLS. Esta linha diz que o curl não manda certificado de cliente: só o servidor apresenta o dele. |
| `ALPN: curl offers` / `server accepted` | O ALPN é a parte do TLS em que os dois combinam a **versão do HTTP**, como na aula 2.4. O curl ofereceu só `http/1.1`, e o servidor aceitou. |
| `port 443` | A porta padrão do HTTPS. |
| `GET / HTTP/1.1` | A requisição que você já sabe ler. Para o HTTP, nada mudou. |

Agora o mesmo pedido em HTTP puro:

```powershell
curl.exe -s -o NUL -v http://example.com
```

Repare no que **some**: não há linha `schannel` nem `ALPN`, e a conexão vai à porta **80**. O `GET` é idêntico. O TLS é uma camada por baixo, que o HTTP nem percebe.

Para ver o passo 3 falhar, peça a um servidor de teste com certificado ruim:

```powershell
curl.exe https://expired.badssl.com/
curl.exe https://wrong.host.badssl.com/
```

O primeiro termina com um erro dizendo que o certificado **expirou**. O segundo, com um erro de **nome incorreto**: o certificado vale para outro nome. Em ambos, o curl **não manda o pedido**: o TLS parou tudo, como o navegador faz com a tela vermelha da aula 1.4.

No Chrome, o jeito de ver o certificado é o da aula 1.4: ícone à esquerda do endereço, **A conexão é segura**, **O certificado é válido**.

## HTTP e HTTPS lado a lado

| Aspecto | HTTP | HTTPS |
|---|---|---|
| **Porta padrão** | 80 | 443 |
| **Dados na rede** | Texto aberto, legível por quem está no caminho | Cifrados pelo TLS |
| **Certificado** | Não usa | Exige certificado assinado por uma autoridade confiável |
| **No navegador** | Marcado como "não seguro", principalmente em formulários | Tratado como conexão protegida |
| **Mensagem** | A mesma | A mesma: métodos, status e cabeçalhos |
| **HTTP/2 e HTTP/3** | Na prática, não são usados | Usados, pois o navegador os negocia dentro do TLS |

Muitos sites respondem a um pedido em `http://` mandando o navegador para a versão `https://`. Como isso se faz com códigos de status, é assunto do módulo 4.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que viaja aberto
> Um site usa HTTP puro. A Ana manda `POST /login` com a senha, e o servidor responde com `Set-Cookie: sessao=8f3a2c`. Quem está no mesmo Wi-Fi com um programa de captura consegue ver a senha? E o valor do cookie?
>
> > [!success]- Resposta
> > Os dois. Em HTTP puro, tudo viaja em texto: a senha no corpo da requisição e o cookie nos cabeçalhos da resposta. Quem copia o cookie `8f3a2c` e o envia nos próprios pedidos passa a ser reconhecido como a Ana, sem saber a senha.

> [!question] 2. O mesmo HTTP
> Você troca `http://api.loja.com/produtos/42` por `https://api.loja.com/produtos/42`. Precisa mudar o método `GET`, os cabeçalhos ou o formato do JSON do corpo?
>
> > [!success]- Resposta
> > Não. O HTTPS é o mesmo HTTP por dentro do TLS. Muda o transporte por baixo (a porta, o aperto de mão do TLS, o certificado), mas a mensagem continua igual.

> [!question] 3. Cada chave no seu lugar
> No TLS, aparecem a chave pública, a chave privada e a chave de sessão. Associe cada uma ao que ela faz: (a) cifrar a conversa inteira, depressa; (b) conferir a assinatura do servidor; (c) assinar o aperto de mão, ficando só com o servidor.
>
> > [!success]- Resposta
> > (a) é a **chave de sessão**, simétrica e rápida, criada só para aquela conexão. (b) é a **chave pública**, que está no certificado e qualquer um pode usar para conferir. (c) é a **chave privada**, que nunca sai do servidor.

> [!question] 4. O cadeado e o golpe
> Um site `loja-promocao-agora.com` tem cadeado e HTTPS, mas é um golpe que imita uma loja. O TLS falhou?
>
> > [!success]- Resposta
> > Não. O TLS provou que o servidor é o dono do nome `loja-promocao-agora.com`, e provou. O que ele nunca prova é que o dono é honesto. O cadeado diz "a conversa com este nome está protegida", e não "este site é confiável".

> [!question] 5. Quem vê o quê
> A Ana acessa `https://api.loja.com/pedidos` num Wi-Fi público. Quem escuta a rede consegue ver (a) a senha, (b) o caminho `/pedidos`, (c) que ela está falando com a loja?
>
> > [!success]- Resposta
> > Não vê (a) nem (b): senha, caminho, cabeçalhos e corpo vão cifrados. Vê (c): o IP de destino e o nome do site aparecem no começo do aperto de mão. Só o que o TLS cobre fica escondido.

> [!question] 6. O que o curl avisou
> Você roda `curl.exe https://wrong.host.badssl.com/` e o curl termina com um erro de nome incorreto, sem mostrar nenhuma página. Em qual passo do aperto de mão isso aconteceu, e por que o pedido não foi mandado?
>
> > [!success]- Resposta
> > No passo 3, quando o cliente confere o certificado. O nome no certificado não bate com o do endereço, e o TLS interrompe o aperto de mão **antes** de qualquer HTTP. Como a conversa nunca ficou protegida, o curl não manda a requisição.

> [!question] 7. O servidor guardou a senha às claras
> A loja usa HTTPS, mas grava as senhas em texto num arquivo de log. O TLS protege isso?
>
> > [!success]- Resposta
> > Não. O TLS protege só o caminho. Quando a requisição chega ao servidor, o TLS termina, e o que a aplicação faz com os dados é responsabilidade dela.

> [!question] 8. Quem faz o quê
> Associe cada tarefa à camada certa (IP, TCP, TLS ou HTTP): (a) provar que o servidor é o `api.loja.com`; (b) levar os pacotes até a máquina onde o servidor está; (c) dizer `GET /pedidos`; (d) reenviar um pedaço que se perdeu no caminho.
>
> > [!success]- Resposta
> > (a) é o **TLS**, com o certificado e a assinatura. (b) é o **IP**, o endereço da máquina. (c) é o **HTTP**, a conversa em si. (d) é o **TCP**, que garante que tudo chegue inteiro e em ordem.

> [!tip] Para guardar
> - **Quem faz o quê:** o IP leva até a máquina, o TCP liga e garante a entrega, o TLS protege e o HTTP é a conversa.
> - HTTP e HTTPS têm a **mesma** mensagem. O HTTPS é o HTTP por dentro do TLS, na porta 443.
> - O aperto de mão do TLS: o cliente se apresenta, o servidor manda o certificado e uma assinatura, o cliente confere e os dois calculam a mesma **chave de sessão**.
> - **Chave pública e privada** provam identidade. **Chave de sessão** cifra a conversa, rápida e de uso único.
> - O TLS garante confidencialidade, integridade e autenticidade **do caminho**.
> - O TLS não esconde o IP nem o nome do site, não prova que o site é honesto e não protege o que o servidor faz com os dados.

## De onde vêm as palavras

- **TLS**, *Transport Layer Security*, "segurança da camada de transporte". Veja a entrada [[glossario/tls|TLS]].
- **Criptografar** e **cifrar**: ver as entradas [[glossario/criptografia|criptografia]] e [[glossario/cifra|cifra]].
- **Handshake**, "aperto de mão": ver [[glossario/handshake|handshake]].
- **Chave de sessão**, **SNI** e **autoridade certificadora** também têm entrada no glossário.
