<!DOCTYPE html>

<html lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agenda - Contato</title>

    <link rel="stylesheet" href="assets/CSS/style.css">

</head>

<body>

    <?php include 'header-aluno.php'; ?>

    <main class="area-contato">

        <div class="contato">

            <h1>Entre em contato</h1>

            <p class="texto-contato">
                Tem alguma dúvida ou precisa de ajuda?
                Entre em contato conosco.
            </p>


            <div class="contato-conteudo">


                <!-- Informações -->

                <div class="info-contato">

                    <h2>Fale conosco</h2>

                    <p>
                        Caso tenha alguma dúvida sobre o sistema
                        de agendamento, entre em contato com a
                        coordenação.
                    </p>

                    <p>
                        <strong>E-mail:</strong><br>
                        agendamento@portodigital.com.br
                    </p>

                    <p>
                        <strong>Telefone:</strong><br>
                        (81) 0000-0000
                    </p>

                    <p>
                        <strong>Horário de atendimento:</strong><br>
                        Segunda a sexta, das 08:00 às 21:00.
                    </p>

                </div>


                <!-- Formulário -->

                <div class="form-contato">

                    <h2>Envie uma mensagem</h2>

                    <label for="nome">Nome</label>

                    <input
                        type="text"
                        id="nome"
                        placeholder="Digite seu nome"
                    >


                    <label for="email">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                    >


                    <label for="assunto">Assunto</label>

                    <select id="assunto">

                        <option value="">Selecione um assunto</option>

                        <option value="duvida">Dúvida</option>

                        <option value="reserva">Reserva</option>

                        <option value="problema">Problema</option>

                        <option value="outro">Outro</option>

                    </select>


                    <label for="mensagem">Mensagem</label>

                    <textarea
                        id="mensagem"
                        placeholder="Digite sua mensagem"
                    ></textarea>


                    <button type="button">
                        Enviar mensagem
                    </button>

                </div>

            </div>

        </div>

    </main>


    <?php include 'footer.php'; ?>