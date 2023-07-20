<template>
    <input class="SearchBar" type="text" v-model="query" placeholder="Enter a movie name" @input="debounceEmitSearch">
    <button class="myButton" @click="emitSearch">Search</button>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const query = ref(props.message);
    let timeout;

    watch(() => props.message, (newVal) => {
      query.value = newVal;
    });

    const emitSearch = () => {
      emit('search', query.value);
    };

    const debounceEmitSearch = () => {
      clearTimeout(timeout);
      timeout = setTimeout(emitSearch, 1000);
    }

    return { query, emitSearch, debounceEmitSearch };
  }
};
</script>