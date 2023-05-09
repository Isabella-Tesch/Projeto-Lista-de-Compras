import * as c from "./Interacao_Lista.js"
//const parse = require('node-html-parser');



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

