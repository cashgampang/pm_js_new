import { Injectable, Inject } from '@nestjs/common';
import { IRelativesInternalRepository, RELATIVE_INTERNAL_REPOSITORY } from '../../Domain/Repositories/relatives-internal.repository';
import { RelativesInternal } from '../../Domain/Entities/relative-internal.entity';
import { CreateRelativesInternalDto } from '../DTOS/dto-Relatives/create-relatives-internal.dto';
import { UpdateRelativeInternalDto } from '../DTOS/dto-Relatives/update-relatives-internal.dto';

@Injectable()
export class RelativeInternalService {
  constructor(
    @Inject(RELATIVE_INTERNAL_REPOSITORY)
    private readonly repo: IRelativesInternalRepository,
  ) {}

  async create(dto: CreateRelativesInternalDto): Promise<RelativesInternal> {
    const now = new Date();

    const relative = new RelativesInternal(
      dto.nasabahId,
      dto.kerabatKerja,
      undefined,
      dto.nama,
      dto.alamat,
      dto.noHp,
      dto.statusHubungan,
      dto.namaPerusahaan,
      dto.jabatan,
      dto.penghasilan, // pastikan string
      dto.alamatKerja,
      now,
      now,
      null,
    );

    return this.repo.save(relative);
  }

  async update(id: number, dto: UpdateRelativeInternalDto): Promise<RelativesInternal> {
    const partial: Partial<RelativesInternal> = {
      nama: dto.nama,
      alamat: dto.alamat,
      noHp: dto.noHp,
      statusHubungan: dto.statusHubungan,
      namaPerusahaan: dto.namaPerusahaan,
      jabatan: dto.jabatan,
      penghasilan: dto.penghasilan, // string
      alamatKerja: dto.alamatKerja,
      kerabatKerja: dto.kerabatKerja,
      nasabahId: dto.nasabahId,
    };

    return this.repo.update(id, partial);
  }

  async findById(id: number): Promise<RelativesInternal | null> {
    return this.repo.findById(id);
  }

  async findAll(): Promise<RelativesInternal[]> {
    return this.repo.findAll();
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
