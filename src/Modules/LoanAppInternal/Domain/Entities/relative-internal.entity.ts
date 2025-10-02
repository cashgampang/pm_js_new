import { KerabatKerjaEnum } from 'src/Shared/Enums/Internal/Relative.enum';

export class RelativesInternal {
  constructor(
    public nasabahId: number,
    public kerabatKerja: KerabatKerjaEnum,
    public id?: number,
    public nama?: string,
    public alamat?: string,
    public noHp?: string,
    public statusHubungan?: string,
    public namaPerusahaan?: string,
    public jabatan?: string,
    public penghasilan?: string, // string untuk konsisten dengan ORM
    public alamatKerja?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  isKerabatKerja(): boolean {
    return this.kerabatKerja === KerabatKerjaEnum.YA;
  }

  hasValidContact(): boolean {
    return !!this.noHp;
  }
}
