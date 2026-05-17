// ========================================
// EXTRAS SERVICE — Presupuestos + Certificados
// ========================================

import api from './api';
import type { Presupuesto, PresupuestoForm, Certificado, CertificadoForm, PaginatedResponse } from '../types';

// ── Mock Data ──
let mockPresupuestos: Presupuesto[] = [
  {
    id: 1, usuarioId: 1, nombrePaciente: 'Roberto Jiménez Cruz', tipo: 'compuesto',
    fecha: '2026-04-25', total: 450, observaciones: 'Tratamiento completo pieza #26',
    createdAt: '2026-04-25',
    detalles: [
      { id: 1, procedimientoId: 5, cantidadPiezas: 1, precioUnitario: 180, precioAplicado: 180, subtotalLinea: 180 },
      { id: 2, procedimientoId: 6, cantidadPiezas: 1, precioUnitario: 270, precioAplicado: 270, subtotalLinea: 270 },
    ],
  },
  {
    id: 2, usuarioId: 1, nombrePaciente: 'Ana Martínez Soto', tipo: 'simple',
    fecha: '2026-05-10', total: 440, observaciones: 'Estética dental',
    createdAt: '2026-05-10',
    detalles: [
      { id: 3, procedimientoId: 7, cantidadPiezas: 1, precioUnitario: 180, precioAplicado: 180, subtotalLinea: 180 },
      { id: 4, procedimientoId: 3, piezasDentales: [11,12,21,22], cantidadPiezas: 4, precioUnitario: 65, precioAplicado: 65, subtotalLinea: 260 },
    ],
  },
];

let mockCertificados: Certificado[] = [];

const USE_MOCK = !import.meta.env.VITE_API_URL;

const extrasService = {
  // ── Presupuestos ──

  async listPresupuestos(): Promise<PaginatedResponse<Presupuesto>> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      return { items: mockPresupuestos, total: mockPresupuestos.length, page: 1, pageSize: 50, totalPages: 1 };
    }
    const { data } = await api.get<PaginatedResponse<Presupuesto>>('/presupuestos');
    return data;
  },

  async createPresupuesto(form: PresupuestoForm): Promise<Presupuesto> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const total = form.detalles.reduce((sum, d) => sum + d.subtotalLinea, 0);
      const newP: Presupuesto = {
        id: mockPresupuestos.length + 1,
        usuarioId: 1,
        nombrePaciente: form.nombrePaciente,
        tipo: form.tipo,
        fecha: new Date().toISOString().slice(0, 10),
        total,
        observaciones: form.observaciones,
        createdAt: new Date().toISOString(),
        detalles: form.detalles.map((d, i) => ({ ...d, id: i + 1 })),
      };
      mockPresupuestos.push(newP);
      return newP;
    }
    const { data } = await api.post<Presupuesto>('/presupuestos', form);
    return data;
  },

  // ── Certificados ──

  async listCertificados(pacienteId?: number): Promise<Certificado[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      if (pacienteId) return mockCertificados.filter(c => c.pacienteId === pacienteId);
      return mockCertificados;
    }
    const { data } = await api.get<Certificado[]>('/certificados', { params: { pacienteId } });
    return data;
  },

  async createCertificado(form: CertificadoForm): Promise<Certificado> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const newC: Certificado = {
        id: mockCertificados.length + 1,
        pacienteId: form.pacienteId,
        usuarioId: 1,
        procedimientoId: form.procedimientoId,
        fecha: new Date().toISOString().slice(0, 10),
        contenido: form.contenido,
        createdAt: new Date().toISOString(),
      };
      mockCertificados.push(newC);
      return newC;
    }
    const { data } = await api.post<Certificado>('/certificados', form);
    return data;
  },
};

export default extrasService;
