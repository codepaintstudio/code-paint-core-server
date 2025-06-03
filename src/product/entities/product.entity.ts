import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    // 产品名字
    @Column()
    name: string;

    // 产品介绍
    @Column()
    introduce: string;

    // 产品logo
    @Column()
    logo: string;

    // 产品封面
    @Column()
    cover: string;

    // 产品链接
    @Column()
    link: string;

    // 产品状态， 0: 不展示， 1: 展示
    @Column()
    status: number;

    // 创建时间
    @CreateDateColumn()
    createdAt: Date;

    // 更新时间
    @UpdateDateColumn()
    updatedAt: Date;
}
