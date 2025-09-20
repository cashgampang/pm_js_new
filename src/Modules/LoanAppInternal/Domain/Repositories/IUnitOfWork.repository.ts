import { IClientInternalRepository } from "./client-internal.repository";
import { IAddressInternalRepository } from "./address-internal.repository";
import { ICollateralInternalRepository } from "./collateral-internal.repository";
import { IFamilyInternalRepository } from "./family-internal.repository";
import { IJobInternalRepository } from "./job-internal.repository";
import { ILoanApplicationInternalRepository } from "./loanApp-internal.repository";
import { IRelativeInternalRepository } from "./relatives-internal.repository";

export interface IUnitOfWork {
  clientRepo: IClientInternalRepository;
  addressRepo: IAddressInternalRepository;
  collateralRepo: ICollateralInternalRepository;
  familyRepo: IFamilyInternalRepository;
  jobRepo: IJobInternalRepository;
  loanAppRepo: ILoanApplicationInternalRepository;
  relativeRepo: IRelativeInternalRepository;

  start<T>(work: () => Promise<T>): Promise<T>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export const UNIT_OF_WORK = Symbol("UNIT_OF_WORK");
