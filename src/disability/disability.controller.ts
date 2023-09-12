import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisabilityService } from './disability.service';
import { CreateDisabilityDto } from './dto/create-disability.dto';
import { UpdateDisabilityDto } from './dto/update-disability.dto';

@Controller('disability')
export class DisabilityController {
  constructor(private readonly disabilityService: DisabilityService) {}

  @Post()
  create(@Body() createDisabilityDto: CreateDisabilityDto) {
    return this.disabilityService.create(createDisabilityDto);
  }

  @Get()
  findAll() {
    return this.disabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disabilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisabilityDto: UpdateDisabilityDto) {
    return this.disabilityService.update(+id, updateDisabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disabilityService.remove(+id);
  }
}
