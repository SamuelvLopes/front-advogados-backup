"use client";

import CaseList from '@/components/CaseList';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CasesPage() {
  const { user, isLoading, isAuthenticated } = useAuthRedirect({ requiredAuth: true, allowedRoles: ['ADVOGADO'] });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (isAuthenticated && user?.role !== 'ADVOGADO') {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-6">Esta página é exclusiva para advogados.</p>
        <Button asChild>
          <Link href="/dashboard">Voltar ao Painel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8 shadow-lg bg-card rounded-xl">
        <CardHeader className="bg-primary/5 p-6">
          <div className="flex items-center space-x-4">
            <Briefcase className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Casos Disponíveis para Atuação</CardTitle>
              <CardDescription className="text-md text-muted-foreground">
                Revise os casos submetidos e escolha aqueles em que pode oferecer sua ajuda voluntária.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <CaseList />
    </div>
  );
}

// Ensure metadata is exported correctly if needed, but this is a client component focus page.
// export const metadata: Metadata = {
//   title: 'Lista de Casos | Advogados Solidários',
// };
