const conn = require('../config/config') //importar conexão

class User {
    constructor(nome) {
        this.nome = nome;
    }

    static async CadastrarNovoUser(nome, senha, email) {
        const query = "INSERT INTO usuario (nomeUsuario, senha, email) VALUES (?, ?, ?)";
        try {
            // Aqui você deve passar os valores das variáveis, e não os nomes delas como strings
            await conn.promise().query(query, [nome, senha, email]);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY'){
                throw new Error("Este email já está em uso. Por favor, escolha outro."); // Melhorar e apresentar esta msm para o user 
                 
            }
            throw new Error("Erro ao cadastrar novo usuário");
        }
    }

    // Login do usuário
    static async Login(nome, senha) {
        const query = "SELECT * FROM usuario WHERE nomeUsuario = ? AND senha = ?"; // Consultar o nome e senha fornecidos

        try {
            const [rows] = await conn.promise().query(query, [nome, senha]);

            if (rows.length > 0) {
                // Se o usuário for encontrado, login bem-sucedido
                return { success: true, message: "Login bem-sucedido!" };
            } else {
                // Se o nome de usuário ou senha estiverem incorretos
                return { success: false, message: "Nome de usuário ou senha incorretos. Tente novamente." };
            }
        } catch (err) {
            console.log(err);
            return { success: false, message: "Erro ao tentar fazer login. Tente novamente." };
        }
    }
}

module.exports = User;
