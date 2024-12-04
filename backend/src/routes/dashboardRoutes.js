const express = require('express');
const dashboard = require('../controllers/dashboardController'); // Importação correta do controller

const router = express.Router();

// Rota GET para o dashboard
router.get('/', dashboard.obterDadosDoDashboard);

module.exports = router;
