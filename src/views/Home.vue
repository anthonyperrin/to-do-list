<template>
  <div class="home mt-4">
    <ListeOffres msg="Liste offres"/>
  </div>
</template>

<script>
import ListeOffres from '@/components/ListeOffres.vue'

export default {
  name: 'home',
  components: {
    ListeOffres
  }
}
</script>
