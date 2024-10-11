// controllers/chatController.js
const WebSocket = require('ws');

let clients = [];

const setupWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

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
          mensagem: data.mensagem,
        });

        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(messageToSend);
          }
        });
      }
    });

    // Adiciona o novo cliente à lista
    clients.push(ws);

    ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
    });
  });
};

module.exports = {
  setupWebSocketServer,
};
