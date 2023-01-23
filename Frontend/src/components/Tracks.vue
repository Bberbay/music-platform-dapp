<template>
    <div class="track">
      <div class="vertical-menu">
        <ul>
        <li v-for="(value, key, index) in TrackList">
          
          {{key}} : {{value}}
          <li>
            <audio class="playdemo" controls autoplay muted>
            <source src="#" type="#">
          </audio>
          </li>
        </li>
      </ul>
      </div>      
    </div>

</template>

<script>
export default {
  data () {
    return {
      TrackList : 
        { ParcaAdi : "Ornek Parca 1" ,
        ParcaSahibi : "Ornek Sahip 1"}
      
    }
  }
}
</script>

<style scoped>
.track {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  background-color: black;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin:0;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 25px;
}
.ul {
  display: flex;
}

.vertical-menu {
  width: 700px;
  border-radius: 25px;
}
.vertical-menu ul {
  background-color: black;
  color: white;
  display: block;
  padding: 12px;
  text-decoration: none;
  border-radius: 25px;
  list-style-type: none;
}
.vertical-menu ul:hover {
  background-color: #0d052b;
}
.vertical-menu ul.active {
  background-color: #0d052b;
  color: white;
}

.playdemo {
  margin-left: 50px;
}
</style>