// // src/infrastructure/controller/client.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { MKT_CreateDraftLoanAppUseCase } from 'src/Marketing-Internal/usecases/MKT_CreateDraftLoanApp.usecase';

// @Controller('marketing/int/loan-application')
// export class MKT_CreateDraftLoanAppController {
//   constructor(private readonly createDraftLoanApp: MKT_CreateDraftLoanAppUseCase) {}

//   @Public() //! Delete on Prod
//   @Post('create/draft')
//   async create(@Body() dto: any) {
//     return await this.createDraftLoanApp.execute(dto);
//   }
// }
