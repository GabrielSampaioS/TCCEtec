<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #mensagem {
            width: 300px;
        }
        #msmChat {
            border: 1px solid #ddd;
            padding: 10px;
            height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <h1>Chat</h1>
    <!-- Exibe o nome do usuário, se disponível -->
    <p>Olá, <span id="usuario"><?php echo htmlspecialchars($_SESSION['usuario']); ?></span></p>
    
    <label for="mensagem">Nova mensagem: </label>
    <input type="text" id="mensagem" placeholder="Digite a mensagem..."><br>
    <input type="button" onclick="enviar()" value="Enviar"><br>

    <!-- Área onde as mensagens serão exibidas -->
    <div id="msmChat"></div>

    <script>
        // Obtém o elemento para exibir as mensagens do chat
        const mensagemChat = document.getElementById("msmChat");

        // Obtém o nome do usuário
        const usuario = document.getElementById("usuario").textContent.trim();

        // Endereço do WebSocket - deve corresponder ao servidor WebSocket
        const ws = new WebSocket('ws://localhost:8081');

        // Evento disparado quando a conexão WebSocket é estabelecida
        ws.onopen = () => { 
            console.log('Conectado ao WebSocket');
            
            // Envia o nome do usuário para o servidor WebSocket assim que a conexão é aberta
            ws.send(JSON.stringify({ tipo: 'nameUser', name: usuario }));
        };

        // Evento disparado quando uma nova mensagem é recebida do servidor WebSocket
        ws.onmessage = (event) => {
            try {
                // Converte a mensagem recebida de JSON para objeto JavaScript
                let res = JSON.parse(event.data);
                
                // Verifica o conteúdo exato de res
                console.log('Conteúdo completo de res:', res);
                
                // Acessa a mensagem dentro do objeto res
                let mensagemStr = res.mensagem;
                console.log('Conteúdo de res.mensagem:', mensagemStr);

                // Adiciona a nova mensagem ao chat
                mensagemChat.insertAdjacentHTML('beforeend', `<div class="mensagem"><strong>${res.user}:</strong> ${mensagemStr}</div>`);
                
                // Faz o chat rolar automaticamente para o final quando novas mensagens são adicionadas
                mensagemChat.scrollTop = mensagemChat.scrollHeight;
            } catch (e) {
                console.error('Erro ao processar a mensagem:', e);
            }
        };





        // Função para enviar a mensagem digitada pelo usuário
        const enviar = () => {

            let mensagem = document.getElementById("mensagem").value.trim();
           
            if (mensagem) {
                // Cria o objeto de dados a ser enviado para o servidor WebSocket
                let dados = {
                    user: usuario,
                    mensagem: mensagem
                };

                // Envia a mensagem como uma string JSON
                ws.send(JSON.stringify(dados));

                // Limpa o campo de entrada de mensagem
                document.getElementById("mensagem").value = '';
            } else {
                console.warn('Mensagem não pode ser vazia.');
            }
        };
    </script>
</body>
</html>
