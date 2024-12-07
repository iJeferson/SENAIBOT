const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './backend/.env' });


const createDatabaseIfNotExists = async () => {
    try {
        // Conexão inicial sem banco de dados
        const sequelizeWithoutDB = new Sequelize(
            null, // Sem especificar o banco
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
            }
        );

        // Criar o banco de dados
        await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`);
        console.log(`Banco de dados ${process.env.DB_DATABASE} criado (se não existia).`);

        // Conexão com o banco de dados recém-criado
        const sequelizeWithDB = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
            }
        );

        // Testa a conexão
        await sequelizeWithDB.authenticate();
        console.log("Banco de dados autenticado com sucesso.");
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

module.exports = { createDatabaseIfNotExists };
