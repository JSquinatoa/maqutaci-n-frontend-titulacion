import { useState } from 'react';
import {
  ArrowLeft, Phone, Mail, MapPin, Heart, AlertTriangle,
  FileText, Activity, Receipt, Calendar, TrendingUp,
  CheckCircle2, Clock, Edit, Plus
} from 'lucide-react';
import { mockPatients, mockInvoices, mockSessions } from '../data/mockData';
import { toast } from 'sonner';

interface PatientProfileProps {
  patientId: number | null;
  onBack: () => void;
}

type Tab = 'resumen' | 'historia' | 'facturas' | 'sesiones' | 'presupuestos';

const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
  { id: 'resumen', label: 'Resumen', icon: Activity },
  { id: 'historia', label: 'Historia Clínica', icon: FileText },
  { id: 'facturas', label: 'Facturas', icon: Receipt },
  { id: 'sesiones', label: 'Sesiones', icon: Calendar },
  { id: 'presupuestos', label: 'Presupuestos', icon: TrendingUp },
];

const invoiceStatusConfig = {
  pagada: { label: 'Pagada', color: '#00C853', bg: '#E8F5E9' },
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: '#FFFBEB' },
  parcial: { label: 'Parcial', color: '#00ACC1', bg: '#E0F7FA' },
  anulada: { label: 'Anulada', color: '#D32F2F', bg: '#FFEBEE' },
};

const sessionStatusConfig = {
  completada: { label: 'Completada', color: '#00C853', bg: '#E8F5E9' },
  pendiente: { label: 'Pendiente', color: '#64748B', bg: '#F1F5F9' },
  'en-curso': { label: 'En curso', color: '#00ACC1', bg: '#E0F7FA' },
  cancelada: { label: 'Cancelada', color: '#D32F2F', bg: '#FFEBEE' },
};

export function PatientProfile({ patientId, onBack }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('resumen');

  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0];
  const patientInvoices = mockInvoices.filter(i => i.patientId === patient.id);
  const patientSessions = mockSessions.filter(s => s.patientId === patient.id);

  const totalBilled = patientInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = patientInvoices.reduce((sum, i) => sum + i.paid, 0);
  const calcAge = (birthDate: string) => {
    const today = new Date(2026, 4, 17);
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  return (
    <div className="max-w-6xl space-y-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm transition-colors"
        style={{ color: '#64748B' }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#4A148C')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#64748B')}
      >
        <ArrowLeft size={16} />
        Volver a pacientes
      </button>

      {/* Patient header card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {/* Gradient accent strip */}
        <div
          className="h-3 relative"
          style={{ background: 'linear-gradient(135deg, #4A148C 0%, #00ACC1 100%)' }}
        />

        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl text-white flex items-center justify-center text-lg shadow-md flex-shrink-0"
                style={{ background: `hsl(${(patient.id * 47) % 360}, 50%, 45%)` }}
              >
                {patient.avatar}
              </div>
              <div>
                <h2 className="text-lg" style={{ color: '#1E293B' }}>{patient.name}</h2>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    {calcAge(patient.birthDate)} años • {patient.bloodType}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: patient.status === 'activo' ? '#E8F5E9' : '#F1F5F9',
                      color: patient.status === 'activo' ? '#00C853' : '#64748B',
                    }}
                  >
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                  {patient.allergies.length > 0 && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
                      <AlertTriangle size={10} />
                      Alergias registradas
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => toast.info('Editando paciente')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors"
                style={{ background: '#F8F7FF', color: '#4A148C', border: '1.5px solid #EDDFFC' }}
              >
                <Edit size={14} />
                Editar
              </button>
              <button
                onClick={() => toast.success('Nueva sesión creada')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)', boxShadow: '0 4px 12px rgba(74,20,140,0.25)' }}
              >
                <Plus size={14} />
                Nueva sesión
              </button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoItem icon={<Phone size={14} />} label="Teléfono" value={patient.phone} />
            <InfoItem icon={<Mail size={14} />} label="Email" value={patient.email} />
            <InfoItem icon={<MapPin size={14} />} label="Dirección" value={patient.address} />
            <InfoItem icon={<Heart size={14} />} label="Ocupación" value={patient.occupation} />
          </div>

          {patient.allergies.length > 0 && (
            <div
              className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
            >
              <AlertTriangle size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 1 }} />
              <div>
                <span className="text-sm" style={{ color: '#92400E' }}>
                  <strong>Alergias:</strong> {patient.allergies.join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {/* Tab nav */}
        <div
          className="flex border-b overflow-x-auto"
          style={{ borderColor: '#F1F5F9' }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-3.5 text-sm whitespace-nowrap transition-all relative flex-shrink-0"
                style={{
                  color: activeTab === tab.id ? '#4A148C' : '#64748B',
                  borderBottom: activeTab === tab.id ? '2px solid #4A148C' : '2px solid transparent',
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === 'resumen' && <ResumenTab patient={patient} sessions={patientSessions} invoices={patientInvoices} />}
          {activeTab === 'historia' && <HistoriaTab patient={patient} />}
          {activeTab === 'facturas' && <FacturasTab invoices={patientInvoices} />}
          {activeTab === 'sesiones' && <SesionesTab sessions={patientSessions} />}
          {activeTab === 'presupuestos' && <PresupuestosTab />}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5" style={{ color: '#4A148C' }}>{icon}</div>
      <div>
        <div className="text-xs" style={{ color: '#64748B' }}>{label}</div>
        <div className="text-sm" style={{ color: '#1E293B' }}>{value}</div>
      </div>
    </div>
  );
}

function ResumenTab({ patient, sessions, invoices }: any) {
  const timeline = [
    { date: '2026-05-10', type: 'sesion', desc: 'Profilaxis dental completada', color: '#00C853' },
    { date: '2026-04-22', type: 'factura', desc: 'Factura FAC-2026-001 emitida - $80.00', color: '#4A148C' },
    { date: '2026-04-22', type: 'sesion', desc: 'Consulta general', color: '#00C853' },
    { date: '2026-03-15', type: 'historia', desc: 'Historia clínica actualizada', color: '#00ACC1' },
    { date: '2026-02-10', type: 'sesion', desc: 'Control de brackets', color: '#00C853' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h3 className="text-sm mb-4" style={{ color: '#1E293B' }}>Historial de actividad</h3>
        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 mt-1" style={{ background: '#F1F5F9', minHeight: 24 }} />
                )}
              </div>
              <div className="pb-3">
                <div className="text-sm" style={{ color: '#1E293B' }}>{item.desc}</div>
                <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                  {new Date(item.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm mb-3" style={{ color: '#1E293B' }}>Próximas citas</h3>
          {sessions.filter((s: any) => s.status === 'pendiente').length === 0 ? (
            <div className="text-center py-6 rounded-xl" style={{ background: '#F8F7FF' }}>
              <p className="text-sm" style={{ color: '#64748B' }}>Sin citas programadas</p>
              <button className="text-xs mt-2" style={{ color: '#00ACC1' }}>Agendar cita</button>
            </div>
          ) : (
            sessions.filter((s: any) => s.status === 'pendiente').map((s: any) => (
              <div key={s.id} className="p-3 rounded-xl" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
                <div className="text-sm" style={{ color: '#1E293B' }}>{s.procedure}</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>{s.date} — {s.time}</div>
              </div>
            ))
          )}
        </div>

        <div>
          <h3 className="text-sm mb-3" style={{ color: '#1E293B' }}>Historia Clínica</h3>
          <div className="p-3 rounded-xl" style={{ background: '#F3E5F5', border: '1px solid #EDDFFC' }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={14} style={{ color: '#4A148C' }} />
              <span className="text-sm" style={{ color: '#4A148C' }}>Vigente</span>
            </div>
            <div className="text-xs" style={{ color: '#64748B' }}>
              Última actualización: 15 Mar 2026
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#F59E0B' }}>
              ⚠ Vence en 10 meses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoriaTab({ patient }: any) {
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const toothStates: Record<number, string> = {
    16: 'obturado', 36: 'caries', 46: 'corona', 11: 'obturado', 21: 'obturado',
  };

  const stateColors: Record<string, string> = {
    sano: '#F1F5F9',
    caries: '#FCA5A5',
    obturado: '#93C5FD',
    corona: '#FCD34D',
    endodoncia: '#C4B5FD',
    extraccion: '#D1D5DB',
    implante: '#6EE7B7',
    ausente: '#E5E7EB',
  };

  const ToothBox = ({ num }: { num: number }) => {
    const state = toothStates[num] || 'sano';
    const color = stateColors[state];
    return (
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-7 h-8 rounded flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          style={{ background: color, border: '1.5px solid #D9D9D9' }}
          title={`Pieza #${num}: ${state}`}
        />
        <span className="text-xs" style={{ color: '#64748B', fontSize: 9 }}>{num}</span>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm" style={{ color: '#1E293B' }}>Historia Clínica del Paciente</h3>
        <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#F3E5F5', color: '#4A148C' }}>
          Actualizar historia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Antecedentes Médicos', items: ['Hipertensión controlada', 'Ningún episodio cardíaco'] },
          { title: 'Alergias', items: patient.allergies.length > 0 ? patient.allergies : ['Sin alergias conocidas'] },
          { title: 'Medicamentos', items: ['Losartán 50mg - diario'] },
          { title: 'Hábitos', items: ['No fumador', 'Consumo moderado de café'] },
        ].map((section, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
            <h4 className="text-xs uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>{section.title}</h4>
            <ul className="space-y-1.5">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#1E293B' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4A148C' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
        <h4 className="text-xs uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>Diagnóstico actual</h4>
        <p className="text-sm" style={{ color: '#1E293B' }}>
          Paciente con gingivitis leve en sector posterior superior. Se recomienda profilaxis cada 6 meses y control de higiene oral diaria.
        </p>
      </div>

      {/* Odontograma integrado */}
      <div>
        <h3 className="text-sm mb-4" style={{ color: '#1E293B' }}>Odontograma dental</h3>
        <div className="p-4 rounded-xl overflow-x-auto" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
          <div className="flex flex-col items-center gap-4 min-w-max mx-auto" style={{ width: 'fit-content' }}>
            {/* Upper */}
            <div>
              <div className="text-xs text-center mb-2" style={{ color: '#64748B' }}>Superior</div>
              <div className="flex gap-1">
                {upperTeeth.map(n => <ToothBox key={n} num={n} />)}
              </div>
            </div>
            <div className="w-full h-px" style={{ background: '#D9D9D9' }} />
            {/* Lower */}
            <div>
              <div className="flex gap-1">
                {lowerTeeth.map(n => <ToothBox key={n} num={n} />)}
              </div>
              <div className="text-xs text-center mt-2" style={{ color: '#64748B' }}>Inferior</div>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(stateColors).slice(0, 6).map(([state, color]) => (
            <div key={state} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: color, border: '1px solid #D9D9D9' }} />
              <span className="text-xs capitalize" style={{ color: '#64748B' }}>{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function FacturasTab({ invoices }: any) {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <Receipt size={40} className="mx-auto mb-3" style={{ color: '#D9D9D9' }} />
        <p style={{ color: '#1E293B' }}>Sin facturas registradas</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {invoices.map((inv: any) => {
        const cfg = invoiceStatusConfig[inv.status as keyof typeof invoiceStatusConfig];
        return (
          <div key={inv.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: '#64748B' }}>{inv.id}</span>
                <span className="text-xs" style={{ color: '#64748B' }}>
                  {new Date(inv.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="text-sm mt-0.5" style={{ color: '#1E293B' }}>{inv.procedures.join(', ')}</div>
            </div>
            <div className="text-right">
              <div className="text-sm" style={{ color: '#1E293B' }}>${inv.total.toFixed(2)}</div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SesionesTab({ sessions }: any) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar size={40} className="mx-auto mb-3" style={{ color: '#D9D9D9' }} />
        <p style={{ color: '#1E293B' }}>Sin sesiones registradas</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm" style={{ color: '#1E293B' }}>Sesiones del paciente</h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: '#E0F7FA', color: '#00ACC1' }}
          >
            {sessions.length} total{sessions.length !== 1 ? 'es' : ''}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {sessions.map((s: any) => {
          const cfg = sessionStatusConfig[s.status as keyof typeof sessionStatusConfig];
          return (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}>
              <div className="flex-1">
                <div className="text-sm" style={{ color: '#1E293B' }}>{s.procedure}</div>
                <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{s.date} — {s.time} · {s.doctor}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PresupuestosTab() {
  return (
    <div className="text-center py-12">
      <TrendingUp size={40} className="mx-auto mb-3" style={{ color: '#D9D9D9' }} />
      <p style={{ color: '#1E293B' }}>Sin presupuestos registrados</p>
      <button className="mt-3 text-sm px-4 py-2 rounded-xl text-white" style={{ background: '#4A148C' }}>
        Crear presupuesto
      </button>
    </div>
  );
}
