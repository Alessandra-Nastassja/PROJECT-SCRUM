/**
 * Arquivo: projeto.controller.js
 * Descrição: é responsável por gerenciar os dados e seus comportamentos.
 * Autor: Alessandra Nastassja
 */

const server = require('../../server')
var request = require("request");
module.exports = function (app) {
    const Projeto = require('./projeto.model')
    

    //MÉTODO POST - Criar pprojeto
    app.post('/projeto/new', (req, res) => {
        const projeto = new Projeto();

        var options = {
            method: 'POST',
            url: 'https://api.trello.com/1/boards/',
            qs: {
              name: req.body.nome,
              desc: req.body.descricao,
              defaultLabels: 'true',
              defaultLists: 'true',
              keepFromSource: 'none',
              prefs_permissionLevel: 'private',
              prefs_voting: 'disabled',
              prefs_comments: 'members',
              prefs_invitations: 'members',
              prefs_selfJoin: 'true',
              prefs_cardCovers: 'true',
              prefs_background: 'blue',
              prefs_cardAging: 'regular',
              key: 'df22892153ab2e56c8d4b32e164e86d1',
              token: '9846a71bbeafd8ed055ca25d32e47e3bb006cc4a46508e8962dbd6d5194a294c'
            }
            
          };

          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            var temp = JSON.parse(body);
            // console.log("body" + temp.id);

            projeto.idBoard = temp.id;
            projeto.nome = req.body.nome;
            projeto.preco = req.body.preco;
            projeto.descricao = req.body.descricao;

            projeto.save()
            .then(item => {
                res.send("Projeto salvo com sucesso");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
          });
    })
    //MÉTODO GET - Seleciona todos os projetos
    app.get('/projeto/todosProjetos', function (req, res) {
        Projeto.find(function (error, projetos) {
            if (error)
                res.send('Error ao tentar selecionar os projetos:' + error);

            res.json(projetos);

        });
    })
    // MÉTODO GET - Seleciona por ID
    app.get('/projeto/:projeto_id', function (req, res) {
        Projeto.findById(req.params.projeto_id, function (error, projeto) {
            if (error)
                res.send('Error ao tentar selecionar um projeto por id: ' + error);

            res.json(projeto);
        });
    });
    //MÉTODO PUT - Atualizar por ID
    app.put('/projeto/:projeto_id', function (req, res) {

        Projeto.findById(req.params.projeto_id, function (error, projeto) {
            if (error)
                res.send('Error ao tentar selecionar um projeto por id: ' + error);

            projeto.nome = req.body.nome;
            projeto.preco = req.body.preco;
            projeto.descricao = req.body.descricao;

            projeto.save(function (error) {
                if (error)
                    res.send('Error ao tentar atualizar o projeto: ' + error);

                res.json({ message: 'Projeto atualizado com sucesso' });
            })

        });
    })
    //MÉTODO DELETE - Deletar por ID
    app.delete('/projeto/:projeto_id', function (req, res) {  
        Projeto.findById(req.params.projeto_id, function (error, projeto) {
            console.log(projeto.idBoard);
            console.log(error);
            
            var options = {
                method: 'DELETE',
                url: 'https://api.trello.com/1/boards/' + projeto.idBoard,
                qs: {
                  key: 'df22892153ab2e56c8d4b32e164e86d1',
                  token: '9846a71bbeafd8ed055ca25d32e47e3bb006cc4a46508e8962dbd6d5194a294c'
                }
              };

              request(options, function (error, response, body) {
                if (error) throw new Error(error);
              
                console.log(body);
                
                Projeto.remove({ _id: req.params.projeto_id}, function (error) {
                    if (error)
                        res.send('Error ao tentar deletar um projeto por id' + error);
                    res.json({ message: 'Projeto deletado com sucesso' });
                });
              });
        });
    });
}