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
html {
  font-family:
    'Manrope',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 21px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #2c3e50;
  color: #ffffff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

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

input, button {
  padding: 10px;
  line-height: 1em;
  border-radius: 5px;
  border: 1px solid #ffffff;
}

input:active, input:focus, button:active, button:focus {
  outline: none;
}

button {
  cursor: pointer;
}
</style>
