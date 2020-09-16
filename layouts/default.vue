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
    <transition name="snackbar">
      <div class="snackbar" v-if="snackbar">
        <div class="text">This website uses cookies.</div>
        <div class="action" @click="snackbar = false; cookieAgree()">Agree</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false
  }),
  mounted() {
    this.snackbar = !this.$cookies.get('cookies.agree')
  },
  methods: {
    cookieAgree() {
      const expires = new Date()
      expires.setMonth(expires.getMonth() + 1)
      this.$cookies.set('cookies.agree', true, { expires })
    }
  }
}
</script>

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

.snackbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #34495e;
  padding: 15px 30px;
  display: flex;
  transform-origin: bottom;
  transition: all 0.3s ease-in-out;
}

.snackbar .text {
  flex-grow: 1;
}

.snackbar .action {
  cursor: pointer;
  text-decoration: underline;
}

.snackbar .action:hover {
  color: #f1c40f;
}

.snackbar-enter-active, .snackbar-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
</style>
