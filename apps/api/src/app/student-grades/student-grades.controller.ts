import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryApi } from '@skooltrak-app/models';
import { CreateStudentGradeDto } from './dto/create-student-grade.dto';
import { StudentGradesService } from './student-grades.service';

@ApiTags('Student grades')
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
  findAll(@Query() query: QueryApi) {
    return this.studentGradesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentGradesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentGradesService.remove(id);
  }
}
