import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { TypeService } from 'src/type/type.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Discussion } from 'src/entities/discussion.entity';
import { DiscussionStatus } from 'src/entities/discussionStatus.entity';
import { ReplyDiscussionDto } from './dto/replyDiscussion.dto';
import { Reply } from 'src/entities/reply.entity';
import { ReplyStatus } from 'src/entities/replyStatus.entity';
import { Topic } from 'src/entities/topic.entity';
import { User } from 'src/entities/user.entity';

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
    @InjectEntityManager()
    private entityManager: EntityManager,
    private typeService: TypeService
  ){}

  async createDiscussion(createDiscussionDto: CreateDiscussionDto) {
    const discussionStatusActivo = await this.typeService.findTypeByCode('DiscussionSActivo');
    const author = await this.userRepository.findOne({
      where: {
        id: createDiscussionDto.author.id
      }
    })

    if(!author) throw new HttpException('No existe un usuario con id = ' + createDiscussionDto.author.id, HttpStatus.NOT_FOUND)

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

  async replyDiscussion(replyDiscussionDto: ReplyDiscussionDto){
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

  findAllTopics(){
    return this.topicRepository.find()
  }

  async findAllDiscussions() {
    const discussionStatusActivo = await this.typeService.findTypeByCode('DiscussionSActivo');
    
    return await this.discussionRepository.find({
      relations: ['discussionStatus',
                  'discussionStatus.discussionStatusType',
                  'discussionStatus.discussionStatusReasonType',
                  'topic',
                  'author',
                  'reply'
                ],
      where: {
        discussionStatus: {
          discussionStatusType: discussionStatusActivo
        }
      }
    })
  }
  
  async findOneDiscussion(id: number) {    
    const discussion: Discussion = await this.discussionRepository.findOne({
      relations: ['discussionStatus',
                  'discussionStatus.discussionStatusType',
                  'discussionStatus.discussionStatusReasonType',
                  'topic',
                  'author',
                  'reply'
                ],
      where: {
        id: id,
      }
    })

    if(!discussion) throw new HttpException('No existe una publicación con id = ' + id, HttpStatus.NOT_FOUND)

    return discussion
  }

  async findAllDiscussionsByTopic(topicId: number){

    const discussionStatusActivo = await this.typeService.findTypeByCode('DiscussionSActivo');
    const topic = await this.topicRepository.findOne({
      where: {
        id: topicId
      }
    })

    if(!topic) throw new HttpException('No existe un tema con id = ' + topicId, HttpStatus.NOT_FOUND)

    try {
      const discussions = await this.discussionRepository.find({
        relations: ['discussionStatus',
                  'discussionStatus.discussionStatusType',
                  'discussionStatus.discussionStatusReasonType',
                  'topic',
                  'author',
                  'reply'
                ],
        where: {
          topic: {
            id: topicId
          },
          discussionStatus: {
            discussionStatusType: discussionStatusActivo
          }
        }
      })
      return discussions
    } catch (error) {
      throw new error
    }
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return `This action updates a #${id} discussion`;
  }

  remove(id: number) {
    return `This action removes a #${id} discussion`;
  }
}
