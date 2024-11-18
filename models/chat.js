const conn = require('../config/config');

class Chat {
    constructor(nome) {
        this.nome = nome;
    }

    // Inserir mensagem
    static async insertMensagem(nomeUser, mensagem) {
        try {
            // 1. Buscar o ID do usuário pelo nome
            
            const [userResult] = await conn.promise().query("SELECT * FROM usuario WHERE nomeUsuario = ?", [nomeUser]);

            if (userResult.length === 0) {
                throw new Error('Usuário não localizado');
            }

            const userId = userResult[0].ID;

            // 2. Inserir a mensagem na tabela mensagem com o ID do usuário
            const query = "INSERT INTO mensagem (mensagem, IdUser) VALUES (?, ?)";
            await conn.promise().query(query, [mensagem, userId]);

            console.log("Mensagem inserida com sucesso!");
        } catch (error) {
            console.error("Erro ao inserir mensagem:", error);
        }
    }
}

module.exports = Chat;
