<template>
  <div class="todo-list">
    <transition-group name="list" tag="div" @beforeLeave="beforeLeave">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <div class="left">
          <button :class="{ done: todo.done }" @click="toggle(todo)"></button>
        </div>
        <div class="text">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </div>
        <div class="right">
          <button @click="remove(todo)">remove</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ['todos'],
  methods: {
    toggle(todo) {
      this.$emit('toggle', todo)
    },
    remove(todo) {
      this.$emit('remove', todo)
    },
    beforeLeave(el) {
      const { width } = window.getComputedStyle(el)
      el.style.width = width
      el.style.position = 'absolute'
    }
  }
}
</script>

<style scoped>
  .todo-list .todo {
    display: flex;
    align-items: center;
    margin: 15px 0;
    flex-wrap: nowrap;
  }
  .todo-list .todo .left {
    flex: 0 0 auto;
  }
  .todo-list .todo .left button {
    margin: 0 5px;
    border: none;
    padding: 0;
    width: 27px;
    height: 27px;
    background-color: #ffffff;
  }
  .todo-list .todo .left button::after {
    content: '\2800';
  }
  .todo-list .todo .left button:hover {
    background-color: #dfe6e9;
  }
  .todo-list .todo .left button.done {
    background-color: #2ecc71;
    color: #ffffff;
  }
  .todo-list .todo .left button.done::after {
    content: '\2713';
  }
  .todo-list .todo .left button.done:hover {
    transition: none;
    background-color: #27ae60;
  }
  .todo-list .todo .text {
    flex-grow: 1;
    margin: 0 10px;
    word-break: break-all;
  }
  .todo-list .todo .text span {
    transition: all 0.25s ease-in;
  }
  .todo-list .todo .text .done {
    text-decoration: line-through;
    opacity: 0.4;
  }
  .todo-list .todo .right {
    flex: 0 0 100px;
  }
  .todo-list .todo .right button {
    width: 100%;
    border: none;
    background-color: #e74c3c;
    color: #ffffff;
    text-decoration: none;
    display: inline-block;
  }
  .todo-list .todo .right button:hover {
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