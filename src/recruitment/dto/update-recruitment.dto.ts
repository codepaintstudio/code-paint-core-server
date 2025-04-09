import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 更新简历信息的数据传输对象
 */
export class UpdateRecruitmentDto {
  /**
   * 简历状态
   * 1: 未处理, 2: 淘汰, 3: 面试, 4: 通过面试
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '简历状态必须是整数' })
  @Min(1, { message: '简历状态最小值为1' })
  @Max(4, { message: '简历状态最大值为4' })
  officialResumeStatus?: number;

  /**
   * 简历反馈信息
   */
  @IsOptional()
  @IsString({ message: '反馈信息必须是字符串' })
  officialFeedbackInfromation?: string;

  /**
   * 简历文件地址
   */
  @IsOptional()
  @IsString({ message: '简历文件地址必须是字符串' })
  resumeFilePath?: string;
}
