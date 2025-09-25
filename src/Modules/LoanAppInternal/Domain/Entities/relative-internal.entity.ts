// src/Modules/LoanAppInternal/Domain/Entities/relative-internal.entity.ts
import { KerabatKerjaEnum } from 'src/Shared/Enums/Internal/Relative.enum';

export class RelativesInternal {
  constructor(
    public nasabahId: number, // ID of ClientInternal
    public kerabatKerja: KerabatKerjaEnum,
    public id?: number,
    public nama?: string,
    public alamat?: string,
    public noHp?: string,
    public statusHubungan?: string,
    public namaPerusahaan?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  // Business rule: Check if the relative is considered as 'kerabat kerja' (working relative)
  public isKerabatKerja(): boolean {
    return this.kerabatKerja === KerabatKerjaEnum.YA;
  }

  // Business rule: Check if the relative has a valid contact number
  public hasValidContact(): boolean {
    return !!this.noHp;
  }
}
