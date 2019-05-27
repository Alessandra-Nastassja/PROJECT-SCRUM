/**
 * Arquivo: usuario.model.js
 * Autor: Alessandra Nastassja
 * Data de criação: 24/12
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Login
 *  ID: Int
 *  Nome: String
 *  E-mail: String
 *  Senha: String
 */

const LoginSchema = new Schema({
   email: String,
   senha: String
});

module.exports = mongoose.model('Login', LoginSchema);