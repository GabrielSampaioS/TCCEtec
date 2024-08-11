<?php

namespace Api\Websocket;

use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\MessageComponentInterface;
use SplObjectStorage;

class User
{
    public $name;

    public function __construct($name)
    {
        $this->name = $name;
    }
}

class Chat implements MessageComponentInterface
{
    // Armazena a lista de usuários conectados
    protected $usuarios;

    public function __construct()
    {
        // Inicializa o objeto para armazenar as conexões dos usuários
        $this->usuarios = new SplObjectStorage();
    }

    // Método chamado quando uma nova conexão é estabelecida
    public function onOpen(ConnectionInterface $conn)
    {
        // Inicializa o usuário com um nome padrão
        $user = new User('Anônimo');
        // Adiciona o novo usuário à lista de usuários conectados
        $this->usuarios->attach($conn, $user);
        echo "--------------------------------\n";
        echo "onOpen()\n";
        echo "Novo cliente adicionado:\n";
        echo "Name: $user->name\n";
        echo "Conn: {$conn->resourceId}\n";
        echo "--------------------------------\n";
    }

    // Método chamado quando uma mensagem é recebida de um cliente
    public function onMessage(ConnectionInterface $from, $msg)
    {
        // Obtém o usuário correspondente à conexão
        $user = $this->usuarios->offsetGet($from);

        // Exibe informações do usuário
        echo "--------------------------------\n";
        echo "onMessage()\n";
        echo "Name: $user->name\n";
        echo "Conn: {$from->resourceId}\n";

        $data = json_decode($msg, true);

        //Entra apos realizar o login, para add name ao user->name
        if ($data && isset($data['tipo']) && $data['tipo'] === 'nameUser') {
            $user->name = $data['name'];
            echo "Alterando user->name para: $user->name\n";
            echo "--------------------------------\n";

        //Msm
        } else {

            //Criar nova estrura, a qual estava sendo enviada pelo fornt não estava retornando
            $msmEnviar = [
                'user' => $user->name ?: 'Anônimo',
                'mensagem' => $data['mensagem']
            ];

            // Envia a mensagem recebida para todos os clientes conectados, exceto o remetente
            foreach ($this->usuarios as $conn) {
                if ($from !== $conn) {
                    $conn->send(json_encode($msmEnviar)); 
                }
            }
            
            echo "Conn: {$from->resourceId} | Name: {$user->name} enviou a mensagem: {$msg}\n";

            echo "--------------------------------\n";
        }
    }

    // Método chamado quando uma conexão é fechada
    public function onClose(ConnectionInterface $conn)
    {
        // Obtém o usuário correspondente à conexão
        $user = $this->usuarios->offsetGet($conn);

        // Remove o usuário da lista de usuários conectados
        $this->usuarios->detach($conn);

        // Exibe informações do usuário
        echo "--------------------------------\n";
        echo "onClose()\n";
        echo "Usuário desconectado:\n";
        echo "Usuário: {$user->name}\n";
        echo "Conn: {$conn->resourceId}\n";
        echo "--------------------------------\n";
    }

    // Método chamado quando ocorre um erro em uma conexão
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        // Exibe a mensagem de erro
        echo "Erro: {$e->getMessage()}\n";
        
        // Obtém o usuário correspondente à conexão (se possível)
        if ($this->usuarios->contains($conn)) {
            $user = $this->usuarios->offsetGet($conn);
            echo "--------------------------------\n";
            echo "onError()\n";
            echo "Usuário: {$user->name}\n";
            echo "Conn: {$conn->resourceId}\n";
            echo "--------------------------------\n";
        }
        
        $conn->close();
    }
}
