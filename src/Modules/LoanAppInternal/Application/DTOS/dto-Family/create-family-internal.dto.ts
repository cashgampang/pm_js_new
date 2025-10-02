// src/Application/DTOS/dto-Family/create-family-internal.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { HubunganEnum, BekerjaEnum } from 'src/Shared/Enums/Internal/Family.enum';

export class CreateFamilyDto {
  @IsNumber()
  nasabah_id: number;

  @IsEnum(HubunganEnum)
  hubungan: HubunganEnum;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsEnum(BekerjaEnum)
  bekerja: BekerjaEnum;

  @IsOptional()
  @IsString()
  nama_perusahaan?: string;

  @IsOptional()
  @IsString()
  jabatan?: string;

  @IsOptional()
  @IsNumber()
  penghasilan?: number;

  @IsOptional()
  @IsString()
  alamat_kerja?: string;

  @IsOptional()
  @IsString()
  no_hp?: string;

  // ✅ Getter untuk domain (camelCase)
  // get nasabahId(): number {
  //   return this.nasabah_id;
  // }

  // get namaPerusahaan(): string | undefined {
  //   return this.nama_perusahaan;
  // }

  // get alamatKerja(): string | undefined {
  //   return this.alamat_kerja;
  // }

  // get noHp(): string | undefined {
  //   return this.no_hp;
  // }
}
