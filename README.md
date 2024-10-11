# Chat WebSocket com Autenticação Simples

Este projeto é uma aplicação de chat em tempo real desenvolvida com Node.js, Express, WebSocket e autenticação simples. O sistema permite que os usuários façam login e enviem mensagens de chat para outros usuários conectados. Apenas usuários autenticados podem acessar a página de chat.

## Funcionalidades

- **Autenticação simples**: O usuário deve fazer login para acessar o chat.
- **WebSocket**: Mensagens enviadas em tempo real para todos os usuários conectados.
- **Verificação de autenticação**: O usuário é redirecionado para a tela de login se tentar acessar o chat sem estar autenticado.
- **Interface de usuário**: Pagina de chat simples e funcional para enviar e receber mensagens.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para construir o servidor.
- **Express**: Framework para gerenciamento de rotas e middleware.
- **WebSocket**: Protocolo para comunicação em tempo real.
- **HTML/CSS/JavaScript**: Para o front-end da aplicação.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado na sua máquina.

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/chat-websocket.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd chat-websocket
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Inicie o servidor:**

   ```bash
   node index.js
   ```

5. **Acesse a aplicação:**

   No navegador, abra o seguinte endereço:

   ```
   http://localhost:3000
   ```

### Estrutura do Projeto

```
├── public
│   ├── chat.html       # Página do chat em tempo real
│   ├── login.html      # Página de login
│   ├── style.css       # Estilos para o front-end
├── routes
│   ├── chatRoutes.js   # Rotas para a aplicação
├── index.js            # Arquivo principal do servidor
├── package.json        # Dependências do projeto
└── README.md           # Instruções do projeto
```

### Funcionalidades Detalhadas

- **Login (`login.html`)**: 
  - O usuário deve inserir um nome de usuário e uma senha. Quando o formulário é enviado, o nome de usuário e a senha são validados (validação básica), e o status de autenticação é salvo no `localStorage` do navegador.
  
- **Página de Chat (`chat.html`)**:
  - Os usuários autenticados podem acessar a página de chat. Caso o usuário não esteja autenticado, ele será redirecionado para a página de login.
  - As mensagens enviadas pelo WebSocket são exibidas em tempo real para todos os usuários conectados.

### Melhorias Futuras

- Implementar um banco de dados para armazenamento de usuários e autenticação.
- Adicionar uma camada de segurança com tokens de sessão (JWT).
- Melhorar a interface de usuário com frameworks como React ou Vue.js.
- Adicionar um histórico de mensagens no chat.
- Realizaar a separação dos arquivos num modedlo MVC com handlebars

### Contribuições

Sinta-se à vontade para enviar pull requests ou abrir issues caso encontre problemas ou queira sugerir melhorias.

---

**Desenvolvido por:** 