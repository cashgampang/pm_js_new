// import { Body, Controller, Post, Req } from '@nestjs/common';
// import { CA_ApproveOrRejectUseCase } from 'src/CreditAnalyst-Internal/usecases/CA_ApprovedOrReject.usecase';
// import {
//   ApprovalInternalStatus,
// } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
// import { Request } from 'express';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { USERTYPE } from 'src/Modules/Users/Domain/Entities/user.entity';

// @Controller('credit-analyst/int/loan-application')
// export class CA_ApprovedOrRejectController {
//   constructor(
//     private readonly approveOrRejectUseCase: CA_ApproveOrRejectUseCase,
//   ) {}

//   @Public()
//   @Post('approve-or-reject')
//   async approveOrReject(
//     @Req() req: Request,
//     @Body()
//     body: {
//       loan_id: number;
//       role: USERTYPE;
//       status: ApprovalInternalStatus;
//       keterangan?: string;
//     },
//   ) {
//     const ca_id = Number(req.cookies['ca_id']);
//     return await this.approveOrRejectUseCase.execute(
//       body.loan_id,
//       ca_id,
//       USERTYPE.CA,
//       body.status,
//       body.keterangan,
//     );
//   }
// }
