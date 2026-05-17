// ========================================
// useFacturacion — Hook para facturas, abonos, sesiones
// ========================================

import { useState, useCallback } from 'react';
import { facturacionService } from '../services';
import type { Factura, FacturaForm, Abono, AbonoForm, SesionClinica, CatalogoProcedimiento } from '../types';

export function useFacturacion() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [abonos, setAbonos] = useState<Abono[]>([]);
  const [sesiones, setSesiones] = useState<SesionClinica[]>([]);
  const [procedimientos, setProcedimientos] = useState<CatalogoProcedimiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProcedimientos = useCallback(async () => {
    try {
      const data = await facturacionService.getProcedimientos();
      setProcedimientos(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar procedimientos');
      throw err;
    }
  }, []);

  const fetchFacturas = useCallback(async (params?: { pacienteId?: number; estado?: string }) => {
    setLoading(true);
    try {
      const data = await facturacionService.listFacturas(params);
      setFacturas(data.items);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar facturas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const crearFactura = useCallback(async (form: FacturaForm) => {
    setLoading(true);
    try {
      const data = await facturacionService.createFactura(form);
      setFacturas(prev => [...prev, data]);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear factura');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAbonos = useCallback(async (facturaId: number) => {
    try {
      const data = await facturacionService.getAbonos(facturaId);
      setAbonos(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar abonos');
      throw err;
    }
  }, []);

  const crearAbono = useCallback(async (form: AbonoForm) => {
    setLoading(true);
    try {
      const data = await facturacionService.createAbono(form);
      setAbonos(prev => [...prev, data]);
      // Refrescar facturas
      await fetchFacturas();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar abono');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFacturas]);

  const fetchSesiones = useCallback(async (params?: { pacienteId?: number }) => {
    setLoading(true);
    try {
      const data = await facturacionService.getSesiones(params);
      setSesiones(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar sesiones');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    facturas, abonos, sesiones, procedimientos, loading, error,
    fetchProcedimientos, fetchFacturas, crearFactura,
    fetchAbonos, crearAbono, fetchSesiones,
  };
}
