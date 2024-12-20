import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TemplateProvider } from './Context/TemplateContext';
import { TemplateList } from './page/TemplateList';
import { CreateTemplate } from './page/CreateTemplate';
import { Toaster } from './components/ui/toaster';

export function App() {
  return (
    <TemplateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TemplateList />} />
          <Route path="/templates" element={<TemplateList />} />
          <Route path="/templates/create" element={<CreateTemplate />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TemplateProvider>
  );
}
