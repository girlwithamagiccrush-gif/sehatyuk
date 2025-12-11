export enum AgentType {
  NAVIGATOR = 'NAVIGATOR',
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  BILLING = 'BILLING',
  PATIENT_INFO = 'PATIENT_INFO',
  APPOINTMENTS = 'APPOINTMENTS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  agent?: AgentType; // The agent acting in this message
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  insuranceProvider: string;
  policyNumber: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'Lab Result' | 'Diagnosis' | 'Prescription' | 'Imaging';
  title: string;
  doctor: string;
  status: 'Final' | 'Pending';
  url: string; // Mock URL for download
}

export interface Bill {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Pending Insurance';
  dueDate: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  location: string;
}

// Mock Data Interfaces
export interface HospitalData {
  patient: Patient;
  records: MedicalRecord[];
  bills: Bill[];
  appointments: Appointment[];
}