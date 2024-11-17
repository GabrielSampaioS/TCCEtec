const user = require('../models/cadastro')


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
        // Chama a função de login passando nome e senha
        const respostaLogin = await user.Login(nome, senha);
        console.log(respostaLogin)

        if (respostaLogin.success) {
            res.redirect('/chat');  
        } else {
            res.render('login/login', { errorMessage: respostaLogin.message }); // Mostar para o ususario que o login n foi sucedido
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao tentar fazer login');
    }
};

