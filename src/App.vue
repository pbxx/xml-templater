<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <span>XML Templater</span>
      <span>Use CSV files to mass-create XML configurations!</span>
      
    </div>
    <!-- <div>
      this is a blank center div
    </div> -->
    <div>
      <span>Created by <a href="https://pbxdesign.co/" target="_blank">Donavan Lewis</a></span>
    </div>
    
  </header>

  <RouterView />
</template>

<style scoped>

</style>
