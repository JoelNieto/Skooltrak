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

import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { StudyPlansService } from './study-plans.service';

@ApiTags('Study plans')
@Controller('study-plans')
export class StudyPlansController {
  constructor(private readonly studyPlansService: StudyPlansService) {}

  @Post()
  create(@Body() createStudyPlanDto: CreateStudyPlanDto) {
    return this.studyPlansService.create(createStudyPlanDto);
  }

  @Get()
  findAll() {
    return this.studyPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyPlansService.findOne(id);
  }

  @Get('degree/:id')
  findByDegree(@Param('id') id: string) {
    return this.studyPlansService.findByDegree(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyPlanDto: UpdateStudyPlanDto
  ) {
    return this.studyPlansService.update(id, updateStudyPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyPlansService.remove(id);
  }
}
