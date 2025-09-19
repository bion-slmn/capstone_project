import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Rider } from '../users/models';


@Table
export class Bike extends Model {
    @Column({ type: DataType.STRING, primaryKey: true })
    declare id: string;

    @Column(DataType.STRING)
    declare brand: string;

    @Column(DataType.STRING)
    declare model: string;

    @Column(DataType.INTEGER)
    declare batteryLevel: number;

    @Column(DataType.STRING)
    declare location: string;

    @Column(DataType.BOOLEAN)
    declare isAvailable: boolean;


    @BelongsTo(() => Rider)
    declare rider: Rider;

    @Column(DataType.ARRAY(DataType.STRING))
    declare features?: string[];
}