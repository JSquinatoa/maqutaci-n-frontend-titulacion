import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Phone, Mail, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { mockPatients, type PatientStatus } from '../data/mockData';
import { toast } from 'sonner';

interface PatientsTableProps {
  onViewPatient: (id: number) => void;
}

const statusConfig: Record<PatientStatus, { label: string; color: string; bg: string }> = {
  activo: { label: 'Activo', color: '#00C853', bg: '#E8F5E9' },
  inactivo: { label: 'Inactivo', color: '#64748B', bg: '#F1F5F9' },
};

const ITEMS_PER_PAGE = 7;

export function PatientsTable({ onViewPatient }: PatientsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'todos'>('todos');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = mockPatients.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cedula.includes(search) ||
      p.phone.includes(search);
    const matchStatus = statusFilter === 'todos' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const calcAge = (birthDate: string) => {
    const today = new Date(2026, 4, 17);
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  return (
    <div className="max-w-7xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Pacientes</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
            {filtered.length} pacientes registrados
          </p>
        </div>
        <button
          onClick={() => toast.success('Abriendo formulario de nuevo paciente')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm transition-all"
          style={{
            background: 'linear-gradient(135deg, #4A148C, #6A1B9A)',
            boxShadow: '0 4px 12px rgba(74,20,140,0.25)',
          }}
        >
          <Plus size={16} />
          Nuevo paciente
        </button>
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Buscar por nombre, cédula o teléfono..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ background: '#F8F7FF', border: '1.5px solid #F1F5F9', color: '#1E293B' }}
              onFocus={e => (e.target.style.borderColor = '#4A148C')}
              onBlur={e => (e.target.style.borderColor = '#F1F5F9')}
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {(['todos', 'activo', 'inactivo'] as const).map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className="px-3 py-2 rounded-xl text-xs capitalize transition-all"
                style={
                  statusFilter === s
                    ? { background: '#4A148C', color: '#fff' }
                    : { background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }
                }
              >
                {s === 'todos' ? 'Todos' : statusConfig[s].label}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
          >
            <Filter size={14} />
            Filtros
          </button>
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
                {['Paciente', 'Cédula', 'Contacto', 'Estado', 'Última visita', 'Acciones'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs uppercase tracking-wider"
                    style={{ color: '#64748B' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((patient, idx) => {
                const cfg = statusConfig[patient.status];
                return (
                  <tr
                    key={patient.id}
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: idx < paginated.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = '#FAFAFA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                    onClick={() => onViewPatient(patient.id)}
                  >
                    {/* Patient */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl text-xs text-white flex items-center justify-center flex-shrink-0"
                          style={{ background: `hsl(${(patient.id * 47) % 360}, 50%, 45%)` }}
                        >
                          {patient.avatar}
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: '#1E293B' }}>{patient.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs" style={{ color: '#64748B' }}>{calcAge(patient.birthDate)} años</span>
                            {patient.allergies.length > 0 && (
                              <span className="flex items-center gap-0.5 text-xs" style={{ color: '#F59E0B' }}>
                                <AlertTriangle size={10} />
                                Alergias
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cedula */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono" style={{ color: '#64748B' }}>{patient.cedula}</span>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1">
                        <a
                          href={`tel:${patient.phone}`}
                          className="flex items-center gap-1.5 text-xs hover:underline"
                          style={{ color: '#00ACC1' }}
                        >
                          <Phone size={11} />
                          {patient.phone}
                        </a>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
                          <Mail size={11} />
                          {patient.email}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className="inline-block text-xs px-2.5 py-1 rounded-full"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                    </td>

                    {/* Last visit */}
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#64748B' }}>
                        {new Date(patient.lastVisit).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onViewPatient(patient.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#4A148C' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#F3E5F5')}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                          title="Ver perfil"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => toast.info(`Editando: ${patient.name}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#00ACC1' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#E0F7FA')}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                          title="Editar"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(patient.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#D32F2F' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#FFEBEE')}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <p style={{ color: '#1E293B' }}>No se encontraron pacientes</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>Intenta con otro término de búsqueda</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: '1px solid #F1F5F9' }}
          >
            <span className="text-xs" style={{ color: '#64748B' }}>
              Mostrando {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: page === 1 ? '#D9D9D9' : '#64748B' }}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
                  style={
                    page === p
                      ? { background: '#4A148C', color: '#fff' }
                      : { color: '#64748B', background: 'transparent' }
                  }
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: page === totalPages ? '#D9D9D9' : '#64748B' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-2xl p-6 max-w-sm w-full" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FFEBEE' }}>
              <Trash2 size={20} style={{ color: '#D32F2F' }} />
            </div>
            <h3 className="text-center" style={{ color: '#1E293B' }}>¿Eliminar paciente?</h3>
            <p className="text-sm text-center mt-2" style={{ color: '#64748B' }}>
              Esta acción no se puede deshacer. Se eliminarán todos los datos del paciente.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm transition-colors"
                style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => { toast.error('Paciente eliminado'); setDeleteId(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm text-white transition-colors"
                style={{ background: '#D32F2F' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
