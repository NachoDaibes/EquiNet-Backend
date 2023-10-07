import { IsNotEmpty, IsString } from "class-validator";


export class ImageDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  image: string;
}