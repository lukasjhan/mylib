interface ErrorRes {
  errors: Array<{
    domain: string;
    reason: string;
    message: string;
  }>;
  code: string; // status code
  message: string;
}

export interface SignUpRes {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string; // uid.
  error?: ErrorRes;
}

export interface SignInRes {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string; // uid.
  error?: ErrorRes;
}

export interface RefreshTokenRes {
  id_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  user_id: string; // uid.
  project_id: string;
  error?: ErrorRes;
}

export interface ResetPasswordRes {
  email: string;
  error?: ErrorRes;
}

export interface UpdatePasswordRes {
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: any[];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  error?: ErrorRes;
}

export interface DeleteUserRes {
  error?: ErrorRes;
}
