import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PublicationDisability } from "./publicationDisability.entity";
import { DisabilityStatus } from "./disabilityStatus.entity";
import { Image } from "./image.entity";

@Entity({name: 'Disability'})
export class Disability{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => PublicationDisability, (publicationDisability) => publicationDisability.disability)
    publicationDisability: PublicationDisability[]

    @OneToOne(() => Image, (image) => image.disability, { cascade: true })
    @JoinColumn({name: 'image_Id'})
    image: Image

    @OneToMany(() => DisabilityStatus, (disabilityStatus) => disabilityStatus.disability, {cascade: true})
    disabilityStatus: DisabilityStatus[]
}