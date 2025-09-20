import { Injectable, Inject } from '@nestjs/common';
import { IRelativeInternalRepository, RELATIVE_INTERNAL_REPOSITORY } from '../../Domain/Repositories/relatives-internal.repository';
import { RelativeInternal } from '../../Domain/Entities/relative-internal.entity';
import { CreateRelativeInternalDto } from '../DTOS/dto-Relatives/create-relatives-internal.dto';
import { UpdateRelativeInternalDto } from '../DTOS/dto-Relatives/update-relatives-internal.dto';

@Injectable()
export class RelativeInternalService {
  constructor(
    @Inject(RELATIVE_INTERNAL_REPOSITORY)
    private readonly repo: IRelativeInternalRepository,
  ) {}

  async create(dto: CreateRelativeInternalDto): Promise<RelativeInternal> {
    const now = new Date();
    const address = new RelativeInternal(
      dto.nasabah_id,
      dto.kerabat_kerja,
      undefined,
      dto.nama,
      dto.alamat,
      dto.no_hp,
      dto.status_hubungan,
      dto.nama_perusahaan,
      now,
      now,
      null,
    );
    return this.repo.save(address);
  }

  async update(id: number, dto: UpdateRelativeInternalDto): Promise<RelativeInternal> {
    return this.repo.update(id, dto);
  }

  async findById(id: number): Promise<RelativeInternal | null> {
    return this.repo.findById(id);
  }

  async findAll(): Promise<RelativeInternal[]> {
    return this.repo.findAll();
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
