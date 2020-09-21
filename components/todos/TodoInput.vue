<template>
  <div class="todo-input">
    <input
      @keyup.enter="submit"
      @input="updateValue"
      placeholder="What needs to be done?"
    />
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    updateValue(e) {
      this.content = e.target.value
      this.$emit('input', this.content)
    },
    submit(e) {
      this.$emit('submit', this.content)
      e.target.value = ''
    }
  }
}
</script>

<style scoped>
  .todo-input {
    display: flex;
  }
  .todo-input input {
    flex-grow: 1;
  }
</style>