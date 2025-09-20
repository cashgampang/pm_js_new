import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInternal } from '../../Domain/Entities/client-internal.entity';
import { IClientInternalRepository } from '../../Domain/Repositories/client-internal.repository';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
import { Users_ORM_Entity } from 'src/Modules/Users/Infrastructure/Entities/users.orm-entity';
@Injectable()
export class ClientInternalRepositoryImpl
  implements IClientInternalRepository
{
  constructor(
    @InjectRepository(ClientInternal_ORM_Entity)
    private readonly ormRepository: Repository<ClientInternal_ORM_Entity>,
  ) {}

  //? MAPPER >==========================================================================

  //? All Transactions that using for get datas

  private toDomain(orm: ClientInternal_ORM_Entity): ClientInternal {
    return new ClientInternal(
      orm.marketing!.id,
      orm.nama_lengkap,
      orm.no_ktp,
      orm.jenis_kelamin,
      orm.tempat_lahir,
      orm.tanggal_lahir,
      orm.no_hp,
      orm.status_nikah,
      orm.id,
      orm.email,
      orm.foto_ktp,
      orm.foto_kk,
      orm.foto_id_card,
      orm.foto_rekening,
      orm.no_rekening,
      orm.enable_edit,
      orm.points,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  //? All Transactions that using for Create datas

  private toOrm(
    domainEntity: ClientInternal,
  ): Partial<ClientInternal_ORM_Entity> {
    return {
      id: domainEntity.id,
      marketing: { id: domainEntity.marketingId } as Users_ORM_Entity,
      nama_lengkap: domainEntity.namaLengkap,
      no_ktp: domainEntity.noKtp,
      jenis_kelamin: domainEntity.jenisKelamin,
      tempat_lahir: domainEntity.tempatLahir,
      tanggal_lahir: domainEntity.tanggalLahir,
      no_hp: domainEntity.noHp,
      status_nikah: domainEntity.statusNikah,
      email: domainEntity.email,
      foto_ktp: domainEntity.fotoKtp,
      foto_kk: domainEntity.fotoKk,
      foto_id_card: domainEntity.fotoIdCard,
      foto_rekening: domainEntity.fotoRekening,
      no_rekening: domainEntity.noRekening,
      enable_edit: domainEntity.enableEdit,
      points: domainEntity.points,
      created_at: domainEntity.createdAt,
      updated_at: domainEntity.updatedAt,
      deleted_at: domainEntity.deletedAt,
    };
  }

  //? All Transactions that using for Partial Update like PATCH or Delete

  private toOrmPartial(
    partial: Partial<ClientInternal>,
  ): Partial<ClientInternal_ORM_Entity> {
    const ormData: Partial<ClientInternal_ORM_Entity> = {};

    if (partial.marketingId)
      ormData.marketing! = { id: partial.marketingId } as Users_ORM_Entity;
    if (partial.namaLengkap) ormData.nama_lengkap! = partial.namaLengkap;
    if (partial.noKtp) ormData.no_ktp = partial.noKtp;
    if (partial.jenisKelamin) ormData.jenis_kelamin = partial.jenisKelamin;
    if (partial.tempatLahir) ormData.tempat_lahir = partial.tempatLahir;
    if (partial.tanggalLahir) ormData.tanggal_lahir = partial.tanggalLahir;
    if (partial.noHp) ormData.no_hp = partial.noHp;
    if (partial.statusNikah) ormData.status_nikah = partial.statusNikah;
    if (partial.email) ormData.email = partial.email;
    if (partial.fotoKtp) ormData.foto_ktp = partial.fotoKtp;
    if (partial.fotoKk) ormData.foto_kk = partial.fotoKk;
    if (partial.fotoIdCard) ormData.foto_id_card = partial.fotoIdCard;
    if (partial.fotoRekening) ormData.foto_rekening = partial.fotoRekening;
    if (partial.noRekening) ormData.no_rekening = partial.noRekening;
    if (partial.enableEdit) ormData.enable_edit = partial.enableEdit;
    if (partial.points) ormData.points = partial.points;
    if (partial.createdAt) ormData.created_at = partial.createdAt;
    if (partial.updatedAt) ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt) ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  //?===================================================================================

  async findById(id: number): Promise<ClientInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByMarketingId(marketingId: number): Promise<ClientInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { marketing: { id: marketingId } },
    });
    return ormEntities.map(this.toDomain);
  }

  async save(address: ClientInternal): Promise<ClientInternal> {
    const ormEntity = this.toOrm(address);
    const savedOrm = await this.ormRepository.save(ormEntity);
    return this.toDomain(savedOrm);
  }

  async update(
    id: number,
    addressData: Partial<ClientInternal>,
  ): Promise<ClientInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(addressData));
    const updated = await this.ormRepository.findOne({ where: { id } });
    if (!updated) throw new Error('Address not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll(): Promise<ClientInternal[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomain);
  }
}
