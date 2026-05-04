export default function ParametresPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Paramètres</h1>
      </div>
      <div className="rounded-lg border shadow-sm p-6">
        <p className="text-muted-foreground">Gérez vos préférences de compte ici.</p>
      </div>
    </div>
  );
}
