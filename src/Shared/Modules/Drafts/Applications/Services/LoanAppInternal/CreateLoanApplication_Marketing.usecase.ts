import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import {
  CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY,
  ILoanApplicationDraftRepository,
} from '../../../Domain/Repositories/LoanAppInt.repository';
import { CreateDraftLoanApplicationDto } from '../../DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';
import { LoanApplicationEntity } from '../../../Domain/Entities/LoanAppInt.entity';
import { UpdateDraftLoanApplicationDto } from '../../DTOS/LoanAppInt_MarketingInput/UpdateDraft_LoanAppInt.dto';


@Injectable()
export class CreateDraftLoanApplicationUseCase {
  constructor(
    @Inject(CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY)
    private readonly loanAppDraftRepo: ILoanApplicationDraftRepository,
  ) {}

  async executeCreateDraft(
    marketingId: number,
    dto: CreateDraftLoanApplicationDto,
  ) {
    try {
      console.log(dto)
      const loanApp = await this.loanAppDraftRepo.create({
        marketing_id: marketingId,
        client_internal: dto.payload.client_internal,
        address_internal: dto.payload.address_internal,
        family_internal: dto.payload.family_internal,
        job_internal: dto.payload.job_internal,
        loan_application_internal: dto.payload.loan_application_internal,
        collateral_internal: dto.payload.collateral_internal,
        relative_internal: dto.payload.relative_internal,
        uploaded_files: dto.uploaded_files,
      });

      return {
        error: false,
        message: 'Draft loan application created',
        reference: 'LOAN_CREATE_OK',
        data: loanApp,
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new HttpException(
          {
            error: true,
            message: Object.values(err.errors)
              .map((e: any) => e.message)
              .join(', '),
            reference: 'LOAN_VALIDATION_ERROR',
          },
          HttpStatus.BAD_REQUEST, // ⬅️ 400 bukan 201
        );
      }

      if (err.code === 11000) {
        throw new HttpException(
          {
            error: true,
            message: `Duplicate field: ${Object.keys(err.keyValue).join(', ')}`,
            reference: 'LOAN_DUPLICATE_KEY',
          },
          HttpStatus.CONFLICT, // ⬅️ 409 untuk duplicate
        );
      }

      throw new HttpException(
        {
          error: true,
          message: err.message || 'Unexpected error',
          reference: 'LOAN_UNKNOWN_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async renderDraftByMarketingId(marketingId: number) {
    try {
      const loanApps =
        await this.loanAppDraftRepo.findByMarketingId(marketingId);
      if (loanApps.length === 0) {
        return {
          error: true,
          message: 'No draft loan applications found for this marketing ID',
          reference: 'LOAN_NOT_FOUND',
          data: [],
        };
      }
      return {
        error: false,
        message: 'Draft loan applications retrieved',
        reference: 'LOAN_RETRIEVE_OK',
        data: loanApps,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message || 'Unexpected error',
        reference: 'LOAN_UNKNOWN_ERROR',
      };
    }
  }

  async deleteDraftByMarketingId(Id: string) {
    try {
      await this.loanAppDraftRepo.softDelete(Id);
      return {
        error: false,
        message: 'Draft loan applications deleted',
        reference: 'LOAN_DELETE_OK',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message || 'Unexpected error',
        reference: 'LOAN_UNKNOWN_ERROR',
      };
    }
  }

async updateDraftById(
  id: string,
  updateData: any, // langsung body, gak usah DTO dengan payload
) {
  console.log('🟢 [updateDraftById] START');
  console.log('➡️ Incoming ID:', id);
  console.log('➡️ Incoming Body:', JSON.stringify(updateData, null, 2));

  // Ambil draft lama dulu
  const existing = await this.loanAppDraftRepo.findDraftById(id);
  if (!existing) throw new Error('❌ Draft not found');

  console.log('🔍 Existing Draft:', JSON.stringify(existing, null, 2));

  // Gabungkan data lama dengan data baru
interface DraftEntity {
  uploaded_files?: Record<string, any>;
  [key: string]: any;
}

const entityUpdate: DraftEntity = {
  ...(existing as DraftEntity),
  ...(updateData as DraftEntity),
  uploaded_files: {
    ...((existing as DraftEntity).uploaded_files ?? {}),
    ...((updateData as DraftEntity).uploaded_files ?? {}),
  },
};


  console.log('🧩 Final entityUpdate to save:', JSON.stringify(entityUpdate, null, 2));

  // Update langsung ke ORM
  const updated = await this.loanAppDraftRepo.updateDraftById(id, entityUpdate);

  console.log('✅ Repository returned:', JSON.stringify(updated, null, 2));

  return {
    error: false,
    message: 'Draft loan application updated successfully',
    data: updated,
  };
}



}
