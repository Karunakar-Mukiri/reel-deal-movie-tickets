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
  },
  {
    id: "7",
    title: "Mission Impossible: Dead Reckoning",
    genre: ["Action", "Adventure", "Thriller"],
    rating: 8.5,
    duration: "2h 43m",
    language: "English",
    plot: "Ethan Hunt and his IMF team embark on their most dangerous mission yet: to track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands.",
    poster: "/src/assets/movie5.jpg",
    price: 450,
    showTimes: ["10:15 AM", "1:45 PM", "5:15 PM", "8:45 PM"],
    theaters: ["IMAX PVR", "Cinepolis 4DX", "INOX Laser"],
    isRunning: true
  },
  {
    id: "8",
    title: "Superhero Academy",
    genre: ["Animation", "Family", "Adventure"],
    rating: 8.0,
    duration: "1h 45m",
    language: "English",
    plot: "Young aspiring superheroes attend a special academy where they learn to harness their powers and work together to save the world from an ancient evil.",
    poster: "/src/assets/movie6.jpg",
    price: 220,
    showTimes: ["9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM", "7:30 PM"],
    theaters: ["PVR Kids", "Fun Cinemas", "Carnival Kidz"],
    isRunning: true
  },
  {
    id: "9",
    title: "The Last Kingdom: Rise of Warriors",
    genre: ["Drama", "History", "War"],
    rating: 8.8,
    duration: "3h 15m",
    language: "English",
    plot: "In medieval England, a displaced Saxon noble fights to reclaim his ancestral lands from the Vikings while torn between his birth heritage and the people who raised him.",
    poster: "/src/assets/movie7.jpg",
    price: 380,
    showTimes: ["11:00 AM", "3:30 PM", "7:00 PM"],
    theaters: ["PVR Director's Cut", "INOX Insignia", "Cinepolis Premium"],
    isRunning: true
  },
  {
    id: "10",
    title: "Dance Revolution",
    genre: ["Musical", "Romance", "Drama"],
    rating: 7.9,
    duration: "2h 55m",
    language: "Hindi",
    plot: "A passionate dancer from a small town arrives in Mumbai to pursue her dreams, facing challenges and discovering love through the universal language of dance.",
    poster: "/src/assets/movie8.jpg",
    price: 290,
    showTimes: ["12:30 PM", "4:00 PM", "7:30 PM", "11:00 PM"],
    theaters: ["Eros Cinema", "Liberty Cinema", "New Excelsior"],
    isRunning: true
  },
  {
    id: "11",
    title: "Mind Games",
    genre: ["Thriller", "Mystery", "Psychological"],
    rating: 8.3,
    duration: "2h 8m",
    language: "English",
    plot: "A brilliant psychiatrist becomes entangled in a deadly game of cat and mouse with a patient whose reality-bending abilities challenge everything he believes about the human mind.",
    poster: "/src/assets/movie9.jpg",
    price: 350,
    showTimes: ["2:00 PM", "5:30 PM", "8:30 PM", "11:30 PM"],
    theaters: ["PVR Black Box", "INOX Laser", "Cinepolis"],
    isRunning: true
  },
  {
    id: "12",
    title: "Championship Dreams",
    genre: ["Sports", "Drama", "Biography"],
    rating: 8.6,
    duration: "2h 28m",
    language: "Hindi",
    plot: "The inspiring true story of an underdog cricket team from rural India that defies all odds to reach the World Cup finals, proving that dreams have no boundaries.",
    poster: "/src/assets/movie10.jpg",
    price: 310,
    showTimes: ["1:00 PM", "4:30 PM", "8:00 PM"],
    theaters: ["Wankhede Cinema", "Sports Bar Cinema", "PVR Gold"],
    isRunning: true
  },
  {
    id: "13",
    title: "Quantum Paradox",
    genre: ["Sci-Fi", "Thriller", "Mystery"],
    rating: 8.1,
    duration: "2h 22m",
    language: "English",
    plot: "A quantum physicist discovers that her experiments are creating parallel realities, leading to a dangerous chase across multiple dimensions to prevent universal collapse.",
    poster: "/src/assets/movie2.jpg",
    price: 420,
    showTimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
    theaters: ["IMAX Science City", "PVR 4DX", "Cinepolis VIP"],
    isRunning: true
  },
  {
    id: "14",
    title: "Family Reunion",
    genre: ["Comedy", "Family", "Drama"],
    rating: 7.6,
    duration: "2h 5m",
    language: "Hindi",
    plot: "Three estranged siblings reunite for their parents' 50th wedding anniversary, leading to hilarious chaos and heartwarming moments that bring the family back together.",
    poster: "/src/assets/movie3.jpg",
    price: 260,
    showTimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
    theaters: ["Family Cinema", "PVR Playhouse", "Big Cinemas"],
    isRunning: true
  },
  {
    id: "15",
    title: "Shadow Hunter",
    genre: ["Action", "Fantasy", "Adventure"],
    rating: 8.4,
    duration: "2h 35m",
    language: "English",
    plot: "In a world where shadows come alive at night, a skilled hunter must protect humanity from ancient creatures while uncovering the truth about his mysterious past.",
    poster: "/src/assets/movie1.jpg",
    price: 390,
    showTimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"],
    theaters: ["Dark Cinema", "PVR IMAX", "Cinepolis XD"],
    isRunning: true
  }
];

export const genres = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Musical",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Sports",
  "Thriller",
  "War"
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