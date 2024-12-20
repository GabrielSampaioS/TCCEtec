const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuthenticated }= require ('../middlewares/auth')
const chatController = require('../controllers/chatController')

// Protege a rota do chat
router.get('/', isAuthenticated, chatController.chatPage)

router.post('/mensagem', isAuthenticated, chatController.addMensagem)

module.exports = router;
