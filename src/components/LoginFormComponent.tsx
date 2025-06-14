"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginFormComponent() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Falha ao fazer login.");
      }
      
      // Assuming the API returns token and user data (name, email, role)
      // The user object might be nested, e.g. result.user
      // For this example, let's assume result has: token, name, email, role
      // This needs to match the actual API response structure.
      // If role is not directly available, it might need to be fetched or assumed.
      // For now, if the API returns a generic user object without role, we'll need a way to get it.
      // Let's assume the login endpoint returns a user object like: { name: string, email: string, role: string, token: string }
      // Or { token: string, user: { name: string, email: string, role: string } }
      // The prompt suggests "generating a token", doesn't specify user details return.
      // We will assume a structure like: { token: "...", name: "...", email: "...", role: "..." }
      // This is a common pattern, if not, AuthContext needs modification.
      // Let's assume the backend provides the necessary user details in the login response.
      // If it returns { token: "...", id: "...", authorities: [{authority: "ROLE_USUARIO"}] }
      // We need to map `authorities` to `role`.

      let userRole = result.role; // Default if role is top-level
      if (result.user && result.user.role) { // If user is nested
          userRole = result.user.role;
      } else if (result.authorities && result.authorities.length > 0) {
        // Example: map Spring Security role "ROLE_USUARIO" to "USUARIO"
        const authority = result.authorities[0].authority;
        if (authority === "ROLE_USUARIO") userRole = "USUARIO";
        else if (authority === "ROLE_ADVOGADO") userRole = "ADVOGADO";
      }

      if (!userRole) {
        throw new Error("Não foi possível determinar o papel do usuário.");
      }

      const userData = {
        name: result.name || (result.user ? result.user.name : "Usuário"),
        email: result.email || (result.user ? result.user.email : data.email),
        role: userRole,
      };

      login(result.token, userData);
      toast({
        title: "Login bem-sucedido!",
        description: `Bem-vindo(a) de volta, ${userData.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: (error as Error).message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seuemail@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Sua senha" {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Entrar
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/register/user" className="font-medium text-primary hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </Form>
  );
}
