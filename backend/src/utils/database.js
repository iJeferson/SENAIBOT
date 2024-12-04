const { Sequelize } = require('sequelize');

// Função para criar o banco de dados se não existir
const createDatabaseIfNotExists = async () => {
    try {
        // Conecta ao MySQL sem especificar um banco de dados
        const sequelizeWithoutDB = new Sequelize('mysql', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
        });

        // Cria o banco de dados se não existir
        await sequelizeWithoutDB.query('CREATE DATABASE IF NOT EXISTS inpi_db;');

        // Agora cria uma nova instância do Sequelize com o banco de dados correto
        const sequelizeWithDB = new Sequelize('inpi_db', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
        });

        // Autentica no novo banco de dados
        await sequelizeWithDB.authenticate();

        console.log("Banco de dados criado e autenticado com sucesso.");
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

// Exporta a função
module.exports = { createDatabaseIfNotExists };
