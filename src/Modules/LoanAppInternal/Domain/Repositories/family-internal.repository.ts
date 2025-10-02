import { FamilyInternal } from '../Entities/family-internal.entity';

export const FAMILY_INTERNAL_REPOSITORY = Symbol('FAMILY_INTERNAL_REPOSITORY');

export interface IFamilyInternalRepository {
  // Ambil semua data family
  findAll(): Promise<FamilyInternal[]>;

  // Ambil data family berdasarkan ID
  findById(id: number): Promise<FamilyInternal | null>;

  // Ambil data family berdasarkan nasabah_id
  findByNasabahId(nasabahId: number): Promise<FamilyInternal[]>;

  // Simpan family baru
  save(family: FamilyInternal): Promise<FamilyInternal>;

  // Update data family berdasarkan ID
  update(id: number, family: Partial<FamilyInternal>): Promise<FamilyInternal>;

  // Hapus family berdasarkan ID
  delete(id: number): Promise<void>;
}
