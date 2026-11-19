<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agenda - Início Professor</title>

    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body>

    <?php include 'header-prof.php'; ?>

    <main class="area-prof">

        <div class="container-prof">

            <!-- SAUDAÇÃO -->
            <section class="saudacao-prof">

                <div class="icone-prof">
                    <span>P</span>
                </div>

                <div class="texto-saudacao-prof">
                    <h1>Olá, Professor!</h1>

                    <p>
                        Aqui você pode solicitar reservas de salas e laboratórios
                        e acompanhar a organização dos espaços.
                    </p>
                </div>

            </section>

            <!-- DIAS DA SEMANA -->
            <section class="dias-prof">

                <div class="dia-prof">
                    <strong>Segunda</strong>
                    <span>SEG</span>
                </div>

                <div class="dia-prof">
                    <strong>Terça</strong>
                    <span>TER</span>
                </div>

                <div class="dia-prof">
                    <strong>Quarta</strong>
                    <span>QUA</span>
                </div>

                <div class="dia-prof">
                    <strong>Quinta</strong>
                    <span>QUI</span>
                </div>

                <div class="dia-prof">
                    <strong>Sexta</strong>
                    <span>SEX</span>
                </div>

            </section>

            <!-- CONTEÚDO PRINCIPAL -->
            <section class="conteudo-prof">

                <!-- ESPAÇOS DISPONÍVEIS -->
                <div class="salas-prof">

                    <div class="titulo-salas-prof">
                        <div>
                            <h2>Salas e Laboratórios</h2>

                            <p>
                                Escolha o espaço que deseja reservar.
                            </p>
                        </div>

                        <span class="quantidade-espacos">
                            4 espaços
                        </span>
                    </div>

                    <div class="salas-grid">

                        <!-- SALA 1 -->
                        <div class="sala-card">

                            <div class="sala-info">

                                <span class="icone-sala">🏫</span>

                                <div>
                                    <h3>Sala 1</h3>
                                    <p>Sala de Aula</p>
                                </div>

                            </div>

                            <span class="tipo-espaco">Sala</span>

                            <button
                                type="button"
                                class="botao-reserva"
                                onclick="selecionarEspaco('sala1')">

                                📅 Solicitar Reserva

                            </button>

                        </div>

                        <!-- SALA 2 -->
                        <div class="sala-card">

                            <div class="sala-info">

                                <span class="icone-sala">🏫</span>

                                <div>
                                    <h3>Sala 2</h3>
                                    <p>Sala de Aula</p>
                                </div>

                            </div>

                            <span class="tipo-espaco">Sala</span>

                            <button
                                type="button"
                                class="botao-reserva secundario"
                                onclick="selecionarEspaco('sala2')">

                                📅 Solicitar Reserva

                            </button>

                        </div>

                        <!-- LABORATÓRIO 1 -->
                        <div class="sala-card">

                            <div class="sala-info">

                                <span class="icone-sala">💻</span>

                                <div>
                                    <h3>Laboratório 1</h3>
                                    <p>Laboratório de Informática</p>
                                </div>

                            </div>

                            <span class="tipo-espaco lab">Laboratório</span>

                            <button
                                type="button"
                                class="botao-reserva secundario"
                                onclick="selecionarEspaco('lab1')">

                                📅 Solicitar Reserva

                            </button>

                        </div>

                        <!-- LABORATÓRIO 2 -->
                        <div class="sala-card">

                            <div class="sala-info">

                                <span class="icone-sala">💻</span>

                                <div>
                                    <h3>Laboratório 2</h3>
                                    <p>Laboratório de Informática</p>
                                </div>

                            </div>

                            <span class="tipo-espaco lab">Laboratório</span>

                            <button
                                type="button"
                                class="botao-reserva secundario"
                                onclick="selecionarEspaco('lab2')">

                                📅 Solicitar Reserva

                            </button>

                        </div>

                    </div>

                </div>

                <!-- FORMULÁRIO DE RESERVA -->
                <div class="form-reserva-prof" id="formulario-reserva">

                    <div class="titulo-form-reserva">

                        <span class="icone-form-reserva">📅</span>

                        <div>
                            <h2>Solicitar Reserva</h2>

                            <p>
                                Preencha os dados para solicitar um espaço.
                            </p>
                        </div>

                    </div>

                    <!-- AVISO -->
                    <div class="aviso-reserva">

                        <span>ℹ️</span>

                        <p>
                            Sua solicitação será enviada para análise da
                            coordenação. A reserva só será confirmada
                            após a aprovação.
                        </p>

                    </div>

                    <form id="formReservaProf">

                        <!-- DIA -->
                        <label for="dia">Dia da semana</label>

                        <select id="dia" name="dia" required>

                            <option value="">Selecione o dia</option>

                            <option value="segunda">Segunda-feira</option>
                            <option value="terca">Terça-feira</option>
                            <option value="quarta">Quarta-feira</option>
                            <option value="quinta">Quinta-feira</option>
                            <option value="sexta">Sexta-feira</option>

                        </select>

                        <!-- HORÁRIO -->
                        <label for="horario">Horário</label>

                        <select id="horario" name="horario" required>

                            <option value="">Selecione o horário</option>

                            <option value="18:30-19:50">
                                18:30 - 19:50
                            </option>

                            <option value="19:50-20:50">
                                19:50 - 20:50
                            </option>

                        </select>

                        <!-- TURMA -->
                        <label for="turma">Turma</label>

                        <input
                            type="text"
                            id="turma"
                            name="turma"
                            placeholder="Ex.: 2A"
                            required
                        >

                        <!-- DISCIPLINA -->
                        <label for="disciplina">Disciplina</label>

                        <input
                            type="text"
                            id="disciplina"
                            name="disciplina"
                            placeholder="Digite o nome da disciplina"
                            required
                        >

                        <!-- ESPAÇO -->
                        <label for="espaco">Espaço desejado</label>

                        <select id="espaco" name="espaco" required>

                            <option value="">Selecione o espaço</option>

                            <option value="sala1">Sala 1</option>
                            <option value="sala2">Sala 2</option>
                            <option value="lab1">Laboratório 1</option>
                            <option value="lab2">Laboratório 2</option>

                        </select>

                        <!-- MOTIVO -->
                        <label for="motivo">Observações (opcional)</label>

                        <textarea
                            id="motivo"
                            name="motivo"
                            rows="3"
                            placeholder="Descreva alguma informação adicional..."
                        ></textarea>

                        <!-- BOTÃO -->
                        <button
                            type="submit"
                            class="enviar-reserva">

                            ➤ Enviar Solicitação

                        </button>

                    </form>

                    <div id="mensagem-reserva" class="mensagem-reserva"></div>

                </div>

            </section>

            <!-- INFORMAÇÕES -->
            <section class="informacoes-prof">

                <div class="informacao-prof-item">

                    <span>ℹ️</span>

                    <div>
                        <strong>Como funciona o agendamento?</strong>

                        <p>
                            Após preencher e enviar sua solicitação,
                            a coordenação verificará a disponibilidade
                            do espaço e poderá aprovar ou recusar o pedido.
                        </p>
                    </div>

                </div>

            </section>

        </div>

    </main>

    <?php include 'footer.php'; ?>

    <script>

        // Seleciona o espaço ao clicar no botão de uma sala
        function selecionarEspaco(espaco) {

            document.getElementById("espaco").value = espaco;

            document.getElementById("formulario-reserva").scrollIntoView({
                behavior: "smooth"
            });

        }

        // Demonstração de envio do formulário
        document.getElementById("formReservaProf").addEventListener("submit", function(event) {

            event.preventDefault();

            const dia = document.getElementById("dia").value;
            const horario = document.getElementById("horario").value;
            const turma = document.getElementById("turma").value;
            const disciplina = document.getElementById("disciplina").value;
            const espaco = document.getElementById("espaco").value;

            const mensagem = document.getElementById("mensagem-reserva");

            mensagem.innerHTML = `
                <strong>Solicitação preenchida com sucesso!</strong>
                <p>
                    ${disciplina} - Turma ${turma}<br>
                    Dia: ${dia}<br>
                    Horário: ${horario}<br>
                    Espaço: ${espaco}
                </p>
                <small>
                    Esta é uma demonstração. A solicitação ainda não foi
                    enviada para a coordenação.
                </small>
            `;

            mensagem.style.display = "block";

            mensagem.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        });

    </script>

</body>

</html>
