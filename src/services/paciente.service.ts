// ========================================
// PACIENTE SERVICE — CRUD pacientes
// ========================================

import api from './api';
import type { Paciente, PacienteForm, PacienteListItem, PaginatedResponse } from '../types';

// ── Mock data (eliminar cuando el backend esté listo) ──
let mockPacientes: Paciente[] = [
  { id: 1, cedula: '1723456789', primerNombre: 'María', segundoNombre: '', primerApellido: 'García', segundoApellido: 'López', telefono: '0991-234-567', email: 'maria.garcia@email.com', fechaNacimiento: '1985-03-15', sexo: 'Femenino', activo: true, createdAt: '2025-01-10', updatedAt: '2026-05-10' },
  { id: 2, cedula: '1734567890', primerNombre: 'Carlos', segundoNombre: '', primerApellido: 'Rodríguez', segundoApellido: 'Vega', telefono: '0987-654-321', email: 'carlos.r@email.com', fechaNacimiento: '1978-07-22', sexo: 'Masculino', activo: true, createdAt: '2025-02-15', updatedAt: '2026-05-08' },
  { id: 3, cedula: '1745678901', primerNombre: 'Ana', segundoNombre: 'Lucía', primerApellido: 'Martínez', segundoApellido: 'Soto', telefono: '0976-543-210', email: 'ana.m@email.com', fechaNacimiento: '1992-11-08', sexo: 'Femenino', activo: true, createdAt: '2025-03-20', updatedAt: '2026-05-15' },
  { id: 4, cedula: '1756789012', primerNombre: 'Roberto', segundoNombre: '', primerApellido: 'Jiménez', segundoApellido: 'Cruz', telefono: '0965-432-109', email: 'roberto.j@email.com', fechaNacimiento: '1970-01-30', sexo: 'Masculino', activo: true, createdAt: '2025-04-10', updatedAt: '2026-04-28' },
  { id: 5, cedula: '1767890123', primerNombre: 'Lucía', segundoNombre: '', primerApellido: 'Fernández', segundoApellido: 'Mora', telefono: '0954-321-098', email: 'lucia.f@email.com', fechaNacimiento: '1995-09-12', sexo: 'Femenino', activo: true, createdAt: '2025-05-05', updatedAt: '2026-05-12' },
  { id: 6, cedula: '1778901234', primerNombre: 'Diego', segundoNombre: '', primerApellido: 'Torres', segundoApellido: 'Ruiz', telefono: '0943-210-987', email: 'diego.t@email.com', fechaNacimiento: '1988-04-25', sexo: 'Masculino', activo: false, createdAt: '2025-06-18', updatedAt: '2025-12-15' },
  { id: 7, cedula: '1789012345', primerNombre: 'Valentina', segundoNombre: '', primerApellido: 'Castro', segundoApellido: 'Paz', telefono: '0932-109-876', email: 'vale.c@email.com', fechaNacimiento: '2000-06-18', sexo: 'Femenino', activo: true, createdAt: '2025-07-22', updatedAt: '2026-05-14' },
  { id: 8, cedula: '1790123456', primerNombre: 'Andrés', segundoNombre: '', primerApellido: 'Morales', segundoApellido: 'León', telefono: '0921-098-765', email: 'andres.m@email.com', fechaNacimiento: '1965-12-03', sexo: 'Masculino', activo: true, createdAt: '2025-08-30', updatedAt: '2026-05-05' },
  { id: 9, cedula: '1801234567', primerNombre: 'Sofía', segundoNombre: '', primerApellido: 'Herrera', segundoApellido: 'Vidal', telefono: '0910-987-654', email: 'sofia.h@email.com', fechaNacimiento: '1998-02-14', sexo: 'Femenino', activo: true, createdAt: '2025-09-15', updatedAt: '2026-05-13' },
  { id: 10, cedula: '1812345678', primerNombre: 'Miguel', segundoNombre: 'Ángel', primerApellido: 'Torres', segundoApellido: 'Bravo', telefono: '0909-876-543', email: 'miguel.t@email.com', fechaNacimiento: '1975-08-20', sexo: 'Masculino', activo: true, createdAt: '2025-10-01', updatedAt: '2026-05-09' },
];

const calcAge = (d: string) => {
  const today = new Date();
  const birth = new Date(d);
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
  return age;
};

const toListItem = (p: Paciente): PacienteListItem => ({
  ...p,
  nombreCompleto: `${p.primerNombre} ${p.segundoNombre || ''} ${p.primerApellido} ${p.segundoApellido || ''}`.replace(/\s+/g, ' ').trim(),
  edad: calcAge(p.fechaNacimiento),
  ultimaVisita: p.updatedAt,
  tieneAlergias: false, // Se determina desde historia clínica
  historiaVigente: true,
});

const USE_MOCK = !import.meta.env.VITE_API_URL;

const pacienteService = {
  /** Listar pacientes con paginación y filtros */
  async list(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: 'activo' | 'inactivo' | 'todos';
  }): Promise<PaginatedResponse<PacienteListItem>> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      let filtered = [...mockPacientes];
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          `${p.primerNombre} ${p.primerApellido} ${p.cedula}`.toLowerCase().includes(q)
        );
      }
      if (params?.status && params.status !== 'todos') {
        filtered = filtered.filter(p => (params.status === 'activo' ? p.activo : !p.activo));
      }
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const start = (page - 1) * pageSize;
      const items = filtered.slice(start, start + pageSize).map(toListItem);
      return { items, total: filtered.length, page, pageSize, totalPages: Math.ceil(filtered.length / pageSize) };
    }

    const { data } = await api.get<PaginatedResponse<PacienteListItem>>('/pacientes', { params });
    return data;
  },

  /** Obtener un paciente por ID */
  async getById(id: number): Promise<PacienteListItem> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      const p = mockPacientes.find(p => p.id === id);
      if (!p) throw new Error('Paciente no encontrado');
      return toListItem(p);
    }
    const { data } = await api.get<PacienteListItem>(`/pacientes/${id}`);
    return data;
  },

  /** Crear un nuevo paciente */
  async create(form: PacienteForm): Promise<Paciente> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const newPaciente: Paciente = {
        ...form,
        id: Math.max(...mockPacientes.map(p => p.id)) + 1,
        activo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockPacientes.push(newPaciente);
      return newPaciente;
    }
    const { data } = await api.post<Paciente>('/pacientes', form);
    return data;
  },

  /** Actualizar un paciente */
  async update(id: number, form: PacienteForm): Promise<Paciente> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const idx = mockPacientes.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Paciente no encontrado');
      mockPacientes[idx] = { ...mockPacientes[idx], ...form, updatedAt: new Date().toISOString() };
      return mockPacientes[idx];
    }
    const { data } = await api.put<Paciente>(`/pacientes/${id}`, form);
    return data;
  },

  /** Inactivar un paciente (nunca eliminar) */
  async toggleActive(id: number): Promise<Paciente> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const idx = mockPacientes.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Paciente no encontrado');
      mockPacientes[idx].activo = !mockPacientes[idx].activo;
      mockPacientes[idx].updatedAt = new Date().toISOString();
      return mockPacientes[idx];
    }
    const { data } = await api.patch<Paciente>(`/pacientes/${id}/toggle-active`);
    return data;
  },

  /** Buscar paciente por cédula */
  async findByCedula(cedula: string): Promise<PacienteListItem | null> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      const p = mockPacientes.find(p => p.cedula === cedula);
      return p ? toListItem(p) : null;
    }
    try {
      const { data } = await api.get<PacienteListItem>(`/pacientes/cedula/${cedula}`);
      return data;
    } catch {
      return null;
    }
  },
};

export default pacienteService;
