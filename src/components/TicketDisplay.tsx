import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Check, Star, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Movie } from '@/lib/movieData';

interface TicketDisplayProps {
  movie: Movie;
  selectedSeats: string[];
  totalPrice: number;
  paymentDetails: any;
  onDownload: () => void;
  onShowPopularMovies: () => void;
}

export const TicketDisplay = ({ 
  movie, 
  selectedSeats, 
  totalPrice, 
  paymentDetails, 
  onDownload, 
  onShowPopularMovies 
}: TicketDisplayProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloaded(true);
    onDownload();
    
    // Generate and download ticket
    const ticketData = {
      movie: movie.title,
      seats: selectedSeats.join(', '),
      amount: totalPrice + 25,
      transactionId: paymentDetails.transactionId,
      date: new Date().toLocaleDateString(),
      time: '7:00 PM',
      theater: 'PVR Forum Mall'
    };
    
    const ticketText = `
CINEMA BOOKING TICKET
=====================
Movie: ${ticketData.movie}
Date: ${ticketData.date}
Time: ${ticketData.time}
Theater: ${ticketData.theater}
Seats: ${ticketData.seats}
Amount: ₹${ticketData.amount}
Transaction ID: ${ticketData.transactionId}
=====================
Thank you for booking with us!
    `;
    
    const blob = new Blob([ticketText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${ticketData.transactionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-muted-foreground">Your tickets have been booked successfully</p>
        </div>
      </div>

      {/* Digital Ticket */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-cinema-dark to-cinema-darker border-cinema-gold/20 overflow-hidden">
        <div className="relative">
          {/* Ticket Header */}
          <div className="bg-gradient-gold p-6 text-cinema-dark">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{movie.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {movie.rating}
                  </div>
                  <span>{movie.duration}</span>
                  <span>{movie.language}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">₹{totalPrice + 25}</div>
                <div className="text-sm">{selectedSeats.length} Ticket(s)</div>
              </div>
            </div>
          </div>

          {/* Perforated Line */}
          <div className="relative h-4 bg-gradient-gold">
            <div className="absolute inset-0 flex justify-center">
              <div className="flex gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-cinema-dark rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <CardContent className="p-6 space-y-6 text-foreground">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cinema-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Date & Time</div>
                    <div className="font-semibold">{new Date().toLocaleDateString()}</div>
                    <div className="text-sm">7:00 PM</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cinema-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Theater</div>
                    <div className="font-semibold">PVR Forum Mall</div>
                    <div className="text-sm">Screen 3</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-cinema-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Seats</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map(seat => (
                        <Badge key={seat} variant="outline" className="border-cinema-gold text-cinema-gold">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cinema-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Transaction ID</div>
                    <div className="font-mono text-sm">{paymentDetails.transactionId}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-secondary border-2 border-dashed border-cinema-gold/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-xs">QR Code</div>
                  <div className="text-xs">Scan at Theater</div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket Price ({selectedSeats.length})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span>₹25</span>
              </div>
              <div className="flex justify-between font-semibold text-cinema-gold border-t border-border pt-2">
                <span>Total Paid</span>
                <span>₹{totalPrice + 25}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleDownload}
          className="bg-gradient-gold hover:shadow-gold text-cinema-dark font-semibold"
          disabled={isDownloaded}
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloaded ? 'Downloaded' : 'Download Ticket'}
        </Button>
        <Button
          onClick={onShowPopularMovies}
          variant="outline"
          className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-dark"
        >
          View Popular Movies
        </Button>
      </div>

      {/* Important Notes */}
      <Card className="max-w-2xl mx-auto bg-card border-border">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-2">Important Notes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Please arrive 30 minutes before the show time</li>
            <li>• Carry a valid ID proof for verification</li>
            <li>• Outside food and beverages are not allowed</li>
            <li>• Show the QR code or ticket at the theater entrance</li>
            <li>• Cancellation allowed up to 2 hours before show time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};