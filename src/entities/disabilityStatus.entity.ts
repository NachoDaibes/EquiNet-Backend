import { Column, Entity } from "typeorm";
import { Type } from "./type.entity";
import { IsDate, IsObject } from "class-validator";

@Entity({name: 'disability_status'})
export class DisabilityStatus{

    @Column({name: 'disability_status_type'})
    @IsObject()
    disabilityStatusType: Type

    @Column({name: 'disability_status_reason_type'})
    @IsObject()
    disabilityStatusReasonType: Type

    @Column({name: 'status_registration_datetime'})
    @IsDate()
    statusRegistrationDateTime: Date
}