
const formulario = document.getElementById("formReserva");
const listaReservas = document.getElementById("listaReservas");
const filtroStatus = document.getElementById("filtroStatus");

const totalPendentes = document.getElementById("totalPendentes");
const totalAprovadas = document.getElementById("totalAprovadas");
const totalRecusadas = document.getElementById("totalRecusadas");


// ==========================================
// CARREGAR RESERVAS
// ==========================================

function carregarReservas() {

    const reservasSalvas = localStorage.getItem("reservasProfessor");

    return reservasSalvas ? JSON.parse(reservasSalvas) : [];

}


// ==========================================
// SALVAR RESERVAS
// ==========================================

function salvarReservas(reservas) {

    localStorage.setItem(
        "reservasProfessor",
        JSON.stringify(reservas)
    );

}


// ==========================================
// PROTEGER TEXTO INSERIDO
// ==========================================

function escaparHTML(texto) {

    return String(texto).replace(/[&<>"']/g, function (caractere) {

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

    const reservasFiltradas = reservas.filter(reserva => {

        if (filtro === "Todas") {
            return true;
        }

        return reserva.status === filtro;

    });


    // CASO NÃO EXISTAM RESERVAS

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


    // MONTAR OS CARDS

    listaReservas.innerHTML = reservasFiltradas.map(reserva => {

        const motivo = reserva.motivo
            ? escaparHTML(reserva.motivo)
            : "Nenhuma observação informada.";

        const podeCancelar = reserva.status === "Pendente";

        return `

            <article class="reserva-item">

                <div class="reserva-item-topo">

                    <h3>${escaparHTML(reserva.espaco)}</h3>

                    <span class="status-reserva ${reserva.status}">
                        ${escaparHTML(reserva.status)}
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

                    <strong>Motivo:</strong>

                    ${motivo}

                </div>


                ${
                    podeCancelar
                    ?
                    `
                    <button
                        class="botao-cancelar-reserva"
                        onclick="cancelarReserva(${reserva.id})"
                    >
                        Cancelar solicitação
                    </button>
                    `
                    :
                    ""
                }

            </article>

        `;

    }).join("");

}


// ==========================================
// NOVA SOLICITAÇÃO
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    const dia = document.getElementById("diaReserva").value;

    const horario = document.getElementById("horarioReserva").value;

    const espaco = document.getElementById("espacoReserva").value;

    const turma = document.getElementById("turmaReserva").value.trim();

    const disciplina = document.getElementById("disciplinaReserva").value.trim();

    const motivo = document.getElementById("motivoReserva").value.trim();


    const reservas = carregarReservas();


    // VERIFICAR SE JÁ EXISTE UMA SOLICITAÇÃO
    // PARA O MESMO ESPAÇO, DIA E HORÁRIO

    const conflito = reservas.some(reserva => {

        return (
            reserva.dia === dia &&
            reserva.horario === horario &&
            reserva.espaco === espaco &&
            reserva.status !== "Recusada"
        );

    });


    if (conflito) {

        alert(
            "Já existe uma solicitação para esse espaço, dia e horário. " +
            "Escolha outro horário ou espaço."
        );

        return;

    }


    // CRIAR RESERVA

    const novaReserva = {

        id: Date.now(),

        dia: dia,

        horario: horario,

        espaco: espaco,

        turma: turma,

        disciplina: disciplina,

        motivo: motivo,

        status: "Pendente"

    };


    reservas.unshift(novaReserva);


    // SALVAR

    salvarReservas(reservas);


    // ATUALIZAR A TELA

    exibirReservas();


    // LIMPAR FORMULÁRIO

    formulario.reset();


    alert(
        "Solicitação registrada na demonstração!\n\n" +
        "Status: Pendente de aprovação."
    );


    // LEVAR ATÉ A LISTA

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


    let reservas = carregarReservas();


    reservas = reservas.filter(reserva => {

        // Só remove a reserva selecionada
        // se ela ainda estiver pendente.

        if (
            reserva.id === id &&
            reserva.status === "Pendente"
        ) {

            return false;

        }

        return true;

    });


    salvarReservas(reservas);

    exibirReservas();


    alert("Solicitação cancelada na demonstração.");

}


// ==========================================
// FILTRO
// ==========================================

filtroStatus.addEventListener("change", function() {

    exibirReservas();

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

exibirReservas();
