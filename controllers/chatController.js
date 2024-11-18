// Importa o módulo WebSocket para permitir comunicação em tempo real
const WebSocket = require('ws');

const chat = require('../models/chat')


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

        // Salva a mensagem no banco de dados
        chat.insertMensagem(user, data.mensagem)
          .then(() => {
            console.log("Mensagem salva no banco com sucesso!");
          })
          .catch(err => {
            console.error('Erro ao salvar mensagem no banco:', err);
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

const addMensagem = (req, res) => {
  try {
    if (req.session.user && req.session.user.isAuthenticated) {
      const { mensagem } = req.body; // A mensagem que veio do formulário ou da requisição POST

      if (mensagem) {
        // Insere a mensagem no banco, associando com o usuário autenticado
        chat.insertMensagem(req.session.user.nome, mensagem)
          .then(() => {
            res.status(200).send({ message: 'Mensagem enviada com sucesso!' });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Erro ao tentar enviar a mensagem');
          });
      } else {
        res.status(400).send('Mensagem não fornecida');
      }
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao tentar enviar mensagem');
  }
};


module.exports = { 
  setupWebSocketServer, chatPage , addMensagem
};
