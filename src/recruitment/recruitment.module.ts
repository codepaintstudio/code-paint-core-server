import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentEntity } from './entities/recruiment.entity';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecruitmentEntity, UserEntity]),
  ],
  controllers: [RecruitmentController],
  providers: [RecruitmentService]
})
export class RecruitmentModule {}
