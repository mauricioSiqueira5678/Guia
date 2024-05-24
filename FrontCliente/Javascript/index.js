const txtNome = document.getElementById("txtNome")
const txtTel = document.getElementById("txtTel")
const txtFace = document.getElementById("txtFace")
const txtInsta = document.getElementById("txtInsta")
const sel_Cat = document.getElementById("sel_Cat")
const txtDescricao = document.getElementById("txtDescricao")
const img_logo = document.getElementById("img_logo")
const btn_enviar = document.getElementById("btn_enviar")

btn_enviar.addEventListener("click", (evt) => {
    enviarCadastro();
    limparCadastro();
})

function limparCadastro() {
    txtNome.value = ""
    txtTel.value = ""
    txtFace.value = ""
    txtInsta.value = ""
    txtDescricao.value = ""

    limparMensagem();

}

function enviarCadastro() {
    const formData = new FormData();
    formData.append('nome', txtNome.value);
    formData.append('tel', txtTel.value);
    formData.append('face', txtFace.value);
    formData.append('insta', txtInsta.value);
    formData.append('categoria', sel_Cat.value);
    formData.append('descricao', txtDescricao.value);
    formData.append('imagem', img_logo.files[0]); // assumindo que img_logo é um input do tipo file

    fetch("http://192.168.1.58:8080/cadastrar", {
        method: "POST",
        body: formData, // enviando como FormData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                exibirMensagem('Cadastro realizado com sucesso!', 'sucesso');
                limparCadastro();
            } else {
                exibirMensagem('Dados incompletos ou inválidos.', 'erro');
            }

            console.log(data.id)
        })
        .catch((error) => {
            console.error(error);
            exibirMensagem('Erro ao enviar cadastro. Tente novamente.', 'erro');
        });
}

function exibirMensagem(mensagem, tipo) {
    const mensagemDiv = document.getElementById('mensagemResposta');
    const mensagemConteiner = document.getElementById('mensagemConteiner');
    mensagemDiv.innerText = mensagem;

    // Remove todas as classes anteriores
    mensagemDiv.className = '';

    // Adiciona a classe correspondente ao tipo de mensagem
    if (tipo === 'sucesso') {
        mensagemDiv.classList.add('mensagem-sucesso');
    } else if (tipo === 'erro') {
        mensagemDiv.classList.add('mensagem-erro');
    }

    // Exibe o contêiner da mensagem
    mensagemConteiner.style.display = 'flex';
}

// Função para limpar as mensagens após um certo tempo
function limparMensagem() {
    const mensagemConteiner = document.getElementById('mensagemConteiner');
    setTimeout(() => {
        mensagemConteiner.style.display = 'none';
    }, 5000); // Limpa a mensagem após 5 segundos
}

// Função para criar os cards de negócios com base nos dados da API
function createBusinessCard(business) {
    // Certifique-se de que a imagem está sendo decodificada corretamente
    const imageSrc = `data:image/jpeg;base64,${business.imagem}`;
    return `
        <div class="card mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-center align-items-center mb-3">
                    <div class="me-3">
                        <img src="${imageSrc}" alt="${business.nome}" class="company-logo" width="50">
                    </div>
                    <h3 class="card-title text-center mb-0">${business.nome}</h3>
                </div>
                <p class="card-text text-center">${business.descricao}</p>
                <div class="text-center">
                <!-- Para WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=${business.tel}" target="_blank">
                    <img src="../imgsClientes/whats.svg" alt="WhatsApp" width="50">
                </a>
                
                <!-- Para Facebook -->
                <a href="https://www.facebook.com/${business.face}" target="_blank">
                    <img src="../imgsClientes/Face.svg" alt="Facebook" width="50">
                </a>
                
                <!-- Para Instagram -->
                <a href="https://www.instagram.com/${business.insta}" target="_blank">
                    <img src="../imgsClientes/insta.svg" alt="Instagram" width="50">
                </a>
                
                </div>
            </div>
        </div>
    `;
}

let currentPage = 1;
const cardsPerPage = 5;

function renderBusinessCards(businesses) {
    const businessListElement = document.getElementById('business-list');
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const paginatedItems = businesses.slice(startIndex, endIndex);

    businessListElement.innerHTML = ''; // Limpa o conteúdo atual da lista de negócios
    paginatedItems.forEach(business => {
        const cardHtml = createBusinessCard(business); // Cria o HTML do card para cada negócio
        businessListElement.innerHTML += cardHtml; // Adiciona o HTML do card à lista de negócios
    });

    renderPagination(businesses.length);
}

function renderPagination(totalItems) {
    const pageCount = Math.ceil(totalItems / cardsPerPage);
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Anterior</a>
      </li>
    `;

    for (let i = 1; i <= pageCount; i++) {
        paginationElement.innerHTML += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
          </li>
        `;
    }

    paginationElement.innerHTML += `
      <li class="page-item ${currentPage === pageCount ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Próximo</a>
      </li>
    `;
}

function changePage(page) {
    currentPage = page;
    fetchBusinesses().then(renderBusinessCards);
}

// Inicializa a renderização dos cards
fetchBusinesses().then(renderBusinessCards);


// Função para buscar todos os negócios aprovados
async function fetchBusinesses() {
    try {
        const response = await fetch('http://192.168.1.58:8080/listarTodosAprovados');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

// Adiciona event listeners aos itens do dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', async function () {
        const categoria = this.textContent; // Pega o texto do item do dropdown
        try {
            const response = await fetch(`http://192.168.1.58:8080/listarAprovadosPorCategoria?categoria=${categoria}`);
            const data = await response.json();
            renderBusinessCards(data); // Renderiza os cards com os dados filtrados
        } catch (error) {
            console.error('Erro ao buscar os cards:', error);
        }
    });
});

document.getElementById('btn_pesq').addEventListener('click', function () {
    const nomePesquisa = document.getElementById('input-pesquisa').value;
    if (nomePesquisa) {
        fetch(`http://192.168.1.58:8080/pesquisarPorNome?nome=${nomePesquisa}`)
            .then(response => response.json())
            .then(data => renderBusinessCards(data))
            .catch(error => console.error('Erro na pesquisa:', error));
    }
});

// Chamada inicial para renderizar todos os negócios aprovados
fetchBusinesses().then(renderBusinessCards);



