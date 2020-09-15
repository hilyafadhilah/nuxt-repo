<template>
  <div class="wrapper">
    <div class="header">
      Tugas WebOkto
    </div>
    <div class="navbar">
      <nuxt-link to="/">Todos</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
    </div>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<style>
body {
  display: flex;
  justify-content: center;
}

body > div {
  flex: 0 1 700px;
  margin: 0 30px;
}

.header {
  text-align: center;
  font-size: 75px;
  font-family: 'Caveat Brush', cursive;
  padding: 45px 0;
}

.navbar {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.navbar a, .navbar a:visited {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f39c12;
  border-radius: 20px;
  margin: 0 10px;
  text-decoration: none;
  color: #ffffff;
}

.navbar a:hover {
  background-color: #e67e22;
}

.content {
  margin-top: 50px;
}
</style>
