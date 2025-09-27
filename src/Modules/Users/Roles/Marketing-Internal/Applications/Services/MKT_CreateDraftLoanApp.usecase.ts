import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import {
  CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY,
  ILoanApplicationDraftRepository,
} from 'src/Shared/Modules/Drafts/Domain/Repositories/LoanAppInt.repository';
import { CreateDraftLoanApplicationDto } from 'src/Shared/Modules/Drafts/Applications/DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';
import { LoanApplicationEntity } from 'src/Shared/Modules/Drafts/Domain/Entities/LoanAppInt.entity';
import {
  FILE_STORAGE_SERVICE,
  IFileStorageService,
} from 'src/Shared/Modules/Storage/Domain/Services/IFileStorage.service';

@Injectable()
export class MKT_CreateDraftLoanApplicationUseCase {
  constructor(
    @Inject(CREATE_DRAFT_LOAN_APPLICATION_REPOSITORY)
    private readonly loanAppDraftRepo: ILoanApplicationDraftRepository,

    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorage: IFileStorageService,
  ) {}

  async executeCreateDraft(
    marketingId: number,
    dto: CreateDraftLoanApplicationDto,
    files?: Record<string, Express.Multer.File[]>,
  ) {

    try {
      let filePaths: Record<string, string[]> = {};

      if (files && Object.keys(files).length > 0) {
        filePaths = await this.fileStorage.saveDraftsFile(
          marketingId,
          dto.payload.client_internal?.nama_lengkap ?? `draft-${marketingId}`,
          files,
        );
      }

      console.log('File paths:', filePaths);
      console.log('Payload:', dto.payload);

      const loanApp = await this.loanAppDraftRepo.create({
        marketing_id: marketingId,
        client_internal: dto.payload.client_internal,
        address_internal: dto.payload.address_internal,
        family_internal: dto.payload.family_internal,
        job_internal: dto.payload.job_internal,
        loan_application_internal: dto.payload.loan_application_internal,
        collateral_internal: dto.payload.collateral_internal,
        relative_internal: dto.payload.relative_internal,
        uploaded_files: filePaths,
      });

      return {
        payload: {
          error: false,
          message: 'Draft loan application created',
          reference: 'LOAN_CREATE_OK',
          data: loanApp,
        },
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new HttpException(
          {
            payload: {
              error: 'BAD REQUEST',
              message: Object.values(err.errors)
                .map((e: any) => e.message)
                .join(', '),
              reference: 'LOAN_VALIDATION_ERROR',
            },
          },
          HttpStatus.BAD_REQUEST, // ⬅️ 400 bukan 201
        );
      }

      if (err.code === 11000) {
        throw new HttpException(
          {
            error: 'DUPLICATE KEY',
            message: `Duplicate field: ${Object.keys(err.keyValue).join(', ')}`,
            reference: 'LOAN_DUPLICATE_KEY',
          },
          HttpStatus.CONFLICT, // ⬅️ 409 untuk duplicate
        );
      }

      throw new HttpException(
        {
          payload: {
            error: 'UNEXPECTED ERROR',
            message: 'Unexpected error',
            reference: 'LOAN_UNKNOWN_ERROR',
          },
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
        throw new HttpException(
          {
            payload: {
              error: true,
              message: 'No draft loan applications found for this marketing ID',
              reference: 'LOAN_NOT_FOUND',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        payload: {
          error: false,
          message: 'Draft loan applications retrieved',
          reference: 'LOAN_RETRIEVE_OK',
          data: [...loanApps],
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          payload: {
            error: 'Unexpected error',
            message: 'Unexpected error',
            reference: 'LOAN_UNKNOWN_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteDraftByMarketingId(Id: string) {
    try {
      await this.loanAppDraftRepo.softDelete(Id);
      throw new HttpException(
        {
          payload: {
            error: false,
            message: 'Draft loan applications deleted',
            reference: 'LOAN_DELETE_OK',
            data: [],
          },
        },
        HttpStatus.NO_CONTENT,
      );
    } catch (error) {
      throw new HttpException(
        {
          payload: {
            error: 'Unexpected error',
            message: 'Unexpected error',
            reference: 'LOAN_UNKNOWN_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateDraftById(
    Id: string,
    updateData: Partial<CreateDraftLoanApplicationDto>,
    files?: Record<string, Express.Multer.File[]>,
  ) {
    const { payload } = updateData;
    let filePaths: Record<string, string[]> = {};

    if (files && Object.keys(files).length > 0) {
      filePaths = await this.fileStorage.saveDraftsFile(
        Number(payload?.client_internal?.no_ktp) ?? Id,
        payload?.client_internal?.nama_lengkap ?? `draft-${Id}`,
        files,
      );
    }
    const entityUpdate: Partial<LoanApplicationEntity> = {
      ...payload, //spread it
      ...(Object.keys(filePaths).length > 0 && { uploaded_files: filePaths }),
    };

    try {
      const loanApp = await this.loanAppDraftRepo.updateDraftById(
        Id,
        entityUpdate,
      );
      throw new HttpException(
        {
          payload: {
            error: false,
            message: 'Draft loan applications updated',
            reference: 'LOAN_UPDATE_OK',
            data: loanApp,
          },
        },
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        {
          payload: {
            error: 'Unexpected error',
            message: error.message || 'Unexpected error',
            reference: 'LOAN_UNKNOWN_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
