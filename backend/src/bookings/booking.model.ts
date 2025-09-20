import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from '../users/models/client.model';
import { Rider } from '../users/models/rider.model';
import { Bike } from '../bikes/bikes.model';

@Table({ tableName: 'bookings' })
export class Booking extends Model {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @ForeignKey(() => Client)
    @Column({ type: DataType.UUID, allowNull: false })
    declare clientId: string;

    @BelongsTo(() => Client)
    client: Client;

    @ForeignKey(() => Rider)
    @Column({ type: DataType.UUID, allowNull: false })
    riderId: string;

    @BelongsTo(() => Rider)
    declare rider: Rider;

    @ForeignKey(() => Bike)
    @Column({ type: DataType.UUID, allowNull: false })
    declare bikeId: string;

    @BelongsTo(() => Bike)
    declare bike: Bike;

    @Column(DataType.DATE)
    declare startTime: Date;

    @Column(DataType.DATE)
    declare endTime?: Date;

    @Column(DataType.STRING)
    declare status: string; // e.g. 'pending', 'active', 'completed', 'cancelled'
}
