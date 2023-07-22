import { IsObject } from "class-validator";
import { Disability } from "./disability.entity";
import { Publication } from "./publication.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'PublicationDisability'})
export class PublicationDisability{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => Disability, (disability) => disability.publicationDisability)
    @JoinColumn({name: 'disability_Id'})
    disability: Disability

    @ManyToOne(() => Publication, (publication) => publication.publicationDisability)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}