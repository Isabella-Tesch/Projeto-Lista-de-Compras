document.addEventListener('DOMContentLoaded', function(){
    var btn_dados = document.getElementById('btn_coleta_dados')
    btn_dados.addEventListener('click', EnviaDadosParaServidor)


    function EnviaDadosParaServidor(){
        var input_box_item = document.getElementById('box_item').value
        var input_box_quantd_item = document.getElementById('box_quantidade_item').value
        var input_box_preco_produto = document.getElementById('box_preco_produto').value

    
        fetch('http://localhost:3001/pegar_dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({box_item: input_box_item, box_quantidade_item: input_box_quantd_item, box_preco_produto: input_box_preco_produto}) /* Converte o objeto javascript em uma string json. box_item corresponde à chave
            do json resultante*/
        })
        .then(response => response.text())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }
})


