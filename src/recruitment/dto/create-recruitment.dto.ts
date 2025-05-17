import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

/**
 * 创建简历投递的数据传输对象
 */
export class CreateRecruitmentDto {
  /**
   * 用户ID
   */
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;

  /**
   * 邮件地址
   */
  @IsString({ message: '邮件地址必须是字符串' })
  @IsNotEmpty({ message: '邮件地址不能为空' })
  @IsEmail({}, { message: '邮件地址格式不正确' })
  email: string;

  /**
   * 电话号
   */
  @IsString({ message: '手机号必须是字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  /**
   * 求职类型
   * 1: 前端部门, 2: UI部门, 3: 办公部门
   */
  @IsNotEmpty({ message: '求职类型不能为空' })
  recrType: number;

  /**
   * 简历文件地址
   */
  @IsString({ message: '简历文件地址必须是字符串' })
  @IsNotEmpty({ message: '简历文件地址不能为空' })
  @IsOptional()
  resumeFilePath?: string;

  /**
   * 投递者姓名
   */
  @IsString({ message: '姓名必须是字符串' })
  @IsNotEmpty({ message: '姓名不能为空' })
  userName: string;
}
