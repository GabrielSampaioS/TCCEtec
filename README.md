## Chat Application

## Descrição
Este projeto é uma aplicação de chat desenvolvida em Node.js com Handlebars para renderização do front-end e MySQL como banco de dados. A aplicação permite que usuários se registrem, façam login e enviem mensagens.

## Funcionalidades
- Registro de usuários e autenticação.
- Persistência de sessões de usuários.
- Envio de mensagens com armazenamento em banco de dados.
- Interface responsiva utilizando Handlebars e CSS.
- Estrutura inicial do banco de dados é configurada automaticamente com o arquivo `dbSetup.js`.

---

## Requisitos

### Dependências do Sistema:
1. [Node.js](https://nodejs.org/) 
2. [MySQL](https://www.mysql.com/) 

### Dependências do Projeto:
As principais dependências usadas neste projeto incluem:
- `express`
- `express-session`
- `mysql2`
- `express-handlebars`
- `dotenv`
- `bcrypt` (para hashing de senhas)

---

## Configuração

### 1. Clonando o Repositório

git clone <https://github.com/GabrielSampaioS/TCCEtec>


### 2. Instalando Dependências

npm install


### 3. Configurando o Banco de Dados
Crie um arquivo `.env` no diretório raiz e configure as credenciais do MySQL:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=3306
DB_DATABASE=chat_db

Ou apenas utilize o arquivo config/config.js para realizar as configurações 

### 4. Executando as Migrações do Banco
O arquivo `dbSetup.js` cuidará da criação do banco de dados e tabelas automaticamente. Execute o seguinte comando:

## Executando o Projeto

### 1. Iniciando o Servidor
Execute o comando abaixo para iniciar o servidor local:

npm start

O servidor estará disponível em: [http://localhost:3000](http://localhost:3000)

### 2. Estrutura de Diretórios
Aqui está um resumo da estrutura principal do projeto:

```
├── config/
│   ├── config.js            # Configuração do banco de dados
├── controllers/
│   ├── chatController.js    # Lógica de rotas do chat
│   ├── loginController.js   # Lógica de rotas de login/cadastro
├── db/
│   ├── dbSetup.js           # Criação automática do banco de dados
├── middlewares/
│   ├── auth.js              # Middleware de autenticação
├── models/
│   ├── cadastro.js          # Modelos para interagir com o banco
├── public/
│   ├── style.css            # Estilos do front-end
├── routes/
│   ├── chatRoutes.js        # Rotas do chat
│   ├── loginRoutes.js       # Rotas de login/cadastro
├── views/
│   ├── layouts/
│   │   ├── main.handlebars  # Layout base
│   ├── login/
│   │   ├── cadastro.handlebars # Página de cadastro
│   │   ├── login.handlebars    # Página de login
│   ├── chat.handlebars       # Página do chat
├── index.js                 # Arquivo principal do servidor
├── README.md                # Instruções do projeto
```

---

## Rotas Disponíveis

### Rotas Públicas
- **`GET /`**: Página de login.
- **`GET /cadastro`**: Página de registro de usuários.
- **`POST /login`**: Autenticação de usuário.

### Rotas Protegidas (Requer Login)
- **`GET /chat`**: Página principal do chat.
- **`POST /mensagem`**: Envio de mensagens.

---

## Melhorias Planejadas
1. Implementar o chat numa aplicação real e observar as limitações e sugerir melhorias
2. Adicionar um sistema de administração para monitorar usuários e mensagens.
3. Melhorar a interface visual com frameworks CSS como Bootstrap ou Tailwind.
4. Migrar para um sistema de autenticação JWT para escalabilidade.
5. Realizar a criação de um botão "sair" finalizando a sesseion

---

## Licença
Este projeto é open-source e pode ser usado livremente.

---