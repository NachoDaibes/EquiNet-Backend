import { IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PublicationCategory } from "./publicationCategory.entity";
import { DisabilityStatus } from "./disabilityStatus.entity";
import { CategoryStatus } from "./categoryStatus.entity";

@Entity({name: 'Category'})
export class Category{
    
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @ManyToOne(() => CategoryStatus, (categoryStatus) => categoryStatus.category)
    @JoinColumn({name: 'categoryStatus_Id'})
    categoryStatus: CategoryStatus

    @OneToMany(() => PublicationCategory, (publicationCategory) => publicationCategory.category)
    publicationCategory: PublicationCategory[]
}