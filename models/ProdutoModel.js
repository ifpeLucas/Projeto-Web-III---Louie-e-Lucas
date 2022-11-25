//ProdutoModel.js
 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const produtoSchema = Schema({
    codBarras: Number,
    tipo: String,
    preco: Number
});
module.exports = mongoose.model("Produto", produtoSchema);