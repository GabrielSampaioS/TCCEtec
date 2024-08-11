<?php
// Inclui o autoload do Composer para carregar as classes das dependências
require 'vendor/autoload.php'; 

// Importa as classes necessárias da biblioteca Ratchet
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Api\Websocket\Chat;

// Cria e configura o servidor WebSocket
$server = IoServer::factory(
    // Cria um servidor HTTP que suporta WebSocket
    new HttpServer(
        // Envolva o servidor WebSocket com a implementação de chat
        new WsServer(
            new Chat() // Instância da classe Chat que lida com as mensagens e conexões
        )
    ),
    8081 // Porta na qual o servidor escuta por conexões
);

// Inicia o servidor
$server->run();
