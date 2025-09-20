// src/use-case/Marketing-Internal/marketing-internal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import entitas
import { ApprovalInternalModule } from 'src/Modules/LoanAppInternal/Modules/approval-internal.module';
import { LoanApplicationInternalModule } from 'src/Modules/LoanAppInternal/Modules/loanApp-internal.module';
import { UsersModule } from '../../ModuleUsers.module';

import { ApprovalInternal_ORM_Entity } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/approval-internal.orm-entity';
import { Users_ORM_Entity } from '../../Infrastructure/Entities/users.orm-entity';
import { LoanApplicationInternal_ORM_Entity } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/loan-application-internal.orm-entity';

//? USE CASE
import { SPV_ApproveOrRejectUseCase } from './Applications/Services/SPV_ApprovedOrReject.usecase';

//? CONTROLLER
import { SPV_ApprovedOrRejectController } from './Infrastructure/Controllers/SPV_CreateApprovedOrReject.controller';
@Module({
  imports: [
    ApprovalInternalModule,
    LoanApplicationInternalModule, UsersModule,
    TypeOrmModule.forFeature([
      ApprovalInternal_ORM_Entity,
      Users_ORM_Entity,
      LoanApplicationInternal_ORM_Entity,
    ]),
  ],
  controllers: [SPV_ApprovedOrRejectController],
  providers: [SPV_ApproveOrRejectUseCase],
})
export class SupervisorInternalUseCaseModule {}
