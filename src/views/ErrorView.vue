<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue';
import Search from '../components/Search.vue';
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
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTg5YTQwMGJmNmEwNGNlOWY4OWUyZjkyNGIzZjY2YyIsInN1YiI6IjY0YWZiNGQyYzQ5MDQ4MDBjNTA2YmMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iVt041l5PJ5Zaasv7X-a6QaGwmGb_kx-mVKcvOuSlw'
      }
    };
  }
}
</script>

<template>
  
  <Header title='Millions of movies, TV shows and people to discover. Explore now.' :links="['Home','Movies','Popular']" />

  <div class="errorText">There is no movie like that, but you can still try again</div>
  <div class="SearchError">
  <Search :message="message" @search="searchMovies" />
  </div>
</template>
  
  <style>
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
  .SearchError{
    margin-top: 5%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  h1{
    font-size: 120px;
    font-weight: 600;
    margin-left: 30px;
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
.errorText{
  text-align: center;
  margin-top: 12%;
  font-size: 40px;
  font-weight: 600;
}
</style>
