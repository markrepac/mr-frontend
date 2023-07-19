<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Millions of movies, TV shows and people to discover. Explore now.'
    },
    links: {
      type: Array,
      default: () => [{ name: 'Home', route: '/' }, { name: 'Home', route: '/' }, { name: 'Home', route: '/' }]
    }
  }
})
</script>

<template>
  <div class="Header">
    <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
    </router-link>
    <div class="Welcome">{{ title }}</div>
    <div class="HeaderText">
      <ul>
        <li v-for="(link, index) in links" :key="index"><router-link to="/">{{ link }}</router-link></li>
      </ul>
    </div>
  </div>
</template>
