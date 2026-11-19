<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agenda - Login</title>

<link rel="stylesheet" href="assets/CSS/style.css?v=2"></head>

<body>

    <header class="header">
        <div class="logo">
            <img src="assets/IMG/logoete.png" alt="Logo ETE">
            <div>
                <h2>Agendamento</h2>
                <p>Salas e Laboratórios • Portal do Aluno</p>
            </div>
        </div>
    </header>

    <main class="login-area">

        <div class="login">

            <div class="topo-login">
                <img src="assets/IMG/logoete.png" alt="Logo ETE">
            </div>

            <div class="conteudo-login">

                <h1>Login</h1>

                <p class="subtitulo-login">Digite sua matrícula para acessar o sistema</p>

                <form id="form-login">

                    <label for="matricula" class="sr-only">Matrícula</label>
                    <input
                        type="text"
                        id="matricula"
                        name="matricula"
                        placeholder="Matrícula"
                        maxlength="10"
                        autocomplete="off"
                        required
                    >

                    <p id="mensagem-login" role="alert" aria-live="polite"></p>

                    <button type="submit" class="btn-entrar">
                        Entrar
                    </button>

                </form>

                <!-- Matrículas de teste -->
                <div class="matriculas-teste">

                    <p class="titulo-teste">
                        Usuários para teste
                    </p>

                    <div class="tabela-container">

                        <table class="tabela-usuarios">

                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Nome</th>
                                    <th>Matrícula</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Aluno</td>
                                    <td>Luiz Arthur</td>
                                    <td class="matricula-codigo">1001</td>
                                </tr>

                                <tr>
                                    <td>Professor</td>
                                    <td>Luiz Carlos</td>
                                    <td class="matricula-codigo">2001</td>
                                </tr>

                                <tr>
                                    <td>Coordenação</td>
                                    <td>Aline Chagas</td>
                                    <td class="matricula-codigo">3001</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </main>

    <?php include 'footer.php'; ?>

    <script src="assets/JS/login.js"></script>

</body>
</html>