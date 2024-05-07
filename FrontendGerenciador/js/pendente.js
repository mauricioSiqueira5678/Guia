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
                visualizarButtonEdit.src = "../img/edit.svg";
                statusCell.appendChild(visualizarButtonEdit);

                const visualizarButtonDelete = document.createElement("img");
                visualizarButtonDelete.className = "imgUsuario"
                visualizarButtonDelete.src = "../img/delete.svg";
                statusCell.appendChild(visualizarButtonDelete);

                const visualizarButtonAprovar = document.createElement("img");
                visualizarButtonAprovar.className = "imgUsuario"
                visualizarButtonAprovar.src = "../img/aprovado.png";
                statusCell.appendChild(visualizarButtonAprovar);
                visualizarButtonAprovar.addEventListener("click", () => {
                    clienteAprovado(nomeCell);
                    pendentes();
                });

                
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

function aprovarCliente(nome) {
    // Fazer uma solicitação POST para enviar o nome
    fetch('http://192.168.1.58:8080/aprovarCadastroPorNome', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Cliente aprovado com sucesso!');
        } else {
            console.error('Erro ao aprovar cliente!');
        }
    })
    .catch(error => {
        console.error('Erro na solicitação POST:', error);
    });
}

function clienteAprovado(nomeCell) {
    // Capturar o nome da linha clicada
    const nome = nomeCell.innerText;

    // Chamar a função para enviar o nome via POST
    aprovarCliente(nome);
}
