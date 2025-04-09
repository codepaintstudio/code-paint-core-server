import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 查询简历列表的数据传输对象
 */
export class QueryRecruitmentDto {
  /**
   * 页码，默认为1
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小值为1' })
  page?: number = 1;

  /**
   * 每页条数，默认为10，最大为100
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '每页条数必须是整数' })
  @Min(1, { message: '每页条数最小值为1' })
  @Max(100, { message: '每页条数最大值为100' })
  limit?: number = 10;

  /**
   * 求职类型
   * 1: 前端部门, 2: UI部门, 3: 办公部门
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '求职类型必须是整数' })
  @Min(1, { message: '求职类型最小值为1' })
  @Max(3, { message: '求职类型最大值为3' })
  type?: number;

  /**
   * 简历状态
   * 1: 未处理, 2: 淘汰, 3: 面试, 4: 通过面试
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '简历状态必须是整数' })
  @Min(1, { message: '简历状态最小值为1' })
  @Max(4, { message: '简历状态最大值为4' })
  status?: number;

  /**
   * 开始时间
   */
  @IsOptional()
  @IsDateString({}, { message: '开始时间格式不正确，应为ISO格式的日期字符串' })
  startTime?: string;

  /**
   * 结束时间
   */
  @IsOptional()
  @IsDateString({}, { message: '结束时间格式不正确，应为ISO格式的日期字符串' })
  endTime?: string;
}
