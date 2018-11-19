<template>
  <div class="genres mt-4">
    <h1 class="mb-4">Genres</h1> 
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." v-model="filterName" v-on:keyup="doFilter()">
    </div>   
    <ul class="list-group mb-4">
        <li class="list-group-item" v-for="item of listeGenresFiltered" :key="item.Id">
            {{item.Name}}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Genres',
  methods: {
          fetchData() {
            fetch('http://127.0.0.1:8081/api/genre')
                .then(res => res.json())
                .then(json => {
                    this.listeGenres = json.result;
                    this.listeGenresFiltered = this.listeGenres;
                })
          },
          doFilter() {
            this.listeGenresFiltered = this.listeGenres.filter(a => a.Name.toLowerCase().indexOf(this.filterName.toLowerCase()) >= 0)
          }
      },
  created() {
      this.fetchData();
  },
  data: () => {
      return ({
          listeGenres: [],
          listeGenresFiltered: [],
          filterName: ''
      })
  }
}
</script>
