import React from 'react';
import { MOCK_DATA } from '../../constants';
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle, Plus } from 'lucide-react';

interface Props {
  context?: string;
}

const AppointmentView: React.FC<Props> = ({ context }) => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
         <div>
           <h2 className="text-xl font-bold text-gray-800">Your Appointments</h2>
           <p className="text-sm text-gray-500 mt-1">Manage upcoming visits and schedule new ones.</p>
         </div>
         <button className="bg-medical-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-medical-700 transition-colors flex items-center gap-2">
            <Plus size={18} />
            New Appointment
         </button>
       </div>

       {context && (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-800 text-sm">
             <span className="font-semibold">Processing Request:</span> "{context}"
          </div>
       )}

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_DATA.appointments.map((apt) => (
             <div key={apt.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${apt.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                     }`}>
                        {apt.status === 'Confirmed' && <CheckCircle size={12} />}
                        {apt.status.toUpperCase()}
                     </span>
                     <h3 className="text-lg font-bold text-gray-900 mt-2">{apt.specialty}</h3>
                   </div>
                   <div className="bg-gray-50 p-3 rounded-xl text-center min-w-[70px]">
                      <div className="text-xs text-gray-500 uppercase font-bold">DEC</div>
                      <div className="text-xl font-bold text-gray-800">{apt.date.split('-')[2]}</div>
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <User size={16} className="text-gray-400" />
                      {apt.doctor}
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      {apt.time}
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" />
                      {apt.location}
                   </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                   <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      Reschedule
                   </button>
                   <button className="flex-1 px-4 py-2 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                      Cancel
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default AppointmentView;