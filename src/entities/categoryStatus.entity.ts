import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Type } from "./type.entity";

@Entity({name: 'CategoryStatus'})
export class CategoryStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'categoryStatusType_Id'})
    categoryStatusType: Type

    @OneToOne(() => Type)
    @JoinColumn({name: 'categoryStatusReasonType_Id'})
    categoryStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Category, (category) => category.categoryStatus)
    category: Category[]
}