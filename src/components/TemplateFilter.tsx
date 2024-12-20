import { Button } from '@/components/ui/button';

const STATUS_OPTIONS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;

interface TemplateFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export function TemplateFilter({ currentStatus, onStatusChange }: TemplateFilterProps) {
  return (
    <div className="flex gap-2">
      {STATUS_OPTIONS.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? "default" : "outline"}
          onClick={() => onStatusChange(status)}
          size="sm"
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
