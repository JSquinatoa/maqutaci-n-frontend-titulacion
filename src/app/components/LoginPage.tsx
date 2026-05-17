import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff, Stethoscope, CheckCircle, Shield, Cloud, BarChart3 } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('admin@odontoestetic.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast.success('Bienvenido, Dr. Alberto Ruiz');
    onLogin();
  };

  const features = [
    { icon: <Stethoscope size={18} />, text: 'Historia Clínica Digital completa' },
    { icon: <BarChart3 size={18} />, text: 'Gestión financiera avanzada' },
    { icon: <Cloud size={18} />, text: 'Acceso desde cualquier dispositivo' },
    { icon: <Shield size={18} />, text: 'Datos seguros y cifrados' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#F8F7FF' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #4A148C 0%, #6A1B9A 40%, #311B92 100%)' }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#00ACC1' }}
        />
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: '#7B1FA2' }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              <ToothSVG />
            </div>
            <div>
              <h1 className="text-white text-xl">Odonto Estetic</h1>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#00ACC1', color: '#fff' }}
              >
                Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-white text-4xl mb-4" style={{ lineHeight: 1.2 }}>
            Gestión odontológica<br />
            <span style={{ color: '#EDDFFC' }}>del siglo XXI</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Plataforma SaaS premium para clínicas dentales privadas.
            Eficiencia, elegancia y control total.
          </p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#00ACC1' }}
                >
                  {f.icon}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { value: '2,400+', label: 'Pacientes' },
              { value: '98%', label: 'Satisfacción' },
              { value: '24/7', label: 'Soporte' },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <div className="text-white text-xl" style={{ color: '#EDDFFC' }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Odonto Estetic Cloud. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#4A148C' }}
            >
              <ToothSVG small />
            </div>
            <span style={{ color: '#4A148C' }} className="text-lg">Odonto Estetic Cloud</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl" style={{ color: '#1E293B' }}>Iniciar sesión</h2>
            <p className="mt-1" style={{ color: '#64748B' }}>
              Accede a tu panel de gestión odontológica
            </p>
          </div>

          {/* Role selector */}
          <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: '#F1F5F9' }}>
            {['Odontólogo Admin', 'Recepcionista'].map((role, i) => (
              <button
                key={i}
                className="flex-1 py-2 px-3 rounded-lg text-sm transition-all"
                style={
                  i === 0
                    ? { background: '#fff', color: '#4A148C', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }
                    : { color: '#64748B', background: 'transparent' }
                }
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: '#1E293B' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
                placeholder="doctor@clinica.com"
                style={{
                  border: '1.5px solid #D9D9D9',
                  background: '#fff',
                  color: '#1E293B',
                }}
                onFocus={e => (e.target.style.borderColor = '#4A148C')}
                onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm" style={{ color: '#1E293B' }}>Contraseña</label>
                <button
                  type="button"
                  className="text-xs hover:underline"
                  style={{ color: '#00ACC1' }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm pr-12"
                  placeholder="••••••••"
                  style={{
                    border: '1.5px solid #D9D9D9',
                    background: '#fff',
                    color: '#1E293B',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#4A148C')}
                  onBlur={e => (e.target.style.borderColor = '#D9D9D9')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#64748B' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  border: remember ? 'none' : '1.5px solid #D9D9D9',
                  background: remember ? '#4A148C' : 'transparent',
                }}
              >
                {remember && <CheckCircle size={14} color="#fff" />}
              </button>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Mantener sesión iniciada
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white transition-all mt-2"
              style={{
                background: loading ? '#7B1FA2' : 'linear-gradient(135deg, #4A148C, #6A1B9A)',
                boxShadow: '0 4px 15px rgba(74, 20, 140, 0.35)',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                'Ingresar al sistema'
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-6 p-4 rounded-xl flex items-start gap-3"
            style={{ background: '#EDDFFC', border: '1px solid #D8B4FE' }}
          >
            <span className="text-lg">💡</span>
            <div>
              <p className="text-xs" style={{ color: '#4A148C' }}>
                <strong>Acceso demo:</strong> Usa cualquier contraseña para ingresar al sistema de demostración.
              </p>
            </div>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: '#64748B' }}>
            ¿Problemas para acceder?{' '}
            <button className="hover:underline" style={{ color: '#00ACC1' }}>
              Contáctanos
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function ToothSVG({ small = false }: { small?: boolean }) {
  const size = small ? 20 : 28;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M8 4C6 4 4 6 4 9C4 11 5 13 6 15L7 24C7 26 8 27 10 27C12 27 13 25 13 23L13 21C13 19 14 18 16 18C18 18 19 19 19 21L19 23C19 25 20 27 22 27C24 27 25 26 25 24L26 15C27 13 28 11 28 9C28 6 26 4 24 4C22 4 21 5 19 6C18 7 17 7 16 7C15 7 14 7 13 6C11 5 10 4 8 4Z"
        fill={small ? 'white' : 'rgba(255,255,255,0.9)'}
      />
    </svg>
  );
}
