const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// Cria a instância do Express
const app = express();
const PORT = 8080; // Use a mesma porta para HTTP e WebSocket

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Inicia o servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Configura o WebSocket utilizando o mesmo servidor HTTP
const wss = new WebSocket.Server({ server });

let clients = [];

// Lida com conexões WebSocket
wss.on('connection', (ws) => {
  let user = 'Anônimo';

  ws.on('message', (message) => {
    const data = JSON.parse(message);


    // Se a mensagem for o nome do usuário
    if (data.tipo === 'nameUser') {
      user = data.name;
    } else {
      // Envia a mensagem para todos os clientes conectados
      const messageToSend = JSON.stringify({
        user: user || 'Anônimo',
        mensagem: data.mensagem
      });

      clients.forEach(client => {
        // client !== ws && para não aparecer para quem enviou
        if (client.readyState === WebSocket.OPEN) { 
          client.send(messageToSend);
        }
      });
    }
  });

  // Adiciona o novo cliente à lista
  clients.push(ws);

  ws.on('close', () => {
    // Remove o cliente quando desconectar
    clients = clients.filter(client => client !== ws);
  });
});

// Define uma rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
