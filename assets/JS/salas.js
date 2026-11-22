// Usuário atualmente logado
const usuarioLogado = JSON.parse(
    localStorage.getItem("usuario") || "null"
);

const formulario = document.getElementById("formReservaProf");

const selectDia = document.getElementById("dia");

const selectEspaco = document.getElementById("espaco");

const mensagem = document.getElementById("mensagem-reserva");

const botaoEnviar = document.querySelector(".enviar-reserva");


// ==========================================
// SELECIONAR DIA DA SEMANA
// ==========================================

const dias = document.querySelectorAll(".dia-prof");

dias.forEach(function(dia) {

    dia.addEventListener("click", function() {

        // Remove a seleção dos outros dias
        dias.forEach(function(item) {
            item.classList.remove("selecionado");
        });

        // Seleciona o dia clicado
        dia.classList.add("selecionado");

        // Atualiza o formulário
        selectDia.value = dia.dataset.dia;

    });

    // Permite selecionar usando Enter ou espaço
    dia.addEventListener("keydown", function(event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            dia.click();

        }

    });

});


// ==========================================
// SELECIONAR DIA PELO FORMULÁRIO
// ==========================================

selectDia.addEventListener("change", function() {

    dias.forEach(function(dia) {

        dia.classList.remove("selecionado");

        if (dia.dataset.dia === selectDia.value) {

            dia.classList.add("selecionado");

        }

    });

});


// ==========================================
// SELECIONAR ESPAÇO
// ==========================================

function selecionarEspaco(espaco) {

    // Atualiza o select do formulário
    selectEspaco.value = espaco;

    // Remove seleção de todos os botões
    const botoes = document.querySelectorAll(".botao-reserva");

    botoes.forEach(function(botao) {

        botao.classList.remove("selecionado");

    });

    // Seleciona somente o botão clicado
    const botaoSelecionado = document.querySelector(
        `.botao-reserva[onclick="selecionarEspaco('${espaco}')"]`
    );

    if (botaoSelecionado) {

        botaoSelecionado.classList.add("selecionado");

    }

    // Leva o usuário até o formulário
    document.getElementById("formulario-reserva").scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// SELECIONAR ESPAÇO PELO SELECT
// ==========================================

selectEspaco.addEventListener("change", function() {

    const botoes = document.querySelectorAll(".botao-reserva");

    botoes.forEach(function(botao) {

        botao.classList.remove("selecionado");

    });

    const espaco = selectEspaco.value;

    if (espaco !== "") {

        const botaoSelecionado = document.querySelector(
            `.botao-reserva[onclick="selecionarEspaco('${espaco}')"]`
        );

        if (botaoSelecionado) {

            botaoSelecionado.classList.add("selecionado");

        }

    }

});


// ==========================================
// ENVIAR FORMULÁRIO
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Guarda os dados antes de limpar o formulário
    const dia = selectDia.value;

    const horario = document.getElementById("horario").value;

    const turma = document.getElementById("turma").value.trim();

    const disciplina = document.getElementById("disciplina").value.trim();

    const espaco = selectEspaco.value;

    const motivo = document.getElementById("motivo").value.trim();

    if (!usuarioLogado || usuarioLogado.tipo !== "professor") {
        alert("Faça login como professor para solicitar uma reserva.");
        window.location.href = "login.html";
        return;
    }


    // ==========================================
    // CONVERTER OS VALORES PARA EXIBIÇÃO
    // ==========================================

    const diasFormatados = {
        segunda: "Segunda-feira",
        terca: "Terça-feira",
        quarta: "Quarta-feira",
        quinta: "Quinta-feira",
        sexta: "Sexta-feira"
    };

    const horariosFormatados = {
        "18:30-19:50": "18:30 às 19:50",
        "19:50-20:50": "19:50 às 20:50"
    };

    const espacosFormatados = {
        sala1: "Sala 1",
        sala2: "Sala 2",
        lab1: "Laboratório 1",
        lab2: "Laboratório 2"
    };


    // ==========================================
    // CARREGAR RESERVAS EXISTENTES
    // ==========================================

    const reservasSalvas = JSON.parse(
        localStorage.getItem("reservasAgenda") || "[]"
    );


    // ==========================================
    // VERIFICAR CONFLITO
    // ==========================================

    const conflito = reservasSalvas.some(function(reserva) {

        return (
            reserva.dia === diasFormatados[dia] &&
            reserva.horario === horariosFormatados[horario] &&
            reserva.espaco === espacosFormatados[espaco] &&
            reserva.status !== "Recusada"
        );

    });


    if (conflito) {

        alert(
            "Já existe uma solicitação para esse espaço, " +
            "dia e horário.\n\nEscolha outro horário ou espaço."
        );

        return;

    }


    // ==========================================
    // CRIAR SOLICITAÇÃO
    // ==========================================

    const novaReserva = {

        id: Date.now(),

        professor: usuarioLogado.nome,

        dia: diasFormatados[dia],

        horario: horariosFormatados[horario],

        espaco: espacosFormatados[espaco],

        turma: turma,

        disciplina: disciplina,

        motivo: motivo,

        status: "Pendente",

        justificativa: "",

        dataSolicitacao: new Date().toLocaleDateString("pt-BR")

    };


    // ==========================================
    // SALVAR
    // ==========================================

    reservasSalvas.unshift(novaReserva);

    localStorage.setItem(
        "reservasAgenda",
        JSON.stringify(reservasSalvas)
    );

    // ==========================================
    // MOSTRAR MENSAGEM DE SUCESSO
    // ==========================================

    mensagem.innerHTML = `
        <strong>✓ Solicitação preenchida com sucesso!</strong>

        <p>
            ${disciplina} - Turma ${turma}<br>
            Dia: ${dia}<br>
            Horário: ${horario}<br>
            Espaço: ${espaco}<br>
            ${motivo ? "Observação: " + motivo : ""}
        </p>

        <small>
            Sua solicitação foi enviada
            para a coordenação.
        </small>
    `;

    mensagem.style.display = "block";


    // ==========================================
    // LIMPAR FORMULÁRIO
    // ==========================================

    formulario.reset();


    // Remove seleção dos dias
    dias.forEach(function(dia) {

        dia.classList.remove("selecionado");

    });


    // Remove seleção das salas e laboratórios
    const botoes = document.querySelectorAll(".botao-reserva");

    botoes.forEach(function(botao) {

        botao.classList.remove("selecionado");

    });


    // Volta o botão de envio ao estado original
    botaoEnviar.classList.remove("enviado");

    botaoEnviar.innerHTML = "➤ Enviar Solicitação";


    // Mostra a mensagem de sucesso
    mensagem.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

});


// ==========================================
// AO ALTERAR O FORMULÁRIO
// ==========================================

function formularioAlterado() {

    // Volta o botão ao estado original
    botaoEnviar.classList.remove("enviado");

    botaoEnviar.innerHTML = "➤ Enviar Solicitação";

    // Esconde a mensagem anterior
    mensagem.style.display = "none";

}

formulario.addEventListener("input", formularioAlterado);

formulario.addEventListener("change", formularioAlterado);
