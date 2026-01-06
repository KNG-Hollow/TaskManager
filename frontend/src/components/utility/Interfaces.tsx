import type { JwtPayload } from 'jwt-decode';

export interface Account {
  id: number | null;
  name: string;
  username: string;
  password: string;
  admin: boolean;
  active: boolean;
}

export interface JwtResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface JwtObject extends JwtPayload {
  admin: boolean;
  exp: number;
  id: number;
  name: string;
  orig_iat: number;
}

export interface Task {
  id: number | null;
  name: string;
  description: string;
  created: Date | string;
  username: string;
  active: boolean;
}

export interface AppState {
  active: boolean;
  admin: boolean;
}

export interface ErrorState {
  active: boolean;
  title: string;
  message: string;
}
