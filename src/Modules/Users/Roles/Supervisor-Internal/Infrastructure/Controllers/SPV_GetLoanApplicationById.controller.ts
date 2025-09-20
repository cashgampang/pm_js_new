// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { SPV_GetLoanApplicationByIdUseCase } from 'src/use-case/Supervisor-Internal/SPV_GetLoanApplicationById.usecase';

// @Controller('supervisor/int/loan-application/detail')
// export class SPV_GetLoanApplicationByIdController {
//   constructor(private readonly getLoanAppById: SPV_GetLoanApplicationByIdUseCase) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get(':id')
//   async getById(@Param('id', ParseIntPipe) id: number) {
//     return await this.getLoanAppById.execute(id);
//   }
// }
