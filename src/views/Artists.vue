<template>
  <div class="artists mt-4">
    <h1 class="mb-4">Artists</h1> 
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." v-model="filterName" v-on:keyup="doFilter()">
    </div>   
    <ul class="list-group mb-4">
        <li class="list-group-item" v-for="item of listeArtistsFiltered" :key="item.Id">
            {{item.FirstName + ' ' + item.LastName}}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Artists',
  methods: {
          fetchData() {
            fetch('http://127.0.0.1:8081/api/artist')
                .then(res => res.json())
                .then(json => {
                    this.listeArtists = json.result;
                    this.listeArtistsFiltered = this.listeArtists;
                })
          },
          doFilter() {
            this.listeArtistsFiltered = this.listeArtists.filter(a => (a.FirstName + ' ' + a.LastName).toLowerCase().indexOf(this.filterName.toLowerCase()) >= 0)
          }
      },
  created() {
      this.fetchData();
  },
  data: () => {
      return ({
          listeArtists: [],
          listeArtistsFiltered: [],
          filterName: ''
      })
  }
}
</script>
