<template>
  <div class="container">
    <table>
      <tr v-for="(v,k) in bio" :key="k">
        <td>{{k}}</td>
        <td>:</td>
        <td>{{v}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    bio: {
      'Nama': 'Hilya Fadhilah Imania',
      'Fakultas': 'STEI',
      'Domisili': 'Kota Bogor, Jawa Barat'
    }
  })
}
</script>

<style scoped>
  .container {
    background-color: #34495e;
    padding: 50px 0;
    border-radius: 20px;
  }
  table {
    margin: auto;
    font-size: 1.1em;
  }
  table tr td:first-of-type {
    min-width: 130px;
  }
  table td {
    padding: 10px 0;
  }
</style>