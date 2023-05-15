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
    console.log(Nome_Produto)
    res.send('Valor recebido: ' + Nome_Produto)
})

app.listen(3001, ()=>{
    console.log("Rodando na porta 3001")
})

