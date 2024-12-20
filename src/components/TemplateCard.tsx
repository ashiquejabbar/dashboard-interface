

import { cn } from '@/lib/utils';
import { WhatsAppTemplate } from '@/type/template';
import { Badge } from './ui/badge';

interface TemplateCardProps {
  template: WhatsAppTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{template.name}</h3>
        <Badge className={cn(statusColors[template.status])}>
          {template.status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Header</p>
          <p>{template.sections.header.text}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Body</p>
          <p>{template.sections.body.text}</p>
        </div>
        
        {template.sections.footer.text && (
          <div>
            <p className="text-sm text-gray-500">Footer</p>
            <p>{template.sections.footer.text}</p>
          </div>
        )}
        
        {template.sections.buttons.length > 0 && (
          <div>
            <p className="text-sm text-gray-500">Buttons</p>
            {template.sections.buttons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
