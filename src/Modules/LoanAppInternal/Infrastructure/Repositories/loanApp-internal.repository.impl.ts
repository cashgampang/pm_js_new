import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanApplicationInternal } from '../../Domain/Entities/loan-application-internal.entity';
import { ILoanApplicationInternalRepository } from '../../Domain/Repositories/loanApp-internal.repository';
import { LoanApplicationInternal_ORM_Entity } from '../Entities/loan-application-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
@Injectable()
export class LoanApplicationInternalRepositoryImpl
  implements ILoanApplicationInternalRepository
{
  constructor(
    @InjectRepository(LoanApplicationInternal_ORM_Entity)
    private readonly ormRepository: Repository<LoanApplicationInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(
    orm: LoanApplicationInternal_ORM_Entity,
  ): LoanApplicationInternal {
    return new LoanApplicationInternal(
      orm.nasabah_id!.id,
      orm.status_pinjaman,
      orm.nominal_pinjaman,
      orm.tenor,
      orm.keperluan,
      orm.id,
      orm.created_at,
      orm.deleted_at,
      orm.status,
      orm.pinjaman_ke,
      orm.riwayat_nominal,
      orm.riwayat_tenor,
      orm.sisa_pinjaman,
      orm.notes,
      orm.is_banding,
      orm.alasan_banding,
      orm.updated_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(
    domainEntity: LoanApplicationInternal,
  ): Partial<LoanApplicationInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      nasabah_id: { id: domainEntity.nasabahId } as ClientInternal_ORM_Entity,
      status_pinjaman: domainEntity.statusPinjaman,
      nominal_pinjaman: domainEntity.nominalPinjaman,
      tenor: domainEntity.tenor,
      keperluan: domainEntity.keperluan,
      status: domainEntity.status,
      pinjaman_ke: domainEntity.pinjamanKe,
      riwayat_nominal: domainEntity.riwayatNominal,
      riwayat_tenor: domainEntity.riwayatTenor,
      sisa_pinjaman: domainEntity.sisaPinjaman,
      notes: domainEntity.notes,
      is_banding: domainEntity.isBanding,
      alasan_banding: domainEntity.alasanBanding,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<LoanApplicationInternal>,
  ): Partial<LoanApplicationInternal_ORM_Entity> {
    const ormData: Partial<LoanApplicationInternal_ORM_Entity> = {};

    if (partial.nasabahId)
      ormData.nasabah_id! = {
        id: partial.nasabahId,
      } as ClientInternal_ORM_Entity;
    if (partial.statusPinjaman)
      ormData.status_pinjaman = partial.statusPinjaman;
    if (partial.nominalPinjaman)
      ormData.nominal_pinjaman = partial.nominalPinjaman;
    if (partial.tenor) ormData.tenor = partial.tenor;
    if (partial.keperluan) ormData.keperluan = partial.keperluan;
    if (partial.status) ormData.status = partial.status;
    if (partial.pinjamanKe) ormData.pinjaman_ke = partial.pinjamanKe;
    if (partial.riwayatNominal)
      ormData.riwayat_nominal = partial.riwayatNominal;
    if (partial.riwayatTenor) ormData.riwayat_tenor = partial.riwayatTenor;
    if (partial.sisaPinjaman) ormData.sisa_pinjaman = partial.sisaPinjaman;
    if (partial.notes) ormData.notes = partial.notes;
    if (partial.isBanding) ormData.is_banding = partial.isBanding;
    if (partial.alasanBanding) ormData.alasan_banding = partial.alasanBanding;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<LoanApplicationInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByNasabahId(nasabahId: number): Promise<LoanApplicationInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { nasabah_id: { id: nasabahId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(
    address: LoanApplicationInternal,
  ): Promise<LoanApplicationInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    addressData: Partial<LoanApplicationInternal>,
  ): Promise<LoanApplicationInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(addressData));
    const updated = await this.ormRepository.findOne({ where: { id } });
    if (!updated) throw new Error('Address not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<LoanApplicationInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }

  async callSP_MKT_GetAllLoanApplications_Internal(marketingId: number, page: number, pageSize: number): Promise<{data: any[], total: number}> {
    const ormEntities = this.ormRepository.manager;
    const result = await ormEntities.query(
      `CALL MKT_GetAllLoanApplications_Internal(?, ?, ?);`,
      [marketingId, page, pageSize],
    );

    return {
      data: result[0] || [],
      total: result[1] ? result[1][0]?.total || 0 : 0,
    };
  }
}
