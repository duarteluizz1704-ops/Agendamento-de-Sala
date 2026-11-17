
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

        <!-- Saudação -->
        <section class="saudacao-prof">

            <div class="icone-prof">
                <span>P</span>
            </div>

            <div>
                <h1>Olá, Professor(a)!</h1>
                <p>Aqui você pode solicitar reservas de salas e laboratórios.</p>
            </div>

        </section>


        <!-- Dias da semana -->
        <section class="dias-prof">

            <div class="dia-prof ativo">
                <strong>Segunda</strong>
                <span>1</span>
            </div>

            <div class="dia-prof">
                <strong>Terça</strong>
                <span>2</span>
            </div>

            <div class="dia-prof">
                <strong>Quarta</strong>
                <span>3</span>
            </div>

            <div class="dia-prof">
                <strong>Quinta</strong>
                <span>4</span>
            </div>

            <div class="dia-prof">
                <strong>Sexta</strong>
                <span>5</span>
            </div>

            <a href="calendario-prof.php" class="ver-calendario">
                📅 Ver calendário
            </a>

        </section>


        <!-- Conteúdo principal -->
        <section class="conteudo-prof">

            <!-- Salas e laboratórios -->
            <div class="salas-prof">

                <h2>Salas e Laboratórios</h2>

                <div class="salas-grid">

                    <!-- Sala 1 -->
                    <div class="sala-card selecionada">

                        <div class="sala-info">
                            <span class="icone-sala">▣</span>

                            <div>
                                <h3>Sala 1</h3>
                                <p>Sala de Aula</p>
                            </div>
                        </div>

                        <button type="button" class="botao-reserva">
                            📅 Solicitar Reserva
                        </button>

                    </div>


                    <!-- Sala 2 -->
                    <div class="sala-card">

                        <div class="sala-info">
                            <span class="icone-sala">▣</span>

                            <div>
                                <h3>Sala 2</h3>
                                <p>Sala de Aula</p>
                            </div>
                        </div>

                        <button type="button" class="botao-reserva secundario">
                            📅 Solicitar Reserva
                        </button>

                    </div>


                    <!-- Laboratório 1 -->
                    <div class="sala-card">

                        <div class="sala-info">
                            <span class="icone-sala">▣</span>

                            <div>
                                <h3>Lab 1</h3>
                                <p>Laboratório de Informática</p>
                            </div>
                        </div>

                        <button type="button" class="botao-reserva secundario">
                            📅 Solicitar Reserva
                        </button>

                    </div>


                    <!-- Laboratório 2 -->
                    <div class="sala-card">

                        <div class="sala-info">
                            <span class="icone-sala">▣</span>

                            <div>
                                <h3>Lab 2</h3>
                                <p>Laboratório de Informática</p>
                            </div>
                        </div>

                        <button type="button" class="botao-reserva secundario">
                            📅 Solicitar Reserva
                        </button>

                    </div>

                </div>

            </div>


            <!-- Formulário de reserva -->
            <div class="form-reserva-prof">

                <h2>📅 Solicitar Reserva</h2>

                <div class="aviso-reserva">
                    <span>ⓘ</span>

                    <p>
                        Sua solicitação será enviada para a secretaria,
                        que irá analisar e confirmar o agendamento.
                    </p>
                </div>


                <form>

                    <label for="dia">Dia</label>

                    <select id="dia" name="dia">
                        <option value="">Selecione o dia</option>
                        <option value="segunda">Segunda-feira</option>
                        <option value="terca">Terça-feira</option>
                        <option value="quarta">Quarta-feira</option>
                        <option value="quinta">Quinta-feira</option>
                        <option value="sexta">Sexta-feira</option>
                    </select>


                    <label for="horario">Horário</label>

                    <select id="horario" name="horario">
                        <option value="">Selecione o horário</option>
                        <option value="18:30">18:30 - 19:50</option>
                        <option value="19:30">19:50 - 20:50</option>
                    </select>


                    <label for="turma">Turma</label>

                    <input
                        type="text"
                        id="turma"
                        name="turma"
                        placeholder="Digite a turma"
                    >


                    <label for="disciplina">Disciplina</label>

                    <input
                        type="text"
                        id="disciplina"
                        name="disciplina"
                        placeholder="Digite a disciplina"
                    >


                    <label for="espaco">Espaço desejado</label>

                    <select id="espaco" name="espaco">
                        <option value="">Selecione o espaço</option>
                        <option value="sala1">Sala 1</option>
                        <option value="sala2">Sala 2</option>
                        <option value="lab1">Laboratório 1</option>
                        <option value="lab2">Laboratório 2</option>
                    </select>


                    <button type="button" class="enviar-reserva">
                        ➤ Enviar Solicitação
                    </button>

                </form>

            </div>

        </section>

    </main>

    <?php include 'footer.php'; ?>

</body>
</html>
