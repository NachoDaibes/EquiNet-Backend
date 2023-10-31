import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

interface dataset {
  label: string;
  data: any;
}

interface datasetLine {
  label: string;
  data: number[];
  fill: boolean;
  tension: number;
}

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('publications-created')
  findAllPublicationsCreated(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.reportsService.findAllPublicationsCreated({
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
      start,
      end,
    });
  }

  @Get('publications-improved')
  improvedPublicationsReport(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.reportsService.improvedPublicationsReport({
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
      start,
      end,
    });
  }

  @Get('publications-improved-total')
  totalImprovedPublicationsReport(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.reportsService.totalImprovedPublicationsReport({
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
      start,
      end,
    });
  }

  @Get('publications-improved-position')
  totalPositionImprovedPublicationsReport(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.reportsService.totalPositionImprovedPublicationsReport({
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
      start,
      end,
    });
  }

  @Get('user-per-type')
  userPerType(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.reportsService.userPerType({
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
      start,
      end,
    });
  }
}
