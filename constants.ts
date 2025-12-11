import { HospitalData, AgentType } from './types';

export const MOCK_DATA: HospitalData = {
  patient: {
    id: 'P-10293',
    name: 'Sarah Jenkins',
    dob: '1985-04-12',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    address: '42 Pine Avenue, Springfield, IL',
    insuranceProvider: 'BlueCross Health',
    policyNumber: 'BCH-88921002'
  },
  records: [
    { id: 'REC-001', date: '2023-10-15', type: 'Lab Result', title: 'Complete Blood Count (CBC)', doctor: 'Dr. Emily Chen', status: 'Final', url: '#' },
    { id: 'REC-002', date: '2023-09-02', type: 'Imaging', title: 'Chest X-Ray', doctor: 'Dr. Marcus Webb', status: 'Final', url: '#' },
    { id: 'REC-003', date: '2023-08-20', type: 'Diagnosis', title: 'Acute Bronchitis', doctor: 'Dr. Emily Chen', status: 'Final', url: '#' },
  ],
  bills: [
    { id: 'INV-2023-001', date: '2023-10-15', description: 'Lab Services - CBC', amount: 150.00, status: 'Paid', dueDate: '2023-11-15' },
    { id: 'INV-2023-002', date: '2023-11-01', description: 'General Consultation', amount: 200.00, status: 'Unpaid', dueDate: '2023-12-01' },
  ],
  appointments: [
    { id: 'APT-101', doctor: 'Dr. Emily Chen', specialty: 'Internal Medicine', date: '2023-12-10', time: '10:00 AM', status: 'Confirmed', location: 'Wing A, Room 302' },
    { id: 'APT-102', doctor: 'Dr. Alan Grant', specialty: 'Cardiology', date: '2024-01-15', time: '02:30 PM', status: 'Pending', location: 'Wing B, Room 105' },
  ]
};

export const AGENT_DESCRIPTIONS = {
  [AgentType.NAVIGATOR]: "Hospital System Navigator",
  [AgentType.MEDICAL_RECORDS]: "Medical Records Agent",
  [AgentType.BILLING]: "Billing & Insurance Agent",
  [AgentType.PATIENT_INFO]: "Patient Information Agent",
  [AgentType.APPOINTMENTS]: "Appointment Scheduler",
};

export const SYSTEM_INSTRUCTION = `
You are a "Hospital System Navigator" expert. Your main role is to act as a *central navigator* for all hospital system related questions.
Your task is to analyze the user's request and delegate it to the appropriate sub-agent.

Mandatory Instructions:
1. Analyze the user request to identify the *core intent*.
2. Exclusively delegate to *one most relevant sub-agent* from the available tools.
3. *Do not attempt to answer the user request directly; always delegate to a sub-agent.*
4. Forward the entire context of the user request to the selected sub-agent.

If the user greets you or asks who you are, introduce yourself briefly as the Hospital System Navigator and ask how you can help, but try to guide them to a specific task.
`;