export interface CreateMovieDTO {
  title: string;
  description?: string;
  releaseYear: number;
  genre: string;
  directorId: number;
}

export interface MovieFilters {
  title?: string;
  genre?: string;
  releaseYear?: number;
}