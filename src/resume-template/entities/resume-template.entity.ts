import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ResumeTemplateEntity {
  // id 自增
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'resume_template_id',
    comment: '主键id',
  })
  resumeTemplateId: number;

  // 简历模板名称
  @Column({
    type: 'varchar',
    length: 255,
    name: 'resume_template_name',
    comment: '简历模板名称',
  })
  resumeTemplateName: string;

  // 简历模板内容
  @Column({
    type: 'json',
    name: 'resume_template_content',
    nullable: false,
    comment: '简历模板内容',
  })
  resumeTemplateContent: object;

  // 创建时间
  @CreateDateColumn({
    type: 'datetime',
    name: 'resume_template_create_time',
    comment: '创建时间',
  })
  resumeTemplateCreateTime: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'datetime',
    name: 'resume_template_update_time',
    comment: '更新时间',
  })
  resumeTemplateUpdateTime: Date;
}
