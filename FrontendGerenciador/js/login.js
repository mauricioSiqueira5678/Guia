document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('txtUsuario').value;
    const password = document.getElementById('txtSenha').value;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: username, senha: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Armazena o token localmente
            localStorage.setItem('authToken', data.token);
            // Redireciona para a página de pendente.html
            window.location.href = '/FrontendGerenciador/html/pendente.html';
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    })
    .catch(error => {
        document.getElementById('error-message').textContent = 'Erro ao fazer login';
    });
});

