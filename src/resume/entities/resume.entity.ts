import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../../usercenter/entities/usercenter.entity';

@Entity('resume')
export class ResumeEntity {
  // id 自增
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'resume_id',
    comment: '简历id',
  })
  resumeId: number;

  // 用户ID
  @Column({
    type: 'int',
    name: 'resume_user_id',
  })
  resumeUserId: number;

  // 简历内容
  @Column({
    type: 'json',
    name: 'resume_content',
    comment: '简历内容',
  })
  resumeContent: object;

  // 创建时间
  @CreateDateColumn({
    type: 'datetime',
    name: 'resume_create_time',
    comment: '简历创建时间',
  })
  resumeCreateTime: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'datetime',
    name: 'resume_update_time',
    comment: '简历更新时间',
  })
  resumeUpdateTime: Date;

  // 关联用户表，一个用户可以有多个简历
  @ManyToOne(() => UserEntity, (user) => user.resumes, { nullable: false })
  @JoinColumn({
    name: 'resume_user_id',
  })
  user: UserEntity;
}
