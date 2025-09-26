import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobInternal } from '../../Domain/Entities/job-internal.entity';
import { IJobInternalRepository } from '../../Domain/Repositories/job-internal.repository';
import { JobInternal_ORM_Entity } from '../Entities/job-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
@Injectable()
export class JobInternalRepositoryImpl implements IJobInternalRepository {
  constructor(
    @InjectRepository(JobInternal_ORM_Entity)
    private readonly ormRepository: Repository<JobInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(orm: JobInternal_ORM_Entity): JobInternal {
    console.log('orm > : ', orm.nasabah_id?.id);
    return new JobInternal(
      orm.nasabah_id!.id,
      orm.perusahaan,
      orm.divisi,
      orm.golongan,
      orm.nama_atasan,
      orm.nama_hrd,
      orm.absensi,
      orm.id,
      orm.created_at,
      orm.deleted_at,
      orm.yayasan,
      orm.lama_kerja_bulan,
      orm.lama_kerja_tahun,
      orm.bukti_absensi,
      orm.updated_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(domainEntity: JobInternal): Partial<JobInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      perusahaan: domainEntity.perusahaan,
      divisi: domainEntity.divisi,
      golongan: domainEntity.golongan,
      nama_atasan: domainEntity.namaAtasan,
      nama_hrd: domainEntity.namaHrd,
      absensi: domainEntity.absensi,
      yayasan: domainEntity.yayasan,
      lama_kerja_bulan: domainEntity.lamaKerjaBulan,
      lama_kerja_tahun: domainEntity.lamaKerjaTahun,
      bukti_absensi: domainEntity.buktiAbsensi,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<JobInternal>,
  ): Partial<JobInternal_ORM_Entity> {
    const ormData: Partial<JobInternal_ORM_Entity> = {};

    if (partial.nasabahId)
      ormData.nasabah_id! = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.perusahaan) ormData.perusahaan = partial.perusahaan;
    if (partial.divisi) ormData.divisi = partial.divisi;
    if (partial.golongan) ormData.golongan = partial.golongan;
    if (partial.namaAtasan) ormData.nama_atasan = partial.namaAtasan;
    if (partial.namaHrd) ormData.nama_hrd = partial.namaHrd;
    if (partial.absensi) ormData.absensi = partial.absensi;
    if (partial.yayasan) ormData.yayasan = partial.yayasan;
    if (partial.lamaKerjaBulan)
      ormData.lama_kerja_bulan = partial.lamaKerjaBulan;
    if (partial.lamaKerjaTahun)
      ormData.lama_kerja_tahun = partial.lamaKerjaTahun;
    if (partial.buktiAbsensi) ormData.bukti_absensi = partial.buktiAbsensi;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<JobInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<JobInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: JobInternal): Promise<JobInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    jobData: Partial<JobInternal>,
  ): Promise<JobInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(jobData));
    const updated = await this.ormRepository.findOne({
      where: { id },
      relations: ['nasabah_id'], // Force load relasi sebagai object
    });
    if (!updated) throw new Error('Job not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<JobInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
