import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelativeInternal } from '../../Domain/Entities/relative-internal.entity';
import { IRelativeInternalRepository } from '../../Domain/Repositories/relatives-internal.repository';
import { RelativeInternal_ORM_Entity } from '../Entities/relative-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
@Injectable()
export class RelativeInternalRepositoryImpl
  implements IRelativeInternalRepository
{
  constructor(
    @InjectRepository(RelativeInternal_ORM_Entity)
    private readonly ormRepository: Repository<RelativeInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(orm: RelativeInternal_ORM_Entity): RelativeInternal {
    return new RelativeInternal(
      orm.nasabah_id!.id,
      orm.kerabat_kerja,
      orm.id,
      orm.nama,
      orm.alamat,
      orm.no_hp,
      orm.status_hubungan,
      orm.nama_perusahaan,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(
    domainEntity: RelativeInternal,
  ): Partial<RelativeInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      kerabat_kerja: domainEntity.kerabatKerja,
      nama: domainEntity.nama,
      alamat: domainEntity.alamat,
      no_hp: domainEntity.noHp,
      status_hubungan: domainEntity.statusHubungan,
      nama_perusahaan: domainEntity.namaPerusahaan,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<RelativeInternal>,
  ): Partial<RelativeInternal_ORM_Entity> {
    const ormData: Partial<RelativeInternal_ORM_Entity> = {};

    if (partial.nasabahId)
      ormData.nasabah_id! = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.kerabatKerja) ormData.kerabat_kerja = partial.kerabatKerja;
    if (partial.id) ormData.id = partial.id;
    if (partial.nama) ormData.nama = partial.nama;
    if (partial.alamat) ormData.alamat = partial.alamat;
    if (partial.noHp) ormData.no_hp = partial.noHp;
    if (partial.statusHubungan)
      ormData.status_hubungan = partial.statusHubungan;
    if (partial.namaPerusahaan)
      ormData.nama_perusahaan = partial.namaPerusahaan;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<RelativeInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<RelativeInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: RelativeInternal): Promise<RelativeInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    addressData: Partial<RelativeInternal>,
  ): Promise<RelativeInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(addressData));
    const updated = await this.ormRepository.findOne({ where: { id } });
    if (!updated) throw new Error('Address not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<RelativeInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
