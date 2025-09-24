import { GENDER, MARRIAGE_STATUS } from "src/Shared/Enums/Internal/Clients.enum";

export class ClientInternal {
  // === Immutable ===
  public readonly id?: number;
  public readonly marketingId: number;
  public readonly createdAt: Date;
  public readonly deletedAt?: Date | null;
  
  // === Mutable ===
  public namaLengkap: string;
  public noKtp: string;
  public jenisKelamin: GENDER;
  public tempatLahir: string;
  public tanggalLahir: Date;
  public noHp: string;
  public statusNikah: MARRIAGE_STATUS;
  public email?: string;
  public fotoKtp?: string;
  public fotoKk?: string;
  public fotoIdCard?: string;
  public fotoRekening?: string;
  public noRekening?: string;
  public enableEdit: boolean;
  public points?: string;
  public updatedAt: Date;

  constructor(
    marketingId: number,
    namaLengkap: string,
    noKtp: string,
    jenisKelamin: GENDER,
    tempatLahir: string,
    tanggalLahir: Date,
    noHp: string,
    statusNikah: MARRIAGE_STATUS,
    id?: number,
    email?: string,
    fotoKtp?: string,
    fotoKk?: string,
    fotoIdCard?: string,
    fotoRekening?: string,
    noRekening?: string,
    enableEdit: boolean = false,
    points?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    this.marketingId = marketingId;
    this.namaLengkap = namaLengkap;
    this.noKtp = noKtp;
    this.jenisKelamin = jenisKelamin;
    this.tempatLahir = tempatLahir;
    this.tanggalLahir = tanggalLahir;
    this.noHp = noHp;
    this.statusNikah = statusNikah;

    this.id = id;
    this.email = email;
    this.fotoKtp = fotoKtp;
    this.fotoKk = fotoKk;
    this.fotoIdCard = fotoIdCard;
    this.fotoRekening = fotoRekening;
    this.noRekening = noRekening;
    this.enableEdit = enableEdit;
    this.points = points;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  // Validations
  public isKtpValid(): boolean {
    return this.noKtp.length === 16;
  }

  public isMarriageStatusValid(): boolean {
    return Object.values(MARRIAGE_STATUS).includes(this.statusNikah);
  }
}
