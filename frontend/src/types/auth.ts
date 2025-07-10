export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface VerifyEmailDTO {
  email: string;
  token: string;
}

export interface ResendVerificationEmail {
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}
