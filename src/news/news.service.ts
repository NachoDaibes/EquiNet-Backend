import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { EntityManager, Repository } from 'typeorm';
import { NewsStatus } from 'src/entities/newsStatus.entity';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(NewsStatus)
    private readonly newsStatusRepository: Repository<NewsStatus>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly typeService: TypeService
  ){}

  async create(createNewsDto: CreateNewsDto) {
    const newsStatusAactivo = await this.typeService.findTypeByCode('NSActivo',);

    const news = this.newsRepository.create(createNewsDto);

    const newsStatus = this.newsStatusRepository.create({
      newsStatusType: newsStatusAactivo,
    });

    news.newsStatus = [newsStatus];

    let newsFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        newsFinal = await transaction.save(news);
      } catch (error) {
        throw new Error(error);
      }
    });

    return newsFinal;
  }

  async findAll() {
    const newsStatusActivo = await this.typeService.findTypeByCode('NSActivo',);

    return await this.newsRepository.find({
      relations: ['newsStatus', 'newsStatus.newsStatusType'],
      // where: {
      //   newsStatus: {
      //     newsStatusType: newsStatusActivo
      //   }
      // }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  async remove(id: number) {

    const news = await this.newsRepository.findOne({
      relations: ['newsStatus', 'newsStatus.newsStatusType'],
      where: {id: id}
    })

    if(!news) throw new NotFoundException('No existe una publicación con id = ' + id)
    const newsStatusInactivo = await this.typeService.findTypeByCode('NSInactivo',);

    const newsStatus = this.newsStatusRepository.create({
      newsStatusType: newsStatusInactivo,
    });

    news.newsStatus.push(newsStatus)

    let newsFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        newsFinal = await transaction.save(news);
      } catch (error) {
        throw new Error(error);
      }
    });

    return newsFinal;
  }
}
