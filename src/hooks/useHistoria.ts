// ========================================
// useHistoria — Hook para historia clínica + odontograma
// ========================================

import { useState, useCallback } from 'react';
import { historiaService } from '../services';
import type { HistoriaClinica, HistoriaClinicaForm, PlantillaFormulario, Odontograma, OdontogramaForm, CatalogoSimbolo } from '../types';

export function useHistoria() {
  const [plantilla, setPlantilla] = useState<PlantillaFormulario | null>(null);
  const [historias, setHistorias] = useState<HistoriaClinica[]>([]);
  const [odontograma, setOdontograma] = useState<Odontograma | null>(null);
  const [simbolos, setSimbolos] = useState<CatalogoSimbolo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlantilla = useCallback(async () => {
    setLoading(true);
    try {
      const data = await historiaService.getPlantillaVigente();
      setPlantilla(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar plantilla');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistorias = useCallback(async (pacienteId: number) => {
    setLoading(true);
    try {
      const data = await historiaService.getByPaciente(pacienteId);
      setHistorias(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar historias');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const crearHistoria = useCallback(async (form: HistoriaClinicaForm) => {
    setLoading(true);
    try {
      const data = await historiaService.create(form);
      setHistorias(prev => [...prev, data]);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear historia');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSimbolos = useCallback(async () => {
    try {
      const data = await historiaService.getSimbolos();
      setSimbolos(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar símbolos');
      throw err;
    }
  }, []);

  const fetchOdontograma = useCallback(async (historiaClinicaId: number) => {
    setLoading(true);
    try {
      const data = await historiaService.getOdontograma(historiaClinicaId);
      setOdontograma(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar odontograma');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const guardarOdontograma = useCallback(async (form: OdontogramaForm) => {
    setLoading(true);
    try {
      const data = await historiaService.saveOdontograma(form);
      setOdontograma(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar odontograma');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    plantilla, historias, odontograma, simbolos, loading, error,
    fetchPlantilla, fetchHistorias, crearHistoria,
    fetchSimbolos, fetchOdontograma, guardarOdontograma,
  };
}
