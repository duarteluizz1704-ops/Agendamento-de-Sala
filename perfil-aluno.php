
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agenda - Perfil do Aluno</title>

    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body>

    <?php include 'header-aluno.php'; ?>

    <main class="area-perfil">

        <div class="perfil-container">

            <!-- Título -->
            <div class="titulo-perfil">
                <h1>Meu Perfil</h1>
                <p>Consulte suas informações pessoais e acadêmicas.</p>
            </div>

            <!-- Informações principais -->
            <section class="perfil-principal">

                <div class="perfil-avatar">
                    A
                </div>

                <div class="perfil-identificacao">
                    <h2>Nome do Aluno</h2>
                    <p>Estudante - Desenvolvimento de Sistemas</p>
                    <span>ETE - Escola Técnica Estadual</span>
                </div>

            </section>

            <!-- Dados acadêmicos -->
            <section class="perfil-card">

                <h2>📋 Informações Acadêmicas</h2>

                <div class="dados-grid">

                    <div class="dado">
                        <span>Nome completo</span>
                        <strong>Nome do Aluno</strong>
                    </div>

                    <div class="dado">
                        <span>Matrícula</span>
                        <strong>000000</strong>
                    </div>

                    <div class="dado">
                        <span>Curso</span>
                        <strong>Desenvolvimento de Sistemas</strong>
                    </div>

                    <div class="dado">
                        <span>Turma</span>
                        <strong>Mod 2A</strong>
                    </div>

                    <div class="dado">
                        <span>Instituição</span>
                        <strong>ETE - Escola Técnica Estadual</strong>
                    </div>

                    <div class="dado">
                        <span>Turno</span>
                        <strong>Noite</strong>
                    </div>

                </div>

            </section>

            <!-- Acessos importantes -->
            <section class="perfil-card">

                <h2>🔗 Acessos importantes</h2>

                <div class="acessos-grid">

                    <a href="#" target="_blank" class="acesso-item">

                        <div class="acesso-icone">
                            📚
                        </div>

                        <div>
                            <h3>SIEP</h3>
                            <p>Acesse o sistema de informações educacionais para consultar seus dados escolares.</p>
                        </div>

                        <span class="seta-acesso">↗</span>

                    </a>

                    <a href="inicio-aluno.php" class="acesso-item">

                        <div class="acesso-icone">
                            📅
                        </div>

                        <div>
                            <h3>Minha Semana</h3>
                            <p>Consulte seus horários de aulas e disciplinas.</p>
                        </div>

                        <span class="seta-acesso">→</span>

                    </a>

                    <a href="#" class="acesso-item">

                        <div class="acesso-icone">
                            🏫
                        </div>

                        <div>
                            <h3>Informações da Instituição</h3>
                            <p>Consulte informações e orientações da escola.</p>
                        </div>

                        <span class="seta-acesso">→</span>

                    </a>

                </div>

            </section>

            <!-- Informações adicionais -->
            <section class="perfil-card perfil-ajuda">

                <h2>Precisa de ajuda?</h2>

                <p>
                    Caso encontre algum erro em suas informações acadêmicas
                    ou precise atualizar seus dados, procure a secretaria
                    ou a coordenação da instituição.
                </p>

                <a href="contato-aluno.php" class="botao-contato">
                    Entrar em contato
                </a>

            </section>

        </div>

    </main>

    <?php include 'footer.php'; ?>

</body>
</html>
