import React, { useState } from 'react';
import { MOCK_DATA } from '../../constants';
import { User, Mail, Phone, MapPin, Save, Edit2 } from 'lucide-react';

interface Props {
  context?: string;
}

const PatientInfoView: React.FC<Props> = ({ context }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(MOCK_DATA.patient);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
         {/* Banner */}
         <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <div className="absolute -bottom-10 left-8">
               <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                 <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                   SJ
                 </div>
               </div>
            </div>
            <div className="absolute top-4 right-4">
               <button 
                 onClick={() => setIsEditing(!isEditing)}
                 className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
               >
                 {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                 {isEditing ? 'Save Changes' : 'Edit Profile'}
               </button>
            </div>
         </div>

         <div className="pt-14 pb-8 px-8">
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-500 text-sm">Patient ID: {patient.id}</p>
            
            {context && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-100">
                <strong>Attention:</strong> You are currently in the Patient Information Agent based on your request: "{context}"
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                   <Mail size={12} /> Email Address
                 </label>
                 {isEditing ? (
                   <input 
                     type="email" 
                     value={patient.email} 
                     onChange={(e) => setPatient({...patient, email: e.target.value})}
                     className="w-full border-b border-gray-300 py-1 focus:border-medical-500 focus:outline-none bg-transparent"
                   />
                 ) : (
                   <p className="text-gray-800 font-medium">{patient.email}</p>
                 )}
               </div>

               <div className="space-y-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                   <Phone size={12} /> Phone Number
                 </label>
                 {isEditing ? (
                   <input 
                     type="tel" 
                     value={patient.phone} 
                     onChange={(e) => setPatient({...patient, phone: e.target.value})}
                     className="w-full border-b border-gray-300 py-1 focus:border-medical-500 focus:outline-none bg-transparent"
                   />
                 ) : (
                   <p className="text-gray-800 font-medium">{patient.phone}</p>
                 )}
               </div>

               <div className="space-y-1 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                   <MapPin size={12} /> Home Address
                 </label>
                 {isEditing ? (
                   <input 
                     type="text" 
                     value={patient.address} 
                     onChange={(e) => setPatient({...patient, address: e.target.value})}
                     className="w-full border-b border-gray-300 py-1 focus:border-medical-500 focus:outline-none bg-transparent"
                   />
                 ) : (
                   <p className="text-gray-800 font-medium">{patient.address}</p>
                 )}
               </div>
               
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Date of Birth</label>
                 <p className="text-gray-800 font-medium">{patient.dob}</p>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default PatientInfoView;