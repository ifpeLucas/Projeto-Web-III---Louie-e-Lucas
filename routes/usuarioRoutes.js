//usuarioRoutes.js
const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");

const usuarioController = require("../controllers/usuarioController");

routes.get("/usuarios", auth, usuarioController.listar);

routes.get("/usuarios/cadastrar/:email?",  usuarioController.renderCadastro);

routes.post("/usuarios",  usuarioController.cadastrar);

routes.get("/usuarios/remover/:email", auth, usuarioController.remover);

routes.get("/usuarios/relatorio", auth, usuarioController.relatorio);



routes.get("/usuarios/login", usuarioController.renderLogin);

routes.get("/usuarios/logout", usuarioController.logout);

routes.post("/usuarios/login", usuarioController.login);

routes.get("/usuarios/:email", auth, usuarioController.detalhar);
module.exports = routes;