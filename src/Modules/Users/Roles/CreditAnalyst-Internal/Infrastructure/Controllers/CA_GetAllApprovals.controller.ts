// import { Controller, Get, Query, Req } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { CA_GetAllApprovalsUseCase } from 'src/CreditAnalyst-Internal/usecases/CA_GetAllLoanApplication.usecase';

// @Controller('credit-analyst/int/approvals')
// export class CA_GetAllApprovalsController {
//   constructor(private readonly getAllApprovals: CA_GetAllApprovalsUseCase) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get()
//   async index(
//     @Req() req,
//     @Query('page') page: number = 1,
//     @Query('pageSize') pageSize: number = 10,
//     @Query('searchQuery') searchQuery = '',
//   ) {
//     return await this.getAllApprovals.execute(
//       Number(page),
//       Number(pageSize),
//       searchQuery,
//     );
//   }
// }
