// Função para atualizar a tabela com os dados pendentes ou filtrados por nome
function pendentes(nomePesquisado) {
    let endpoint = 'http://192.168.1.58:8080/listarTodosAprovados';

    fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            const tabelaAprovados = document.querySelector("#tabelaAprovados tbody");
            tabelaAprovados.innerHTML = '';

            // Se nomePesquisado for fornecido, filtra os dados, caso contrário, usa todos os dados
            let dadosFiltrados = nomePesquisado ? data.filter(item => item.nome.toLowerCase().includes(nomePesquisado.toLowerCase())) : data;

            if (dadosFiltrados.length === 0) {
                tabelaAprovados.innerHTML = '<tr><td colspan="5">Nenhum resultado encontrado.</td></tr>';
            } else {
                dadosFiltrados.forEach(item => {
                    const row = tabelaAprovados.insertRow();
                    const nomeCell = row.insertCell(0);
                    const telefoneCell = row.insertCell(1);
                    const descricaoCell = row.insertCell(2);
                    const catCell = row.insertCell(3);
                    const statusCell = row.insertCell(4);

                    // Criação dos botões de ação
                    const visualizarButtonEdit = document.createElement("img");
                    visualizarButtonEdit.className = "imgUsuario";
                    visualizarButtonEdit.src = "../img/edit.svg";
                    statusCell.appendChild(visualizarButtonEdit);

                    const visualizarButtonDelete = document.createElement("img");
                    visualizarButtonDelete.className = "imgUsuario";
                    visualizarButtonDelete.src = "../img/delete.svg";
                    statusCell.appendChild(visualizarButtonDelete);

                    const visualizarButtonAprovar = document.createElement("img");
                    visualizarButtonAprovar.className = "imgUsuario";
                    visualizarButtonAprovar.src = "../img/aprovado.png";
                    statusCell.appendChild(visualizarButtonAprovar);
                    visualizarButtonAprovar.addEventListener("click", () => {
                        clienteAprovado(nomeCell.innerText);
                    });

                    // Preenchendo as células com os dados
                    nomeCell.innerText = item.nome;
                    telefoneCell.innerText = item.tel;
                    descricaoCell.innerText = item.descricao;
                    catCell.innerText = item.categoria;
                    // Adicione outras células conforme necessário
                });
            }
        })
        .catch(error => {
            console.error("Ocorreu um erro ao buscar os dados:", error);
        });
}

// Evento de clique para o botão de pesquisa
document.getElementById('btn_pesquisarAprovado').addEventListener('click', function () {
    const nomePesquisa = document.getElementById('input-pesquisa').value;
    pendentes(nomePesquisa); // Chama a função pendentes com o nome pesquisado
});

// Inicializa a tabela de pendentes
pendentes();