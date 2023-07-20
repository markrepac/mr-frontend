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
}
</script>

<template>
  
  <Header title='Millions of movies, TV shows and people to discover. Explore now.' :links="['Home','Movies','Popular']" />

  <div class="errorText">There is no movie like that, but you can still try again</div>
  <div class="SearchError">
  <Search :message="message" @search="searchMovies" />
  </div>
</template>
  

