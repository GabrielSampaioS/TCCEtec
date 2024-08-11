# Projeto de Chat em PHP com WebSocket para TCC ETEC

Este projeto é uma aplicação de chat em tempo real usando PHP, WebSocket e a biblioteca Ratchet. O sistema permite que os usuários enviem e recebam mensagens em tempo real através de uma interface web.

## Requisitos

- PHP 7.4 ou superior
- Composer (para gerenciar dependências)
- Web Server (por exemplo, Apache ou Nginx)
- WebSocket Server (implementado com Ratchet)

## Estrutura do Projeto

O projeto é composto pelos seguintes arquivos:

- `index.php`: Página de acesso onde o usuário insere seu nome para acessar o chat.
- `telachat.php`: Interface do chat onde as mensagens são enviadas e recebidas.
- `servidor_Chat.php`: Script para iniciar o servidor WebSocket.
- `Chat.php`: Classe que define o comportamento do chat e a comunicação WebSocket.

## Instalação

### 1. Clonando o Repositório

Clone o repositório para o seu ambiente local:

git clone <URL_DO_REPOSITORIO>


### 2. Instalando Dependências

Instale as dependências do projeto usando Composer:

composer install


### 3. Configurando o Servidor WebSocket

Certifique-se de que o `servidor_Chat.php` esteja configurado corretamente e escutando na porta desejada (neste exemplo, porta 8081).

### 4. Configuração do Servidor Web

Coloque os arquivos `index.php` e `telachat.php` no diretório raiz do seu servidor web (por exemplo, `htdocs` no XAMPP ou `www` no WAMP).

## Uso

### 1. Iniciando o Servidor WebSocket

Abra um terminal e inicie o servidor WebSocket com o comando:

php servidor_Chat.php


Isso iniciará o servidor WebSocket na porta 8081. Certifique-se de que essa porta esteja disponível e não esteja bloqueada por um firewall.

### 2. Acessando a Aplicação

Abra um navegador e acesse `http://localhost/index.php`. Você verá um formulário para inserir seu nome de usuário.

### 3. Usando o Chat

Após preencher o nome de usuário e clicar em "Acessar", você será redirecionado para a página de chat (`telachat.php`). Aqui, você pode enviar e receber mensagens em tempo real.

## Funcionalidade

- **`index.php`**: Página de login onde o usuário insere seu nome para acessar o chat.
- **`telachat.php`**: Página principal do chat com uma interface simples para enviar e receber mensagens.
- **`servidor_Chat.php`**: Script para iniciar o servidor WebSocket que lida com as conexões e mensagens.
- **`Chat.php`**: Classe que gerencia as conexões dos clientes e a transmissão de mensagens.

## Contribuindo

Se você deseja contribuir para o projeto, por favor, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b minha-contribuicao`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona minha contribuição'`).
4. Faça push para a branch (`git push origin minha-contribuicao`).
5. Crie um pull request.

## Licença


---

