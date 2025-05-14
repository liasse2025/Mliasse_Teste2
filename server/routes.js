// Importa Express para roteamento
const express = require('express');
// Cria um roteador Express
const router = express.Router();

// Arrays para armazenamento em memória
let alunos = [];
let professores = [];
const progressReport = [
  { nome: 'João Silva', nivel: 'Iniciante', progresso: 40 },
  { nome: 'Maria Oliveira', nivel: 'Intermediário', progresso: 70 }
];
const teacherReport = [
  { nome: 'Prof. Ana', aulas: 15 },
  { nome: 'Prof. Carlos', aulas: 22 }
];

// Rota POST para cadastro de alunos
router.post('/cadastro', (req, res, next) => {
  try {
    console.log('POST /api/cadastro:', req.body); // Registra corpo da requisição
    const { nome, email, nivel, objetivo, horario, senha } = req.body; // Desestrutura corpo
    if (!nome || !email || !nivel || !objetivo || !horario || !senha) { // Valida campos
      return res.status(400).json({ message: 'Preencha todos os campos.' }); // Resposta de erro
    }
    alunos.push({ nome, email, nivel, objetivo, horario, senha }); // Adiciona aluno
    res.status(200).json({ message: 'Cadastro realizado com sucesso! Faça login.' }); // Resposta de sucesso
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Rota POST para cadastro de professores
router.post('/professores', (req, res, next) => {
  try {
    console.log('POST /api/professores:', req.body); // Registra requisição
    const { nome, email, idiomas, especialidade, senha } = req.body; // Desestrutura corpo
    if (!nome || !email || !idiomas || !especialidade || !senha) { // Valida campos
      return res.status(400).json({ message: 'Preencha todos os campos.' }); // Resposta de erro
    }
    professores.push({ nome, email, idiomas, especialidade, senha }); // Adiciona professor
    res.status(200).json({ message: 'Cadastro de professor realizado com sucesso! Faça login.' }); // Resposta de sucesso
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Rota POST para login
router.post('/login', (req, res, next) => {
  try {
    console.log('POST /api/login:', req.body); // Registra requisição
    const { email, senha } = req.body; // Desestrutura corpo
    if (!email || !senha) { // Valida campos
      return res.status(400).json({ message: 'Preencha email e senha.' }); // Resposta de erro
    }
    const aluno = alunos.find(a => a.email === email && a.senha === senha); // Busca aluno
    const professor = professores.find(p => p.email === email && p.senha === senha); // Busca professor
    if (aluno) { // Se aluno encontrado
      return res.status(200).json({ message: 'Login bem-sucedido! Bem-vindo, aluno.', tipo: 'aluno' }); // Resposta de sucesso
    } else if (professor) { // Se professor encontrado
      return res.status(200).json({ message: 'Login bem-sucedido! Bem-vindo, professor.', tipo: 'professor' }); // Resposta de sucesso
    } else {
      return res.status(401).json({ message: 'Email ou senha inválidos.' }); // Resposta não autorizada
    }
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Rota POST para pagamento
router.post('/pagamento', (req, res, next) => {
  try {
    console.log('POST /api/pagamento:', req.body); // Registra requisição
    const { email, cartao, validade, cvv } = req.body; // Desestrutura corpo
    if (!email || !cartao || !validade || !cvv) { // Valida campos
      return res.status(400).json({ message: 'Preencha todos os campos do pagamento.' }); // Resposta de erro
    }
    if (cartao.length !== 16 || cvv.length !== 3) { // Valida dados do cartão
      return res.status(400).json({ message: 'Dados do cartão inválidos.' }); // Resposta de erro
    }
    res.status(200).json({ message: 'Pagamento processado com sucesso!' }); // Resposta de sucesso
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Rota GET para relatório de progresso de alunos
router.get('/progress-report', (req, res, next) => {
  try {
    console.log('GET /api/progress-report'); // Registra requisição
    res.status(200).json(progressReport); // Envia relatório
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Rota GET para relatório de professores
router.get('/teacher-report', (req, res, next) => {
  try {
    console.log('GET /api/teacher-report'); // Registra requisição
    res.status(200).json(teacherReport); // Envia relatório
  } catch (err) {
    next(err); // Passa erros para middleware
  }
});

// Exporta o roteador
module.exports = router;