// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { ClientInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/client-internal.orm-entity';
// import {
//   ApprovalInternal,
// } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
// import { USERTYPE } from 'src/Modules/Users/Domain/Entities/user.entity';

// @Injectable()
// export class SPV_GetLoanApplicationByIdUseCase {
//   constructor(private readonly dataSource: DataSource) {}

//   async execute(id: number) {
//     const customerRepo = this.dataSource.getRepository(ClientInternal);
//     const approvalRepo = this.dataSource.getRepository(ApprovalInternal);

//     const customer = await customerRepo.findOne({
//       where: { id },
//       relations: [
//         'addressInternal',
//         'familyInternal',
//         'jobInternal',
//         'applicationInfoInternal',
//         'relativeInternal',
//         'collateralInternal',
//       ],
//     });

//     if (!customer) {
//       throw new NotFoundException('Data pengajuan tidak ditemukan');
//     }

//     // cari semua approval yg terkait loan_id ini
//     const approvals = await approvalRepo.findOne({
//       where: { pengajuan: { id }, role: USERTYPE.SPV },
//       relations: ['user'], // kalau mau include user info
//     });

//     const mapFile = (filePath?: string | null) =>
//       filePath
//         ? `http://localhost:3000/${filePath.replace(/\\/g, '/')}`
//         : undefined;

//     const address = customer.addressInternal?.[0] ?? {};
//     const family = customer.familyInternal?.[0] ?? {};
//     const job = customer.jobInternal?.[0] ?? {};
//     const loan = customer.applicationInfoInternal?.[0] ?? {};
//     const collateral = customer.collateralInternal?.[0] ?? {};
//     const relative = customer.relativeInternal?.[0] ?? {};

//     return {
//       // === DATA PENGAJUAN ===
//       nama_lengkap: customer.nama_lengkap,
//       no_ktp: customer.no_ktp,
//       jenis_kelamin: customer.jenis_kelamin,
//       tempat_lahir: customer.tempat_lahir,
//       tanggal_lahir: customer.tanggal_lahir,
//       status_nikah: customer.status_nikah,
//       no_hp: customer.no_hp,
//       email: customer.email,
//       foto_ktp: mapFile(customer.foto_ktp),
//       foto_kk: mapFile(customer.foto_kk),

//       alamat_ktp: address.alamat_ktp,
//       kelurahan: address.kelurahan,
//       rt_rw: address.rt_rw,
//       kecamatan: address.kecamatan,
//       kota: address.kota,
//       provinsi: address.provinsi,
//       status_rumah_ktp: address.status_rumah_ktp,
//       domisili: address.domisili,
//       alamat_lengkap: address.alamat_lengkap,
//       status_rumah: address.status_rumah,

//       hubungan: family.hubungan,
//       nama_keluarga: family.nama,
//       bekerja: family.bekerja,
//       nama_perusahaan: family.nama_perusahaan,
//       jabatan: family.jabatan,
//       penghasilan: family.penghasilan,
//       alamat_kerja: family.alamat_kerja,
//       no_hp_keluarga: family.no_hp,
//       kerabat_kerja: relative.kerabat_kerja,
//       nama_kerabat: relative.nama,
//       alamat_kerabat: relative.alamat,
//       no_hp_kerabat: relative.no_hp,
//       status_hubungan_kerabat: relative.status_hubungan,
//       nama_perusahaan_kerabat: relative.nama_perusahaan,

//       perusahaan: job.perusahaan,
//       divisi: job.divisi,
//       lama_kerja_tahun: job.lama_kerja_tahun,
//       lama_kerja_bulan: job.lama_kerja_bulan,
//       golongan: job.golongan,
//       yayasan: job.yayasan,
//       nama_atasan: job.nama_atasan,
//       nama_hrd: job.nama_hrd,
//       absensi: job.absensi,
//       foto_id_card: mapFile(customer.foto_id_card),
//       bukti_absensi: job.bukti_absensi,

//       status_pinjaman: loan.status_pinjaman,
//       nominal_pinjaman: loan.nominal_pinjaman,
//       tenor: loan.tenor,
//       keperluan: loan.keperluan,
//       pinjaman_ke: loan.pinjaman_ke,
//       riwayat_nominal: loan.riwayat_nominal,
//       riwayat_tenor: loan.riwayat_tenor,
//       sisa_pinjaman: loan.sisa_pinjaman,
//       foto_rekening: mapFile(customer.foto_rekening),
//       no_rekening: customer.no_rekening,

//       jaminan_hrd: collateral.jaminan_hrd,
//       jaminan_cg: collateral.jaminan_cg,
//       penjamin: collateral.penjamin,
//       nama_penjamin: collateral.nama_penjamin,
//       bagian: collateral.bagian,
//       lama_kerja_penjamin: collateral.lama_kerja_penjamin,
//       absensi_penjamin: collateral.absensi,
//       foto_id_card_penjamin: collateral.foto_id_card_penjamin,
//       foto_ktp_penjamin: collateral.foto_ktp_penjamin,
//       riwayat_pinjam_penjamin: collateral.riwayat_pinjam_penjamin,
//       riwayat_nominal_penjamin: collateral.riwayat_nominal_penjamin,
//       riwayat_tenor_penjamin: collateral.riwayat_tenor_penjamin,
//       sisa_pinjaman_penjamin: collateral.sisa_pinjaman_penjamin,
//       jaminan_cg_penjamin: collateral.jaminan_cg_penjamin,
//       status_hubungan_penjamin: collateral.status_hubungan_penjamin,
//       notes: loan.notes,

//       // === APPROVALS ===
//       approval: approvals
//         ? {
//             id: approvals.id,
//             status: approvals.status,
//             keterangan: approvals.keterangan,
//             created_at: approvals.created_at,
//             updated_at: approvals.updated_at,
//             supervisor: approvals.user
//               ? {
//                   id: approvals.user.id,
//                   name: approvals.user.nama,
//                 }
//               : null,
//           }
//         : null,
//     };
//   }
// }
