---
title: DNS
---

> [!abstract] Definição
> **O sistema que troca o nome de um site pelo [[glossario/endereco-ip|endereço IP]] do computador onde ele está: a lista de contatos da internet.** Sigla do inglês *Domain Name System*, "sistema de nomes de domínio".

Trocar o nome pelo número se chama **resolver** o nome. Ninguém tem a lista inteira: cada [[glossario/dominio|domínio]] tem o seu servidor **autoritativo**, que dá a resposta oficial, e a busca vai da raiz ao final do nome (`.br`) e dele ao domínio, da direita para a esquerda. Quase sempre, porém, a resposta já está guardada num [[glossario/cache|cache]], do navegador, do sistema ou do **resolvedor** da operadora. Cada resposta vem com um **TTL**, o tempo que ela pode ficar guardada. Ver as aulas [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|1.2 O que acontece quando você digita uma URL e aperta Enter]] e [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|1.4 Endereços na internet: IP, DNS e porta]].

## De onde vem a palavra

O DNS foi criado em 1983 por Paul Mockapetris, para substituir um arquivo só, o `HOSTS.TXT`, que cada computador da rede baixava. **Domínio** vem do latim *dominium*, "propriedade", de *dominus*, "dono": um nome que tem dono. **Resolver** vem do latim *resolvere*, "desatar, soltar".

Fontes: Wikipedia: [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) · Wiktionary: [dominium](https://en.wiktionary.org/wiki/dominium), [resolvo](https://en.wiktionary.org/wiki/resolvo)
