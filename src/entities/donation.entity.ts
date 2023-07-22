import { IsDateString, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publication } from "./publication.entity";

@Entity({name: 'Donation'})
export class Donation {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'goal'})
    @IsNumber()
    goal: number

    @Column({name: 'cbu', length: 22})
    @IsString()
    cbu: string

    @Column({name: 'deadline'})
    @IsDateString()
    deadline: Date

    @OneToOne(() => Publication)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}