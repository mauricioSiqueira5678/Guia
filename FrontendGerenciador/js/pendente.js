function pendentes() {
    const endpoint = 'http://192.168.1.58:8080/listarTodos';

    fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            const tabelaPendentes = document.querySelector("#tabelaPendentes tbody");
            tabelaPendentes.innerHTML = '';
            data.forEach(item => {
                const row = tabelaPendentes.insertRow();
                const nomeCell = row.insertCell(0);
                const TelefoneCell = row.insertCell(1);
                const DescricaoCell = row.insertCell(2);
                const catCell = row.insertCell(3);
                const statusCell = row.insertCell(4);

                const visualizarButtonEdit = document.createElement("img");
                visualizarButtonEdit.className = "imgUsuario";
                visualizarButtonEdit.src = "../imgs/edit.png";
                statusCell.appendChild(visualizarButtonEdit);

                const visualizarButtonDelete = document.createElement("img");
                visualizarButtonDelete.className = "imgUsuario"
                visualizarButtonDelete.src = "../imgs/lixeira (1).png";
                statusCell.appendChild(visualizarButtonDelete);
                
                nomeCell.innerHTML = item.nome;
                TelefoneCell.innerHTML = item.tel;
                DescricaoCell.innerHTML = item.descricao;
                catCell.innerHTML = item.categoria;
  
            });
        })
        .catch(error => {
            console.error("Ocorreu um erro ao buscar os dados:", error);
        });
}
// Chamar a função para renderizar a tabela de vendas
pendentes();