import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Disability } from './disability.entity';
import { Publication } from './publication.entity';

@Entity({ name: 'PublicationDisability' })
export class PublicationDisability {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @ManyToOne(() => Disability, (disability) => disability.publicationDisability)
  @JoinColumn({ name: 'disability_Id' })
  disability: Disability;

  @ManyToOne(
    () => Publication,
    (publication) => publication.publicationDisability,
    { orphanedRowAction: 'delete' },
  )
  @JoinColumn({ name: 'publication_Id' })
  publication: Publication;
}
