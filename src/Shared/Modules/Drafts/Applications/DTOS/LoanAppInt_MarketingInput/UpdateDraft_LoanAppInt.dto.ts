import { PartialType } from '@nestjs/mapped-types';
import { CreateDraftLoanApplicationDto } from './CreateDraft_LoanAppInt.dto';

export class UpdateDraftLoanApplicationDto extends PartialType(CreateDraftLoanApplicationDto) {}