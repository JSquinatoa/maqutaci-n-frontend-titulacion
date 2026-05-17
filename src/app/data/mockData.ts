export type PatientStatus = 'activo' | 'inactivo';
export type InvoiceStatus = 'pagada' | 'pendiente' | 'parcial' | 'anulada';
export type ToothState = 'sano' | 'caries' | 'obturado' | 'corona' | 'endodoncia' | 'extraccion' | 'implante' | 'ausente';

export interface Patient {
  id: number;
  name: string;
  cedula: string;
  phone: string;
  email: string;
  birthDate: string;
  status: PatientStatus;
  lastVisit: string;
  avatar: string;
  balance: number;
  address: string;
  allergies: string[];
  bloodType: string;
  occupation: string;
}

export interface Invoice {
  id: string;
  patient: string;
  patientId: number;
  date: string;
  procedures: string[];
  subtotal: number;
  discount: number;
  total: number;
  paid: number;
  status: InvoiceStatus;
}

export interface Session {
  id: number;
  patientId: number;
  patient: string;
  date: string;
  time: string;
  procedure: string;
  doctor: string;
  status: 'completada' | 'pendiente' | 'cancelada' | 'en-curso';
  notes: string;
}

export interface Budget {
  id: string;
  patient: string;
  patientId: number;
  date: string;
  validUntil: string;
  items: { description: string; qty: number; price: number }[];
  total: number;
  status: 'aprobado' | 'pendiente' | 'rechazado' | 'expirado';
}

export const mockPatients: Patient[] = [
  { id: 1, name: 'María García López', cedula: '1723456789', phone: '0991-234-567', email: 'maria.garcia@email.com', birthDate: '1985-03-15', status: 'activo', lastVisit: '2026-05-10', avatar: 'MG', balance: -45.00, address: 'Av. Amazonas N24-55', allergies: ['Penicilina'], bloodType: 'O+', occupation: 'Docente' },
  { id: 2, name: 'Carlos Rodríguez Vega', cedula: '1734567890', phone: '0987-654-321', email: 'carlos.r@email.com', birthDate: '1978-07-22', status: 'activo', lastVisit: '2026-05-08', avatar: 'CR', balance: 0, address: 'Calle Veintimilla E4-20', allergies: [], bloodType: 'A+', occupation: 'Ingeniero' },
  { id: 3, name: 'Ana Martínez Soto', cedula: '1745678901', phone: '0976-543-210', email: 'ana.m@email.com', birthDate: '1992-11-08', status: 'activo', lastVisit: '2026-05-15', avatar: 'AM', balance: -120.00, address: 'Av. 6 de Diciembre N35-100', allergies: [], bloodType: 'B+', occupation: 'Médico' },
  { id: 4, name: 'Roberto Jiménez Cruz', cedula: '1756789012', phone: '0965-432-109', email: 'roberto.j@email.com', birthDate: '1970-01-30', status: 'activo', lastVisit: '2026-04-28', avatar: 'RJ', balance: 200.00, address: 'Av. República del Salvador N34-84', allergies: ['Ibuprofeno', 'Aspirina'], bloodType: 'AB+', occupation: 'Empresario' },
  { id: 5, name: 'Lucía Fernández Mora', cedula: '1767890123', phone: '0954-321-098', email: 'lucia.f@email.com', birthDate: '1995-09-12', status: 'activo', lastVisit: '2026-05-12', avatar: 'LF', balance: 0, address: 'Av. Colón E4-30', allergies: [], bloodType: 'A-', occupation: 'Diseñadora' },
  { id: 6, name: 'Diego Torres Ruiz', cedula: '1778901234', phone: '0943-210-987', email: 'diego.t@email.com', birthDate: '1988-04-25', status: 'inactivo', lastVisit: '2025-12-15', avatar: 'DT', balance: -75.00, address: 'Av. Shyris N35-174', allergies: [], bloodType: 'O-', occupation: 'Contador' },
  { id: 7, name: 'Valentina Castro Paz', cedula: '1789012345', phone: '0932-109-876', email: 'vale.c@email.com', birthDate: '2000-06-18', status: 'activo', lastVisit: '2026-05-14', avatar: 'VC', balance: 0, address: 'Av. Naciones Unidas E4-10', allergies: [], bloodType: 'B-', occupation: 'Estudiante' },
  { id: 8, name: 'Andrés Morales León', cedula: '1790123456', phone: '0921-098-765', email: 'andres.m@email.com', birthDate: '1965-12-03', status: 'activo', lastVisit: '2026-05-05', avatar: 'AM', balance: 150.00, address: 'Av. Patria E4-25', allergies: ['Latex'], bloodType: 'O+', occupation: 'Abogado' },
  { id: 9, name: 'Sofía Herrera Vidal', cedula: '1801234567', phone: '0910-987-654', email: 'sofia.h@email.com', birthDate: '1998-02-14', status: 'activo', lastVisit: '2026-05-13', avatar: 'SH', balance: 0, address: 'Av. Eloy Alfaro N32-15', allergies: [], bloodType: 'A+', occupation: 'Periodista' },
  { id: 10, name: 'Miguel Ángel Torres', cedula: '1812345678', phone: '0909-876-543', email: 'miguel.t@email.com', birthDate: '1975-08-20', status: 'activo', lastVisit: '2026-05-09', avatar: 'MT', balance: -200.00, address: 'Av. América N26-10', allergies: ['Penicilina', 'Sulfa'], bloodType: 'AB-', occupation: 'Arquitecto' },
];

export const mockInvoices: Invoice[] = [
  { id: 'FAC-2026-001', patient: 'María García López', patientId: 1, date: '2026-05-10', procedures: ['Consulta general', 'Profilaxis dental'], subtotal: 80.00, discount: 0, total: 80.00, paid: 80.00, status: 'pagada' },
  { id: 'FAC-2026-002', patient: 'Carlos Rodríguez Vega', patientId: 2, date: '2026-05-08', procedures: ['Extracción dental', 'Radiografía periapical'], subtotal: 120.00, discount: 10.00, total: 110.00, paid: 110.00, status: 'pagada' },
  { id: 'FAC-2026-003', patient: 'Ana Martínez Soto', patientId: 3, date: '2026-05-15', procedures: ['Blanqueamiento dental', 'Consulta general'], subtotal: 200.00, discount: 0, total: 200.00, paid: 80.00, status: 'parcial' },
  { id: 'FAC-2026-004', patient: 'Roberto Jiménez Cruz', patientId: 4, date: '2026-05-01', procedures: ['Corona dental', 'Endodoncia'], subtotal: 450.00, discount: 50.00, total: 400.00, paid: 0, status: 'pendiente' },
  { id: 'FAC-2026-005', patient: 'Lucía Fernández Mora', patientId: 5, date: '2026-05-12', procedures: ['Ortodoncia mensual'], subtotal: 85.00, discount: 0, total: 85.00, paid: 85.00, status: 'pagada' },
  { id: 'FAC-2026-006', patient: 'Valentina Castro Paz', patientId: 7, date: '2026-05-14', procedures: ['Resina dental', 'Radiografía bite-wing'], subtotal: 95.00, discount: 0, total: 95.00, paid: 0, status: 'pendiente' },
  { id: 'FAC-2026-007', patient: 'Andrés Morales León', patientId: 8, date: '2026-05-05', procedures: ['Implante dental'], subtotal: 800.00, discount: 0, total: 800.00, paid: 400.00, status: 'parcial' },
  { id: 'FAC-2026-008', patient: 'Sofía Herrera Vidal', patientId: 9, date: '2026-05-13', procedures: ['Limpieza dental', 'Flúor'], subtotal: 60.00, discount: 0, total: 60.00, paid: 60.00, status: 'pagada' },
  { id: 'FAC-2026-009', patient: 'Miguel Ángel Torres', patientId: 10, date: '2026-05-09', procedures: ['Prótesis parcial'], subtotal: 600.00, discount: 0, total: 600.00, paid: 400.00, status: 'parcial' },
  { id: 'FAC-2026-010', patient: 'Diego Torres Ruiz', patientId: 6, date: '2025-12-15', procedures: ['Consulta general'], subtotal: 40.00, discount: 0, total: 40.00, paid: 0, status: 'pendiente' },
];

export const mockSessions: Session[] = [
  { id: 1, patientId: 1, patient: 'María García López', date: '2026-05-17', time: '09:00', procedure: 'Profilaxis dental', doctor: 'Dr. Alberto Ruiz', status: 'pendiente', notes: '' },
  { id: 2, patientId: 3, patient: 'Ana Martínez Soto', date: '2026-05-17', time: '10:00', procedure: 'Blanqueamiento - 2da sesión', doctor: 'Dr. Alberto Ruiz', status: 'en-curso', notes: 'Paciente sensible' },
  { id: 3, patientId: 5, patient: 'Lucía Fernández Mora', date: '2026-05-17', time: '11:30', procedure: 'Control ortodoncia', doctor: 'Dra. Carmen López', status: 'completada', notes: '' },
  { id: 4, patientId: 7, patient: 'Valentina Castro Paz', date: '2026-05-17', time: '14:00', procedure: 'Resina compuesta #25', doctor: 'Dr. Alberto Ruiz', status: 'pendiente', notes: '' },
  { id: 5, patientId: 9, patient: 'Sofía Herrera Vidal', date: '2026-05-17', time: '15:30', procedure: 'Control post-tratamiento', doctor: 'Dra. Carmen López', status: 'pendiente', notes: '' },
  { id: 6, patientId: 2, patient: 'Carlos Rodríguez Vega', date: '2026-05-18', time: '09:30', procedure: 'Control extracción', doctor: 'Dr. Alberto Ruiz', status: 'pendiente', notes: '' },
];

export const mockBudgets: Budget[] = [
  { id: 'PRE-2026-001', patient: 'Roberto Jiménez Cruz', patientId: 4, date: '2026-04-25', validUntil: '2026-05-25', items: [{ description: 'Endodoncia pieza #26', qty: 1, price: 180.00 }, { description: 'Corona porcelana pieza #26', qty: 1, price: 270.00 }], total: 450.00, status: 'aprobado' },
  { id: 'PRE-2026-002', patient: 'Andrés Morales León', patientId: 8, date: '2026-04-20', validUntil: '2026-05-20', items: [{ description: 'Implante dental titanio', qty: 1, price: 600.00 }, { description: 'Corona implante', qty: 1, price: 200.00 }], total: 800.00, status: 'aprobado' },
  { id: 'PRE-2026-003', patient: 'Miguel Ángel Torres', patientId: 10, date: '2026-05-05', validUntil: '2026-06-05', items: [{ description: 'Prótesis parcial removible superior', qty: 1, price: 350.00 }, { description: 'Prótesis parcial removible inferior', qty: 1, price: 350.00 }, { description: 'Consulta y evaluación', qty: 1, price: 40.00 }], total: 740.00, status: 'pendiente' },
  { id: 'PRE-2026-004', patient: 'Ana Martínez Soto', patientId: 3, date: '2026-05-10', validUntil: '2026-06-10', items: [{ description: 'Blanqueamiento dental profesional', qty: 1, price: 180.00 }, { description: 'Resinas estéticas (x4)', qty: 4, price: 65.00 }], total: 440.00, status: 'pendiente' },
];

export const revenueData = [
  { month: 'Dic', ingresos: 3200, gastos: 1400 },
  { month: 'Ene', ingresos: 4100, gastos: 1800 },
  { month: 'Feb', ingresos: 3800, gastos: 1600 },
  { month: 'Mar', ingresos: 5200, gastos: 2100 },
  { month: 'Abr', ingresos: 4600, gastos: 1900 },
  { month: 'May', ingresos: 5800, gastos: 2300 },
];

export const proceduresData = [
  { name: 'Consulta', count: 45, color: '#4A148C' },
  { name: 'Profilaxis', count: 32, color: '#00ACC1' },
  { name: 'Resinas', count: 28, color: '#7B1FA2' },
  { name: 'Extracciones', count: 18, color: '#0097A7' },
  { name: 'Ortodoncia', count: 20, color: '#00838F' },
  { name: 'Endodoncia', count: 12, color: '#6A1B9A' },
  { name: 'Coronas', count: 8, color: '#880E4F' },
  { name: 'Implantes', count: 5, color: '#004D40' },
];

export const expensesBreakdown = [
  { name: 'Materiales', value: 35, color: '#4A148C' },
  { name: 'Personal', value: 30, color: '#00ACC1' },
  { name: 'Arriendo', value: 15, color: '#7B1FA2' },
  { name: 'Servicios', value: 10, color: '#00838F' },
  { name: 'Otros', value: 10, color: '#64748B' },
];

export const cashFlowData = [
  { week: 'S1 Abr', ingreso: 1200, egreso: 480 },
  { week: 'S2 Abr', ingreso: 980, egreso: 320 },
  { week: 'S3 Abr', ingreso: 1450, egreso: 560 },
  { week: 'S4 Abr', ingreso: 1100, egreso: 420 },
  { week: 'S1 May', ingreso: 1600, egreso: 620 },
  { week: 'S2 May', ingreso: 1380, egreso: 500 },
  { week: 'S3 May', ingreso: 1820, egreso: 700 },
];
