// src/Application/Services/family-internal.service.ts
import { Injectable, Inject } from '@nestjs/common';
import {
  IFamilyInternalRepository,
  FAMILY_INTERNAL_REPOSITORY,
} from '../../Domain/Repositories/family-internal.repository';
import { FamilyInternal } from '../../Domain/Entities/family-internal.entity';
import { CreateFamilyDto } from '../DTOS/dto-Family/create-family-internal.dto';
import { UpdateFamilyDto } from '../DTOS/dto-Family/update-family-internal.dto';

@Injectable()
export class FamilyInternalService {
  constructor(
    @Inject(FAMILY_INTERNAL_REPOSITORY)
    private readonly repo: IFamilyInternalRepository,
  ) {}

 async create(dto: CreateFamilyDto): Promise<FamilyInternal> {
  const now = new Date();
  const family = new FamilyInternal(
    dto.nasabah_id,
    dto.hubungan,
    dto.nama,
    dto.bekerja,
    undefined,
    now,
    undefined,
    dto.nama_perusahaan,
    dto.jabatan,
    dto.penghasilan,
    dto.alamat_kerja,
    dto.no_hp,
    now,
  );
  return this.repo.save(family);
}

async update(id: number, dto: UpdateFamilyDto): Promise<FamilyInternal> {
  // langsung pass DTO snake_case ke repo
  const partial: Partial<FamilyInternal> = {
    nama_perusahaan: dto.nama_perusahaan,
    alamat_kerja: dto.alamat_kerja,
    no_hp: dto.no_hp,
    hubungan: dto.hubungan,
    nama: dto.nama,
    bekerja: dto.bekerja,
    penghasilan: dto.penghasilan,
    jabatan: dto.jabatan,
  };

  return this.repo.update(id, partial);
}



  async findAll(): Promise<FamilyInternal[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<FamilyInternal | null> {
    return this.repo.findById(id);
  }

  async findByNasabahId(nasabahId: number): Promise<FamilyInternal[]> {
    return this.repo.findByNasabahId(nasabahId);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
