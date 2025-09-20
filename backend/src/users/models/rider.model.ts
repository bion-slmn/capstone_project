import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'riders' })
export class Rider extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;


    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column(DataType.STRING)
    declare licenseNumber?: string;

    @Column(DataType.INTEGER)
    declare rating?: number;
}

