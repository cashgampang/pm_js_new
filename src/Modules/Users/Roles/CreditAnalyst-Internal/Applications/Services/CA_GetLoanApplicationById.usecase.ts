// import { Injectable, NotFoundException } from '@nestjs/common';
// import { GetLoanApplicationDetailById_Service } from 'src/infrastructure/shared/InternalLoanApplications/GetLoanApplicationById.service';
// import { DataSource, In } from 'typeorm';
// import { ApprovalInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
// import { USERTYPE } from 'src/Shared/Enums/Users/Users.enum';

// function mapApprovalByRole(
//   approvals: ApprovalInternal[] | null | undefined,
//   role: USERTYPE,
// ) {
//   const approval = approvals?.find((a) => a.role === role);
//   if (!approval) return null;

//   return {
//     id_user: approval.user.id,
//     name: approval.user.nama,
//     data: approval.user
//       ? {
//           id_approval: approval.id,
//           status: approval.status,
//           keterangan: approval.keterangan,
//           created_at: approval.created_at,
//           updated_at: approval.updated_at,
//         }
//       : null,
//   };
// }

// @Injectable()
// export class CA_GetLoanApplicationByIdUseCase {
//   constructor(
//     private readonly sharedLoanDetail: GetLoanApplicationDetailById_Service,
//     private readonly dataSource: DataSource,
//   ) {}

//   async execute(id: number) {
//     const loanResult = await this.sharedLoanDetail.execute(id);

//     const approvalRepo = this.dataSource.getRepository(ApprovalInternal);

//     const approvals = await approvalRepo.find({
//       where: {
//         pengajuan: { id },
//         role: In([USERTYPE.SPV, USERTYPE.CA, USERTYPE.HM]),
//       },
//       relations: ['user'],
//     });

//     return {
//       ...loanResult,
//       approvals: {
//         spv: mapApprovalByRole(approvals, USERTYPE.SPV),
//         ca: mapApprovalByRole(approvals, USERTYPE.CA),
//         hm: mapApprovalByRole(approvals, USERTYPE.HM),
//       },
//     };
//   }
// }
