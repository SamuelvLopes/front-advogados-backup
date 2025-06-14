"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import CaseCard, { type Case } from '@/components/CaseCard';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/config/api';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2, SearchX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

interface CaseListProps {
  // Props can be added later if needed, e.g., for filtering
}

const CaseList: React.FC<CaseListProps> = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCases = async () => {
      if (!token) {
        setError("Autenticação necessária.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/causas`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro ao buscar casos: ${response.statusText}`);
        }
        const data: Case[] = await response.json();
        // Ensure description is not null or undefined for display
        const processedData = data.map(c => ({...c, description: c.description || "Descrição não fornecida."}));
        setCases(processedData);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Erro ao carregar casos",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [token, toast]);

  const handleViewDetails = (caseId: number) => {
    // Placeholder for future functionality
    toast({ title: "Funcionalidade em desenvolvimento", description: `Detalhes do caso ID ${caseId} em breve.`});
  };

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-foreground">Carregando casos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-10">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Erro ao carregar os casos</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          type="text"
          placeholder="Buscar casos por título ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md text-base"
          aria-label="Buscar casos"
        />
        <Button onClick={() => setSearchTerm('')} variant="outline" disabled={!searchTerm} className="text-sm">
          Limpar Busca
        </Button>
      </div>

      {filteredCases.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <SearchX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">
            {cases.length > 0 && searchTerm ? 'Nenhum caso encontrado com os termos da busca.' : 'Nenhum caso disponível no momento.'}
          </p>
          {cases.length === 0 && !searchTerm && <p className="text-sm text-muted-foreground mt-2">Volte mais tarde para verificar novos casos.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseData={caseItem} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseList;
