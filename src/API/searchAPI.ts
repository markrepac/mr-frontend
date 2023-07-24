const API_KEY: string = process.env.VUE_APP_API_KEY || '';
const BASE_URL: string = process.env.VUE_APP_BASE_URL || '';

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