// infrastructure/repositories/address-internal.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressInternal } from '../../Domain/Entities/address-internal.entity';
import { IAddressInternalRepository } from '../../Domain/Repositories/address-internal.repository';
import { AddressInternal_ORM_Entity } from '../Entities/address-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';

@Injectable()
export class AddressInternalRepositoryImpl
  implements IAddressInternalRepository
{
  constructor(
    @InjectRepository(AddressInternal_ORM_Entity)
    private readonly ormRepository: Repository<AddressInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas
  private toDomain(ormEntity: AddressInternal_ORM_Entity): AddressInternal {
    return new AddressInternal(
      ormEntity.nasabah_id?.id,
      ormEntity.alamat_ktp,
      ormEntity.rt_rw,
      ormEntity.kelurahan,
      ormEntity.kecamatan,
      ormEntity.kota,
      ormEntity.provinsi,
      ormEntity.status_rumah,
      ormEntity.domisili,
      ormEntity.id,
      ormEntity.created_at,
      ormEntity.deleted_at,
      ormEntity.status_rumah_ktp,
      ormEntity.alamat_lengkap,
      ormEntity.updated_at,
    );
  }

  //? All Transactions that using for Create datas
  private toOrm(
    domainEntity: AddressInternal,
  ): Partial<AddressInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      alamat_ktp: domainEntity.alamatKtp,
      rt_rw: domainEntity.rtRw,
      kelurahan: domainEntity.kelurahan,
      kecamatan: domainEntity.kecamatan,
      kota: domainEntity.kota,
      provinsi: domainEntity.provinsi,
      status_rumah: domainEntity.statusRumah,
      domisili: domainEntity.domisili,
      status_rumah_ktp: domainEntity.statusRumahKtp,
      alamat_lengkap: domainEntity.alamatLengkap,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete
  private toOrmPartial(
    partial: Partial<AddressInternal>,
  ): Partial<AddressInternal_ORM_Entity> {
    const ormData: Partial<AddressInternal_ORM_Entity> = {};

    if (partial.nasabahId)
      ormData.nasabah_id = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.alamatKtp) ormData.alamat_ktp = partial.alamatKtp;
    if (partial.rtRw) ormData.rt_rw = partial.rtRw;
    if (partial.kelurahan) ormData.kelurahan = partial.kelurahan;
    if (partial.kecamatan) ormData.kecamatan = partial.kecamatan;
    if (partial.kota) ormData.kota = partial.kota;
    if (partial.provinsi) ormData.provinsi = partial.provinsi;
    if (partial.statusRumah) ormData.status_rumah = partial.statusRumah;
    if (partial.domisili) ormData.domisili = partial.domisili;
    if (partial.statusRumahKtp)
      ormData.status_rumah_ktp = partial.statusRumahKtp;
    if (partial.alamatLengkap) ormData.alamat_lengkap = partial.alamatLengkap;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }
  //?===================================================================================

  async findById(id: number): Promise<AddressInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<AddressInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: AddressInternal): Promise<AddressInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    addressData: Partial<AddressInternal>,
  ): Promise<AddressInternal> {

    await this.ormRepository.update(id, this.toOrmPartial(addressData));
    console.log("id>>>>>>>>>>>>>>", id)
    const updated = await this.ormRepository.findOne({
      where: { id },
    });
    if (!updated) throw new Error('Address not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<AddressInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
