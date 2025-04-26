import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword as createUser, 
  signInWithEmailAndPassword as signInWithEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User
} from 'firebase/auth';
import { toast } from "@/components/ui/use-toast";

// Your web app's Firebase configuration
// Replace these with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCR48ISbG6IsV8nlNuuIPxa3QXWAZiCT1M",
  authDomain: "ecoai-29a51.firebaseapp.com",
  projectId: "ecoai-29a51",
  storageBucket: "ecoai-29a51.firebasestorage.app",
  messagingSenderId: "1026212539639",
  appId: "1:1026212539639:web:241344c24c35242626b7f2",
  measurementId: "G-CXJGGKJ4Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign up with email/password
export const createUserWithEmailAndPassword = async (
  email: string, 
  password: string, 
  username: string
): Promise<User | null> => {
  try {
    const userCredential = await createUser(auth, email, password);
    // Add the username to the user profile
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      toast({
        title: "Account created!",
        description: "Welcome to EcoScore! Your account has been created successfully.",
      });
      return userCredential.user;
    }
    return null;
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast({
      variant: "destructive",
      title: "Error creating account",
      description: errorMessage,
    });
    throw error;
  }
};

// Sign in with email/password
export const signInWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmail(auth, email, password);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    return userCredential.user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast({
      variant: "destructive",
      title: "Login failed",
      description: errorMessage,
    });
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    const result = await signInWithPopup(auth, googleProvider);
    toast({
      title: "Google sign-in successful",
      description: "You have been logged in with Google.",
    });
    return result.user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast({
      variant: "destructive",
      title: "Google sign-in failed",
      description: errorMessage,
    });
    throw error;
  }
};  

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been logged out successfully.",
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast({
      variant: "destructive",
      title: "Sign-out failed",
      description: errorMessage,
    });
  }
};

export { auth };
