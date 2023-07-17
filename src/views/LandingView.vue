<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      message: '',
      movies: [],
      error: null,
    }
  },
  methods: {
    goToResults() {
      this.$router.push({ name: 'Results', params: { message: this.message } });
    },
  },
  mounted() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTg5YTQwMGJmNmEwNGNlOWY4OWUyZjkyNGIzZjY2YyIsInN1YiI6IjY0YWZiNGQyYzQ5MDQ4MDBjNTA2YmMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iVt041l5PJ5Zaasv7X-a6QaGwmGb_kx-mVKcvOuSlw'
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=1189a400bf6a04ce9f89e2f924b3f66c', options)
        const data = await response.json()
        this.movies = data.results
      } catch (err) {
        console.error(err)
        this.error = err
      }
    }

    fetchMovies()
  }
}
</script>

<template>
  <div class="Header">
    <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
    </router-link>
    <div class="Welcome">Millions of movies, TV shows and people to discover. Explore now.</div>
    <div class="HeaderText">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li>Movies</li>
      <li>Popular</li>
    </ul>
    </div>
  </div>

  <div class="Search">
   <input class="SearchBar" type="text" v-model="message" placeholder="Enter a movie name">
    <button class="myButton" @click="goToResults">Search</button>
  </div>
  <H1>TRENDING</H1>
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
  flex-direction: column; /* Make the flex items stack vertically */
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
  margin: auto;
  font-family: inherit;
  font-size: large;
  color: white;
}



  </style>
