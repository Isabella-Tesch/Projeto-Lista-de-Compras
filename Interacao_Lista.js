//VALIDAÇÃO ENTRE O FRONT E O BACK

var btn_enviar = document.getElementById('btn_coleta_dados')

btn_enviar.onclick = ()=> {
    var input_box_item = document.getElementById('box_item').value
    var input_quantd_item = document.getElementById('box_quantidade_item').value 
    var input_preco_produto = document.getElementById('box_preco_produto').value
    if (input_box_item.length > 0 && input_quantd_item.length > 0 && input_preco_produto.length > 0){
        alert('oi kfgg')
    }
    alert(input_preco_produto.length)
}

export {input_box_item, input_quantd_item, input_preco_produto};