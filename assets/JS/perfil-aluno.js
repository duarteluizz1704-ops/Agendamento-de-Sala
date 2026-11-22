
 // ==========================================
 // DADOS DO USUÁRIO LOGADO
 // ==========================================

const usuarioPerfil = JSON.parse(
    localStorage.getItem("usuario") || "null"
);


// ==========================================
// ATUALIZAR PERFIL
// ==========================================

if (usuarioPerfil && usuarioPerfil.tipo === "aluno") {

    const nome = usuarioPerfil.nome;
    const matricula = usuarioPerfil.matricula;

    const perfilNome = document.getElementById("perfilNome");
    const perfilNomeCompleto = document.getElementById("perfilNomeCompleto");
    const perfilMatricula = document.getElementById("perfilMatricula");
    const perfilAvatar = document.getElementById("perfilAvatar");


    // Nome de identificação
    if (perfilNome) {
        perfilNome.textContent = nome;
    }


    // Nome completo nas informações acadêmicas
    if (perfilNomeCompleto) {
        perfilNomeCompleto.textContent = nome;
    }


    // Matrícula
    if (perfilMatricula) {
        perfilMatricula.textContent = matricula;
    }


    // Iniciais do avatar
    if (perfilAvatar) {

        const partesNome = nome.trim().split(" ");

        const primeiraInicial = partesNome[0].charAt(0);

        const ultimaInicial = partesNome.length > 1
            ? partesNome[partesNome.length - 1].charAt(0)
            : "";

        perfilAvatar.textContent =
            (primeiraInicial + ultimaInicial).toUpperCase();

    }

}
