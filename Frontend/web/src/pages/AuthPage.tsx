import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, ArrowRight, User, UserPlus } from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from "../lib/firebase";
import { Leaf } from "lucide-react";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupUsername, setSignupUsername] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await signInWithEmailAndPassword(loginEmail, loginPassword);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await createUserWithEmailAndPassword(signupEmail, signupPassword, signupUsername);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <div className="container flex flex-col items-center justify-center flex-1 px-4 pt-28 pb-12"> {/* Increased top padding */}
        <div className="w-full max-w-md space-y-6 animate-fade-in text-foreground"> {/* Added text-foreground */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 rounded-full bg-secondary">
              <Leaf className="h-8 w-8 text-eco-purple" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-eco-purple to-eco-blue text-white bg-clip-text">
              Welcome to EcoAi
            </h1>
            <p className="text-muted-foreground">
              Join our community and start tracking your eco-friendly actions
            </p>
          </div>

          <Card className="w-full border border-border/40 shadow-lg">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle className="text-foreground">Login to your account</CardTitle> {/* Added text-foreground */}
                    <CardDescription className="text-muted-foreground"> {/* Explicit text color */}
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-foreground">Email</Label> {/* Added text-foreground */}
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="text-foreground" // Added text color
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password" className="text-foreground">Password</Label> {/* Added text-foreground */}
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground" /* Adjusted text colors */
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 mr-1" />
                          )}
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          className="text-foreground" // Added text color
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-eco-purple to-eco-blue hover:from-eco-blue hover:to-eco-purple text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full border-border/60 text-foreground" /* Added text color */
                      disabled={isLoading}
                    >
                      <svg 
                        className="mr-2 h-4 w-4" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Sign in with Google
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardHeader>
                    <CardTitle className="text-foreground">Create an account</CardTitle> {/* Added text-foreground */}
                    <CardDescription className="text-muted-foreground"> {/* Explicit text color */}
                      Join our eco-friendly community today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username" className="text-foreground">Username</Label> {/* Added text-foreground */}
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="ecowarrior"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        required
                        className="text-foreground" // Added text color
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label> {/* Added text-foreground */}
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        className="text-foreground" // Added text color
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signup-password" className="text-foreground">Password</Label> {/* Added text-foreground */}
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground" /* Adjusted text colors */
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 mr-1" />
                          )}
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                          className="text-foreground" // Added text color
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password should be at least 6 characters long
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-eco-purple to-eco-blue hover:from-eco-blue hover:to-eco-purple text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full border-border/60 text-foreground" /* Added text color */
                      disabled={isLoading}
                    >
                      <svg 
                        className="mr-2 h-4 w-4" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Sign up with Google
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;