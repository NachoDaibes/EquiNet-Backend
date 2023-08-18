import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndividualPersonService } from './individual-person.service';
import { CreateIndividualPersonDto } from './dto/create-individual-person.dto';
import { UpdateIndividualPersonDto } from './dto/update-individual-person.dto';

@Controller('individual-person')
export class IndividualPersonController {
  constructor(private readonly individualPersonService: IndividualPersonService) {}

  @Post()
  create(@Body() createIndividualPersonDto: CreateIndividualPersonDto) {
    return this.individualPersonService.create(createIndividualPersonDto);
  }

  @Get()
  findAll() {
    return this.individualPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndividualPersonDto: UpdateIndividualPersonDto) {
    return this.individualPersonService.update(+id, updateIndividualPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.individualPersonService.remove(+id);
  }
}
