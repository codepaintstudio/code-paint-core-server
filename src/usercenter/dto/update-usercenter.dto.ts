import { PartialType } from '@nestjs/mapped-types';
import { CreateUsercenterDto } from './create-usercenter.dto';

export class UpdateUsercenterDto extends PartialType(CreateUsercenterDto) {}
