import { WhatsAppTemplate } from "@/type/template";

type TemplateAction = 
  | { type: 'ADD_TEMPLATE'; payload: WhatsAppTemplate }
  | { type: 'UPDATE_TEMPLATE'; payload: WhatsAppTemplate }
  | { type: 'DELETE_TEMPLATE'; payload: string };

interface TemplateState {
  templates: WhatsAppTemplate[];
}

export function templateReducer(state: TemplateState, action: TemplateAction): TemplateState {
  switch (action.type) {
    case 'ADD_TEMPLATE':
      return {
        ...state,
        templates: [...state.templates, action.payload],
      };
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        ),
      };
    case 'DELETE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.filter((template) => template.id !== action.payload),
      };
    default:
      return state;
  }
}
