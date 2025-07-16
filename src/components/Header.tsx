import { Film, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isLoggedIn: boolean;
  userEmail?: string;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header = ({ isLoggedIn, userEmail, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-cinema-gold" />
          <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            CinemaBooking
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-cinema-gold" />
                <span className="text-foreground">{userEmail}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-dark"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={onLogin}
              className="bg-gradient-gold hover:shadow-gold text-cinema-dark font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login with Gmail
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};