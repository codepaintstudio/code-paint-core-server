import { Test, TestingModule } from '@nestjs/testing';
import { UsercenterController } from './usercenter.controller';
import { UsercenterService } from './usercenter.service';

describe('UsercenterController', () => {
  let controller: UsercenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercenterController],
      providers: [UsercenterService],
    }).compile();

    controller = module.get<UsercenterController>(UsercenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
