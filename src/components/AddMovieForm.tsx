import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { genres, theaters } from '@/lib/movieData';
import { Plus, X, Upload } from 'lucide-react';

export const AddMovieForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    plot: '',
    duration: '',
    language: '',
    rating: '',
    price: '',
    poster: '',
    selectedGenres: [] as string[],
    selectedTheaters: [] as string[],
    showTimes: [] as string[]
  });
  const [newShowTime, setNewShowTime] = useState('');

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(genre)
        ? prev.selectedGenres.filter(g => g !== genre)
        : [...prev.selectedGenres, genre]
    }));
  };

  const handleTheaterToggle = (theater: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTheaters: prev.selectedTheaters.includes(theater)
        ? prev.selectedTheaters.filter(t => t !== theater)
        : [...prev.selectedTheaters, theater]
    }));
  };

  const addShowTime = () => {
    if (newShowTime && !formData.showTimes.includes(newShowTime)) {
      setFormData(prev => ({
        ...prev,
        showTimes: [...prev.showTimes, newShowTime]
      }));
      setNewShowTime('');
    }
  };

  const removeShowTime = (time: string) => {
    setFormData(prev => ({
      ...prev,
      showTimes: prev.showTimes.filter(t => t !== time)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.plot || !formData.price || 
        formData.selectedGenres.length === 0 || formData.selectedTheaters.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Movie Added Successfully!",
      description: `${formData.title} has been added to the system.`,
    });

    // Reset form
    setFormData({
      title: '',
      plot: '',
      duration: '',
      language: '',
      rating: '',
      price: '',
      poster: '',
      selectedGenres: [],
      selectedTheaters: [],
      showTimes: []
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Movie
        </CardTitle>
        <CardDescription>
          Fill in the details to add a new movie to your cinema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Movie Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter movie title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 2h 30min"
                />
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  placeholder="e.g., English"
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                  placeholder="e.g., 8.5"
                />
              </div>

              <div>
                <Label htmlFor="price">Ticket Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g., 15.99"
                  required
                />
              </div>
            </div>

            {/* Poster and Plot */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="poster">Poster URL</Label>
                <Input
                  id="poster"
                  value={formData.poster}
                  onChange={(e) => setFormData(prev => ({ ...prev, poster: e.target.value }))}
                  placeholder="Enter poster image URL"
                />
              </div>

              <div>
                <Label htmlFor="plot">Plot Description *</Label>
                <Textarea
                  id="plot"
                  value={formData.plot}
                  onChange={(e) => setFormData(prev => ({ ...prev, plot: e.target.value }))}
                  placeholder="Enter movie plot description"
                  rows={8}
                  required
                />
              </div>
            </div>
          </div>

          {/* Genres */}
          <div>
            <Label>Genres *</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.filter(g => g !== 'All').map((genre) => (
                <Badge
                  key={genre}
                  variant={formData.selectedGenres.includes(genre) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Theaters */}
          <div>
            <Label>Available Theaters *</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {theaters.filter(t => t !== 'All Theaters').map((theater) => (
                <Badge
                  key={theater}
                  variant={formData.selectedTheaters.includes(theater) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTheaterToggle(theater)}
                >
                  {theater}
                </Badge>
              ))}
            </div>
          </div>

          {/* Show Times */}
          <div>
            <Label>Show Times</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="time"
                value={newShowTime}
                onChange={(e) => setNewShowTime(e.target.value)}
                placeholder="Add show time"
              />
              <Button type="button" onClick={addShowTime} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.showTimes.map((time) => (
                <Badge key={time} variant="secondary" className="flex items-center gap-1">
                  {time}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeShowTime(time)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Movie
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};