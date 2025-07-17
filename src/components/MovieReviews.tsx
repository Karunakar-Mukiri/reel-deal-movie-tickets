import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, StarIcon, User, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface MovieReviewsProps {
  movieId: string;
  movieTitle: string;
  userEmail?: string;
  isLoggedIn: boolean;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    user: 'john@example.com',
    rating: 5,
    comment: 'Absolutely amazing movie! The cinematography and storytelling were exceptional.',
    date: '2024-01-15'
  },
  {
    id: '2', 
    user: 'jane@example.com',
    rating: 4,
    comment: 'Great movie with stunning visuals. Would definitely recommend!',
    date: '2024-01-14'
  },
  {
    id: '3',
    user: 'bob@example.com', 
    rating: 5,
    comment: 'One of the best films I have seen this year. Mind-blowing experience!',
    date: '2024-01-13'
  }
];

export const MovieReviews = ({ movieId, movieTitle, userEmail, isLoggedIn }: MovieReviewsProps) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const averageRating = reviews.length > 0 ? 
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  const handleSubmitReview = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review.",
        variant: "destructive"
      });
      return;
    }

    if (newRating === 0 || !newReview.trim()) {
      toast({
        title: "Invalid Review",
        description: "Please provide both a rating and comment.",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      user: userEmail || 'Anonymous',
      rating: newRating,
      comment: newReview.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [review, ...prev]);
    setNewReview('');
    setNewRating(0);

    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
    });
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm', interactive: boolean = false) => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} cursor-${interactive ? 'pointer' : 'default'} ${
              star <= (interactive ? (hoveredStar || newRating) : rating)
                ? 'fill-luxury-gold text-luxury-gold'
                : 'text-muted-foreground'
            }`}
            onClick={interactive ? () => setNewRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5" />
            Reviews for {movieTitle}
          </CardTitle>
          <CardDescription>
            See what other viewers think about this movie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mb-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-muted-foreground">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          {isLoggedIn && (
            <div className="border border-border rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-3">Write a Review</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  {renderStars(newRating, 'lg', true)}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Comment</label>
                  <Textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your thoughts about this movie..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleSubmitReview} className="w-full">
                  Submit Review
                </Button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">
                      {review.user.split('@')[0]}
                    </span>
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <p className="text-sm text-foreground">{review.comment}</p>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reviews yet. Be the first to review this movie!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};