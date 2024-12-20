import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold">DashBoard</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
