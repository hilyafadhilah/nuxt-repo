<template>
  <div class="container">
    <ul>
      <li>
        <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
      </li>
      <li v-for="todo in todos" :key="todo.id">
        <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    middleware({ app, store }) {
      const todosListCookie = app.$cookies.get('todos.list') ?? []

      // reset cookie expire to one week everytime page is visited

      let expires = new Date()
      expires.setDate(expires.getDate() + 7)

      app.$cookies.set('todos.list', todosListCookie, {
        expires
      })

      for(let i in todosListCookie) {
        store.commit('todos/add', todosListCookie[i])
      }
    },
    computed: {
      todos() {
        return [...this.$store.state.todos.list].reverse()
      }
    },
    methods: {
      addTodo(e) {
        this.$store.commit('todos/add', { text: e.target.value })
        e.target.value = ''
        this.saveTodosCookie()
      },
      toggle(todo) {
        this.$store.commit('todos/toggle', todo)
        this.saveTodosCookie()
      },
      removeTodo(todo) {
        this.$store.commit('todos/remove', todo)
        this.saveTodosCookie()
      },
      saveTodosCookie() {
        let expires = new Date()
        expires.setDate(expires.getDate() + 7)

        this.$cookies.set('todos.list', this.$store.state.todos.list, {
          expires
        })
      }
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>
