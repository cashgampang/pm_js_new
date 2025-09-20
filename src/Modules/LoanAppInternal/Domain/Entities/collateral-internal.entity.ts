// src/Modules/LoanAppInternal/Domain/Entities/collateral-internal.entity.ts
import {
  PenjaminEnum,
  RiwayatPinjamPenjaminEnum,
} from 'src/Shared/Enums/Internal/Collateral.enum';

export class CollateralInternal {
  constructor(
    // === Immutable ===
    public readonly nasabahId: number, // ID of ClientInternal
    public readonly jaminanHrd: string,
    public readonly jaminanCg: string,
    public readonly penjamin: PenjaminEnum,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly deletedAt?: Date | null,

    // === Mutable ===
    public namaPenjamin?: string,
    public lamaKerjaPenjamin?: string,
    public bagian?: string,
    public absensi?: string,
    public riwayatPinjamPenjamin?: RiwayatPinjamPenjaminEnum,
    public riwayatNominalPenjamin?: number,
    public riwayatTenorPenjamin?: number,
    public sisaPinjamanPenjamin?: number,
    public jaminanCgPenjamin?: string,
    public statusHubunganPenjamin?: string,
    public fotoKtpPenjamin?: string,
    public fotoIdCardPenjamin?: string,
    public updatedAt?: Date,
  ) {}

  // === Business Rules ===
  public isCollateralComplete(): boolean {
    return (
      this.jaminanHrd.trim().length > 0 &&
      this.jaminanCg.trim().length > 0 &&
      this.penjamin !== PenjaminEnum.TIDAK
    );
  }

  public hasValidPenjaminHistory(): boolean {
    return this.riwayatPinjamPenjamin === RiwayatPinjamPenjaminEnum.ADA;
  }

  public hasRemainingDebt(): boolean {
    return (this.sisaPinjamanPenjamin ?? 0) > 0;
  }

  public hasProofDocuments(): boolean {
    return !!this.fotoKtpPenjamin && !!this.fotoIdCardPenjamin;
  }

  // === Update Methods ===
  public updatePenjaminInfo(
    nama: string,
    lamaKerja: string,
    bagian: string,
    absensi?: string,
  ): void {
    this.namaPenjamin = nama;
    this.lamaKerjaPenjamin = lamaKerja;
    this.bagian = bagian;
    this.absensi = absensi;
    this.updatedAt = new Date();
  }

  public updateRiwayat(
    status: RiwayatPinjamPenjaminEnum,
    nominal?: number,
    tenor?: number,
    sisa?: number,
  ): void {
    this.riwayatPinjamPenjamin = status;
    this.riwayatNominalPenjamin = nominal;
    this.riwayatTenorPenjamin = tenor;
    this.sisaPinjamanPenjamin = sisa;
    this.updatedAt = new Date();
  }

  public updateDokumen(fotoKtp?: string, fotoIdCard?: string): void {
    this.fotoKtpPenjamin = fotoKtp;
    this.fotoIdCardPenjamin = fotoIdCard;
    this.updatedAt = new Date();
  }
}
