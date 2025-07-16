import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { MovieFilters } from '@/components/MovieFilters';
import { MovieCard } from '@/components/MovieCard';
import { SeatSelection } from '@/components/SeatSelection';
import { PaymentForm } from '@/components/PaymentForm';
import { TicketDisplay } from '@/components/TicketDisplay';
import { movies, priceRanges, Movie } from '@/lib/movieData';
import { useToast } from '@/hooks/use-toast';

type AppState = 'movies' | 'seats' | 'payment' | 'ticket';

interface BookingData {
  movie: Movie;
  selectedSeats: string[];
  totalPrice: number;
  paymentDetails?: any;
}

const Index = () => {
  const { toast } = useToast();
  const [appState, setAppState] = useState<AppState>('movies');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedTheater, setSelectedTheater] = useState('All Theaters');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  
  // Booking data
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  // Filter movies based on criteria
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.plot.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
      
      const matchesTheater = selectedTheater === 'All Theaters' || 
                            movie.theaters.includes(selectedTheater);
      
      const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
      const matchesPrice = !priceRange || priceRange.label === 'All Prices' ||
                          (movie.price >= priceRange.min && movie.price <= priceRange.max);
      
      return matchesSearch && matchesGenre && matchesTheater && matchesPrice;
    });
  }, [searchTerm, selectedGenre, selectedTheater, selectedPriceRange]);

  const handleLogin = () => {
    // TODO: Implement Firebase authentication
    setIsLoggedIn(true);
    setUserEmail('user@gmail.com');
    toast({
      title: "Login Successful",
      description: "Welcome! You can now book movie tickets.",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setAppState('movies');
    setBookingData(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSelectMovie = (movie: Movie) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      });
      return;
    }
    setBookingData({ movie, selectedSeats: [], totalPrice: 0 });
    setAppState('seats');
  };

  const handleSeatSelection = (selectedSeats: string[], totalPrice: number) => {
    if (bookingData) {
      setBookingData({ ...bookingData, selectedSeats, totalPrice });
      setAppState('payment');
    }
  };

  const handlePaymentComplete = (paymentDetails: any) => {
    if (bookingData) {
      setBookingData({ ...bookingData, paymentDetails });
      setAppState('ticket');
      toast({
        title: "Booking Confirmed!",
        description: "Your tickets have been booked successfully.",
      });
    }
  };

  const handleTicketDownload = () => {
    toast({
      title: "Ticket Downloaded",
      description: "Your ticket has been downloaded successfully.",
    });
  };

  const handleShowPopularMovies = () => {
    setAppState('movies');
    setBookingData(null);
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedTheater('All Theaters');
    setSelectedPriceRange('All Prices');
  };

  const handleBackToMovies = () => {
    setAppState('movies');
    setBookingData(null);
  };

  const handleBackToSeats = () => {
    setAppState('seats');
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Header 
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {appState === 'movies' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Book Your <span className="bg-gradient-gold bg-clip-text text-transparent">Movie Tickets</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the latest movies and book your seats instantly
              </p>
            </div>
            
            <MovieFilters
              searchTerm={searchTerm}
              selectedGenre={selectedGenre}
              selectedTheater={selectedTheater}
              selectedPriceRange={selectedPriceRange}
              onSearchChange={setSearchTerm}
              onGenreChange={setSelectedGenre}
              onTheaterChange={setSelectedTheater}
              onPriceRangeChange={setSelectedPriceRange}
            />
            
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No movies found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelectMovie={handleSelectMovie}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {appState === 'seats' && bookingData && (
          <SeatSelection
            movie={bookingData.movie}
            onBack={handleBackToMovies}
            onContinue={handleSeatSelection}
          />
        )}

        {appState === 'payment' && bookingData && (
          <PaymentForm
            movie={bookingData.movie}
            selectedSeats={bookingData.selectedSeats}
            totalPrice={bookingData.totalPrice}
            onBack={handleBackToSeats}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {appState === 'ticket' && bookingData && bookingData.paymentDetails && (
          <TicketDisplay
            movie={bookingData.movie}
            selectedSeats={bookingData.selectedSeats}
            totalPrice={bookingData.totalPrice}
            paymentDetails={bookingData.paymentDetails}
            onDownload={handleTicketDownload}
            onShowPopularMovies={handleShowPopularMovies}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
