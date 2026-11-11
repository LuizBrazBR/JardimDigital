---
title: "1.4 Endereços na internet: IP, DNS e porta"
tags:
  - protocolos-da-web
  - rede
  - dns
---

Quarta aula do módulo 1. A aula 1.2 seguiu uma URL do Enter até a página e passou rápido por três peças: o navegador troca o nome pelo IP, no DNS, e abre a conexão num IP e numa porta. Esta aula abre cada uma delas. Juntas, as três respondem a uma pergunta só: para onde, exatamente, a requisição vai? No fim, você vai saber ler um endereço como `185.199.108.153:443`, descobrir o IP de qualquer site pelo terminal e entender o erro que aparece quando dois servidores querem a mesma porta.

```
você digita        https://www.loja.com.br/produtos
o DNS troca        www.loja.com.br  ->  203.0.113.55
o esquema diz      https            ->  porta 443
a conexão vai a    203.0.113.55:443
```

## Endereço IP: onde fica um computador

Todo aparelho ligado a uma rede, seja um servidor, o seu notebook ou o seu celular, tem um **[[glossario/endereco-ip|endereço IP]]**: um número que diz onde ele está na rede, como o endereço de uma casa diz onde ela fica na cidade. É para esse número que os dados viajam.

IP é a sigla de *Internet Protocol*, "protocolo da internet". É o protocolo que leva os dados de um computador a outro, passando por muitos computadores no meio do caminho. É a parte dos Correios da carta da aula 1.1: o HTTP é o idioma da carta, e o IP cuida do envelope. Ele não lê a carta, só olha o endereço.

Os dados não viajam inteiros. Eles são cortados em pedaços, os **pacotes**, e cada pacote leva dois IPs no envelope: o de destino, para saber aonde ir, e o de origem, para a resposta saber voltar. O TCP da aula 1.2 trabalha junto: o IP entrega cada pacote no computador certo, e o TCP confere se chegaram todos, na ordem. Por isso a dupla costuma aparecer com um nome só, **TCP/IP**.

### IPv4: quatro números

O formato mais comum ainda é o **IPv4**, a versão 4 do IP: quatro números de 0 a 255, separados por ponto.

```
203.0.113.55
```

Por que 255? Cada um dos quatro números ocupa um **byte**, e um byte guarda 256 valores diferentes, de 0 a 255. Por isso `192.168.0.256` não é um IP: o último número não cabe.

Quatro bytes dão 256 × 256 × 256 × 256 = 4.294.967.296 endereços, uns 4,3 bilhões. Parece muito, mas é menos do que o número de pessoas no mundo, e cada pessoa tem vários aparelhos. Os endereços livres acabaram: o último lote do mundo foi distribuído em 2011, e o da América Latina acabou em 2020.

### IPv6: o formato novo

Para resolver a falta de endereços, existe o **IPv6**. Ele tem oito grupos separados por dois-pontos, cada um com quatro algarismos em **hexadecimal**, a contagem que usa 16 algarismos: de 0 a 9, e depois de `a` a `f`.

```
2001:0db8:0000:0000:0000:0000:0000:0001
```

Como isso é comprido, há duas regras para encurtar:

1. Os zeros do começo de cada grupo podem sumir: `0db8` vira `db8`, e `0001` vira `1`.
2. Uma sequência de grupos só de zeros vira `::`. Só uma vez por endereço, senão não dá para saber quantos zeros cada `::` escondeu.

Com as duas, o endereço de cima vira `2001:db8::1`. É o mesmo endereço, escrito curto.

O IPv6 tem 16 bytes, quatro vezes o tamanho do IPv4. Dá um total de endereços com 39 algarismos: esses não vão acabar.

| | IPv4 | IPv6 |
|---|---|---|
| exemplo | `203.0.113.55` | `2001:db8::1` |
| separador | ponto | dois-pontos |
| partes | 4 números, de 0 a 255 | 8 grupos, em hexadecimal |
| tamanho | 4 bytes | 16 bytes |
| quantos endereços | uns 4,3 bilhões | um número de 39 algarismos |

Os dois convivem. Um site pode ter endereços dos dois tipos, como o `example.com`, que aparece mais abaixo, no terminal. Para esta trilha, o que importa é a ideia: um IP diz onde está um computador, seja qual for o formato.

Numa URL, um IPv6 vai entre colchetes: `http://[::1]:3000/`. É por causa do parse da aula 1.2: na URL, o `:` depois do host marca o começo da porta. Sem os colchetes, o parser não teria como saber quais dois-pontos são do IP e qual é o da porta.

> [!info] Os endereços dos exemplos são de mentira, de propósito
> O `203.0.113.55` e o `2001:db8::1` são de faixas reservadas para exemplos, como o `example.com`. Nenhum computador de verdade usa esses números. Assim, um livro ou um curso pode escrevê-los sem apontar para a máquina de ninguém.

### O IP do seu computador

O seu notebook também tem um IP. No terminal do VS Code:

```powershell
ipconfig | Select-String IPv4
```

```
   Endereço IPv4. . . . . . . .  . . . . . . . : 192.168.0.57
```

O seu número vai sair diferente, mas provavelmente começa com `192.168`, `10` ou `172`. São as faixas de **IP privado**: endereços que só valem dentro de uma rede local, como a da sua casa ou a da sua empresa. Milhões de casas usam os mesmos `192.168.0.x`, e não tem problema, porque esses números nunca saem para a internet.

Quem sai é o **roteador**. Ele tem um IP público, que vale na internet inteira, e fala em nome de todos os aparelhos da casa. Quando a resposta volta, ele entrega ao aparelho que pediu:

```
notebook   192.168.0.57  \
celular    192.168.0.80   >  roteador  ->  na internet, todos aparecem como 198.51.100.7
TV         192.168.0.91  /
```

Então a frase "todo aparelho tem um IP" está certa, mas com um detalhe: o IP do seu notebook vale só dentro da sua rede. Para um servidor lá fora, quem pediu foi o IP do roteador.

### localhost: o próprio computador

O `localhost` da aula 1.2, "este computador mesmo", também é um nome, e também vira um IP: `127.0.0.1` no IPv4, e `::1` no IPv6. São endereços especiais, que apontam de volta para a própria máquina. Os dados nem chegam a sair dela. Por isso o `http://localhost:3000` da aula 1.3 funcionava sem internet.

## DNS: do nome para o número

Na aula 1.2, o **[[glossario/dns|DNS]]**, *Domain Name System*, "sistema de nomes de domínio", apareceu como a lista de contatos da internet: recebe um nome e devolve o IP. Esse trabalho de trocar o nome pelo número se chama **resolver** o nome, e o processo inteiro, **resolução de DNS**.

### Por que nomes, e não números

Decorar um número para cada site seria impossível. Mas não é o único motivo. O nome também deixa o IP mudar sem ninguém perceber:

- **O site pode mudar de servidor.** Quando uma loja troca de máquina, o IP muda. O dono atualiza o DNS, e todo mundo continua digitando `loja.com.br`. É como alguém que troca de número de celular: o contato "Mãe" continua lá, com o número novo.
- **Um nome pode ter vários IPs.** O `www.google.com` devolve vários números de uma vez, um para cada servidor que responde por ele. Um curl da aula 1.2 já tinha recebido dois IPs para o `example.com` e tentado o primeiro.
- **O mesmo nome pode dar IPs diferentes para pessoas diferentes.** Um site grande tem servidores em vários países, e o DNS pode responder a cada pessoa com o IP do servidor mais perto dela.

### Antes do DNS: um arquivo só

No começo da rede que deu origem à internet, a lista de nomes e números era um arquivo de texto, o `HOSTS.TXT`, cuidado por um escritório só, na Califórnia. Cada computador baixava uma cópia. Com milhares de computadores entrando na rede, um arquivo só não dava mais conta, e em 1983 Paul Mockapetris inventou o DNS.

O arquivo não sumiu. O Windows ainda tem um, o `hosts`, e o computador olha nele antes de perguntar ao DNS. Ele aparece mais abaixo, na seção "Veja com os próprios olhos".

### Como a pergunta é respondida

Ninguém tem a lista inteira da internet. Cada pedaço da lista fica com quem é dono daquele pedaço. É isso que quer dizer **distribuído**. Quando o navegador precisa do IP de `www.loja.com.br`, a pergunta passa por estas paradas, e para na primeira que souber a resposta:

1. **O cache do navegador**, se ele resolveu esse nome há pouco.
2. **O cache do sistema operacional**, e o arquivo `hosts`.
3. **O resolvedor**: um servidor de DNS que faz a busca pelo computador. Costuma ser o da sua operadora de internet ou o da sua empresa, e o roteador passa as perguntas para ele. Também existem resolvedores públicos, como o `8.8.8.8`, do Google, e o `1.1.1.1`, da Cloudflare. O resolvedor também tem cache, que serve a todos os clientes dele.

Se nem o resolvedor sabe, ele vai buscar a resposta, de cima para baixo:

```
resolvedor -> servidor raiz:            "quem cuida do .br?"
           <- "pergunte aos servidores do .br"
resolvedor -> servidor do .br:          "quem cuida de loja.com.br?"
           <- "pergunte ao servidor da loja"
resolvedor -> servidor de loja.com.br:  "qual é o IP de www.loja.com.br?"
           <- "203.0.113.55"
```

Repare que a busca segue o nome da direita para a esquerda, do mais geral para o mais específico, do mesmo jeito que a aula 1.2 ensinou a ler o nome. Cada parada só sabe a sua parte e indica a próxima:

| Parada | Quem é | O que sabe |
|---|---|---|
| servidor **raiz** | 13 nomes, com mais de mil cópias pelo mundo | quem cuida de cada final: `.br`, `.com`, `.org`... |
| servidor do **final** | o do `.br` fica com o Registro.br | quem cuida de cada domínio registrado com aquele final |
| servidor **autoritativo** | o do próprio domínio, cuidado pelo dono ou pela empresa que hospeda o site | o IP de cada nome dentro do domínio |

O servidor autoritativo tem esse nome porque é a **autoridade** sobre o domínio: a resposta dele é a oficial. As outras são cópias guardadas no caminho.

O resolvedor guarda cada resposta. Na próxima pergunta sobre um `.br`, ele já sabe a quem perguntar e pula a raiz. Por isso, na prática, quase nenhuma pergunta faz o caminho inteiro.

> [!info] O ponto que ninguém escreve
> O nome completo de um site termina com um ponto: `www.loja.com.br.`. Esse último ponto é a raiz, o começo da busca. Como ele está sempre lá, ninguém precisa escrever.

### Quanto tempo a resposta vale: o TTL

Cada resposta do DNS vem com um **TTL**, sigla do inglês *time to live*, "tempo de vida": quantos segundos ela pode ficar guardada. O TTL do `example.com` é 300, ou seja, cinco minutos. Durante esse tempo, os caches respondem sozinhos, sem perguntar de novo.

É a mesma divisão do cache da aula 1.3. Lá, o servidor dizia por quanto tempo o navegador podia guardar um arquivo, no `cache-control`. Aqui, o dono do domínio diz por quanto tempo os outros podem guardar o IP, no TTL. Quem guarda obedece.

O TTL explica uma coisa que todo mundo que já mudou um site de servidor conhece: a mudança não aparece para todos na mesma hora. Quem resolveu o nome antes da troca continua indo ao IP antigo até o TTL acabar. Por isso se diz que uma mudança de DNS "demora a propagar".

## Porta: qual programa, dentro do computador

A aula 1.2 usou a imagem do prédio: o IP é o endereço do prédio, e a **[[glossario/porta|porta]]** é o número do apartamento. Um computador, um IP só, pode rodar vários servidores ao mesmo tempo: o do site, o do banco de dados, o de acesso remoto. Quando um pacote chega, a porta diz a qual deles ele vai.

A porta é um número de 0 a 65535, porque ocupa dois bytes.

### Ficar escutando

O servidor "fica escutando" desde a aula 1.1. Agora dá para dizer o que isso quer dizer. Quando o `servidor.js` da aula 1.3 roda `servidor.listen(3000)`, ele avisa ao sistema operacional: "o que chegar na porta 3000 é meu". Daí em diante, o sistema entrega a ele tudo o que chega nessa porta.

Daí saem duas regras:

- **Uma porta, um programa.** Se um segundo programa pedir a mesma porta, o sistema recusa. Senão, não saberia para qual dos dois entregar os pacotes.
- **Porta sem ninguém, conexão recusada.** Se chega um pedido numa porta onde nenhum programa está escutando, o sistema responde que não tem ninguém ali. O prédio existe, mas o apartamento está vazio.

As duas aparecem como erros, e você vai provocar os dois mais abaixo.

### As portas conhecidas

Para o cliente não ter que adivinhar, cada serviço comum tem uma porta combinada. São as **portas conhecidas**, em inglês *well-known ports*. A porta padrão da aula 1.2 é isso: quando você digita `https://loja.com`, o navegador já sabe que é a 443.

| Porta | Serviço |
|---|---|
| 22 | SSH, acesso remoto a servidores, pelo terminal |
| 53 | DNS: o próprio DNS também é um servidor, e escuta numa porta |
| 80 | HTTP, a web sem criptografia |
| 443 | HTTPS, a web com criptografia, o TLS |
| 5432 | PostgreSQL, um banco de dados muito usado em back-ends |
| 3000 | nenhum oficial: é só um costume para testar back-ends |

Quem mantém a lista oficial é a IANA, a organização que distribui os números da internet, como os blocos de IP. Ela divide as portas em três faixas:

| Faixa | Nome | Para quê |
|---|---|---|
| 0 a 1023 | conhecidas | os serviços mais comuns, como o 80 e o 443 |
| 1024 a 49151 | registradas | programas que pediram um número, como o PostgreSQL, na 5432 |
| 49152 a 65535 | temporárias | as portas dos clientes, que a próxima seção explica |

Você só precisa escrever a porta na URL quando ela não é a padrão do esquema. Por isso o `http://localhost:3000` tem número e o `https://loja.com` não tem.

### O cliente também tem porta

O servidor escuta numa porta fixa e conhecida, para todos saberem onde bater. Mas o cliente também precisa de uma porta, para a resposta saber a qual programa voltar: o navegador, o curl e o Spotify podem estar conversando com a internet ao mesmo tempo.

A porta do cliente não é escolhida por ninguém da conversa. O sistema operacional sorteia uma porta livre, quase sempre da faixa das temporárias, quando a conexão abre, e a solta quando ela fecha. Por isso, toda conversa tem dois pares IP:porta, um em cada ponta:

```
o curl, no seu computador          o servidor
::1, porta 58890            ->     ::1, porta 3000
(sorteada pelo sistema)            (escolhida pelo servidor, no listen)
```

## Juntando tudo: o par IP:porta

Toda conexão vai a um **par IP:porta**. O DNS dá o IP. O esquema da URL dá a porta, ou ela vem escrita. Agora dá para ler o `Remote address` que a aba Headers mostrou na aula 1.1:

```
Remote address: 185.199.108.153:443
```

O `185.199.108.153` é o IP do computador que respondeu: um servidor do GitHub, que hospeda este site. O `:443` é a porta, a do HTTPS.

### O nome ainda vai junto

A aula do curso diz que, depois do DNS, a conversa acontece por IP e porta, e que o nome digitado já cumpriu o seu papel. Para chegar ao servidor, é isso mesmo. Mas o nome ainda viaja, em dois lugares:

- **no cabeçalho `Host`** da requisição, como a aula 1.2 mostrou;
- **no TLS**: o servidor prova que é o dono **daquele nome**, e o navegador confere se o nome bate com o que você digitou.

Isso acontece porque um IP pode servir muitos sites. O `185.199.108.153` não é só deste site: é um dos quatro IPs que o GitHub usa para todos os sites que ele hospeda, de milhões de pessoas. Quando um pedido chega nesse IP, a única coisa que diz ao servidor qual site mandar é o nome, no `Host`.

Por isso, digitar o IP direto no navegador, como `https://185.199.108.153`, costuma não dar no site que você queria. Sem o nome, o servidor não sabe qual dos sites mandar, e o certificado do TLS não bate com um número.

## Veja com os próprios olhos

### O IP de um site, no terminal

O Windows tem um comando que pergunta ao DNS. No terminal do VS Code:

```powershell
nslookup example.com
```

```
Servidor:  UnKnown
Address:  192.168.0.1

Não é resposta autoritativa:
Nome:    example.com
Addresses:  2606:4700:10::6814:179a
          2606:4700:10::ac42:93f3
          104.20.23.154
          172.66.147.243
```

Os seus números podem sair diferentes. Cada parte:

| Linha | O que quer dizer |
|---|---|
| `Servidor` e `Address` | o resolvedor que respondeu. Em casa, costuma ser o roteador; numa empresa, o servidor de DNS dela. O `UnKnown` só quer dizer que o resolvedor não tem nome cadastrado |
| `Não é resposta autoritativa` | quem respondeu não foi o servidor autoritativo do `example.com`, e sim o resolvedor, talvez com uma resposta que estava no cache dele |
| `Addresses` | os IPs: dois IPv6, com dois-pontos, e dois IPv4, com pontos |

O PowerShell tem um comando que mostra mais detalhes:

```powershell
Resolve-DnsName example.com
```

```
Name         Type  TTL  Section  IPAddress
----         ----  ---  -------  ---------
example.com  AAAA  300  Answer   2606:4700:10::ac42:93f3
example.com  AAAA  300  Answer   2606:4700:10::6814:179a
example.com  A     299  Answer   172.66.147.243
example.com  A     299  Answer   104.20.23.154
```

A coluna **Type** diz o tipo da resposta. No DNS, cada resposta é um **registro**: o tipo **A**, de *address*, "endereço", guarda um IPv4, e o tipo **AAAA** guarda um IPv6. São quatro As porque o IPv6 é quatro vezes maior.

A coluna **TTL** é o tempo de vida, em segundos. Rode o comando de novo daqui a uns segundos: o número diminui. É a resposta guardada no cache do Windows, contando o tempo que ainda falta. Para ver esse cache:

```powershell
Get-DnsClientCache -Entry example.com
```

A coluna **TimeToLive** é o mesmo TTL, diminuindo.

### O arquivo hosts

O arquivo que sobrou do tempo antes do DNS:

```powershell
Get-Content C:\Windows\System32\drivers\etc\hosts
```

As linhas que começam com `#` são comentários, como o `//` do JavaScript. No fim, costuma haver estas:

```
# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
```

É o formato do arquivo: um IP, um espaço e um nome. Essas linhas estão comentadas porque o Windows já resolve o `localhost` sozinho. Alguns programas, como o Docker, acrescentam linhas ali. Uma linha sem `#` vale antes do DNS: se alguém escrevesse `203.0.113.55 www.google.com`, este computador iria para esse número quando você digitasse Google. Para mudar o arquivo, é preciso ser administrador, justamente por isso.

### Dois servidores na mesma porta

Use o `servidor.js` da aula 1.3.

1. Rode `node servidor.js`. Aparece `Servidor escutando na porta 3000`.
2. Abra outro terminal, com o `+`, e rode `node servidor.js` de novo. O segundo para na hora, com um erro comprido. O que importa é esta linha:

   ```
   Error: listen EADDRINUSE: address already in use :::3000
   ```

   `EADDRINUSE` é uma abreviação de *Error: ADDRess IN USE*, "erro: endereço em uso". O `:::3000` junta o `::`, que aqui quer dizer "qualquer IP desta máquina", com a porta, `:3000`. É a regra "uma porta, um programa": a 3000 já tem dono.

3. Veja quem está escutando:

   ```powershell
   netstat -ano | findstr :3000
   ```

   ```
     TCP    0.0.0.0:3000     0.0.0.0:0     LISTENING     18884
     TCP    [::]:3000        [::]:0        LISTENING     18884
   ```

   `LISTENING` é "escutando". O `0.0.0.0` e o `[::]` querem dizer "qualquer IP desta máquina", no IPv4 e no IPv6. O último número é a identificação do programa que está escutando, o `node`. O seu vai ser outro.

4. Agora peça numa porta onde ninguém escuta:

   ```powershell
   curl.exe http://localhost:3001/produtos/42
   ```

   ```
   curl: (7) Failed to connect to localhost port 3001 after 2257 ms: Could not connect to server
   ```

   "Não consegui conectar ao localhost na porta 3001". O computador existe, mas ninguém atende nessa porta. Repare que não é um 404: o 404 é uma resposta HTTP, e aqui nem chegou a existir conversa HTTP.

5. Faça uma cópia do arquivo, `servidor2.js`, e troque `3000` por `3001` nas duas linhas do `listen`. Rode a cópia no segundo terminal. Agora os dois servidores rodam juntos, cada um na sua porta, e o pedido do passo 4 dá certo.

Para desligar cada servidor, **Ctrl+C** no terminal dele.

### Por nome ou por número

Com o servidor da porta 3000 rodando, peça com o nome:

```powershell
curl.exe -sv http://localhost:3000/produtos/42
```

```
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:3000...
* Established connection to localhost (::1 port 3000) from ::1 port 58890
* using HTTP/1.x
> GET /produtos/42 HTTP/1.1
> Host: localhost:3000
...
```

E agora com o número:

```powershell
curl.exe -sv http://127.0.0.1:3000/produtos/42
```

```
*   Trying 127.0.0.1:3000...
* Established connection to 127.0.0.1 (127.0.0.1 port 3000) from 127.0.0.1 port 58891
* using HTTP/1.x
> GET /produtos/42 HTTP/1.1
> Host: 127.0.0.1:3000
...
```

Quatro coisas para reparar:

- **Com o nome, há um passo a mais.** As linhas `was resolved`, `IPv6` e `IPv4` são a resolução: o `localhost` virou `::1` e `127.0.0.1`. Com o número, elas nem aparecem, porque não há nome para resolver.
- **O IPv6 vem entre colchetes:** `[::1]:3000`, pelo mesmo motivo da URL. Sem eles, não daria para saber onde o IP termina e a porta começa.
- **O `from ::1 port 58890` é a porta do cliente**, a que o sistema sorteou para o curl. Rode de novo, e o número muda. A do servidor continua 3000.
- **O `Host` muda**, mas a resposta é a mesma. O nosso servidor nem olha para o `Host`, porque só tem um site. O servidor do GitHub olha.

### No Chrome

Abra um site, aperte **F12**, vá na aba **Network** (em português, **Rede**), aperte **F5** e clique na primeira linha. Na aba **Headers**, no bloco **General**, a linha **Remote Address** é o par IP:porta que o navegador usou. Compare o IP com o que o `nslookup` desse site devolve: tem que ser um dos números da lista.

Faça o mesmo com `http://localhost:3000/produtos/42`. Aparece `[::1]:3000` ou `127.0.0.1:3000`.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Nome, número ou porta?
> Diga o que é cada um:
>
> - a) `203.0.113.55`
> - b) `www.loja.com.br`
> - c) `2001:db8::1`
> - d) `443`
> - e) `localhost`
> - f) `127.0.0.1`
> - g) `::1`
>
> > [!success]- Resposta
> > - a) um IPv4: quatro números separados por ponto.
> > - b) um nome, o host. O DNS troca pelo IP.
> > - c) um IPv6: grupos em hexadecimal separados por dois-pontos, com o `::` no lugar dos grupos de zeros.
> > - d) uma porta, a padrão do HTTPS.
> > - e) um nome especial, que quer dizer "este computador".
> > - f) o IPv4 deste computador.
> > - g) o IPv6 deste computador.

> [!question] 2. Esse IP existe?
> Quais destes são IPv4 que podem existir?
>
> - a) `10.0.0.1`
> - b) `192.168.0.256`
> - c) `8.8.8.8`
> - d) `172.16.300.1`
> - e) `1.2.3`
>
> > [!success]- Resposta
> > Só o a e o c. O b e o d têm um número maior que 255, que não cabe num byte. O e tem só três números, e o IPv4 tem quatro. O c é o resolvedor público do Google, e o a é um IP privado, de rede local.

> [!question] 3. Qual passo falhou?
> Dois pedidos deram errado:
>
> ```
> curl: (6) Could not resolve host: lojja.com.br
> curl: (7) Failed to connect to localhost port 3001 after 2257 ms: Could not connect to server
> ```
>
> Em cada um, o que falhou: o DNS, a conexão ou o HTTP?
>
> > [!success]- Resposta
> > - O primeiro falhou no **DNS**: "não consegui resolver o host". O nome `lojja.com.br`, com dois jotas, não existe, então não há IP para onde ir.
> > - O segundo passou pelo DNS, porque o `localhost` virou IP, e falhou na **conexão**: ninguém está escutando na porta 3001. Ou o servidor está desligado, ou está em outra porta.
> >
> > Nenhum dos dois chegou ao HTTP. Um 404 ou um 500 seriam respostas HTTP, e isso quer dizer que a conexão funcionou.

> [!question] 4. Dois na mesma porta
> Você rodou o `servidor.js` duas vezes, e a segunda deu `EADDRINUSE`. Por que o sistema não deixa os dois escutarem na 3000? Como resolver?
>
> > [!success]- Resposta
> > Porque a porta é o que diz ao sistema para qual programa entregar os pacotes que chegam. Com dois programas na mesma porta, ele não saberia qual escolher. Para resolver, desligue o primeiro com Ctrl+C, ou rode o segundo em outra porta, como a 3001.

> [!question] 5. O site mudou de servidor
> A loja trocou de servidor às 14h, e o IP mudou. O DNS dela tem TTL de 3600. Às 14h30, alguns clientes ainda caem no servidor antigo. Por quê? Até quando isso pode acontecer?
>
> > [!success]- Resposta
> > Porque a resposta antiga ficou guardada em caches, do navegador, do sistema e dos resolvedores, e quem guardou pode usá-la até o TTL acabar. 3600 segundos é uma hora. Quem resolveu o nome um pouco antes das 14h pode continuar indo ao IP antigo até perto das 15h.
> >
> > Por isso, quem vai mudar de servidor costuma baixar o TTL, por exemplo para 300, alguns dias antes. Assim, na hora da troca, os caches esquecem a resposta antiga em cinco minutos.

> [!question] 6. O DNS caiu
> O resolvedor da sua operadora parou de responder. A internet parou?
>
> > [!success]- Resposta
> > Não. Os computadores continuam se achando por IP, e os pacotes continuam viajando. O que parou foi a tradução: você não consegue chegar aos sites pelo nome. Os sites que você abriu há pouco ainda funcionam por um tempo, porque o IP deles está no cache, até o TTL acabar. Trocar o resolvedor do computador por um público, como o `1.1.1.1`, resolve.

> [!question] 7. Monte o par
> O DNS diz que `www.loja.com.br` é `203.0.113.55`. Para qual par IP:porta vai a conexão de cada URL?
>
> - a) `https://www.loja.com.br/produtos`
> - b) `http://www.loja.com.br/produtos`
> - c) `http://www.loja.com.br:8080/produtos`
> - d) `http://[::1]:3000/tarefas`
>
> > [!success]- Resposta
> > - a) `203.0.113.55:443`: a porta não está escrita, e a padrão do `https` é a 443.
> > - b) `203.0.113.55:80`: a padrão do `http` é a 80.
> > - c) `203.0.113.55:8080`: a porta escrita vale mais que a padrão.
> > - d) `[::1]:3000`: o IPv6 deste computador, na porta 3000. Não há DNS nenhum, porque a URL já traz o número.

> [!question] 8. O banco e o site na mesma máquina
> Um servidor, com o IP `203.0.113.55`, roda o site na porta 443 e o PostgreSQL na 5432. Chegam dois pedidos, um em `203.0.113.55:443` e outro em `203.0.113.55:5432`. Quem recebe cada um?
>
> > [!success]- Resposta
> > O IP é o mesmo, então os dois chegam ao mesmo computador. A porta decide o resto: o pedido na 443 vai para o servidor do site, e o da 5432 vai para o PostgreSQL. É o mesmo prédio, com dois apartamentos.

> [!question] 9. Um IP, muitos sites
> Este site e o de milhões de outras pessoas ficam no GitHub, nos mesmos quatro IPs, como o `185.199.108.153`. Se o pedido de todos chega ao mesmo IP e à mesma porta, 443, como o servidor sabe qual site mandar?
>
> > [!success]- Resposta
> > Pelo nome, que continua indo junto: no TLS e no cabeçalho `Host` da requisição. O IP e a porta levam o pedido até o servidor do GitHub, e o `Host: luizbrazbr.github.io` diz qual dos sites ele quer. É por isso que o nome não some depois do DNS.

> [!question] 10. A porta do curl
> No relatório do curl, apareceu `from ::1 port 58890`. Quem escolheu esse 58890? Por que o curl precisa de uma porta, se quem escuta é o servidor?
>
> > [!success]- Resposta
> > Quem escolheu foi o sistema operacional, que sorteou uma porta livre quando a conexão abriu. O curl precisa de uma porta para a resposta saber voltar para ele, e não para o navegador ou outro programa que esteja conversando com a internet ao mesmo tempo. Se você rodar de novo, sai outro número. A porta do servidor é fixa, para todos saberem onde bater. A do cliente pode ser qualquer uma.

## De onde vêm as palavras

- **Endereço**: de **endereçar**, do latim popular *indērēctiāre*, que vem do latim *dīrēctus*, "reto, direito", o mesmo de **direção**, **direto** e **direito**. Endereçar uma carta era pôr a carta no rumo certo. O *address* do inglês vem da mesma família, pelo francês antigo *adrecier*, "endireitar", de *ad-*, "para", e *dīrēctiāre*, "dirigir". O espanhol *enderezar* e o italiano *indirizzo*, "endereço", são primos.
- **Internet**: encurtamento do inglês *internetwork*, de *inter-*, "entre", e *network*, "rede": a rede entre as redes. A forma curta já aparece em 1974, no título de um documento de Vint Cerf e outros pesquisadores sobre o TCP, e o Departamento de Defesa dos Estados Unidos adotou o nome *Internet* nos anos 1980. Faz sentido: a internet não é uma rede só, mas milhares de redes, como a da sua casa, a da sua empresa e a do GitHub, que o IP consegue atravessar.
- **Resolver**: do latim *resolvere*, "desatar, soltar", de *re-*, "de volta", e *solvere*, "soltar". Do mesmo *solvere* vêm **solução**, **dissolver** e **absolver**. Resolver um nome é desatar o nome até chegar ao número que estava preso nele.
- **Hexadecimal**: junta o grego *héx*, "seis", e o latim *decimālis*, de *decem*, "dez": seis mais dez, dezesseis. É um nome misturado, meio grego e meio latim.
- **Localhost**: *local*, do latim *locālis*, de *locus*, "lugar", o mesmo de **localizador** da aula 1.2, e **[[glossario/host|host]]**: o computador que fica no lugar onde você está.

> [!tip] Para guardar
> - O **IP** diz onde está um computador na rede. O **IPv4** tem quatro números de 0 a 255 (`203.0.113.55`). O **IPv6** tem oito grupos em hexadecimal (`2001:db8::1`), e existe porque os IPv4 acabaram.
> - O IP do seu computador em casa é **privado** (`192.168...`) e só vale na sua rede. Para a internet, quem aparece é o roteador.
> - `localhost` é este computador: `127.0.0.1` ou `::1`.
> - O **DNS** troca o nome pelo IP. A pergunta passa pelos caches e pelo **resolvedor**. Se ninguém sabe, a busca vai da **raiz** ao final (`.br`) e dele ao servidor **autoritativo** do domínio, da direita para a esquerda no nome.
> - O **TTL** diz por quanto tempo uma resposta do DNS pode ficar guardada. Por isso uma mudança de IP demora a chegar a todos.
> - A **porta** diz qual programa, dentro do computador, recebe a conexão. Uma porta, um programa (`EADDRINUSE`). Porta sem ninguém escutando, conexão recusada.
> - **Portas conhecidas**: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS. A porta do cliente é sorteada pelo sistema.
> - Toda conexão vai a um **par IP:porta**. Mas o nome continua indo junto, no `Host` e no TLS, porque um IP pode servir muitos sites.
> - Dá para ver tudo isso: `nslookup` e `Resolve-DnsName` para o DNS, `netstat` para as portas escutando e `curl.exe -sv` para o caminho do nome até a conexão.

Fontes: MDN: [IP Address](https://developer.mozilla.org/en-US/docs/Glossary/IP_Address), [DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS), [Port](https://developer.mozilla.org/en-US/docs/Glossary/Port), [What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name) · Cloudflare: [What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/) · IANA: [Root servers](https://www.iana.org/domains/root/servers), [Port numbers](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) · IETF: [RFC 1034, os conceitos do DNS](https://www.rfc-editor.org/rfc/rfc1034), [RFC 1918, os IPs privados](https://www.rfc-editor.org/rfc/rfc1918), [RFC 5737, os IPv4 de exemplo](https://www.rfc-editor.org/rfc/rfc5737), [RFC 3849, os IPv6 de exemplo](https://www.rfc-editor.org/rfc/rfc3849), [RFC 675, a primeira "internet"](https://www.rfc-editor.org/rfc/rfc675) · Node.js: [Common system errors](https://nodejs.org/api/errors.html#common-system-errors) · Microsoft: [Resolve-DnsName](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname), [Get-DnsClientCache](https://learn.microsoft.com/en-us/powershell/module/dnsclient/get-dnsclientcache) · GitHub Docs: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · Wikipedia: [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System), [IPv4 address exhaustion](https://en.wikipedia.org/wiki/IPv4_address_exhaustion), [Hosts (file)](https://en.wikipedia.org/wiki/Hosts_(file)) · Wiktionary: [endereço](https://en.wiktionary.org/wiki/endere%C3%A7o), [endereçar](https://en.wiktionary.org/wiki/endere%C3%A7ar), [address](https://en.wiktionary.org/wiki/address), [Internet](https://en.wiktionary.org/wiki/Internet), [resolvo](https://en.wiktionary.org/wiki/resolvo), [hexadecimal](https://en.wiktionary.org/wiki/hexadecimal)
