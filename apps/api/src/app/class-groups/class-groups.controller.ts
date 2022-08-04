import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassGroupsService } from './class-groups.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';

@ApiTags('Class groups')
@Controller('class-groups')
export class ClassGroupsController {
  constructor(private readonly classGroupsService: ClassGroupsService) {}

  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupsService.create(createClassGroupDto);
  }

  @Get()
  findAll() {
    return this.classGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassGroupDto: UpdateClassGroupDto
  ) {
    return this.classGroupsService.update(id, updateClassGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classGroupsService.remove(id);
  }
}
