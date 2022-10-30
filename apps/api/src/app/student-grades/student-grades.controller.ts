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
import { QueryApi } from '@skooltrak-app/models';
import { CreateStudentGradeDto } from './dto/create-student-grade.dto';
import { UpdateStudentGradeDto } from './dto/update-student-grade.dto';
import { StudentGradesService } from './student-grades.service';

@Controller('student-grades')
export class StudentGradesController {
  constructor(private readonly studentGradesService: StudentGradesService) {}

  @Post()
  create(
    @Body() createStudentGradeDto: CreateStudentGradeDto,
    @Query() query: QueryApi
  ) {
    return this.studentGradesService.create(createStudentGradeDto, query);
  }

  @Get()
  findAll() {
    return this.studentGradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentGradesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentGradeDto: UpdateStudentGradeDto
  ) {
    return this.studentGradesService.update(+id, updateStudentGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentGradesService.remove(+id);
  }
}
