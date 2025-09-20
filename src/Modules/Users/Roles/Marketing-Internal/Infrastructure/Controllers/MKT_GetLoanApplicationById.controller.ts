// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { MKT_GetLoanApplicationByIdUseCase } from 'src/Marketing-Internal/usecases/MKT_GetLoanApplicationById.usecase';

// @Controller('marketing/int/loan-application')
// export class MKT_GetLoanApplicationByIdController {
//   constructor(private readonly getLoanAppById: MKT_GetLoanApplicationByIdUseCase) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get(':id')
//   async getById(@Param('id', ParseIntPipe) id: number) {
//     return await this.getLoanAppById.execute(id);
//   }
// }
