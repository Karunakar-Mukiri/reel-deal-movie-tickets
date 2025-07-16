import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Movie } from '@/lib/movieData';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onSelectMovie }: MovieCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-cinema hover:-translate-y-1">
      <div className="relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-cinema-dark/80 backdrop-blur-sm text-cinema-gold border-cinema-gold/20">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {movie.rating}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-cinema-dark/80 backdrop-blur-sm border-primary/20">
            ₹{movie.price}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-cinema-gold transition-colors duration-300 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {movie.plot}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs border-muted">
              {genre}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {movie.duration}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {movie.theaters.length} theaters
          </div>
        </div>
        
        <Button 
          onClick={() => onSelectMovie(movie)}
          className="w-full bg-gradient-gold hover:shadow-gold transition-all duration-300 text-cinema-dark font-semibold"
        >
          Book Tickets
        </Button>
      </CardContent>
    </Card>
  );
};