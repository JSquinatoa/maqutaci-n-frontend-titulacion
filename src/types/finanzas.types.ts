// ========================================
// FINANZAS TYPES — Alineados con tablas:
//   categoria_gasto, gasto, capital
// ========================================

export interface CategoriaGasto {
  id: number;
  nombre: string;
  esRecurrente: boolean;
  activo: boolean;
}

export interface Gasto {
  id: number;
  categoriaId: number;
  usuarioId: number;
  monto: number;
  fecha: string;
  mes: number;
  anio: number;
  descripcion?: string;
  esAutomatico: boolean;
  createdAt: string;
  // Relación expandida
  categoria?: CategoriaGasto;
}

export interface GastoForm {
  categoriaId: number;
  monto: number;
  fecha: string;
  descripcion?: string;
}

export interface Capital {
  id: number;
  usuarioId: number;
  monto: number;
  tipo: 'apertura' | 'inyeccion' | 'retiro';
  mes: number;
  anio: number;
  descripcion?: string;
  createdAt: string;
}

export interface CapitalForm {
  monto: number;
  tipo: 'apertura' | 'inyeccion' | 'retiro';
  descripcion?: string;
}

/** Resumen financiero calculado */
export interface ResumenFinanciero {
  ingresosBrutos: number;
  gastosTotales: number;
  utilidadNeta: number;
  capitalActual: number;
  mes: number;
  anio: number;
}

export interface FlujoCajaMensual {
  mes: string;
  ingresos: number;
  gastos: number;
  utilidad: number;
}
