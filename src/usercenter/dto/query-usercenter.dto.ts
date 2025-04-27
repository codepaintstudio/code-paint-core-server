import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 查询用户列表的数据传输对象
 */
export class QueryUsercenterDto {
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
   * 用户角色
   * 1: 普通用户, 2: 管理员
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '用户角色必须是整数' })
  @Min(1, { message: '用户角色最小值为1' })
  @Max(2, { message: '用户角色最大值为2' })
  role?: number;

  /**
   * 性别
   * 0: 未知, 1: 男, 2: 女
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '性别必须是整数' })
  @Min(0, { message: '性别值最小为0' })
  @Max(2, { message: '性别值最大为2' })
  sex?: number;
}
