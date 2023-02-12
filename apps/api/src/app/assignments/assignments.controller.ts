import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as models from '@skooltrak-app/models';
import { QueryApiDate } from '@skooltrak-app/models';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { UserInterceptor } from '../shared/interceptors/user.interceptor';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(UserInterceptor)
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'startDate', type: Date })
  @ApiQuery({ name: 'endDate', type: Date })
  findAll(@Query() query: QueryApiDate, @User() user: models.User) {
    return this.assignmentsService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}
function UseJwtGuard() {
  throw new Error('Function not implemented.');
}
