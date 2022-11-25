const ClienteModel = require("../models/ClienteModel");

class ClienteController{
    //clientes
    static async listar(req,res){
        const salvo = req.query.s;
        const removido = req.query.d;
        const lista = await ClienteModel.find();
        res.render("cliente/listar", {lista,salvo,removido});
    }
    //clientes(post)
    static async cadastrarPost(req,res){
        const p = req.body;
        if (p.id){
            await ClienteModel.findOneAndUpdate({cpf: p.cpf}, 
            {
                nome: p.nome,
                idade: p.idade
            });
            res.redirect("/clientes?s=3");

        }else{
            const novoCliente = new ClienteModel({
                cpf: p.cpf,
                nome: p.nome,
                idade: p.idade
            });
            await novoCliente.save();
            res.redirect("/clientes?s=1");
        }
    };
    //clientes/cadastrar
    static async cadastrar(req,res){
        const cpf = req.params.cpf;
        let p = {};
        let escondido  ="";
        if (cpf){
            p = await ClienteModel.findOne({cpf: cpf});
            escondido = "hidden";
        }
        res.render("cliente/cadastrar", {p,escondido});
    };
     //clientes/:cpf
    static async detalhar(req,res){
        const cpf = req.params.cpf;
        const cliente = await ClienteModel.findOne({cpf: cpf});
        if(cliente==undefined){
            res.send("Você não existe!");
        }
        else{
        res.render("cliente/detalhar", cliente);
       
        }
    };
    static async remover(req,res){
        
        const cpf = req.params.cpf;
        await ClienteModel.findOneAndDelete({cpf: cpf});
        res.redirect("/clientes?d=1");
    };

    
}
module.exports = ClienteController;