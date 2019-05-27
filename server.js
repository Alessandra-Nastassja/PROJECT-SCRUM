/**
 * Arquivo: server.js
 * Descrição:
 * Author: Alessandra Nastassja
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const database = require('./config/database');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const router = express.Router();

router.use(function(req,res, next){
    console.log('Ação no sistema executada!');
    next();
});

app.use(express.static('public'));

app.use('/', router);
router.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});
//Perfil
router.get('/perfil', function(req, res){
    res.sendFile(__dirname + "/public/perfil.html");
});

//Login
router.get('/usuario/login', function(req, res){
    res.sendFile(__dirname + "/public/loginUsuario.html");
});
const loginController = require('./src/login/login.controller');
loginController(app)

//Usuario
router.get('/usuario', function(req, res){
    res.sendFile(__dirname + "/public/cadastrarUsuario.html");
});
const usuarioController = require('./src/usuario/usuario.controller');
usuarioController(app)

//Projeto
router.get('/projeto', function(req, res){
    res.sendFile(__dirname + "/public/cadastrarProjeto.html");
});

router.get('/projeto/lista', function(req, res){
    res.sendFile(__dirname + "/public/todosProjetos.html");
});

const projetoController = require('./src/projeto/projeto.controller');
projetoController(app)


const port = process.env.port || 8000;

app.listen(port);
console.log('server na port ' + port);