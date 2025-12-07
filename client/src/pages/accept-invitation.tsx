import { useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase";

const acceptSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AcceptFormData = z.infer<typeof acceptSchema>;

interface Invitation {
  id: string;
  email: string;
  role: string;
  companyId: string;
  expiresAt: string;
}

export default function AcceptInvitation() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/accept-invitation/:token");
  const token = params?.token;
  
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<AcceptFormData>({
    resolver: zodResolver(acceptSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (token) {
      verifyInvitation();
    }
  }, [token]);

  const verifyInvitation = async () => {
    try {
      const response = await fetch(`/api/invitations/verify/${token}`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Invalid invitation");
        setIsLoading(false);
        return;
      }
      
      setInvitation(data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to verify invitation");
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: AcceptFormData) => {
    if (!invitation) return;
    
    setError(null);
    setIsSubmitting(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitation.email,
        password: data.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsSubmitting(false);
        return;
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("user_profiles")
          .upsert({
            id: authData.user.id,
            company_id: invitation.companyId,
            role: invitation.role,
          });

        if (profileError) {
          console.error("Profile error:", profileError);
        }

        await fetch(`/api/invitations/accept/${token}`, { method: "POST" });
      }

      setSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      setError("Failed to create account");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-md p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Invalid Invitation
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              {error}
            </p>
            <Link href="/login">
              <Button className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-md p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Account Created!
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Your account has been created successfully. Please check your email to verify your account, then sign in.
            </p>
            <Link href="/login">
              <Button className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-md p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">PF</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Accept Invitation
            </h1>
            <p className="text-muted-foreground text-sm">
              You've been invited as <span className="font-medium text-foreground">{invitation?.role}</span>
            </p>
            <p className="text-muted-foreground text-sm">
              Create your password to join
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-6">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <div className="bg-muted/50 rounded-md p-3 mb-6">
            <p className="text-sm text-muted-foreground">
              Email: <span className="font-medium text-foreground">{invitation?.email}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Create a password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account & Join"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}
