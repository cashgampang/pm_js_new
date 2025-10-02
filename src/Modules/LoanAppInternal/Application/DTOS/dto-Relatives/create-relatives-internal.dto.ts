import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { KerabatKerjaEnum } from 'src/Shared/Enums/Internal/Relative.enum';

export class CreateRelativesInternalDto {
  @IsNumber()
  @IsNotEmpty()
  nasabahId: number; // ID saja, bukan entity

  @IsEnum(KerabatKerjaEnum)
  kerabatKerja: KerabatKerjaEnum;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @IsOptional()
  @IsString()
  noHp?: string;

  @IsOptional()
  @IsString()
  statusHubungan?: string;

  @IsOptional()
  @IsString()
  namaPerusahaan?: string;

  @IsOptional()
  @IsString()
  jabatan?: string;

  @IsOptional()
  @IsNumber()
  penghasilan?: number;

  @IsOptional()
  @IsString()
  alamatKerja?: string;
}
