
"use client";

import { SubmitCaseFormComponent } from '@/components/SubmitCaseFormComponent';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SubmitCasePage() {
  const { user, isLoading, isAuthenticated } = useAuthRedirect({ requiredAuth: true, allowedRoles: ['USUARIO'] });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen-content p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated && user?.role !== 'USUARIO') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen-content p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-6">Esta página é exclusiva para usuários.</p>
        <Button asChild>
          <Link href="/dashboard">Voltar ao Painel</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 min-h-screen-content">
      <Card className="max-w-2xl mx-auto shadow-xl bg-card rounded-xl">
        <CardHeader className="text-center p-6 md:p-8">
          <CardTitle className="text-2xl md:text-3xl font-headline text-primary">Submeter Novo Caso</CardTitle>
          <CardDescription className="text-muted-foreground pt-1.5">
            Descreva sua situação para que advogados voluntários possam ajudar.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0">
          <SubmitCaseFormComponent />
        </CardContent>
      </Card>
    </div>
  );
}
