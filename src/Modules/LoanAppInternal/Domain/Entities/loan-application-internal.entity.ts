// src/Modules/LoanAppInternal/Domain/Entities/loan-application-internal.entity.ts

import {
  StatusPinjamanEnum,
  StatusPengajuanEnum,
} from 'src/Shared/Enums/Internal/LoanApp.enum';

export class LoanApplicationInternal {
  constructor(
    // === Immutable ===
    public readonly nasabahId: number, // ID of ClientInternal
    public readonly statusPinjaman: StatusPinjamanEnum,
    public readonly nominalPinjaman: number,
    public readonly tenor: number, // bulan
    public readonly keperluan: string,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly deletedAt?: Date | null,

    // === Mutable ===
    public status: StatusPengajuanEnum = StatusPengajuanEnum.PENDING,
    public pinjamanKe?: number,
    public riwayatNominal?: number,
    public riwayatTenor?: number,
    public sisaPinjaman?: number,
    public notes?: string,
    public isBanding: boolean = false,
    public alasanBanding?: string,
    public updatedAt?: Date,
  ) {}

  // === Business Rules ===
  public canRequestBanding(): boolean {
    return this.status === StatusPengajuanEnum.REJECTED_CA && !this.isBanding;
  }

  public isOverdue(currentDate: Date): boolean {
    if (!this.createdAt) return false;
    const loanEndDate = new Date(this.createdAt);
    loanEndDate.setMonth(loanEndDate.getMonth() + this.tenor);
    return currentDate > loanEndDate;
  }

  public hasRemainingDebt(): boolean {
    return (this.sisaPinjaman ?? 0) > 0;
  }

  public isActive(): boolean {
    return this.status === StatusPengajuanEnum.APPROVED_CA;
  }

  // === Update Methods ===
  public updateStatus(status: StatusPengajuanEnum, notes?: string): void {
    this.status = status;
    if (notes) this.notes = notes;
    this.updatedAt = new Date();
  }

  public requestBanding(alasan: string): void {
    if (!this.canRequestBanding()) {
      throw new Error('Pengajuan tidak bisa diajukan banding.');
    }
    this.isBanding = true;
    this.alasanBanding = alasan;
    this.updatedAt = new Date();
  }

  public updateRemainingDebt(sisa: number): void {
    this.sisaPinjaman = sisa;
    this.updatedAt = new Date();
  }
}
