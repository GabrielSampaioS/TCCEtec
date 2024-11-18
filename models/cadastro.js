const conn = require('../config/config');
const bcrypt = require('bcrypt');

class User {
    constructor(nome) {
        this.nome = nome;
    }

    // Cadastrar novo usuário
    static async CadastrarNovoUser(nome, senha, email) {
        const query = "INSERT INTO usuario (nomeUsuario, senha, email) VALUES (?, ?, ?)";
        try {
            // Gera o hash da senha antes de salvar no banco
            const hashedPassword = await bcrypt.hash(senha, 10);

            await conn.promise().query(query, [nome, hashedPassword, email]);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') { // Nome ou e-mail duplicado
                throw new Error("Este email ou nome de usuário já está em uso. Por favor, escolha outro.");
            }
            throw new Error("Erro ao cadastrar novo usuário.");
        }
    }

    // Login do usuário
    static async Login(nome, senha) {
        const query = "SELECT * FROM usuario WHERE nomeUsuario = ?";
        try {
            const [rows] = await conn.promise().query(query, [nome]);

            if (rows.length > 0) {
                const user = rows[0];

                // Verifica se a senha fornecida corresponde ao hash armazenado
                const isMatch = await bcrypt.compare(senha, user.senha);

                if (isMatch) {
                    return { success: true, message: "Login bem-sucedido!" };
                } else {
                    return { success: false, message: "Senha incorreta. Tente novamente." };
                }
            } else {
                return { success: false, message: "Usuário não encontrado. Tente novamente." };
            }
        } catch (err) {
            console.log(err);
            return { success: false, message: "Erro ao tentar fazer login. Tente novamente." };
        }
    }
}

module.exports = User;
