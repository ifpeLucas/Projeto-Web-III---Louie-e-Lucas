const ProdutoModel = require("../models/ProdutoModel");
class ProdutoController{
//produtos
static async listar(req,res){
    const salvo = req.query.s;
    const removido = req.query.d;
    const listaProd = await ProdutoModel.find();
    res.render("produto/listarProdutos", {listaProd, salvo, removido});
};

//produtos(post)
static async cadastrarPost(req,res){
    const p = req.body;
    if (p.id){
        await ProdutoModel.findOneAndUpdate({codBarras: p.codBarras}, 
        {
            tipo: p.tipo,
            preco: p.preco
        });
        res.redirect("/produtos?s=3");

    }else{
        const novoProduto = new ProdutoModel({
            codBarras: p.codBarras,
            tipo: p.tipo,
            preco: p.preco
        });
        await novoProduto.save();
        res.redirect("/produtos?s=1");
    }
};
//produtos/cadastrar
static async cadastrar(req,res){
        const codBarras = req.params.codBarras;
        let p = {};
        let escondido ="";
        if (codBarras){
            p = await ProdutoModel.findOne({codBarras: codBarras});
            escondido = "hidden";
        }
        
        res.render("produto/cadastrarProdutos", {p, escondido});
};
//produtos/:codBarras
static async detalhar(req,res){
    const codBarras = req.params.codBarras;
    const produto = await ProdutoModel.findOne({codBarras: codBarras});
    if(produto==undefined){
        res.send("Produto não encontrado!");
    }
    else{
    res.render("produto/detalharProdutos", produto);
   
    }
};

static async remover(req,res){
    const codBarras = req.params.codBarras;
    await ProdutoModel.findOneAndDelete({codBarras: codBarras});
    res.redirect("/produtos?d=1");
};
}
module.exports = ProdutoController;