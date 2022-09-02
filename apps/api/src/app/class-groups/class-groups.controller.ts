import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as models from '@skooltrak-app/models';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../shared/decorators/user.decorator';
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
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: models.User) {
    return this.classGroupsService.findAll(user);
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
