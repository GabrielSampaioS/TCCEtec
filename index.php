<?php
session_start();

// Limpa o buffer de saída para evitar problemas com cabeçalhos duplicados
ob_start();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Chat</title>
</head>
<body>
    <?php
    // Verifica se o formulário foi submetido
    $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    if (!empty($dados['acessar'])) {
        // Verifica se o campo 'usuario' está preenchido
        if (!empty($dados['user'])) {
            // Armazena o nome do usuário na sessão
            $_SESSION['usuario'] = htmlspecialchars($dados['user'], ENT_QUOTES, 'UTF-8');

            // Redireciona para a página do chat
            header('Location: Telachat.php');
            exit; // Assegura que o script seja interrompido 
        }
    }
    ?>

    <h1>Acesse o Chat</h1>

    <form method="POST" action="">
        <label for="user">Nome: </label>
        <input type="text" name="user" id="user" placeholder="Digite o nome de usuário" required>

        <input type="submit" name="acessar" value="Acessar">
    </form>
</body>
</html>
