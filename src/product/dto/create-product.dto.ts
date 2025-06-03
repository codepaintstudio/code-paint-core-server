import { IsNotEmpty, IsString, IsUrl, IsNumber, Min, Max } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  introduce: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Product link must be a valid URL' })
  link: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  status: number;
}
