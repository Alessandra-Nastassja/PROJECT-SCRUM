/**
 * Arquivo: login.controller.js
 * Autor: Alessandra Nastassja
 * Data de criação: 24/12
 */

const server = require('../../server')
module.exports = function (app) {
    const Login = require('./login.model')

    //MÉTODO POST - Criar login
    app.post('/usuario/sam', (req, res) => {
        const login = new Login();

        login.email = req.body.email;
        login.senha = req.body.senha;
       
        var user  = 'alessandra.nastassja@hotmail.com';
        var password = '131996';

        // var user  = req.params.email;
        // var password = req.params.senha;
        
        if(login.email == null || login.senha == null){
            var dadosParaRetorno = {status: 0, msg:"Preencha corretamente os campos"};
            res.send(dadosParaRetorno);
        }else if (login.email != user || login.senha != password){
            var dadosParaRetorno = {status: 0, msg:"Login inválido"};
            res.send(dadosParaRetorno);
        }else{
            var dadosParaRetorno = {
                status: 1, 
                id:"123", 
                nome:"Alessandra",
                msg:"Login efetuado com sucesso"
            };
            res.send(dadosParaRetorno);
        }
    });
}