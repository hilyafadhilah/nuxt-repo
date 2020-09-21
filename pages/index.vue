<template>
  <div class="container">
    <todo-input @submit="addTodo" />
    <todo-list :todos="todos" @remove="removeTodo" @toggle="toggleTodo" />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import TodoInput from '../components/todos/TodoInput'
  import TodoList from '../components/todos/TodoList'

  export default {
    components: {
      TodoInput,
      TodoList
    },
    middleware({ app, store }) {
      if(store.state.todos.list.length === 0) {
        const todosListCookie = app.$cookies.get('todos.list')

        if(todosListCookie) {
          // reset cookie expire to one week everytime page is visited

          const expires = new Date()
          expires.setDate(expires.getDate() + 7)

          app.$cookies.set('todos.list', todosListCookie, {
            sameSite: true,
            expires
          })

          for(const i in todosListCookie) {
            store.commit('todos/add', todosListCookie[i])
          }
        }
      }
    },
    computed: {
      todos() {
        return [...this.$store.state.todos.list].reverse()
      }
    },
    methods: {
      addTodo(text) {
        this.$store.commit('todos/add', { text })
        this.saveTodosCookie()
      },
      toggleTodo(todo) {
        this.$store.commit('todos/toggle', todo)
        this.saveTodosCookie()
      },
      removeTodo(todo) {
        this.$store.commit('todos/remove', todo)
        this.saveTodosCookie()
      },
      saveTodosCookie() {
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        this.$cookies.set('todos.list', this.$store.state.todos.list, {
          sameSite: true,
          expires
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 0;
    width: 100%;
  }
</style>
