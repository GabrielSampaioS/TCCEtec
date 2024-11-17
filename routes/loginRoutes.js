const express = require('express');
const router = express.Router();
const path = require('path');
const loginController = require('../controllers/loginController')

// Define uma rota para a página principal
router.get('/', loginController.loginPage);

router.get('/cadastro', loginController.formularioNovoUser )

router.post('/cadastro', loginController.cadastrarUser)

router.post('/login', loginController.loginUser)
  
module.exports = router;
