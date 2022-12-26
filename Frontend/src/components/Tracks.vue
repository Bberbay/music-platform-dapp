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
import axios from 'axios'
export default {
  data () {
    return {
      TrackList : 
        { TrackName : "Ornek Parca 1" ,
        Ipfs : "Ornek IPFS 1",
        OwnerAddress: "Örnek Sahip 1"}
      
    }
  },
  created() {
    axios.get("http://localhost:5000/music")
    .then(response => {
                var array  = response;
                console.log(array)
                var arrayLength = Object.keys(array).length
                console.log(arrayLength)
                for(var i =0;i<=arrayLength; i++) {
                    //this.username = array.data[i].username;
                    //this.password = array.data[i].password;
                    // this.email = array.data[i].email;
                    this.TrackList.TrackName.push(array.data[i].TrackName)
                    this.TrackList.Ipfs.push(array.data[i].Ipfs)
                    this.TrackList.OwnerAddress.push(array.data[i].OwnerAddress)
                }
            })
            .catch(err => console.log(err))


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
  margin:5;
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