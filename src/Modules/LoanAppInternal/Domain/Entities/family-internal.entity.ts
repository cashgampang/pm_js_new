import { BekerjaEnum, HubunganEnum } from 'src/Shared/Enums/Internal/Family.enum';

export class FamilyInternal {
  constructor(
    public readonly nasabah_id: number,
    public readonly hubungan: HubunganEnum,
    public readonly nama: string,
    public readonly bekerja: BekerjaEnum,
    public readonly id?: number,
    public readonly created_at?: Date,
    public readonly deleted_at?: Date,
    public nama_perusahaan?: string,
    public jabatan?: string,
    public penghasilan?: number,
    public alamat_kerja?: string,
    public no_hp?: string,
    public updated_at?: Date,
  ) {}

  public is_employed(): boolean {
    return this.bekerja === BekerjaEnum.YA;
  }

  public has_company_info(): boolean {
    return !!this.nama_perusahaan && !!this.jabatan;
  }

  public has_income(): boolean {
    return this.is_employed() && (this.penghasilan ?? 0) > 0;
  }

  public is_emergency_contact(): boolean {
    return [HubunganEnum.SUAMI, HubunganEnum.ISTRI, HubunganEnum.ORANG_TUA].includes(this.hubungan);
  }

  public update_job_info(
    nama_perusahaan?: string,
    jabatan?: string,
    penghasilan?: number,
    alamat_kerja?: string,
  ): void {
    if (nama_perusahaan !== undefined) this.nama_perusahaan = nama_perusahaan;
    if (jabatan !== undefined) this.jabatan = jabatan;
    if (penghasilan !== undefined) this.penghasilan = penghasilan;
    if (alamat_kerja !== undefined) this.alamat_kerja = alamat_kerja;

    this.updated_at = new Date();
  }

  public update_contact(no_hp?: string): void {
    if (no_hp !== undefined) this.no_hp = no_hp;
    this.updated_at = new Date();
  }
}

