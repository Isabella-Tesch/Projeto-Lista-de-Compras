document.addEventListener('DOMContentLoaded', function(){
    var btn_dados = document.getElementById('btn_coleta_dados')
    btn_dados.addEventListener('click', x)

    function x(){
        var input_box_item = document.getElementById('box_item').value
    
        fetch('http://localhost:3001/pegar_dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({box_item: input_box_item}) /* Converte o objeto javascript em uma string json. box_item corresponde à chave
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


