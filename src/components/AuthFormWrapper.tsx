"use client";

import type React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AuthFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] bg-gradient-to-br from-background to-blue-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">{title}</CardTitle>
          <CardDescription className="text-muted-foreground pt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFormWrapper;
