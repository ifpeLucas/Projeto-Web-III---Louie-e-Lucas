const express = require("express");
const routes = express.Router();
const auth  = require("../middlewares/usuarioAuth");
const produtoController = require("../controllers/produtoController");

routes.get("/produtos", auth, produtoController.listar);
routes.get("/produtos/cadastrar/:codBarras?", auth, produtoController.cadastrar);
routes.post("/produtos", auth,  produtoController.cadastrarPost);
routes.get("/produtos/remover/:codBarras", auth, produtoController.remover);
routes.get("/produtos/:codBarras", auth, produtoController.detalhar);

module.exports = routes;