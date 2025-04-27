import { RecruitmentEntity } from '../entities/recruiment.entity';

/**
 * 简历投递响应数据传输对象
 */
export class RecruitmentResponseDto {
  /**
   * 简历ID
   */
  officialResumeId: number;

  /**
   * 用户ID
   */
  userId: number;

  /**
   * 求职类型
   * 1: 前端部门, 2: UI部门, 3: 办公部门
   */
  recrType: number;

  /**
   * 求职类型文本描述
   */
  recrTypeText: string;

  /**
   * 简历状态
   * 1: 未处理, 2: 淘汰, 3: 面试, 4: 通过面试
   */
  officialResumeStatus: number;

  /**
   * 简历状态文本描述
   */
  officialResumeStatusText: string;

  /**
   * 简历反馈信息
   */
  officialFeedbackInfromation: string;

  /**
   * 简历文件地址
   */
  resumeFilePath: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;

  /**
   * 邮件地址
   */
  email: string;

  /**
   * 电话号码
   */
  phone: string;

  constructor(recruitment: RecruitmentEntity) {
    this.officialResumeId = recruitment.officialResumeId;
    this.userId = recruitment.userId;
    this.recrType = recruitment.recrType;
    this.recrTypeText = this.getRecrTypeText(recruitment.recrType);
    this.officialResumeStatus = recruitment.officialResumeStatus;
    this.officialResumeStatusText = this.getStatusText(
      recruitment.officialResumeStatus,
    );
    this.officialFeedbackInfromation = recruitment.officialFeedbackInfromation;
    this.resumeFilePath = recruitment.resumeFilePath;
    this.createTime = recruitment.createTime;
    this.updateTime = recruitment.updateTime;
    this.email = recruitment.email;
    this.phone = recruitment.phone;
  }

  /**
   * 获取求职类型文本描述
   * @param type 求职类型
   * @returns 求职类型文本描述
   */
  private getRecrTypeText(type: number): string {
    const typeMap = {
      1: '前端部门',
      2: 'UI部门',
      3: '办公部门',
    };
    return typeMap[type] || '未知类型';
  }

  /**
   * 获取简历状态文本描述
   * @param status 简历状态
   * @returns 简历状态文本描述
   */
  private getStatusText(status: number): string {
    const statusMap = {
      1: '未处理',
      2: '淘汰',
      3: '面试',
      4: '通过面试',
    };
    return statusMap[status] || '未知状态';
  }
}
