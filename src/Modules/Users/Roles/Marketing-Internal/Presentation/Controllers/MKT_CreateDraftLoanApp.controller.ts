import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDraftLoanApplicationDto } from 'src/Shared/Modules/Drafts/Applications/DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';
import { CurrentUser } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/user.decorator';
import { JwtAuthGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/jwtAuth.guard';
import { RolesGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/roles.guard';
import { MKT_CreateDraftLoanApplicationUseCase } from '../../Applications/Services/MKT_CreateDraftLoanApp.usecase';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('mkt/int/drafts')
export class MKT_CreateDraftLoanApplicationController {
  constructor(
    private readonly MKT_CreateDraftLoanAppUseCase: MKT_CreateDraftLoanApplicationUseCase,
  ) {}

  @Public()
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'foto_ktp', maxCount: 1 },
      { name: 'foto_kk', maxCount: 1 },
      { name: 'foto_rekening', maxCount: 1 },
    ]),
  )
  async createDraft(
    // @CurrentUser('id') marketingId: number,
    @Body() dto: CreateDraftLoanApplicationDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ) {
    console.log('File paths:', files);
    console.log('Payload:', dto.payload);
    const marketingId = 1;
    try {
      if (!Object.values(files).some((arr) => arr && arr.length > 0)) {
        throw new BadRequestException('No files uploaded');
      }

      // parse payload kalau masih string
      const payload =
        typeof dto.payload === 'string' ? JSON.parse(dto.payload) : dto.payload;

      return this.MKT_CreateDraftLoanAppUseCase.executeCreateDraft(
        marketingId,
        payload,
        files,
      );
    } catch (error) {
      console.log('Error occurred:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid request data or files');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while processing your request',
        );
      }
    }
  }

  // @Public()
  @Get()
  async getDraftByMarketingId(@CurrentUser('id') marketingId: number) {
    return this.MKT_CreateDraftLoanAppUseCase.renderDraftByMarketingId(
      marketingId,
    );
  }

  @Delete('delete/:id')
  // async (@CurrentUser('id') Id: number) {
  async softDelete(@Param('id') Id: string) {
    return this.MKT_CreateDraftLoanAppUseCase.deleteDraftByMarketingId(Id);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'foto_ktp', maxCount: 1 },
      { name: 'foto_kk', maxCount: 1 },
      { name: 'foto_rekening', maxCount: 1 },
      { name: 'foto_jaminan', maxCount: 3 },
    ]),
  )
  async updateDraftById(
    @Param('id') Id: string,
    @Body() updateData: Partial<CreateDraftLoanApplicationDto>,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ) {
    return this.MKT_CreateDraftLoanAppUseCase.updateDraftById(
      Id,
      updateData,
      files,
    );
  }
}
