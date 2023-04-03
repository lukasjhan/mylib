import axios from "axios";
import { FIREBASE_ENDPOINT } from "./type/endpoint";
import {
  DeleteUserRes,
  RefreshTokenRes,
  ResetPasswordRes,
  SignInRes,
  SignUpRes,
  UpdatePasswordRes,
} from "./type/firebase";

const config = require("../config.json");

export const signInToFirebaseAuth = async (
  email: string,
  password: string
): Promise<SignInRes> => {
  const signInEndPoint = `${FIREBASE_ENDPOINT.SIGNIN}?key=${config.apikey}`;
  const response = await axios<SignInRes>(signInEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
      returnSecureToken: true,
    },
  });

  return response.data;
};

export const refreshTokenToFirebaseAuth = async (
  refreshToken: string
): Promise<RefreshTokenRes> => {
  const refreshTokenEndPoint = `${FIREBASE_ENDPOINT.REFRESH_TOKEN}?key=${config.apikey}`;
  const response = await axios<RefreshTokenRes>(refreshTokenEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
  });

  return response.data;
};

export const resetPasswordToFirebaseAuth = async (
  lang: string,
  email: string
): Promise<ResetPasswordRes> => {
  const resetPasswordEndPoint = `${FIREBASE_ENDPOINT.RESET_PASSWORD}?key=${config.apikey}`;
  const response = await axios<ResetPasswordRes>(resetPasswordEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-Locale": lang,
    },
    data: {
      requestType: "PASSWORD_RESET",
      email,
    },
  });

  return response.data;
};

export const updatePasswordToFirebaseAuth = async (
  idToken: string,
  password: string
): Promise<UpdatePasswordRes> => {
  const updatePassword = `${FIREBASE_ENDPOINT.CHANGE_PASSWORD}?key=${config.apikey}`;
  const response = await axios<UpdatePasswordRes>(updatePassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      idToken,
      password,
      returnSecureToken: true,
    },
  });

  return response.data;
};

export const signUpToFirebaseAuth = async (
  email: string,
  password: string
): Promise<SignUpRes> => {
  const signUpEndPoint = `${FIREBASE_ENDPOINT.SIGNUP}?key=${config.apikey}`;
  const response = await axios<SignUpRes>(signUpEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
      returnSecureToken: true,
    },
  });

  return response.data;
};

export const deleteUserFromFirebaseAuth = async (
  idToken: string
): Promise<DeleteUserRes> => {
  const signUpEndPoint = `${FIREBASE_ENDPOINT.DELETE}?key=${config.apikey}`;

  const response = await axios<DeleteUserRes>(signUpEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      idToken,
    },
  });

  return response.data;
};
