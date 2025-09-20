import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY, ILoanApplicationDraftRepository } from 'src/Shared/Modules/Drafts/Domain/Repositories/LoanAppInt.repository';
import { CreateDraftLoanApplicationDto } from 'src/Shared/Modules/Drafts/Applications/DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';

@Injectable()
export class MKT_CreateDraftLoanApplicationUseCase {
  constructor(
    @Inject(CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY)
    private readonly loanAppDraftRepo: ILoanApplicationDraftRepository,
  ) {}

  async executeCreateDraft(marketingId: number, dto: CreateDraftLoanApplicationDto) {
    try {
      const loanApp = await this.loanAppDraftRepo.create({
        marketing_id: marketingId,
        client_internal: dto.client_internal,
        address_internal: dto.address_internal,
        family_internal: dto.family_internal,
        job_internal: dto.job_internal,
        loan_application_internal: dto.loan_application_internal,
        collateral_internal: dto.collateral_internal,
        relative_internal: dto.relative_internal,
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
}