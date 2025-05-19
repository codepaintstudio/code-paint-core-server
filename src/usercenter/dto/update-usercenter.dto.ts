import { PartialType } from '@nestjs/mapped-types';
import { CreateUsercenterDto } from './create-usercenter.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateUsercenterDto extends PartialType(CreateUsercenterDto) {
  // 添加 userAuth 字段
  @IsOptional()
  @IsInt({ message: '权限必须是整数' })
  @Min(1, { message: '权限最小为1' })
  @Max(3, { message: '权限最大为3' })
  userAuth: number;
}
