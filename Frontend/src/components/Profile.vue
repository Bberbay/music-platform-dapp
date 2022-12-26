<template>
  <div>
    <p>Kullanıcı Listesi :</p>
    <div v-for="user in userList">
      <h3>Kullanıcı adı : {{ user.username }}</h3>
      <h3>Kullanıcı e-mail : {{ user.email }}</h3>
      <h3>Kullanıcı şifre : {{ user.password }}</h3>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import axios from "axios";
import customAxios from "../custom_axios";
export default {
  data() {
    return {
      connected: false,
      contractResult: "",
      userList: [(username = ""), (password = ""), (email = "")]
    };
  },
  created() {
    /*      customAxios.get("posts")
            .then(response => {
                const users = response.data;
                for(let key in users) {
                    this.users.push({...users})
                }
            })
            .catch(e => console.log(e))
        */
    axios
      .get("http://localhost:5000/people")
      .then(response => {
        var array = response;
        console.log(array);
        var arrayLength = Object.keys(array).length;
        console.log(arrayLength);
        for (var i = 0; i <= arrayLength; i++) {
          //this.username = array.data[i].username;
          //this.password = array.data[i].password;
          // this.email = array.data[i].email;
          this.postList.username.push(array.data[i].username);
          this.postList.password.push(array.data[i].password);
          this.postList.email.push(array.data[i].email);
        }
      })
      .catch(err => console.log(err));
  }
};
</script>
