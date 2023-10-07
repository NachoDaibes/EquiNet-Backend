import { Injectable } from '@nestjs/common';
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

@Injectable()
export class DiscussionService {

  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @InjectRepository(ReplyStatus)
    private readonly replyStatusRepository: Repository<ReplyStatus>,
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

  findOne(id: number) {
    return `This action returns a #${id} discussion`;
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return `This action updates a #${id} discussion`;
  }

  remove(id: number) {
    return `This action removes a #${id} discussion`;
  }
}
