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
import { CreateDraftLoanApplicationDto } from 'src/Shared/Modules/Drafts/Applications/DTOS/LoanAppInt_MarketingInput/CreateDraft_LoanAppInt.dto';
import { CurrentUser } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/user.decorator';
import { JwtAuthGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/jwtAuth.guard';
import { RolesGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/roles.guard';
import { MKT_CreateDraftLoanApplicationUseCase } from '../../Applications/Services/MKT_CreateDraftLoanApp.usecase';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('mkt/int/drafts')
export class MKT_CreateDraftLoanApplicationController {
  constructor(
    private readonly MKT_CreateDraftLoanAppUseCase: MKT_CreateDraftLoanApplicationUseCase,
  ) {}

  @Post('add')
  async createDraft(
    @CurrentUser('id') marketingId: number,
    @Body() dto: CreateDraftLoanApplicationDto,
  ) {
    return this.MKT_CreateDraftLoanAppUseCase.executeCreateDraft(marketingId, dto);
  }

  // @Public()
  @Get()
  async getDraftByMarketingId(@CurrentUser('id') marketingId: number) {
    return this.MKT_CreateDraftLoanAppUseCase.renderDraftByMarketingId(marketingId);
  }

  @Delete('delete/:id')
  // async (@CurrentUser('id') Id: number) {
  async softDelete(@Param('id') Id: string) {
    return this.MKT_CreateDraftLoanAppUseCase.deleteDraftByMarketingId(Id);
  }

  @Patch('update/:id')
  async updateDraftById(
    @Param('id') Id: string,
    @Body() updateData: Partial<CreateDraftLoanApplicationDto>,
  ) {
    return this.MKT_CreateDraftLoanAppUseCase.updateDraftById(Id, updateData);
  }
}
