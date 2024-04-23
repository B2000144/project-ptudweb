<template>
  <nav class="my-2 my-md-0 mr-md-3">
    <router-link to="/"><span class="nav-item">Home</span></router-link>
    <router-link to="/product"><span class="nav-item">Book</span> </router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.nav-item {
  padding: 20px;
}
</style>
