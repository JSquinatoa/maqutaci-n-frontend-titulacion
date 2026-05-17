// ========================================
// AUTH SERVICE — Login, logout, refresh
// ========================================
// MOCK MODE: Simula el backend hasta que Quarkus esté listo.
// Para conectar al backend real: elimina las funciones mock y descomenta las llamadas api.

import api, { setAuthTokens, clearAuthTokens, setStoredUser, getStoredUser } from './api';
import type { LoginRequest, LoginResponse, Usuario } from '../types';

// ── Mock data (eliminar cuando el backend esté listo) ──
const MOCK_USERS: (Usuario & { password: string })[] = [
  {
    id: 1, rolId: 1, nombreCompleto: 'Dr. Alberto Ruiz', email: 'admin@odontoestetic.com',
    firmaUrl: '', selloUrl: '', activo: true, createdAt: '2026-01-01',
    password: '123456',
    rol: { id: 1, nombre: 'ADMIN', permisos: { todo: true }, activo: true },
  },
  {
    id: 2, rolId: 2, nombreCompleto: 'Dra. Carmen López', email: 'doctor@odontoestetic.com',
    firmaUrl: '', selloUrl: '', activo: true, createdAt: '2026-01-01',
    password: '123456',
    rol: { id: 2, nombre: 'DOCTOR', permisos: { pacientes: true, clinica: true, facturacion: true }, activo: true },
  },
  {
    id: 3, rolId: 3, nombreCompleto: 'María Asistente', email: 'asistente@odontoestetic.com',
    firmaUrl: '', selloUrl: '', activo: true, createdAt: '2026-01-01',
    password: '123456',
    rol: { id: 3, nombre: 'ASISTENTE', permisos: { pacientes: true }, activo: true },
  },
];

const USE_MOCK = !import.meta.env.VITE_API_URL;

const authService = {
  /** Login con email y contraseña */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600)); // Simula latencia
      const user = MOCK_USERS.find(u => u.email === credentials.email && u.password === credentials.password);
      if (!user) {
        // También acepta cualquier password '123456' con el primer usuario
        if (credentials.password === '123456') {
          const defaultUser = MOCK_USERS[0];
          const { password: _, ...userData } = defaultUser;
          const response: LoginResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            usuario: userData,
            expiresIn: 3600,
          };
          setAuthTokens(response.token, response.refreshToken);
          setStoredUser(response.usuario);
          return response;
        }
        throw new Error('Credenciales inválidas');
      }
      const { password: _, ...userData } = user;
      const response: LoginResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        usuario: userData,
        expiresIn: 3600,
      };
      setAuthTokens(response.token, response.refreshToken);
      setStoredUser(response.usuario);
      return response;
    }

    // ── Backend real ──
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    setAuthTokens(data.token, data.refreshToken);
    setStoredUser(data.usuario);
    return data;
  },

  /** Cerrar sesión */
  logout() {
    clearAuthTokens();
  },

  /** Obtener el usuario guardado en localStorage */
  getCurrentUser(): Usuario | null {
    return getStoredUser();
  },

  /** Verificar si hay sesión activa */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};

export default authService;
