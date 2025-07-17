import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalMovies: number;
  recentBookings: Array<{
    id: number;
    movie: string;
    user: string;
    amount: number;
    date: string;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const moviePopularityData = [
  { name: 'Inception', bookings: 342, revenue: 15390 },
  { name: 'The Dark Knight', bookings: 298, revenue: 17880 },
  { name: 'Interstellar', bookings: 256, revenue: 14080 },
  { name: 'Dune', bookings: 189, revenue: 7560 },
  { name: 'Avatar', bookings: 162, revenue: 12150 },
];

const theaterPerformanceData = [
  { name: 'AMC Theater', bookings: 245, revenue: 18375 },
  { name: 'Cinemark', bookings: 198, revenue: 14850 },
  { name: 'Regal Cinema', bookings: 176, revenue: 13200 },
  { name: 'Galaxy Cinema', bookings: 134, revenue: 10050 },
  { name: 'Landmark Theater', bookings: 112, revenue: 8400 },
];

const genreDistribution = [
  { name: 'Action', value: 35, color: 'hsl(45, 85%, 65%)' },
  { name: 'Drama', value: 25, color: 'hsl(355, 75%, 45%)' },
  { name: 'Comedy', value: 20, color: 'hsl(30, 65%, 55%)' },
  { name: 'Sci-Fi', value: 15, color: 'hsl(220, 70%, 60%)' },
  { name: 'Horror', value: 5, color: 'hsl(0, 84%, 60%)' },
];

export const AnalyticsDashboard = ({ data }: AnalyticsDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Trend
          </CardTitle>
          <CardDescription>Monthly revenue over the past 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(20, 25%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(30, 35%, 70%)" />
              <YAxis stroke="hsl(30, 35%, 70%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(20, 25%, 12%)', 
                  border: '1px solid hsl(20, 25%, 18%)',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(45, 85%, 65%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(45, 85%, 65%)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Movie Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>Top Movies by Bookings</CardTitle>
            <CardDescription>Most popular movies this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moviePopularityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(20, 25%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(30, 35%, 70%)" />
                <YAxis stroke="hsl(30, 35%, 70%)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(20, 25%, 12%)', 
                    border: '1px solid hsl(20, 25%, 18%)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="bookings" fill="hsl(355, 75%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Theater Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Theater Performance</CardTitle>
            <CardDescription>Revenue by theater location</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={theaterPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(20, 25%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(30, 35%, 70%)" />
                <YAxis stroke="hsl(30, 35%, 70%)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(20, 25%, 12%)', 
                    border: '1px solid hsl(20, 25%, 18%)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="revenue" fill="hsl(30, 65%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Genre Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
            <CardDescription>Popular movie genres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {genreDistribution.map((genre) => (
                <div key={genre.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: genre.color }}
                    />
                    <span className="text-sm">{genre.name}</span>
                  </div>
                  <span className="text-sm font-medium">{genre.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Important metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-gold rounded-lg">
                    <DollarSign className="h-5 w-5 text-luxury-charcoal" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Ticket Price</p>
                    <p className="text-xl font-bold">$24.50</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-burgundy rounded-lg">
                    <Users className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Retention</p>
                    <p className="text-xl font-bold">78%</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-luxury-bronze rounded-lg">
                    <Calendar className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Bookings/Day</p>
                    <p className="text-xl font-bold">42</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-card border border-border rounded-lg">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-xl font-bold text-green-500">+15%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Recent performance highlights and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-gold rounded-lg">
              <p className="text-2xl font-bold text-luxury-charcoal">24</p>
              <p className="text-sm text-luxury-charcoal/70">Peak Hour (7-9 PM)</p>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold">68%</p>
              <p className="text-sm text-muted-foreground">Weekend Occupancy</p>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold">4.2</p>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
            <div className="text-center p-4 bg-gradient-burgundy rounded-lg">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-foreground/70">New Users This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};