import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'file_id',
  })
  fileId: number;

  @Column({
    type: 'varchar',
    name: 'file_name',
    length: 255,
  })
  fileName: string;

  @Column({
    type: 'varchar',
    name: 'file_url',
    length: 255,
  })
  fileUrl: string;

  @Column({
    type: 'varchar',
    name: 'file_type',
    length: 255,
  })
  fileType: string;

  @CreateDateColumn({
    name: 'upload_date',
    nullable: false,
  })
  uploadDate: Date;
}
