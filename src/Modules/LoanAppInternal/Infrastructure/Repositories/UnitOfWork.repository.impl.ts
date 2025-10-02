import { DataSource, QueryRunner } from 'typeorm';
import { IUnitOfWork } from '../../Domain/Repositories/IUnitOfWork.repository';

// Repo interfaces
import { IClientInternalRepository } from '../../Domain/Repositories/client-internal.repository';
import { IAddressInternalRepository } from '../../Domain/Repositories/address-internal.repository';
import { ICollateralInternalRepository } from '../../Domain/Repositories/collateral-internal.repository';
import { IFamilyInternalRepository } from '../../Domain/Repositories/family-internal.repository';
import { IJobInternalRepository } from '../../Domain/Repositories/job-internal.repository';
import { ILoanApplicationInternalRepository } from '../../Domain/Repositories/loanApp-internal.repository';
import { IRelativesInternalRepository } from '../../Domain/Repositories/relatives-internal.repository';
import { IApprovalInternalRepository } from '../../Domain/Repositories/approval-internal.repository';

// Repo implementations
import { ClientInternalRepositoryImpl } from './client-internal.repository.impl';
import { AddressInternalRepositoryImpl } from './address-internal.repository.impl';
import { CollateralInternalRepositoryImpl } from './collateral-internal.repository.impl';
import { FamilyInternalRepository } from './family-internal.repository.impl';
import { JobInternalRepositoryImpl } from './job-internal.repository.impl';
import { LoanApplicationInternalRepositoryImpl } from './loanApp-internal.repository.impl';
import { RelativeInternalRepositoryImpl } from './relative-internal.repository.impl';
import { ApprovalInternalRepositoryImpl } from './approval-internal.repository.impl';

// ORM Entities
import { ClientInternal_ORM_Entity } from '../Entities/client-internal.orm-entity';
import { AddressInternal_ORM_Entity } from '../Entities/address-internal.orm-entity';
import { CollateralInternal_ORM_Entity } from '../Entities/collateral-internal.orm-entity';
import { FamilyInternal_ORM_Entity } from '../Entities/family-internal.orm-entity';
import { JobInternal_ORM_Entity } from '../Entities/job-internal.orm-entity';
import { LoanApplicationInternal_ORM_Entity } from '../Entities/loan-application-internal.orm-entity';
import { RelativeInternal_ORM_Entity } from '../Entities/relative-internal.orm-entity';
import { ApprovalInternal_ORM_Entity } from '../Entities/approval-internal.orm-entity';

export class TypeOrmUnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner | null = null;

  constructor(private readonly dataSource: DataSource) {
    if (!dataSource) throw new Error('DataSource must be provided!');
    console.log('=== TypeOrmUnitOfWork Initialized ===');
  }

  // --- Repositories ---
  private ensureQueryRunner() {
    if (!this.queryRunner) throw new Error('Transaction has not started.');
  }

  get clientRepo(): IClientInternalRepository {
    this.ensureQueryRunner();
    return new ClientInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(ClientInternal_ORM_Entity),
    );
  }

  get addressRepo(): IAddressInternalRepository {
    this.ensureQueryRunner();
    return new AddressInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(AddressInternal_ORM_Entity),
    );
  }

  get approvalRepo(): IApprovalInternalRepository {
    this.ensureQueryRunner();
    return new ApprovalInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(ApprovalInternal_ORM_Entity),
    );
  }

  get collateralRepo(): ICollateralInternalRepository {
    this.ensureQueryRunner();
    return new CollateralInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(CollateralInternal_ORM_Entity),
    );
  }

  get familyRepo(): IFamilyInternalRepository {
    this.ensureQueryRunner();
    return new FamilyInternalRepository(
      this.queryRunner!.manager.getRepository(FamilyInternal_ORM_Entity),
    );
  }

  get jobRepo(): IJobInternalRepository {
    this.ensureQueryRunner();
    return new JobInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(JobInternal_ORM_Entity),
    );
  }

  get loanAppRepo(): ILoanApplicationInternalRepository {
    this.ensureQueryRunner();
    return new LoanApplicationInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(LoanApplicationInternal_ORM_Entity),
    );
  }

  get relativeRepo(): IRelativesInternalRepository {
    this.ensureQueryRunner();
    return new RelativeInternalRepositoryImpl(
      this.queryRunner!.manager.getRepository(RelativeInternal_ORM_Entity),
    );
  }

  // --- Transaction Handling ---
  async start<T>(work: () => Promise<T>): Promise<T> {
    if (!this.dataSource.isInitialized) {
      throw new Error('DataSource is not initialized.');
    }

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const result = await work();
      await this.queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  async commit(): Promise<void> {
    this.ensureQueryRunner();
    await this.queryRunner!.commitTransaction();
    await this.queryRunner!.release();
    this.queryRunner = null;
  }

  async rollback(): Promise<void> {
    this.ensureQueryRunner();
    await this.queryRunner!.rollbackTransaction();
    await this.queryRunner!.release();
    this.queryRunner = null;
  }
}
