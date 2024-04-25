 // Simulação de dados obtidos de uma API
 const businesses = [
    {
        name: 'Mercado da Esquina',
        description: 'Produtos frescos e de qualidade direto do campo.',
        whatsapp: '+5511999999999'
    },
    {
        name: 'Artesanato da Maria',
        description: 'Artesanatos locais com toque pessoal e único.',
        whatsapp: '+5511988888888'
    }
    // Adicione mais negócios conforme necessário
];

// Função para criar os cards de negócios
function createBusinessCard(business) {
    return `
    <div class="card mb-4">
        <div class="card-body">
            <!-- Flex container para centralizar e alinhar itens verticalmente -->
            <div class="d-flex justify-content-center align-items-center mb-3">
                <div class="me-3">
                    <img src="caminho/para/a/logo-da-empresa.jpg" alt="" class="company-logo" width="50">
                </div>
                <!-- Título da empresa -->
                <h3 class="card-title text-center mb-0">${business.name}</h3>
            </div>
            <p class="card-text text-center">${business.description}</p>
            <!-- Botões de redes sociais -->
            <div class="text-center">
                <!-- Botão de imagem para WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=${business.whatsapp}" target="_blank">
                    <img src="../imgsClientes/whats.svg" alt="WhatsApp" width="50">
                </a>
                <!-- Botão de imagem para Facebook -->
                <a href="link-para-o-perfil-do-facebook" target="_blank">
                    <img src="../imgsClientes/Face.svg" alt="Facebook" width="50">
                </a>
                <!-- Botão de imagem para Instagram -->
                <a href="link-para-o-perfil-do-instagram" target="_blank">
                    <img src="../imgsClientes/insta.svg" alt="Instagram" width="50">
                </a>
            </div>
        </div>
    </div>
    `;
}


// Função para renderizar os cards na página
function renderBusinessCards() {
    const businessListElement = document.getElementById('business-list');
    businessListElement.innerHTML = businesses.map(createBusinessCard).join('');
}

// Chamada da função para renderizar os cards
renderBusinessCards();