<template>
  <div id="app" class="bg-dark h-screen">
    <div class="flex" style="height: 120vh; width:100%" >
      <div class="w-full h-full relative">
        <div class="w-full sticky top-0 p-2" >
          <appNavBar></appNavBar>
        </div>
      <router-view></router-view>
      </div>
    </div>
      <appPlaybar></appPlaybar>
    
  </div>

</template>

<script>
  import Navbar from "./components/Navbar.vue"
  import Playbar from "./components/Playbar.vue";
export default {
  components : {
    appNavBar : Navbar,
    appPlaybar : Playbar
  }

}
</script>

<style >
  div.bg-dark {
    position: absolute;
    width: 100%;
  }
  
  

</style>
