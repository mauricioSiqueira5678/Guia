const txtNome = document.getElementById("txtNome")
const txtTel = document.getElementById("txtTel")
const txtFace = document.getElementById("txtFace")
const txtInsta = document.getElementById("txtInsta")
const sel_Cat = document.getElementById("sel_Cat")
const txtDescricao = document.getElementById("txtDescricao")
const img_logo = document.getElementById("img_logo")



// Função para atualizar a tabela com os dados pendentes ou filtrados por nome

let clienteSelecionado = null;
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
                    visualizarButtonEdit.addEventListener("click", (evt) => {
                        clienteSelecionado = item;
                        preencherFormulario();
                        $('#janelaModal').modal('show');
    
                    });

                    const visualizarButtonDelete = document.createElement("img");
                    visualizarButtonDelete.className = "imgUsuario";
                    visualizarButtonDelete.src = "../img/delete.svg";
                    statusCell.appendChild(visualizarButtonDelete);
                    visualizarButtonDelete.addEventListener("click", (evt) => {
                        const nome = evt.target.parentNode.parentNode.querySelector('td:first-child').textContent;
                        deletarCadastro(nome);
                    })

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

//Função deletar produto
function deletarCadastro(nome) {
    // Recupera o token de autenticação do armazenamento local
    const authToken = localStorage.getItem('authToken');

    fetch(`http://192.168.1.58:8080/deletarPorNome/${nome}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authToken // Inclui o token no cabeçalho Authorization
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Cadastro deletado com sucesso!');
                pendentes();
            } else {
                console.error('Erro ao deletar cadastro!');
            }
        })
        .catch(error => {
            console.error('Erro na solicitação DELETE:', error);
        });
}

// Função para preencher o formulário com os dados do cliente selecionado
function preencherFormulario() {
    // Verifica se há um cliente selecionado
    if (clienteSelecionado) {
        // Preenche os campos do formulário com os dados do cliente
        document.getElementById('txtNome').value = clienteSelecionado.nome;
        document.getElementById('txtTel').value = clienteSelecionado.tel;
        document.getElementById('txtFace').value = clienteSelecionado.face;
        document.getElementById('txtInsta').value = clienteSelecionado.insta;
        document.getElementById('sel_Cat').value = clienteSelecionado.categoria;
        document.getElementById('txtDescricao').value = clienteSelecionado.descricao;
        //document.getElementById('img_logo').value = clienteSelecionado.imagem;
    }
}

preencherFormulario();



