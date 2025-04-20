// 招聘模块数据表
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("recruitment")
export class RecruitmentEntity {
    // 官网简历投递ID
    @PrimaryGeneratedColumn({
        name: 'official_resume_id',
    })
    officialResumeId: number;

    // 用户ID
    @Column({
        name: "user_id",
        nullable: false,
        type: "int",
    })
    userId: number;

    // 求职类型
    @Column({
        name: "recr_type",
        nullable: false,
        type: "int",
        default: 1,
    })
    recrType: number; // 前端部门 1， UI部门 2，办公部门 3

    // 简历投递状态
    @Column({
        name: "official_resume_status",
        nullable: false,
        type: "int",
        default: 1,
    })
    officialResumeStatus: number; // 1. 未处理 2. 淘汰 3. 面试 4. 通过面试

    // 官网简历反馈信息
    @Column({
        name: "official_feedback_infromation",
        nullable: true,
        type: "text",
    })
    officialFeedbackInfromation: string;

    // email
    @Column({
        name: "email",
        nullable: true,
        type: "varchar",
        default: "",
    })
    email: string;

    // 电话号
    @Column({
        name: "phone",
        nullable: true,
        type: "varchar",
        default: "",
    })
    phone: string;

    // 简历文件地址
    @Column({
        name: "resume_file_path",
        nullable: true,
        type: "varchar",
        default: "",
    })
    resumeFilePath: string;

    // 创建时间
    @CreateDateColumn({
        name: "create_time",
        nullable: false,
    })
    createTime: Date;

    // 更新时间
    @UpdateDateColumn({
        name: "update_time",
        nullable: false,
    })
    updateTime: Date;
}
