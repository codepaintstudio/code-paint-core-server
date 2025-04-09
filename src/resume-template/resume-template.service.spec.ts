import { Test, TestingModule } from '@nestjs/testing';
import { ResumeTemplateService } from './resume-template.service';

describe('ResumeTemplateService', () => {
  let service: ResumeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeTemplateService],
    }).compile();

    service = module.get<ResumeTemplateService>(ResumeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
