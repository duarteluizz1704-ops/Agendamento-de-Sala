
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agendamento - Minhas Reservas</title>

    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body>

    <?php include 'header-prof.php'; ?>

    <main class="area-reservas-prof">

        <div class="reservas-container">

            <!-- Apresentação -->
            <div class="reservas-intro">

                <div>
                    <h1>Minhas Reservas</h1>

                    <p>
                        Acompanhe suas solicitações e consulte
                        as reservas de salas e laboratórios.
                    </p>
                </div>

                <a href="inicio-prof.php" class="btn-nova-reserva">
                    + Nova Reserva
                </a>

            </div>


            <!-- Resumo -->
            <section class="resumo-reservas">

                <div class="resumo-card">
                    <span class="resumo-icone">📋</span>

                    <div>
                        <h3>03</h3>
                        <p>Total de solicitações</p>
                    </div>
                </div>

                <div class="resumo-card pendente-card">
                    <span class="resumo-icone">⏳</span>

                    <div>
                        <h3>01</h3>
                        <p>Pendentes</p>
                    </div>
                </div>

                <div class="resumo-card confirmada-card">
                    <span class="resumo-icone">✓</span>

                    <div>
                        <h3>01</h3>
                        <p>Confirmadas</p>
                    </div>
                </div>

                <div class="resumo-card recusada-card">
                    <span class="resumo-icone">✕</span>

                    <div>
                        <h3>01</h3>
                        <p>Recusadas</p>
                    </div>
                </div>

            </section>


            <!-- Lista de reservas -->
            <section class="lista-reservas">

                <div class="titulo-reservas">
                    <div>
                        <h2>Histórico de solicitações</h2>

                        <p>
                            Confira os detalhes e o andamento das suas reservas.
                        </p>
                    </div>
                </div>


                <!-- Reserva 1 -->
                <div class="reserva-item">

                    <div class="reserva-data">
                        <span>TER</span>
                        <strong>18</strong>
                        <small>NOV</small>
                    </div>

                    <div class="reserva-info">

                        <h3>Laboratório 1</h3>

                        <p>
                            <strong>Disciplina:</strong> PNT-WEB
                        </p>

                        <p>
                            <strong>Turma:</strong> Mod 2A
                        </p>

                        <div class="reserva-detalhes">
                            <span>🕒 18h30 - 20h50</span>
                            <span>📍 Laboratório de Informática</span>
                        </div>

                    </div>

                    <div class="reserva-status">
                        <span class="status pendente">
                            Pendente
                        </span>

                        <small>Aguardando aprovação</small>
                    </div>

                </div>


                <!-- Reserva 2 -->
                <div class="reserva-item">

                    <div class="reserva-data">
                        <span>QUA</span>
                        <strong>19</strong>
                        <small>NOV</small>
                    </div>

                    <div class="reserva-info">

                        <h3>Sala 1</h3>

                        <p>
                            <strong>Disciplina:</strong> Engenharia de Software
                        </p>

                        <p>
                            <strong>Turma:</strong> Mod 2A
                        </p>

                        <div class="reserva-detalhes">
                            <span>🕒 18h30 - 20h50</span>
                            <span>📍 Sala de Aula</span>
                        </div>

                    </div>

                    <div class="reserva-status">
                        <span class="status confirmada">
                            Confirmada
                        </span>

                        <small>Reserva aprovada</small>
                    </div>

                </div>


                <!-- Reserva 3 -->
                <div class="reserva-item">

                    <div class="reserva-data">
                        <span>QUI</span>
                        <strong>20</strong>
                        <small>NOV</small>
                    </div>

                    <div class="reserva-info">

                        <h3>Laboratório 2</h3>

                        <p>
                            <strong>Disciplina:</strong> PNT-WEB
                        </p>

                        <p>
                            <strong>Turma:</strong> Mod 2A
                        </p>

                        <div class="reserva-detalhes">
                            <span>🕒 19h50 - 20h50</span>
                            <span>📍 Laboratório de Informática</span>
                        </div>

                    </div>

                    <div class="reserva-status">
                        <span class="status recusada">
                            Recusada
                        </span>

                        <small>Horário indisponível</small>
                    </div>

                </div>

            </section>


            <!-- Acesso ao SIEPE -->
            <section class="siepe-prof">

                <div class="siepe-texto">

                    <h2>Precisa acessar o SIEPE?</h2>

                    <p>
                        Consulte suas informações acadêmicas,
                        notas, frequência e outros dados escolares
                        diretamente pelo sistema oficial.
                    </p>

                </div>

                <a
                    href="https://www.siepe.educacao.pe.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-siepe-prof"
                >
                    Acessar SIEPE ↗
                </a>

            </section>

        </div>

    </main>

    <?php include 'footer.php'; ?>

</body>
</html>
