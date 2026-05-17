import { useState } from 'react';
import { Plus, Search, Filter, Eye, Printer, X, CheckCircle2, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { mockInvoices, type InvoiceStatus } from '../data/mockData';
import { toast } from 'sonner';

const statusConfig: Record<InvoiceStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  pagada: { label: 'Pagada', color: '#00C853', bg: '#E8F5E9', icon: CheckCircle2 },
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: '#FFFBEB', icon: Clock },
  parcial: { label: 'Parcial', color: '#00ACC1', bg: '#E0F7FA', icon: AlertCircle },
  anulada: { label: 'Anulada', color: '#D32F2F', bg: '#FFEBEE', icon: X },
};

export function Billing() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'todas'>('todas');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = mockInvoices.filter(inv => {
    const matchSearch = inv.patient.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todas' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalBilled = mockInvoices.reduce((s, i) => s + i.total, 0);
  const totalPaid = mockInvoices.reduce((s, i) => s + i.paid, 0);
  const totalPending = totalBilled - totalPaid;
  const totalPagadas = mockInvoices.filter(i => i.status === 'pagada').length;
  const totalPendientes = mockInvoices.filter(i => i.status === 'pendiente').length;

  const invoice = selectedInvoice ? mockInvoices.find(i => i.id === selectedInvoice) : null;

  return (
    <div className="max-w-7xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Facturación</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>{mockInvoices.length} facturas en el sistema</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)', boxShadow: '0 4px 12px rgba(74,20,140,0.25)' }}
        >
          <Plus size={16} />
          Nueva factura
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total facturado', value: `$${totalBilled.toFixed(2)}`, color: '#4A148C', bg: '#F3E5F5', sub: 'Mayo 2026' },
          { label: 'Total cobrado', value: `$${totalPaid.toFixed(2)}`, color: '#00C853', bg: '#E8F5E9', sub: `${totalPagadas} facturas` },
          { label: 'Por cobrar', value: `$${totalPending.toFixed(2)}`, color: '#D32F2F', bg: '#FFEBEE', sub: `${totalPendientes} pendientes` },
          { label: 'Tasa de cobro', value: `${((totalPaid / totalBilled) * 100).toFixed(0)}%`, color: '#00ACC1', bg: '#E0F7FA', sub: 'Eficiencia' },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: s.bg }}
            >
              <DollarSign size={18} style={{ color: s.color }} />
            </div>
            <div className="text-xl" style={{ color: '#1E293B' }}>{s.value}</div>
            <div className="text-sm" style={{ color: '#64748B' }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: s.color }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por paciente o número de factura..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ background: '#F8F7FF', border: '1.5px solid #F1F5F9', color: '#1E293B' }}
              onFocus={e => (e.target.style.borderColor = '#4A148C')}
              onBlur={e => (e.target.style.borderColor = '#F1F5F9')}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['todas', 'pagada', 'pendiente', 'parcial', 'anulada'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-2 rounded-xl text-xs capitalize transition-all"
                style={
                  statusFilter === s
                    ? { background: '#4A148C', color: '#fff' }
                    : { background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }
                }
              >
                {s === 'todas' ? 'Todas' : statusConfig[s as InvoiceStatus].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8F7FF', borderBottom: '1px solid #F1F5F9' }}>
                {['N° Factura', 'Paciente', 'Fecha', 'Procedimientos', 'Total', 'Pagado', 'Saldo', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#64748B' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => {
                const cfg = statusConfig[inv.status];
                const Icon = cfg.icon;
                const saldo = inv.total - inv.paid;
                return (
                  <tr
                    key={inv.id}
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                    onClick={() => setSelectedInvoice(inv.id)}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = '#FAFAFA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono" style={{ color: '#4A148C' }}>{inv.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg text-xs text-white flex items-center justify-center flex-shrink-0"
                          style={{ background: `hsl(${(inv.patientId * 47) % 360}, 50%, 45%)` }}
                        >
                          {inv.patient.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <span className="text-sm" style={{ color: '#1E293B' }}>{inv.patient}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#64748B' }}>
                        {new Date(inv.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {inv.procedures.slice(0, 2).map((p, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#F3E5F5', color: '#4A148C' }}
                          >
                            {p}
                          </span>
                        ))}
                        {inv.procedures.length > 2 && (
                          <span className="text-xs" style={{ color: '#64748B' }}>+{inv.procedures.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#1E293B' }}>${inv.total.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#00C853' }}>${inv.paid.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: saldo > 0 ? '#D32F2F' : '#64748B' }}>
                        ${saldo.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        <Icon size={11} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#4A148C' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#F3E5F5')}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => toast.info(`Imprimiendo ${inv.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#00ACC1' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#E0F7FA')}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                        >
                          <Printer size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice detail modal */}
      {invoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            {/* Invoice header */}
            <div
              className="p-6 relative"
              style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)' }}
            >
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-white/60 mb-1">FACTURA ODONTOLÓGICA</div>
                  <div className="text-white text-lg">{invoice.id}</div>
                  <div className="text-xs text-white/70 mt-0.5">
                    {new Date(invoice.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: statusConfig[invoice.status].bg, color: statusConfig[invoice.status].color }}
                >
                  {statusConfig[invoice.status].label}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Patient */}
              <div>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>Paciente</div>
                <div className="text-sm" style={{ color: '#1E293B' }}>{invoice.patient}</div>
              </div>

              {/* Procedures */}
              <div>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>Procedimientos</div>
                <div className="space-y-2">
                  {invoice.procedures.map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-2 text-sm" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ color: '#1E293B' }}>{p}</span>
                      <span style={{ color: '#64748B' }}>—</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="rounded-xl p-4 space-y-2" style={{ background: '#F8F7FF' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Subtotal</span>
                  <span style={{ color: '#1E293B' }}>${invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>Descuento</span>
                    <span style={{ color: '#00C853' }}>-${invoice.discount.toFixed(2)}</span>
                  </div>
                )}
                <div
                  className="flex justify-between pt-2"
                  style={{ borderTop: '1px solid #D9D9D9' }}
                >
                  <span className="text-sm" style={{ color: '#1E293B' }}>Total</span>
                  <span className="text-sm" style={{ color: '#4A148C' }}>${invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#64748B' }}>Pagado</span>
                  <span className="text-sm" style={{ color: '#00C853' }}>${invoice.paid.toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between pt-2"
                  style={{ borderTop: '2px solid #4A148C' }}
                >
                  <span style={{ color: '#1E293B' }}>Saldo pendiente</span>
                  <span
                    style={{ color: (invoice.total - invoice.paid) > 0 ? '#D32F2F' : '#00C853' }}
                  >
                    ${(invoice.total - invoice.paid).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { toast.info('Imprimiendo factura'); setSelectedInvoice(null); }}
                  className="flex-1 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
                >
                  Imprimir
                </button>
                {(invoice.total - invoice.paid) > 0 && (
                  <button
                    onClick={() => { toast.success('Pago registrado'); setSelectedInvoice(null); }}
                    className="flex-1 py-2.5 rounded-xl text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)' }}
                  >
                    Registrar pago
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New invoice modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: '#1E293B' }}>Nueva Factura</h3>
              <button onClick={() => setShowModal(false)} style={{ color: '#64748B' }}><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Paciente</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                >
                  <option>Seleccionar paciente...</option>
                  <option>María García López</option>
                  <option>Carlos Rodríguez Vega</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Procedimientos</label>
                <textarea
                  rows={3}
                  placeholder="Lista los procedimientos realizados..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Total ($)</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Método de pago</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}>
                    <option>Efectivo</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => { toast.success('Factura creada correctamente'); setShowModal(false); }}
                className="w-full py-3 rounded-xl text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)' }}
              >
                Crear factura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
