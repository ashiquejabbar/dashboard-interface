import { useState, useMemo } from 'react';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateSearch } from '@/components/TemplateSearch';
import { TemplateFilter } from '@/components/TemplateFilter';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTemplates } from '@/Context/TemplateContext';
import { Layout } from '@/Layout/Layout';

export function TemplateList() {
  const { templates } = useTemplates();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.sections.body.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || template.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [templates, searchQuery, statusFilter]);

  const templateStats = useMemo(() => ({
    total: templates.length,
    pending: templates.filter(t => t.status === 'PENDING').length,
    approved: templates.filter(t => t.status === 'APPROVED').length,
    rejected: templates.filter(t => t.status === 'REJECTED').length,
  }), [templates]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">WhatsApp Templates</h1>
            <p className="text-gray-500 mt-1">
              Total: {templateStats.total} • Pending: {templateStats.pending} •
              Approved: {templateStats.approved} • Rejected: {templateStats.rejected}
            </p>
          </div>
          <Button onClick={() => navigate('/templates/create')}>
            Create Template
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <TemplateSearch onSearch={setSearchQuery} />
          <TemplateFilter
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {templates.length === 0 ? (
          <EmptyState />
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No templates match your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Header</th>
                  <th className="py-3 px-4 text-left">Body</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{template.name}</td>
                    <td className="py-3 px-4">{template.sections.header.text}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate">
                        {template.sections.body.text}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${template.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                          template.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {template.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(template.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
