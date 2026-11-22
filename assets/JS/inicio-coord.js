/* =========================================
   INÍCIO DA COORDENAÇÃO
========================================= */

// =========================================
// USUÁRIO LOGADO
// =========================================

const usuarioLogado = JSON.parse(
    localStorage.getItem("usuario") || "null"
);

if (!usuarioLogado || usuarioLogado.tipo !== "coordenacao") {
    alert("Faça login como coordenação.");
    window.location.href = "login.html";
}


// =========================================
// ELEMENTOS DA PÁGINA
// =========================================

const tituloBoasVindas = document.getElementById("tituloBoasVindas");

const totalPendentesCoord = document.getElementById("totalPendentesCoord");
const totalAprovadasCoord = document.getElementById("totalAprovadasCoord");
const totalRecusadasCoord = document.getElementById("totalRecusadasCoord");
const totalReservasCoord = document.getElementById("totalReservasCoord");

const listaRecentesCoord = document.getElementById("listaRecentesCoord");


// =========================================
// BOAS-VINDAS
// =========================================

if (usuarioLogado) {
    tituloBoasVindas.textContent = "Olá, " + usuarioLogado.nome + "!";
}


// =========================================
// CARREGAR RESERVAS
// =========================================

function carregarReservasCoord() {

    return JSON.parse(
        localStorage.getItem("reservasAgenda") || "[]"
    );

}


// =========================================
// ATUALIZAR CONTADORES
// =========================================

function atualizarResumoCoord(reservas) {

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
// PROTEGER TEXTO HTML
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
// EXIBIR SOLICITAÇÕES RECENTES
// =========================================

function exibirRecentesCoord(reservas) {

    // Ordenar pelas mais recentes
    const reservasOrdenadas = [...reservas].sort(function(a, b) {
        return Number(b.id) - Number(a.id);
    });

    // Mostrar as 5 mais recentes
    const recentes = reservasOrdenadas.slice(0, 5);

    // Se não houver solicitações
    if (recentes.length === 0) {

        listaRecentesCoord.innerHTML = `
            <div class="vazio-recentes-coord">

                <span>📭</span>

                <h3>Nenhuma solicitação encontrada</h3>

                <p>
                    Quando os professores enviarem reservas,
                    elas aparecerão aqui.
                </p>

            </div>
        `;

        return;
    }

    // Criar cards
    listaRecentesCoord.innerHTML = recentes.map(function(reserva) {

        let statusClasse = "";

        if (reserva.status === "Pendente") {
            statusClasse = "pendente";
        }
        else if (reserva.status === "Aprovada") {
            statusClasse = "aprovada";
        }
        else if (reserva.status === "Recusada") {
            statusClasse = "recusada";
        }

        return `
            <article class="card-recente-coord">

                <div class="recente-info-coord">

                    <div class="recente-topo-coord">

                        <h3>
                            ${escaparHTMLCoord(reserva.espaco)}
                        </h3>

                        <span class="status-coord ${statusClasse}">
                            ${escaparHTMLCoord(reserva.status)}
                        </span>

                    </div>

                    <p class="professor-recente">
                        Professor:
                        ${escaparHTMLCoord(reserva.professor || "Não identificado")}
                    </p>

                    <div class="detalhes-recente-coord">

                        <span>
                            📅 ${escaparHTMLCoord(reserva.dia)}
                        </span>

                        <span>
                            🕒 ${escaparHTMLCoord(reserva.horario)}
                        </span>

                        <span>
                            👥 ${escaparHTMLCoord(reserva.turma)}
                        </span>

                    </div>

                    <p class="disciplina-recente">
                        Disciplina:
                        ${escaparHTMLCoord(reserva.disciplina)}
                    </p>

                </div>

                <button
                    type="button"
                    class="botao-descartar-recente-coord"
                    data-id="${escaparHTMLCoord(reserva.id)}"
                >
                    🗑 Descartar
                </button>

            </article>
        `;

    }).join("");

}


// =========================================
// ATUALIZAR PAINEL COMPLETO
// =========================================

function atualizarPainelCoord() {

    const reservas = carregarReservasCoord();

    atualizarResumoCoord(reservas);

    exibirRecentesCoord(reservas);

}


// =========================================
// DESCARTAR SOLICITAÇÃO DOS RECENTES
// =========================================

listaRecentesCoord.addEventListener("click", function(event) {

    const botao = event.target.closest(
        ".botao-descartar-recente-coord"
    );

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;

    const reservas = carregarReservasCoord();

    const reserva = reservas.find(function(item) {
        return String(item.id) === String(id);
    });

    if (!reserva) {
        alert("Solicitação não encontrada.");
        return;
    }

    const confirmar = confirm(
        "Deseja descartar esta solicitação do histórico?\n\n" +
        "Espaço: " + reserva.espaco + "\n" +
        "Professor: " + reserva.professor + "\n" +
        "Status: " + reserva.status + "\n\n" +
        "Esta ação não poderá ser desfeita."
    );

    if (!confirmar) {
        return;
    }

    const reservasAtualizadas = reservas.filter(function(item) {
        return String(item.id) !== String(id);
    });

    localStorage.setItem(
        "reservasAgenda",
        JSON.stringify(reservasAtualizadas)
    );

    atualizarPainelCoord();

    alert("Solicitação descartada do histórico.");

});


// =========================================
// ATUALIZAÇÃO AUTOMÁTICA
// =========================================

// Ao abrir a página
atualizarPainelCoord();

// Quando as reservas mudarem em outra aba
window.addEventListener("storage", function(event) {

    if (event.key === "reservasAgenda") {
        atualizarPainelCoord();
    }

});

// Ao voltar para a página
window.addEventListener("pageshow", function() {

    atualizarPainelCoord();

});
