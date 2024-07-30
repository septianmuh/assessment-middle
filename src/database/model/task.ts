
import { DataTypes, Model, Sequelize } from 'sequelize';

class Task extends Model {
    public id!: string;
    public task!: string;
    public status!: 'PROGRESS' | 'DONE';
    public user_input!: string;
    public created_at?: Date;
    public updated_at?: Date;

    static initialize(connection: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                task: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('PROGRESS', 'DONE'),
                    allowNull: false,
                },
                user_input: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize: connection,
                tableName: 'tasks',
                timestamps: false,
                underscored: true,
            }
        );
        return this;
    }
}

export default Task;