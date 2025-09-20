// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { ApprovalInternal, ApprovalInternalStatus } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
// import { USERTYPE } from 'src/Modules/Users/Domain/Entities/user.entity';

// @Injectable()
// export class SPV_ApproveOrRejectUseCase {
//   constructor(private readonly dataSource: DataSource) {}

//   async execute(
//     loan_id: number,
//     user_id: number,
//     role: USERTYPE, // ✅ enum role
//     status: ApprovalInternalStatus, // ✅ enum status
//     keterangan?: string,
//   ) {
//     const approvalRepo = this.dataSource.getRepository(ApprovalInternal);

//     const approval = approvalRepo.create({
//       pengajuan: { id: loan_id },   // ✅ relasi ke LoanApplicationInternal
//       user: { id: user_id },        // ✅ relasi ke User
//       role,                         // ✅ enum ApprovalInternalRole
//       status,                       // ✅ enum ApprovalInternalStatus
//       keterangan: keterangan || '',
//     });

//     await approvalRepo.save(approval);

//     return {
//       message: `Approval berhasil disimpan dengan status ${status}`,
//       data: {
//         id: approval.id,
//         status: approval.status,
//         keterangan: approval.keterangan,
//         created: approval.created_at,
//         updated: approval.updated_at,
//       },
//     };
//   }
// }
