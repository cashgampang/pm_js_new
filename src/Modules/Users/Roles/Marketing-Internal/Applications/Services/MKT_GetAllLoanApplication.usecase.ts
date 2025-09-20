// src/Modules/LoanAppInternal/Application/mkt-get-all-loan-application.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import {
  ILoanApplicationInternalRepository,
  LOAN_APPLICATION_INTERNAL_REPOSITORY,
} from 'src/Modules/LoanAppInternal/Domain/Repositories/loanApp-internal.repository';

@Injectable()
export class MKT_GetAllLoanApplicationUseCase {
  constructor(
    @Inject(LOAN_APPLICATION_INTERNAL_REPOSITORY)
    private readonly loanAppRepo: ILoanApplicationInternalRepository,
  ) {}

  async execute(
    marketingId: number,
    page = 1,
    pageSize = 10,
    searchQuery = '',
  ) {
    try {
      const { data, total } = await this.loanAppRepo.callSP_MKT_GetAllLoanApplications_Internal(
        marketingId,
        page,
        pageSize,
      );

      // Jika ada searchQuery, filter hasilnya
      const filteredData = searchQuery
        ? data.filter((item) =>
            item.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : data;

      return { data: filteredData, total }; // Total tetep pake nilai asli dari SP
    } catch (err) {
      throw new Error(err.message || 'Gagal mengambil data pengajuan');
    }
  }
}