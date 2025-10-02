import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users_ORM_Entity } from 'src/Modules/Users/Infrastructure/Entities/users.orm-entity';
import { GENDER, MARRIAGE_STATUS } from 'src/Shared/Enums/Internal/Clients.enum';

@Entity('client_internal')
export class ClientInternal_ORM_Entity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Users_ORM_Entity, user => user.clientInternals, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'marketing_id' })
  marketing!: Users_ORM_Entity;

  @Column()
  nama_lengkap!: string;

  @Column()
  no_ktp!: string;

  @Column({ type: 'enum', enum: GENDER })
  jenis_kelamin!: GENDER;

  @Column()
  tempat_lahir!: string;

  @Column({ type: 'date' })
  tanggal_lahir!: Date;

  @Column()
  no_hp!: string;

  @Column({ type: 'enum', enum: MARRIAGE_STATUS })
  status_nikah!: MARRIAGE_STATUS;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  foto_ktp?: string;

  @Column({ nullable: true })
  foto_kk?: string;

  @Column({ nullable: true })
  foto_id_card?: string;

  @Column({ nullable: true })
  foto_rekening?: string;

  @Column({ nullable: true })
  no_rekening?: string;

  @Column({ type: 'tinyint', default: 0 })
  enable_edit!: boolean;

  @Column({ nullable: true })
  points?: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date | null;
  familyInternal: any;
}
