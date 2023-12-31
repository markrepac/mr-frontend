<script lang="ts">
import Pagination from '../components/Pagination.vue';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import { ref, onBeforeMount, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchMovies } from '../API/searchAPI'
import Search from '../components/Search.vue';

export default {
  components: {
    Card,
    Header,
    Pagination,
    Search,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    let message = ref('');  
    let results = ref([])
    let isLoading = ref(true)  

    let currentPage = ref(1)
    const itemsPerPage = 9

    const fetchAndSetMovies = async () => {
      try {
        isLoading.value = true;
        const data = await fetchMovies(message.value);
        results.value = data.filter(item => !!item.poster_path)
        console.log(results.value);
        if (results.value.length === 0) {
          router.push('/error');
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        router.push('/error');
      } finally {
        isLoading.value = false;
      }
    }

    watch(message, fetchAndSetMovies);

    const searchMovies = (query) => {
      if (!query.trim()) {
        return;
      }
      message.value = query;
    }

    onBeforeMount(() => {
      message.value = route.params.message; 
    })

    onMounted(fetchAndSetMovies);

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

    return { paginatedResults, totalPages, nextPage, prevPage, currentPage, isLoading, searchMovies, message } 
  }
}
</script>

<template>

<div class="loadingScreen" v-if="isLoading">Loading...</div>
  <div v-else>
   <Header title='Millions of movies, TV shows and people to discover. Explore now.' :links="['Home','Movies','Popular']" />

   <div class="SearchResults">
  <Search :message="message" @search="searchMovies" />
  </div>

  <div class="card-container" >
    <Card v-for="result in paginatedResults" :key="result.id" :result="result" />
  </div>
  
  <Pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @update:currentPage="currentPage = $event"
  />
 </div>
</template>

