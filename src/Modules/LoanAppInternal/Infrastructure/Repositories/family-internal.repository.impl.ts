// src/Modules/LoanAppInternal/Infrastructure/Repositories/relative-internal.repository.impl.ts
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelativesInternal } from '../../Domain/Entities/relative-internal.entity';
import { IRelativesInternalRepository } from '../../Domain/Repositories/relatives-internal.repository';
import { RelativeInternal_ORM_Entity } from '../Entities/relative-internal.orm-entity';
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';

@Injectable()
export class RelativeInternalRepositoryImpl implements IRelativesInternalRepository {
  private readonly logger = new Logger(RelativeInternalRepositoryImpl.name);

  constructor(
    @InjectRepository(RelativeInternal_ORM_Entity)
    private readonly ormRepository: Repository<RelativeInternal_ORM_Entity>,
  ) {}

  // ================= Mapper =================
  private toDomain(orm: RelativeInternal_ORM_Entity): RelativesInternal | null {
    if (!orm || !orm.nasabah_id?.id) {
      this.logger.warn(`Skipping relative id=${orm?.id}, nasabah_id missing`);
      return null;
    }

    return new RelativesInternal(
      orm.nasabah_id.id,
      orm.kerabat_kerja,
      orm.id,
      orm.nama,
      orm.alamat,
      orm.no_hp,
      orm.status_hubungan,
      orm.nama_perusahaan,
      orm.jabatan,
      orm.penghasilan,
      orm.alamat_kerja,
      orm.created_at,
      orm.updated_at,
      orm.deleted_at,
    );
  }

  private toOrm(domain: RelativesInternal): Partial<RelativeInternal_ORM_Entity> {
    return {
      id: domain.id,
      nasabah_id: { id: domain.nasabahId } as ClientInternal_ORM_Entity,
      kerabat_kerja: domain.kerabatKerja,
      nama: domain.nama,
      alamat: domain.alamat,
      no_hp: domain.noHp,
      status_hubungan: domain.statusHubungan,
      nama_perusahaan: domain.namaPerusahaan,
      jabatan: domain.jabatan,
      penghasilan: domain.penghasilan,
      alamat_kerja: domain.alamatKerja,
      created_at: domain.createdAt ?? new Date(),
      updated_at: domain.updatedAt ?? new Date(),
      deleted_at: domain.deletedAt ?? null,
    };
  }

  private toOrmPartial(partial: Partial<RelativesInternal>): Partial<RelativeInternal_ORM_Entity> {
    const ormData: Partial<RelativeInternal_ORM_Entity> = {};
    if (partial.nasabahId !== undefined) ormData.nasabah_id = { id: partial.nasabahId } as ClientInternal_ORM_Entity;
    if (partial.kerabatKerja !== undefined) ormData.kerabat_kerja = partial.kerabatKerja;
    if (partial.nama !== undefined) ormData.nama = partial.nama;
    if (partial.alamat !== undefined) ormData.alamat = partial.alamat;
    if (partial.noHp !== undefined) ormData.no_hp = partial.noHp;
    if (partial.statusHubungan !== undefined) ormData.status_hubungan = partial.statusHubungan;
    if (partial.namaPerusahaan !== undefined) ormData.nama_perusahaan = partial.namaPerusahaan;
    if (partial.jabatan !== undefined) ormData.jabatan = partial.jabatan;
    if (partial.penghasilan !== undefined) ormData.penghasilan = partial.penghasilan;
    if (partial.alamatKerja !== undefined) ormData.alamat_kerja = partial.alamatKerja;
    if (partial.createdAt !== undefined) ormData.created_at = partial.createdAt;
    ormData.updated_at = new Date();
    if (partial.deletedAt !== undefined) ormData.deleted_at = partial.deletedAt;
    return ormData;
  }

  // ================= CRUD =================
  async findAll(): Promise<RelativesInternal[]> {
    const ormEntities = await this.ormRepository.find({ relations: ['nasabah_id'] });
    return ormEntities.map(e => this.toDomain(e)).filter(e => e !== null) as RelativesInternal[];
  }

  async findById(id: number): Promise<RelativesInternal | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah_id'] });
    const domain = ormEntity ? this.toDomain(ormEntity) : null;
    if (!domain) this.logger.warn(`Relative with id=${id} not found or nasabah_id missing`);
    return domain;
  }

  async findByNasabahId(nasabahId: number): Promise<RelativesInternal[]> {
    const ormEntities = await this.ormRepository.find({ where: { nasabah_id: { id: nasabahId } }, relations: ['nasabah_id'] });
    return ormEntities.map(e => this.toDomain(e)).filter(e => e !== null) as RelativesInternal[];
  }

  async save(relative: RelativesInternal): Promise<RelativesInternal> {
    if (!relative.nasabahId) throw new BadRequestException('nasabahId is required');
    const saved = await this.ormRepository.save(this.toOrm(relative));
    return this.toDomain(saved)!;
  }

  async update(id: number, data: Partial<RelativesInternal>): Promise<RelativesInternal> {
    const existing = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah_id'] });
    if (!existing) throw new NotFoundException(`Relative with id=${id} not found`);
    await this.ormRepository.update(id, this.toOrmPartial(data));
    const updated = await this.ormRepository.findOne({ where: { id }, relations: ['nasabah_id'] });
    return this.toDomain(updated)!;
  }

  async delete(id: number): Promise<void> {
    const result = await this.ormRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`Relative with id=${id} not found`);
  }
}
