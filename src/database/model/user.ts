import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
    public id!: string;
    public password!: string;
    public fullname!: string;
    public email!: string;
    public image_url?: string;
    public created_at?: string;
    public updated_at?: string;

    static initialize(connection: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                password: {
                    type: DataTypes.STRING(250),
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
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize: connection,
                tableName: 'users',
                timestamps: false,
                underscored: true,
            }
        );
        return this;
    }
}

export default User;
