"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.status === 200) {
        toast.success("Connexion réussie");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Identifiants invalides");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Brand panel (left only — form column unchanged) */}
          <div className="relative hidden min-h-[700px] w-full overflow-hidden bg-gradient-to-b from-[#0c1929] via-[#081420] to-[#030a12] md:flex md:min-h-full md:flex-col md:justify-between">
            <div
              className="pointer-events-none absolute right-0 -top-20 h-[320px] w-[320px] rounded-full bg-primary/50 blur-[100px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-[240px] w-[120%] -translate-x-1/2 translate-y-1/3 bg-cyan-900/80 blur-[80px]"
              aria-hidden
            />

            <div className="relative z-10 flex flex-1 flex-col gap-10 p-8 lg:p-10">
              <div className="flex mb-10">
                <Logo />=
              </div>

              <div className="max-w-lg space-y-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-teal-400,40 shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                    aria-hidden
                  />
                  Powered by AI · V2.4
                </p>
                <h2 className="text-balance text-xl flex flex-wrap font-bold leading-[1.15] tracking-tight text-white lg:text-2xl">
                  Votre assistant intelligent pour diriger{" "}
                  <span className="bg-gradient-to-b from-white to-blue-400 bg-clip-text text-transparent">
                    sans friction
                  </span>{" "}
                </h2>
                <p className="text-pretty text-xs leading-relaxed text-slate-400">
                  Gestion d&apos;agenda, échanges conversationnels et
                  intelligence métier — réunis dans une seule interface conçue
                  pour les décideurs.
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 px-8 pb-8 pt-6 lg:px-10">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold tabular-nums text-white lg:text-3xl">
                    2.4k+
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Managers actifs
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-white lg:text-3xl">
                    180k
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Conversations
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-white lg:text-3xl">
                    99.9%
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Disponibilité
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-10 bg-white"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-black font-bold">Connexion</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Entrez vos identifiants pour accéder à votre espace.{" "}
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    {...register("email")}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="#"
                      className="ml-auto text-xs underline-offset-4 hover:underline font-medium text-primary"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      disabled={isLoading}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                    {errors.password && (
                      <p className="text-xs text-destructive font-medium mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-bold bg-black hover:bg-black/90 shadow-lg shadow-primary/30 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white px-2 text-muted-foreground uppercase tracking-wider font-bold">
                  Ou continuez avec
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  className="h-11 border-border/60 hover:bg-muted/50"
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  <span className="text-xs font-bold">Google</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="h-11 border-border/60 hover:bg-muted/50"
                >
                  <FaGithub className="mr-2 h-5 w-5" />
                  <span className="text-xs font-bold">GitHub</span>
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Pas encore de compte ?{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary font-bold"
                >
                  Demander un accès
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
