import { PartialType } from '@nestjs/mapped-types';
import { CreateRelativesInternalDto } from './create-relatives-internal.dto';
export class UpdateRelativeInternalDto extends PartialType(
  CreateRelativesInternalDto,
) {
  nama: string | undefined;
}
