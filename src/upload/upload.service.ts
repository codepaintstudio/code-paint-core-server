import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as qiniu from 'qiniu';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  private mac: qiniu.auth.digest.Mac;
  private config: qiniu.conf.Config;
  private bucketManager: qiniu.rs.BucketManager;
  private uploadToken: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {
    // 初始化七牛云配置
    this.mac = new qiniu.auth.digest.Mac(
      this.configService.get('kodo.ACCESS_KEY'),
      this.configService.get('kodo.SECRET_KEY'),
    );
    this.config = new qiniu.conf.Config();
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: this.configService.get('kodo.BUCKET'),
    });
    this.uploadToken = putPolicy.uploadToken(this.mac);
  }

  async uploadFile(file: Express.Multer.File) {
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    
    return new Promise<Upload>((resolve, reject) => {
      formUploader.put(
        this.uploadToken,
        null, // 使用七牛云生成的文件名
        file.buffer,
        putExtra,
        async (err, body, info) => {
          if (err) {
            reject(err);
            return;
          }
          if (info.statusCode === 200) {
            const baseUrl = this.configService.get('kodo.BASE_URL');
            const upload = new Upload();
            upload.hash = body.hash;
            upload.key = body.key;
            upload.url = `${baseUrl}/${body.key}`;
            
            const savedUpload = await this.uploadRepository.save(upload);
            resolve(savedUpload);
          } else {
            reject(new Error('Upload failed'));
          }
        },
      );
    });
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
