export type Role = 'Employee'|'ADMIN'|'USER';

export interface User{
    uid: string;
    email: string;
    displayName ?: string;
    emailVerified: boolean;
    password ?: string;
    photoURL ?: string;
    role ?: Role;    
}