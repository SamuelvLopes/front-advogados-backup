"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LogoIcon from '@/components/icons/LogoIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, UserCircle, LogOut, LayoutDashboard, FileText, Briefcase, UserPlus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading && !isClient) { // Prevents flash of unauthenticated navbar during initial load
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-headline">
            <LogoIcon className="h-7 w-7" />
            Advogados Solidários
          </Link>
          <div className="h-8 w-24 bg-primary-foreground/20 animate-pulse rounded-md"></div>
        </div>
      </header>
    );
  }


  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItemsBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline">
          <LogoIcon className="h-7 w-7" />
          Advogados Solidários
        </Link>
        <nav className="flex items-center gap-2">
          {isClient && isAuthenticated && user ? (
            <>
              <Link href="/dashboard" className={`${navItemsBase} ${pathname === '/dashboard' ? 'bg-primary-foreground/20' : ''}`}>
                <LayoutDashboard className="inline-block mr-1 h-4 w-4" />Painel
              </Link>
              {user.role === 'USUARIO' && (
                <Link href="/submit-case" className={`${navItemsBase} ${pathname === '/submit-case' ? 'bg-primary-foreground/20' : ''}`}>
                  <FileText className="inline-block mr-1 h-4 w-4" />Submeter Caso
                </Link>
              )}
              {user.role === 'ADVOGADO' && (
                <Link href="/cases" className={`${navItemsBase} ${pathname === '/cases' ? 'bg-primary-foreground/20' : ''}`}>
                  <Briefcase className="inline-block mr-1 h-4 w-4" />Ver Casos
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 hover:bg-primary-foreground/10 text-primary-foreground focus:ring-accent">
                    <UserCircle className="h-5 w-5" />
                    {user.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background text-foreground border-border shadow-lg w-56">
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : isClient && !isAuthenticated ? (
            <>
              <Link href="/login" className={navItemsBase}>
                Entrar
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90 border-accent focus:ring-accent">
                    Registrar <UserPlus className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background text-foreground border-border shadow-lg">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/register/user">Como Usuário</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/register/lawyer">Como Advogado</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
