
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
      <div className="flex flex-col items-center justify-center min-h-screen-content p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-foreground">Carregando painel...</p>
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen-content p-6 text-center">
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
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <Card className="mb-8 lg:mb-12 bg-card shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-primary/5 p-6 md:p-8">
          <div className="flex items-center space-x-4">
            <User className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            <div>
              <CardTitle className="text-2xl md:text-3xl font-headline text-primary">Bem-vindo(a), {user.name}!</CardTitle>
              <CardDescription className="text-md text-muted-foreground">Seu painel personalizado Advogados Solidários.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {user.role === 'USUARIO' && (
          <Card className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="p-6">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="h-7 w-7 text-accent" />
                <CardTitle className="text-xl md:text-2xl font-headline text-primary">Meus Casos</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">Crie e acompanhe seus pedidos de auxílio jurídico.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground mb-6">
                Precisa de ajuda com uma questão legal? Submeta seu caso para que advogados voluntários possam analisá-lo.
              </p>
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-transform">
                <Link href="/submit-case">Submeter Novo Caso</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {user.role === 'ADVOGADO' && (
          <Card className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Briefcase className="h-7 w-7 text-accent" />
                 <CardTitle className="text-xl md:text-2xl font-headline text-primary">Casos Disponíveis</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">Veja os casos submetidos e ofereça sua ajuda.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground mb-6">
                Explore os casos que necessitam de auxílio jurídico e contribua com seu conhecimento e tempo.
              </p>
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-transform">
                <Link href="/cases">Ver Casos Disponíveis</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        
        <Card className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 md:col-span-1">
          <CardHeader className="p-6">
            <CardTitle className="text-xl md:text-2xl font-headline text-primary">Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Advocacia solidária" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4 object-cover w-full h-48"
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
