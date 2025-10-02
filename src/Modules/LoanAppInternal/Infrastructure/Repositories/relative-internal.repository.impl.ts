import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelativesInternal } from '../../Domain/Entities/relative-internal.entity';
import { IRelativesInternalRepository } from '../../Domain/Repositories/relatives-internal.repository';
import { RelativeInternal_ORM_Entity } from '../Entities/relative-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
import { KerabatKerjaEnum } from '../../../../Shared/Enums/Internal/Relative.enum';

@Injectable()
export class RelativeInternalRepositoryImpl implements IRelativesInternalRepository {
  private readonly logger = new Logger(RelativeInternalRepositoryImpl.name);

  constructor(
    @InjectRepository(RelativeInternal_ORM_Entity)
    private readonly ormRepository: Repository<RelativeInternal_ORM_Entity>,
  ) {}

  private toDomain(orm: RelativeInternal_ORM_Entity): RelativesInternal {
    if (!orm.nasabah?.id) {
      this.logger.warn(`⚠️ Relative id=${orm.id} skipped: nasabah is null`);
      throw new BadRequestException(`nasabah_id is missing for relative id=${orm.id}`);
    }

    return new RelativesInternal(
      orm.nasabah.id,
      orm.kerabat_kerja,
      orm.id,
      orm.nama,
      orm.alamat,
      orm.no_hp,
      orm.status_hubungan,
      orm.nama_perusahaan,
      orm.jabatan,
      orm.penghasilan, // string
      orm.alamat_kerja,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  private toOrm(domain: RelativesInternal): Partial<RelativeInternal_ORM_Entity> {
    return {
      id: domain.id,
      nasabah: { id: domain.nasabahId } as ClientInternal_ORM_Entity,
      kerabat_kerja: domain.kerabatKerja,
      nama: domain.nama,
      alamat: domain.alamat,
      no_hp: domain.noHp,
      status_hubungan: domain.statusHubungan,
      nama_perusahaan: domain.namaPerusahaan,
      jabatan: domain.jabatan,
      penghasilan: domain.penghasilan, // string
      alamat_kerja: domain.alamatKerja,
      created_at: domain.createdAt ?? new Date(),
      updated_at: domain.updatedAt ?? new Date(),
      deleted_at: domain.deletedAt ?? undefined,
    };
  }

  private toOrmPartial(partial: Partial<RelativesInternal>): Partial<RelativeInternal_ORM_Entity> {
    const orm: Partial<RelativeInternal_ORM_Entity> = {};
    if (partial.nasabahId !== undefined) orm.nasabah = { id: partial.nasabahId } as ClientInternal_ORM_Entity;
    if (partial.kerabatKerja !== undefined) orm.kerabat_kerja = partial.kerabatKerja;
    if (partial.nama !== undefined) orm.nama = partial.nama;
    if (partial.alamat !== undefined) orm.alamat = partial.alamat;
    if (partial.noHp !== undefined) orm.no_hp = partial.noHp;
    if (partial.statusHubungan !== undefined) orm.status_hubungan = partial.statusHubungan;
    if (partial.namaPerusahaan !== undefined) orm.nama_perusahaan = partial.namaPerusahaan;
    if (partial.jabatan !== undefined) orm.jabatan = partial.jabatan;
    if (partial.penghasilan !== undefined) orm.penghasilan = partial.penghasilan; // string
    if (partial.alamatKerja !== undefined) orm.alamat_kerja = partial.alamatKerja;
    if (partial.createdAt !== undefined) orm.created_at = partial.createdAt;
    orm.updated_at = new Date();
    if (partial.deletedAt !== undefined) orm.deleted_at = partial.deletedAt ?? undefined;
    return orm;
  }

  async findAll(): Promise<RelativesInternal[]> {
    const entities = await this.ormRepository.find({ relations: ['nasabah'] });
    return entities.map(e => this.toDomain(e));
  }

  async findById(id: number): Promise<RelativesInternal | null> {
    const entity = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah'] });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByNasabahId(nasabahId: number): Promise<RelativesInternal[]> {
    const entities = await this.ormRepository.find({
      where: { nasabah: { id: nasabahId } },
      relations: ['nasabah'],
    });
    return entities.map(e => this.toDomain(e));
  }

  async save(domain: RelativesInternal): Promise<RelativesInternal> {
    const saved = await this.ormRepository.save(this.toOrm(domain));
    return this.toDomain(saved);
  }

  async update(id: number, partial: Partial<RelativesInternal>): Promise<RelativesInternal> {
    const existing = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah'] });
    if (!existing) throw new NotFoundException(`Relative id=${id} not found`);

    await this.ormRepository.update(id, this.toOrmPartial(partial));
    const updated = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah'] });
    return this.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    const result = await this.ormRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`Relative id=${id} not found`);
  }
}
