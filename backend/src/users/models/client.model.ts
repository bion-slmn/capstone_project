import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'clients' })
export class Client extends Model {
    // Add client-specific fields here
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column(DataType.INTEGER)
    declare loyaltyPoints?: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;

    // ForeignKey to User is implicit via inheritance
}
