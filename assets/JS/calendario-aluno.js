
/* ==========================================
   CALENDÁRIO DO ALUNO
========================================== */

// Usuário logado
const usuarioLogadoAluno = JSON.parse(
    localStorage.getItem("usuario") || "null"
);

// ==========================================
// PERSONALIZAR BOAS-VINDAS DO ALUNO
// ==========================================

if (usuarioLogadoAluno && usuarioLogadoAluno.tipo === "aluno") {

    const saudacaoAluno = document.getElementById("saudacaoAluno");
    const inicialAluno = document.getElementById("inicialAluno");

    if (saudacaoAluno) {
        saudacaoAluno.textContent =
            "Olá, " + usuarioLogadoAluno.nome.split(" ")[0] + "!";
    }

    if (inicialAluno) {
        inicialAluno.textContent =
            usuarioLogadoAluno.nome.charAt(0).toUpperCase();
    }

}

// ==========================================
// BUSCAR RESERVAS
// ==========================================

function buscarReservasAluno() {

    return JSON.parse(
        localStorage.getItem("reservasAgenda") || "[]"
    );

}


// ==========================================
// NORMALIZAR DIA
// ==========================================

function normalizarDia(dia) {

    return dia
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace("-feira", "")
        .trim();

}


// ==========================================
// IDENTIFICAR HORÁRIO
// ==========================================

function identificarHorario(horario) {

    if (horario.includes("18:30")) {
        return "1830";
    }

    if (horario.includes("19:50")) {
        return "1950";
    }

    return null;

}


// ==========================================
// PROTEGER TEXTO
// ==========================================

function escaparTextoAluno(texto) {

    const elemento = document.createElement("div");

    elemento.textContent = texto || "";

    return elemento.innerHTML;

}


// ==========================================
// CRIAR CARD DA RESERVA
// ==========================================

function criarCardReservaAluno(reserva) {

    return `

        <div class="reserva-aprovada-calendario">

            <strong class="reserva-calendario-disciplina">
                ${escaparTextoAluno(reserva.disciplina)}
            </strong>

            <small>
                Professor:
                ${escaparTextoAluno(reserva.professor)}
            </small>

            <small>
                Turma:
                ${escaparTextoAluno(reserva.turma)}
            </small>

            <small>
                Espaço:
                ${escaparTextoAluno(reserva.espaco)}
            </small>

            <small class="reserva-calendario-horario">
                ${escaparTextoAluno(reserva.horario)}
            </small>

            ${
                reserva.motivo
                    ? `
                        <small class="reserva-calendario-motivo">
                            ${escaparTextoAluno(reserva.motivo)}
                        </small>
                      `
                    : ""
            }

        </div>

    `;

}


// ==========================================
// ATUALIZAR CALENDÁRIO
// ==========================================

function atualizarCalendarioAluno() {

    // Remove cards dinâmicos que já estavam na tabela
    document.querySelectorAll(
        ".reserva-aprovada-calendario"
    ).forEach(function(card) {

        card.remove();

    });


    // Busca as reservas
    const reservas = buscarReservasAluno();


    // Filtra somente as aprovadas
    const reservasAprovadas = reservas.filter(function(reserva) {

        return reserva.status === "Aprovada";

    });


    // Percorre as reservas aprovadas
    reservasAprovadas.forEach(function(reserva) {

        const dia = normalizarDia(reserva.dia);

        const horario = identificarHorario(reserva.horario);


        if (!dia || !horario) {
            return;
        }


        // Monta o ID da célula
        const idCelula = `cal-${dia}-${horario}`;


        // Procura a célula do calendário
        let celula = document.getElementById(idCelula);


        // Sexta-feira possui uma célula que ocupa a grade inteira
        if (!celula && dia === "sexta") {

            celula = document.getElementById(
                "cal-sexta-reservas"
            );

        }


        // Se não encontrou a célula, não adiciona
        if (!celula) {
            return;
        }


        // Se o aluno possuir turma cadastrada,
        // mostra somente as reservas da turma dele
        if (
            usuarioLogadoAluno &&
            usuarioLogadoAluno.turma &&
            String(usuarioLogadoAluno.turma).toLowerCase() !==
            String(reserva.turma || "").toLowerCase()
        ) {

            return;

        }


        // Insere o card dentro da célula
        celula.insertAdjacentHTML(

            "beforeend",

            criarCardReservaAluno(reserva)

        );

    });

}


// ==========================================
// EXECUTAR
// ==========================================

atualizarCalendarioAluno();


// Atualiza quando outro documento modifica as reservas
window.addEventListener(
    "storage",
    atualizarCalendarioAluno
);


// Atualiza ao voltar para a página
window.addEventListener(
    "pageshow",
    atualizarCalendarioAluno
);
