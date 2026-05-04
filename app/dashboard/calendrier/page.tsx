export default function CalendrierPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Calendrier</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Votre calendrier est vide
          </h3>
          <p className="text-sm text-muted-foreground">
            Planifiez vos prochaines réunions ici.
          </p>
        </div>
      </div>
    </div>
  );
}
