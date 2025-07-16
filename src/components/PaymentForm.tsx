import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, Smartphone, Building } from 'lucide-react';
import { Movie } from '@/lib/movieData';

interface PaymentFormProps {
  movie: Movie;
  selectedSeats: string[];
  totalPrice: number;
  onBack: () => void;
  onPaymentComplete: (paymentDetails: any) => void;
}

export const PaymentForm = ({ movie, selectedSeats, totalPrice, onBack, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentDetails = {
        transactionId: `TXN${Date.now()}`,
        amount: totalPrice,
        method: paymentMethod,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      onPaymentComplete(paymentDetails);
      setIsProcessing(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI Payment', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Building }
  ];

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
          <h2 className="text-2xl font-bold text-foreground">Payment</h2>
          <p className="text-muted-foreground">Complete your booking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">{movie.title}</h3>
              <p className="text-sm text-muted-foreground">{movie.duration} • {movie.language}</p>
            </div>
            
            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-foreground mb-2">Selected Seats</h4>
              <div className="flex flex-wrap gap-1">
                {selectedSeats.map(seat => (
                  <span key={seat} className="px-2 py-1 bg-cinema-gold/20 text-cinema-gold rounded text-sm">
                    {seat}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tickets ({selectedSeats.length})</span>
                <span className="text-foreground">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span className="text-foreground">₹25</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold text-cinema-gold border-t border-border pt-2 mt-2">
                <span>Total Amount</span>
                <span>₹{totalPrice + 25}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <Label className="text-foreground mb-3 block">Select Payment Method</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentMethods.map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        paymentMethod === method.id
                          ? 'border-cinema-gold bg-cinema-gold/10'
                          : 'border-border hover:border-cinema-gold/50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-cinema-gold' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${paymentMethod === method.id ? 'text-cinema-gold' : 'text-foreground'}`}>
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="bg-secondary border-border focus:border-cinema-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="cardholderName" className="text-foreground">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className="bg-secondary border-border focus:border-cinema-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-foreground">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="bg-secondary border-border focus:border-cinema-gold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="bg-secondary border-border focus:border-cinema-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
              <div>
                <Label htmlFor="upiId" className="text-foreground">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  value={formData.upiId}
                  onChange={(e) => handleInputChange('upiId', e.target.value)}
                  className="bg-secondary border-border focus:border-cinema-gold"
                />
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div>
                <Label className="text-foreground">Select Bank</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border focus:border-cinema-gold">
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                    <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-gold hover:shadow-gold text-cinema-dark font-semibold text-lg py-3"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₹${totalPrice + 25}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your payment information is secure and encrypted. By proceeding, you agree to our terms and conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};