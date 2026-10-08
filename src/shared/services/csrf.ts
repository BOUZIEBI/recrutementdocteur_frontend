// src/services/csrf.ts

let csrfToken: string | null = null;

export function setCsrfToken(token: string): void {
  csrfToken = token;
}



export function clearCsrfToken(): void {
  csrfToken = null;
}