/**
 * Arquivo: login.controller.js
 * Autor: Alessandra Nastassja
 * Data de criação: 24/12
 */

const server = require('../../server')
module.exports = function (app) {
    const Usuario = require('../usuario/usuario.model')

    //MÉTODO POST - Criar login
    app.post('/usuario/sam', (req, res) => {
        const usuario = new Usuario();

        usuario.email = req.body.email;
        usuario.senha = req.body.senha;
        
        Usuario.findOne({email: req.body.email, senha: req.body.senha}, function (error, usuario) {
            console.log(usuario)
            if (error) {
                console.log('post error: ', err)
                }
              else if (usuario) {
                console.log("already exsist")
                
                    var dadosParaRetorno = {
                        status: 1, 
                        id: usuario.id, 
                        nome: usuario.nome,
                        msg:"Login efetuado com sucesso"
                    };
                    console.log(dadosParaRetorno)
                    res.send(dadosParaRetorno);

              }
              else {
                console.log("here new user or error email and password")
                var dadosParaRetorno = {status: 0, msg:"Login inválido!"};
                res.send(dadosParaRetorno);
              }
        });
    });
}