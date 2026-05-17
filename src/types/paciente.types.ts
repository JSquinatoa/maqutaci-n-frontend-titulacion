// ========================================
// PACIENTE TYPES — Alineado con tabla: paciente
// ========================================

export type PatientStatus = 'activo' | 'inactivo';

export interface Paciente {
  id: number;
  cedula: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  telefono: string;
  email?: string;
  fechaNacimiento: string;
  sexo: 'Masculino' | 'Femenino';
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

/** DTO de creación/edición */
export interface PacienteForm {
  cedula: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  telefono: string;
  email?: string;
  fechaNacimiento: string;
  sexo: 'Masculino' | 'Femenino';
}

/** Vista enriquecida para la tabla de pacientes (incluye datos calculados) */
export interface PacienteListItem extends Paciente {
  nombreCompleto: string;
  edad: number;
  ultimaVisita?: string;
  tieneAlergias: boolean;
  historiaVigente: boolean;
}

/** Respuesta paginada del API */
export interface PacientePaginado {
  items: PacienteListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
