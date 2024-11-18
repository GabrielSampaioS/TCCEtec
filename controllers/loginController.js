const user = require('../models/cadastro')
const { isAuthenticated } = require('../middlewares/auth');



exports.loginPage = async (req, res) =>{
    try{
        res.render('login/login')
    }catch(err){
        res.status(500).send('Erro ao localizar formulario de login')
    }
}

exports.formularioNovoUser = async (req, res) => {
    try{
        res.render('login/cadastro')
    }catch(err){
        res.status(500).send('Erro ao localizar formulario de cadastro')
    }
}

exports.cadastrarUser = async (req, res) => {
    const nome = req.body.nome; //o req.body localiza os lementos pelo name, não ID
    const senha = req.body.senha;
    const email = req.body.email;
    try {
        await user.CadastrarNovoUser(nome, senha, email);  // Chamando a função para cadastrar o usuário
        res.render('login/login');  // Redireciona para a página de login após o cadastro
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao cadastrar novo usuário');
    }
}

// Função para fazer login
exports.loginUser = async (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    try {
        // Verifica as credenciais no banco de dados
        const respostaLogin = await user.Login(nome, senha);

        if (respostaLogin.success) {    
            // Armazena as informações do usuário na sessão
            req.session.user = {
                nome: nome,                 // Nome do usuário
                isAuthenticated: true       // Marca como autenticado
            }

            // Redireciona para o chat
            res.redirect('/chat'); // Redireciona para o chat
        } else {
            // Renderiza a página de login com uma mensagem de erro
            res.render('login/login', { errorMessage: respostaLogin.message });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao tentar fazer login');
    }
}

exports.loginAnonimoUser = async (req, res) => {
    req.session.user = {
        nome : "Anonimo",
        isAuthenticated: true
    }

    res.redirect('/chat')
}

;

