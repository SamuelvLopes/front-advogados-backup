"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoIcon from '@/components/icons/LogoIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] bg-gradient-to-br from-background to-blue-100 dark:from-slate-900 dark:to-slate-800 text-center p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] bg-gradient-to-br from-background to-blue-100 dark:from-slate-900 dark:to-slate-800 text-center p-6">
      <LogoIcon className="h-24 w-24 text-primary mb-6 animate-pulse" />
      <h1 className="text-5xl font-headline text-primary mb-4">
        Bem-vindo ao Advogados Solidários
      </h1>
      <p className="text-xl text-foreground/80 mb-10 max-w-2xl">
        Conectando cidadãos a advogados voluntários para um acesso à justiça mais igualitário.
      </p>
      <div className="space-x-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-150 ease-in-out">
          <Link href="/login">Entrar</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-transform duration-150 ease-in-out">
          <Link href="/register/user">Registrar</Link>
        </Button>
      </div>
       <p className="text-sm text-foreground/60 mt-12 max-w-xl">
        Nossa missão é facilitar o encontro entre quem precisa de auxílio jurídico e profissionais dispostos a ajudar pro bono. Juntos, podemos fazer a diferença.
      </p>
    </div>
  );
}
