// const cors = require('cors')

// const express = require("express")

// const app = express()

// const mysql = require("mysql")

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password: "isa#123",
//     database: "my_list_mercado"
// })

// db.connect(function(err){
//     if (err) throw err;
//     console.log("Connected")

// })

// app.use(express.json())

// app.use(cors())

// app.post('/pegar_dados', (req, res) => {
//     var Nome_Produto = req.body.box_item 
//     var Quantd_Produto = req.body.box_quantidade_item
//     var Preco_Produto = req.body.box_preco_produto
//     var Total_Produto = Quantd_Produto * Preco_Produto

//     if (Nome_Produto.length > 0 && Quantd_Produto.length > 0 && Preco_Produto > 0){
//         var sql = 'INSERT INTO compras_do_mercado (nome_produto, quantd_produto, preco_produto, total_produto) VALUES (?, ?, ?, ?)'
//         var valores_tabela = [Nome_Produto, Quantd_Produto, Preco_Produto, Total_Produto]
//         db.query(sql, valores_tabela,
//         (erro, resultado)=>{
//             if (erro){
//                 console.log('Houve um erro ao inserir o dado: ', erro)
//             }
//             else{
//                 console.log('Dado inserido com sucesso!')
//             }
//         })
//     }

// })

// app.get('/obter_dados', (req,res) => {
//     var sql = 'SELECT * FROM compras_do_mercado';
//     db.query(sql, (erro, resultado)=>{
//         if (erro){
//             console.log('Houve um erro ao obter o dado: ', erro)
//         }
//         else{
//             res.json(resultado)
//         }
//     })
// })

// app.listen(3001, ()=>{
//     console.log("Rodando na porta 3001")
// })


const cors = require('cors');
const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Cria uma instância do aplicativo Express
const app = express();

// Define o caminho do banco de dados com base no local do executável
const dbPath = path.join(path.dirname(process.execPath), 'compras_do_mercado.db');

// Verifica se o banco de dados já existe, se não, cria um novo
if (!fs.existsSync(dbPath)) {
    console.log("Banco de dados não encontrado. Criando novo banco de dados...");
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
        } else {
            console.log("Conectado ao SQLite!");

            // Cria a tabela se não existir
            const createTable = `
                CREATE TABLE IF NOT EXISTS compras_do_mercado (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome_produto TEXT NOT NULL,
                    quantd_produto INTEGER NOT NULL,
                    preco_produto REAL NOT NULL,
                    total_produto REAL NOT NULL
                );
            `;
            db.run(createTable, (err) => {
                if (err) {
                    console.error("Erro ao criar a tabela:", err);
                } else {
                    console.log("Tabela criada!");
                }
            });
        }
    });
} else {
    console.log("Banco de dados já existe.");
}

// Cria a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
});

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Estrutura.html'));
});

// Configurações de middleware
app.use(express.json());
app.use(cors());

// Rota para pegar dados
app.post('/pegar_dados', (req, res) => {
    console.log(req.body);
    var Nome_Produto = req.body.box_item;
    var Quantd_Produto = req.body.box_quantidade_item;
    var Preco_Produto = req.body.box_preco_produto;
    var Total_Produto = Quantd_Produto * Preco_Produto;

    if (Nome_Produto.length > 0 && Quantd_Produto.length > 0 && Preco_Produto > 0){
        var sql = 'INSERT INTO compras_do_mercado (nome_produto, quantd_produto, preco_produto, total_produto) VALUES (?, ?, ?, ?)';
        db.run(sql, [Nome_Produto, Quantd_Produto, Preco_Produto, Total_Produto], (erro) => {
            if (erro){
                console.log('Erro ao inserir o dado:', erro);
                res.status(500).send('Erro ao inserir o dado.');
            } else {
                console.log('Dado inserido com sucesso!');
                res.send('Dado inserido com sucesso!');
            }
        });
    } else {
        res.status(400).send('Dados inválidos.');
    }
});

// Rota para obter dados
app.get('/obter_dados', (req, res) => {
    var sql = 'SELECT * FROM compras_do_mercado';
    db.all(sql, [], (erro, resultado) => {
        if (erro){
            console.log('Erro ao obter os dados:', erro);
            res.status(500).send('Erro ao obter os dados.');
        } else {
            res.json(resultado);
        }
    });
});

// Porta para o servidor
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
