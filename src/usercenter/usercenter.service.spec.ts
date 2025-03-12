import { Test, TestingModule } from '@nestjs/testing';
import { UsercenterService } from './usercenter.service';

describe('UsercenterService', () => {
  let service: UsercenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercenterService],
    }).compile();

    service = module.get<UsercenterService>(UsercenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
