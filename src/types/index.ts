// Barrel export de todos los tipos
export * from './auth.types';
export * from './paciente.types';
export * from './clinica.types';
export * from './facturacion.types';
export * from './finanzas.types';
export * from './extras.types';

/** Respuesta genérica paginada del API */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Respuesta de error estándar del API */
export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, string>;
}
