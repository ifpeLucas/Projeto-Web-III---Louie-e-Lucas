//GjHXf6OEwUx1NhKy - Senha MongoDB
 
//String de conexão - mongodb+srv://Lucas:<password>@cluster0.igrbidb.mongodb.net/?retryWrites=true&w=majority
 
//index.js
const express = require("express");
const Cliente = require("./Cliente");
const Produto = require("./Produto");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const auth = require("./middlewares/usuarioAuth");
require('dotenv/config');
const session = require("express-session");

app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);


const clienteRoutes = require("./routes/clienteRoutes");
app.use(clienteRoutes); 

const produtoRoutes = require("./routes/produtoRoutes");
app.use(produtoRoutes); 

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes); 
 
 
 
 
app.get("/", auth, function(req, res){
    res.render("index");
});





app.use(function(req,res){
    res.status(404).render("404");
});
app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});
