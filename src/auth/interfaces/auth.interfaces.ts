import { LEVEL_AUTHORITY } from './../../constants/level-authority';

export interface PayloadToken {
    sub: string;
    role: LEVEL_AUTHORITY;
}

export interface AuthBody {
    email: string;
    password: string;
}

export interface AuthTokenResult {
    role: string;
    sub:  string;
    iat:  number;
    exp:  number;
}

export interface IUseToken {
    role: string;
    sub:  string;
    isExpired: boolean;
}