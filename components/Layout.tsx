import React from 'react';
import { AgentType } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  User, 
  Calendar, 
  Activity 
} from 'lucide-react';

interface LayoutProps {
  currentAgent: AgentType;
  setAgent: (agent: AgentType) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentAgent, setAgent, children }) => {
  const navItems = [
    { type: AgentType.NAVIGATOR, icon: LayoutDashboard, label: 'Navigator' },
    { type: AgentType.MEDICAL_RECORDS, icon: FileText, label: 'Records' },
    { type: AgentType.BILLING, icon: CreditCard, label: 'Billing' },
    { type: AgentType.PATIENT_INFO, icon: User, label: 'Patient Info' },
    { type: AgentType.APPOINTMENTS, icon: Calendar, label: 'Appointments' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <div className="bg-medical-500 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">MedNav AI</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => setAgent(item.type)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentAgent === item.type
                  ? 'bg-medical-600 text-white shadow-md transform translate-x-1'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">Sarah Jenkins</span>
              <span className="text-[10px] text-slate-400">Patient ID: P-10293</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {currentAgent === AgentType.NAVIGATOR ? 'System Navigator' : 
             currentAgent === AgentType.MEDICAL_RECORDS ? 'Medical Records Agent' :
             currentAgent === AgentType.BILLING ? 'Billing & Insurance Agent' :
             currentAgent === AgentType.PATIENT_INFO ? 'Patient Information Agent' :
             'Appointment Scheduler'}
          </h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             System Online
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;