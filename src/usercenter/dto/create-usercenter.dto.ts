import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUsercenterDto {
  @IsString()
  @Length(4, 20, { message: '用户名长度应在 4 到 20 个字符之间' })
  userName: string; // 用户名

  @IsString()
  @Length(6, 30, { message: '密码长度应在 6 到 30 个字符之间' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '密码必须包含大小写字母和数字',
  })
  userPassword: string; // 用户密码

  @IsString()
  @Length(6, 30, { message: '确认密码长度应在 6 到 30 个字符之间' })
  confirmPassword: string; // 确认密码

  @IsEmail({}, { message: '无效的邮箱格式' })
  userEmail: string; // 用户邮箱
}
