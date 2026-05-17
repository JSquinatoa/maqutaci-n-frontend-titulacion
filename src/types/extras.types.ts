// ========================================
// EXTRAS TYPES — Alineados con tablas:
//   presupuesto, presupuesto_detalle, certificado
// ========================================

import type { CatalogoProcedimiento } from './facturacion.types';

// --- Presupuesto ---

export type EstadoPresupuesto = 'pendiente' | 'aprobado' | 'rechazado' | 'expirado';
export type TipoPresupuesto = 'simple' | 'compuesto';

export interface PresupuestoDetalle {
  id?: number;
  presupuestoId?: number;
  procedimientoId: number;
  piezasDentales?: number[];
  cantidadPiezas: number;
  precioUnitario: number;
  precioAplicado: number;
  subtotalLinea: number;
  // Relación expandida
  procedimiento?: CatalogoProcedimiento;
}

export interface Presupuesto {
  id: number;
  usuarioId: number;
  nombrePaciente: string;
  tipo: TipoPresupuesto;
  fecha: string;
  total: number;
  observaciones?: string;
  createdAt: string;
  detalles: PresupuestoDetalle[];
  // Relación expandida
  usuario?: { id: number; nombreCompleto: string };
}

export interface PresupuestoForm {
  nombrePaciente: string;
  tipo: TipoPresupuesto;
  observaciones?: string;
  detalles: Omit<PresupuestoDetalle, 'id' | 'presupuestoId' | 'procedimiento'>[];
}

// --- Certificado ---

export interface Certificado {
  id: number;
  pacienteId: number;
  usuarioId: number;
  procedimientoId?: number;
  fecha: string;
  contenido: string;
  createdAt: string;
  // Relaciones expandidas
  paciente?: { id: number; nombreCompleto: string; cedula: string };
  usuario?: { id: number; nombreCompleto: string; firmaUrl?: string; selloUrl?: string };
  procedimiento?: CatalogoProcedimiento;
}

export interface CertificadoForm {
  pacienteId: number;
  procedimientoId?: number;
  contenido: string;
}
