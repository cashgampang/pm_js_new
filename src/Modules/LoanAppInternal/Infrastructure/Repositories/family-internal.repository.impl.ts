import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyInternal } from '../../Domain/Entities/family-internal.entity';
import { IFamilyInternalRepository } from '../../Domain/Repositories/family-internal.repository';
import { FamilyInternal_ORM_Entity } from '../Entities/family-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
@Injectable()
export class FamilyInternalRepositoryImpl implements IFamilyInternalRepository {
  constructor(
    @InjectRepository(FamilyInternal_ORM_Entity)
    private readonly ormRepository: Repository<FamilyInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(orm: FamilyInternal_ORM_Entity): FamilyInternal {
    return new FamilyInternal(
      orm.nasabah_id!.id,
      orm.hubungan,
      orm.nama,
      orm.bekerja,
      orm.id,
      orm.created_at,
      orm.deleted_at,
      orm.nama_perusahaan,
      orm.jabatan,
      orm.penghasilan,
      orm.alamat_kerja,
      orm.no_hp,
      orm.updated_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(
    domainEntity: FamilyInternal,
  ): Partial<FamilyInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      hubungan: domainEntity.hubungan,
      nama: domainEntity.nama,
      bekerja: domainEntity.bekerja,
      nama_perusahaan: domainEntity.namaPerusahaan,
      jabatan: domainEntity.jabatan,
      penghasilan: domainEntity.penghasilan,
      alamat_kerja: domainEntity.alamatKerja,
      no_hp: domainEntity.noHp,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<FamilyInternal>,
  ): Partial<FamilyInternal_ORM_Entity> {
    const ormData: Partial<FamilyInternal_ORM_Entity> = {};


    if (partial.nasabahId)
      ormData.nasabah_id! = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.hubungan) ormData.hubungan = partial.hubungan;
    if (partial.nama) ormData.nama = partial.nama;
    if (partial.bekerja) ormData.bekerja = partial.bekerja;
    if (partial.namaPerusahaan) ormData.nama_perusahaan = partial.namaPerusahaan;
    if (partial.jabatan) ormData.jabatan = partial.jabatan;
    if (partial.penghasilan) ormData.penghasilan = partial.penghasilan;
    if (partial.alamatKerja) ormData.alamat_kerja = partial.alamatKerja;
    if (partial.noHp) ormData.no_hp = partial.noHp;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<FamilyInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<FamilyInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: FamilyInternal): Promise<FamilyInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    addressData: Partial<FamilyInternal>,
  ): Promise<FamilyInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(addressData));
    const updated = await this.ormRepository.findOne({ where: { id } });
    if (!updated) throw new Error('Address not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<FamilyInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
