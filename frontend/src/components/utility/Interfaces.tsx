export interface Account {
  id: number | null;
  name: string;
  username: string;
  password: string;
  admin: boolean;
  active: boolean;
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
