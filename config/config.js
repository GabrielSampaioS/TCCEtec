// Importa o módulo mysql2 para conexão com o banco de dados MySQL
const mysql = require('mysql2');

// Cria a conexão com o banco de dados utilizando as credenciais fornecidas
const conn = mysql.createConnection({
  host: 'localhost',             // Endereço do servidor MySQL
  user: 'root',                  // Nome de usuário para conexão com o banco
  password: '',                  // Senha do usuário
  database: ''                   // Nome do banco de dados
});

// Conecta ao banco de dados e lida com erros de conexão
conn.connect((err) => {
  if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);  
      return;
  }
  console.log('Conectado ao banco de dados.');  
});

module.exports = conn;
