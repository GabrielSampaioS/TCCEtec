const coon = require('../db/dbSetup') //importar conexão

class UserCadastro{
    constructor(nome){
        this.nome = nome;
    }

    static async CadastrarNovoUser(nome, senha, email){
        const query = "INSERT INTO usuario (nome, senha, email) VALUES (?, ?, ?)"
        try{
            await coon.promise().query(query, [nome, senha, email])
        } catch (err){
            console.log(err);
            throw new Error("Erro ao cadastrar novo user")
        }
    }
}