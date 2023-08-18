import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LegalPersonService } from './legal-person.service';
import { CreateLegalPersonDto } from './dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from './dto/update-legal-person.dto';

@Controller('legal-person')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  @Post()
  create(@Body() createLegalPersonDto: CreateLegalPersonDto) {
    return this.legalPersonService.create(createLegalPersonDto);
  }

  @Get()
  findAll() {
    return this.legalPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legalPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLegalPersonDto: UpdateLegalPersonDto) {
    return this.legalPersonService.update(+id, updateLegalPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.legalPersonService.remove(+id);
  }
}
