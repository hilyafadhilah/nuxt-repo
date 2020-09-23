<template>
  <div class="container">
    <todo-input @submit="addTodo" />
    <todo-list :todos="todos" @remove="removeTodo" @toggle="toggleTodo" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import TodoInput from '../components/todos/TodoInput'
  import TodoList from '../components/todos/TodoList'

  export default {
    components: {
      TodoInput,
      TodoList
    },
    middleware({ store }) {
      store.dispatch('todos/load')
    },
    computed: {
      todos() {
        return [...this.$store.state.todos.list].reverse()
      }
    },
    methods: {
      addTodo(text) {
        this.$store.dispatch('todos/insert', { text })
      },
      ...mapActions({
        removeTodo: 'todos/delete',
        toggleTodo: 'todos/toggleDone'
      })
    }
  }
</script>

<style>
  .container {
    padding: 0;
    width: 100%;
  }
</style>
