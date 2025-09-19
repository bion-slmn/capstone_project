import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'riders' })
export class Rider extends User {
    // Add rider-specific fields here
    @Column(DataType.STRING)
    licenseNumber?: string;

    @Column(DataType.INTEGER)
    rating?: number;

    // ForeignKey to User is implicit via inheritance
}
