/**
 * Arquivo: projeto.controller.js
 * Descrição: é responsável por gerenciar os dados e seus comportamentos.
 * Autor: Alessandra Nastassja
 */

const server = require('../../server')
module.exports = function (app) {
    const Projeto = require('./projeto.model')

    //MÉTODO POST - Criar pprojeto
    app.post('/projeto/new', (req, res) => {
        const projeto = new Projeto();

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
        Projeto.remove({
            _id: req.params.projeto_id
        }, function (error) {
            if (error)
                res.send('Error ao tentar deletar um projeto por id' + error);
            res.json({ message: 'Projeto deletado com sucesso' });
        });
    });
}