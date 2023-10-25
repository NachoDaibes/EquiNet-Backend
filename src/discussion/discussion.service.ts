import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { TypeService } from 'src/type/type.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';
import { Discussion } from 'src/entities/discussion.entity';
import { DiscussionStatus } from 'src/entities/discussionStatus.entity';
import { ReplyDiscussionDto } from './dto/replyDiscussion.dto';
import { Reply } from 'src/entities/reply.entity';
import { ReplyStatus } from 'src/entities/replyStatus.entity';
import { Topic } from 'src/entities/topic.entity';
import { User } from 'src/entities/user.entity';
import { DiscussionLikesDto } from './dto/discussionLikes.dto';
import { DiscussionLikes } from 'src/entities/discussionLikes.entity';
import { ReplyLikesDto } from './dto/replyLikes.dto';
import { ReplyLikes } from 'src/entities/replyLikes.entity';
import { CreateReportDto } from './dto/createReport.dto';
import { Report } from 'src/entities/report.entity';
import { Type } from 'src/entities/type.entity';
import { CreateReportReplyDto } from './dto/createReportReply.dto';
import { Bookmark } from 'src/entities/bookmark.entity';
import { UpdateReplyDto } from './dto/updateReply.dto';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @InjectRepository(ReplyStatus)
    private readonly replyStatusRepository: Repository<ReplyStatus>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(DiscussionStatus)
    private readonly discussionStatusRepository: Repository<DiscussionStatus>,
    @InjectRepository(DiscussionLikes)
    private readonly discussionLikesRepository: Repository<DiscussionLikes>,
    @InjectRepository(ReplyLikes)
    private readonly replyLikesRepository: Repository<ReplyLikes>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private typeService: TypeService,
  ) {}

  async createDiscussion(createDiscussionDto: CreateDiscussionDto) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );
    const author = await this.userRepository.findOne({
      where: {
        id: createDiscussionDto.author.id,
      },
    });

    if (!author)
      throw new HttpException(
        'No existe un usuario con id = ' + createDiscussionDto.author.id,
        HttpStatus.NOT_FOUND,
      );

    const discussion = this.discussionRepository.create(createDiscussionDto);

    const discussionStatus = this.discussionStatusRepository.create({
      discussionStatusType: discussionStatusActivo,
    });

    discussion.discussionStatus = [discussionStatus];

    let discussionFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        discussionFinal = await transaction.save(discussion);
      } catch (error) {
        throw new Error(error);
      }
    });

    return discussionFinal;
  }

  async replyDiscussion(replyDiscussionDto: ReplyDiscussionDto) {
    const replyStatusActivo = await this.typeService.findTypeByCode('RSActivo');

    const reply = this.replyRepository.create(replyDiscussionDto);

    const replyStatus = this.replyStatusRepository.create({
      replyStatusType: replyStatusActivo,
    });

    reply.replyStatus = [replyStatus];

    let replyFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        replyFinal = await transaction.save(reply);
      } catch (error) {
        throw new Error(error);
      }
    });

    return replyFinal;
  }

  findAllTopics() {
    return this.topicRepository.find();
  }

  async findAllDiscussions() {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );

    return await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
      ],
      where: {
        discussionStatus: {
          discussionStatusType: discussionStatusActivo,
        },
      },
    });
  }

  async findOneDiscussion(id: number) {
    const discussion: Discussion = await this.discussionRepository.findOne({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
      ],
      where: {
        id: id,
      },
    });

    if (!discussion)
      throw new HttpException(
        'No existe una publicación con id = ' + id,
        HttpStatus.NOT_FOUND,
      );

    return discussion;
  }

  async findAllDiscussionsByTopic(topicId: number) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );
    const topic = await this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });

    if (!topic)
      throw new HttpException(
        'No existe un tema con id = ' + topicId,
        HttpStatus.NOT_FOUND,
      );

    try {
      const discussions = await this.discussionRepository.find({
        relations: [
          'discussionStatus',
          'discussionStatus.discussionStatusType',
          'discussionStatus.discussionStatusReasonType',
          'topic',
          'author',
          'reply',
          'reply.author',
        ],
        where: {
          topic: {
            id: topicId,
          },
          discussionStatus: {
            discussionStatusType: discussionStatusActivo,
          },
        },
      });
      return discussions;
    } catch (error) {
      throw new error();
    }
  }

  async discussionLikes(discussionLikesDto: DiscussionLikesDto) {
    const user = await this.userRepository.findOne({
      where: { id: discussionLikesDto.user.id },
    });
    const discussion = await this.discussionRepository.findOne({
      where: {
        id: discussionLikesDto.discussion.id,
      },
    });
    console.log(user, discussion);

    if (!user) {
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!discussion) {
      throw new HttpException(
        'No existe una discusión con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    }

    const discussionLikes =
      this.discussionLikesRepository.create(discussionLikesDto);

    let finalDiscussionLikes;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalDiscussionLikes = await transaction.save(discussionLikes);
      } catch (error) {
        throw new Error(error);
      }
    });
    return finalDiscussionLikes;
  }

  async replyLikes(replyLikesDto: ReplyLikesDto) {
    const user = await this.userRepository.findOne({
      where: { id: replyLikesDto.user.id },
    });
    const reply = await this.replyRepository.findOne({
      where: {
        id: replyLikesDto.reply.id,
      },
    });

    if (!user)
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    if (!reply)
      throw new HttpException(
        'No existe una respuesta con el id ingresado',
        HttpStatus.NOT_FOUND,
      );

    const replyLike = this.replyLikesRepository.create(replyLikesDto);

    let finalReplyLikes;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalReplyLikes = await transaction.save(replyLike);
      } catch (error) {
        throw new Error(error);
      }
    });
    return finalReplyLikes;
  }

  async findDiscussionByTitle(title: string) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );
    let finalTitle = title.split('$25').join(' ');

    const discussions = await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
      ],
      where: {
        title: Like(`%${finalTitle}%`),
        discussionStatus: {
          discussionStatusType: discussionStatusActivo,
        },
      },
    });

    return discussions;
  }

  async findAllLikedDiscussion(user: number) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );
    const discussions = await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
      ],
      where: {
        discussionStatus: {
          discussionStatusType: discussionStatusActivo,
        },
        discussionLikes: {
          user: {
            id: user,
          },
        },
      },
    });

    return discussions;
  }

  async findAllBookmarkedDiscussions(user: number) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );
    const discussions = await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
      ],
      where: {
        discussionStatus: {
          discussionStatusType: discussionStatusActivo,
        },
        bookmark: {
          user: {
            id: user,
          },
        },
      },
    });

    return discussions;
  }

  async reportDiscussion(createReportDto: CreateReportDto) {
    if (!createReportDto.discussion)
      throw new BadRequestException('El id de la discusión es obligatorio');
    const reportType = await this.typeRepository.findOne({
      where: { code: createReportDto.reason.code },
    });
    const discussion = await this.discussionRepository.findOne({
      where: { id: createReportDto.discussion.id },
    });
    const user = await this.userRepository.findOne({
      where: { id: createReportDto.user.id },
    });

    if (!user)
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    if (!reportType)
      throw new HttpException(
        'No existe una razón de reporte con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    if (!discussion)
      throw new HttpException(
        'No existe una discusión con el id ingresado',
        HttpStatus.NOT_FOUND,
      );

    const reportDiscussion = this.reportRepository.create(createReportDto);
    reportDiscussion.reason = reportType;
    let finalReport;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalReport = await transaction.save(reportDiscussion);
      } catch (error) {
        throw new Error(error);
      }
    });
    return finalReport;
  }

  async reportReply(createReporDto: CreateReportDto) {
    if (!createReporDto.reply)
      throw new BadRequestException('El id de la respuesta es obligatorio');
    const reportType = await this.typeRepository.findOne({
      where: { code: createReporDto.reason.code },
    });
    const reply = await this.replyRepository.findOne({
      where: { id: createReporDto.reply.id },
    });
    const user = await this.userRepository.findOne({
      where: { id: createReporDto.user.id },
    });

    if (!user)
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    if (!reportType)
      throw new HttpException(
        'No existe una razón de reporte con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    if (!reply)
      throw new HttpException(
        'No existe una respuesta con el id ingresado',
        HttpStatus.NOT_FOUND,
      );

    const reportReply = this.reportRepository.create(createReporDto);
    reportReply.reason = reportType;

    let finalReport;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalReport = await transaction.save(reportReply);
      } catch (error) {
        throw new Error(error);
      }
    });
    return finalReport;
  }

  async createBookmark(createBookmarkDto: DiscussionLikesDto) {
    const user = await this.userRepository.findOne({
      where: { id: createBookmarkDto.user.id },
    });
    const discussion = await this.discussionRepository.findOne({
      where: {
        id: createBookmarkDto.discussion.id,
      },
    });
    if (!user) {
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!discussion) {
      throw new HttpException(
        'No existe una discusión con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    }

    const bookmark = this.bookmarkRepository.create(createBookmarkDto);

    let finalBookmark;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalBookmark = await transaction.save(bookmark);
      } catch (error) {
        throw new Error(error);
      }
    });
    return finalBookmark;
  }

  async updateDiscussion(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    const discussion = await this.discussionRepository.findOne({
      where: { id: id },
    });
    if (!discussion)
      throw new BadRequestException(
        'No existe una discusión con el id ingresado',
      );

    const discussionToUpdate = await this.discussionRepository.preload({
      id,
      ...updateDiscussionDto,
    });

    let discussionFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        discussionFinal = await transaction.save(discussionToUpdate);
      } catch (error) {
        throw new Error(error);
      }
    });

    return discussionFinal;
  }

  async updateReply(id: number, updateReplyDto: UpdateReplyDto) {
    const reply = await this.replyRepository.findOne({ where: { id: id } });
    if (!reply)
      throw new BadRequestException(
        'No existe una respuesta con el id ingresado',
      );

    const replyToUpdate = await this.replyRepository.preload({
      id,
      ...updateReplyDto,
    });

    let finalReply;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalReply = await transaction.save(replyToUpdate);
      } catch (error) {
        throw new Error(error);
      }
    });

    return finalReply;
  }

  async removeDiscussion(id: number) {
    const discussionStatusActivo = await this.typeService.findTypeByCode(
      'DiscussionSActivo',
    );

    const discussion = await this.discussionRepository.findOne({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
      ],
      where: {
        discussionStatus: {
          discussionStatusType: discussionStatusActivo,
        },
        id: id,
      },
    });

    if (!discussion) {
      throw new BadRequestException('No existe una publicación con id = ' + id);
    }

    const discussionStatusInactivo = await this.typeService.findTypeByCode(
      'DiscussionSInactivo',
    );

    const discussionStatus = this.discussionStatusRepository.create({
      discussionStatusType: discussionStatusInactivo,
    });

    discussion.discussionStatus.push(discussionStatus);

    let discussionFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        discussionFinal = await transaction.save(discussion);
      } catch (error) {
        throw new Error(error);
      }
    });

    return discussionFinal;
  }

  async removeReply(id: number) {
    const replyStatusActivo = await this.typeService.findTypeByCode(
      'replySActivo',
    );

    const reply = await this.replyRepository.findOne({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
      ],
      where: {
        replyStatus: {
          replyStatusType: replyStatusActivo,
        },
        id: id,
      },
    });

    if (!reply) {
      throw new BadRequestException('No existe una respuesta con id = ' + id);
    }

    const replyStatusInactivo = await this.typeService.findTypeByCode(
      'RSInactivo',
    );

    const replyStatus = this.replyStatusRepository.create({
      replyStatusType: replyStatusInactivo,
    });

    reply.replyStatus.push(replyStatus);

    let replyFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        replyFinal = await transaction.save(reply);
      } catch (error) {
        throw new Error(error);
      }
    });

    return replyFinal;
  }
}
