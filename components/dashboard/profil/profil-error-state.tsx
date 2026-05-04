import Link from "next/link";
import { Button } from "@/components/ui/button";

type ProfilErrorStateProps = {
  onRetry: () => void;
};

export function ProfilErrorState({ onRetry }: ProfilErrorStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto bg-slate-50/50 p-6 text-center">
      <p className="text-slate-600">Impossible de charger votre profil.</p>
      <Button type="button" onClick={onRetry}>
        Réessayer
      </Button>
      <Button variant="outline" asChild>
        <Link href="/dashboard">Retour au tableau de bord</Link>
      </Button>
    </div>
  );
}
