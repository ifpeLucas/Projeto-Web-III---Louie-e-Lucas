//PessoaModel.js
 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const clienteSchema = Schema({
    cpf: Number,
    nome: String,
    idade: Number
});
module.exports = mongoose.model("Cliente", clienteSchema);
