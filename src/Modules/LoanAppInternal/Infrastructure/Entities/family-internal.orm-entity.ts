import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientInternal_ORM_Entity } from './client-internal.orm-entity';

@Entity('family_internal')
export class FamilyInternal_ORM_Entity {
  @PrimaryGeneratedColumn()
  id!: number;

  // Relasi ke client, ManyToOne wajib nullable=false supaya data pasti ada
  @ManyToOne(() => ClientInternal_ORM_Entity, client => client.familyInternal, { nullable: false })
  @JoinColumn({ name: 'nasabah_id' })
  nasabah_id!: ClientInternal_ORM_Entity; // pakai relasi, jangan bikin property terpisah

  @Column({ type: 'varchar', length: 50 })
  hubungan!: string;

  @Column({ type: 'varchar', length: 100 })
  nama!: string;

  @Column({ type: 'boolean' })
  bekerja!: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nama_perusahaan?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  jabatan?: string;

  @Column({ type: 'int', nullable: true })
  penghasilan?: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  alamat_kerja?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  no_hp?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;
}
