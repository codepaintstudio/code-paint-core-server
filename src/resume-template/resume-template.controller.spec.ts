import { Test, TestingModule } from '@nestjs/testing';
import { ResumeTemplateController } from './resume-template.controller';
import { ResumeTemplateService } from './resume-template.service';

describe('ResumeTemplateController', () => {
  let controller: ResumeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeTemplateController],
      providers: [ResumeTemplateService],
    }).compile();

    controller = module.get<ResumeTemplateController>(ResumeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
