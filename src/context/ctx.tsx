import { createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

export interface Session {
  signIn: (tokens: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<Session | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);

  return value as Session;
}

export function SessionProvider(props: any) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (tokens: string) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(tokens));
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
