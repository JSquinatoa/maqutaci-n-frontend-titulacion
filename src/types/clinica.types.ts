// ========================================
// CLÍNICA TYPES — Alineados con tablas:
//   plantilla_formulario, historia_clinica,
//   catalogo_simbolo, odontograma, odontograma_detalle
// ========================================

// --- Plantilla de Formulario (Form 033) ---

export interface PlantillaField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'checklist_with_notes';
  required: boolean;
  options?: string[];
  hint?: string;
  suffix?: string;
  computed?: string;
}

export interface PlantillaSection {
  id: string;
  title: string;
  fields: PlantillaField[];
}

export interface PlantillaEstructura {
  form_code: string;
  version: number;
  title: string;
  legal_notices: string[];
  sections: PlantillaSection[];
}

export interface PlantillaFormulario {
  id: number;
  codigo: string;
  nombre: string;
  version: number;
  estructura: PlantillaEstructura;
  vigente: boolean;
  createdAt: string;
}

// --- Historia Clínica ---

/** Valor de un campo checklist_with_notes */
export interface ChecklistValue {
  selected: string[];
  notes: Record<string, string>;
}

/** Las respuestas del formulario: clave = field ID, valor = texto/número/ChecklistValue */
export type HistoriaRespuestas = Record<string, string | number | ChecklistValue>;

export interface HistoriaClinica {
  id: number;
  pacienteId: number;
  plantillaId: number;
  usuarioId: number;
  respuestas: HistoriaRespuestas;
  firmaPacienteUrl?: string;
  anioRegistro: number;
  fechaRegistro: string;
  fechaExpiracion: string;
  bloqueada: boolean;
  createdAt: string;
  // Relaciones expandidas (opcionales)
  plantilla?: PlantillaFormulario;
  usuario?: { id: number; nombreCompleto: string };
}

export interface HistoriaClinicaForm {
  pacienteId: number;
  plantillaId: number;
  respuestas: HistoriaRespuestas;
  firmaPacienteUrl?: string;
}

// --- Catálogo de Símbolos (Odontograma) ---

export type TipoSimbolo = 'superficie' | 'pieza_completa' | 'entre_piezas';

export interface CatalogoSimbolo {
  id: number;
  nombre: string;
  codigo: string;
  colorHex: string;
  tipo: TipoSimbolo;
  descripcion?: string;
  activo: boolean;
}

// --- Odontograma ---

export type CaraDental = 'vestibular' | 'palatino' | 'lingual' | 'mesial' | 'distal' | 'oclusal' | 'incisal' | 'completa';

export interface OdontogramaDetalle {
  id?: number;
  odontogramaId?: number;
  simboloId: number;
  numeroPieza: number;
  cara: CaraDental;
  datosExtra?: Record<string, unknown>;
  // Relación expandida
  simbolo?: CatalogoSimbolo;
}

export interface Odontograma {
  id: number;
  historiaClinicaId: number;
  fechaRegistro: string;
  observaciones?: string;
  createdAt: string;
  detalles: OdontogramaDetalle[];
}

export interface OdontogramaForm {
  historiaClinicaId: number;
  observaciones?: string;
  detalles: Omit<OdontogramaDetalle, 'id' | 'odontogramaId' | 'simbolo'>[];
}
