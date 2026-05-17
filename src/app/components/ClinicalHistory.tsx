import { useState } from 'react';
import { Save, AlertTriangle, CheckCircle2, User, Heart, Pill, Activity, FileText, PenLine } from 'lucide-react';
import { toast } from 'sonner';

export function ClinicalHistory() {
  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState({
    motivo: '',
    evolucion: '',
    hipertension: false,
    diabetes: false,
    cardiopatia: false,
    epilepsia: false,
    cancer: false,
    hepatitis: false,
    otrasEnfermedades: '',
    alergiaAnestesia: false,
    alergiaAntibiotic: false,
    alergiaAspirin: false,
    alergiaIbu: false,
    alergiaLatex: false,
    otraAlergia: '',
    fumador: false,
    alcohol: false,
    embarazo: false,
    medicamentos: '',
    examenExtraoral: '',
    examenIntraoral: '',
    tejidos: '',
    diagnostico: '',
    planTratamiento: '',
    pronostico: 'bueno' as 'bueno' | 'regular' | 'malo',
    firmada: false,
  });

  const sections = [
    { title: 'Datos Personales', icon: User, color: '#4A148C' },
    { title: 'Antecedentes Médicos', icon: Heart, color: '#D32F2F' },
    { title: 'Alergias', icon: AlertTriangle, color: '#F59E0B' },
    { title: 'Examen Clínico', icon: Activity, color: '#00ACC1' },
    { title: 'Diagnóstico y Plan', icon: FileText, color: '#00C853' },
    { title: 'Firma Digital', icon: PenLine, color: '#64748B' },
  ];

  const set = (key: keyof typeof form, value: any) => setForm(f => ({ ...f, [key]: value }));

  const handleSave = () => {
    toast.success('Historia clínica guardada correctamente');
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg" style={{ color: '#1E293B' }}>Historia Clínica</h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Formulario de historia clínica odontológica</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.info('Vista previa generada')}
            className="px-4 py-2 rounded-xl text-sm transition-colors"
            style={{ background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }}
          >
            Vista previa
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #4A148C, #6A1B9A)', boxShadow: '0 4px 12px rgba(74,20,140,0.25)' }}
          >
            <Save size={14} />
            Guardar historia
          </button>
        </div>
      </div>

      {/* Alert - medical alert */}
      <div
        className="flex items-start gap-3 p-4 rounded-2xl mb-5"
        style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A' }}
      >
        <AlertTriangle size={18} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-sm" style={{ color: '#92400E' }}>
            <strong>Alerta médica:</strong> Paciente con alergia a Penicilina. Verificar antes de prescribir antibióticos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Section nav */}
        <div
          className="rounded-2xl p-3 space-y-1"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', height: 'fit-content' }}
        >
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left"
                style={
                  activeSection === i
                    ? { background: '#F3E5F5', color: '#4A148C' }
                    : { color: '#64748B', background: 'transparent' }
                }
              >
                <Icon size={15} style={{ color: activeSection === i ? s.color : '#D9D9D9' }} />
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Section content */}
        <div
          className="md:col-span-3 rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {/* Section 0: Personal data */}
          {activeSection === 0 && (
            <div className="space-y-4">
              <SectionHeader title="Datos del Paciente" subtitle="Información general y motivo de consulta" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Nombre completo" value="María García López" disabled />
                <InputField label="Cédula" value="1723456789" disabled />
                <InputField label="Fecha de nacimiento" value="1985-03-15" type="date" disabled />
                <InputField label="Grupo sanguíneo" value="O+" disabled />
                <InputField label="Teléfono" value="0991-234-567" disabled />
                <InputField label="Ocupación" value="Docente" disabled />
              </div>
              <Divider />
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Motivo de consulta</label>
                <textarea
                  value={form.motivo}
                  onChange={e => set('motivo', e.target.value)}
                  rows={3}
                  placeholder="Describe el motivo principal de la consulta del paciente..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Evolución de la enfermedad</label>
                <textarea
                  value={form.evolucion}
                  onChange={e => set('evolucion', e.target.value)}
                  rows={3}
                  placeholder="Describe la evolución del problema dental..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
            </div>
          )}

          {/* Section 1: Medical antecedents */}
          {activeSection === 1 && (
            <div className="space-y-4">
              <SectionHeader title="Antecedentes Médicos" subtitle="Enfermedades sistémicas y condiciones médicas relevantes" />
              <div
                className="p-4 rounded-xl"
                style={{ background: '#F8F7FF', border: '1px solid #F1F5F9' }}
              >
                <p className="text-xs mb-3 uppercase tracking-wider" style={{ color: '#64748B' }}>
                  Enfermedades sistémicas
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hipertension', label: 'Hipertensión arterial' },
                    { key: 'diabetes', label: 'Diabetes mellitus' },
                    { key: 'cardiopatia', label: 'Cardiopatía' },
                    { key: 'epilepsia', label: 'Epilepsia' },
                    { key: 'cancer', label: 'Cáncer / tumor' },
                    { key: 'hepatitis', label: 'Hepatitis' },
                  ].map(item => (
                    <CheckboxItem
                      key={item.key}
                      label={item.label}
                      checked={(form as any)[item.key]}
                      onChange={v => set(item.key as any, v)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Otras enfermedades</label>
                <textarea
                  value={form.otrasEnfermedades}
                  onChange={e => set('otrasEnfermedades', e.target.value)}
                  rows={2}
                  placeholder="Especifique otras enfermedades o condiciones..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs mb-3 uppercase tracking-wider" style={{ color: '#64748B' }}>Hábitos</p>
                  <div className="space-y-2">
                    <CheckboxItem label="Fumador/a" checked={form.fumador} onChange={v => set('fumador', v)} />
                    <CheckboxItem label="Consumo de alcohol" checked={form.alcohol} onChange={v => set('alcohol', v)} />
                    <CheckboxItem label="Embarazo" checked={form.embarazo} onChange={v => set('embarazo', v)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Medicamentos actuales</label>
                  <textarea
                    value={form.medicamentos}
                    onChange={e => set('medicamentos', e.target.value)}
                    rows={4}
                    placeholder="Lista los medicamentos que toma actualmente..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                    onFocus={e => (e.target.style.borderColor = '#4A148C')}
                    onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Allergies */}
          {activeSection === 2 && (
            <div className="space-y-4">
              <SectionHeader title="Alergias Conocidas" subtitle="Reacciones adversas a medicamentos y materiales" />
              <div
                className="p-4 rounded-xl"
                style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
              >
                <p className="text-xs mb-3 uppercase tracking-wider" style={{ color: '#92400E' }}>
                  Alergias medicamentosas
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'alergiaAnestesia', label: 'Anestésicos locales' },
                    { key: 'alergiaAntibiotic', label: 'Antibióticos (Penicilina)', defaultChecked: true },
                    { key: 'alergiaAspirin', label: 'Aspirina / AINEs' },
                    { key: 'alergiaIbu', label: 'Ibuprofeno' },
                    { key: 'alergiaLatex', label: 'Látex / Hule' },
                  ].map(item => (
                    <CheckboxItem
                      key={item.key}
                      label={item.label}
                      checked={(form as any)[item.key] || item.defaultChecked}
                      onChange={v => set(item.key as any, v)}
                      alertColor
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Otras alergias</label>
                <textarea
                  value={form.otraAlergia}
                  onChange={e => set('otraAlergia', e.target.value)}
                  rows={2}
                  placeholder="Especifique otras alergias o reacciones adversas..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
            </div>
          )}

          {/* Section 3: Clinical exam */}
          {activeSection === 3 && (
            <div className="space-y-4">
              <SectionHeader title="Examen Clínico" subtitle="Hallazgos extraorales e intraorales" />
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Examen extraoral</label>
                <textarea
                  value={form.examenExtraoral}
                  onChange={e => set('examenExtraoral', e.target.value)}
                  rows={3}
                  placeholder="Describe los hallazgos del examen extraoral (cara, ganglios, ATM, etc.)..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Examen intraoral</label>
                <textarea
                  value={form.examenIntraoral}
                  onChange={e => set('examenIntraoral', e.target.value)}
                  rows={3}
                  placeholder="Describe los hallazgos del examen intraoral (mucosas, encías, lengua, etc.)..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Estado de tejidos periodontales</label>
                <textarea
                  value={form.tejidos}
                  onChange={e => set('tejidos', e.target.value)}
                  rows={3}
                  placeholder="Estado de encías, sondaje, movilidad dental..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
            </div>
          )}

          {/* Section 4: Diagnosis */}
          {activeSection === 4 && (
            <div className="space-y-4">
              <SectionHeader title="Diagnóstico y Plan de Tratamiento" subtitle="Conclusiones clínicas y plan terapéutico" />
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Diagnóstico</label>
                <textarea
                  value={form.diagnostico}
                  onChange={e => set('diagnostico', e.target.value)}
                  rows={3}
                  placeholder="Diagnóstico odontológico del paciente..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>Plan de tratamiento</label>
                <textarea
                  value={form.planTratamiento}
                  onChange={e => set('planTratamiento', e.target.value)}
                  rows={4}
                  placeholder="Describe el plan de tratamiento propuesto..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #D9D9D9', background: '#F8F7FF', color: '#1E293B' }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: '#1E293B' }}>Pronóstico</label>
                <div className="flex gap-3">
                  {(['bueno', 'regular', 'malo'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => set('pronostico', p)}
                      className="flex-1 py-2.5 rounded-xl text-sm capitalize transition-all"
                      style={
                        form.pronostico === p
                          ? { background: p === 'bueno' ? '#00C853' : p === 'regular' ? '#F59E0B' : '#D32F2F', color: '#fff' }
                          : { background: '#F8F7FF', color: '#64748B', border: '1px solid #F1F5F9' }
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Signature */}
          {activeSection === 5 && (
            <div className="space-y-4">
              <SectionHeader title="Firma Digital" subtitle="Consentimiento del paciente y firma del profesional" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignatureBox title="Firma del Paciente" subtitle="María García López" />
                <SignatureBox title="Firma del Odontólogo" subtitle="Dr. Alberto Ruiz — Reg. 1234-CZ" />
              </div>
              <div
                className="p-4 rounded-xl"
                style={{ background: '#E8F5E9', border: '1px solid #A7F3D0' }}
              >
                <div className="flex items-start gap-2">
                  <CheckboxItem
                    label="El paciente acepta el tratamiento propuesto y ha sido informado de los riesgos y alternativas terapéuticas."
                    checked={form.firmada}
                    onChange={v => set('firmada', v)}
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={!form.firmada}
                className="w-full py-3 rounded-xl text-sm text-white transition-all"
                style={{
                  background: form.firmada ? 'linear-gradient(135deg, #4A148C, #6A1B9A)' : '#D9D9D9',
                  cursor: form.firmada ? 'pointer' : 'not-allowed',
                }}
              >
                Finalizar y guardar historia clínica
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6 pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
            <button
              onClick={() => setActiveSection(s => Math.max(0, s - 1))}
              disabled={activeSection === 0}
              className="px-4 py-2 rounded-xl text-sm transition-colors"
              style={{
                background: '#F8F7FF', color: activeSection === 0 ? '#D9D9D9' : '#64748B',
                border: '1px solid #F1F5F9',
              }}
            >
              ← Anterior
            </button>
            <span className="text-xs self-center" style={{ color: '#64748B' }}>
              {activeSection + 1} / {sections.length}
            </span>
            <button
              onClick={() => setActiveSection(s => Math.min(sections.length - 1, s + 1))}
              disabled={activeSection === sections.length - 1}
              className="px-4 py-2 rounded-xl text-sm transition-colors"
              style={{
                background: activeSection < sections.length - 1 ? '#4A148C' : '#F8F7FF',
                color: activeSection < sections.length - 1 ? '#fff' : '#D9D9D9',
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <h3 className="text-sm" style={{ color: '#1E293B' }}>{title}</h3>
      <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{subtitle}</p>
    </div>
  );
}

function InputField({ label, value, type = 'text', disabled = false }: { label: string; value: string; type?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          border: '1.5px solid #D9D9D9',
          background: disabled ? '#F8F7FF' : '#fff',
          color: disabled ? '#64748B' : '#1E293B',
        }}
      />
    </div>
  );
}

function CheckboxItem({ label, checked, onChange, alertColor = false }: { label: string; checked: boolean; onChange: (v: boolean) => void; alertColor?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-2 text-left w-full"
    >
      <div
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
        style={{
          border: checked ? 'none' : `1.5px solid ${alertColor ? '#F59E0B' : '#D9D9D9'}`,
          background: checked ? (alertColor ? '#F59E0B' : '#4A148C') : 'transparent',
        }}
      >
        {checked && <CheckCircle2 size={12} color="#fff" />}
      </div>
      <span className="text-sm" style={{ color: '#1E293B' }}>{label}</span>
    </button>
  );
}

function Divider() {
  return <div className="my-2" style={{ borderTop: '1px solid #F1F5F9' }} />;
}

function SignatureBox({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px dashed #D9D9D9' }}>
      <div
        className="h-28 flex items-center justify-center cursor-pointer transition-colors"
        style={{ background: '#F8F7FF' }}
      >
        <div className="text-center">
          <PenLine size={24} className="mx-auto mb-2" style={{ color: '#D9D9D9' }} />
          <p className="text-xs" style={{ color: '#64748B' }}>Haz clic para firmar</p>
        </div>
      </div>
      <div className="px-3 py-2" style={{ borderTop: '1px solid #F1F5F9' }}>
        <div className="text-sm" style={{ color: '#1E293B' }}>{title}</div>
        <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{subtitle}</div>
      </div>
    </div>
  );
}
