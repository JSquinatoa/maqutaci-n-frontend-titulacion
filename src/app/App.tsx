import { useState } from 'react';
import { Toaster } from 'sonner';
import { LoginPage } from './components/LoginPage';
import { Layout, type View } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PatientsTable } from './components/PatientsTable';
import { PatientProfile } from './components/PatientProfile';
import { ClinicalHistory } from './components/ClinicalHistory';
import { Billing } from './components/Billing';
import { Finance } from './components/Finance';
import { Budgets } from './components/Budgets';
import { Construction } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'pacientes':
        return (
          <PatientsTable
            onViewPatient={id => {
              setSelectedPatientId(id);
              setCurrentView('paciente-perfil');
            }}
          />
        );
      case 'paciente-perfil':
        return (
          <PatientProfile
            patientId={selectedPatientId}
            onBack={() => setCurrentView('pacientes')}
          />
        );
      case 'historia-clinica':
        return <ClinicalHistory />;
      case 'facturacion':
        return <Billing />;
      case 'finanzas':
        return <Finance />;
      case 'presupuestos':
        return <Budgets />;
      default:
        return <ComingSoon view={currentView} />;
    }
  };

  return (
    <>
      <Layout
        currentView={currentView}
        onNavigate={setCurrentView}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
      >
        {renderView()}
      </Layout>
      <Toaster position="top-right" richColors />
    </>
  );
}

function ComingSoon({ view }: { view: string }) {
  const labels: Record<string, string> = {
    sesiones: 'Sesiones Clínicas',
    cobros: 'Cobros y Abonos',
    certificados: 'Certificados',
    administracion: 'Administración',
    configuracion: 'Configuración',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#F3E5F5' }}
      >
        <Construction size={28} style={{ color: '#4A148C' }} />
      </div>
      <h2 style={{ color: '#1E293B' }}>{labels[view] || view}</h2>
      <p className="text-sm mt-2 text-center max-w-xs" style={{ color: '#64748B' }}>
        Este módulo estará disponible en la próxima versión de Odonto Estetic Cloud.
      </p>
      <div
        className="mt-4 px-4 py-2 rounded-xl text-sm"
        style={{ background: '#EDDFFC', color: '#4A148C' }}
      >
        Próximamente
      </div>
    </div>
  );
}
