<template>
     <div>

      <div class="login-box">
  <h2>Giriş Yap</h2>
  <form @submit.prevent="onSubmit">
    <div class="user-box">
      <input type="text" name="username" required="text" v-model="username"  >
      <label>Kullanıcı Adı</label>
    </div>
    <div class="user-box">
      <input type="password" name="password" required="text" v-model="password" >
      <label>Şifre</label>
    </div>
    <button type="submit"> 
      <span></span>
      <span></span>
      <span></span>
      <span></span>Gönder</button>
  </form>
</div>


  <!--      <form @submit.prevent="onSubmit">
  <div class="container">
    <h1>Giriş Yap</h1>
    <hr>
    <label for="username"><b>Kullanıcı Adı</b></label>
    <input type="text" placeholder="Enter Username" name="username" id="username" v-model="username" required>
    <label for="psw"><b>Şifre</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model="password" required>
    <button type="submit" class="loginbtn">Giriş Yap</button>
  </div>
  
  <div class="container signin">
    <p> <a href="/login">Şifremi unuttum</a></p>
  </div>
</form>-->
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
              username: "",
              password: "",
              token : "",
            }
        },
        methods : {
            async onSubmit(){
            const response = await axios.post("http://localhost:5000/people/login", {
              username : this.username,
              password: this.password
            });
            console.log(response);
            console.log("giriş yapılan id : " + this.username + "giriş yapılan şifre: " + this.password + "token : " + this.token ); 

          }
        }
    }
</script>


<style>
/*       body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}


.container {
  padding: 16px;
  background-color: white;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}-

.loginbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.loginbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.signin {
  background-color: #f1f1f1;
  text-align: center;
}
*/

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
  color: #03e9f4;
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
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
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
  background: linear-gradient(180deg, transparent, #03e9f4);
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