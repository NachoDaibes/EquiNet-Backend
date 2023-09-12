import { Test, TestingModule } from '@nestjs/testing';
import { DisabilityController } from './disability.controller';
import { DisabilityService } from './disability.service';

describe('DisabilityController', () => {
  let controller: DisabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisabilityController],
      providers: [DisabilityService],
    }).compile();

    controller = module.get<DisabilityController>(DisabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
