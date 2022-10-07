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

import { DegreesService } from './degrees.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';

@ApiTags('Degrees')
@Controller('degrees')
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) {}

  @Post()
  create(@Body() createDegreeDto: CreateDegreeDto) {
    return this.degreesService.create(createDegreeDto);
  }

  @Get()
  findAll() {
    return this.degreesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreesService.findOne(id);
  }

  @Get('school/:id')
  findBySchool(@Param('id') id: string) {
    return this.degreesService.findBySchool(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDegreeDto: UpdateDegreeDto) {
    return this.degreesService.update(id, updateDegreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreesService.remove(id);
  }
}
