import React from 'react';
import { useStorageState } from '../hooks/useStorageState';

export interface Session {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<Session | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value as Session;
}

export function SessionProvider(props: any) {
  const [[isLoading, session], setSession] = useStorageState('token');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (token: string) => {
          // Perform sign-in logic here
          setSession(token);
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
