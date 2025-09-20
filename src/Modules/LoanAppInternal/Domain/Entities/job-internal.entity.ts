// src/Modules/LoanAppInternal/Domain/Entities/job-internal.entity.ts

import {
  PerusahaanEnum,
  GolonganEnum,
} from 'src/Shared/Enums/Internal/Job.enum';

export class JobInternal {
  constructor(
    // === Immutable ===
    public readonly nasabahId: number, // ID of ClientInternal
    public readonly perusahaan: PerusahaanEnum,
    public readonly divisi: string,
    public readonly golongan: GolonganEnum,
    public readonly namaAtasan: string,
    public readonly namaHrd: string,
    public readonly absensi: string,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly deletedAt?: Date | null,

    // === Mutable ===
    public yayasan?: string,
    public lamaKerjaBulan?: number,
    public lamaKerjaTahun?: number,
    public buktiAbsensi?: string,
    public updatedAt?: Date,
  ) {}

  // === Business Rules ===
  public totalYearsOfExperience(): number {
    return (this.lamaKerjaTahun ?? 0) + (this.lamaKerjaBulan ?? 0) / 12;
  }

  public requiresYayasan(): boolean {
    return !!this.yayasan;
  }

  public isAbsensiValid(): boolean {
    return this.absensi.trim() !== '';
  }

  public hasProofOfAbsensi(): boolean {
    return !!this.buktiAbsensi;
  }

  // === Update Methods ===
  public updateWorkDuration(tahun: number, bulan: number): void {
    this.lamaKerjaTahun = tahun;
    this.lamaKerjaBulan = bulan;
    this.updatedAt = new Date();
  }

  public updateYayasan(yayasan: string): void {
    this.yayasan = yayasan;
    this.updatedAt = new Date();
  }

  public updateAbsensi(buktiAbsensi: string): void {
    this.buktiAbsensi = buktiAbsensi;
    this.updatedAt = new Date();
  }
}
