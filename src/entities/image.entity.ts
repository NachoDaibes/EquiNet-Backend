import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publication } from './publication.entity';
import { Disability } from './disability.entity';

@Entity({ name: 'Image' })
export class Image {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'image', type: 'nvarchar', length: 'max' })
  image: string;

  @ManyToOne(() => Publication, (publication) => publication.images, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'image_Id' })
  publication: Publication;
  
  @OneToOne(() => Disability, (disability) => disability.image, {
    orphanedRowAction: 'delete',
  })
  disability: Disability
}
