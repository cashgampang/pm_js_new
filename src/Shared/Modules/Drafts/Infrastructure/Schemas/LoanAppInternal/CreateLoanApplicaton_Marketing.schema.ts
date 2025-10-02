import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// ================= Client =================
@Schema({ _id: false })
class ClientInternal {
  @Prop({ required: true }) nama_lengkap: string;
  @Prop({ required: true }) no_ktp: string;
  @Prop({ required: true }) no_hp: string;
  @Prop({ required: true }) email: string;

  @Prop() foto_ktp?: string;
  @Prop() foto_kk?: string;
  @Prop() foto_id_card?: string;
  @Prop() foto_rekening?: string;
}
export const ClientInternalSchema =
  SchemaFactory.createForClass(ClientInternal);

// ================= Address =================
@Schema({ _id: false })
class AddressInternal {
  @Prop() alamat_ktp?: string;
  @Prop() rt_rw?: string;
  @Prop() kelurahan?: string;
  @Prop() kecamatan?: string;
  @Prop() kota?: string;
  @Prop() provinsi?: string;
}
export const AddressInternalSchema =
  SchemaFactory.createForClass(AddressInternal);

// ================= Family =================
@Schema({ _id: false })
class FamilyInternal {
  @Prop() hubungan?: string;
  @Prop() nama?: string;
  @Prop() bekerja?: string;
  @Prop() no_hp?: string;
}
export const FamilyInternalSchema =
  SchemaFactory.createForClass(FamilyInternal);

// ================= Job =================
@Schema({ _id: false })
class JobInternal {
  @Prop() perusahaan?: string;
  @Prop() divisi?: string;
  @Prop() lama_kerja_tahun?: number;
  @Prop() lama_kerja_bulan?: number;
  @Prop() golongan?: string;
  @Prop() nama_atasan?: string;
  @Prop() nama_hrd?: string;
  @Prop() absensi?: string;
}
export const JobInternalSchema = SchemaFactory.createForClass(JobInternal);

// ================= Loan Application =================
@Schema({ _id: false })
class LoanApplicationInternal {
  @Prop() status_pinjaman?: string;
  @Prop() nominal_pinjaman?: number;
  @Prop() tenor?: number;
  @Prop() keperluan?: string;
  @Prop() notes?: string;
}
export const LoanApplicationInternalSchema = SchemaFactory.createForClass(
  LoanApplicationInternal,
);

// ================= Collateral =================
@Schema({ _id: false })
class CollateralInternal {
  @Prop() jaminan_hrd?: string;
  @Prop() jaminan_cg?: string;
  @Prop() penjamin?: string;
}
export const CollateralInternalSchema =
  SchemaFactory.createForClass(CollateralInternal);

// ================= Relative =================
@Schema({ _id: false })
class RelativeInternal {
  @Prop() kerabat_kerja?: string;
  @Prop() nama?: string;
  @Prop() alamat?: string;
  @Prop() no_hp?: string;
}
export const RelativeInternalSchema =
  SchemaFactory.createForClass(RelativeInternal);

// ================= Root LoanApplication =================
@Schema({ timestamps: true })
export class LoanApplication {
  @Prop({ required: true }) marketing_id: number;

  @Prop({ type: ClientInternalSchema, required: true })
  client_internal: ClientInternal;
  @Prop({ type: AddressInternalSchema }) address_internal?: AddressInternal;
  @Prop({ type: FamilyInternalSchema }) family_internal?: FamilyInternal;
  @Prop({ type: JobInternalSchema }) job_internal?: JobInternal;
  @Prop({ type: LoanApplicationInternalSchema })
  loan_application_internal?: LoanApplicationInternal;
  @Prop({ type: CollateralInternalSchema })
  collateral_internal?: CollateralInternal;
  @Prop({ type: RelativeInternalSchema }) relative_internal?: RelativeInternal;
  @Prop({ type: Object })
  uploaded_files?: Record<string, string[]>;
  @Prop({ default: false }) isDeleted: boolean; // flag soft delete
}

export type LoanApplicationDocument = HydratedDocument<LoanApplication>;
export const LoanApplicationSchema =
  SchemaFactory.createForClass(LoanApplication);
