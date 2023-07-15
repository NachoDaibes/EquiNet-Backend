import { Column, Entity } from "typeorm";
import { Type } from "./type.entity";
import { IsDate, IsObject } from "class-validator";

@Entity({name: 'publication_status'})
export class PublicationStatus{

    @Column({name: 'publication_status_type'})
    @IsObject()
    publicationStatusType: Type

    @Column({name: 'publication_status_reason_type'})
    @IsObject()
    publicationStatusReasonType: Type

    @Column({name: 'status_registration_datetime'})
    @IsDate()
    statusRegistrationDateTime: Date
}