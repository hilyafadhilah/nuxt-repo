<template>
  <div class="container">
    <div class="todos">
      <div class="input">
        <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
      </div>
      <transition-group name="list" tag="div" @beforeLeave="beforeLeave">
        <div v-for="todo in todos" :key="todo.id" class="todo">
          <div class="left">
            <button :class="{ done: todo.done }" @click="toggle(todo)"></button>
          </div>
          <div class="text">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
          </div>
          <div class="right">
            <button @click="removeTodo(todo)">remove</button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    middleware({ app, store }) {
      if(store.state.todos.list.length === 0) {
        const todosListCookie = app.$cookies.get('todos.list') ?? []

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
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        this.$cookies.set('todos.list', this.$store.state.todos.list, {
          sameSite: true,
          expires
        })
      },
      beforeLeave(el) {
        const { width } = window.getComputedStyle(el)
        el.style.width = width
        el.style.position = 'absolute'
      }
    }
  }
</script>

<style>
  .todos {
    padding: 0;
    width: 100%;
  }
  .todos .todo {
    display: flex;
    align-items: center;
    margin: 15px 0;
    flex-wrap: nowrap;
  }
  .todos .input input {
    width: 100%;
  }
  .todos .todo .left {
    flex: 0 0 auto;
  }
  .todos .todo .left button {
    margin: 0 5px;
    border: none;
    padding: 0;
    width: 27px;
    height: 27px;
    background-color: #ffffff;
  }
  .todos .todo .left button::after {
    content: '\2800';
  }
  .todos .todo .left button:hover {
    background-color: #dfe6e9;
  }
  .todos .todo .left button.done {
    background-color: #2ecc71;
    color: #ffffff;
  }
  .todos .todo .left button.done::after {
    content: '\2713';
  }
  .todos .todo .left button.done:hover {
    transition: none;
    background-color: #27ae60;
  }
  .todos .todo .text {
    flex-grow: 1;
    margin: 0 10px;
    word-break: break-all;
  }
  .todos .todo .text span {
    transition: all 0.25s ease-in;
  }
  .todos .todo .text .done {
    text-decoration: line-through;
    opacity: 0.4;
  }
  .todos .todo .right {
    flex: 0 0 100px;
  }
  .todos .todo .right button {
    width: 100%;
    border: none;
    background-color: #e74c3c;
    color: #ffffff;
    text-decoration: none;
    display: inline-block;
  }
  .todos .todo .right button:hover {
    background-color: #c0392b;
  }
  .list-enter-active, .list-leave-active, .list-move {
    transition: all 0.25s ease-in-out;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
