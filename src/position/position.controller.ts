import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  findAll(@Query('type') type: string) {
    return this.positionService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
