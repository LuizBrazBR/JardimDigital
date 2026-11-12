---
title: Roteador
---

> [!abstract] Definição
> **O aparelho que liga duas redes, como a da sua casa e a internet, e escolhe para onde vai cada pacote.** Como fica entre as duas, ele tem um [[glossario/endereco-ip|endereço IP]] de cada lado: um interno, que vale só dentro da casa, e um público, que a operadora dá e que vale na internet inteira.

Em casa, o roteador faz três trabalhos. Ele empresta um IP privado a cada aparelho que entra na rede, como `192.168.0.57`, num serviço chamado DHCP. Ele fala por todos esses aparelhos com o IP público, e essa troca de endereços se chama NAT. E, quando a resposta volta, ele a entrega ao aparelho que pediu. Para os computadores da casa, o roteador é o **gateway**, o portão de saída da rede. No Windows, o IP interno dele aparece no `ipconfig` como **Gateway Padrão**.

Não é o mesmo que o [[glossario/modem|modem]], que só traduz o sinal da operadora. No Brasil, os dois costumam vir num aparelho só, e quase todo mundo chama esse aparelho de "modem". Ver a aula [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|1.4 Endereços na internet: IP, DNS e porta]].

## De onde vem a palavra

De **rota**, que veio do francês antigo *rote*, do latim *(via) rupta*, "caminho rompido": um caminho aberto à força. *Ruptus* é "rompido", o mesmo de **ruptura** e **romper**. O roteador escolhe a rota de cada pacote. Em inglês, *router*, de *route*.

Fontes: Wiktionary: [route](https://en.wiktionary.org/wiki/route), [rota](https://en.wiktionary.org/wiki/rota)
