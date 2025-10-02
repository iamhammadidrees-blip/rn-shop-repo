import { Session } from '@supabase/supabase-js';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';

type AuthData = {
  session: Session | null;
  mounting: boolean;
  user: any;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  mounting: true,
  user: null,
  signOut: async () => ({ error: null }),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<{
    avatar_url: string;
    created_at: string | null;
    email: string;
    expo_notification_token: string | null;
    id: string;
    stripe_customer_id: string | null;
    type: string | null;
  } | null>(null);
  const [mounting, setMounting] = useState(true);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
    }
    return { error };
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session fetch error:', sessionError);
      }

      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('error', error);
        } else {
          setUser(user);
        }
      } else {
        setUser(null); // Clear user when no session
      }

      setMounting(false);
    };

    fetchSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session) {
        // User signed in - fetch user data
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('error', error);
        } else {
          setUser(user);
        }
      } else {
        // User signed out - clear user data
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, mounting, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
