// import { Controller, Get, Query, Req } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { CA_GetAllApprovalHistoryUseCase } from 'src/CreditAnalyst-Internal/usecases/CA_GetApprovalHistory.usecase';

// @Controller('credit-analyst/int/approvals/history')
// export class CA_GetAllApprovalHistoryController {
//   constructor(private readonly getAllApprovalHistory: CA_GetAllApprovalHistoryUseCase) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get()
//   async index(
//     @Req() req,
//     @Query('page') page: number = 1,
//     @Query('pageSize') pageSize: number = 10,
//     @Query('searchQuery') searchQuery = '',
//   ) {
//     return await this.getAllApprovalHistory.execute(
//       Number(page),
//       Number(pageSize),
//       searchQuery,
//     );
//   }
// }
