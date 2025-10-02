import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// ================= Client =================
class ClientInternalDto {
  @IsString() @IsNotEmpty() nama_lengkap: string;
  @IsString() @IsNotEmpty() no_ktp: string;
  @IsString() @IsNotEmpty() no_hp: string;
  @IsEmail() @IsNotEmpty() email: string;
}

// ================= Address =================
class AddressInternalDto {
  @IsOptional() @IsString() alamat_ktp?: string;
  @IsOptional() @IsString() rt_rw?: string;
  @IsOptional() @IsString() kelurahan?: string;
  @IsOptional() @IsString() kecamatan?: string;
  @IsOptional() @IsString() kota?: string;
  @IsOptional() @IsString() provinsi?: string;
}

// ================= Family =================
class FamilyInternalDto {
  @IsOptional() @IsString() hubungan?: string;
  @IsOptional() @IsString() nama?: string;
  @IsOptional() @IsString() bekerja?: string;
  @IsOptional() @IsString() no_hp?: string;
}

// ================= Job =================
class JobInternalDto {
  @IsOptional() @IsString() perusahaan?: string;
  @IsOptional() @IsString() divisi?: string;
  @IsOptional() @IsNumber() lama_kerja_tahun?: number;
  @IsOptional() @IsNumber() lama_kerja_bulan?: number;
  @IsOptional() @IsString() golongan?: string;
  @IsOptional() @IsString() nama_atasan?: string;
  @IsOptional() @IsString() nama_hrd?: string;
  @IsOptional() @IsString() absensi?: string;
}

// ================= Loan Application =================
class LoanApplicationInternalDto {
  @IsOptional() @IsString() status_pinjaman?: string;
  @IsOptional() @IsNumber() nominal_pinjaman?: number;
  @IsOptional() @IsNumber() tenor?: number;
  @IsOptional() @IsString() keperluan?: string;
  @IsOptional() @IsString() notes?: string;
}

// ================= Collateral =================
class CollateralInternalDto {
  @IsOptional() @IsString() jaminan_hrd?: string;
  @IsOptional() @IsString() jaminan_cg?: string;
  @IsOptional() @IsString() penjamin?: string;
}

// ================= Relative =================
class RelativeInternalDto {
  @IsOptional() @IsString() kerabat_kerja?: string;
  @IsOptional() @IsString() nama?: string;
  @IsOptional() @IsString() alamat?: string;
  @IsOptional() @IsString() no_hp?: string;
}

// ================= Uploaded Files =================
class UploadedFilesDto {
  @IsOptional() @IsString() foto_ktp?: string;
  @IsOptional() @IsString() foto_kk?: string;
  @IsOptional() @IsString() foto_id_card?: string;
  @IsOptional() @IsString() foto_rekening?: string;
}

export class PayloadDTO {
  @ValidateNested()
  @Type(() => ClientInternalDto)
  client_internal: ClientInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressInternalDto)
  address_internal?: AddressInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FamilyInternalDto)
  family_internal?: FamilyInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => JobInternalDto)
  job_internal?: JobInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LoanApplicationInternalDto)
  loan_application_internal?: LoanApplicationInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CollateralInternalDto)
  collateral_internal?: CollateralInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelativeInternalDto)
  relative_internal?: RelativeInternalDto;
}

export class CreateDraftLoanApplicationDto {
  @ValidateNested()
  @Type(() => PayloadDTO)
  payload: PayloadDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => UploadedFilesDto)
  uploaded_files?: UploadedFilesDto;
}
