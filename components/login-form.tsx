"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  ArrowRight01Icon, 
  Mail01Icon, 
  ViewIcon,
  LockPasswordIcon
} from "@hugeicons/core-free-icons"

const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "jean.kamga@inov-consulting.com",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      toast.success("Connexion réussie !")
    } catch {
      toast.error("Échec de la connexion. Veuillez réessayer.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-[1000px] overflow-hidden rounded-3xl border-none shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-[45%_55%]">
          {/* Left Side: Gradient Panel */}
          <div className="bg-login-gradient relative flex flex-col justify-between p-10 text-white">
            <div className="space-y-12">
              <Logo />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    Powered by AI • V2.4
                  </span>
                </div>
                <h1 className="text-4xl font-bold leading-tight">
                  Votre assistant intelligent pour diriger <span className="text-white/60 italic">sans friction</span>
                </h1>
                <p className="text-sm leading-relaxed text-white/60 max-w-[300px]">
                  Gestion d&apos;agenda, échanges conversationnels et intelligence métier — réunis dans une seule interface conçue pour les décideurs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-white/10">
              <div>
                <div className="text-xl font-bold">2.4k+</div>
                <div className="text-[9px] font-medium text-white/40 uppercase tracking-tighter">Managers actifs</div>
              </div>
              <div>
                <div className="text-xl font-bold">180k</div>
                <div className="text-[9px] font-medium text-white/40 uppercase tracking-tighter">Conversations</div>
              </div>
              <div>
                <div className="text-xl font-bold">99.9%</div>
                <div className="text-[9px] font-medium text-white/40 uppercase tracking-tighter">Disponibilité</div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 bg-white dark:bg-zinc-950">
            <FieldGroup className="gap-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Connexion</h2>
                <p className="text-sm text-muted-foreground">
                  Entrez vos identifiants pour accéder à votre espace.
                </p>
              </div>

              <div className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Adresse e-mail
                  </FieldLabel>
                  <div className="relative">
                    <HugeiconsIcon icon={Mail01Icon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="h-12 border-muted/30 bg-muted/20 pl-10 focus:bg-white"
                      {...register("email")}
                    />
                  </div>
                  <FieldError errors={[errors.email]} />
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      Mot de passe
                    </FieldLabel>
                    <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <HugeiconsIcon icon={LockPasswordIcon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="h-12 border-muted/30 bg-muted/20 pl-10 pr-10 focus:bg-white"
                      {...register("password")}
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                      <HugeiconsIcon icon={ViewIcon} className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <FieldError errors={[errors.password]} />
                </Field>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" {...register("rememberMe")} />
                  <label htmlFor="remember" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Se souvenir de moi pendant 30 jours
                  </label>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="h-12 w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl shadow-lg shadow-zinc-200">
                {isSubmitting ? "Connexion..." : (
                  <span className="flex items-center gap-2">
                    Se connecter <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white dark:bg-zinc-950 px-2 text-muted-foreground font-medium tracking-widest">
                    Ou continuez avec
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="h-11 rounded-xl border-muted/30">
                  <svg className="mr-2 size-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="h-11 rounded-xl border-muted/30">
                  <svg className="mr-2 size-4 text-[#00a1f1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                  </svg>
                  Microsoft 365
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Pas encore de compte ?{" "}
                <a href="#" className="font-semibold text-blue-600 hover:underline">
                  Demander un accès
                </a>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
