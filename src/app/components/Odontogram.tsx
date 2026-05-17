import { useState } from 'react';
import { toast } from 'sonner';
import { Info, RotateCcw } from 'lucide-react';

type ToothState = 'sano' | 'caries' | 'obturado' | 'corona' | 'endodoncia' | 'extraccion' | 'implante' | 'ausente' | 'fractura';

interface ToothData {
  number: number;
  state: ToothState;
  notes: string;
}

const stateConfig: Record<ToothState, { label: string; color: string; border: string; textColor: string }> = {
  sano: { label: 'Sano', color: '#F8F7FF', border: '#D9D9D9', textColor: '#64748B' },
  caries: { label: 'Caries', color: '#FCA5A5', border: '#EF4444', textColor: '#991B1B' },
  obturado: { label: 'Obturado', color: '#93C5FD', border: '#3B82F6', textColor: '#1D4ED8' },
  corona: { label: 'Corona', color: '#FCD34D', border: '#F59E0B', textColor: '#92400E' },
  endodoncia: { label: 'Endodoncia', color: '#C4B5FD', border: '#8B5CF6', textColor: '#5B21B6' },
  extraccion: { label: 'Extracción', color: '#D1FAE5', border: '#10B981', textColor: '#065F46' },
  implante: { label: 'Implante', color: '#BAE6FD', border: '#0EA5E9', textColor: '#0C4A6E' },
  ausente: { label: 'Ausente', color: '#F3F4F6', border: '#9CA3AF', textColor: '#6B7280' },
  fractura: { label: 'Fractura', color: '#FED7AA', border: '#F97316', textColor: '#7C2D12' },
};

const initialTeeth: ToothData[] = [
  { number: 18, state: 'ausente', notes: '' }, { number: 17, state: 'sano', notes: '' },
  { number: 16, state: 'obturado', notes: 'Obturación compuesta clase II' }, { number: 15, state: 'sano', notes: '' },
  { number: 14, state: 'sano', notes: '' }, { number: 13, state: 'sano', notes: '' },
  { number: 12, state: 'sano', notes: '' }, { number: 11, state: 'obturado', notes: '' },
  { number: 21, state: 'obturado', notes: '' }, { number: 22, state: 'sano', notes: '' },
  { number: 23, state: 'sano', notes: '' }, { number: 24, state: 'sano', notes: '' },
  { number: 25, state: 'caries', notes: 'Caries clase I incipiente' }, { number: 26, state: 'corona', notes: 'Corona metal-porcelana' },
  { number: 27, state: 'sano', notes: '' }, { number: 28, state: 'ausente', notes: '' },
  { number: 38, state: 'ausente', notes: '' }, { number: 37, state: 'sano', notes: '' },
  { number: 36, state: 'endodoncia', notes: 'Endodoncia realizada 2024' }, { number: 35, state: 'sano', notes: '' },
  { number: 34, state: 'sano', notes: '' }, { number: 33, state: 'sano', notes: '' },
  { number: 32, state: 'sano', notes: '' }, { number: 31, state: 'sano', notes: '' },
  { number: 41, state: 'sano', notes: '' }, { number: 42, state: 'sano', notes: '' },
  { number: 43, state: 'sano', notes: '' }, { number: 44, state: 'sano', notes: '' },
  { number: 45, state: 'obturado', notes: '' }, { number: 46, state: 'implante', notes: 'Implante Nobel Biocare' },
  { number: 47, state: 'sano', notes: '' }, { number: 48, state: 'fractura', notes: 'Fractura coronaria' },
];

export function OdontogramView() {
  const [teeth, setTeeth] = useState<ToothData[]>(initialTeeth);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<ToothState>('caries');

  const upperTeethNums = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeethNums = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const getTooth = (num: number) => teeth.find(t => t.number === num)!;

  const applyState = (num: number) => {
    setTeeth(prev => prev.map(t => t.number === num ? { ...t, state: selectedState } : t));
    toast.success(`Pieza #${num}: ${stateConfig[selectedState].label}`);
    setSelectedTooth(num);
  };

  const resetAll = () => {
    setTeeth(initialTeeth);
    toast.info('Odontograma reiniciado');
  };

  const selected = selectedTooth ? getTooth(selectedTooth) : null;

  const ToothBox = ({ num }: { num: number }) => {
    const tooth = getTooth(num);
    const cfg = stateConfig[tooth.state];
    const isSelected = selectedTooth === num;
    const isMolar = [18, 17, 16, 26, 27, 28, 38, 37, 36, 46, 47, 48].includes(num);

    return (
      <div
        className="flex flex-col items-center gap-0.5 cursor-pointer"
        onClick={() => applyState(num)}
        title={`Pieza #${num}: ${cfg.label}${tooth.notes ? ' - ' + tooth.notes : ''}`}
      >
        <span className="text-center" style={{ fontSize: 9, color: '#64748B', minWidth: 20 }}>{num}</span>
        <div
          className="flex items-center justify-center transition-all hover:scale-110"
          style={{
            width: isMolar ? 28 : 24,
            height: isMolar ? 26 : 30,
            borderRadius: 4,
            background: cfg.color,
            border: isSelected ? `2.5px solid #4A148C` : `1.5px solid ${cfg.border}`,
            boxShadow: isSelected ? '0 0 0 2px rgba(74,20,140,0.2)' : 'none',
            position: 'relative',
          }}
        >
          {tooth.state === 'extraccion' && (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <line x1="2" y1="2" x2="10" y2="10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="2" x2="2" y2="10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {tooth.state === 'fractura' && (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <polyline points="2,2 5,6 3,6 8,10" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Odontograma Interactivo</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Notación FDI / ISO 3950</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
          >
            <RotateCcw size={14} />
            Reiniciar
          </button>
          <button
            onClick={() => toast.success('Odontograma guardado')}
            className="px-4 py-2 rounded-xl text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)', boxShadow: '0 4px 12px rgba(74,20,140,0.25)' }}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Tool palette + chart */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* State selector */}
        <div
          className="rounded-2xl p-4"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>Estado dental</h3>
          <div className="space-y-1.5">
            {(Object.entries(stateConfig) as [ToothState, any][]).map(([state, cfg]) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all text-left"
                style={
                  selectedState === state
                    ? { background: '#F3E5F5', border: '1.5px solid #EDDFFC', color: '#4A148C' }
                    : { background: 'transparent', border: '1.5px solid transparent', color: '#64748B' }
                }
              >
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ background: cfg.color, border: `1.5px solid ${cfg.border}` }}
                />
                <span>{cfg.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Odontogram */}
        <div
          className="xl:col-span-3 rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {/* Patient info */}
          <div className="flex items-center gap-3 mb-5 p-3 rounded-xl" style={{ background: '#F8F7FF' }}>
            <div
              className="w-8 h-8 rounded-xl text-xs text-white flex items-center justify-center"
              style={{ background: '#4A148C' }}
            >
              MG
            </div>
            <div>
              <div className="text-sm" style={{ color: '#1E293B' }}>María García López</div>
              <div className="text-xs" style={{ color: '#64748B' }}>Cédula: 1723456789 · 41 años</div>
            </div>
            <div className="ml-auto text-xs px-2 py-1 rounded-full" style={{ background: '#E8F5E9', color: '#00C853' }}>
              Historia vigente
            </div>
          </div>

          {/* Dental chart */}
          <div className="flex flex-col items-center gap-2 overflow-x-auto">
            {/* Upper jaw label */}
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#64748B' }}>
              ← Maxilar Superior →
            </div>

            {/* Upper teeth row */}
            <div className="flex gap-0.5">
              {/* Upper right (18-11) */}
              <div className="flex gap-0.5 pr-3" style={{ borderRight: '2px dashed #D9D9D9' }}>
                {[18, 17, 16, 15, 14, 13, 12, 11].map(n => <ToothBox key={n} num={n} />)}
              </div>
              {/* Upper left (21-28) */}
              <div className="flex gap-0.5 pl-3">
                {[21, 22, 23, 24, 25, 26, 27, 28].map(n => <ToothBox key={n} num={n} />)}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
              <span className="text-xs px-2" style={{ color: '#D9D9D9' }}>——</span>
              <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
            </div>

            {/* Lower teeth row */}
            <div className="flex gap-0.5">
              {/* Lower right (48-41) */}
              <div className="flex gap-0.5 pr-3" style={{ borderRight: '2px dashed #D9D9D9' }}>
                {[48, 47, 46, 45, 44, 43, 42, 41].map(n => <ToothBox key={n} num={n} />)}
              </div>
              {/* Lower left (31-38) */}
              <div className="flex gap-0.5 pl-3">
                {[31, 32, 33, 34, 35, 36, 37, 38].map(n => <ToothBox key={n} num={n} />)}
              </div>
            </div>

            <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#64748B' }}>
              ← Mandíbula Inferior →
            </div>
          </div>

          {/* Selected tooth info */}
          {selected && (
            <div
              className="mt-5 p-4 rounded-xl flex items-start gap-3"
              style={{ background: '#F3E5F5', border: '1px solid #EDDFFC' }}
            >
              <Info size={16} style={{ color: '#4A148C', flexShrink: 0, marginTop: 1 }} />
              <div className="flex-1">
                <div className="text-sm" style={{ color: '#4A148C' }}>
                  <strong>Pieza #{selected.number}</strong> — {stateConfig[selected.state].label}
                </div>
                {selected.notes && (
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>{selected.notes}</p>
                )}
                <div className="mt-2">
                  <textarea
                    placeholder="Agregar notas para esta pieza..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                    style={{ border: '1px solid #EDDFFC', background: '#fff', color: '#1E293B' }}
                    defaultValue={selected.notes}
                    onChange={e => {
                      setTeeth(prev => prev.map(t => t.number === selected.number ? { ...t, notes: e.target.value } : t));
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <h3 className="text-sm mb-4" style={{ color: '#1E293B' }}>Resumen del odontograma</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-3">
          {(Object.entries(stateConfig) as [ToothState, any][]).map(([state, cfg]) => {
            const count = teeth.filter(t => t.state === state).length;
            if (count === 0) return null;
            return (
              <div
                key={state}
                className="flex flex-col items-center gap-1 p-3 rounded-xl text-center"
                style={{ background: cfg.color, border: `1px solid ${cfg.border}` }}
              >
                <span className="text-xl" style={{ color: cfg.textColor }}>{count}</span>
                <span className="text-xs" style={{ color: cfg.textColor }}>{cfg.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
