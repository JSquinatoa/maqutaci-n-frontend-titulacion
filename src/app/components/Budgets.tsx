import { useState } from 'react';
import { Plus, Eye, Send, X, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockBudgets } from '../data/mockData';
import { toast } from 'sonner';

type BudgetStatus = 'aprobado' | 'pendiente' | 'rechazado' | 'expirado';

const statusConfig: Record<BudgetStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  aprobado: { label: 'Aprobado', color: '#00C853', bg: '#E8F5E9', icon: CheckCircle2 },
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: '#FFFBEB', icon: Clock },
  rechazado: { label: 'Rechazado', color: '#D32F2F', bg: '#FFEBEE', icon: XCircle },
  expirado: { label: 'Expirado', color: '#64748B', bg: '#F1F5F9', icon: AlertCircle },
};

export function Budgets() {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const budget = selectedBudget ? mockBudgets.find(b => b.id === selectedBudget) : null;

  const totalAprobados = mockBudgets.filter(b => b.status === 'aprobado').reduce((s, b) => s + b.total, 0);
  const totalPendientes = mockBudgets.filter(b => b.status === 'pendiente').reduce((s, b) => s + b.total, 0);

  return (
    <div className="max-w-6xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Presupuestos</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>{mockBudgets.length} presupuestos emitidos</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)', boxShadow: '0 4px 12px rgba(74,20,140,0.25)' }}
        >
          <Plus size={16} />
          Nuevo presupuesto
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total aprobados', value: `$${totalAprobados.toLocaleString()}`, color: '#00C853', bg: '#E8F5E9' },
          { label: 'Por aprobar', value: `$${totalPendientes.toLocaleString()}`, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Emitidos este mes', value: mockBudgets.length.toString(), color: '#4A148C', bg: '#F3E5F5' },
          { label: 'Tasa de aprobación', value: `${Math.round((mockBudgets.filter(b => b.status === 'aprobado').length / mockBudgets.length) * 100)}%`, color: '#00ACC1', bg: '#E0F7FA' },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="text-xs mb-1" style={{ color: '#64748B' }}>{s.label}</div>
            <div className="text-xl" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Budget list + preview */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* List */}
        <div
          className="xl:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <h3 className="text-sm" style={{ color: '#1E293B' }}>Lista de presupuestos</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#F1F5F9' }}>
            {mockBudgets.map(b => {
              const cfg = statusConfig[b.status];
              const Icon = cfg.icon;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBudget(b.id)}
                  className="p-4 cursor-pointer transition-colors"
                  style={{
                    background: selectedBudget === b.id ? '#F3E5F5' : 'transparent',
                    borderLeft: selectedBudget === b.id ? '3px solid #4A148C' : '3px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (selectedBudget !== b.id) (e.currentTarget as HTMLDivElement).style.background = '#FAFAFA';
                  }}
                  onMouseLeave={e => {
                    if (selectedBudget !== b.id) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-mono" style={{ color: '#64748B' }}>{b.id}</span>
                    <span
                      className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <Icon size={10} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: '#1E293B' }}>{b.patient}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: '#64748B' }}>
                      {new Date(b.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-sm" style={{ color: '#4A148C' }}>${b.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div
          className="xl:col-span-3 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {budget ? (
            <>
              {/* Budget header */}
              <div
                className="px-6 py-5 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)' }}
              >
                <div
                  className="absolute right-0 top-0 bottom-0 w-32 opacity-10"
                  style={{ background: 'radial-gradient(circle at center, #fff 0%, transparent 70%)' }}
                />
                <div className="text-white/60 text-xs mb-1">PRESUPUESTO ODONTOLÓGICO</div>
                <div className="text-white text-lg">{budget.id}</div>
                <div className="flex items-center gap-4 mt-3">
                  <div>
                    <div className="text-white/60 text-xs">Emitido</div>
                    <div className="text-white text-sm">
                      {new Date(budget.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">Válido hasta</div>
                    <div className="text-white text-sm">
                      {new Date(budget.validUntil).toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <span
                    className="ml-auto text-xs px-2 py-1 rounded-full"
                    style={{ background: statusConfig[budget.status].bg, color: statusConfig[budget.status].color }}
                  >
                    {statusConfig[budget.status].label}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Patient info */}
                <div>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>Paciente</div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl text-xs text-white flex items-center justify-center"
                      style={{ background: `hsl(${(budget.patientId * 47) % 360}, 50%, 45%)` }}
                    >
                      {budget.patient.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: '#1E293B' }}>{budget.patient}</div>
                      <div className="text-xs" style={{ color: '#64748B' }}>Clínica Odonto Estetic</div>
                    </div>
                  </div>
                </div>

                {/* Items table */}
                <div>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>Tratamientos propuestos</div>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid #F1F5F9' }}
                  >
                    <table className="w-full">
                      <thead>
                        <tr style={{ background: '#F8F7FF' }}>
                          <th className="px-4 py-2.5 text-left text-xs" style={{ color: '#64748B' }}>Descripción</th>
                          <th className="px-4 py-2.5 text-center text-xs" style={{ color: '#64748B' }}>Cant.</th>
                          <th className="px-4 py-2.5 text-right text-xs" style={{ color: '#64748B' }}>Precio unit.</th>
                          <th className="px-4 py-2.5 text-right text-xs" style={{ color: '#64748B' }}>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budget.items.map((item, i) => (
                          <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                            <td className="px-4 py-3 text-sm" style={{ color: '#1E293B' }}>{item.description}</td>
                            <td className="px-4 py-3 text-sm text-center" style={{ color: '#64748B' }}>{item.qty}</td>
                            <td className="px-4 py-3 text-sm text-right" style={{ color: '#64748B' }}>${item.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-right" style={{ color: '#1E293B' }}>${(item.qty * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: '#F3E5F5', border: '1px solid #EDDFFC' }}
                >
                  <div>
                    <div className="text-sm" style={{ color: '#4A148C' }}>Total del presupuesto</div>
                    <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{budget.items.length} procedimiento{budget.items.length !== 1 ? 's' : ''}</div>
                  </div>
                  <div className="text-2xl" style={{ color: '#4A148C' }}>${budget.total.toFixed(2)}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toast.info('Enviando presupuesto al paciente')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm"
                    style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
                  >
                    <Send size={14} />
                    Enviar
                  </button>
                  {budget.status === 'pendiente' && (
                    <>
                      <button
                        onClick={() => toast.success('Presupuesto aprobado')}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white"
                        style={{ background: '#00C853' }}
                      >
                        <CheckCircle2 size={14} />
                        Aprobar
                      </button>
                      <button
                        onClick={() => toast.error('Presupuesto rechazado')}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white"
                        style={{ background: '#D32F2F' }}
                      >
                        <X size={14} />
                        Rechazar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F3E5F5' }}>
                <Eye size={24} style={{ color: '#4A148C' }} />
              </div>
              <p style={{ color: '#1E293B' }}>Selecciona un presupuesto</p>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>Haz clic en un presupuesto para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* New budget modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ color: '#1E293B' }}>Nuevo Presupuesto</h3>
              <button onClick={() => setShowNew(false)} style={{ color: '#64748B' }}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Paciente</label>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}>
                  <option>Seleccionar paciente...</option>
                  <option>María García López</option>
                  <option>Carlos Rodríguez Vega</option>
                  <option>Roberto Jiménez Cruz</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm" style={{ color: '#1E293B' }}>Tratamientos</label>
                  <button className="text-xs" style={{ color: '#00ACC1' }}>+ Agregar línea</button>
                </div>
                <div className="space-y-2">
                  {['Consulta inicial', 'Radiografía panorámica'].map((proc, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        defaultValue={proc}
                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                      />
                      <input
                        defaultValue={i === 0 ? '40.00' : '25.00'}
                        type="number"
                        className="w-24 px-3 py-2 rounded-lg text-sm outline-none text-right"
                        style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: '#F3E5F5' }}
              >
                <span className="text-sm" style={{ color: '#4A148C' }}>Total estimado</span>
                <span style={{ color: '#4A148C' }}>$65.00</span>
              </div>
              <button
                onClick={() => { toast.success('Presupuesto creado'); setShowNew(false); }}
                className="w-full py-3 rounded-xl text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)' }}
              >
                Crear presupuesto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
