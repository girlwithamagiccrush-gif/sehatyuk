import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { AgentType } from "../types";

// Tool Definitions mapped to Agent Types
const medicalRecordsTool: FunctionDeclaration = {
  name: "medicalRecordsAgent",
  description: "Retrieves and provides access to patient medical records, test results, diagnoses, and care history. Ensures confidentiality.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: "The specific information the user is looking for regarding records." }
    },
    required: ["query"]
  }
};

const billingTool: FunctionDeclaration = {
  name: "billingAndInsuranceAgent",
  description: "Handles questions related to billing, invoices, insurance coverage, benefits, and payment options.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: "The financial or insurance question." }
    },
    required: ["query"]
  }
};

const patientInfoTool: FunctionDeclaration = {
  name: "patientInformationAgent",
  description: "Manages patient registration, personal detail updates, retrieving general patient info, or checking patient status.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: { type: Type.STRING, description: "The action to perform (update, retrieve, register)." }
    },
    required: ["action"]
  }
};

const appointmentTool: FunctionDeclaration = {
  name: "appointmentScheduler",
  description: "Manages all appointment tasks: scheduling, rescheduling, and canceling patient appointments.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      intent: { type: Type.STRING, description: "schedule, reschedule, or cancel" },
      details: { type: Type.STRING, description: "Context details like doctor name, time, etc." }
    },
    required: ["intent"]
  }
};

const tools: Tool[] = [{
  functionDeclarations: [
    medicalRecordsTool,
    billingTool,
    patientInfoTool,
    appointmentTool
  ]
}];

export const classifyIntent = async (userMessage: string): Promise<{ agent: AgentType; context: string; reply: string }> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    // We use a low temperature for deterministic routing
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
        temperature: 0.1, 
      }
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
        return { agent: AgentType.NAVIGATOR, context: '', reply: "I'm sorry, I couldn't process that request." };
    }

    const firstPart = candidates[0].content.parts[0];

    // Check for Function Call
    if (firstPart.functionCall) {
      const fnName = firstPart.functionCall.name;
      // Map function names to AgentTypes
      switch (fnName) {
        case "medicalRecordsAgent":
          return { agent: AgentType.MEDICAL_RECORDS, context: userMessage, reply: "Accessing Medical Records Sub-system..." };
        case "billingAndInsuranceAgent":
          return { agent: AgentType.BILLING, context: userMessage, reply: "Routing to Billing & Insurance Department..." };
        case "patientInformationAgent":
          return { agent: AgentType.PATIENT_INFO, context: userMessage, reply: "Opening Patient Information Module..." };
        case "appointmentScheduler":
          return { agent: AgentType.APPOINTMENTS, context: userMessage, reply: "Connecting to Appointment Scheduler..." };
        default:
          return { agent: AgentType.NAVIGATOR, context: '', reply: "I'm not sure which system to route you to." };
      }
    }

    // If no function call, it's just a general chat response (likely a greeting or clarification request)
    return { 
      agent: AgentType.NAVIGATOR, 
      context: '', 
      reply: firstPart.text || "How can I help you navigate the hospital system today?" 
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return { agent: AgentType.NAVIGATOR, context: '', reply: "System Error: Unable to connect to the Navigator AI." };
  }
};