 const txtNome=document.getElementById("txtNome")
 const txtTel= document.getElementById("txtTel")
 const txtFace= document.getElementById("txtFace")
 const txtInsta= document.getElementById("txtInsta")
 const sel_Cat= document.getElementById("sel_Cat")
 const txtDescricao= document.getElementById("txtDescricao")
 const img_logo= document.getElementById("img_logo")
 const btn_enviar= document.getElementById("btn_enviar")

 btn_enviar.addEventListener("click", (evt)=>{
    enviarCadastro();
    limparCadastro();
 })

 function limparCadastro(){
    txtNome.value = ""
    txtTel.value = ""
    txtFace.value = ""
    txtInsta.value = ""
    txtDescricao.value = ""

 }

 function enviarCadastro(){
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
            limparCadastro(); 
        }
    })
    .catch((error) => console.error(error));
}

 // Função para fazer uma solicitação à API e obter os dados
async function fetchBusinesses() {
    try {
        const response = await fetch('http://192.168.1.58:8080/listarTodos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

// Função para criar os cards de negócios com base nos dados da API
function createBusinessCard(business) {
    return `
    <div class="card mb-4">
        <div class="card-body">
            <!-- Flex container para centralizar e alinhar itens verticalmente -->
            <div class="d-flex justify-content-center align-items-center mb-3">
                <div class="me-3">
                <img src="data:image/jpeg;base64,${business.imagem}" alt="${business.nome}" class="company-logo" width="50">

                </div>
                <!-- Título da empresa -->
                <h3 class="card-title text-center mb-0">${business.nome}</h3>
            </div>
            <p class="card-text text-center">${business.descricao}</p>
            <!-- Botões de redes sociais -->
            <div class="text-center">
                <!-- Botão de imagem para WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=${business.tel}" target="_blank">
                    <img src="../imgsClientes/whats.svg" alt="WhatsApp" width="50">
                </a>
                <!-- Botão de imagem para Facebook -->
                <a href="${business.face}" target="_blank"> <!-- Usando o link do Facebook fornecido pela API -->
                    <img src="../imgsClientes/Face.svg" alt="Facebook" width="50">
                </a>
                <!-- Botão de imagem para Instagram -->
                <a href="${business.insta}" target="_blank"> <!-- Usando o link do Instagram fornecido pela API -->
                    <img src="../imgsClientes/insta.svg" alt="Instagram" width="50">
                </a>
            </div>
        </div>
    </div>
    `;
}

// Função para renderizar os cards na página
async function renderBusinessCards() {
    const businessListElement = document.getElementById('business-list');
    businessListElement.innerHTML = ''; // Limpa o conteúdo atual da lista de negócios

    const businesses = await fetchBusinesses(); // Obtém os dados da API
    businesses.forEach(business => {
        const cardHtml = createBusinessCard(business); // Cria o HTML do card para cada negócio
        businessListElement.innerHTML += cardHtml; // Adiciona o HTML do card à lista de negócios
    });
}

// Chamada da função para renderizar os cards
renderBusinessCards();
