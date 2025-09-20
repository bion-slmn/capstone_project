import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'riders' })
export class Rider extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column(DataType.STRING)
    licenseNumber?: string;

    @Column(DataType.INTEGER)
    rating?: number;
}

