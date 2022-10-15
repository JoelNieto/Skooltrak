import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryApi } from '@skooltrak-app/models';
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
  @ApiQuery({ name: 'course', type: String })
  findAll(@Query() query: QueryApi) {
    return this.gradeTypesService.findAll(query);
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
