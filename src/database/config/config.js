require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'StrongPass99',
        database: process.env.DB_NAME || 'taskmanagedb',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres' 
    },
    test: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'StrongPass99',
        database: process.env.DB_NAME || 'taskmanagedb',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres' 
    },
    production: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'StrongPass99',
        database: process.env.DB_NAME || 'taskmanagedb',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres' 
    }
};
