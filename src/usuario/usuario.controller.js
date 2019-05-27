/**
 * Arquivo: usuario.controller.js
 * Autor: Alessandra Nastassja
 * Data de criação: 24/12
 */

const server = require('../../server')
module.exports = function (app){
    const Usuario = require('./usuario.model')

    //MÉTODO POST - Criar usuario
    app.post('/usuario/new', (req, res) => {
        const usuario = new Usuario();

        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.emailConfirmar = req.body.emailConfirmar;
        usuario.senha = req.body.senha;

        usuario.save()
            .then(item => {
                res.send("Usuario salvo com sucesso");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    });
}