<template>
  <div class="data_lifecycle">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'data_lifecycle',
  components: {
  },
  // render (createElement) {
  //   return createElement('div', {

  //   }, this.message)
  // },
  data: () => ({
    message: 'data'
  }),
  beforeCreate () {
    console.log('beforeCreate', this.message)
  },
  created () {
    console.log('created', this.message)
  },
  beforeMount () {
    console.log('beforeMount', this.message)
  },
  mounted () {
    console.log('mounted', this.message)
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
