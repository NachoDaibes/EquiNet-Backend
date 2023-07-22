import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disability } from "./disability.entity";
import { Type } from "./type.entity";

@Entity({name: 'DisabilityStatus'})
export class DisabilityStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'disabilityStatusType_Id'})
    disabilityStatusType: Type
    
    @OneToOne(() => Type)
    @JoinColumn({name: 'disabilityStatusReasonType_Id'})
    disabilityStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime'})
    statusRegistrationDateTime: Date

    @OneToMany(() => Disability, (disability) => disability.disabilityStatus)
    disability: Disability[]
}
