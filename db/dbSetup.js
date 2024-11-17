//Utilziado para criar a estrutura inicial da aplicação


const { query } = require('express');
const conn = require('../config/config');


const createDatabaseAndTables = () => {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS chat_db`;
  
  // Criação do banco de dados
  conn.query(createDatabaseQuery, (err, result) => {
    if (err) {
      console.error('Erro ao criar o banco de dados:', err);
      return;
    }
    console.log('Banco de dados "chat_db" criado ou já existe.');

    // Selecionar o banco de dados criado
    conn.changeUser({ database: 'chat_db' }, (err) => {
      if (err) {
        console.error('Erro ao selecionar o banco de dados:', err);
        return;
      }

      // Criação das tabelas

      const tables = [
        {
          name: 'usuario',
          query:`
            CREATE TABLE IF NOT EXISTS usuario (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(60) NOT NULL UNIQUE,
            senha VARCHAR(20) NOT NULL,
            nomeUsuario VARCHAR(20) NOT NULL UNIQUE,
            excluído BOOLEAN NOT NULL DEFAULT 0
            )`
        },
        {
          name: 'admin',
          query:`        
            CREATE TABLE IF NOT EXISTS admin (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(60) NOT NULL UNIQUE,
            senha VARCHAR(20) NOT NULL,
            nomeAdmin VARCHAR(20) NOT NULL UNIQUE,
            excluído BOOLEAN NOT NULL DEFAULT 0
            )`
        },
        {
          name: 'mensagem',
          query: `
            CREATE TABLE IF NOT EXISTS mensagem (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            mensagem VARCHAR(255) NOT NULL,
            enviado_por VARCHAR(20) NOT NULL,
            excluído BOOLEAN NOT NULL DEFAULT 0
            )`
        }
      ]
        
      // Executar a criação das tabelas

      tables.forEach(tables => {
        conn.query(tables.query, (err, result) => {
          if (err){
            console.log(`Erro ao criar a tabela ${tables.name}`, err)
          } else {
            console.log(`Tabela ${tables.name} criada ou já existe.`)
          }
        })
      })

    });
  });
};

module.exports = createDatabaseAndTables;
