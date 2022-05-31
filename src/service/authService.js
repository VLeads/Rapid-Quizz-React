import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase-config";

export const loginService = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signupService = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutService = async () => {
  await signOut(auth);
};
