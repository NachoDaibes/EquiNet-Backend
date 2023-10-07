import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessStatus } from './accessStatus.entity';
import { ProfileAccess } from './profileAccess.entity';
import { Type } from './type.entity';
import { Publication } from './publication.entity';
import { Position } from './position.entity';

@Entity({ name: 'PublicationPosition' })
export class PublicationPosition {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @ManyToOne(() => Position, (position) => position.publicationPosition)
  @JoinColumn({ name: 'publicationType_Id' })
  position: Position;

  @Column({ name: 'positionRegistrationDateTime' })
  positionRegistrationDateTime: Date;

  @Column({ name: 'positionExpirationDateTime' })
  positionExpirationDateTime: Date;

  @ManyToOne(
    () => Publication,
    (publication) => publication.publicationPosition,
  )
  @JoinColumn({ name: 'publication_Id' })
  publication: Publication;

  @BeforeInsert()
  private insertRegistrationDate() {
    this.positionRegistrationDateTime = new Date();
    const date = new Date();
    date.setMonth(this.positionRegistrationDateTime.getMonth() + 1);
    this.positionExpirationDateTime = date;
  }
}
