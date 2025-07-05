// Base types
export interface Rating {
  rate: number;
  count: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

// Store state types
export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'rating' | null;
  filterCategory: string | null;
}

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  ids: number[];
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}


// Utility types
export type Nullable<T> = T | null;
