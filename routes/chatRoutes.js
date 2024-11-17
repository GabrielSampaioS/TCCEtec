const express = require('express');
const router = express.Router();
const path = require('path');

// Define uma rota para a página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'chat.html'));
  });
  
module.exports = router;
