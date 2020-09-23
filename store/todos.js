export const state = () => ({
  list: []
})

export const mutations = {
  add(state, { text, done }) {
    state.list.push({
      text,
      done: done ? true : false,
      id: new Date().toISOString() + state.list.length
    })
  },
  remove(state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  load({ state, commit, dispatch }) {
    if(state.list.length === 0) {
      const todosListCookie = this.$cookies.get('todos.list')

      if(todosListCookie) {
        for(const i in todosListCookie) {
          commit('add', todosListCookie[i])
        }

        dispatch('save') // reset cookie expire time
      }
    }
  },
  save({ state }) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    this.$cookies.set('todos.list', state.list, {
      sameSite: true,
      expires
    })
  },
  insert({ commit, dispatch }, todo) {
    commit('add', todo)
    dispatch('save')
  },
  delete({ commit, dispatch }, todo) {
    commit('remove', todo)
    dispatch('save')
  },
  toggleDone({ commit, dispatch }, todo) {
    commit('toggle', todo)
    dispatch('save')
  }
}