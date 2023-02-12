import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as MODELS from '@skooltrak-app/models';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { CreateStudentGradeDto } from './dto/create-student-grade.dto';
import { StudentGradesService } from './student-grades.service';

@ApiTags('Student grades')
@Controller('student-grades')
export class StudentGradesController {
  constructor(private readonly studentGradesService: StudentGradesService) {}

  @Post()
  create(
    @Body() createStudentGradeDto: CreateStudentGradeDto,
    @Query() query: MODELS.QueryApi
  ) {
    return this.studentGradesService.create(createStudentGradeDto, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: MODELS.QueryApi, @User() user: MODELS.User) {
    return this.studentGradesService.findAll(query, user);
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
