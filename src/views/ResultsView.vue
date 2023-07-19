<script lang="ts">
import Pagination from '../components/Pagination.vue';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchMovies } from '../API/api'

export default {
  components: {
    Card,
    Header,
    Pagination,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    let message = ''
    let results = ref([])

    let currentPage = ref(1)
    const itemsPerPage = 9

    onBeforeMount(() => {
      message = route.params.message
    })

    onMounted(async () => {
      const data = await fetchMovies(message);

      results.value = data.filter(item => item.poster_path !== null)

      console.log(results.value);

      if (results.value.length === 0) {
        router.push('/error');
      }
    })

    const paginatedResults = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return results.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(results.value.length / itemsPerPage)
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

    return {  paginatedResults, totalPages, nextPage, prevPage, currentPage  }
  }
}
</script>

<template>
   <Header title='Millions of movies, TV shows and people to discover. Explore now.' :links="['Home','Movies','Popular']" />

  <div class="card-container" >
    <Card v-for="result in paginatedResults" :key="result.id" :result="result" />
  </div>
  
  <Pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @update:currentPage="currentPage = $event"
  />

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
  flex-direction: column; 
  align-items: center; 
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
  background-color: rgba(0, 0, 0, 0.6); 
  color: white; 
  text-align: center;
  padding: 2vw;
  border-radius: 25px;
}

.overlay-title {
  font-weight: bold;
  font-size: 2vw; 
}

.overlay-vote {
  font-weight: bold;
  font-size: 2.5vw;
}


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