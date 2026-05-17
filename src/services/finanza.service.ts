// ========================================
// FINANZAS SERVICE — Gastos + Capital + Flujo de caja
// ========================================

import api from './api';
import type { Gasto, GastoForm, Capital, CapitalForm, CategoriaGasto, ResumenFinanciero, FlujoCajaMensual } from '../types';

// ── Mock Data ──
const MOCK_CATEGORIAS: CategoriaGasto[] = [
  { id: 1, nombre: 'Materiales dentales', esRecurrente: false, activo: true },
  { id: 2, nombre: 'Personal (sueldos)', esRecurrente: true, activo: true },
  { id: 3, nombre: 'Arriendo', esRecurrente: true, activo: true },
  { id: 4, nombre: 'Servicios básicos', esRecurrente: true, activo: true },
  { id: 5, nombre: 'Equipos', esRecurrente: false, activo: true },
  { id: 6, nombre: 'Marketing', esRecurrente: false, activo: true },
  { id: 7, nombre: 'Otros', esRecurrente: false, activo: true },
];

let mockGastos: Gasto[] = [
  { id: 1, categoriaId: 2, usuarioId: 1, monto: 1200, fecha: '2026-05-01', mes: 5, anio: 2026, descripcion: 'Sueldo asistente mayo', esAutomatico: true, createdAt: '2026-05-01', categoria: MOCK_CATEGORIAS[1] },
  { id: 2, categoriaId: 3, usuarioId: 1, monto: 500, fecha: '2026-05-01', mes: 5, anio: 2026, descripcion: 'Arriendo local mayo', esAutomatico: true, createdAt: '2026-05-01', categoria: MOCK_CATEGORIAS[2] },
  { id: 3, categoriaId: 1, usuarioId: 1, monto: 320, fecha: '2026-05-05', mes: 5, anio: 2026, descripcion: 'Resinas + adhesivos', esAutomatico: false, createdAt: '2026-05-05', categoria: MOCK_CATEGORIAS[0] },
  { id: 4, categoriaId: 4, usuarioId: 1, monto: 180, fecha: '2026-05-10', mes: 5, anio: 2026, descripcion: 'Luz + agua + internet', esAutomatico: true, createdAt: '2026-05-10', categoria: MOCK_CATEGORIAS[3] },
];

let mockCapital: Capital[] = [
  { id: 1, usuarioId: 1, monto: 5000, tipo: 'apertura', mes: 1, anio: 2026, descripcion: 'Capital inicial del consultorio', createdAt: '2026-01-01' },
];

const USE_MOCK = !import.meta.env.VITE_API_URL;

const finanzaService = {
  // ── Categorías de Gasto ──

  async getCategorias(): Promise<CategoriaGasto[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return MOCK_CATEGORIAS;
    }
    const { data } = await api.get<CategoriaGasto[]>('/categorias-gasto');
    return data;
  },

  async createCategoria(cat: Omit<CategoriaGasto, 'id'>): Promise<CategoriaGasto> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const newCat = { ...cat, id: MOCK_CATEGORIAS.length + 1 };
      MOCK_CATEGORIAS.push(newCat);
      return newCat;
    }
    const { data } = await api.post<CategoriaGasto>('/categorias-gasto', cat);
    return data;
  },

  // ── Gastos ──

  async getGastos(params?: { mes?: number; anio?: number }): Promise<Gasto[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      let filtered = [...mockGastos];
      if (params?.mes) filtered = filtered.filter(g => g.mes === params.mes);
      if (params?.anio) filtered = filtered.filter(g => g.anio === params.anio);
      return filtered;
    }
    const { data } = await api.get<Gasto[]>('/gastos', { params });
    return data;
  },

  async createGasto(form: GastoForm): Promise<Gasto> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const date = new Date(form.fecha);
      const newGasto: Gasto = {
        id: mockGastos.length + 1,
        categoriaId: form.categoriaId,
        usuarioId: 1,
        monto: form.monto,
        fecha: form.fecha,
        mes: date.getMonth() + 1,
        anio: date.getFullYear(),
        descripcion: form.descripcion,
        esAutomatico: false,
        createdAt: new Date().toISOString(),
        categoria: MOCK_CATEGORIAS.find(c => c.id === form.categoriaId),
      };
      mockGastos.push(newGasto);
      return newGasto;
    }
    const { data } = await api.post<Gasto>('/gastos', form);
    return data;
  },

  // ── Capital ──

  async getCapital(params?: { anio?: number }): Promise<Capital[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      if (params?.anio) return mockCapital.filter(c => c.anio === params.anio);
      return mockCapital;
    }
    const { data } = await api.get<Capital[]>('/capital', { params });
    return data;
  },

  async createCapital(form: CapitalForm): Promise<Capital> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const now = new Date();
      const newCapital: Capital = {
        id: mockCapital.length + 1,
        usuarioId: 1,
        monto: form.monto,
        tipo: form.tipo,
        mes: now.getMonth() + 1,
        anio: now.getFullYear(),
        descripcion: form.descripcion,
        createdAt: now.toISOString(),
      };
      mockCapital.push(newCapital);
      return newCapital;
    }
    const { data } = await api.post<Capital>('/capital', form);
    return data;
  },

  // ── Resumen Financiero ──

  async getResumen(mes: number, anio: number): Promise<ResumenFinanciero> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const gastosMes = mockGastos.filter(g => g.mes === mes && g.anio === anio);
      const gastosTotales = gastosMes.reduce((sum, g) => sum + g.monto, 0);
      const capitalTotal = mockCapital.filter(c => c.anio === anio).reduce((sum, c) => {
        return sum + (c.tipo === 'retiro' ? -c.monto : c.monto);
      }, 0);
      const ingresosBrutos = 5800; // Se calcularía de las facturas pagadas
      return {
        ingresosBrutos,
        gastosTotales,
        utilidadNeta: ingresosBrutos - gastosTotales,
        capitalActual: capitalTotal + ingresosBrutos - gastosTotales,
        mes, anio,
      };
    }
    const { data } = await api.get<ResumenFinanciero>(`/finanzas/resumen`, { params: { mes, anio } });
    return data;
  },

  async getFlujoCaja(anio: number): Promise<FlujoCajaMensual[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
      return meses.slice(0, new Date().getMonth() + 1).map((mes, i) => ({
        mes,
        ingresos: 3000 + Math.random() * 3000,
        gastos: 1500 + Math.random() * 1000,
        utilidad: 0,
      })).map(m => ({ ...m, utilidad: m.ingresos - m.gastos }));
    }
    const { data } = await api.get<FlujoCajaMensual[]>(`/finanzas/flujo-caja`, { params: { anio } });
    return data;
  },
};

export default finanzaService;
