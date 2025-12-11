import React from 'react';
import { MOCK_DATA } from '../../constants';
import { CreditCard, DollarSign, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  context?: string;
}

const BillingView: React.FC<Props> = ({ context }) => {
  const totalDue = MOCK_DATA.bills.reduce((acc, bill) => bill.status === 'Unpaid' ? acc + bill.amount : acc, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-medical-600 to-medical-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
             <div>
               <p className="text-medical-100 text-sm font-medium">Total Balance Due</p>
               <h3 className="text-4xl font-bold mt-2">${totalDue.toFixed(2)}</h3>
             </div>
             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
               <DollarSign size={24} />
             </div>
          </div>
          <div className="mt-8">
            <button className="w-full bg-white text-medical-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              Pay Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
             <ShieldCheck className="text-green-600" />
             <h3 className="text-lg font-bold text-gray-800">Insurance Coverage</h3>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between py-2 border-b border-gray-50">
               <span className="text-gray-500">Provider</span>
               <span className="font-medium text-gray-800">{MOCK_DATA.patient.insuranceProvider}</span>
             </div>
             <div className="flex justify-between py-2 border-b border-gray-50">
               <span className="text-gray-500">Policy Number</span>
               <span className="font-medium text-gray-800">{MOCK_DATA.patient.policyNumber}</span>
             </div>
             <div className="flex justify-between py-2">
               <span className="text-gray-500">Status</span>
               <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                 Active
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h3 className="text-lg font-bold text-gray-800">Recent Invoices</h3>
           {context && <p className="text-sm text-gray-500 mt-1">Context: {context}</p>}
        </div>
        <div>
          {MOCK_DATA.bills.map((bill) => (
            <div key={bill.id} className="p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${bill.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {bill.status === 'Paid' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{bill.description}</h4>
                    <p className="text-sm text-gray-500">Invoice #{bill.id} • Due {bill.dueDate}</p>
                  </div>
               </div>
               <div className="text-right">
                 <div className="font-bold text-gray-900">${bill.amount.toFixed(2)}</div>
                 <div className={`text-xs font-medium mt-1 ${bill.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                   {bill.status}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingView;