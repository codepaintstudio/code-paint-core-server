import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsOptional()
  @IsObject({ message: 'resumeContent must be an object' })
  resumeContent?: object;
}
