import { IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DisabilityStatus } from "./disabilityStatus.entity";
import { PublicationDisability } from "./publicationDisability.entity";

@Entity({name: 'Disability'})
export class Disability{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @ManyToOne(() => DisabilityStatus, (disabilityStatus) => disabilityStatus.disability)
    @JoinColumn({name: 'disabilityStatus_Id'})
    disabilityStatus: DisabilityStatus

    @OneToMany(() => PublicationDisability, (publicationDisability) => publicationDisability.disability)
    publicationDisability: PublicationDisability[]
}