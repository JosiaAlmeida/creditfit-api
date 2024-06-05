import { Employee } from 'src/employee/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LoanRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  term: number;

  @Column()
  expireMonth: Date;

  @Column()
  startMonth: Date;

  @Column({ enum: ['Aprovado', 'Pendente', 'Recusado', 'Cancelado'] })
  status: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
