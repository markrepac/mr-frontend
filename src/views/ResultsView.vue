<script setup lang="ts">
import { ref, onBeforeMount, onMounted,computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let message = ''
let results = ref([])
let results2 = ref([])

let currentPage = ref(1)
const itemsPerPage = 9

//API STUFF

onBeforeMount(() => {
  message = route.params.message
})

onMounted(async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTg5YTQwMGJmNmEwNGNlOWY4OWUyZjkyNGIzZjY2YyIsInN1YiI6IjY0YWZiNGQyYzQ5MDQ4MDBjNTA2YmMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iVt041l5PJ5Zaasv7X-a6QaGwmGb_kx-mVKcvOuSlw'
    }
  };
  const response = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${message}`, options)
  const response2= await fetch(`https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1query=${message}`, options)
  const data = await response.json()
  const data2 = await response2.json()

  results.value = data.results.filter(item => item.poster_path !== null)
  results2.value = data2.results.filter(item => item.poster_path !== null)


  if (results.value.length === 0 && results2.value.length === 0) {
    router.push('/error');
  }


})

// PAGINATION STUFF

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return results.value.slice(start, end)
})

const paginatedResults2 = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return results2.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil((results.value.length + results2.value.length) / itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

//CARD TEXT LIMITER

const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };
</script>

<template>
   <div class="Header">
    <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
    </router-link>
    <div class="HeaderText">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li>Movies</li>
      <li>Popular</li>
    </ul>
    </div>
  </div>
  <div class="card-container" >
    <div class="card"  v-for="result in paginatedResults" :key="result.id" >
    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Movie poster">
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{width: `${result.vote_average * 10}%`}"><p>{{`${(result.vote_average * 10).toFixed(1)}%`}}</p></div>
    </div>
    <div class="overlay-text">
        <p class="overlay-title">{{ result.title }}</p>
        <p>{{ truncateText(result.overview, 100) }}</p>
      </div>
    </div>
    <div class="card"  v-for="result in paginatedResults2" :key="result.id" >
    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Movie poster">
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{width: `${result.vote_average * 10}%`}"><p>{{`${(result.vote_average * 10).toFixed(1)}%`}}</p></div>
    </div>
    <div class="overlay-text">
        <p class="overlay-title">{{ result.title }}</p>
        <p>{{ truncateText(result.overview, 100) }}</p>
      </div>
    </div>
</div>

<div class="pagination">
  <button class="myButton" v-if="currentPage !== 1" @click="prevPage">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button class="myButton" v-if="currentPage !== totalPages" @click="nextPage">Next</button>
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
.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;}
  
.card img {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  width: 100%;
  display: flex;
}

.card {
  background-color: rgba(0, 0, 0, 0.6);
  position: relative;
  transition: transform 0.3s ease;
  margin: 10px;
  width: 25%;
  display: flex;
  flex-direction: column; /* Make the flex items stack vertically */
  align-items: center; /* Center items along the cross axis */
}
  .myButton {
  background-color: blue; 
  border: none;
  color: white;
  padding: 10px 27px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 8px 8px;
  cursor: pointer;
  border-radius: 25px;
}
 .pagination{
  display: flex;
  justify-content: center;
  font-size: 20px;
 }
 .overlay-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  color: white; /* White text */
  text-align: center;
  padding: 2vw; /* Responsive padding */
  border-radius: 25px;
}

.overlay-title {
  font-weight: bold;
  font-size: 2vw; /* Responsive font size */
}

.overlay-vote {
  font-weight: bold;
  font-size: 2.5vw; /* Responsive font size */
}

/* Adjust font size for larger screens */
@media screen and (min-width: 600px) {
  .overlay-title {
    font-size: 1.5vw;
  }

  .overlay-vote {
    font-size: 1.25vw;
  }
}
  template {
  font-family: 'Montserrat', sans-serif;
  }
  .progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 25px;
}

.progress-bar-fill {
  height: 20px;
  background-color: #0000ff;
  border-radius: 25px;
  width: 0;
}

.progress-bar-fill p{
  font-family: inherit;
  padding: 0px 0px 10px 10px;
  font-weight: bold;
  color: rgb(148, 148, 148);
}
 
</style>