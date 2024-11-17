// Importa o módulo WebSocket para permitir comunicação em tempo real
const WebSocket = require('ws');

// Array para armazenar os clientes conectados ao WebSocket
let clients = [];

// Função para configurar o servidor WebSocket
const setupWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });         // Cria o servidor WebSocket passando o servidor HTTP

  // Evento que é acionado quando um novo cliente se conecta
  wss.on('connection', (ws) => {
    let user = 'Anônimo';    
                               
    // Evento para lidar com as mensagens enviadas pelo cliente
    ws.on('message', (message) => {
      const data = JSON.parse(message);                 
      if (data.tipo === 'nameUser') {
        user = data.name;                               
      } else {
        const messageToSend = JSON.stringify({
          user: user || 'Anônimo',   
          mensagem: data.mensagem,   
        });

        // Envia a mensagem para todos os clientes conectados e com o WebSocket aberto
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(messageToSend);  
          }
        });
      }
    });

    // Adiciona o novo cliente à lista de clientes conectados
    clients.push(ws);

    // Evento que é acionado quando um cliente desconecta
    ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
    });
  });
};

// Função para renderizar a página do chat, apenas para usuários autenticados
const chatPage = (req, res) => {
  try {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.isAuthenticated) {
      res.render('chat', { usuario: req.session.user.nome });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err.message);  
    res.status(500).send('Erro ao carregar a página do chat');  
  }
};

module.exports = { 
  setupWebSocketServer, chatPage 
};
