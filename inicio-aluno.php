
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agenda - Início do Aluno</title>

    <link rel="stylesheet" href="assets/CSS/style.css">

</head>

<body>

    <?php include 'header-aluno.php'?>


    <!-- CONTEÚDO PRINCIPAL -->
    <main class="area-aluno">

        <!-- BOAS-VINDAS -->
        <section class="boas-vindas">

            <div class="icone-aluno">A</div>

            <div>
                <h1>Olá, Aluno(a)!</h1>
                <p>Confira sua grade de aulas da semana e fique por dentro dos seus horários.</p>
            </div>

        </section>


        <div class="painel-aluno">

            <!-- CRONOGRAMA -->
            <section class="semana">

                <div class="titulo-semana">

                    <h2>📅 Minha Semana</h2>

                    <a href="calendario-aluno.php">Ver calendário</a>

                </div>


                <div class="tabela-container">

                    <table class="tabela-horarios">

                        <thead>

                            <tr>
                                <th>Horário</th>
                                <th>Segunda</th>
                                <th>Terça</th>
                                <th>Quarta</th>
                                <th>Quinta</th>
                                <th>Sexta</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td class="horario">17:50<br>18:30</td>

                                <td>
                                    <div class="aula aula-segunda">
                                        <strong>ATC</strong>
                                        <small>Revezamento A/B</small>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-pnt">
                                        <strong>PNT-WEB</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td class="sem-aula">—</td>
                            </tr>


                            <tr>
                                <td class="horario">18:30<br>19:10</td>

                                <td>
                                    <div class="aula aula-segunda">
                                        <strong>PI2</strong>
                                        <small>Revezamento A/B</small>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-pnt">
                                        <strong>PNT-WEB</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td class="sem-aula">—</td>
                            </tr>


                            <tr>
                                <td class="horario">19:10<br>19:50</td>

                                <td>
                                    <div class="aula aula-segunda">
                                        <strong>PI2</strong>
                                        <small>Revezamento A/B</small>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-pnt">
                                        <strong>PNT-WEB</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td class="sem-aula">—</td>
                            </tr>


                            <tr>
                                <td class="horario">19:50<br>20:30</td>

                                <td class="sem-aula">—</td>

                                <td>
                                    <div class="aula aula-pnt">
                                        <strong>PNT-WEB</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-cdm">
                                        <strong>CDM</strong>
                                    </div>
                                </td>

                                <td class="sem-aula">—</td>
                            </tr>


                            <tr>
                                <td class="horario">20:30<br>21:10</td>

                                <td class="sem-aula">—</td>

                                <td>
                                    <div class="aula aula-pnt">
                                        <strong>PNT-WEB</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-eng">
                                        <strong>ENG-SOF</strong>
                                    </div>
                                </td>

                                <td>
                                    <div class="aula aula-cdm">
                                        <strong>CDM</strong>
                                    </div>
                                </td>

                                <td class="sem-aula">—</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

                <div class="aviso-segunda">
                    <strong> Atenção:</strong>
                    As aulas de segunda-feira seguem um revezamento entre as turmas A e B.
                    Quando uma turma tem aula, a outra não tem. Na segunda seguinte, o revezamento se inverte.
                </div>

            </section>


            <!-- PAINEL LATERAL -->
            <aside class="painel-lateral">


                <!-- RESUMO DA SEMANA -->
                <section class="card-lateral">

                    <h2>📚 Resumo da Semana</h2>

                    <div class="resumo-item">
                        <span>Segunda-feira</span>
                        <strong>Revezamento A/B</strong>
                    </div>

                    <div class="resumo-item">
                        <span>Terça-feira</span>
                        <strong>PNT-WEB</strong>
                    </div>

                    <div class="resumo-item">
                        <span>Quarta-feira</span>
                        <strong>ENG-SOF</strong>
                    </div>

                    <div class="resumo-item">
                        <span>Quinta-feira</span>
                        <strong>ENG-SOF / CDM</strong>
                    </div>

                    <div class="resumo-item">
                        <span>Sexta-feira</span>
                        <strong>Sem aula</strong>
                    </div>

                </section>


                <!-- LEGENDA -->
                <section class="card-lateral">

                    <h2>🎨 Legenda</h2>

                    <div class="legenda-item">
                        <span class="cor cor-segunda"></span>
                        ATC / PI2
                    </div>

                    <div class="legenda-item">
                        <span class="cor cor-pnt"></span>
                        PNT-WEB
                    </div>

                    <div class="legenda-item">
                        <span class="cor cor-eng"></span>
                        Engenharia de Software
                    </div>

                    <div class="legenda-item">
                        <span class="cor cor-cdm"></span>
                        Cultura do Mundo Digital
                    </div>

                    <div class="legenda-item">
                        <span class="cor cor-livre"></span>
                        Sem aula
                    </div>

                </section>


                <!-- AVISOS -->
                <section class="card-lateral eventos">

                    <h2>📢 Avisos e Informações</h2>

                    <div class="aviso aviso-azul">
                        <strong>Organização das aulas</strong>
                        <p>Consulte sua grade semanal para acompanhar os horários.</p>
                    </div>

                    <div class="aviso aviso-amarelo">
                        <strong>Revezamento de segunda</strong>
                        <p>Confira se sua turma terá aula na próxima segunda-feira.</p>
                    </div>

                    <div class="aviso aviso-verde">
                        <strong>Sexta-feira</strong>
                        <p>Não temos aula devido à atividade de Projeto de Vida.</p>
                    </div>

                </section>

            </aside>

        </div>

    </main>

    <?php include 'footer.php'; ?>