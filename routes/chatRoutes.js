const express = require('express');
const router = express.Router();
const path = require('path');

// Define uma rota para a página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
   // res.sed("<h1>Teste</h1>")
  });
  
module.exports = router;
