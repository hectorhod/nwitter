module.exports = function(app){
    var UsuarioController = {
        login: function(req, res){
            res.render('usuario/login');
        },

        loginAction: function(req, res){
            req.assert(['usuario', 'emal'], 'Insira um email').notEmpty();
            req.assert(['usuario', 'senha'], 'Inisra uma senha de no mínimo 8 caracteres').len(8, 20);

            var errors = req.validationErros();

            if (!errors){
                var usuarioModel = app.models.usuario;
                var query = {email: req.body.usuario.email, senha: req.body.usuario.senha};

                usuarioModel.findOne(query).select('nome email').exec(function(error, usuario){
                    if(usuario){
                        req.session.usuario = usuario;
                        res.redirect('/');
                    }else{
                        res.render('usuario/login', {'errors':[{'msg': 'Email ou senha inválidos'}]})
                    }
                });
            }else{
                res.render('usuario/login', {'errors': errors});
            }
        },

        logout: function(req, res){
            if(typeof(req.session.usuario) != "undefined"){
                req.session.destroy();
                res.redirect('/');
            }
        },

        cadastro: function(req, res){
            res.render('usuario/cadastro');
        },

        cadastroAction: function(req, res){
            req.assert(['usuario', 'nome'], 'Insira seu nome completo').notEmpty();
            req.assert(['usuario', 'email'], 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
            req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 8 caracteres').len(8, 20);
            req.assert(['usuario', 'conf_senha'], 'Confira sua senha').len(8,20);
            req.assert(['usuario', 'conf_senha'], 'As senhas não são compatíveis').equals(req.body.usuario.senha);

            var errors = req.validationErros();

            if(errors){
                res.render('usuario/cadastro', {'errors':errors});
            }else{
                var usuarioModel = app.models.usuario;
                usuarioModel.create(req.body.usuario, function(error, usuario){
                    if(error){
                        res.render('usuario/cadastro', {'errors': [{'msg':error.err}]});
                    }else{
                        res.redirect('/usuario/login');
                    }
                });
            }
        }
    }
    return UsuarioController;
};