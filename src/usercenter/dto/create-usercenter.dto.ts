export class CreateUsercenterDto {
  userId: number; // 主键，自增

  createTime: Date; // 创建时间

  updateTime: Date; // 更新时间

  createBy: string; // 创建人

  updateBy: string; // 更新人

  userEmail: string; // 用户邮箱

  userPhoneNumber?: string; // 用户手机号，可为空

  userAuth: number; // 用户权限

  userResumeId: number; // 用户简历 ID

  userStatus: number; // 用户状态

  userEmailId: number; // 用户邮箱 ID

  lastLoginIp?: string; // 最后登录 IP，可为空
}
