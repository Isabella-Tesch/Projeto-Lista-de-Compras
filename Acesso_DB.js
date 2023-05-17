const cors = require('cors')

const express = require("express")

const app = express()

const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "isa#123",
    database: "my_list_mercado"
})

db.connect(function(err){
    if (err) throw err;
    console.log("Connected")

})

app.use(express.json())

app.use(cors())

app.post('/pegar_dados', (req, res) => {
    var Nome_Produto = req.body.box_item 
    var Quantd_Produto = req.body.box_quantidade_item
    var Preco_Produto = req.body.box_preco_produto
    var Total_Produto = Quantd_Produto * Preco_Produto

    if (Nome_Produto.length > 0 && Quantd_Produto.length > 0 && Preco_Produto > 0){
        var sql = 'INSERT INTO compras_do_mercado (nome_produto, quantd_produto, preco_produto, total_produto) VALUES (?, ?, ?, ?)'
        var valores_tabela = [Nome_Produto, Quantd_Produto, Preco_Produto, Total_Produto]
        db.query(sql, valores_tabela,
        (erro, resultado)=>{
            if (erro){
                console.log('Houve um erro ao inserir o dado: ', erro)
            }
            else{
                console.log('Dado inserido com sucesso!')
            }
            db.end() // Fechamento da conexão com o banco de dados após a conclusão da consulta.
        })
    }

})

app.listen(3001, ()=>{
    console.log("Rodando na porta 3001")
})

