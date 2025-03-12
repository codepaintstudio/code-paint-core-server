import { IsEmail, IsOptional, IsString, Length, IsInt } from 'class-validator';

export class CreateUsercenterDto {
  @IsEmail({}, { message: '无效的邮箱格式' })
  userEmail: string; // 用户邮箱

  @IsOptional()
  @IsString()
  @Length(10, 20, { message: '手机号长度应在 10 到 20 个字符之间' })
  userPhoneNumber?: string; // 用户手机号，可为空

  @IsInt({ message: '用户权限必须是整数' })
  userAuth: number; // 用户权限，默认值为 1

  @IsInt({ message: '用户简历 ID 必须是整数' })
  userResumeId: number; // 用户简历 ID

  @IsInt({ message: '用户状态必须是整数' })
  userStatus: number; // 用户状态，默认值为 1

  @IsInt({ message: '用户邮箱 ID 必须是整数' })
  userEmailId: number; // 用户邮箱 ID

  @IsOptional()
  @IsString()
  @Length(7, 30, { message: 'IP 地址长度应在 7 到 30 个字符之间' })
  lastLoginIp?: string; // 最后登录 IP，可为空

  @IsString()
  @Length(1, 20, { message: '创建人长度应在 1 到 20 个字符之间' })
  createBy: string; // 创建人

  @IsString()
  @Length(1, 20, { message: '更新人长度应在 1 到 20 个字符之间' })
  updateBy: string; // 更新人

  @IsString()
  @Length(4, 20, { message: '用户名长度应在 4 到 20 个字符之间' })
  userName: string; // 用户名

  @IsString()
  @Length(6, 30, { message: '用户密码长度应在 6 到 30 个字符之间' })
  userPassword: string; // 用户密码
}
