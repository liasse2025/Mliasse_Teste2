const express = require('express'); // Importa o framework Express para criar o servidor HTTP
const http = require('http'); // Importa o módulo HTTP nativo do Node.js
const socketIo = require('socket.io'); // Importa o Socket.IO para comunicação em tempo real (WebSocket)
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de origem cruzada
const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivos
const routes = require('./routes'); // Importa as rotas definidas em routes.js

const app = express(); // Cria uma instância do aplicativo Express
const server = http.createServer(app); // Cria um servidor HTTP usando o aplicativo Express
const io = socketIo(server, { // Inicializa o Socket.IO no servidor HTTP
  cors: { origin: 'http://localhost:3002', methods: ['GET', 'POST'] } // Configura CORS para Socket.IO, permitindo apenas http://localhost:3002
});

app.use(cors({ origin: 'http://localhost:3002' })); // Aplica middleware CORS para todas as rotas HTTP, permitindo requisições de http://localhost:3002
app.use(express.json()); // Aplica middleware para parsear corpos de requisições JSON
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos (HTML, CSS, JS) da pasta ../public

app.get('/', (req, res) => { // Define a rota GET para a raiz (/)
  res.sendFile(path.join(__dirname, '../public', 'index.html')); // Envia o arquivo index.html como resposta
});

app.use('/api', routes); // Monta as rotas definidas em routes.js sob o prefixo /api

app.use((err, req, res, next) => { // Middleware de tratamento de erros para capturar erros no servidor
  console.error('Erro no servidor:', err.message); // Loga o erro no console
  res.status(500).json({ message: 'Erro interno no servidor' }); // Responde com status 500 e mensagem de erro
});

const botResponses = { // Objeto com respostas predefinidas do bot para o chat
  'what is your name': 'I am EnglishBot, here to help you practice!', // Resposta para "what is your name"
  'how are you': 'I am doing great, thanks for asking! How about you?', // Resposta para "how are you"
  'what time is it': 'I don’t have a clock, but it’s always time to learn English!' // Resposta para "what time is it"
};

io.on('connection', (socket) => { // Escuta eventos de conexão de clientes WebSocket
  console.log('Usuário conectado:', socket.id); // Loga o ID do socket quando um usuário conecta
  socket.on('chatMessage', (data) => { // Escuta mensagens enviadas pelo cliente (evento 'chatMessage')
    console.log('Mensagem recebida:', data); // Loga os dados da mensagem recebida
    io.emit('message', { userName: data.userName, message: data.message, isBotResponse: false }); // Emite a mensagem do usuário para todos os clientes
    if (data.isBotActive) { // Verifica se o bot está ativo (usuário ainda não fez 3 perguntas)
      const messageLower = data.message.toLowerCase(); // Converte a mensagem para minúsculas
      let botReply = 'Sorry, I only answer specific questions. Try: "What is your name?", "How are you?", or "What time is it?"'; // Resposta padrão do bot
      if (botResponses[messageLower]) { // Verifica se a mensagem corresponde a uma chave em botResponses
        botReply = botResponses[messageLower]; // Usa a resposta correspondente
        io.emit('message', { userName: 'EnglishBot', message: botReply, isBotResponse: true }); // Emite a resposta do bot
      } else {
        io.emit('message', { userName: 'EnglishBot', message: botReply, isBotResponse: true }); // Emite a resposta padrão
      }
    }
  });
  socket.on('disconnect', () => { // Escuta eventos de desconexão de clientes
    console.log('Usuário desconectado:', socket.id); // Loga o ID do socket desconectado
  });
});

const PORT = process.env.PORT || 3002; // Define a porta (usa variável de ambiente ou 3002)
server.listen(PORT, () => { // Inicia o servidor na porta definida
  console.log(`Servidor rodando na porta ${PORT}`); // Loga que o servidor está rodando
});