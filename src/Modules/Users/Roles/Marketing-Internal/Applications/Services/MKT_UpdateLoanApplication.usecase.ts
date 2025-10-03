import { Injectable, BadRequestException, Inject } from '@nestjs/common';

// Repository Interfaces
import {
  IClientInternalRepository,
  CLIENT_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/client-internal.repository';
import {
  IAddressInternalRepository,
  ADDRESS_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/address-internal.repository';
import {
  IFamilyInternalRepository,
  FAMILY_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/family-internal.repository';
import {
  IJobInternalRepository,
  JOB_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/job-internal.repository';
import {
  ILoanApplicationInternalRepository,
  LOAN_APPLICATION_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/loanApp-internal.repository';
import {
  ICollateralInternalRepository,
  COLLATERAL_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/collateral-internal.repository';

import {
  IRelativesInternalRepository,
  RELATIVE_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/relatives-internal.repository';

// File Storage abstraction
import {
  IFileStorageService,
  FILE_STORAGE_SERVICE,
} from 'src/Shared/Modules/Storage/Domain/Services/IFileStorage.service';

// Unit of Work abstraction
import {
  IUnitOfWork,
  UNIT_OF_WORK,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/IUnitOfWork.repository';

@Injectable()
export class MKT_UpdateLoanApplicationUseCase {
  constructor(
    @Inject(CLIENT_INTERNAL_REPOSITORY)
    private readonly clientRepo: IClientInternalRepository,
    @Inject(ADDRESS_INTERNAL_REPOSITORY)
    private readonly addressRepo: IAddressInternalRepository,
    @Inject(FAMILY_INTERNAL_REPOSITORY)
    private readonly familyRepo: IFamilyInternalRepository,
    @Inject(JOB_INTERNAL_REPOSITORY)
    private readonly jobRepo: IJobInternalRepository,
    @Inject(LOAN_APPLICATION_INTERNAL_REPOSITORY)
    private readonly loanAppRepo: ILoanApplicationInternalRepository,
    @Inject(COLLATERAL_INTERNAL_REPOSITORY)
    private readonly collateralRepo: ICollateralInternalRepository,
    @Inject(RELATIVE_INTERNAL_REPOSITORY)
    private readonly relativeRepo: IRelativesInternalRepository,
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorage: IFileStorageService,

    @Inject(UNIT_OF_WORK)
    private readonly uow: IUnitOfWork,
  ) {}

  async execute(dto: any, files: any, clientId: number) {
    const now = new Date();
    try {
      return await this.uow.start(async () => {
        const {
          client_internal,
          address_internal,
          family_internal,
          job_internal,
          loan_application_internal,
          collateral_internal,
          relative_internal,
        } = dto;
          
        // 1. Ambil Client
        const customer = await this.clientRepo.findById(clientId);
        console.log("ini customer ngtntot:", customer)
        if (!customer) throw new BadRequestException('Client tidak ditemukan');
        console.log('I know there things i should know >>>>>',customer);

        // 2. Upload file kalau ada
        const filePaths = files
          ? await this.fileStorage.saveFiles(
              customer.id!,
              customer.nama_lengkap,
              files,
            )
          : {};

        // 3. Partial update field Client
        customer.nama_lengkap =
          client_internal?.nama_lengkap ?? customer.nama_lengkap;
        customer.no_ktp = client_internal?.no_ktp ?? customer.no_ktp;
        customer.jenis_kelamin =
          client_internal?.jenis_kelamin ?? customer.jenis_kelamin;
        customer.tempat_lahir =
          client_internal?.tempat_lahir ?? customer.tempat_lahir;
        customer.tanggal_lahir = client_internal?.tanggal_lahir
          ? new Date(client_internal.tanggal_lahir)
          : customer.tanggal_lahir;
        customer.no_hp = client_internal?.no_hp ?? customer.no_hp;
        customer.status_nikah =
          client_internal?.status_nikah ?? customer.status_nikah;
        customer.email = client_internal?.email ?? customer.email;
        customer.foto_ktp =
          filePaths['foto_ktp']?.[0] ??
          client_internal?.foto_ktp ??
          customer.foto_ktp;
        customer.foto_kk =
          filePaths['foto_kk']?.[0] ??
          client_internal?.foto_kk ??
          customer.foto_kk;
        customer.foto_id_card =
          filePaths['foto_id_card']?.[0] ??
          client_internal?.foto_id_card ??
          customer.foto_id_card;
        customer.foto_rekening =
          filePaths['foto_rekening']?.[0] ??
          client_internal?.foto_rekening ??
          customer.foto_rekening;
        customer.updated_at = now;

        await this.clientRepo.save(customer);

        // 4. Partial update Address
        if (address_internal) {
          await this.addressRepo.update(customer.id!, {
            alamat_ktp: address_internal.alamat_ktp,
            kelurahan: address_internal.kelurahan,
            rt_rw: address_internal.rt_rw,
            kecamatan: address_internal.kecamatan,
            kota: address_internal.kota,
            provinsi: address_internal.provinsi,
            domisili: address_internal.domisili,
            status_rumah_ktp: address_internal.status_rumah_ktp,
            status_rumah: address_internal.status_rumah,
            alamat_lengkap: address_internal.alamat_lengkap,
            updated_at: now,
          });
        }

        // 5. Partial update Family
        if (family_internal) {
          await this.familyRepo.update(customer.id!, {
            hubungan: family_internal.hubungan,
            nama: family_internal.nama,
            bekerja: family_internal.bekerja,
            nama_perusahaan: family_internal.nama_perusahaan,
            jabatan: family_internal.jabatan,
            penghasilan: family_internal.penghasilan,
            alamat_kerja: family_internal.alamat_kerja,
            no_hp: family_internal.no_hp,
            updated_at: now,
          });
        }

        // 6. Partial update Job
        if (job_internal) {
          await this.jobRepo.update(customer.id!, {
            perusahaan: job_internal.perusahaan,
            divisi: job_internal.divisi,
            lama_kerja_tahun: job_internal.lama_kerja_tahun,
            lama_kerja_bulan: job_internal.lama_kerja_bulan,
            golongan: job_internal.golongan,
            yayasan: job_internal.yayasan,
            nama_atasan: job_internal.nama_atasan,
            nama_hrd: job_internal.nama_hrd,
            absensi: job_internal.absensi,
            bukti_absensi: job_internal.bukti_absensi,
            updated_at: now,
          });
        } 

        // 7. Partial update Loan Application
        if (loan_application_internal) {
          const loanApps = await this.loanAppRepo.findByNasabahId(customer.id!);
          const loanApp = loanApps[0]; // asumsi ada 1 loan application
          if (loanApp) {
            await this.loanAppRepo.update(loanApp.id!, {
              status_pinjaman: loan_application_internal.status_pinjaman,
              pinjaman_ke: loan_application_internal.pinjaman_ke,
              nominal_pinjaman: loan_application_internal.nominal_pinjaman,
              tenor: loan_application_internal.tenor,
              keperluan: loan_application_internal.keperluan,
              status: loan_application_internal.status,
              riwayat_nominal: loan_application_internal.riwayat_nominal,
              sisa_pinjaman: loan_application_internal.sisa_pinjaman,
              notes: loan_application_internal.notes,
              is_banding: loan_application_internal.is_banding,
              alasan_banding: loan_application_internal.alasan_banding,
              updated_at: now,
            });
          }
        }

        // 8. Partial update Collateral
        if (collateral_internal) {
          await this.collateralRepo.update(customer.id!, {
            jaminan_hrd: collateral_internal.jaminan_hrd,
            jaminan_cg: collateral_internal.jaminan_cg,
            penjamin: collateral_internal.penjamin,
            nama_penjamin: collateral_internal.nama_penjamin,
            lama_kerja_penjamin: collateral_internal.lama_kerja_penjamin,
            bagian: collateral_internal.bagian,
            absensi: collateral_internal.absensi,
            riwayat_pinjam_penjamin: collateral_internal.riwayat_pinjam_penjamin,
            riwayat_nominal_penjamin:
              collateral_internal.riwayat_nominal_penjamin,
            riwayat_tenor_penjamin: collateral_internal.riwayat_tenor_penjamin,
            sisa_pinjaman_penjamin: collateral_internal.sisa_pinjaman_penjamin,
            jaminan_cg_penjamin: collateral_internal.jaminan_cg_penjamin,
            status_hubungan_penjamin:
              collateral_internal.status_hubungan_penjamin,
            updated_at: now,
          });
        }

        // 9. Partial update Relative
        if (relative_internal) {
          await this.relativeRepo.update(customer.id!, {
            kerabat_kerja: relative_internal.kerabat_kerja,
            nama: relative_internal.nama,
            alamat: relative_internal.alamat,
            no_hp: relative_internal.no_hp,
            status_hubungan: relative_internal.status_hubungan,
            nama_perusahaan: relative_internal.nama_perusahaan,
            updated_at: now,
          });
        }

        return {
          payload: {
            error: false,
            message: 'Pengajuan berhasil diupdate',
            reference: 'LOAN_UPDATE_OK',
            data: { filePaths },
          },
        };
      });
    } catch (err) {
      console.log('err', err);
      throw new BadRequestException(err.message || 'Gagal update pengajuan');
    }
  }
}
