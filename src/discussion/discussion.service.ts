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
import { disconnect } from 'process';

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
    return this.topicRepository.find({
      relations: [
        'topicStatus',
        'topicStatus.topicStatusType',
        'topicStatus.topicStatusReasonType',
      ],
    });
  }

  async findAllDiscussions(userId: number) {
    let isLikedByUser: boolean = false;

    const discussions: any = await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
        'discussionLikes',
        'discussionLikes.user',
        'discussionLikes.discussion',
      ],
    });

    let finalDiscussions = [];
    for (const discussion of discussions) {
      const likes = await this.discussionRepository.count({
        where: {
          discussionLikes: {
            discussion: {
              id: discussion.id,
            },
          },
        },
      });
      const countReplies = await this.replyRepository.count({
        where: {
          discussion: {
            id: discussion.id,
          },
        },
      });

      for (const discussionLike of discussion.discussionLikes) {
        if (discussionLike.user.id == userId) {
          isLikedByUser = true;
        }
      }

      discussion.isLikedByUser = isLikedByUser;
      finalDiscussions.push({
        discussion: discussion,
        countReplies: countReplies,
        countLikes: likes,
      });
    }

    return finalDiscussions;
  }

  async findOneDiscussion(discussionId: number, userId: number) {
    let thisDiscussionIsLikedByUser: boolean = false;
    let thisDiscussionIsBookmarkedByUser: boolean = false;
    const discussion: any = await this.discussionRepository.findOne({
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
        'reply.replyLikes',
        'reply.replyLikes.user',
        'reply.replyLikes.reply',
        'discussionLikes',
        'discussionLikes.user',
        'discussionLikes.discussion',
        'bookmark',
        'bookmark.user',
      ],
      where: {
        id: discussionId,
      },
    });

    if (!discussion)
      throw new HttpException(
        'No existe una publicación con id = ' + discussionId,
        HttpStatus.NOT_FOUND,
      );

    for (const discussionLike of discussion.discussionLikes) {
      if (discussionLike.user.id == userId) {
        thisDiscussionIsLikedByUser = true;
      }
    }

    for (const bookmark of discussion.bookmark) {
      if (bookmark.user.id == userId) {
        thisDiscussionIsBookmarkedByUser = true;
      }
    }

    for (let i = 0; i < discussion.reply.length; i++) {
      let thisReplyIsLikedByUser: boolean = false;
      for (const replyLikes of discussion.reply[i].replyLikes) {
        if (replyLikes.user.id == userId) {
          thisReplyIsLikedByUser = true;
        }
      }
      discussion.reply[i].thisReplyIsLikedByUser = thisReplyIsLikedByUser;
    }

    discussion.thisDiscussionIsLikedByUser = thisDiscussionIsLikedByUser;
    discussion.thisDiscussionIsBookmarkedByUser =
      thisDiscussionIsBookmarkedByUser;

    return discussion;
  }

  async findOneReply(replyId: number, userId: number) {
    let isLikedByUser: boolean = false;
    const reply: Reply = await this.replyRepository.findOne({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
        'author',
        'discussion',
        'discussion.author',
        'discussion.topic',
        'replyLikes',
        'replyLikes.user',
        'replyLikes.reply',
      ],
      where: {
        id: replyId,
      },
    });

    if (!reply)
      throw new HttpException(
        'No existe una respuesta con id = ' + replyId,
        HttpStatus.NOT_FOUND,
      );

    for (const replyLike of reply.replyLikes) {
      if (replyLike.user.id == userId) {
        isLikedByUser = true;
      }
    }

    return reply;
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
          // discussionStatus: {
          //   discussionStatusType: discussionStatusActivo,
          // },
        },
      });

      return discussions;
    } catch (error) {
      throw new error();
    }
  }

  async discussionCountByTopic(topicId: number) {
    const topic = await this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });

    const discussionsCount = await this.discussionRepository.count({
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
        // discussionStatus: {
        //   discussionStatusType: discussionStatusActivo,
        // },
      },
    });

    return {
      topic: topic,
      cantidad: discussionsCount,
    };
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

    discussion.likes++;
    let finalDiscussionLikes;
    let finalDiscussion;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalDiscussionLikes = await transaction.save(discussionLikes);
        finalDiscussion = await transaction.save(discussion);
      } catch (error) {
        throw new Error(error);
      }
    });
    return {
      finalDiscussionLikes: finalDiscussionLikes,
      discussionLikes: discussion.likes,
    };
  }

  async removeReplyLike(replyId: number, userId: number) {
    const reply = await this.replyRepository.findOne({
      where: {
        id: replyId
      }
    })
    const replyLike: ReplyLikes =
      await this.replyLikesRepository.findOne({
        where: {
          user: {
            id: userId,
          },
          reply: {
            id: replyId,
          },
        },
      });

    if (!replyLike)
      throw new HttpException(
        'El usuario ingreado no le ha dado me gusta a la publicación ' +
          replyId,
        HttpStatus.NOT_FOUND,
      );
    else {
      reply.likes--
      await this.replyLikesRepository.remove(replyLike);
    }
  }
  
  async removeDiscussionLike(discussionId: number, userId: number) {
    const discussion = await this.discussionRepository.findOne({
      where: {
        id: discussionId
      }
    })
    const discussionLike: DiscussionLikes =
      await this.discussionLikesRepository.findOne({
        where: {
          user: {
            id: userId,
          },
          discussion: {
            id: discussionId,
          },
        },
      });

    if (!discussionLike)
      throw new HttpException(
        'El usuario ingreado no le ha dado me gusta a la publicación ' +
          discussionId,
        HttpStatus.NOT_FOUND,
      );
    else {
      discussion.likes--
      await this.discussionLikesRepository.remove(discussionLike);
    }
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
    reply.likes++;

    let finalReplyLikes;
    let replyLikes;
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalReplyLikes = await transaction.save(replyLike);
        replyLikes = await transaction.save(replyLike);
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
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
        'reply.replyStatus.replyStatusReasonType',
      ],
      where: {
        title: Like(`%${finalTitle}%`),
      },
    });

    // let finalDiscussions: Discussion[] = []
    // for (const discussion of discussions) {
    //   if(discussion.discussionStatus[(discussion.discussionStatus.length - 1)]?.discussionStatusType == discussionStatusActivo){
    //     finalDiscussions.push(discussion)
    //   }
    // }

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
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
        'reply.replyStatus.replyStatusReasonType',
      ],
      where: {
        // discussionStatus: {
        //   discussionStatusType: discussionStatusActivo,
        // },
        discussionLikes: {
          user: {
            id: user,
          },
        },
      },
    });

    return discussions;
  }

  async findAllLikedReply(user: number) {
    const replies = await this.replyRepository.find({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
        'author',
        'discussion',
        'discussion.author',
        'discussion.topic',
      ],
      where: {
        replyLikes: {
          user: {
            id: user,
          },
        },
      },
    });
    return replies;
  }

  async findAllUserReplies(user: number) {
    const replies = await this.replyRepository.find({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
        'author',
        'discussion',
        'discussion.author',
        'discussion.topic',
      ],
      where: {
        author: {
          id: user,
        },
      },
    });
    return replies;
  }

  async findAllUserDiscussions(user: number) {
    const discussions = await this.discussionRepository.find({
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
        'reply.replyStatus.replyStatusReasonType',
      ],
      where: {
        author: {
          id: user,
        },
      },
    });

    return discussions;
  }

  async findAllReportedDiscussions() {
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
        'report',
        'report.author',
        'report.reason',
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
        'reply.replyStatus.replyStatusReasonType',
      ],
      // where: {
      //   discussionStatus: {
      //     discussionStatusType: discussionStatusActivo,
      //   },
      // },
    });
    let finalDiscussions: Discussion[] = [];
    discussions.forEach((discussion) => {
      if (discussion.report[0]?.id) {
        finalDiscussions.push(discussion);
      }
    });
    return finalDiscussions;
  }

  async findAllDisussionReports(id: number) {
    const discussions = await this.discussionRepository.find({
      relations: [
        'discussionStatus',
        'discussionStatus.discussionStatusType',
        'discussionStatus.discussionStatusReasonType',
        'topic',
        'author',
        'reply',
        'reply.author',
        'report',
        'report.author',
        'report.reason',
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
        'reply.replyStatus.replyStatusReasonType',
      ],
      where: {
        id: id,
      },
    });

    let finalDiscussions: Discussion[] = [];
    discussions.forEach((discussion) => {
      if (discussion.report[0]?.id) {
        finalDiscussions.push(discussion);
      }
    });
    if (finalDiscussions.length < 1) {
      throw new NotFoundException(
        'La publicación con el id ingresado no tiene reportes',
      );
    }

    return finalDiscussions;
  }

  async findAllReportedReplies() {
    const replies = await this.replyRepository.find({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
        'report',
        'report.author',
        'report.reason',
        'author',
        'discussion',
        'discussion.author',
        'discussion.topic',
      ],
    });

    let finalReplies: Reply[] = [];
    replies.forEach((reply) => {
      if (reply.report[0]?.id) {
        finalReplies.push(reply);
      }
    });

    return finalReplies;
  }

  async findAllReplyReports(id: number) {
    const replies = await this.replyRepository.find({
      relations: [
        'replyStatus',
        'replyStatus.replyStatusType',
        'replyStatus.replyStatusReasonType',
        'report',
        'report.author',
        'report.reason',
        'author',
        'discussion',
        'discussion.author',
        'discussion.topic',
      ],
      where: {
        id: id,
      },
    });

    let finalReplies: Reply[] = [];
    replies.forEach((reply) => {
      if (reply.report[0]?.id) {
        finalReplies.push(reply);
      }
    });

    if (finalReplies.length < 1) {
      throw new NotFoundException(
        'La respuesta con el id ingresado no tiene reportes',
      );
    }

    return finalReplies;
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
        'reply.replyStatus',
        'reply.replyStatus.replyStatusType',
        'reply.replyStatus.replyStatusReasonType',
      ],
      where: {
        // discussionStatus: {
        //   discussionStatusType: discussionStatusActivo,
        // },
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
        // discussionStatus: {
        //   discussionStatusType: discussionStatusActivo,
        // },
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
        // replyStatus: {
        //   replyStatusType: replyStatusActivo,
        // },
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
