import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGradeTypeDto } from './dto/create-grade-type.dto';
import { UpdateGradeTypeDto } from './dto/update-grade-type.dto';
import { GradeTypesService } from './grade-types.service';

@ApiTags('Grade types')
@Controller('grade-types')
export class GradeTypesController {
  constructor(private readonly gradeTypesService: GradeTypesService) {}

  @Post()
  create(@Body() createGradeTypeDto: CreateGradeTypeDto) {
    return this.gradeTypesService.create(createGradeTypeDto);
  }

  @Get()
  findAll() {
    return this.gradeTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGradeTypeDto: UpdateGradeTypeDto
  ) {
    return this.gradeTypesService.update(id, updateGradeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeTypesService.remove(id);
  }
}
