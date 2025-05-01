import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ArticleEntity } from '../../article/entities/article.entity';
import { ResumeEntity } from '../../resume/entities/resume.entity';

@Entity('users') // 表名设置为 'users'
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number; // 主键，自增

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    nullable: false,
  })
  createTime: Date; // 创建时间

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    nullable: false,
  })
  updateTime: Date; // 更新时间

  @Column({
    type: 'varchar',
    length: 20,
    name: 'create_by',
    nullable: false,
  })
  createBy: string; // 创建人

  @Column({
    type: 'varchar',
    length: 20,
    name: 'update_by',
    nullable: false,
  })
  updateBy: string; // 更新人

  @Column({
    type: 'varchar',
    length: 100,
    name: 'user_email',
    nullable: false,
    unique: true,
  })
  userEmail: string; // 用户邮箱

  @Column({
    type: 'varchar',
    length: 25,
    name: 'user_phone_number',
    nullable: true,
    unique: true,
  })
  userPhoneNumber?: string; // 用户手机号，可为空

  @Column({
    type: 'int',
    name: 'user_auth',
    nullable: false,
    default: 1, // 默认值为 1（普通用户），2（管理员）
  })
  userAuth: number; // 用户权限

  @Column({
    type: 'int',
    name: 'user_resume_id',
    nullable: true,
  })
  userResumeId?: number; // 用户简历 ID

  @Column({
    type: 'int',
    name: 'user_status',
    nullable: false,
    default: 1, // 默认值为 1（正常状态）
  })
  userStatus: number; // 用户状态

  @Column({
    type: 'int',
    name: 'user_email_id',
    nullable: true,
  })
  userEmailId?: number; // 用户邮箱 ID

  @Column({
    type: 'varchar',
    length: 30,
    name: 'last_login_ip',
    nullable: true,
  })
  lastLoginIp?: string; // 最后登录 IP，可为空

  @Column({
    type: 'varchar',
    length: 30,
    name: 'user_name',
    unique: true,
  })
  userName: string; // 用户名

  @Column({
    type: 'int',
    name: 'sex',
    nullable: false,
    default: 0, // 默认0未知，1男，2女
  })
  sex: number; // 性别

  @Column({
    type: 'varchar',
    length: 30,
    name: 'user_password',
  })
  userPassword: string; // 用户密码

  @Column({
    type: 'varchar',
    name: 'avatar',
    default: ''
  })
  avatar: string; // 头像

  // 关联文章，一个用户可以有多篇文章
  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  // 关联简历，一个用户可以有多个简历
  @OneToMany(() => ResumeEntity, (resume) => resume.user)
  resumes: ResumeEntity[];
}
