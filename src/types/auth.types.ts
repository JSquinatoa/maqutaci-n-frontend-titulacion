// ========================================
// AUTH TYPES — Alineados con tablas: rol, usuario
// ========================================

export interface Rol {
  id: number;
  nombre: string;
  permisos: Record<string, boolean>;
  activo: boolean;
}

export interface Usuario {
  id: number;
  rolId: number;
  rol?: Rol;
  nombreCompleto: string;
  email: string;
  firmaUrl?: string;
  selloUrl?: string;
  activo: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: Usuario;
  expiresIn: number;
}

export interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
