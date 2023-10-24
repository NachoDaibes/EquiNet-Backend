import { Test, TestingModule } from '@nestjs/testing';
import { AbmController } from './abm.controller';
import { AbmService } from './abm.service';

describe('AbmController', () => {
  let controller: AbmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbmController],
      providers: [AbmService],
    }).compile();

    controller = module.get<AbmController>(AbmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
