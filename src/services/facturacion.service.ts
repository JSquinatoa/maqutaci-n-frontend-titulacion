// ========================================
// FACTURACIÓN SERVICE — Facturas + Abonos + Sesiones
// ========================================

import api from './api';
import type {
  Factura, FacturaForm, Abono, AbonoForm,
  SesionClinica, CatalogoProcedimiento,
  PaginatedResponse
} from '../types';

// ── Mock Data ──
const MOCK_PROCEDIMIENTOS: CatalogoProcedimiento[] = [
  { id: 1, codigoCie: 'D01', nombre: 'Consulta general', precioBase: 40, activo: true },
  { id: 2, codigoCie: 'D02', nombre: 'Profilaxis dental', precioBase: 45, activo: true },
  { id: 3, codigoCie: 'D03', nombre: 'Resina compuesta', precioBase: 65, activo: true },
  { id: 4, codigoCie: 'D04', nombre: 'Extracción dental', precioBase: 80, activo: true },
  { id: 5, codigoCie: 'D05', nombre: 'Endodoncia', precioBase: 180, activo: true },
  { id: 6, codigoCie: 'D06', nombre: 'Corona porcelana', precioBase: 270, activo: true },
  { id: 7, codigoCie: 'D07', nombre: 'Blanqueamiento dental', precioBase: 180, activo: true },
  { id: 8, codigoCie: 'D08', nombre: 'Ortodoncia mensual', precioBase: 85, activo: true },
  { id: 9, codigoCie: 'D09', nombre: 'Implante dental titanio', precioBase: 600, activo: true },
  { id: 10, codigoCie: 'D10', nombre: 'Radiografía periapical', precioBase: 15, activo: true },
  { id: 11, codigoCie: 'D11', nombre: 'Radiografía panorámica', precioBase: 35, activo: true },
  { id: 12, codigoCie: 'D12', nombre: 'Prótesis parcial removible', precioBase: 350, activo: true },
  { id: 13, codigoCie: 'D13', nombre: 'Aplicación de flúor', precioBase: 20, activo: true },
  { id: 14, codigoCie: 'D14', nombre: 'Sellante dental', precioBase: 25, activo: true },
];

let mockFacturas: Factura[] = [
  { id: 1, pacienteId: 1, usuarioId: 1, numeroFactura: 'FAC-2026-001', fecha: '2026-05-10', metodoPago: 'efectivo', subtotal: 85, recargoTarjeta: 0, total: 85, totalAbonado: 85, saldoPendiente: 0, estado: 'pagada', createdAt: '2026-05-10', detalles: [{ id: 1, procedimientoId: 1, cantidadPiezas: 1, precioUnitario: 40, precioAplicado: 40, subtotalLinea: 40 }, { id: 2, procedimientoId: 2, cantidadPiezas: 1, precioUnitario: 45, precioAplicado: 45, subtotalLinea: 45 }], paciente: { id: 1, nombreCompleto: 'María García López', cedula: '1723456789' } },
  { id: 2, pacienteId: 3, usuarioId: 1, numeroFactura: 'FAC-2026-002', fecha: '2026-05-15', metodoPago: 'tarjeta', subtotal: 180, recargoTarjeta: 18, total: 198, totalAbonado: 80, saldoPendiente: 118, estado: 'parcial', createdAt: '2026-05-15', detalles: [{ id: 3, procedimientoId: 7, cantidadPiezas: 1, precioUnitario: 180, precioAplicado: 180, subtotalLinea: 180 }], paciente: { id: 3, nombreCompleto: 'Ana Martínez Soto', cedula: '1745678901' } },
  { id: 3, pacienteId: 4, usuarioId: 1, numeroFactura: 'FAC-2026-003', fecha: '2026-05-01', metodoPago: 'efectivo', subtotal: 450, recargoTarjeta: 0, total: 450, totalAbonado: 0, saldoPendiente: 450, estado: 'pendiente', createdAt: '2026-05-01', detalles: [{ id: 4, procedimientoId: 5, cantidadPiezas: 1, precioUnitario: 180, precioAplicado: 180, subtotalLinea: 180 }, { id: 5, procedimientoId: 6, cantidadPiezas: 1, precioUnitario: 270, precioAplicado: 270, subtotalLinea: 270 }], paciente: { id: 4, nombreCompleto: 'Roberto Jiménez Cruz', cedula: '1756789012' } },
];

let mockAbonos: Abono[] = [
  { id: 1, facturaId: 2, usuarioId: 1, monto: 80, metodoPago: 'efectivo', fecha: '2026-05-15', createdAt: '2026-05-15' },
];

let mockSesiones: SesionClinica[] = [
  { id: 1, pacienteId: 1, facturaId: 1, usuarioId: 1, fecha: '2026-05-10', procedimientoDesc: 'Consulta general + Profilaxis dental', createdAt: '2026-05-10', archivos: [], paciente: { id: 1, nombreCompleto: 'María García López' }, usuario: { id: 1, nombreCompleto: 'Dr. Alberto Ruiz' } },
  { id: 2, pacienteId: 3, facturaId: 2, usuarioId: 1, fecha: '2026-05-15', procedimientoDesc: 'Blanqueamiento dental', createdAt: '2026-05-15', archivos: [], paciente: { id: 3, nombreCompleto: 'Ana Martínez Soto' }, usuario: { id: 1, nombreCompleto: 'Dr. Alberto Ruiz' } },
];

const USE_MOCK = !import.meta.env.VITE_API_URL;

const facturacionService = {
  // ── Catálogo de Procedimientos ──

  async getProcedimientos(): Promise<CatalogoProcedimiento[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return MOCK_PROCEDIMIENTOS;
    }
    const { data } = await api.get<CatalogoProcedimiento[]>('/catalogos/procedimientos');
    return data;
  },

  async createProcedimiento(proc: Omit<CatalogoProcedimiento, 'id'>): Promise<CatalogoProcedimiento> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const newProc = { ...proc, id: MOCK_PROCEDIMIENTOS.length + 1 };
      MOCK_PROCEDIMIENTOS.push(newProc);
      return newProc;
    }
    const { data } = await api.post<CatalogoProcedimiento>('/catalogos/procedimientos', proc);
    return data;
  },

  // ── Facturas ──

  async listFacturas(params?: { pacienteId?: number; estado?: string; page?: number }): Promise<PaginatedResponse<Factura>> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      let filtered = [...mockFacturas];
      if (params?.pacienteId) filtered = filtered.filter(f => f.pacienteId === params.pacienteId);
      if (params?.estado && params.estado !== 'todos') filtered = filtered.filter(f => f.estado === params.estado);
      return { items: filtered, total: filtered.length, page: 1, pageSize: 50, totalPages: 1 };
    }
    const { data } = await api.get<PaginatedResponse<Factura>>('/facturas', { params });
    return data;
  },

  async createFactura(form: FacturaForm): Promise<Factura> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      const subtotal = form.detalles.reduce((sum, d) => sum + d.subtotalLinea, 0);
      const recargo = form.metodoPago === 'tarjeta' ? subtotal * 0.10 : 0;
      const total = subtotal + recargo;
      const numFactura = `FAC-2026-${String(mockFacturas.length + 1).padStart(3, '0')}`;
      const newFactura: Factura = {
        id: mockFacturas.length + 1,
        pacienteId: form.pacienteId,
        usuarioId: 1,
        numeroFactura: numFactura,
        fecha: new Date().toISOString().slice(0, 10),
        metodoPago: form.metodoPago,
        subtotal, recargoTarjeta: recargo, total,
        totalAbonado: 0, saldoPendiente: total,
        estado: 'pendiente',
        createdAt: new Date().toISOString(),
        detalles: form.detalles.map((d, i) => ({ ...d, id: i + 1 })),
      };
      mockFacturas.push(newFactura);
      // Auto-generar sesión clínica
      const procNames = form.detalles.map(d => {
        const proc = MOCK_PROCEDIMIENTOS.find(p => p.id === d.procedimientoId);
        return proc?.nombre || 'Procedimiento';
      });
      const newSesion: SesionClinica = {
        id: mockSesiones.length + 1,
        pacienteId: form.pacienteId,
        facturaId: newFactura.id,
        usuarioId: 1,
        fecha: newFactura.fecha,
        procedimientoDesc: procNames.join(' + '),
        createdAt: new Date().toISOString(),
        archivos: [],
      };
      mockSesiones.push(newSesion);
      return newFactura;
    }
    const { data } = await api.post<Factura>('/facturas', form);
    return data;
  },

  // ── Abonos ──

  async getAbonos(facturaId: number): Promise<Abono[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      return mockAbonos.filter(a => a.facturaId === facturaId);
    }
    const { data } = await api.get<Abono[]>(`/facturas/${facturaId}/abonos`);
    return data;
  },

  async createAbono(form: AbonoForm): Promise<Abono> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const newAbono: Abono = {
        id: mockAbonos.length + 1,
        facturaId: form.facturaId,
        usuarioId: 1,
        monto: form.monto,
        metodoPago: form.metodoPago,
        fecha: new Date().toISOString().slice(0, 10),
        observaciones: form.observaciones,
        createdAt: new Date().toISOString(),
      };
      mockAbonos.push(newAbono);
      // Actualizar factura
      const factura = mockFacturas.find(f => f.id === form.facturaId);
      if (factura) {
        factura.totalAbonado += form.monto;
        factura.saldoPendiente = factura.total - factura.totalAbonado;
        factura.estado = factura.saldoPendiente <= 0 ? 'pagada' : 'parcial';
      }
      return newAbono;
    }
    const { data } = await api.post<Abono>('/abonos', form);
    return data;
  },

  // ── Sesiones Clínicas ──

  async getSesiones(params?: { pacienteId?: number }): Promise<SesionClinica[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      if (params?.pacienteId) return mockSesiones.filter(s => s.pacienteId === params.pacienteId);
      return mockSesiones;
    }
    const { data } = await api.get<SesionClinica[]>('/sesiones', { params });
    return data;
  },
};

export default facturacionService;
