<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a href="#" class="navbar-nav"> <img src="../assets/logo-temp.png" height="80px" width="125px" style="filter:brightness(1)" position="relative"> </a> 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <router-link to="/" >
      <li class="nav-item active">
        <a class="nav-link" href="/">Ana Sayfa <span class="sr-only">(current)</span></a>
      </li>
      </router-link>

      <router-link to="/search" >
      <li class="nav-item">
        <a class="nav-link" >Keşfet</a>
      </li>
      </router-link>

      <router-link to="/profile" >
      <li class="nav-item">
        <a class="nav-link" >Profil</a>
      </li>
      </router-link>

      <router-link to="/login" >
      <li class="nav-item">
        <a class="nav-link" >Giriş Yap</a>
      </li>
      </router-link>

      <router-link to="/register">
      <li class="nav-item">
        <a class="nav-link" >Kayıt Ol</a>
      </li>
      </router-link>

      <router-link to="/upload" >
      <li class="nav-item">
      <a class="nav-link" >Müzik Yükle</a>
      </li>
      </router-link>

    </ul>
  </div>
</nav>
</div>
</template>

<script>
export default{
  methods: {
    onComplete(data){
      console.log('data:' + data);
    },

    logout(){

    }
  },
  computed : {
    logoutClass() {
      return {
        'd-none': false
      }
    }
  }
}
</script>

<style scoped>
  li {
    display: flex;
    flex-direction: row;
    list-style: none;
    border-radius: 25px;
    border: 0.1px solid #37114d;
    background: rgba(0,0,0,.5);
    box-shadow: 0 4px 8px #37114d, 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
  }
  li {
    margin:5px;
    color: dark;
    font-size: 20px;
    cursor:pointer;
  }
  li:after {
    display: block;
  }
  li:hover:after {
    transform: scaleX(1);
  }
</style>