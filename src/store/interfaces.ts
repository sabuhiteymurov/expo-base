export interface App {
  isConnectedToInternet: boolean;
  user: { email: string; fullName: string; accessToken: string } | null;
}

export interface Store {
  app: App;
}
