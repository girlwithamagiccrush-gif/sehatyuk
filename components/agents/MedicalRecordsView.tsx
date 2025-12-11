import React from 'react';
import { MOCK_DATA } from '../../constants';
import { FileText, Download, Eye, Activity, Calendar } from 'lucide-react';

interface Props {
  context?: string;
}

const MedicalRecordsView: React.FC<Props> = ({ context }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h2 className="text-xl font-bold text-gray-800">Patient Medical Records</h2>
              <p className="text-sm text-gray-500 mt-1">
                {context ? `Showing results relevant to: "${context}"` : "All records for Sarah Jenkins"}
              </p>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-medical-50 text-medical-700 rounded-lg hover:bg-medical-100 transition-colors text-sm font-medium">
             <Download size={16} />
             Export All (PDF)
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="py-4 font-medium">Date</th>
                <th className="py-4 font-medium">Type</th>
                <th className="py-4 font-medium">Record Title</th>
                <th className="py-4 font-medium">Physician</th>
                <th className="py-4 font-medium">Status</th>
                <th className="py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {MOCK_DATA.records.map((record) => (
                <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {record.date}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.type === 'Lab Result' ? 'bg-purple-100 text-purple-700' :
                      record.type === 'Diagnosis' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="py-4 font-medium text-gray-900">{record.title}</td>
                  <td className="py-4 text-gray-500">{record.doctor}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {record.status}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-medical-600 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
             <Activity size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-gray-800">3</div>
             <div className="text-xs text-gray-500 uppercase font-medium">Recent Reports</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsView;