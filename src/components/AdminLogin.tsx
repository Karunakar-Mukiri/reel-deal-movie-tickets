import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onAdminLogin: () => void;
  onBack: () => void;
}

export const AdminLogin = ({ onAdminLogin, onBack }: AdminLoginProps) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      onAdminLogin();
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-burgundy rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter admin credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <div className="space-y-2">
              <Button type="submit" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Login as Admin
              </Button>
              <Button type="button" variant="outline" onClick={onBack} className="w-full">
                Back to Movies
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};