
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();

  const handleLogin = (role: 'user' | 'scout') => {
    login(role);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass bg-white/90 backdrop-blur-md border border-gray-200/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Testing Login
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Choose your role to test the dashboard functionality
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <Button
            onClick={() => handleLogin('user')}
            className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-medium"
          >
            <User className="h-6 w-6 mr-3" />
            Login as User
          </Button>
          
          <Button
            onClick={() => handleLogin('scout')}
            className="w-full h-16 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-lg font-medium"
          >
            <Shield className="h-6 w-6 mr-3" />
            Login as Location Scout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
