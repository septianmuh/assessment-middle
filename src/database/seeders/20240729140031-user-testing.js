'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();
        const hashedPassword = await bcrypt.hash('p@ssw0rd', 10);

        await queryInterface.bulkInsert('users', [
        {
            id: uuidv4(),
            password: hashedPassword,
            fullname: 'Maman Semprul',
            email: 'mansemprul@example.com',
            image_url: null,
            created_at: now,
            updated_at: now,
        },
        {
            id: uuidv4(),
            password: hashedPassword,
            fullname: 'Acong Eboy',
            email: 'acongeboy@example.com',
            image_url: null,
            created_at: now,
            updated_at: now,
        },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
