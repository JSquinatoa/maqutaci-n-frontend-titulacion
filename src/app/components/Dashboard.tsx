import { Users, Receipt, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { revenueData, proceduresData, mockSessions, mockInvoices } from '../data/mockData';
import type { View } from './Layout';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const kpis = [
  { title: 'Total Pacientes', value: '284', change: '+12', positive: true, icon: Users, color: '#4A148C', bg: '#F3E5F5' },
  { title: 'Facturación Mayo', value: '$5,840', change: '+18%', positive: true, icon: TrendingUp, color: '#00ACC1', bg: '#E0F7FA' },
  { title: 'Citas Hoy', value: '8', change: '5 completadas', positive: true, icon: Calendar, color: '#00C853', bg: '#E8F5E9' },
  { title: 'Cobros Pendientes', value: '$695', change: '-3 facturas', positive: false, icon: Receipt, color: '#D32F2F', bg: '#FFEBEE' },
];

const sessionStatusConfig = {
  completada: { label: 'Completada', color: '#00C853', bg: '#E8F5E9', icon: CheckCircle2 },
  pendiente: { label: 'Pendiente', color: '#64748B', bg: '#F1F5F9', icon: Clock },
  'en-curso': { label: 'En curso', color: '#00ACC1', bg: '#E0F7FA', icon: Clock },
  cancelada: { label: 'Cancelada', color: '#D32F2F', bg: '#FFEBEE', icon: AlertCircle },
};

const invoiceStatusConfig = {
  pagada: { label: 'Pagada', color: '#00C853', bg: '#E8F5E9' },
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: '#FFFBEB' },
  parcial: { label: 'Parcial', color: '#00ACC1', bg: '#E0F7FA' },
  anulada: { label: 'Anulada', color: '#D32F2F', bg: '#FFEBEE' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-lg p-3" style={{ background: '#fff', border: '1px solid #F1F5F9', minWidth: 160 }}>
        <p className="text-sm mb-2" style={{ color: '#64748B' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: '#64748B' }}>{p.name}:</span>
            <span style={{ color: '#1E293B' }}>${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const todaySessions = mockSessions.filter(s => s.date === '2026-05-17');
  const recentInvoices = mockInvoices.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 60%, #00ACC1 100%)',
          boxShadow: '0 4px 20px rgba(74,20,140,0.25)',
        }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-48 opacity-10"
          style={{
            background: 'radial-gradient(circle at center, #fff 0%, transparent 70%)',
          }}
        />
        <div>
          <h2 className="text-white text-lg">¡Buenos días, Dr. Alberto! 👋</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Tienes <strong style={{ color: '#fff' }}>8 citas programadas</strong> hoy y{' '}
            <strong style={{ color: '#fff' }}>3 cobros pendientes</strong> por gestionar.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('sesiones')}
            className="px-4 py-2 rounded-xl text-sm text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            Ver agenda
          </button>
          <button
            onClick={() => onNavigate('pacientes')}
            className="px-4 py-2 rounded-xl text-sm transition-all"
            style={{ background: '#fff', color: '#4A148C' }}
          >
            Nuevo paciente
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-5 transition-all cursor-pointer"
              style={{
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid #F1F5F9',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: kpi.bg }}
                >
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <button style={{ color: '#D9D9D9' }}><MoreHorizontal size={16} /></button>
              </div>
              <div className="text-2xl" style={{ color: '#1E293B' }}>{kpi.value}</div>
              <div className="text-sm mt-0.5" style={{ color: '#64748B' }}>{kpi.title}</div>
              <div className="flex items-center gap-1 mt-3">
                {kpi.positive ? (
                  <ArrowUpRight size={14} style={{ color: '#00C853' }} />
                ) : (
                  <ArrowDownRight size={14} style={{ color: '#D32F2F' }} />
                )}
                <span className="text-xs" style={{ color: kpi.positive ? '#00C853' : '#D32F2F' }}>
                  {kpi.change}
                </span>
                <span className="text-xs" style={{ color: '#64748B' }}>vs mes anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm" style={{ color: '#1E293B' }}>Ingresos vs Gastos</h3>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#4A148C' }} />
                <span className="text-xs" style={{ color: '#64748B' }}>Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#EDDFFC' }} />
                <span className="text-xs" style={{ color: '#64748B' }}>Gastos</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A148C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4A148C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ACC1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00ACC1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#4A148C" strokeWidth={2} fill="url(#colorIngresos)" dot={false} />
              <Area type="monotone" dataKey="gastos" name="Gastos" stroke="#00ACC1" strokeWidth={2} fill="url(#colorGastos)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Procedures chart */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="mb-5">
            <h3 className="text-sm" style={{ color: '#1E293B' }}>Procedimientos del mes</h3>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Top 8 realizados</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={proceduresData} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip cursor={{ fill: '#F8F7FF' }} contentStyle={{ borderRadius: 12, border: '1px solid #F1F5F9', fontSize: 12 }} />
              <Bar dataKey="count" name="Casos" radius={[0, 6, 6, 0]} fill="#4A148C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sessions + Invoices row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Today sessions */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ color: '#1E293B' }}>Citas de hoy</h3>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Domingo, 17 Mayo 2026</p>
            </div>
            <button
              onClick={() => onNavigate('sesiones')}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: '#4A148C', background: '#F3E5F5' }}
            >
              Ver agenda
            </button>
          </div>
          <div className="space-y-2">
            {todaySessions.map(s => {
              const cfg = sessionStatusConfig[s.status];
              const Icon = cfg.icon;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ background: '#4A148C' }}
                  >
                    {s.patient.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: '#1E293B' }}>{s.patient}</div>
                    <div className="text-xs truncate" style={{ color: '#64748B' }}>{s.procedure}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs" style={{ color: '#1E293B' }}>{s.time}</div>
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-0.5"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      <Icon size={10} />
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent invoices */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ color: '#1E293B' }}>Facturas recientes</h3>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Últimas transacciones</p>
            </div>
            <button
              onClick={() => onNavigate('facturacion')}
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ color: '#4A148C', background: '#F3E5F5' }}
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-2">
            {recentInvoices.map(inv => {
              const cfg = invoiceStatusConfig[inv.status];
              return (
                <div
                  key={inv.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: '#64748B' }}>{inv.id}</span>
                    </div>
                    <div className="text-sm truncate" style={{ color: '#1E293B' }}>{inv.patient}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm" style={{ color: '#1E293B' }}>${inv.total.toFixed(2)}</div>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full mt-0.5"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Historias por vencer', value: '3', desc: 'En los próximos 30 días', color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Cobros del día', value: '$320', desc: 'Meta: $500', color: '#00C853', bg: '#E8F5E9' },
          { label: 'Nuevos pacientes', value: '7', desc: 'Este mes', color: '#4A148C', bg: '#F3E5F5' },
          { label: 'Tasa de retorno', value: '78%', desc: 'Pacientes recurrentes', color: '#00ACC1', bg: '#E0F7FA' },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div
              className="text-xs mb-2 px-2 py-0.5 rounded-full inline-block"
              style={{ background: s.bg, color: s.color }}
            >
              {s.label}
            </div>
            <div className="text-2xl" style={{ color: '#1E293B' }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: '#64748B' }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
