module.exports = function (app) {
    var usuario = app.controllers.usuario;

    app.get('/usuario/login', isLoggedIn, usuario.login);
    app.post('/usuario/login/processa', isLoggedIn,usuario.loginAction);
}

var isLoggedIn = function(req, res, next){
    if(typeof(req.session.usuario)!= "undefined"){
        if(req.session.usuario != ""){
            res.redirect('/');
        }
        next();
    }
}