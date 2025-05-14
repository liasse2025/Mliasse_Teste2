Ensino Online
Bem-vindo ao Ensino Online, uma aplicação web desenvolvida para facilitar o ensino de idiomas online. Este sistema permite o cadastro de alunos e professores, autenticação, pagamento simulado, interação em tempo real via chat com um bot (limitado a 3 perguntas em inglês), e visualização de relatórios de progresso e utilização.

Objetivo
O objetivo principal é fornecer uma plataforma intuitiva para:

Alunos: Aprender idiomas (foco em inglês) com diferentes níveis e objetivos.
Professores: Oferecer aulas com especialidades como conversação, gramática, negócios ou exames.
Administradores/Desenvolvedores: Gerenciar e manter o sistema, com acesso a relatórios.
Tecnologias Utilizadas
Frontend:
HTML5: Estrutura das páginas.
CSS3: Estilização com estilo.css.
Bootstrap 5.3.3: Responsividade e componentes visuais.
JavaScript (ES6): Lógica client-side, com fetch para APIs e Socket.IO para chat.
Como Usar
Cadastro:
Acesse http://localhost:3002 para cadastrar um aluno ou http://localhost:3002/professores.html para um professor.
Exemplo de professor: Nome: "Ana Silva", Email: "ana@teste.com", Idiomas: "Inglês", Especialidade: "Conversação", Senha: "123".
Login:
Use as credenciais cadastradas (ex.: Email: "ana@teste.com", Senha: "123").
Redireciona para pagamento.
Pagamento:
Insira dados fictícios (ex.: Cartão: "1234567890123456", Validade: "12/25", CVV: "123").
Redireciona para chat.
Chat:
Digite uma das 3 perguntas permitidas (ex.: "What is your name?") até o limite.
Após o limite, envie mensagens para professores.
