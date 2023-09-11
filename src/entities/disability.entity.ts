import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PublicationDisability } from "./publicationDisability.entity";
import { DisabilityStatus } from "./disabilityStatus.entity";

@Entity({name: 'Disability'})
export class Disability{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => PublicationDisability, (publicationDisability) => publicationDisability.disability)
    publicationDisability: PublicationDisability[]

    @OneToMany(() => DisabilityStatus, (disabilityStatus) => disabilityStatus.disability)
    disabilityStatus: DisabilityStatus[]
}