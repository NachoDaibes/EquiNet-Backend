import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';

@Entity({ name: 'PoliticalDivision' })
export class PoliticalDivision {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'status', nullable: true })
  status: boolean;

  @OneToMany(() => Department, (department) => department.politicalDivision)
  department: Department[];
}
