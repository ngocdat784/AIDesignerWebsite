import { CreateTemplateStyleDto } from "../dto/create-template-style.dto";
import { UpdateTemplateStyleDto } from "../dto/update-template-style.dto";

export interface ITemplateStyleService {
  create(
    createTemplateStyleDto: CreateTemplateStyleDto,
  ): Promise<any>;

  findAll(): Promise<any[]>;

  findActive(): Promise<any[]>;

  findOne(id: string): Promise<any>;

  findBySlug(slug: string): Promise<any>;

  update(
    id: string,
    updateTemplateStyleDto: UpdateTemplateStyleDto,
  ): Promise<any>;

  remove(id: string): Promise<any>;
}