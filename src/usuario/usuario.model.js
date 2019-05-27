/**
 * Arquivo: usuario.model.js
 * Autor: Alessandra Nastassja
 * Data de criação: 24/12
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 /**
  * Usuário
  *  ID: Int
  *  Nome: String
  *  E-mail: String
  *  Senha: String
  */

const UsuarioSchema = new Schema({
    nome: String,
    email: String,
    emailConfirmar: String,
    senha: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);