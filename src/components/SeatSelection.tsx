import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Monitor } from 'lucide-react';
import { Movie } from '@/lib/movieData';

interface SeatSelectionProps {
  movie: Movie;
  onBack: () => void;
  onContinue: (selectedSeats: string[], totalPrice: number) => void;
}

interface SeatType {
  type: 'available' | 'selected' | 'occupied';
  id: string;
  row: string;
  number: number;
}

export const SeatSelection = ({ movie, onBack, onContinue }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Generate realistic seat layout
  const generateSeats = (): SeatType[][] => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 12;
    
    return rows.map(row => {
      const seats: SeatType[] = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
        seats.push({
          type: isOccupied ? 'occupied' : selectedSeats.includes(seatId) ? 'selected' : 'available',
          id: seatId,
          row,
          number: i
        });
      }
      return seats;
    });
  };

  const [seatLayout] = useState(generateSeats());

  const handleSeatClick = (seatId: string) => {
    const seat = seatLayout.flat().find(s => s.id === seatId);
    if (seat?.type === 'occupied') return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const getSeatClass = (seat: SeatType) => {
    const isSelected = selectedSeats.includes(seat.id);
    const baseClass = "w-8 h-8 rounded-t-lg border-2 cursor-pointer transition-all duration-200 text-xs flex items-center justify-center font-medium";
    
    if (seat.type === 'occupied') {
      return `${baseClass} bg-seat-occupied border-seat-occupied cursor-not-allowed text-white`;
    } else if (isSelected) {
      return `${baseClass} bg-seat-selected border-seat-selected text-cinema-dark hover:shadow-gold`;
    } else {
      return `${baseClass} bg-seat-available border-seat-available text-foreground hover:bg-cinema-gold hover:border-cinema-gold hover:text-cinema-dark`;
    }
  };

  const totalPrice = selectedSeats.length * movie.price;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-border hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{movie.title}</h2>
          <p className="text-muted-foreground">Select your seats</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          {/* Screen */}
          <div className="mb-8">
            <div className="relative mx-auto w-3/4 h-4 bg-gradient-gold rounded-t-full flex items-center justify-center mb-2">
              <Monitor className="w-5 h-5 text-cinema-dark" />
            </div>
            <p className="text-center text-sm text-muted-foreground">SCREEN</p>
          </div>

          {/* Seat Map */}
          <div className="space-y-2 max-w-4xl mx-auto">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-center gap-1">
                <div className="w-8 text-center text-sm font-medium text-muted-foreground">
                  {row[0].row}
                </div>
                <div className="flex gap-1">
                  {row.slice(0, 3).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={getSeatClass(seat)}
                      disabled={seat.type === 'occupied'}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
                <div className="w-8" /> {/* Aisle */}
                <div className="flex gap-1">
                  {row.slice(3, 9).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={getSeatClass(seat)}
                      disabled={seat.type === 'occupied'}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
                <div className="w-8" /> {/* Aisle */}
                <div className="flex gap-1">
                  {row.slice(9).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={getSeatClass(seat)}
                      disabled={seat.type === 'occupied'}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-available border-2 border-seat-available rounded-t-lg"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-selected border-2 border-seat-selected rounded-t-lg"></div>
              <span className="text-muted-foreground">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-occupied border-2 border-seat-occupied rounded-t-lg"></div>
              <span className="text-muted-foreground">Occupied</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Selected Seats</h3>
                <div className="flex gap-2 mt-2">
                  {selectedSeats.map(seatId => (
                    <Badge key={seatId} variant="outline" className="border-cinema-gold text-cinema-gold">
                      {seatId}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cinema-gold">₹{totalPrice}</p>
                <p className="text-sm text-muted-foreground">{selectedSeats.length} seat(s)</p>
              </div>
            </div>
            <Button 
              onClick={() => onContinue(selectedSeats, totalPrice)}
              className="w-full mt-4 bg-gradient-gold hover:shadow-gold text-cinema-dark font-semibold"
            >
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};