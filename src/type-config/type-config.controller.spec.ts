import { Test, TestingModule } from '@nestjs/testing';
import { TypeConfigController } from './type-config.controller';
import { TypeConfigService } from './type-config.service';

describe('TypeConfigController', () => {
  let controller: TypeConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeConfigController],
      providers: [TypeConfigService],
    }).compile();

    controller = module.get<TypeConfigController>(TypeConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
