import {
  IsArray,
  IsString,
} from "class-validator";

export class ChangelogDto {
  @IsString()
  version!: string;

  @IsString()
  date!: string;

  @IsArray()
  @IsString({ each: true })
  changes!: string[];
}