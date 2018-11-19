<template>
  <div id="app">
    <Menu></Menu>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/menu/Menu.vue'
export default {
  components: {
    Menu
  }
}

</script>
