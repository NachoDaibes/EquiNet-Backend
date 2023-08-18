import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'UserType'})
export class UserType{

    @PrimaryGeneratedColumn({name: 'id'})
    id: string

    @Column({name: 'name'})
    name: string

}