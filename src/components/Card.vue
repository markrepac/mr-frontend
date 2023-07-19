<script lang="ts">
export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const truncateText = (text, length) => {
      if (!text) {
        return '';
      }
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return { truncateText };
  },
};
</script>

<template>
  <div class="card">
    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Movie poster">
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{width: `${result.vote_average * 10}%`}"><p>{{`${(result.vote_average * 10).toFixed(1)}%`}}</p></div>
    </div>
    <div class="overlay-text">
        <p class="overlay-title">{{ result.title }}</p>
        <p>{{ truncateText(result.overview, 100) }}</p>
    </div>
  </div>
</template>