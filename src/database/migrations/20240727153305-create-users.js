'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            fullname: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            image_url: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};
