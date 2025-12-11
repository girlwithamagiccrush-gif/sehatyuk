import React, { useState, useCallback } from 'react';
import { AgentType, ChatMessage } from './types';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import MedicalRecordsView from './components/agents/MedicalRecordsView';
import BillingView from './components/agents/BillingView';
import PatientInfoView from './components/agents/PatientInfoView';
import AppointmentView from './components/agents/AppointmentView';
import { classifyIntent } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid'; // Since we can't use uuid package directly in this env, we'll use a simple mock generator

// Simple UUID mock for this environment
const generateId = () => Math.random().toString(36).substring(2, 15);

const App: React.FC = () => {
  const [currentAgent, setCurrentAgent] = useState<AgentType>(AgentType.NAVIGATOR);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<string>(''); // Stores the context passed to agents

  const handleSendMessage = useCallback(async (text: string) => {
    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Call Gemini to determine intent
      const result = await classifyIntent(text);

      // 3. Create System Response
      const systemMsg: ChatMessage = {
        id: generateId(),
        role: 'model',
        content: result.reply,
        timestamp: new Date(),
        agent: AgentType.NAVIGATOR
      };
      setMessages((prev) => [...prev, systemMsg]);

      // 4. Switch Agent if necessary
      if (result.agent !== AgentType.NAVIGATOR) {
        setContext(result.context); // Pass the user's original request as context
        setTimeout(() => {
          setCurrentAgent(result.agent);
        }, 1000); // Slight delay for UX effect
      }
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'system',
        content: "Sorry, I encountered an error connecting to the central system.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderAgentView = () => {
    switch (currentAgent) {
      case AgentType.MEDICAL_RECORDS:
        return <MedicalRecordsView context={context} />;
      case AgentType.BILLING:
        return <BillingView context={context} />;
      case AgentType.PATIENT_INFO:
        return <PatientInfoView context={context} />;
      case AgentType.APPOINTMENTS:
        return <AppointmentView context={context} />;
      case AgentType.NAVIGATOR:
      default:
        return (
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
          />
        );
    }
  };

  return (
    <Layout currentAgent={currentAgent} setAgent={setCurrentAgent}>
      {renderAgentView()}
    </Layout>
  );
};

export default App;