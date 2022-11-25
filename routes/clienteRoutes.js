const express = require("express");
const routes = express.Router();

const auth  = require("../middlewares/usuarioAuth");

const clienteController = require("../controllers/clienteController");

routes.get("/clientes", auth, clienteController.listar);
routes.get("/clientes/cadastrar/:cpf?", auth, clienteController.cadastrar);
routes.post("/clientes", auth,  clienteController.cadastrarPost);
routes.get("/clientes/remover/:cpf", auth, clienteController.remover);
routes.get("/clientes/:cpf", auth, clienteController.detalhar);

module.exports = routes;