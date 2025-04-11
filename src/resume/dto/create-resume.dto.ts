import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateResumeDto {
  @IsObject({ message: 'resumeContent must be an object' })
  @IsNotEmpty({ message: 'resumeContent must be provided' })
  resumeContent: object;
}
