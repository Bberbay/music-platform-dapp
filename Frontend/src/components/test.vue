<template>
    <div>
       <input type="text" v-model="firstName" placeholder="firstName">
       <input type="text" v-model="email" placeholder="email"> 
       <input type="text" v-model="password" placeholder="password"> 
       <button>Submit</button>
    </div>
</template>
<script>
    export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      firstName: '',
      password: '',
      contact: {
        email: ''
      }
    }
  },
  validations () {
    return {
      firstName: { required },
      password: { required },
      contact: {
        email: { required, email }
      }
    }
  }
}
</script>
<style lang="">
    
</style>