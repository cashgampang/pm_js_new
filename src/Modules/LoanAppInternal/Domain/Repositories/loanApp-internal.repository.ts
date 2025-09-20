import { LoanApplicationInternal } from '../Entities/loan-application-internal.entity';

export const LOAN_APPLICATION_INTERNAL_REPOSITORY = Symbol('LOAN_APPLICATION_INTERNAL_REPOSITORY');

export interface ILoanApplicationInternalRepository {
  findById(id: number): Promise<LoanApplicationInternal | null>;
  findByNasabahId(nasabahId: number): Promise<LoanApplicationInternal[]>;
  findAll(): Promise<LoanApplicationInternal[]>;
  save(loan: LoanApplicationInternal): Promise<LoanApplicationInternal>;
  update(
    id: number,
    loan: Partial<LoanApplicationInternal>,
  ): Promise<LoanApplicationInternal>;
  delete(id: number): Promise<void>;
  callSP_MKT_GetAllLoanApplications_Internal(marketingId: number, page: number, pageSize: number): Promise<{data: any[], total: number}>;
}