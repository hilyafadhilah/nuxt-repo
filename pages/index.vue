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
    computed: {
      todos() {
        return [...this.$store.state.todos.list].reverse()
      }
    },
    methods: {
      addTodo(e) {
        this.$store.commit('todos/add', e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'todos/toggle'
      }),
      removeTodo(todo) {
        this.$store.commit('todos/remove', todo)
      }
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>
