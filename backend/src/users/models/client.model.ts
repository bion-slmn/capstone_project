import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'clients' })
export class Client extends User {
    // Add client-specific fields here
    @Column(DataType.INTEGER)
    loyaltyPoints?: number;

    // ForeignKey to User is implicit via inheritance
}
