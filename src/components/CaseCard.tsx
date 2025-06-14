
import type React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CalendarDays, UserCircle } from 'lucide-react';

export interface Case {
  id: number;
  title: string;
  description: string;
  usuario?: {
    id: number;
    name: string;
  };
  createdAt?: string; 
}

interface CaseCardProps {
  caseData: Case;
  onViewDetails?: (caseId: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, onViewDetails }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não informada';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {
      return 'Data inválida';
    }
  };

  return (
    <Card className="flex flex-col h-full bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden">
      <CardHeader className="p-5 bg-transparent"> {/* Removed bg-primary/5 for cleaner look */}
        <div className="flex items-start space-x-3.5">
          <FileText className="h-6 w-6 text-primary mt-0.5 shrink-0" />
          <div>
            <CardTitle className="text-lg font-headline text-primary leading-tight line-clamp-2">{caseData.title}</CardTitle>
            {caseData.usuario && (
              <CardDescription className="text-xs text-muted-foreground flex items-center mt-1.5">
                <UserCircle className="h-3.5 w-3.5 mr-1.5"/> Submetido por: Usuário ID {caseData.usuario.id}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-4 mb-3.5">
          {caseData.description}
        </p>
        {caseData.createdAt && (
          <div className="text-xs text-muted-foreground flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            Criado em: {formatDate(caseData.createdAt)}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t border-border bg-muted/20">
        {onViewDetails ? (
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground focus:ring-primary"
            onClick={() => onViewDetails(caseData.id)}
            aria-label={`Ver detalhes do caso ${caseData.title}`}
          >
            Ver Detalhes
          </Button>
        ) : (
           <p className="text-xs text-muted-foreground italic w-full text-center">Mais ações em breve</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
