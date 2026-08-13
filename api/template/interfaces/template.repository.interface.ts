export interface TemplateRepositoryInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<any[]>;

  getById(
    id: string,
  ): Promise<any | null>;

  getBySlug(
    slug: string,
  ): Promise<any | null>;

  getByAuthorId(
    authorId: string,
  ): Promise<any[]>;

  getByCategory(
    category: string,
  ): Promise<any[]>;

  // =========================
  // Commands
  // =========================

  create(
    data: {
      id: string;
      slug: string;
      title: string;
      description: string;
      thumbnail: string;
      images?: string[];
      category: string;
      tags?: string[];

      authorId: string;

      rating?: number;
      reviews?: number;
      downloads?: number;

      price: number;
      originalPrice?: number;

      featured?: boolean;
      newest?: boolean;

      stock?: number;
      license?: string;
    },
  ): Promise<any>;

  update(
    id: string,
    data: {
      title?: string;
      description?: string;
      thumbnail?: string;
      images?: string[];
      category?: string;
      tags?: string[];

      rating?: number;
      reviews?: number;
      downloads?: number;

      price?: number;
      originalPrice?: number | null;

      featured?: boolean;
      newest?: boolean;

      stock?: number | null;
      license?: string | null;
    },
  ): Promise<any>;

  // =========================
  // Delete
  // =========================

  delete(
    id: string,
  ): Promise<any>;
}