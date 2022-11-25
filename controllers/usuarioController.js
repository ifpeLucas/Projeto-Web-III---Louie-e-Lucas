//usuarioController.js
const UsuarioModel = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");

class UsuarioController{
    static async listar(req,res){
        const salvo = req.query.s;
        const removido = req.query.d;
        const lista = await UsuarioModel.find();
        res.render("usuario/listar", {lista, salvo, removido});
    }

    static async cadastrar(req,res){
        const p = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(p.senha, salt);
        if (p.id){
            await UsuarioModel.findOneAndUpdate({email: p.email}, 
            {
                nome: p.nome,
                senha: hash
            });
            res.redirect("/usuarios?s=3");

        }else{
            const resultado = await UsuarioModel.findOne({email: p.email});
            if(resultado){
                res.redirect("/usuarios/cadastrar?e=1");

            }
            else{
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(p.senha, salt);
                const novoUsuario = new UsuarioModel({
                    nome: p.nome,
                    email: p.email,
                    senha: hash
                });
            
           
            await novoUsuario.save();
            res.redirect("/usuarios?s=1");
            }
        }
       
    };
    
    static async renderCadastro(req,res){
        const email = req.params.email;
        const erro = req.query.e;
        let p = {};
        let escondido  ="";
        if (email){
            p = await UsuarioModel.findOne({email: email});
            escondido = "hidden";
        }
        
        res.render("usuario/cadastrar", {p, escondido, erro});
    }

    static async detalhar(req,res){
        const email = req.params.email;
        const usuario = await UsuarioModel.findOne({email: email});

        res.render("usuario/detalhar", usuario);
        
        
    }
    static async remover(req,res){
        
        const email = req.params.email;
        await UsuarioModel.findOneAndDelete({email: email});
        res.redirect("/usuarios?d=1");
    }

    static async relatorio(req,res){
        const lista = await UsuarioModel.find();
        res.render("usuario/relatorio", {lista});
    }
    static async renderLogin(req,res){
        if(req.session.usuario){
            res.redirect("/")
        }else{
            const erro = req.query.e;
       res.render("usuario/login", {erro});
        }
        
    }
    static async logout(req,res){
        req.session.usuario=undefined;
        res.redirect("/usuarios/login");
    }
    static async login(req,res){
        const usuario = req.body;
        const resultado = await UsuarioModel.findOne({email: usuario.email});
        if (resultado){
            if (resultado){
                if(bcrypt.compareSync(usuario.senha, resultado.senha)){
                    req.session.usuario = resultado.email;
                    res.redirect("/");
                } else{
                    res.redirect("/usuarios/login?e=1");
                }
            }
        } else{
            res.redirect("/usuarios/login?e=1");
        }
        

    
}
   
}
module.exports = UsuarioController;