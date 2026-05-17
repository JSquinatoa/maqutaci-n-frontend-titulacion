import { TrendingUp, TrendingDown, DollarSign, BarChart3, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { revenueData, cashFlowData, expensesBreakdown } from '../data/mockData';

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

export function Finance() {
  const totalIngresos = revenueData.reduce((s, d) => s + d.ingresos, 0);
  const totalGastos = revenueData.reduce((s, d) => s + d.gastos, 0);
  const totalNeto = totalIngresos - totalGastos;

  return (
    <div className="max-w-7xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Finanzas</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Dashboard financiero — Dic 2025 – May 2026</p>
        </div>
        <div className="flex gap-2">
          {['Este mes', '3 meses', '6 meses'].map((p, i) => (
            <button
              key={p}
              className="px-3 py-1.5 rounded-xl text-xs"
              style={
                i === 2
                  ? { background: '#4A148C', color: '#fff' }
                  : { background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Ingresos totales', value: `$${totalIngresos.toLocaleString()}`,
            change: '+18% vs período anterior', positive: true,
            icon: TrendingUp, color: '#00C853', bg: '#E8F5E9',
          },
          {
            label: 'Gastos totales', value: `$${totalGastos.toLocaleString()}`,
            change: '+12% vs período anterior', positive: false,
            icon: TrendingDown, color: '#D32F2F', bg: '#FFEBEE',
          },
          {
            label: 'Utilidad neta', value: `$${totalNeto.toLocaleString()}`,
            change: `${((totalNeto / totalIngresos) * 100).toFixed(0)}% margen`, positive: true,
            icon: DollarSign, color: '#4A148C', bg: '#F3E5F5',
          },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: k.bg }}
                >
                  <Icon size={20} style={{ color: k.color }} />
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUpRight size={14} style={{ color: k.positive ? '#00C853' : '#D32F2F', transform: k.positive ? '' : 'rotate(90deg)' }} />
                  <span className="text-xs" style={{ color: k.positive ? '#00C853' : '#D32F2F' }}>
                    {k.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl" style={{ color: '#1E293B' }}>{k.value}</div>
              <div className="text-sm mt-0.5" style={{ color: '#64748B' }}>{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue vs expenses */}
        <div
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm" style={{ color: '#1E293B' }}>Evolución de ingresos y gastos</h3>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Últimos 6 meses</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8F7FF' }} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={v => <span style={{ color: '#64748B', fontSize: 12 }}>{v}</span>}
              />
              <Bar dataKey="ingresos" name="Ingresos" fill="#4A148C" radius={[6, 6, 0, 0]} />
              <Bar dataKey="gastos" name="Gastos" fill="#EDDFFC" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses breakdown pie */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="mb-4">
            <h3 className="text-sm" style={{ color: '#1E293B' }}>Distribución de gastos</h3>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Por categoría</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={expensesBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {expensesBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ borderRadius: 12, border: '1px solid #F1F5F9', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {expensesBreakdown.map((e, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>{e.name}</span>
                </div>
                <span className="text-xs" style={{ color: '#1E293B' }}>{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash flow */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm" style={{ color: '#1E293B' }}>Flujo de caja semanal</h3>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Últimas 7 semanas</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00C853' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>Ingreso</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D32F2F' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>Egreso</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={cashFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ingreso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C853" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="egreso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#D32F2F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ingreso" name="Ingreso" stroke="#00C853" strokeWidth={2} fill="url(#ingreso)" dot={{ r: 3, fill: '#00C853' }} />
            <Area type="monotone" dataKey="egreso" name="Egreso" stroke="#D32F2F" strokeWidth={2} fill="url(#egreso)" dot={{ r: 3, fill: '#D32F2F' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly breakdown table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <h3 className="text-sm" style={{ color: '#1E293B' }}>Resumen mensual</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8F7FF' }}>
              {['Mes', 'Ingresos', 'Gastos', 'Neto', 'Margen', 'Tendencia'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#64748B' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {revenueData.map((row, idx) => {
              const neto = row.ingresos - row.gastos;
              const margen = ((neto / row.ingresos) * 100).toFixed(0);
              return (
                <tr key={row.month} style={{ borderBottom: idx < revenueData.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-5 py-3 text-sm" style={{ color: '#1E293B' }}>{row.month} {row.month === 'May' ? '2026' : '2025'}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#00C853' }}>${row.ingresos.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#D32F2F' }}>${row.gastos.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#4A148C' }}>${neto.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9', maxWidth: 80 }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${margen}%`, background: parseInt(margen) > 55 ? '#00C853' : '#F59E0B' }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: '#64748B' }}>{margen}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {idx > 0 && (
                      <div className="flex items-center gap-1">
                        <ArrowUpRight
                          size={14}
                          style={{
                            color: row.ingresos > revenueData[idx - 1].ingresos ? '#00C853' : '#D32F2F',
                            transform: row.ingresos > revenueData[idx - 1].ingresos ? '' : 'rotate(90deg)',
                          }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: row.ingresos > revenueData[idx - 1].ingresos ? '#00C853' : '#D32F2F' }}
                        >
                          {(((row.ingresos - revenueData[idx - 1].ingresos) / revenueData[idx - 1].ingresos) * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
