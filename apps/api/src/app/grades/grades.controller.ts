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
import { ApiTags } from '@nestjs/swagger';
import { QueryApi } from '@skooltrak-app/models';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GradesService } from './grades.service';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  findAll(@Query() query: QueryApi) {
    return this.gradesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
