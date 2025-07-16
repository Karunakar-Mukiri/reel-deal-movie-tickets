export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  duration: string;
  language: string;
  plot: string;
  poster: string;
  price: number;
  showTimes: string[];
  theaters: string[];
  isRunning: boolean;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight Returns",
    genre: ["Action", "Thriller", "Crime"],
    rating: 9.1,
    duration: "2h 45m",
    language: "English",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "/src/assets/movie1.jpg",
    price: 350,
    showTimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
    theaters: ["PVR Forum Mall", "INOX R-City", "Cinepolis VIP"],
    isRunning: true
  },
  {
    id: "2",
    title: "Galactic Odyssey",
    genre: ["Sci-Fi", "Adventure", "Action"],
    rating: 8.7,
    duration: "2h 20m",
    language: "English",
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival in a distant galaxy filled with wonders and dangers.",
    poster: "/src/assets/movie2.jpg",
    price: 400,
    showTimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
    theaters: ["PVR Phoenix", "INOX Palladium", "Cinepolis DLF"],
    isRunning: true
  },
  {
    id: "3",
    title: "Love Actually",
    genre: ["Romance", "Comedy", "Drama"],
    rating: 7.8,
    duration: "2h 15m",
    language: "English",
    plot: "Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London.",
    poster: "/src/assets/movie3.jpg",
    price: 280,
    showTimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:00 PM"],
    theaters: ["PVR Select City", "INOX Insignia", "Carnival Cinemas"],
    isRunning: true
  },
  {
    id: "4",
    title: "Midnight Terror",
    genre: ["Horror", "Thriller", "Mystery"],
    rating: 8.2,
    duration: "1h 55m",
    language: "English",
    plot: "A family discovers that dark spirits have invaded their home after their son inexplicably falls into a coma. They must face their deepest fears to save him.",
    poster: "/src/assets/movie4.jpg",
    price: 320,
    showTimes: ["7:00 PM", "9:45 PM", "12:15 AM"],
    theaters: ["PVR Forum Mall", "INOX R-City", "Cinepolis VIP"],
    isRunning: true
  },
  {
    id: "5",
    title: "Mumbai Chronicles",
    genre: ["Drama", "Crime", "Thriller"],
    rating: 8.9,
    duration: "2h 35m",
    language: "Hindi",
    plot: "The story of Mumbai's transformation through the eyes of common people, showcasing the city's spirit and resilience against all odds.",
    poster: "/src/assets/movie1.jpg",
    price: 250,
    showTimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
    theaters: ["PVR Lower Parel", "INOX Nariman Point", "Regal Cinema"],
    isRunning: true
  },
  {
    id: "6",
    title: "Bollywood Masala",
    genre: ["Comedy", "Musical", "Romance"],
    rating: 7.5,
    duration: "2h 30m",
    language: "Hindi",
    plot: "A colorful musical comedy that celebrates love, family, and the magic of Bollywood with spectacular dance sequences and melodious songs.",
    poster: "/src/assets/movie3.jpg",
    price: 300,
    showTimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
    theaters: ["Maratha Mandir", "Gaiety Galaxy", "PVR Phoenix"],
    isRunning: true
  }
];

export const genres = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller"
];

export const theaters = [
  "All Theaters",
  "PVR Forum Mall",
  "INOX R-City",
  "Cinepolis VIP",
  "PVR Phoenix",
  "INOX Palladium",
  "Cinepolis DLF",
  "PVR Select City",
  "INOX Insignia",
  "Carnival Cinemas",
  "PVR Lower Parel",
  "INOX Nariman Point",
  "Regal Cinema",
  "Maratha Mandir",
  "Gaiety Galaxy"
];

export const priceRanges = [
  { label: "All Prices", min: 0, max: 1000 },
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 - ₹400", min: 300, max: 400 },
  { label: "Above ₹400", min: 400, max: 1000 }
];