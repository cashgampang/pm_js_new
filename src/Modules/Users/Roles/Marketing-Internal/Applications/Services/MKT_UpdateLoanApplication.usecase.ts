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
          relatives_internal,
        } = dto;

        // 1. Ambil Client
        const customer = await this.clientRepo.findById(clientId);
        if (!customer) throw new BadRequestException('Client tidak ditemukan');
        console.log(customer)
        console.log('oi id oi', customer.id)

        // 2. Upload file kalau ada
        const filePaths = files
          ? await this.fileStorage.saveFiles(
              customer.id!,
              customer.namaLengkap,
              files,
            )
          : {};

        // 3. Partial update field Client
        customer.namaLengkap =
          client_internal?.nama_lengkap ?? customer.namaLengkap;
        customer.noKtp = client_internal?.no_ktp ?? customer.noKtp;
        customer.jenisKelamin =
          client_internal?.jenis_kelamin ?? customer.jenisKelamin;
        customer.tempatLahir =
          client_internal?.tempat_lahir ?? customer.tempatLahir;
        customer.tanggalLahir = client_internal?.tanggal_lahir
          ? new Date(client_internal.tanggal_lahir)
          : customer.tanggalLahir;
        customer.noHp = client_internal?.no_hp ?? customer.noHp;
        customer.statusNikah =
          client_internal?.status_nikah ?? customer.statusNikah;
        customer.email = client_internal?.email ?? customer.email;
        customer.fotoKtp =
          filePaths['foto_ktp']?.[0] ??
          client_internal?.foto_ktp ??
          customer.fotoKtp;
        customer.fotoKk =
          filePaths['foto_kk']?.[0] ??
          client_internal?.foto_kk ??
          customer.fotoKk;
        customer.fotoIdCard =
          filePaths['foto_id_card']?.[0] ??
          client_internal?.foto_id_card ??
          customer.fotoIdCard;
        customer.fotoRekening =
          filePaths['foto_rekening']?.[0] ??
          client_internal?.foto_rekening ??
          customer.fotoRekening;
        customer.updatedAt = now;

        await this.clientRepo.save(customer);

        // 4. Partial update Address
        if (address_internal) {
          await this.addressRepo.update(customer.id!, {
            alamatKtp: address_internal.alamat_ktp,
            kelurahan: address_internal.kelurahan,
            rtRw: address_internal.rt_rw,
            kecamatan: address_internal.kecamatan,
            kota: address_internal.kota,
            provinsi: address_internal.provinsi,
            domisili: address_internal.domisili,
            statusRumahKtp: address_internal.status_rumah_ktp,
            statusRumah: address_internal.status_rumah,
          });
        }

        // 5. Partial update Family
        if (family_internal) {
          await this.familyRepo.update(customer.id!, {
            hubungan: family_internal.hubungan,
            nama: family_internal.nama,
            bekerja: family_internal.bekerja,
            noHp: family_internal.no_hp,
          });
        }

        // 6. Partial update Job
        if (job_internal) {
          await this.jobRepo.update(customer.id!, {
            perusahaan: job_internal.perusahaan,
            divisi: job_internal.divisi,
            lamaKerjaTahun: job_internal.lama_kerja_tahun,
            lamaKerjaBulan: job_internal.lama_kerja_bulan,
            golongan: job_internal.golongan,
            namaAtasan: job_internal.nama_atasan,
            namaHrd: job_internal.nama_hrd,
            absensi: job_internal.absensi,
          });
        }

        // 7. Partial update Loan Application
        if (loan_application_internal) {
          const loanApps = await this.loanAppRepo.findByNasabahId(customer.id!);
          const loanApp = loanApps[0]; // asumsi ada 1 loan application
          if (loanApp) {
            await this.loanAppRepo.update(loanApp.id!, {
              statusPinjaman: loan_application_internal.status_pinjaman,
              nominalPinjaman: loan_application_internal.nominal_pinjaman,
              tenor: loan_application_internal.tenor,
              keperluan: loan_application_internal.keperluan,
              notes: loan_application_internal.notes,
              updatedAt: now,
            });
          }
        }

        // 8. Partial update Collateral
        if (collateral_internal) {
          await this.collateralRepo.update(customer.id!, {
            jaminanHrd: collateral_internal.jaminan_hrd,
            jaminanCg: collateral_internal.jaminan_cg,
            penjamin: collateral_internal.penjamin,
            namaPenjamin: collateral_internal.nama_penjamin,
          });
        }

        // 9. Partial update Relative
        if (relatives_internal) {
          await this.relativeRepo.update(customer.id!, {
            kerabatKerja: relatives_internal.kerabat_kerja,
            nama: relatives_internal.nama,
            alamat: relatives_internal.alamat,
            noHp: relatives_internal.no_hp,
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
