import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publication } from "./publication.entity";
import { Category } from "./category.entity";

@Entity({name: 'PublicationCategory'})
export class PublicationCategory{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number
    
    @ManyToOne(() => Category, (category) => category.publicationCategory)
    @JoinColumn({name: 'category_Id'})
    category: Category

    @ManyToOne(() => Publication, (publication) => publication.publicationCategory)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}