// import { Body, Controller, Post, Req } from '@nestjs/common';
// import { SPV_ApproveOrRejectUseCase } from 'src/use-case/Supervisor-Internal/SPV_ApprovedOrReject.usecase';
// import { ApprovalInternalStatus } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
// import { Request } from 'express';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { USERTYPE } from 'src/Modules/Users/Domain/Entities/user.entity';
// import { SPV_RejectOrApproved_UpdateStatusLoanAppByIdService } from 'src/infrastructure/shared/InternalLoanApplications/SPV_RejectOrApproved_UpdateStatusLoanAppById.service';

// @Controller('supervisor/int/loan-application')
// export class SPV_ApprovedOrRejectController {
//   constructor(
//     private readonly approveOrRejectUseCase: SPV_ApproveOrRejectUseCase,
//     private readonly updateStatusLoanAppService: SPV_RejectOrApproved_UpdateStatusLoanAppByIdService,
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
//     const spv_id = Number(req.cookies['spv_id']);

//     await this.approveOrRejectUseCase.execute(
//       body.loan_id,
//       spv_id,
//       USERTYPE.SPV,
//       body.status,
//       body.keterangan,
//     );

//     const action = body.status === ApprovalInternalStatus.APPROVED ? 'approved' : 'rejected';
//     await this.updateStatusLoanAppService.execute(body.loan_id, action);

//     return {
//       message: `Approval berhasil disimpan dengan status ${body.status}`,
//       data: {
//         id: body.loan_id,
//         status: body.status,
//       }
//     }
//   }
// }
