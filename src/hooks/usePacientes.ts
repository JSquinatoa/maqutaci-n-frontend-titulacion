// ========================================
// usePacientes — Hook para gestión de pacientes
// ========================================

import { useState, useCallback } from 'react';
import { pacienteService } from '../services';
import type { PacienteListItem, PacienteForm, PaginatedResponse } from '../types';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<PacienteListItem[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPacientes = useCallback(async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: 'activo' | 'inactivo' | 'todos';
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data: PaginatedResponse<PacienteListItem> = await pacienteService.list(params);
      setPacientes(data.items);
      setPagination({ total: data.total, page: data.page, pageSize: data.pageSize, totalPages: data.totalPages });
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar pacientes';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaciente = useCallback(async (id: number) => {
    setLoading(true);
    try {
      return await pacienteService.getById(id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar paciente';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const crearPaciente = useCallback(async (form: PacienteForm) => {
    setLoading(true);
    try {
      const result = await pacienteService.create(form);
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear paciente';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizarPaciente = useCallback(async (id: number, form: PacienteForm) => {
    setLoading(true);
    try {
      return await pacienteService.update(id, form);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar paciente';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleActivo = useCallback(async (id: number) => {
    try {
      return await pacienteService.toggleActive(id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cambiar estado';
      setError(message);
      throw err;
    }
  }, []);

  const buscarPorCedula = useCallback(async (cedula: string) => {
    return await pacienteService.findByCedula(cedula);
  }, []);

  return {
    pacientes, pagination, loading, error,
    fetchPacientes, getPaciente, crearPaciente, actualizarPaciente, toggleActivo, buscarPorCedula,
  };
}
