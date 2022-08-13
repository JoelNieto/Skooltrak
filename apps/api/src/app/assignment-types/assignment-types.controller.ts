import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AssignmentTypesService } from './assignment-types.service';
import { CreateAssignmentTypeDto } from './dto/create-assignment-type.dto';
import { UpdateAssignmentTypeDto } from './dto/update-assignment-type.dto';

@ApiTags('Assignment types')
@Controller('assignment-types')
export class AssignmentTypesController {
  constructor(
    private readonly assignmentTypesService: AssignmentTypesService
  ) {}

  @Post()
  create(@Body() createAssignmentTypeDto: CreateAssignmentTypeDto) {
    return this.assignmentTypesService.create(createAssignmentTypeDto);
  }

  @Get()
  findAll() {
    return this.assignmentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentTypeDto: UpdateAssignmentTypeDto
  ) {
    return this.assignmentTypesService.update(id, updateAssignmentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentTypesService.remove(id);
  }
}
