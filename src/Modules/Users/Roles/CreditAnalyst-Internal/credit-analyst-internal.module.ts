// // src/use-case/Marketing-Internal/marketing-internal.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// // Import entitas
// import { ClientInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/client-internal.orm-entity';
// import { AddressInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/address-internal.orm-entity';
// import { FamilyInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/family-internal.orm-entity';
// import { JobInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/job-internal.orm-entity';
// import { LoanApplicationInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/loan-application-internal.orm-entity';
// import { CollateralInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/collateral-internal.orm-entity';

// // Import use cases & controllers
// import { CA_ApproveOrRejectUseCase } from './usecases/CA_ApprovedOrReject.usecase';
// import { CA_GetLoanApplicationByIdUseCase } from './usecases/CA_GetLoanApplicationById.usecase';
// import { CA_GetAllApprovalsUseCase } from './usecases/CA_GetAllLoanApplication.usecase';
// import { CA_GetAllApprovalHistoryUseCase } from './usecases/CA_GetApprovalHistory.usecase';

// import { CA_ApprovedOrRejectController } from 'src/CreditAnalyst-Internal/infrastructure/controller/CA_ApprovedOrReject.controller';
// import { CA_GetLoanApplicationByIdController } from 'src/CreditAnalyst-Internal/infrastructure/controller/CA_GetLoanApplicatonById.controller';
// import { CA_GetAllApprovalsController } from 'src/CreditAnalyst-Internal/infrastructure/controller/CA_GetAllApprovals.controller';
// import { CA_GetAllApprovalHistoryController } from 'src/CreditAnalyst-Internal/infrastructure/controller/CA_GetAllApprovalHistory.controller';

// //* Shared Module
// import { SharedModule } from 'src/infrastructure/shared/shared.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       ClientInternal,
//       AddressInternal,
//       FamilyInternal,
//       JobInternal,
//       LoanApplicationInternal,
//       CollateralInternal,
//     ]),
//     //* Shared Module Import
//     SharedModule,
//   ],
//   controllers: [
//     CA_ApprovedOrRejectController,
//     CA_GetLoanApplicationByIdController,
//     CA_GetAllApprovalsController,
//     CA_GetAllApprovalHistoryController
//   ],
//   providers: [
//     CA_ApproveOrRejectUseCase,
//     CA_GetLoanApplicationByIdUseCase,
//     CA_GetAllApprovalsUseCase,
//     CA_GetAllApprovalHistoryUseCase
//   ],
// })
// export class CreditAnalystInternalUseCaseModule {}
