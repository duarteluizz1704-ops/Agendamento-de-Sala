
const formContato = document.getElementById("formContato");
const mensagemContato = document.getElementById("mensagem-contato");

formContato.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    // Verifica se todos os campos foram preenchidos
    if (nome === "" || email === "" || assunto === "" || mensagem === "") {

        mensagemContato.className = "mensagem-contato erro";
        mensagemContato.textContent = "Preencha todos os campos antes de enviar.";

        return;
    }

    // Demonstração do envio
    mensagemContato.className = "mensagem-contato sucesso";

    mensagemContato.textContent =
        "Formulário preenchido com sucesso!";

    // Limpa o formulário
    formContato.reset();

});
