import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInternal } from '../../Domain/Entities/client-internal.entity';
import { IClientInternalRepository } from '../../Domain/Repositories/client-internal.repository';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
import { Users_ORM_Entity } from 'src/Modules/Users/Infrastructure/Entities/users.orm-entity';

@Injectable()
export class ClientInternalRepositoryImpl implements IClientInternalRepository {
  constructor(
    @InjectRepository(ClientInternal_ORM_Entity)
    private readonly ormRepository: Repository<ClientInternal_ORM_Entity>,
  ) {}

  // Convert ORM entity to Domain entity
  private toDomain(orm: ClientInternal_ORM_Entity): ClientInternal {
    const marketingId = orm.marketing?.id ?? null;

    return new ClientInternal(
      marketingId,
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
      orm.foto_rekening,
      orm.enable_edit,
      orm.points,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  // Convert Domain entity to ORM entity (full)
  private toOrm(domain: ClientInternal): Partial<ClientInternal_ORM_Entity> {
    return {
      id: domain.id,
      marketing: domain.marketingId
        ? ({ id: domain.marketingId } as Users_ORM_Entity)
        : undefined,
      nama_lengkap: domain.namaLengkap,
      no_ktp: domain.noKtp,
      jenis_kelamin: domain.jenisKelamin,
      tempat_lahir: domain.tempatLahir,
      tanggal_lahir: domain.tanggalLahir,
      no_hp: domain.noHp,
      status_nikah: domain.statusNikah,
      email: domain.email,
      foto_ktp: domain.fotoKtp,
      foto_kk: domain.fotoKk,
      foto_id_card: domain.fotoIdCard,
      foto_rekening: domain.fotoRekening,
      no_rekening: domain.noRekening,
      enable_edit: domain.enableEdit,
      points: domain.points,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      deleted_at: domain.deletedAt,
    };
  }

  // Convert partial Domain entity to ORM entity (for update)
  private toOrmPartial(
    partial: Partial<ClientInternal>,
  ): Partial<ClientInternal_ORM_Entity> {
    const ormData: Partial<ClientInternal_ORM_Entity> = {};

    if (partial.marketingId !== undefined)
      ormData.marketing = { id: partial.marketingId } as Users_ORM_Entity;
    if (partial.namaLengkap !== undefined)
      ormData.nama_lengkap = partial.namaLengkap;
    if (partial.noKtp !== undefined) ormData.no_ktp = partial.noKtp;
    if (partial.jenisKelamin !== undefined)
      ormData.jenis_kelamin = partial.jenisKelamin;
    if (partial.tempatLahir !== undefined)
      ormData.tempat_lahir = partial.tempatLahir;
    if (partial.tanggalLahir !== undefined)
      ormData.tanggal_lahir = partial.tanggalLahir;
    if (partial.noHp !== undefined) ormData.no_hp = partial.noHp;
    if (partial.statusNikah !== undefined)
      ormData.status_nikah = partial.statusNikah;
    if (partial.email !== undefined) ormData.email = partial.email;
    if (partial.fotoKtp !== undefined) ormData.foto_ktp = partial.fotoKtp;
    if (partial.fotoKk !== undefined) ormData.foto_kk = partial.fotoKk;
    if (partial.fotoIdCard !== undefined)
      ormData.foto_id_card = partial.fotoIdCard;
    if (partial.fotoRekening !== undefined)
      ormData.foto_rekening = partial.fotoRekening;
    if (partial.noRekening !== undefined)
      ormData.no_rekening = partial.noRekening;
    if (partial.enableEdit !== undefined)
      ormData.enable_edit = partial.enableEdit;
    if (partial.points !== undefined) ormData.points = partial.points;
    if (partial.createdAt !== undefined)
      ormData.created_at = partial.createdAt;
    if (partial.updatedAt !== undefined)
      ormData.updated_at = partial.updatedAt;
    if (partial.deletedAt !== undefined)
      ormData.deleted_at = partial.deletedAt;

    return ormData;
  }

  async findById(id: number): Promise<ClientInternal | null> {
    const ormEntity = await this.ormRepository.findOne({
      where: { id },
      relations: ['marketing'],
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByMarketingId(marketingId: number): Promise<ClientInternal[]> {
    const ormEntities = await this.ormRepository.find({
      where: { marketing: { id: marketingId } },
      relations: ['marketing'],
    });
    return ormEntities.map((orm) => this.toDomain(orm));
  }

  async findAll(): Promise<ClientInternal[]> {
    const ormEntities = await this.ormRepository.find({
      relations: ['marketing'],
    });
    return ormEntities.map((orm) => this.toDomain(orm));
  }

  async save(client: ClientInternal): Promise<ClientInternal> {
    const ormEntity = this.toOrm(client);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomain(saved);
  }

  async update(
    id: number,
    data: Partial<ClientInternal>,
  ): Promise<ClientInternal> {
    await this.ormRepository.update(id, this.toOrmPartial(data));
    const updated = await this.ormRepository.findOne({
      where: { id },
      relations: ['marketing'],
    });

    if (!updated) throw new Error('ClientInternal not found');
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
