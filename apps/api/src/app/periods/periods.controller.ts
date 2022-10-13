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
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsService } from './periods.service';

@ApiTags('Periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  findAll(@Query() query: QueryApi) {
    return this.periodsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
