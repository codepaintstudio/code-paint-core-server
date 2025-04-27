import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  private uploadDir: string;
  private baseUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    
    // 确保上传目录存在
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<Upload> {
    try {
      // 生成文件hash
      const hash = crypto.createHash('sha256')
        .update(file.buffer)
        .digest('hex');

      // 生成文件名（使用原始文件扩展名）
      const ext = path.extname(file.originalname);
      const key = `${hash}${ext}`;
      const filePath = path.join(this.uploadDir, key);

      // 保存文件
      await fs.promises.writeFile(filePath, file.buffer);

      // 创建上传记录
      const upload = new Upload();
      upload.hash = hash;
      upload.key = key;
      upload.url = `/uploads/${key}`;

      // 保存到数据库
      return await this.uploadRepository.save(upload);
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('File upload failed: ' + error.message);
    }
  }

  async getFiles(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await this.uploadRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
