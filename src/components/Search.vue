<template>
      <input class="SearchBar" type="text" v-model="query" placeholder="Enter a movie name">
      <button class="myButton" @click="emitSearch">Search</button>
  </template>
  
  <script lang="ts" >
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

    watch(() => props.message, (newVal) => {
      query.value = newVal;
    });

    const emitSearch = () => {
      emit('search', query.value);
    };

    return { query, emitSearch };
  }
};
  </script>
  
  