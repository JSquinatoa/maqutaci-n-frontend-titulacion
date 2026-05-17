import { useState } from 'react';
import {
  LayoutDashboard, Users, FileText, Receipt,
  CreditCard, TrendingUp, FileSpreadsheet, Award,
  Settings2, Settings, ChevronLeft, ChevronRight,
  LogOut, ChevronDown, Menu, X, User
} from 'lucide-react';

export type View =
  | 'dashboard' | 'pacientes' | 'historia-clinica'
  | 'facturacion' | 'cobros' | 'finanzas'
  | 'presupuestos' | 'certificados' | 'administracion' | 'configuracion'
  | 'paciente-perfil';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  children: React.ReactNode;
}

const navGroups = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Clínico',
    items: [
      { id: 'pacientes', label: 'Pacientes', icon: Users },
      { id: 'historia-clinica', label: 'Historia Clínica', icon: FileText },
    ],
  },
  {
    label: 'Finanzas',
    items: [
      { id: 'facturacion', label: 'Facturación', icon: Receipt },
      { id: 'cobros', label: 'Cobros y Abonos', icon: CreditCard },
      { id: 'finanzas', label: 'Finanzas', icon: TrendingUp },
      { id: 'presupuestos', label: 'Presupuestos', icon: FileSpreadsheet },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { id: 'certificados', label: 'Certificados', icon: Award },
      { id: 'administracion', label: 'Administración', icon: Settings2 },
      { id: 'configuracion', label: 'Configuración', icon: Settings },
    ],
  },
];

const viewLabels: Record<View, string> = {
  dashboard: 'Dashboard',
  pacientes: 'Pacientes',
  'historia-clinica': 'Historia Clínica',
  facturacion: 'Facturación',
  cobros: 'Cobros y Abonos',
  finanzas: 'Finanzas',
  presupuestos: 'Presupuestos',
  certificados: 'Certificados',
  administracion: 'Administración',
  configuracion: 'Configuración',
  'paciente-perfil': 'Perfil del Paciente',
};

export function Layout({ currentView, onNavigate, sidebarCollapsed, onToggleSidebar, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <ToothSVG />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <div className="text-white text-sm leading-tight">Odonto Estetic</div>
            <div
              className="text-xs px-1.5 py-0.5 rounded-full inline-block mt-0.5"
              style={{ background: '#00ACC1', color: '#fff' }}
            >
              Cloud
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.label}>
            {!sidebarCollapsed && (
              <div
                className="text-xs px-2 mb-2 uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id || (currentView === 'paciente-perfil' && item.id === 'pacientes');
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id as View); setMobileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                    style={
                      isActive
                        ? { background: 'rgba(255,255,255,0.15)', color: '#fff' }
                        : { color: 'rgba(255,255,255,0.65)', background: 'transparent' }
                    }
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
                    {isActive && !sidebarCollapsed && (
                      <div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: '#00ACC1' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom user */}
      <div
        className="p-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs text-white flex-shrink-0"
            style={{ background: '#00ACC1' }}
          >
            AR
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-hidden">
              <div className="text-white text-sm leading-tight truncate">Dr. Alberto Ruiz</div>
              <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>Administrador</div>
            </div>
          )}
          {!sidebarCollapsed && (
            <button style={{ color: 'rgba(255,255,255,0.5)' }} className="hover:text-white transition-colors">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8F7FF' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out"
        style={{
          width: sidebarCollapsed ? 72 : 240,
          background: 'linear-gradient(180deg, #4A148C 0%, #38006b 100%)',
          boxShadow: '4px 0 20px rgba(74, 20, 140, 0.2)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside
            className="relative z-10 flex flex-col w-72 h-full"
            style={{ background: 'linear-gradient(180deg, #4A148C 0%, #38006b 100%)' }}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center gap-4 px-6 flex-shrink-0"
          style={{
            height: 64,
            background: '#fff',
            borderBottom: '1px solid #F1F5F9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Toggle sidebar (desktop) */}
          <button
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{ color: '#64748B' }}
            onClick={onToggleSidebar}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#F1F5F9')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ color: '#64748B' }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Page title / breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#64748B' }}>Clínica</span>
            <span style={{ color: '#D9D9D9' }}>/</span>
            <span className="text-sm" style={{ color: '#1E293B' }}>
              {viewLabels[currentView]}
            </span>
          </div>

          <div className="flex-1" />

          {/* Today's date */}
          <div className="hidden md:block text-sm" style={{ color: '#64748B' }}>
            Dom, 17 May 2026
          </div>


          {/* User menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors"
              onClick={() => setUserOpen(!userOpen)}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#F8F7FF')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
            >
              <div
                className="w-8 h-8 rounded-xl text-xs text-white flex items-center justify-center"
                style={{ background: '#4A148C' }}
              >
                AR
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm" style={{ color: '#1E293B' }}>Dr. Alberto Ruiz</div>
                <div className="text-xs" style={{ color: '#64748B' }}>Administrador</div>
              </div>
              <ChevronDown size={14} style={{ color: '#64748B' }} />
            </button>
            {userOpen && (
              <div
                className="absolute right-0 top-12 w-48 rounded-2xl shadow-xl z-50 overflow-hidden"
                style={{ background: '#fff', border: '1px solid #F1F5F9' }}
              >
                {[
                  { label: 'Mi perfil', icon: User },
                  { label: 'Configuración', icon: Settings },
                  { label: 'Cerrar sesión', icon: LogOut },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-purple-50 text-left"
                    style={{
                      color: item.label === 'Cerrar sesión' ? '#D32F2F' : '#1E293B',
                      borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <item.icon size={15} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: '#F8F7FF' }}>
          {children}
        </main>
      </div>

      {/* Click outside to close menus */}
      {userOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setUserOpen(false); }}
        />
      )}
    </div>
  );
}

function ToothSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <path
        d="M8 4C6 4 4 6 4 9C4 11 5 13 6 15L7 24C7 26 8 27 10 27C12 27 13 25 13 23L13 21C13 19 14 18 16 18C18 18 19 19 19 21L19 23C19 25 20 27 22 27C24 27 25 26 25 24L26 15C27 13 28 11 28 9C28 6 26 4 24 4C22 4 21 5 19 6C18 7 17 7 16 7C15 7 14 7 13 6C11 5 10 4 8 4Z"
        fill="rgba(255,255,255,0.9)"
      />
    </svg>
  );
}
