export interface User {
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (username: string, tokens: { access_token: string; refresh_token: string }) => void;
  logout: () => void;
}
