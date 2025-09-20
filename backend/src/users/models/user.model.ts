import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({
        type: DataType.UUID,            // ✅ UUID type
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare id: string;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare role: string; // 'rider' or 'client'

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phoneNumber: string
}
