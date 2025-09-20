import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateDraftLoanApplicationDto } from '../../Applications/DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';
import { CreateDraftLoanApplicationUseCase } from '../../Applications/Services/LoanAppInternal/CreateLoanApplication_Marketing.usecase';
import { Public } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/public.decorator';
import { CurrentUser } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/user.decorator';
import { JwtAuthGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/jwtAuth.guard';
import { RolesGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('loan-app-internal/drafts')
export class CreateDraftLoanApplicationController {
  constructor(
    private readonly createDraftLoanAppUseCase: CreateDraftLoanApplicationUseCase,
  ) {}

  @Post('add')
  async createDraft(
    @CurrentUser('id') marketingId: number,
    @Body() dto: CreateDraftLoanApplicationDto,
  ) {
    return this.createDraftLoanAppUseCase.executeCreateDraft(marketingId, dto);
  }

  // @Public()
  @Get()
  async getDraftByMarketingId(@CurrentUser('id') marketingId: number) {
    return this.createDraftLoanAppUseCase.renderDraftByMarketingId(marketingId);
  }

  @Delete('delete/:id')
  // async (@CurrentUser('id') Id: number) {
  async softDelete(@Param('id') Id: string) {
    return this.createDraftLoanAppUseCase.deleteDraftByMarketingId(Id);
  }

  @Patch('update/:id')
  async updateDraftById(
    @Param('id') Id: string,
    @Body() updateData: Partial<CreateDraftLoanApplicationDto>,
  ) {
    return this.createDraftLoanAppUseCase.updateDraftById(Id, updateData);
  }
}
