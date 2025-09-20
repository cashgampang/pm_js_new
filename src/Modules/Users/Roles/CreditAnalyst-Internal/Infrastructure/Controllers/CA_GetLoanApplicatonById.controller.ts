// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { CA_GetLoanApplicationByIdUseCase } from 'src/CreditAnalyst-Internal/usecases/CA_GetLoanApplicationById.usecase';

// @Controller('credit-analyst/int/loan-application')
// export class CA_GetLoanApplicationByIdController {
//   constructor(private readonly getLoanAppById: CA_GetLoanApplicationByIdUseCase) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get(':id')
//   async getById(@Param('id', ParseIntPipe) id: number) {
//     return await this.getLoanAppById.execute(id);
//   }
// }
