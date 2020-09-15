<template>
  <div class="container">
    <ul class="todos">
      <li class="input">
        <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
      </li>
      <li v-for="todo in todos" :key="todo.id">
        <div class="left">
          <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
        </div>
        <div class="text">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </div>
        <div class="right">
          <button @click="removeTodo(todo)">remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    middleware({ app, store }) {
      if(store.state.todos.list.length === 0) {
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
  ul.todos {
    padding: 0;
    width: 100%;
  }
  ul.todos li {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 15px 0;
    flex-wrap: nowrap;
  }
  ul.todos li.input input {
    width: 100%;
  }
  ul.todos li .left {
    flex: 0 0 auto;
  }
  ul.todos li .left input {
    margin: 0 10px;
  }
  ul.todos li .text {
    flex-grow: 1;
    margin: 0 10px;
    word-break: break-all;
  }
  ul.todos li .right {
    flex: 0 0 100px;
  }
  ul.todos li .right button {
    width: 100%;
    border: none;
    background-color: #e74c3c;
    color: #ffffff;
    text-decoration: none;
    display: inline-block;
  }
  ul.todos li .right button:hover {
    background-color: #c0392b;
  }
</style>
