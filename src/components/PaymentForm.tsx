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
    upiId: '',
    selectedBank: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Validation functions
  const validateCardNumber = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (!cleaned) return 'Card number is required';
    if (cleaned.length < 13 || cleaned.length > 19) return 'Card number must be 13-19 digits';
    if (!/^\d+$/.test(cleaned)) return 'Card number must contain only digits';
    return '';
  };

  const validateCardholderName = (name: string): string => {
    if (!name.trim()) return 'Cardholder name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name must contain only letters and spaces';
    return '';
  };

  const validateExpiryDate = (expiry: string): string => {
    if (!expiry) return 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Format must be MM/YY';
    
    const [month, year] = expiry.split('/').map(num => parseInt(num));
    if (month < 1 || month > 12) return 'Invalid month';
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    
    return '';
  };

  const validateCVV = (cvv: string): string => {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) return 'CVV must be 3-4 digits';
    return '';
  };

  const validateUPI = (upiId: string): string => {
    if (!upiId) return 'UPI ID is required';
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(upiId)) return 'Invalid UPI ID format';
    return '';
  };

  const validateBank = (bank: string): string => {
    if (!bank) return 'Please select a bank';
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      newErrors.cardNumber = validateCardNumber(formData.cardNumber);
      newErrors.cardholderName = validateCardholderName(formData.cardholderName);
      newErrors.expiryDate = validateExpiryDate(formData.expiryDate);
      newErrors.cvv = validateCVV(formData.cvv);
    } else if (paymentMethod === 'upi') {
      newErrors.upiId = validateUPI(formData.upiId);
    } else if (paymentMethod === 'netbanking') {
      newErrors.selectedBank = validateBank(formData.selectedBank);
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 23) return; // Max length with spaces
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) return;
    }
    
    // Limit CVV to 4 digits
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }
    
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
                    className={`bg-secondary border-border focus:border-cinema-gold ${errors.cardNumber ? 'border-destructive' : ''}`}
                  />
                  {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="cardholderName" className="text-foreground">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className={`bg-secondary border-border focus:border-cinema-gold ${errors.cardholderName ? 'border-destructive' : ''}`}
                  />
                  {errors.cardholderName && <p className="text-sm text-destructive mt-1">{errors.cardholderName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-foreground">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className={`bg-secondary border-border focus:border-cinema-gold ${errors.expiryDate ? 'border-destructive' : ''}`}
                    />
                    {errors.expiryDate && <p className="text-sm text-destructive mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className={`bg-secondary border-border focus:border-cinema-gold ${errors.cvv ? 'border-destructive' : ''}`}
                    />
                    {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
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
                  className={`bg-secondary border-border focus:border-cinema-gold ${errors.upiId ? 'border-destructive' : ''}`}
                />
                {errors.upiId && <p className="text-sm text-destructive mt-1">{errors.upiId}</p>}
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div>
                <Label className="text-foreground">Select Bank</Label>
                <Select value={formData.selectedBank} onValueChange={(value) => handleInputChange('selectedBank', value)}>
                  <SelectTrigger className={`bg-secondary border-border focus:border-cinema-gold ${errors.selectedBank ? 'border-destructive' : ''}`}>
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
                {errors.selectedBank && <p className="text-sm text-destructive mt-1">{errors.selectedBank}</p>}
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