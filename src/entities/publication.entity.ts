import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from './type.entity';
import { User } from './user.entity';
import { Service } from './service.entity';
import { Job } from './job.entity';
import { PublicationStatus } from './publicationStatus.entity';
import { Location } from './location.entity';
import { PublicationDisability } from './publicationDisability.entity';
import { Donation } from './donation.entity';
import { Image } from './image.entity';

@Entity({ name: 'Publication' })
export class Publication {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'description', length: 1000 })
  description: string;

  @ManyToOne(() => Type, (type) => type.publication)
  @JoinColumn({ name: 'publicationType_ Id' })
  publicationType: Type;

  @OneToMany(
    () => PublicationStatus,
    (publicationStatus) => publicationStatus.publication,
    { cascade: true },
  )
  publicationStatus: PublicationStatus[];

  @ManyToOne(() => User, (user) => user.publication)
  user: User;

  @OneToOne(() => Service, (service) => service.publication, { cascade: true })
  service: Service;

  @OneToOne(() => Donation, (donnation) => donnation.publication, {
    cascade: true,
  })
  donation: Donation;

  @OneToOne(() => Job, (job) => job.publication, { cascade: true })
  job: Job;

  @ManyToOne(() => Location, (location) => location.publication)
  @JoinColumn({ name: 'location_Id' })
  location: Location;

  @OneToMany(
    () => PublicationDisability,
    (publicationDisability) => publicationDisability.publication,
    { cascade: true },
  )
  publicationDisability: PublicationDisability[];

  @OneToMany(() => Image, (image) => image.publication, { cascade: true })
  images: Image[];
}
