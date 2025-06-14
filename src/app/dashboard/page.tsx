"use client";

import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, User, AlertTriangle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuthRedirect({ requiredAuth: true });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-foreground">Carregando painel...</p>
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Erro ao carregar dados</h1>
        <p className="text-muted-foreground mb-6">Não foi possível carregar os dados do usuário. Tente fazer login novamente.</p>
        <Button asChild>
          <Link href="/login">Ir para Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 bg-card shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-primary/5 p-6">
          <div className="flex items-center space-x-4">
            <User className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Bem-vindo(a), {user.name}!</CardTitle>
              <CardDescription className="text-md text-muted-foreground">Seu painel personalizado Advogados Solidários.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {user.role === 'USUARIO' && (
          <Card className="hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl font-headline text-primary">Meus Casos</CardTitle>
              </div>
              <CardDescription>Crie e acompanhe seus pedidos de auxílio jurídico.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Precisa de ajuda com uma questão legal? Submeta seu caso para que advogados voluntários possam analisá-lo.
              </p>
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/submit-case">Submeter Novo Caso</Link>
              </Button>
              {/* Future: Display list of user's cases */}
            </CardContent>
          </Card>
        )}

        {user.role === 'ADVOGADO' && (
          <Card className="hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Briefcase className="h-8 w-8 text-accent" />
                 <CardTitle className="text-2xl font-headline text-primary">Casos Disponíveis</CardTitle>
              </div>
              <CardDescription>Veja os casos submetidos e ofereça sua ajuda.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Explore os casos que necessitam de auxílio jurídico e contribua com seu conhecimento e tempo.
              </p>
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/cases">Ver Casos Disponíveis</Link>
              </Button>
               {/* Future: Display quick stats or recently added cases */}
            </CardContent>
          </Card>
        )}
        
        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-lg md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Advocacia solidária" 
              width={600} 
              height={400} 
              className="rounded-md mb-4 object-cover w-full h-48"
              data-ai-hint="justice law"
            />
            <p className="text-muted-foreground">
              Acreditamos no poder da colaboração para promover o acesso à justiça. Advogados Solidários é uma plataforma que une pessoas que precisam de orientação legal com advogados dispostos a oferecer seu tempo e conhecimento de forma voluntária. Juntos, construímos uma sociedade mais justa e igualitária.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
