export default function ProfilPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Mon profil</h1>
      </div>
      <div className="rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            JK
          </div>
          <div>
            <h2 className="text-xl font-bold">Jean Kamga</h2>
            <p className="text-muted-foreground">Directeur</p>
          </div>
        </div>
      </div>
    </div>
  );
}
