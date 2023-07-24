<script lang="ts">
      export default {
    props: ['currentPage', 'totalPages'],
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('update:currentPage', this.currentPage + 1);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('update:currentPage', this.currentPage - 1);
        }
      }
    }
  }
</script>

<template>
    <div class="pagination">
      <button class="myButton prev-button" :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="myButton next-button" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </template>
  
  