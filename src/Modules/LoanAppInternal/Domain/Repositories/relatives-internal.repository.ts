import { RelativeInternal } from "../Entities/relative-internal.entity";

export const RELATIVE_INTERNAL_REPOSITORY = Symbol('RELATIVE_INTERNAL_REPOSITORY');

export interface IRelativeInternalRepository {
  findById(id: number): Promise<RelativeInternal | null>;
  findByNasabahId(nasabahId: number): Promise<RelativeInternal[]>;
  findAll(): Promise<RelativeInternal[]>;
  save(address: RelativeInternal): Promise<RelativeInternal>;
  update(
    id: number,
    address: Partial<RelativeInternal>,
  ): Promise<RelativeInternal>;
  delete(id: number): Promise<void>;
  // delete(id: number): Promise<void>;
}