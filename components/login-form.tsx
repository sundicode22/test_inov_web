"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { 
  Mail01Icon, 
  LockPasswordIcon, 
  ViewIcon, 
  ViewOffSlashIcon,
  GoogleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { FieldError, FieldLabel } from "@/components/ui/field"

const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "jean.kamga@inov-consulting.com",
      rememberMe: true,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid min-h-[600px] w-full max-w-[1000px] overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[420px_1fr]", className)} {...props}>
      {/* Sidebar Gradient */}
      <div className="relative hidden flex-col justify-between bg-login-gradient p-10 text-white md:flex">
        <div className="space-y-12">
          <Logo />
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium tracking-wider text-cyan-400">
              <div className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              POWERED BY AI • V2.4
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight">
                Votre assistant intelligent pour <span className="text-white">diriger</span> <span className="text-sky-400">sans friction</span>
              </h1>
              <p className="text-sm leading-relaxed text-white/60 max-w-[320px]">
                Gestion d&apos;agenda, échanges conversationnels et intelligence métier — réunis dans une seule interface conçue pour les décideurs.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
          <div>
            <div className="text-lg font-bold">2.4k+</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40">Managers actifs</div>
          </div>
          <div>
            <div className="text-lg font-bold">180k</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40">Conversations</div>
          </div>
          <div>
            <div className="text-lg font-bold">99.9%</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40">Disponibilité</div>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex flex-col items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Connexion</h2>
            <p className="text-sm text-slate-500">
              Entrez vos identifiants pour accéder à votre espace.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel htmlFor="email" className="text-sm font-bold text-slate-900">
                  Adresse e-mail
                </FieldLabel>
                <div className="relative">
                  <HugeiconsIcon icon={Mail01Icon} className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.kamga@inov-consulting.com"
                    className="h-12 border-none bg-slate-100 pl-11 shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                    {...register("email")}
                  />
                </div>
                <FieldError errors={[errors.email]} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password" className="text-sm font-bold text-slate-900">
                    Mot de passe
                  </FieldLabel>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <HugeiconsIcon icon={LockPasswordIcon} className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="h-12 border-none bg-slate-100 pl-11 pr-11 shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                    {...register("password")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <HugeiconsIcon icon={showPassword ? ViewOffSlashIcon : ViewIcon} className="size-4" />
                  </button>
                </div>
                <FieldError errors={[errors.password]} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="size-4 border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" {...register("rememberMe")} />
              <label htmlFor="remember" className="text-xs font-medium text-slate-600 leading-none">
                Se souvenir de moi pendant 30 jours
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold hover:bg-slate-900">
              {isLoading ? "Connexion..." : "Se connecter"}
              {!isLoading && <span className="ml-2">{"\u2192"}</span>}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-slate-400">
              <span className="bg-white px-4">Ou continuez avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50">
              <HugeiconsIcon icon={GoogleIcon} className="mr-2 size-4 text-[#EA4335]" />
              <span className="text-xs font-semibold text-slate-700">Google</span>
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50">
              <div className="mr-2 grid grid-cols-2 gap-0.5">
                <div className="size-1.5 bg-[#F25022]" />
                <div className="size-1.5 bg-[#7FBA00]" />
                <div className="size-1.5 bg-[#00A4EF]" />
                <div className="size-1.5 bg-[#FFB900]" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Microsoft 365</span>
            </Button>
          </div>

          <p className="text-center text-xs text-slate-500">
            Pas encore de compte ?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Demander un accès
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
