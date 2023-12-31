import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase.config';

export async function createAuthUserWithEmailAndPassword(
  email: string,
  password: string
) {
  if (!email || !password) return null;
  const newUser = await createUserWithEmailAndPassword(auth, email, password);
  return newUser;
}

export async function signInAuthUserWithEmailAndPassword(
  email: string,
  password: string
) {
  if (!email || !password) return null;
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function signOutUser() {
  const signOutUserUID = auth.currentUser?.uid;
  await signOut(auth);
  return signOutUserUID;
}

// Mostly for test purposes
export async function deleteAuthUser(email: string, password: string) {
  await signInAuthUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  if (user) {
    await deleteUser(user);
  }
}
