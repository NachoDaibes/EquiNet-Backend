import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { Publication } from "./publication.entity";

@Entity({name: 'PublicationStatus'})
export class PublicationStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.accessStatus)
    @JoinColumn({name: 'publicationStatusType_Id'})
    publicationStatusType: Type

    @ManyToOne(() => Type, (type) => type.accessStatusReason)
    @JoinColumn({name: 'publicationStatusReasonType_Id'})
    publicationStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Publication, (publication) => publication.publicationStatus)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}