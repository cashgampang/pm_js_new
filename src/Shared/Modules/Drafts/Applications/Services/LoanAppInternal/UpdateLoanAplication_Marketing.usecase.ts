import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import {
  CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY,
  ILoanApplicationDraftRepository,
} from '../../../Domain/Repositories/LoanAppInt.repository';

import { UpdateDraftLoanApplicationDto } from '../../DTOS/LoanAppInt_MarketingInput/UpdateDraft_LoanAppInt.dto';
import { LoanApplicationEntity } from '../../../Domain/Entities/LoanAppInt.entity';

@Injectable()
export class CreateDraftLoanApplicationUseCase {
  constructor(
    @Inject(CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY)
    private readonly loanAppDraftRepo: ILoanApplicationDraftRepository,
  ) {}

  // ... existing methods (executeCreateDraft, renderDraftByMarketingId, deleteDraftByMarketingId)

  /**
   * 🔧 Update draft berdasarkan ID
   * Mengizinkan partial update (tidak perlu semua field dikirim)
   */
  async updateDraftById(Id: string, dto: UpdateDraftLoanApplicationDto) {
    try {
      if (!dto || !dto.payload) {
        throw new HttpException(
          {
            error: true,
            message: 'Payload tidak ditemukan pada permintaan update',
            reference: 'LOAN_INVALID_PAYLOAD',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = dto.payload;

      // Susun data yang ingin diupdate
      const entityUpdate: Partial<LoanApplicationEntity> = {
        client_internal: payload.client_internal ?? undefined,
        address_internal: payload.address_internal ?? undefined,
        family_internal: payload.family_internal ?? undefined,
        job_internal: payload.job_internal ?? undefined,
        loan_application_internal: payload.loan_application_internal ?? undefined,
        collateral_internal: payload.collateral_internal ?? undefined,
        relative_internal: payload.relative_internal ?? undefined,
        uploaded_files: dto.uploaded_files ?? undefined,
      };

      // Hapus undefined agar tidak menimpa field yang tidak dikirim
      Object.keys(entityUpdate).forEach(
        (key) =>
          entityUpdate[key as keyof LoanApplicationEntity] === undefined &&
          delete entityUpdate[key as keyof LoanApplicationEntity],
      );

      const updated = await this.loanAppDraftRepo.updateDraftById(
        Id,
        entityUpdate,
      );

      if (!updated) {
        throw new HttpException(
          {
            error: true,
            message: 'Draft tidak ditemukan atau gagal diperbarui',
            reference: 'LOAN_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        error: false,
        message: 'Draft loan application berhasil diperbarui',
        reference: 'LOAN_UPDATE_OK',
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        {
          error: true,
          message: error.message || 'Terjadi kesalahan saat update draft',
          reference: 'LOAN_UPDATE_ERROR',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
