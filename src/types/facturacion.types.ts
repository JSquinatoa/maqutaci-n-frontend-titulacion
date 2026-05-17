// ========================================
// FACTURACIÓN TYPES — Alineados con tablas:
//   catalogo_procedimiento, factura, factura_detalle,
//   abono, sesion_clinica, archivo_clinico
// ========================================

// --- Catálogo de Procedimientos ---

export interface CatalogoProcedimiento {
  id: number;
  codigoCie: string;
  nombre: string;
  precioBase: number;
  descripcion?: string;
  activo: boolean;
}

// --- Factura ---

export type EstadoFactura = 'pendiente' | 'parcial' | 'pagada' | 'anulada';
export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta';

export interface FacturaDetalle {
  id?: number;
  facturaId?: number;
  procedimientoId: number;
  piezasDentales?: number[];
  cantidadPiezas: number;
  precioUnitario: number;
  precioAplicado: number;
  subtotalLinea: number;
  // Relación expandida
  procedimiento?: CatalogoProcedimiento;
}

export interface Factura {
  id: number;
  pacienteId: number;
  usuarioId: number;
  numeroFactura: string;
  fecha: string;
  metodoPago: MetodoPago;
  subtotal: number;
  recargoTarjeta: number;
  total: number;
  totalAbonado: number;
  saldoPendiente: number;
  estado: EstadoFactura;
  createdAt: string;
  detalles: FacturaDetalle[];
  // Relaciones expandidas
  paciente?: { id: number; nombreCompleto: string; cedula: string };
  usuario?: { id: number; nombreCompleto: string };
}

export interface FacturaForm {
  pacienteId: number;
  metodoPago: MetodoPago;
  detalles: Omit<FacturaDetalle, 'id' | 'facturaId' | 'procedimiento'>[];
}

// --- Abono ---

export interface Abono {
  id: number;
  facturaId: number;
  usuarioId: number;
  monto: number;
  metodoPago: MetodoPago;
  fecha: string;
  observaciones?: string;
  createdAt: string;
  // Relación expandida
  usuario?: { id: number; nombreCompleto: string };
}

export interface AbonoForm {
  facturaId: number;
  monto: number;
  metodoPago: MetodoPago;
  observaciones?: string;
}

// --- Sesión Clínica ---

export interface SesionClinica {
  id: number;
  pacienteId: number;
  facturaId: number;
  usuarioId: number;
  fecha: string;
  procedimientoDesc: string;
  diagnosticoCodigo?: string;
  diagnosticoDesc?: string;
  complicaciones?: string;
  observaciones?: string;
  createdAt: string;
  archivos: ArchivoClinico[];
  // Relaciones expandidas
  paciente?: { id: number; nombreCompleto: string };
  usuario?: { id: number; nombreCompleto: string };
}

// --- Archivo Clínico ---

export type TipoArchivo = 'foto' | 'radiografia' | 'pdf' | 'otro';

export interface ArchivoClinico {
  id: number;
  sesionClinicaId: number;
  tipo: TipoArchivo;
  rutaArchivo: string;
  nombreOriginal: string;
  descripcion?: string;
  createdAt: string;
}

export interface ArchivoClinicoForm {
  sesionClinicaId: number;
  tipo: TipoArchivo;
  archivo: File;
  descripcion?: string;
}
