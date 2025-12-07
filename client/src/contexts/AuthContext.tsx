import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserRole } from '@shared/schema';

interface UserProfile {
  id: string;
  companyId: string | null;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, companyName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; redirectPath?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, company_id, role, first_name, last_name')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return {
      id: data.id,
      companyId: data.company_id,
      role: data.role as UserRole,
      firstName: data.first_name,
      lastName: data.last_name,
    };
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      }
      
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case 'company_admin':
        return '/company-dashboard';
      case 'hr':
        return '/hr-dashboard';
      case 'employee':
        return '/employee-dashboard';
      default:
        return '/dashboard';
    }
  };

  const signUp = async (email: string, password: string, companyName?: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      return { error: error as Error };
    }

    if (data.user && companyName) {
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();

      if (companyError) {
        console.error('Error creating company:', companyError);
        return { error: companyError as Error };
      }

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: data.user.id,
          company_id: companyData.id,
          role: 'company_admin',
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return { error: profileError as Error };
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      return { error: error as Error };
    }

    if (data.user) {
      const userProfile = await fetchProfile(data.user.id);
      if (userProfile) {
        setProfile(userProfile);
        return { error: null, redirectPath: getRedirectPath(userProfile.role) };
      }
    }

    return { error: null, redirectPath: '/dashboard' };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
