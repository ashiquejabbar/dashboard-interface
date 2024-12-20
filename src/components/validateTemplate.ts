import { WhatsAppTemplate } from "@/type/template";


export function validateTemplate(template: Partial<WhatsAppTemplate>) {
  const errors: Record<string, string> = {};

  if (!template.name?.trim()) {
    errors.name = 'Template name is required';
  }

  if (!template.sections?.header?.text?.trim()) {
    errors.header = 'Header text is required';
  }

  if (!template.sections?.body?.text?.trim()) {
    errors.body = 'Body text is required';
  }

  if (template.sections?.buttons?.length) {
    const button = template.sections.buttons[0];
    if (button.text && !button.url) {
      errors.buttonUrl = 'Button URL is required when button text is provided';
    }
    if (button.url && !button.text) {
      errors.buttonText = 'Button text is required when URL is provided';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
