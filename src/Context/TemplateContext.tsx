import { templateReducer } from '@/components/templateReducer';
import { WhatsAppTemplate } from '@/type/template';
import React, { createContext, useContext, useReducer } from 'react';


interface TemplateState {
  templates: WhatsAppTemplate[];
}

interface TemplateContextType {
  templates: WhatsAppTemplate[];
  addTemplate: (template: WhatsAppTemplate) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(templateReducer, { templates: [] });

  const addTemplate = (template: WhatsAppTemplate) => {
    dispatch({ type: 'ADD_TEMPLATE', payload: template });
  };

  return (
    <TemplateContext.Provider value={{ templates: state.templates, addTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) throw new Error('useTemplates must be used within TemplateProvider');
  return context;
};
