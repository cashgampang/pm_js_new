import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ClientInternal_ORM_Entity } from './client-internal.orm-entity';
import { KerabatKerjaEnum } from '../../../../Shared/Enums/Internal/Relative.enum';

@Entity('relative_internal')
export class RelativeInternal_ORM_Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientInternal_ORM_Entity, client => client.relatives, { nullable: false })
  @JoinColumn({ name: 'nasabah_id' })
  nasabah: ClientInternal_ORM_Entity;

  @Column({ type: 'enum', enum: KerabatKerjaEnum })
  kerabat_kerja: KerabatKerjaEnum;

  @Column()
  nama: string;

  @Column()
  alamat: string;

  @Column()
  no_hp: string;

  @Column()
  status_hubungan: string;

  @Column({ nullable: true })
  nama_perusahaan?: string;

  @Column({ nullable: true })
  jabatan?: string;

  @Column({ nullable: true })
  penghasilan?: string; // string

  @Column({ nullable: true })
  alamat_kerja?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
