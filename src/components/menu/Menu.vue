<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
                <a class="navbar-brand" href="#">Disko</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">A propos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/artists">Artists</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/genres">Genres</router-link>
                        </li>

                    </ul>
                </div>
                  <form class="form-inline">
                        <router-link class="btn btn-default mr-sm-2" to="/signin">Sign in</router-link>
                        <router-link class="btn btn-outline-primary my-2 my-sm-0" to="/register">Register</router-link>
                    </form>
            </div>
        </nav>
  </div>
</template>

<script>
export default {
  name: "Menu"
};
</script>
