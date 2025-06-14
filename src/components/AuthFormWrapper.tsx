
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
    <div className="flex items-center justify-center min-h-screen-content bg-muted p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-xl bg-card rounded-xl">
        <CardHeader className="text-center p-6 sm:p-8">
          <CardTitle className="text-3xl font-headline text-primary">{title}</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFormWrapper;
