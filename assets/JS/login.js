// Matrículas fictícias dos usuários
const usuarios = {

    "1001": {
        nome: "Luiz Arthur",
        tipo: "aluno",
        destino: "inicio-aluno.html"
    },

    "2001": {
        nome: "Pedro Albino",
        tipo: "professor",
        destino: "inicio-prof.html"
    },

    "3001": {
        nome: "Aline Chagas",
        tipo: "coordenacao",
        destino: "inicio-coord.html"
    }

};


// Encontrar os elementos da página
const formLogin = document.getElementById("form-login");
const campoMatricula = document.getElementById("matricula");
const mensagemLogin = document.getElementById("mensagem-login");


// Quando o formulário for enviado
formLogin.addEventListener("submit", function (event) {

    // Evita que a página recarregue
    event.preventDefault();

    // Pega a matrícula digitada
    const matricula = campoMatricula.value.trim();

    // Procura o usuário
    const usuario = usuarios[matricula];


    // Verifica se a matrícula existe
    if (usuario) {

        // Salva os dados do usuário no navegador
        localStorage.setItem("usuario", JSON.stringify({
            matricula: matricula,
            nome: usuario.nome,
            tipo: usuario.tipo
        }));

        // Redireciona para a página correspondente
        window.location.href = usuario.destino;

    } else {
        mensagemLogin.textContent = "Matrícula inválida. Confira o número e tente novamente.";
        mensagemLogin.className = "erro-login";
    }

});