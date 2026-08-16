import {
  IsIn,
  IsString,
} from "class-validator";

export class IncludedFileDto {
  @IsString()
  name!: string;

  @IsIn(["file", "folder"])
  type!: "file" | "folder";
}