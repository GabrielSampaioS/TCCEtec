const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const createDatabaseAndTables = require('./db/dbSetup');

//Rotas
const chatRoutes = require('./routes/chatRoutes');


// Cria a instância do Express
const app = express();
const PORT = 3000; // Use a mesma porta para HTTP e WebSocket

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


// COnectar e criar banco
// N conseguir rodar de forma automatica pegar o scprit e rodar manualmente no Mysql
createDatabaseAndTables();


// Usar rotas
app.use('/', chatRoutes); // Adicione isso para usar as rotas
 
// Inicia o servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})

// Adiciona o servidor WebSocket ao servidor HTTP
const { setupWebSocketServer } = require('./controllers/chatController');
setupWebSocketServer(server);  // Passa o servidor HTTP para o WebSocket


