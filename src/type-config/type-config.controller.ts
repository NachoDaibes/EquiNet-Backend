import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeConfigService } from './type-config.service';
import { CreateTypeConfigDto } from './dto/create-type-config.dto';
import { UpdateTypeConfigDto } from './dto/update-type-config.dto';

@Controller('typeConfig')
export class TypeConfigController {
  constructor(private readonly typeConfigService: TypeConfigService) {}

  @Post()
  create(@Body() createTypeConfigDto: CreateTypeConfigDto) {
    return this.typeConfigService.create(createTypeConfigDto);
  }

  @Get()
  findAll() {
    return this.typeConfigService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.typeConfigService.findOne(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeConfigDto: UpdateTypeConfigDto) {
    return this.typeConfigService.update(+id, updateTypeConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeConfigService.remove(+id);
  }
}
