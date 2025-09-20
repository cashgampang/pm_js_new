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

// //? USE CASE
// import { SPV_GetLoanApplicationByIdUseCase } from './usecases/SPV_GetLoanApplicationById.usecase';
// import { SPV_GetLoanApplicationByTeamsUseCase } from './usecases/SPV_GetLoanApplicationsByTeam.usecase';
// import { SPV_GetTeamsUseCase } from './usecases/SPV_GetTeams.usecase';
// import { SPV_ApproveOrRejectUseCase } from './usecases/SPV_ApprovedOrReject.usecase';
// import { SPV_GetApprovalHistoryByTeamsUseCase } from './usecases/SPV_GetApprovalHistoryByTeam.usecase';
// import { SPV_RejectOrApproved_UpdateStatusLoanAppByIdService } from 'src/infrastructure/shared/InternalLoanApplications/SPV_RejectOrApproved_UpdateStatusLoanAppById.service';

// //? CONTROLLER
// import { SPV_GetLoanApplicationByIdController } from 'src/Supervisor-Internal/infrastructure/controller/SPV_GetLoanApplicationById.controller';
// import { SPV_GetLoanApplicationByTeamsController } from 'src/Supervisor-Internal/infrastructure/controller/SPV_GetLoanApplicationsByTeam.controller';
// import { SPV_GetTeamsController } from 'src/Supervisor-Internal/infrastructure/controller/SPV_GetTeams.controller';
// import { SPV_ApprovedOrRejectController } from 'src/Supervisor-Internal/infrastructure/controller/SPV_CreateApprovedOrReject.controller';
// import { SPV_ApprovalHistoryByTeamsController } from 'src/Supervisor-Internal/infrastructure/controller/SPV_GetApprovalHistoryByTeam.controller';

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
//   ],
//   controllers: [
//     SPV_GetLoanApplicationByIdController,
//     SPV_GetLoanApplicationByTeamsController,
//     SPV_GetTeamsController,
//     SPV_ApprovedOrRejectController,
//     SPV_ApprovalHistoryByTeamsController
//   ],
//   providers: [
//     SPV_GetLoanApplicationByIdUseCase,
//     SPV_GetLoanApplicationByTeamsUseCase,
//     SPV_GetTeamsUseCase,
//     SPV_ApproveOrRejectUseCase,
//     SPV_GetApprovalHistoryByTeamsUseCase,

//     SPV_RejectOrApproved_UpdateStatusLoanAppByIdService
//   ],
// })
// export class SupervisorInternalUseCaseModule {}
