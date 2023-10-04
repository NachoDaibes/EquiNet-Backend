import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publication } from './publication.entity';

@Entity({ name: 'Image' })
export class Image {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'image', type: 'nvarchar', length: 'max' })
  image: string;

  @ManyToOne(() => Publication, (publication) => publication.images)
  @JoinColumn({ name: 'image_Id' })
  publication: Publication;
}
