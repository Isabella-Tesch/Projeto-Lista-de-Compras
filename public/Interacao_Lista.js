// document.addEventListener('DOMContentLoaded', function(){
//     var btn_dados = document.getElementById('btn_coleta_dados')
//     btn_dados.addEventListener('click', EnviaDadosParaServidor)


//     function EnviaDadosParaServidor(){
//         var input_box_item = document.getElementById('box_item').value
//         var input_box_quantd_item = document.getElementById('box_quantidade_item').value
//         var input_box_preco_produto = document.getElementById('box_preco_produto').value

    
//         fetch('http://localhost:3001/pegar_dados', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({box_item: input_box_item, box_quantidade_item: input_box_quantd_item, box_preco_produto: input_box_preco_produto}) /* Converte o objeto javascript em uma string json. box_item corresponde à chave
//             do json resultante*/
//         })
//         .then(response => response.text())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }
// })

// document.addEventListener('DOMContentLoaded', function(){
//     var Btn_Dados_Tabela = document.getElementById("Btn_Mostra_Dados_Tabela")
//     Btn_Dados_Tabela.addEventListener('click', PegarDadosDoServidor)

//     function PegarDadosDoServidor(){
//         fetch('http://localhost:3001/obter_dados', {
//             method: 'GET'
//         })
//         .then(response => response.json())
//         .then(resultado =>{
//             ExibirDadosTabela(resultado)
//         })
//         .catch(erro =>{
//             console.log(erro)
//         })
//     }

//     function ExibirDadosTabela(dados){
//         var corpo_da_tabela = document.querySelector('tbody')

//         //Limpa o Conteúdo da Tabela
//         corpo_da_tabela.innerHTML = ''

//         //Iteração dos dados recebidos e adiciona cada linha à tabela
//         dados.forEach(dado =>{
//             var linha = document.createElement('tr')

//             var Celula_Nome_Produto = document.createElement('td')
//             Celula_Nome_Produto.textContent = dado.nome_produto //O valor "nome_produto" é a propriedade da tabela do banco de dados.
//             linha.appendChild(Celula_Nome_Produto)
            
//             var Celula_Quantd_Produto = document.createElement('td')
//             Celula_Quantd_Produto.textContent = dado.quantd_produto
//             linha.appendChild(Celula_Quantd_Produto)

//             var Celula_Preco_Produto = document.createElement('td')
//             Celula_Preco_Produto.textContent = dado.preco_produto
//             linha.appendChild(Celula_Preco_Produto)

//             var Celula_Total_Produto = document.createElement('td')
//             Celula_Total_Produto.textContent = dado.total_produto
//             linha.appendChild(Celula_Total_Produto)

//             corpo_da_tabela.appendChild(linha)          
            
//         })

//     }
// })

document.addEventListener('DOMContentLoaded', function(){
    var btn_dados = document.getElementById('btn_coleta_dados');
    var Btn_Dados_Tabela = document.getElementById("Btn_Mostra_Dados_Tabela");

    btn_dados.addEventListener('click', EnviaDadosParaServidor);
    Btn_Dados_Tabela.addEventListener('click', PegarDadosDoServidor);

    function EnviaDadosParaServidor(){
        var input_box_item = document.getElementById('box_item').value.trim();
        var input_box_quantd_item = document.getElementById('box_quantidade_item').value.trim();
        var input_box_preco_produto = document.getElementById('box_preco_produto').value.trim();

        if (!input_box_item || !input_box_quantd_item || !input_box_preco_produto) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        fetch('http://localhost:3002/pegar_dados', { // Ajuste aqui para o localhost
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                box_item: input_box_item, 
                box_quantidade_item: input_box_quantd_item, 
                box_preco_produto: input_box_preco_produto
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert('Dados enviados com sucesso!');
        })
        .catch(error => {
            console.log(error);
            alert('Ocorreu um erro ao enviar os dados.');
        });
    }

    function PegarDadosDoServidor(){
        fetch('http://localhost:3002/obter_dados', { method: 'GET' })
        .then(response => response.json())
        .then(resultado =>{
            ExibirDadosTabela(resultado);
        })
        .catch(erro =>{
            console.log(erro);
            alert('Ocorreu um erro ao obter os dados.');
        });
    }

    function ExibirDadosTabela(dados){
        var corpo_da_tabela = document.querySelector('tbody');

        // Limpa o Conteúdo da Tabela
        corpo_da_tabela.innerHTML = '';

        // Iteração dos dados recebidos e adiciona cada linha à tabela
        dados.forEach(dado =>{
            var linha = document.createElement('tr');

            var Celula_Nome_Produto = document.createElement('td');
            Celula_Nome_Produto.textContent = dado.nome_produto;
            linha.appendChild(Celula_Nome_Produto);

            var Celula_Quantd_Produto = document.createElement('td');
            Celula_Quantd_Produto.textContent = dado.quantd_produto;
            linha.appendChild(Celula_Quantd_Produto);

            var Celula_Preco_Produto = document.createElement('td');
            Celula_Preco_Produto.textContent = dado.preco_produto;
            linha.appendChild(Celula_Preco_Produto);

            var Celula_Total_Produto = document.createElement('td');
            Celula_Total_Produto.textContent = dado.total_produto;
            linha.appendChild(Celula_Total_Produto);

            corpo_da_tabela.appendChild(linha);          
        });
    }
});
