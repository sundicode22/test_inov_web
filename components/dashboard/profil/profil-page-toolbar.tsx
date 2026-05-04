import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ProfilPageToolbar() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
        <p className="mt-0.5 text-base text-slate-500">
          Gérez vos informations personnelles et préférences de compte.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-11 rounded-lg border border-[#E5E7EB] px-5 bg-white font-semibold "
        >
          <Download className="mr-2 size-4" />
          Exporter
        </Button>
        <Button className="h-11 rounded-lg border border-slate-900 px-5 bg-slate-900 font-semibold text-white  hover:bg-slate-800">
          Modifier le profil
        </Button>
      </div>
    </div>
  );
}
