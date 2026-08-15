export interface TemplateAuthor {
  id: string;

  name: string;

  avatar?: string | null;

  verified: boolean;

  totalSales: number;

  bio?: string;

  website?: string;

  github?: string;
}