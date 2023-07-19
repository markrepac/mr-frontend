<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue';
import Search from '../components/Search.vue';
import { fetchTrendingMovies } from '../API/trendingAPI'
import { fetchMovies } from '../API/searchAPI';

export default {
  components: {
    Header,
    Search,
  },
  data() {
    return {
      message: '',
      movies: [],
      error: null,
    }
  },
  methods: {
    searchMovies(query) {
    this.message = query;
    this.goToResults();
  },
    goToResults() {
      this.$router.push({ name: 'Results', params: { message: this.message } });
    },
  },
  mounted() {
    fetchTrendingMovies()
      .then(movies => {
        this.movies = movies;
      })
      .catch(error => {
        console.error('Error:', error);
        this.error = error;
      });
  }
}

</script>

<template>

  <Header title='Millions of movies, TV shows and people to discover. Explore now.' :links="['Home','Movies','Popular']" />

  <div class="Search">
  <Search :message="message" @search="searchMovies" />
  </div>
  
  <h1>TRENDING</h1>
   <div class="card-container">
     <div class="cardHome" v-for="(movie, index) in movies.slice(0, 15)" :key="movie.id">
     <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie poster">
    </div>
  </div>
</template>
  
  <style>
  .cardHome {
    position: relative;
  transition: transform 0.3s ease;
  margin: 10px;
  width: 25%;
  display: flex;
  flex-direction: column; 
  align-items: center;
  }
  .cardHome img {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  width: 100%;
  display: flex;
  }
  .Header{
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  svg{
    margin: 10px;
    height: 50px;
    width: 50px;
  }
  .HeaderText{
    text-align: right;
  }
  .HeaderText ul{
    list-style-type: none;  
    padding: 0;  
  }
  .HeaderText ul li{
    display: inline-block;
    margin-right: 20px; 
  }
  .Search{
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  h1{
    font-size: 120px;
    font-weight: 600;
    margin-left: 30px;
  }
  .SearchBar{
    background-color: white;
    width: 50%;
    height: 50px;
    border-radius: 30px;
    padding: 20px;
  }
  .card-container {
    font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.myButton {
  font-family: 'Montserrat', sans-serif;
  background-color: blue; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 25px;
}
.Welcome{
  font-family: inherit;
  font-size: large;
  color: white;
  text-align: center;
}
</style>
