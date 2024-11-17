// Importa os módulos necessários
const express = require('express');                         // Framework para criar servidor web
const WebSocket = require('ws');                            // Biblioteca para WebSocket
const exphbs = require('express-handlebars');               // Template engine Handlebars
const path = require('path');                               // Para lidar com caminhos de arquivos
const createDatabaseAndTables = require('./db/dbSetup');    // Função para configurar banco de dados

// Cria a instância do Express
const app = express();
const PORT = 3000;                                          

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));    // Define a pasta 'public' como repositório de arquivos estáticos

// Configura Handlebars como o mecanismo de template e define partials
const hbs = exphbs.create({
  partialsDir: ['views/partials'],                          // Define a pasta para os templates parciais
});

app.engine('handlebars', hbs.engine);                       // Configura o Handlebars como o template engine
app.set('view engine', 'handlebars');                       // Define Handlebars como o engine padrão

// Middleware para analisar dados de formulários (URL-encoded)
app.use(
  express.urlencoded({
    extended: true,                                         // Permite parsing de objetos complexos no corpo das requisições
  })
);

// Conecta ao banco de dados e cria tabelas
createDatabaseAndTables();                                 

// Importa as rotas
const chatRoutes = require('./routes/chatRoutes');          // Rotas relacionadas ao chat
const loginRoutes = require('./routes/loginRoutes');        // Rotas relacionadas ao login

// Configura as rotas no aplicativo
app.use('/', loginRoutes);                                  // Define as rotas de login como a raiz '/'
app.use('/chat', chatRoutes);                               // Define as rotas de chat no caminho '/chat'

// Inicia o servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);        
});

// Configura o WebSocket no servidor HTTP
const { setupWebSocketServer } = require('./controllers/chatController'); 
setupWebSocketServer(server);                                // Passa o servidor HTTP para o WebSocket
