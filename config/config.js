//Utilizando na aplicação para realizar as atulizações nas tabelas 

const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

conn.connect((err) => {
  if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
  }
  console.log('Conectado ao banco de dados.');
});

module.exports = conn;
