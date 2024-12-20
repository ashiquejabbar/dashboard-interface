import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
      <p className="text-gray-500  mb-4">Create your first WhatsApp template to get started</p>
      <Button className='border-gray-900 border rounded-xl'  onClick={() => navigate('/templates/create')}>
        Create Template
      </Button>
    </div>
  );
}
