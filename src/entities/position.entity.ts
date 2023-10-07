import {
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
import { PublicationPosition } from './publicationPosition.entity';

@Entity({ name: 'Position' })
export class Position {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'position' })
  position: string;

  @Column({ name: 'number' })
  number: number;

  @Column({ name: 'price' })
  price: number;

  @ManyToOne(() => Type, (type) => type.position)
  @JoinColumn({ name: 'publicationType_Id' })
  publicationType: Type;

  @OneToMany(
    () => PublicationPosition,
    (publicationPosition) => publicationPosition.position,
  )
  publicationPosition: PublicationPosition[];
}
