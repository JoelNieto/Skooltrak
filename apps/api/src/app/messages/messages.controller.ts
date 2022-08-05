import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as models from '@skooltrak-app/models';
import { PaginationQuery } from '@skooltrak-app/models';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @User() user: models.User
  ) {
    createMessageDto.sender = user;
    return this.messagesService.create(createMessageDto);
  }

  @Get('inbox')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'pageSize', enum: [5, 10, 15, 20], required: true })
  @ApiQuery({ name: 'pageIndex', required: true })
  getAll(@User() user: models.User, @Query() pagination: PaginationQuery) {
    return this.messagesService.inbox(user, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
