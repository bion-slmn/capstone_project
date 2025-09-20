import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'clients' })
export class Client extends Model {
    // Add client-specific fields here
    @Column(DataType.INTEGER)
    loyaltyPoints?: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    // ForeignKey to User is implicit via inheritance
}
