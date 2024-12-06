const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { createDatabaseIfNotExists } = require('./src/utils/database.js');
const pesquisaRoutes = require('./src/routes/pesquisaRoutes');
const downloadRoutes = require('./src/routes/downloadRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função para criar o banco de dados se não existir
createDatabaseIfNotExists();

// Middleware para capturar o input
let sharedInput = null; // Variável para armazenar o input

function armazenarInput(req, res, next) {
  const { input } = req.body;
  if (input) {
    sharedInput = input; // Salva o input para uso posterior
  }
  next(); // Continua para a próxima etapa (outro middleware ou rota)
}

// Aplica o middleware globalmente antes das rotas
app.use(armazenarInput);

// Rota POST para executar o script de pesquisa
app.use('/pesquisar', pesquisaRoutes);
app.use('/download', downloadRoutes);

// Passa o `sharedInput` para o controlador de dashboard
app.use('/dashboard', (req, res, next) => {
  req.sharedInput = sharedInput; // Disponibiliza o `input` no objeto `req` para o controlador
  next();
}, dashboardRoutes);

// Inicia o servidor
app.listen(process.env.EXPRESS_PORT, () => {
  console.log('Servidor Backend em execução');
});
