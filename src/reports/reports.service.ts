import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationPosition } from 'src/entities/publicationPosition.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { TypeService } from 'src/type/type.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IParams } from './interfaces/reports-params.interface';
import { User } from 'src/entities/user.entity';

interface IDatasetVertical {
  label: string;
  data: number[];
}

interface IDatasetLine {
  label: string;
  data: number[];
  fill: boolean;
  tension: number;
}

interface IPositionRes {
  datasets: IDatasetPie[];
  labels: string[];
}

interface IDatasetPie {
  data: number[];
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly typeService: TypeService,
  ) {}

  async findAllPublicationsCreated(params: IParams) {
    const publicationStatusActivo = await this.typeService.findTypeByCode(
      'PSTActivo',
    );
    const publicationsQb = this.publicationRepository
      .createQueryBuilder('Publication')
      .select([
        'Publication.id',
        'PublicationStatus.id',
        'PublicationStatusType.code',
        'PublicationStatus.statusRegistrationDateTime',
      ])
      .leftJoin(
        (qb) =>
          qb
            .select('p.id', 'id')
            .addSelect('MIN(ps.id)', 'min')
            .from(Publication, 'p')
            .leftJoin('p.publicationStatus', 'ps')
            .leftJoin('ps.publicationStatusType', 'pst')
            .where('pst.code = :pst', {
              pst: publicationStatusActivo.code,
            })
            .groupBy('p.id'),
        'ps',
        'ps.id = Publication.id',
      )
      .leftJoin(
        'Publication.publicationStatus',
        'PublicationStatus',
        'PublicationStatus.id = ps.min',
      )
      .leftJoin(
        'PublicationStatus.publicationStatusType',
        'PublicationStatusType',
      )
      .where('PublicationStatus.statusRegistrationDateTime >= :start', {
        start: params.start,
      })
      .andWhere('PublicationStatus.statusRegistrationDateTime <= :end', {
        end: params.end,
      });
    this.applyFilter(publicationsQb, params);
    const publications = await publicationsQb.getMany();
    if (publications.length !== 0) {
      let res: IDatasetVertical[] = [];
      let startMonth = +params.start.substring(5, 7);
      let endMonth = +params.end.substring(5, 7);
      const monthDiff = endMonth - startMonth;
      let x = 0;
      for (let i = startMonth; i <= endMonth; i++) {
        const array = publications.filter(
          (o) =>
            +o.publicationStatus[0].statusRegistrationDateTime
              .toISOString()
              .substring(5, 7) == i,
        );
        const months = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        const results = [];
        for (let i = 0; i <= monthDiff; i++) {
          results.push(0);
        }
        results.splice(x, 1, array.length);
        let o = {
          label: months[i - 1],
          data: results,
        };
        res.push(o);
        x = x + 1;
      }
      return res as any;
    } else {
      let res = [{ label: 'Publicaciones', data: [0] }];
      return res;
    }
  }

  async improvedPublicationsReport(params: IParams) {
    let startMonth = +params.start.substring(5, 7);
    let endMonth = +params.end.substring(5, 7);
    let monthDiff = endMonth - startMonth;
    if (monthDiff == 0) {
      if (startMonth == 1) {
        endMonth = endMonth + 1;
      } else {
        startMonth = startMonth - 1;
      }
      monthDiff = 1;
    }
    const publicationsQb = await this.publicationRepository
      .createQueryBuilder('Publication')
      .select([
        'Publication.id',
        'PublicationPosition.id',
        'PublicationPosition.positionRegistrationDateTime',
      ])
      .leftJoin(
        (qb) =>
          qb
            .select('p.id', 'id')
            .addSelect('MAX(pp.id)', 'max')
            .from(Publication, 'p')
            .leftJoin('p.publicationPosition', 'pp')
            .groupBy('p.id'),
        'pp',
        'pp.id = Publication.id',
      )
      .leftJoin(
        'Publication.publicationPosition',
        'PublicationPosition',
        'PublicationPosition.id = pp.max',
      )
      .where('PublicationPosition.positionRegistrationDateTime >= :start', {
        start: new Date(
          `${params.start.substring(
            0,
            4,
          )}-${startMonth}-${params.start.substring(8, 10)}`,
        ),
      })
      .andWhere('PublicationPosition.positionRegistrationDateTime <= :end', {
        end: new Date(
          `${params.end.substring(0, 4)}-${endMonth}-${params.end.substring(
            8,
            10,
          )}`,
        ),
      });
    this.applyFilter(publicationsQb, params);
    const publications = await publicationsQb.getMany();
    if (publications.length !== 0) {
      let res: IDatasetLine[] = [];
      let x = 0;
      const results = [];
      for (let i = 0; i <= monthDiff; i++) {
        results.push(0);
      }
      for (let i = startMonth; i <= endMonth; i++) {
        const array = publications.filter(
          (o) =>
            +o.publicationPosition[0].positionRegistrationDateTime
              .toISOString()
              .substring(5, 7) == i,
        );
        results.splice(x, 1, array.length);
        x = x + 1;
      }
      let o = {
        label: 'Publicaciones',
        data: results,
        fill: false,
        tension: 0,
      };
      res.push(o);
      return res as any;
    } else {
      let o = {
        label: 'Publicacion',
        data: [0],
        fill: false,
        tension: 0,
      };
      return [o];
    }
  }

  async totalImprovedPublicationsReport(params: IParams) {
    const publicationsQb = await this.publicationRepository
      .createQueryBuilder('Publication')
      .select([
        'Publication.id',
        'PublicationPosition.id',
        'PublicationPosition.positionRegistrationDateTime',
        'Position.id',
        'Position.price',
      ])
      .leftJoin(
        (qb) =>
          qb
            .select('p.id', 'id')
            .addSelect('MAX(pp.id)', 'max')
            .from(Publication, 'p')
            .leftJoin('p.publicationPosition', 'pp')
            .groupBy('p.id'),
        'pp',
        'pp.id = Publication.id',
      )
      .leftJoin(
        'Publication.publicationPosition',
        'PublicationPosition',
        'PublicationPosition.id = pp.max',
      )
      .leftJoin('PublicationPosition.position', 'Position')
      .where('PublicationPosition.positionRegistrationDateTime >= :start', {
        start: params.start,
      })
      .andWhere('PublicationPosition.positionRegistrationDateTime <= :end', {
        end: params.end,
      });
    this.applyFilter(publicationsQb, params);
    const publications = await publicationsQb.getMany();
    if (publications.length !== 0) {
      let res: IDatasetVertical[] = [];
      let x = 0;
      let startMonth = +params.start.substring(5, 7);
      let endMonth = +params.end.substring(5, 7);
      const monthDiff = endMonth - startMonth;

      const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      for (let i = startMonth; i <= endMonth; i++) {
        const array = publications.filter(
          (o) =>
            +o.publicationPosition[0].positionRegistrationDateTime
              .toISOString()
              .substring(5, 7) == i,
        );
        const results = [];

        for (let i = 0; i <= monthDiff; i++) {
          results.push(0);
        }
        let total = 0;
        for (const a of array) {
          total = total + a.publicationPosition[0].position.price;
        }
        results.splice(x, 1, total);
        let o = {
          label: months[i - 1],
          data: results,
        };
        res.push(o);
        x = x + 1;
      }
      return res as any;
    } else {
      let res = [{ label: 'Publicaciones', data: [0] }];
      return res;
    }
  }

  async totalPositionImprovedPublicationsReport(params: IParams) {
    const publicationsQb = await this.publicationRepository
      .createQueryBuilder('Publication')
      .select([
        'Publication.id',
        'PublicationPosition.id',
        'PublicationPosition.positionRegistrationDateTime',
        'Position.id',
        'Position.number',
      ])
      .leftJoin('Publication.publicationPosition', 'PublicationPosition')
      .leftJoin('PublicationPosition.position', 'Position')
      .where('PublicationPosition.positionRegistrationDateTime >= :start', {
        start: params.start,
      })
      .andWhere('PublicationPosition.positionRegistrationDateTime <= :end', {
        end: params.end,
      });
    this.applyFilter(publicationsQb, params);
    const publications = await publicationsQb.getMany();
    if (publications.length !== 0) {
      const categories = [];
      const results = [];
      let uno = 0;
      let dos = 0;
      let tres = 0;
      let cuatro = 0;
      let cinco = 0;
      for (const a of publications) {
        for (let i = 1; i <= 5; i++) {
          const array = a.publicationPosition.filter(
            (o) => o.position.number == i,
          );
          if (array.length !== 0) {
            switch (i) {
              case 1:
                uno = uno + array.length;
                break;
              case 2:
                dos = dos + array.length;
                break;
              case 3:
                tres = tres + array.length;
                break;
              case 4:
                cuatro = cuatro + array.length;
                break;
              case 5:
                cinco = cinco + array.length;
                break;
              default:
                break;
            }
          }
        }
      }
      if (uno !== 0) {
        categories.push('Puesto 1');
        results.push(uno);
      }
      if (dos !== 0) {
        categories.push('Puesto 2');
        results.push(dos);
      }
      if (tres !== 0) {
        categories.push('Puesto 3');
        results.push(tres);
      }
      if (cuatro !== 0) {
        categories.push('Puesto 4');
        results.push(cuatro);
      }
      if (cinco !== 0) {
        categories.push('Puesto 5');
        results.push(cinco);
      }
      let o: IDatasetPie = {
        data: results,
      };
      const res: IPositionRes = {
        labels: categories,
        datasets: [o],
      };
      return res as any;
    } else {
      let res = { labels: ['Posiciones'], datasets: [{ data: [0] }] };
      return res;
    }
  }

  async userPerType(params: IParams) {
    const userStatusActivo = await this.typeService.findTypeByCode('USTActivo');
    const users = await this.userRepository
      .createQueryBuilder('User')
      .select([
        'User.id',
        'UserStatus.id',
        'UserStatusType.code',
        'UserStatus.statusRegistrationDateTime',
        'UserProfile.id',
        'Profile.id',
        'ProfileType.id',
        'ProfileType.name',
      ])
      .leftJoin(
        (qb) =>
          qb
            .select('u.id', 'id')
            .addSelect('MIN(us.id)', 'min')
            .from(User, 'u')
            .leftJoin('u.userStatus', 'us')
            .leftJoin('us.userStatusType', 'ust')
            .where('ust.code = :ust', {
              ust: userStatusActivo.code,
            })
            .groupBy('u.id'),
        'us',
        'us.id = User.id',
      )
      .leftJoin('User.userStatus', 'UserStatus', 'UserStatus.id = us.min')
      .leftJoin('UserStatus.userStatusType', 'UserStatusType')
      .leftJoin('User.userProfile', 'UserProfile')
      .leftJoin('UserProfile.profile', 'Profile')
      .leftJoin('Profile.profileType', 'ProfileType')
      .where('UserStatus.statusRegistrationDateTime >= :start', {
        start: params.start,
      })
      .andWhere('UserStatus.statusRegistrationDateTime <= :end', {
        end: params.end,
      })
      .getMany();
    if (users.length !== 0) {
      let admin = 0;
      let member = 0;
      for (const u of users) {
        const arrayP = u.userProfile.filter(
          (o) => o.profile.profileType.name == 'Propietario',
        );
        const arrayM = u.userProfile.filter(
          (o) => o.profile.profileType.name == 'Miembro',
        );
        if (arrayP.length !== 0) {
          admin = admin + 1;
        }
        if (arrayM.length !== 0) {
          member = member + 1;
        }
      }
      let o: IDatasetPie = {
        data: [member, admin],
      };
      const res: IPositionRes = {
        labels: ['Miembro', 'Propietario'],
        datasets: [o],
      };
      return res as any;
    } else {
      let res = { labels: 'Posiciones', data: [0] };
      return res;
    }
  }

  applyFilter(
    publicationsQb: SelectQueryBuilder<Publication>,
    params: IParams,
  ) {
    if (params?.disabilityFilter)
      publicationsQb
        .leftJoin('Publication.publicationDisability', 'PublicationDisability')
        .leftJoin('PublicationDisability.disability', 'Disability')
        .andWhere('Disability.name = :disability', {
          disability: params.disabilityFilter,
        });
    if (
      params?.politicalDivisionFilter ||
      params?.departmentFilter ||
      params?.locationFilter
    )
      publicationsQb
        .leftJoin('Publication.location', 'Location')
        .leftJoin('Location.department', 'Department')
        .leftJoin('Department.politicalDivision', 'PoliticalDivision');
    if (params?.politicalDivisionFilter)
      publicationsQb.andWhere('PoliticalDivision.name = :politicalDivision', {
        politicalDivision: params.politicalDivisionFilter,
      });
    if (params?.departmentFilter)
      publicationsQb.andWhere('Department.name = :department', {
        department: params.departmentFilter,
      });
    if (params?.locationFilter)
      publicationsQb.andWhere('Location.name = :location', {
        location: params.locationFilter,
      });
    if (params?.publicationTypeFilter)
      publicationsQb
        .leftJoin('Publication.publicationType', 'PublicationType')
        .andWhere('PublicationType.name = :publicationType', {
          publicationType: params.publicationTypeFilter,
        });
  }
}
