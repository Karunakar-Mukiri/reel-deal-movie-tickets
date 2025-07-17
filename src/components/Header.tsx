import { Film, User, LogIn, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isLoggedIn: boolean;
  userEmail?: string;
  onLogin: () => void;
  onLogout: () => void;
  onAdminAccess?: () => void;
}

export const Header = ({ isLoggedIn, userEmail, onLogin, onLogout, onAdminAccess }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-luxury-gold" />
          <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            LuxCinema
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-luxury-gold" />
                <span className="text-foreground">{userEmail}</span>
              </div>
              {onAdminAccess && (
                <Button 
                  variant="outline" 
                  onClick={onAdminAccess}
                  className="border-luxury-burgundy text-luxury-burgundy hover:bg-luxury-burgundy hover:text-foreground"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => onLogin()}
              className="bg-gradient-gold hover:shadow-gold text-luxury-charcoal font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};