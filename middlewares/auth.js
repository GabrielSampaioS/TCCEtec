function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        return next();          // Usuário está autenticado, prossiga
    } else {
        res.redirect('/');      // Redireciona para a página de login
    }
}

module.exports = { isAuthenticated };
