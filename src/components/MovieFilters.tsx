import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { genres, theaters, priceRanges } from '@/lib/movieData';

interface MovieFiltersProps {
  searchTerm: string;
  selectedGenre: string;
  selectedTheater: string;
  selectedPriceRange: string;
  onSearchChange: (search: string) => void;
  onGenreChange: (genre: string) => void;
  onTheaterChange: (theater: string) => void;
  onPriceRangeChange: (priceRange: string) => void;
}

export const MovieFilters = ({
  searchTerm,
  selectedGenre,
  selectedTheater,
  selectedPriceRange,
  onSearchChange,
  onGenreChange,
  onTheaterChange,
  onPriceRangeChange
}: MovieFiltersProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Filter className="w-5 h-5 text-cinema-gold" />
          Filter Movies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-secondary border-border focus:border-cinema-gold"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Genre</label>
            <Select value={selectedGenre} onValueChange={onGenreChange}>
              <SelectTrigger className="bg-secondary border-border focus:border-cinema-gold">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Theater</label>
            <Select value={selectedTheater} onValueChange={onTheaterChange}>
              <SelectTrigger className="bg-secondary border-border focus:border-cinema-gold">
                <SelectValue placeholder="Select theater" />
              </SelectTrigger>
              <SelectContent>
                {theaters.map((theater) => (
                  <SelectItem key={theater} value={theater}>
                    {theater}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="bg-secondary border-border focus:border-cinema-gold">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};