import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentTypeDto } from './create-assignment-type.dto';

export class UpdateAssignmentTypeDto extends PartialType(
  CreateAssignmentTypeDto
) {}
