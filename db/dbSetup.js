const connection = require('../config/config');

const createDatabaseAndTables = () => {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS chat_db`;
  
  // Criação do banco de dados
  connection.query(createDatabaseQuery, (err, result) => {
    if (err) {
      console.error('Erro ao criar o banco de dados:', err);
      return;
    }
    console.log('Banco de dados "chat_db" criado ou já existe.');

    // Selecionar o banco de dados criado
    connection.changeUser({ database: 'chat_db' }, (err) => {
      if (err) {
        console.error('Erro ao selecionar o banco de dados:', err);
        return;
      }

      // Criação das tabelas
      const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS usuario (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(60) NOT NULL,
        senha VARCHAR(20) NOT NULL,
        nomeUsuario VARCHAR(20) NOT NULL,
        excluído BOOLEAN NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS admin (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(60) NOT NULL,
        senha VARCHAR(20) NOT NULL,
        nomeAdmin VARCHAR(20) NOT NULL,
        excluído BOOLEAN NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS mensagem (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        mensagem VARCHAR(255) NOT NULL,
        enviado_por VARCHAR(20) NOT NULL,
        excluído BOOLEAN NOT NULL DEFAULT 0
        );

      `;

      // Executar a criação das tabelas
      connection.query(createTablesQuery, (err, result) => {
        if (err) {
          console.error('Erro ao criar tabelas:', err);
          return;
        }
        console.log('Tabelas criadas ou já existem.');
      });
    });
  });
};

module.exports = createDatabaseAndTables;
