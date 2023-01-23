<template>
    <div>
      <div v-if="connected">
      <div class="login-box">
  <h2>Upload Page   </h2>
  <form @submit.prevent="onSubmit">
    <div class="user-box">
      <input type="text" name="trackname" required="text" v-model="music.TrackName"  >
      <label>Şarkı Adı </label>
    </div>
    <label>Kategori seçiniz</label>
    <div class="user-box">
      
   <li class="list">Kategoriler
      <ul class="items">
         <li>Hip-Hop</li>
         <li>Pop</li>
         <li>Chill</li>
         <li>Rock</li>
      </ul>
   </li>
    </div>
    <button type="submit"> 
      <span></span>
      <span></span>
      <span></span>
      <span></span>Submit</button>
  </form>
</div>    
      </div>
      <div v-else-if="!connected">
        <h3>Şarkı yüklemek için metamask cüzdanınızı bağlamalısınız!!</h3>
        <button v-if ="!connected" @click="connect">Connect wallet</button>
        <button v-if="connected">Call Contract</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
      name : 'App',
      data() {
        return {
          connected : false,
          contractResult : '',
          music : {
            TrackName : "",
            TrackCategory : "",
            OwnerAddress : "",
            Ipfs : ""
          }
        }
      },
      methods : {
        connect() {
          if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(() =>{
              this.connected = true;
            })
          }
          console.log(this.connected)
        },
        async onSubmit(){
            const response = await axios.post("http://localhost:5000/upload", {
              TrackName : this.TrackName,
            });
            console.log(response);
            console.log("Parça başarıyla yüklendi." ); 

          }
        }
        }
    
</script>

<style scoped>
  .login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 900px;
  padding: 90px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #6f2b96;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  background-color: black;
}

.login-box button:hover {
  background: #37114d;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #37114d,
              0 0 25px #37114d,
              0 0 50px #37114d,
              0 0 100px #37114d;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 3s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgb(111, 43, 150));
  animation: btn-anim2 3s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 3s linear infinite;
  animation-delay: 1.5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 3s linear infinite;
  animation-delay: 2.25s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

</style>