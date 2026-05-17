// ========================================
// HISTORIA CLÍNICA SERVICE — Plantillas + Historias + Odontograma
// ========================================

import api from './api';
import type {
  PlantillaFormulario, PlantillaEstructura,
  HistoriaClinica, HistoriaClinicaForm,
  Odontograma, OdontogramaForm,
  CatalogoSimbolo
} from '../types';

// ── Mock: Plantilla Form 033 v1 ──
const MOCK_PLANTILLA: PlantillaFormulario = {
  id: 1, codigo: 'FORM-033', nombre: 'Historia Clínica Única de Odontología', version: 1, vigente: true, createdAt: '2026-01-01',
  estructura: {
    form_code: 'FORM-033', version: 1,
    title: 'Historia Clínica Única de Odontología',
    legal_notices: [
      'La información consignada es estrictamente confidencial.',
      'El paciente declara bajo juramento que los datos son verídicos.',
      'Autorizo el uso de mi información clínica para diagnóstico y tratamiento.'
    ],
    sections: [
      {
        id: 'S01', title: 'Datos del Establecimiento',
        fields: [
          { id: 'S01_F01', label: 'Institución del Sistema', type: 'text', required: true },
          { id: 'S01_F02', label: 'Unidad Operativa', type: 'text', required: true },
          { id: 'S01_F03', label: 'Código', type: 'text', required: false },
          { id: 'S01_F04', label: 'Número de Historia Clínica', type: 'text', required: true },
        ]
      },
      {
        id: 'S02', title: 'Datos del Paciente',
        fields: [
          { id: 'S02_F01', label: 'Apellido Paterno', type: 'text', required: true },
          { id: 'S02_F02', label: 'Apellido Materno', type: 'text', required: true },
          { id: 'S02_F03', label: 'Primer Nombre', type: 'text', required: true },
          { id: 'S02_F04', label: 'Segundo Nombre', type: 'text', required: false },
          { id: 'S02_F05', label: 'Sexo', type: 'select', options: ['Masculino', 'Femenino'], required: true },
          { id: 'S02_F06', label: 'Fecha de Nacimiento', type: 'date', required: true },
          { id: 'S02_F07', label: 'Edad', type: 'number', required: true },
          { id: 'S02_F08', label: 'Lugar de Nacimiento', type: 'text', required: false },
          { id: 'S02_F09', label: 'Procedencia', type: 'text', required: false },
          { id: 'S02_F10', label: 'Residencia', type: 'text', required: true },
          { id: 'S02_F11', label: 'Dirección', type: 'text', required: true },
          { id: 'S02_F12', label: 'Teléfono', type: 'text', required: true },
          { id: 'S02_F13', label: 'Estado Civil', type: 'select', options: ['Soltero/a','Casado/a','Unión Libre','Divorciado/a','Viudo/a'], required: true },
          { id: 'S02_F14', label: 'Instrucción', type: 'select', options: ['Ninguna','Primaria','Secundaria','Superior','Postgrado'], required: false },
          { id: 'S02_F15', label: 'Ocupación', type: 'text', required: false },
          { id: 'S02_F16', label: 'Empresa/Trabajo', type: 'text', required: false },
          { id: 'S02_F17', label: 'Seguro de Salud', type: 'select', options: ['IESS','ISSFA','ISSPOL','Privado','Ninguno'], required: false },
          { id: 'S02_F18', label: 'Referido por', type: 'text', required: false },
        ]
      },
      {
        id: 'S03', title: 'Motivo de Consulta',
        fields: [
          { id: 'S03_F01', label: 'Motivo de Consulta', type: 'textarea', required: true, hint: 'Anotar textualmente lo referido por el paciente' },
        ]
      },
      {
        id: 'S04', title: 'Enfermedad o Problema Actual',
        fields: [
          { id: 'S04_F01', label: 'Descripción', type: 'textarea', required: true, hint: 'Cronología, localización, características, intensidad, causa, evolución' },
        ]
      },
      {
        id: 'S05', title: 'Antecedentes Personales y Familiares',
        fields: [
          { id: 'S05_F01', label: 'Antecedentes Patológicos Personales', type: 'checklist_with_notes', options: ['Alergia antibióticos','Alergia anestesia','Hemorragias','VIH/SIDA','Tuberculosis','Asma','Diabetes','Hipertensión','Enfermedad Cardíaca','Epilepsia','Embarazo','Otro'], required: false, hint: 'Seleccionar y agregar nota si aplica' },
          { id: 'S05_F02', label: 'Antecedentes Familiares', type: 'checklist_with_notes', options: ['Diabetes','Hipertensión','Cardiopatías','Alergias','Cáncer','Tuberculosis','Otro'], required: false },
        ]
      },
      {
        id: 'S06', title: 'Constantes Vitales',
        fields: [
          { id: 'S06_F01', label: 'Presión Arterial', type: 'text', required: true, suffix: 'mmHg' },
          { id: 'S06_F02', label: 'Frecuencia Cardíaca', type: 'number', required: true, suffix: 'lpm' },
          { id: 'S06_F03', label: 'Frecuencia Respiratoria', type: 'number', required: false, suffix: 'rpm' },
          { id: 'S06_F04', label: 'Temperatura', type: 'number', required: true, suffix: '°C' },
        ]
      },
      {
        id: 'S07', title: 'Examen del Sistema Estomatognático',
        fields: [
          { id: 'S07_F01', label: 'Estructuras Evaluadas', type: 'checklist_with_notes', options: ['Labios','Mejillas','Maxilar Superior','Maxilar Inferior','Lengua','Paladar','Piso de Boca','Carrillos','Glándulas Salivales','Orofaringe','ATM','Ganglios'], required: true, hint: 'Marcar y describir hallazgos' },
        ]
      },
      {
        id: 'S08', title: 'Indicadores de Salud Bucal',
        fields: [
          { id: 'S08_F01', label: 'Piezas Cariadas (C)', type: 'number', required: true },
          { id: 'S08_F02', label: 'Piezas Perdidas (P)', type: 'number', required: true },
          { id: 'S08_F03', label: 'Piezas Obturadas (O)', type: 'number', required: true },
          { id: 'S08_F04', label: 'Total CPO-D', type: 'number', required: true, computed: 'S08_F01+S08_F02+S08_F03' },
          { id: 'S08_F05', label: 'Higiene Oral Simplificada', type: 'select', options: ['Buena','Regular','Mala'], required: true },
          { id: 'S08_F06', label: 'Enfermedad Periodontal', type: 'select', options: ['Leve','Moderada','Severa','Ninguna'], required: false },
          { id: 'S08_F07', label: 'Maloclusión', type: 'select', options: ['Clase I','Clase II','Clase III','Ninguna'], required: false },
          { id: 'S08_F08', label: 'Fluorosis', type: 'select', options: ['Leve','Moderada','Severa','Ninguna'], required: false },
        ]
      },
      {
        id: 'S09', title: 'Planes de Diagnóstico, Terapéutico y Educacional',
        fields: [
          { id: 'S09_F01', label: 'Plan de Diagnóstico', type: 'textarea', required: false },
          { id: 'S09_F02', label: 'Plan Terapéutico', type: 'textarea', required: false },
          { id: 'S09_F03', label: 'Plan Educacional', type: 'textarea', required: false },
        ]
      },
    ]
  } as PlantillaEstructura,
};

let mockHistorias: HistoriaClinica[] = [];
let mockOdontogramas: Odontograma[] = [];

const MOCK_SIMBOLOS: CatalogoSimbolo[] = [
  { id: 1, nombre: 'Sano', codigo: 'SAN', colorHex: '#F1F5F9', tipo: 'superficie', activo: true },
  { id: 2, nombre: 'Caries', codigo: 'CAR', colorHex: '#FCA5A5', tipo: 'superficie', activo: true },
  { id: 3, nombre: 'Obturado', codigo: 'OBT', colorHex: '#93C5FD', tipo: 'superficie', activo: true },
  { id: 4, nombre: 'Corona', codigo: 'COR', colorHex: '#FCD34D', tipo: 'pieza_completa', activo: true },
  { id: 5, nombre: 'Endodoncia', codigo: 'END', colorHex: '#C4B5FD', tipo: 'pieza_completa', activo: true },
  { id: 6, nombre: 'Extracción', codigo: 'EXT', colorHex: '#D1D5DB', tipo: 'pieza_completa', activo: true },
  { id: 7, nombre: 'Implante', codigo: 'IMP', colorHex: '#6EE7B7', tipo: 'pieza_completa', activo: true },
  { id: 8, nombre: 'Ausente', codigo: 'AUS', colorHex: '#E5E7EB', tipo: 'pieza_completa', activo: true },
];

const USE_MOCK = !import.meta.env.VITE_API_URL;

const historiaService = {
  // ── Plantillas ──

  async getPlantillaVigente(): Promise<PlantillaFormulario> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      return MOCK_PLANTILLA;
    }
    const { data } = await api.get<PlantillaFormulario>('/plantillas/vigente');
    return data;
  },

  // ── Historia Clínica ──

  async getByPaciente(pacienteId: number): Promise<HistoriaClinica[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      return mockHistorias.filter(h => h.pacienteId === pacienteId);
    }
    const { data } = await api.get<HistoriaClinica[]>(`/historias-clinicas/paciente/${pacienteId}`);
    return data;
  },

  async getById(id: number): Promise<HistoriaClinica> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      const h = mockHistorias.find(h => h.id === id);
      if (!h) throw new Error('Historia no encontrada');
      return h;
    }
    const { data } = await api.get<HistoriaClinica>(`/historias-clinicas/${id}`);
    return data;
  },

  async create(form: HistoriaClinicaForm): Promise<HistoriaClinica> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      const now = new Date();
      const newHistoria: HistoriaClinica = {
        id: mockHistorias.length + 1,
        pacienteId: form.pacienteId,
        plantillaId: form.plantillaId,
        usuarioId: 1,
        respuestas: form.respuestas,
        firmaPacienteUrl: form.firmaPacienteUrl,
        anioRegistro: now.getFullYear(),
        fechaRegistro: now.toISOString().slice(0, 10),
        fechaExpiracion: `${now.getFullYear() + 1}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
        bloqueada: false,
        createdAt: now.toISOString(),
      };
      mockHistorias.push(newHistoria);
      return newHistoria;
    }
    const { data } = await api.post<HistoriaClinica>('/historias-clinicas', form);
    return data;
  },

  // ── Catálogo de Símbolos ──

  async getSimbolos(): Promise<CatalogoSimbolo[]> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return MOCK_SIMBOLOS;
    }
    const { data } = await api.get<CatalogoSimbolo[]>('/catalogos/simbolos');
    return data;
  },

  // ── Odontograma ──

  async getOdontograma(historiaClinicaId: number): Promise<Odontograma | null> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      return mockOdontogramas.find(o => o.historiaClinicaId === historiaClinicaId) || null;
    }
    try {
      const { data } = await api.get<Odontograma>(`/odontogramas/historia/${historiaClinicaId}`);
      return data;
    } catch {
      return null;
    }
  },

  async saveOdontograma(form: OdontogramaForm): Promise<Odontograma> {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      const existing = mockOdontogramas.findIndex(o => o.historiaClinicaId === form.historiaClinicaId);
      const odontograma: Odontograma = {
        id: existing >= 0 ? mockOdontogramas[existing].id : mockOdontogramas.length + 1,
        historiaClinicaId: form.historiaClinicaId,
        fechaRegistro: new Date().toISOString().slice(0, 10),
        observaciones: form.observaciones,
        createdAt: new Date().toISOString(),
        detalles: form.detalles.map((d, i) => ({ ...d, id: i + 1, odontogramaId: 0 })),
      };
      if (existing >= 0) {
        mockOdontogramas[existing] = odontograma;
      } else {
        mockOdontogramas.push(odontograma);
      }
      return odontograma;
    }
    const { data } = await api.post<Odontograma>('/odontogramas', form);
    return data;
  },
};

export default historiaService;
