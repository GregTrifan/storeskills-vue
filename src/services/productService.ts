import { api } from '@/lib/api';
import type { Product } from '@/types';

export const productService = {
  /**
   * Fetch all products
   */
  async getAll(): Promise<Product[]> {
    return api.get<Product[]>('/products');
  },

  /**
   * Fetch a single product by ID
   */
  async getById(id: number): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  /**
   * Fetch all product categories
   */
  async getCategories(): Promise<string[]> {
    return api.get<string[]>('/products/categories');
  },

  /**
   * Fetch products by category
   */
  async getByCategory(category: string): Promise<Product[]> {
    return api.get<Product[]>(`/products/category/${category}`);
  },

  /**
   * Create a new product
   */
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return api.post<Product>('/products', product);
  },

  /**
   * Update an existing product
   */
  async update(id: number, updates: Partial<Product>): Promise<Product> {
    return api.put<Product>(`/products/${id}`, updates);
  },

  /**
   * Delete a product
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
