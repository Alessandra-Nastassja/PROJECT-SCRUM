/**
 * Arquivo: projeto.model.js
 * Autor: Alessandra Nastassja
 * Descrição: arquivo responsável onde tratarmos o modelo da classe 'projeto'
 * Data de criação: 10/12
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Projeto
*  ID: Int
*  Nome: String
*  Preco: Number
*  Descrição: String
*/

const ProjetoSchema = new Schema({
   nome: String,
   preco: String,
   descricao: String
});

module.exports = mongoose.model('Projeto', ProjetoSchema);