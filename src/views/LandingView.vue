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
  

