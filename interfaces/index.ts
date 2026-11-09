import { Strategy } from 'passport';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

export interface IUser {
    id: number;
    name: string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    role: string | null | undefined;
    strategy: string | null | undefined;
    strategy_id: string | null | undefined;
}

declare module "express-session" {
  interface SessionData {
    messages?: string[];
  }
}