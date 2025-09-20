// domain/entities/family-internal.entity.ts

import {
  BekerjaEnum,
  HubunganEnum,
} from 'src/Shared/Enums/Internal/Family.enum';

export class FamilyInternal {
  constructor(
    // === Immutable ===
    public readonly nasabahId: number, // ID of ClientInternal
    public readonly hubungan: HubunganEnum,
    public readonly nama: string,
    public readonly bekerja: BekerjaEnum,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly deletedAt?: Date | null,

    // === Mutable ===
    public namaPerusahaan?: string,
    public jabatan?: string,
    public penghasilan?: number,
    public alamatKerja?: string,
    public noHp?: string,
    public updatedAt?: Date,
  ) {}

  // === Business Rules ===
  public isEmployed(): boolean {
    return this.bekerja === BekerjaEnum.YA;
  }

  public hasCompanyInfo(): boolean {
    return !!this.namaPerusahaan && !!this.jabatan;
  }

  public hasIncome(): boolean {
    return this.isEmployed() && (this.penghasilan ?? 0) > 0;
  }

  public isEmergencyContact(): boolean {
    return this.hubungan === HubunganEnum.SUAMI ||
           this.hubungan === HubunganEnum.ISTRI ||
           this.hubungan === HubunganEnum.ORANG_TUA;
  }

  // === Update Methods ===
  public updateJobInfo(
    namaPerusahaan?: string,
    jabatan?: string,
    penghasilan?: number,
    alamatKerja?: string,
  ): void {
    this.namaPerusahaan = namaPerusahaan;
    this.jabatan = jabatan;
    this.penghasilan = penghasilan;
    this.alamatKerja = alamatKerja;
    this.updatedAt = new Date();
  }

  public updateContact(noHp: string): void {
    this.noHp = noHp;
    this.updatedAt = new Date();
  }
}
