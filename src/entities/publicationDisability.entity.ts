import { IsObject } from "class-validator";
import { Disability } from "./disability.entity";
import { Publication } from "./publication.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'publication_disability'})
export class PublicationDisability{

    @Column({name: 'disability'})
    @IsObject()
    disability: Disability

    @Column({name: 'publication'})
    @IsObject()
    publication: Publication
}