
/* =========================================
   GERENCIAMENTO DE RESERVAS - COORDENAÇÃO
========================================= */


// =========================================
// USUÁRIO LOGADO
// =========================================

const usuarioCoord = JSON.parse(
    localStorage.getItem("usuario") || "null"
);


// Verifica se é coordenação
if (!usuarioCoord || usuarioCoord.tipo !== "coordenacao") {

    alert("Faça login como coordenação.");

    window.location.href = "login.html";

}


// =========================================
// ELEMENTOS
// =========================================

const totalPendentesCoord = document.getElementById("totalPendentesCoord");
const totalAprovadasCoord = document.getElementById("totalAprovadasCoord");
const totalRecusadasCoord = document.getElementById("totalRecusadasCoord");
const totalReservasCoord = document.getElementById("totalReservasCoord");

const filtroStatusCoord = document.getElementById("filtroStatusCoord");
const pesquisaReservaCoord = document.getElementById("pesquisaReservaCoord");

const quantidadeExibidaCoord = document.getElementById("quantidadeExibidaCoord");
const listaReservasCoord = document.getElementById("listaReservasCoord");


// =========================================
// CARREGAR RESERVAS
// =========================================

function carregarReservasCoord() {

    return JSON.parse(
        localStorage.getItem("reservasAgenda") || "[]"
    );

}


// =========================================
// SALVAR RESERVAS
// =========================================

function salvarReservasCoord(reservas) {

    localStorage.setItem(
        "reservasAgenda",
        JSON.stringify(reservas)
    );

}


// =========================================
// ESCAPAR HTML
// =========================================

function escaparHTMLCoord(texto) {

    return String(texto || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// =========================================
// ATUALIZAR CONTADORES
// =========================================

function atualizarContadoresCoord(reservas) {

    const pendentes = reservas.filter(function(reserva) {
        return reserva.status === "Pendente";
    });

    const aprovadas = reservas.filter(function(reserva) {
        return reserva.status === "Aprovada";
    });

    const recusadas = reservas.filter(function(reserva) {
        return reserva.status === "Recusada";
    });


    totalPendentesCoord.textContent = pendentes.length;

    totalAprovadasCoord.textContent = aprovadas.length;

    totalRecusadasCoord.textContent = recusadas.length;

    totalReservasCoord.textContent = reservas.length;

}


// =========================================
// DATA DA ANÁLISE
// =========================================

function obterDataAtualCoord() {

    return new Date().toLocaleDateString("pt-BR");

}


// =========================================
// VERIFICAR CONFLITO DE HORÁRIO
// =========================================

function verificarConflitoCoord(reservas, reservaAtual) {

    return reservas.some(function(reserva) {

        // Não compara com a própria reserva
        if (String(reserva.id) === String(reservaAtual.id)) {
            return false;
        }

        // Reservas recusadas não ocupam espaço
        if (reserva.status === "Recusada") {
            return false;
        }

        // Verifica espaço, dia e horário
        return (
            reserva.espaco === reservaAtual.espaco &&
            reserva.dia === reservaAtual.dia &&
            reserva.horario === reservaAtual.horario
        );

    });

}


// =========================================
// CLASSE DO STATUS
// =========================================

function obterClasseStatusCoord(status) {

    if (status === "Pendente") {
        return "pendente";
    }

    if (status === "Aprovada") {
        return "aprovada";
    }

    if (status === "Recusada") {
        return "recusada";
    }

    return "";

}


// =========================================
// FILTRAR RESERVAS
// =========================================

function filtrarReservasCoord(reservas) {

    const statusSelecionado = filtroStatusCoord.value;

    const pesquisa = pesquisaReservaCoord.value
        .trim()
        .toLowerCase();


    return reservas.filter(function(reserva) {

        // Filtro de status
        const correspondeStatus =
            statusSelecionado === "Todas" ||
            reserva.status === statusSelecionado;


        // Dados pesquisáveis
        const dadosPesquisa = [

            reserva.professor,
            reserva.turma,
            reserva.disciplina,
            reserva.espaco,
            reserva.dia,
            reserva.horario,
            reserva.motivo

        ].join(" ").toLowerCase();


        // Filtro de texto
        const correspondePesquisa =
            dadosPesquisa.includes(pesquisa);


        return correspondeStatus && correspondePesquisa;

    });

}


// =========================================
// EXIBIR RESERVAS
// =========================================

function exibirReservasCoord() {

    const reservas = carregarReservasCoord();


    // Atualiza os contadores independentemente dos filtros
    atualizarContadoresCoord(reservas);


    // Aplica os filtros
    const reservasFiltradas = filtrarReservasCoord(reservas);


    // Ordena por mais recentes primeiro
    reservasFiltradas.sort(function(a, b) {

        return Number(b.id) - Number(a.id);

    });


    // Atualiza quantidade exibida
    quantidadeExibidaCoord.textContent =
        reservasFiltradas.length +
        (reservasFiltradas.length === 1
            ? " solicitação"
            : " solicitações");


    // Lista vazia
    if (reservasFiltradas.length === 0) {

        listaReservasCoord.innerHTML = `
            <div class="reservas-vazias-coord">

                <span class="icone-vazio-coord">📭</span>

                <h3>Nenhuma solicitação encontrada</h3>

                <p>
                    Não existem solicitações correspondentes
                    aos filtros selecionados.
                </p>

            </div>
        `;

        return;

    }


    // Monta os cards
    listaReservasCoord.innerHTML = reservasFiltradas.map(function(reserva) {

        const statusClasse = obterClasseStatusCoord(reserva.status);


        // Botões somente para pendentes
        let botoes = "";

        if (reserva.status === "Pendente") {

            botoes = `
                <div class="acoes-reserva-coord">

                    <button
                        type="button"
                        class="botao-aprovar-coord"
                        data-acao="aprovar"
                        data-id="${escaparHTMLCoord(reserva.id)}"
                    >
                        ✓ Aprovar
                    </button>

                    <button
                        type="button"
                        class="botao-recusar-coord"
                        data-acao="recusar"
                        data-id="${escaparHTMLCoord(reserva.id)}"
                    >
                        ✕ Recusar
                    </button>

                </div>
            `;

        }


        // Justificativa de recusa
        let justificativa = "";

        if (
            reserva.status === "Recusada" &&
            reserva.justificativa
        ) {

            justificativa = `
                <div class="justificativa-coord">

                    <strong>Motivo da recusa:</strong>

                    <p>
                        ${escaparHTMLCoord(reserva.justificativa)}
                    </p>

                </div>
            `;

        }


        // Data da análise
        let dataAnalise = "";

        if (reserva.dataAnalise) {

            dataAnalise = `
                <p class="data-analise-coord">
                    Data da análise:
                    ${escaparHTMLCoord(reserva.dataAnalise)}
                </p>
            `;

        }


        return `
            <article class="card-reserva-coord">

                <div class="topo-card-reserva-coord">

                    <div>

                        <h3>
                            ${escaparHTMLCoord(reserva.espaco)}
                        </h3>

                        <p class="professor-card-coord">
                            Solicitado por:
                            ${escaparHTMLCoord(reserva.professor || "Professor não identificado")}
                        </p>

                    </div>

                    <span class="status-reserva-coord ${statusClasse}">
                        ${escaparHTMLCoord(reserva.status)}
                    </span>

                </div>


                <div class="informacoes-reserva-coord">

                    <div class="info-reserva-coord">

                        <span>📅</span>

                        <div>
                            <strong>Dia</strong>

                            <p>
                                ${escaparHTMLCoord(reserva.dia)}
                            </p>
                        </div>

                    </div>


                    <div class="info-reserva-coord">

                        <span>🕒</span>

                        <div>
                            <strong>Horário</strong>

                            <p>
                                ${escaparHTMLCoord(reserva.horario)}
                            </p>
                        </div>

                    </div>


                    <div class="info-reserva-coord">

                        <span>👥</span>

                        <div>
                            <strong>Turma</strong>

                            <p>
                                ${escaparHTMLCoord(reserva.turma)}
                            </p>
                        </div>

                    </div>


                    <div class="info-reserva-coord">

                        <span>📚</span>

                        <div>
                            <strong>Disciplina</strong>

                            <p>
                                ${escaparHTMLCoord(reserva.disciplina)}
                            </p>
                        </div>

                    </div>

                </div>


                <div class="motivo-solicitacao-coord">

                    <strong>Motivo da solicitação:</strong>

                    <p>
                        ${escaparHTMLCoord(reserva.motivo)}
                    </p>

                </div>


                <p class="data-solicitacao-coord">
                    Solicitado em:
                    ${escaparHTMLCoord(reserva.dataSolicitacao)}
                </p>


                ${dataAnalise}

                ${justificativa}

                ${botoes}

            </article>
        `;

    }).join("");

}


// =========================================
// APROVAR SOLICITAÇÃO
// =========================================

function aprovarReservaCoord(id) {

    const reservas = carregarReservasCoord();


    const reserva = reservas.find(function(item) {

        return String(item.id) === String(id);

    });


    if (!reserva) {

        alert("Solicitação não encontrada.");

        return;

    }


    if (reserva.status !== "Pendente") {

        alert("Essa solicitação já foi analisada.");

        return;

    }


    // Verifica se o horário já está ocupado
    const conflito = verificarConflitoCoord(
        reservas,
        reserva
    );


    if (conflito) {

        alert(
            "Não é possível aprovar esta solicitação.\n\n" +
            "Já existe outra reserva para este espaço, " +
            "dia e horário que não foi recusada."
        );

        return;

    }


    const confirmar = confirm(
        "Deseja aprovar esta solicitação?\n\n" +
        reserva.espaco + "\n" +
        reserva.dia + "\n" +
        reserva.horario
    );


    if (!confirmar) {
        return;
    }


    reserva.status = "Aprovada";

    reserva.dataAnalise = obterDataAtualCoord();

    reserva.justificativa = "";


    salvarReservasCoord(reservas);

    exibirReservasCoord();


    alert("Solicitação aprovada com sucesso!");

}


// =========================================
// RECUSAR SOLICITAÇÃO
// =========================================

function recusarReservaCoord(id) {

    const reservas = carregarReservasCoord();


    const reserva = reservas.find(function(item) {

        return String(item.id) === String(id);

    });


    if (!reserva) {

        alert("Solicitação não encontrada.");

        return;

    }


    if (reserva.status !== "Pendente") {

        alert("Essa solicitação já foi analisada.");

        return;

    }


    // Solicita o motivo
    const justificativa = prompt(
        "Informe o motivo da recusa:"
    );


    // Cancelou
    if (justificativa === null) {
        return;
    }


    // Não permite motivo vazio
    if (justificativa.trim() === "") {

        alert("É necessário informar o motivo da recusa.");

        return;

    }


    const confirmar = confirm(
        "Deseja realmente recusar esta solicitação?"
    );


    if (!confirmar) {
        return;
    }


    reserva.status = "Recusada";

    reserva.justificativa = justificativa.trim();

    reserva.dataAnalise = obterDataAtualCoord();


    salvarReservasCoord(reservas);

    exibirReservasCoord();


    alert("Solicitação recusada.");

}


// =========================================
// BOTÕES DE APROVAR E RECUSAR
// =========================================

listaReservasCoord.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");


    if (!botao) {
        return;
    }


    const acao = botao.dataset.acao;

    const id = botao.dataset.id;


    if (acao === "aprovar") {

        aprovarReservaCoord(id);

    }


    if (acao === "recusar") {

        recusarReservaCoord(id);

    }

});


// =========================================
// FILTROS
// =========================================

filtroStatusCoord.addEventListener("change", function() {

    exibirReservasCoord();

});


pesquisaReservaCoord.addEventListener("input", function() {

    exibirReservasCoord();

});


// =========================================
// ATUALIZAÇÃO AUTOMÁTICA
// =========================================

// Ao abrir a página
exibirReservasCoord();


// Ao mudar reservas em outra aba
window.addEventListener("storage", function(event) {

    if (event.key === "reservasAgenda") {

        exibirReservasCoord();

    }

});


// Ao voltar para a página
window.addEventListener("pageshow", function() {

    exibirReservasCoord();

});
