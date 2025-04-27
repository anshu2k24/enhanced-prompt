import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import UserPage from "./pages/UserPage";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import AuthPage from "./pages/Authpage";
import LearnMore from "./pages/LearnMore";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/Learn More" element={<LearnMore />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route
              path="/user"
              element={currentUser ? <UserPage /> : <Navigate to="/logsign" />}
            />
            <Route path="/logsign" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;