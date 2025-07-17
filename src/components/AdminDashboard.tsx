import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  BarChart3, 
  DollarSign, 
  Users, 
  Film,
  Calendar,
  TrendingUp,
  Settings
} from 'lucide-react';
import { AddMovieForm } from './AddMovieForm';
import { AnalyticsDashboard } from './AnalyticsDashboard';

type AdminView = 'overview' | 'add-movie' | 'analytics' | 'movies';

interface AdminDashboardProps {
  onBack: () => void;
}

// Sample analytics data
const sampleData = {
  totalBookings: 1247,
  totalRevenue: 89650,
  totalUsers: 892,
  totalMovies: 24,
  recentBookings: [
    { id: 1, movie: 'Inception', user: 'john@example.com', amount: 45, date: '2024-01-15' },
    { id: 2, movie: 'The Dark Knight', user: 'jane@example.com', amount: 60, date: '2024-01-14' },
    { id: 3, movie: 'Interstellar', user: 'bob@example.com', amount: 55, date: '2024-01-14' },
    { id: 4, movie: 'Dune', user: 'alice@example.com', amount: 40, date: '2024-01-13' },
    { id: 5, movie: 'Avatar', user: 'charlie@example.com', amount: 75, date: '2024-01-13' },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 21000 },
    { month: 'May', revenue: 22500 },
  ]
};

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<AdminView>('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-gold border-luxury-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-luxury-charcoal">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-luxury-charcoal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-luxury-charcoal">
              ${sampleData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-luxury-charcoal/70">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleData.totalMovies}</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Bookings
          </CardTitle>
          <CardDescription>Latest ticket bookings from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleData.recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{booking.movie}</p>
                  <p className="text-sm text-muted-foreground">{booking.user}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">${booking.amount}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <div className="bg-luxury-charcoal-light border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your cinema, movies, and view analytics
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Movies
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Button 
            variant={currentView === 'overview' ? 'default' : 'outline'}
            onClick={() => setCurrentView('overview')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Overview
          </Button>
          <Button 
            variant={currentView === 'add-movie' ? 'default' : 'outline'}
            onClick={() => setCurrentView('add-movie')}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Movie
          </Button>
          <Button 
            variant={currentView === 'analytics' ? 'default' : 'outline'}
            onClick={() => setCurrentView('analytics')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Analytics
          </Button>
        </div>

        {/* Content */}
        {currentView === 'overview' && renderOverview()}
        {currentView === 'add-movie' && <AddMovieForm />}
        {currentView === 'analytics' && <AnalyticsDashboard data={sampleData} />}
      </div>
    </div>
  );
};