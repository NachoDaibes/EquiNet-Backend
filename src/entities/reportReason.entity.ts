import { IsBoolean, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity({name: 'Enterprise'})
export class ReportReason{

    @IsString()
    @Column({name: 'name'})
    name: string

    @IsBoolean()
    @Column({name: 'Is_Active'})
    isActive: boolean
}