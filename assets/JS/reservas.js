const formulario = document.getElementById("formReserva");
const listaReservas = document.getElementById("listaReservas");
const filtroStatus = document.getElementById("filtroStatus");

const totalPendentes = document.getElementById("totalPendentes");
const totalAprovadas = document.getElementById("totalAprovadas");
const totalRecusadas = document.getElementById("totalRecusadas");

// Usuário atualmente logado
const usuarioLogadoReserva = JSON.parse(
    localStorage.getItem("usuario") || "null"
);


// ==========================================
// CARREGAR RESERVAS
// ==========================================

function carregarReservas() {

    const reservasSalvas = localStorage.getItem("reservasAgenda");

    return reservasSalvas ? JSON.parse(reservasSalvas) : [];

}


// ==========================================
// SALVAR RESERVAS
// ==========================================

function salvarReservas(reservas) {

    localStorage.setItem(
        "reservasAgenda",
        JSON.stringify(reservas)
    );

}


// ==========================================
// PROTEGER TEXTOS
// ==========================================

function escaparHTML(texto) {

    return String(texto ?? "").replace(/[&<>"']/g, function(caractere) {

        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return caracteres[caractere];

    });

}


// ==========================================
// ATUALIZAR CONTADORES
// ==========================================

function atualizarContadores(reservas) {

    const pendentes = reservas.filter(
        reserva => reserva.status === "Pendente"
    ).length;

    const aprovadas = reservas.filter(
        reserva => reserva.status === "Aprovada"
    ).length;

    const recusadas = reservas.filter(
        reserva => reserva.status === "Recusada"
    ).length;

    totalPendentes.textContent = pendentes;
    totalAprovadas.textContent = aprovadas;
    totalRecusadas.textContent = recusadas;

}


// ==========================================
// EXIBIR RESERVAS
// ==========================================

function exibirReservas() {

    const reservas = carregarReservas();

    atualizarContadores(reservas);

    const filtro = filtroStatus.value;

    const reservasFiltradas = reservas.filter(function(reserva) {

        if (filtro === "Todas") {
            return true;
        }

        return reserva.status === filtro;

    });


    // ==========================================
    // NENHUMA RESERVA ENCONTRADA
    // ==========================================

    if (reservasFiltradas.length === 0) {

        listaReservas.innerHTML = `
            <div class="reservas-vazias">

                <div class="icone-reservas-vazias">
                    📋
                </div>

                <h3>Nenhuma solicitação encontrada</h3>

                <p>
                    Suas solicitações aparecerão aqui
                    depois que você realizar uma reserva.
                </p>

            </div>
        `;

        return;

    }


    // ==========================================
    // MONTAR CARDS DAS RESERVAS
    // ==========================================

    listaReservas.innerHTML = reservasFiltradas.map(function(reserva) {

        const motivo = reserva.motivo
            ? escaparHTML(reserva.motivo)
            : "Nenhuma observação informada.";

        const justificativa = reserva.justificativa
            ? escaparHTML(reserva.justificativa)
            : "";

        const podeCancelar = reserva.status === "Pendente";

        const classeStatus = {
            "Pendente": "Pendente",
            "Aprovada": "Aprovada",
            "Recusada": "Recusada"
        };

        const status = classeStatus[reserva.status] || "Pendente";


        return `
            <article class="reserva-item">

                <div class="reserva-item-topo">

                    <h3>${escaparHTML(reserva.espaco)}</h3>

                    <span class="status-reserva ${status}">
                        ${escaparHTML(status)}
                    </span>

                </div>


                <div class="dados-reserva">

                    <div class="dado-reserva">
                        <span>Dia</span>

                        <strong>
                            ${escaparHTML(reserva.dia)}
                        </strong>
                    </div>


                    <div class="dado-reserva">
                        <span>Horário</span>

                        <strong>
                            ${escaparHTML(reserva.horario)}
                        </strong>
                    </div>


                    <div class="dado-reserva">
                        <span>Turma</span>

                        <strong>
                            ${escaparHTML(reserva.turma)}
                        </strong>
                    </div>


                    <div class="dado-reserva">
                        <span>Disciplina</span>

                        <strong>
                            ${escaparHTML(reserva.disciplina)}
                        </strong>
                    </div>

                </div>


                <div class="motivo-reserva-exibido">

                    <strong>Observações:</strong>

                    ${motivo}

                </div>


                ${
                    justificativa
                    ?
                    `
                    <div class="motivo-reserva-exibido">

                        <strong>Resposta da coordenação:</strong>

                        ${justificativa}

                    </div>
                    `
                    :
                    ""
                }


                <div class="data-reserva">
                    <small>
                        Solicitação realizada em:
                        ${escaparHTML(reserva.dataSolicitacao || "Não informada")}
                    </small>
                </div>


                ${
                    podeCancelar
                    ?
                    `
                    <button
                        type="button"
                        class="botao-cancelar-reserva"
                        onclick="cancelarReserva(${Number(reserva.id)})"
                    >
                        Cancelar solicitação
                    </button>
                    `
                    :
                    ""
                }

                <button
                    type="button"
                    class="botao-descartar-prof"
                    data-id="${escaparHTML(reserva.id)}"
                >
                    🗑 Descartar do histórico
                </button>

            </article>
        `;

    }).join("");

}


// ==========================================
// NOVA SOLICITAÇÃO
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    // ==========================================
    // VERIFICAR LOGIN DO PROFESSOR
    // ==========================================

    if (
        !usuarioLogadoReserva ||
        usuarioLogadoReserva.tipo !== "professor"
    ) {

        alert("Faça login como professor para realizar uma reserva.");

        window.location.href = "login.html";

        return;

    }


    // ==========================================
    // PEGAR OS DADOS DO FORMULÁRIO
    // ==========================================

    const dia = document.getElementById("diaReserva").value;

    const horario = document.getElementById("horarioReserva").value;

    const espaco = document.getElementById("espacoReserva").value;

    const turma = document.getElementById("turmaReserva").value.trim();

    const disciplina = document.getElementById("disciplinaReserva").value.trim();

    const motivo = document.getElementById("motivoReserva").value.trim();


    const reservas = carregarReservas();


    // ==========================================
    // VERIFICAR CONFLITO
    // ==========================================

    const conflito = reservas.some(function(reserva) {

        return (
            reserva.dia === dia &&
            reserva.horario === horario &&
            reserva.espaco === espaco &&
            reserva.status !== "Recusada"
        );

    });


    if (conflito) {

        alert(
            "Já existe uma solicitação ou reserva para esse espaço, " +
            "dia e horário.\n\nEscolha outro horário ou espaço."
        );

        return;

    }


    // ==========================================
    // CRIAR NOVA RESERVA
    // ==========================================

    const dataAtual = new Date();

    const dataFormatada = dataAtual.toLocaleDateString("pt-BR");


    const novaReserva = {

        id: Date.now(),

        // Salva o nome do professor que está logado
        professor: usuarioLogadoReserva.nome,

        dia: dia,

        horario: horario,

        espaco: espaco,

        turma: turma,

        disciplina: disciplina,

        motivo: motivo,

        status: "Pendente",

        justificativa: "",

        dataSolicitacao: dataFormatada

    };


    // ==========================================
    // ADICIONAR AO ARRAY
    // ==========================================

    reservas.unshift(novaReserva);


    // ==========================================
    // SALVAR NO LOCALSTORAGE
    // ==========================================

    salvarReservas(reservas);


    // ==========================================
    // ATUALIZAR A LISTAGEM
    // ==========================================

    exibirReservas();


    // ==========================================
    // LIMPAR FORMULÁRIO
    // ==========================================

    formulario.reset();


    // ==========================================
    // MENSAGEM
    // ==========================================

    alert(
        "Solicitação registrada com sucesso!\n\n" +
        "Status: Pendente de aprovação da coordenação."
    );


    // ==========================================
    // LEVAR ATÉ A LISTAGEM
    // ==========================================

    document.querySelector(".lista-reservas").scrollIntoView({

        behavior: "smooth"

    });

});


// ==========================================
// CANCELAR SOLICITAÇÃO
// ==========================================

function cancelarReserva(id) {

    const confirmar = confirm(
        "Deseja realmente cancelar esta solicitação?"
    );

    if (!confirmar) {
        return;
    }


    const reservas = carregarReservas();


    // ==========================================
    // LOCALIZAR A SOLICITAÇÃO
    // ==========================================

    const reserva = reservas.find(function(item) {

        return String(item.id) === String(id);

    });


    // ==========================================
    // VERIFICAR SE EXISTE
    // ==========================================

    if (!reserva) {

        alert("Solicitação não encontrada.");

        return;

    }


    // ==========================================
    // VERIFICAR SE ESTÁ PENDENTE
    // ==========================================

    if (reserva.status !== "Pendente") {

        alert("Só é possível cancelar solicitações pendentes.");

        return;

    }


    // ==========================================
    // REMOVER A SOLICITAÇÃO
    // ==========================================

    const novasReservas = reservas.filter(function(item) {

        return String(item.id) !== String(id);

    });


    // ==========================================
    // SALVAR
    // ==========================================

    salvarReservas(novasReservas);


    // ==========================================
    // ATUALIZAR TELA
    // ==========================================

    exibirReservas();


    alert("Solicitação cancelada com sucesso.");

}


// ==========================================
// FILTRO DE STATUS
// ==========================================

filtroStatus.addEventListener("change", function() {

    exibirReservas();

});


// ==========================================
// ATUALIZAR CASO OUTRA PÁGINA MODIFIQUE
// O LOCALSTORAGE
// ==========================================

window.addEventListener("storage", function(event) {

    if (event.key === "reservasAgenda") {

        exibirReservas();

    }

});


// ==========================================
// DESCARTAR DO HISTÓRICO - PROFESSOR
// ==========================================

listaReservas.addEventListener("click", function(event) {

    const botao = event.target.closest(
        ".botao-descartar-prof"
    );

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;

    const reservas = carregarReservas();

    const reserva = reservas.find(function(item) {
        return String(item.id) === String(id);
    });

    if (!reserva) {

        alert("Reserva não encontrada.");

        return;

    }


    const confirmar = confirm(
        "Deseja remover esta solicitação do seu histórico?\n\n" +
        reserva.espaco + "\n" +
        reserva.dia + "\n" +
        reserva.horario + "\n" +
        reserva.status
    );

    if (!confirmar) {
        return;
    }


    // ==========================================
    // REMOVER RESERVA
    // ==========================================

    const reservasAtualizadas = reservas.filter(function(item) {

        return String(item.id) !== String(id);

    });


    // ==========================================
    // SALVAR E ATUALIZAR
    // ==========================================

    salvarReservas(reservasAtualizadas);

    exibirReservas();


    alert("Solicitação descartada do histórico.");

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

exibirReservas();
