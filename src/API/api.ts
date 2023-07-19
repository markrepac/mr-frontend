const API_KEY: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTg5YTQwMGJmNmEwNGNlOWY4OWUyZjkyNGIzZjY2YyIsInN1YiI6IjY0YWZiNGQyYzQ5MDQ4MDBjNTA2YmMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iVt041l5PJ5Zaasv7X-a6QaGwmGb_kx-mVKcvOuSlw';
const BASE_URL: string = 'https://api.themoviedb.org/3';

const fetchMovies = async (searchQuery: string): Promise<MovieResult[]> => {
    try {
      const response = await fetch(`${BASE_URL}/search/multi?include_adult=false&language=en-US&page=1&query=${searchQuery}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("There was an error with the fetch operation: ", error);
      throw error;
    }
  }
  
  export { fetchMovies };