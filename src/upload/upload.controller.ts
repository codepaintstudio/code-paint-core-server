import { Controller, Post, Get, UploadedFile, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Upload } from './entities/upload.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Upload> {
    return this.uploadService.uploadFile(file);
  }

  @Get()
  async getFiles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.uploadService.getFiles(page, limit);
  }
}
