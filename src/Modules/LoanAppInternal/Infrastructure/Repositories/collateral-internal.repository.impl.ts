import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollateralInternal } from '../../Domain/Entities/collateral-internal.entity';
import { ICollateralInternalRepository } from '../../Domain/Repositories/collateral-internal.repository';
import { CollateralInternal_ORM_Entity } from '../Entities/collateral-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';

@Injectable()
export class CollateralInternalRepositoryImpl
  implements ICollateralInternalRepository
{
  constructor(
    @InjectRepository(CollateralInternal_ORM_Entity)
    private readonly ormRepository: Repository<CollateralInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(orm: CollateralInternal_ORM_Entity): CollateralInternal {
    return new CollateralInternal(
      orm.nasabah_id!.id,
      orm.jaminan_hrd,
      orm.jaminan_cg,
      orm.penjamin,
      orm.id,
      orm.created_at,
      orm.deleted_at,
      orm.nama_penjamin,
      orm.lama_kerja_penjamin,
      orm.bagian,
      orm.absensi,
      orm.riwayat_pinjam_penjamin,
      orm.riwayat_nominal_penjamin,
      orm.riwayat_tenor_penjamin,
      orm.sisa_pinjaman_penjamin,
      orm.jaminan_cg_penjamin,
      orm.status_hubungan_penjamin,
      orm.foto_ktp_penjamin,
      orm.foto_id_card_penjamin,
      orm.updated_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(
    domainEntity: CollateralInternal,
  ): Partial<CollateralInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      jaminan_hrd: domainEntity.jaminanHrd,
      jaminan_cg: domainEntity.jaminanCg,
      penjamin: domainEntity.penjamin,
      nama_penjamin: domainEntity.namaPenjamin,
      lama_kerja_penjamin: domainEntity.lamaKerjaPenjamin,
      bagian: domainEntity.bagian,
      absensi: domainEntity.absensi,
      riwayat_pinjam_penjamin: domainEntity.riwayatPinjamPenjamin,
      riwayat_nominal_penjamin: domainEntity.riwayatNominalPenjamin,
      riwayat_tenor_penjamin: domainEntity.riwayatTenorPenjamin,
      sisa_pinjaman_penjamin: domainEntity.sisaPinjamanPenjamin,
      jaminan_cg_penjamin: domainEntity.jaminanCgPenjamin,
      status_hubungan_penjamin: domainEntity.statusHubunganPenjamin,
      foto_ktp_penjamin: domainEntity.fotoKtpPenjamin,
      foto_id_card_penjamin: domainEntity.fotoIdCardPenjamin,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<CollateralInternal>,
  ): Partial<CollateralInternal_ORM_Entity> {
    const ormData: Partial<CollateralInternal_ORM_Entity> = {};

    if (partial.nasabahId)
      ormData.nasabah_id! = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.jaminanHrd) ormData.jaminan_hrd = partial.jaminanHrd;
    if (partial.jaminanCg) ormData.jaminan_cg = partial.jaminanCg;
    if (partial.penjamin) ormData.penjamin = partial.penjamin;
    if (partial.namaPenjamin) ormData.nama_penjamin = partial.namaPenjamin;
    if (partial.lamaKerjaPenjamin)
      ormData.lama_kerja_penjamin = partial.lamaKerjaPenjamin;
    if (partial.bagian) ormData.bagian = partial.bagian;
    if (partial.absensi) ormData.absensi = partial.absensi;
    if (partial.riwayatPinjamPenjamin)
      ormData.riwayat_pinjam_penjamin = partial.riwayatPinjamPenjamin;
    if (partial.riwayatNominalPenjamin)
      ormData.riwayat_nominal_penjamin = partial.riwayatNominalPenjamin;
    if (partial.riwayatTenorPenjamin)
      ormData.riwayat_tenor_penjamin = partial.riwayatTenorPenjamin;
    if (partial.sisaPinjamanPenjamin)
      ormData.sisa_pinjaman_penjamin = partial.sisaPinjamanPenjamin;
    if (partial.jaminanCgPenjamin)
      ormData.jaminan_cg_penjamin = partial.jaminanCgPenjamin;
    if (partial.statusHubunganPenjamin)
      ormData.status_hubungan_penjamin = partial.statusHubunganPenjamin;
    if (partial.fotoKtpPenjamin)
      ormData.foto_ktp_penjamin = partial.fotoKtpPenjamin;
    if (partial.fotoIdCardPenjamin)
      ormData.foto_id_card_penjamin = partial.fotoIdCardPenjamin;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<CollateralInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<CollateralInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: CollateralInternal): Promise<CollateralInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    collateralData: Partial<CollateralInternal>,
  ): Promise<CollateralInternal> {
    console.log('collateralData', collateralData, 'id', id);
    await this.ormRepository.update(id, this.toOrmPartial(collateralData));
    const updated = await this.ormRepository.findOne({
      where: { id },
    });
    if (!updated) throw new Error('Collateral not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<CollateralInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
