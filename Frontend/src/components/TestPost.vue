<template>
    <div>

        <div v-for="post in posts" :key="post._id"> 
            <!--her bir post için index yerine json'ın otomatik olarak atadığı _id kullanıldı-->
            <ul>
                <li>Username : {{ post.username }} </li>
                <li>Password : {{ post.password }}</li>
                <li>Email : {{ post.email }}</li>
                <input type="checkbox" class="removeSelectButton" id="removeSelectButton" v-model="post._id" value="selectedUser" >
                <label for="removeSelectButton">Silmek için seçiniz.</label>
            </ul>
            <br><br>

            <p> Silinecek kullanıcının id'sini giriniz.</p>
            <button @click="selectedUserFonk(post._id)">Kullanıcıyı Sil</button>
            <button @click="CheckboxGoster(selectedUser)">Seçilileri Göster</button>
            <p>
                
            </p>
        </div>
            
    </div>
</template>

<script>
    import axios from "axios";
    import { ref, onMounted } from "vue";
    import 'regenerator-runtime/runtime' // regenerator-runtime hatası için. npm i 
    // npm i babel-plugin-transform-runtime yapıldı
    // webpack entry: ["regenerator-runtime/runtime.js" , './src/main.js'], eklendi
    export default {
        /*data () {
            return {
                axiosPost : {
                    username : "",
                    password : "",
                    email : ""
                }
            }
        },*/

        methods : {
            selectedUserFonk(_id){
                console.log("id bu : " + _id);
                var selectedUser = document.getElementById("removeSelectButton");
                if(selectedUser == true){
                    this.removePost(_id)
                }
            },
            CheckboxGoster(selectedUser) {
                console.log(this.selectedUser + "Seçildi.");
            }
        },

        setup () {
        
      const posts = ref([])
      const API_URL = "http://localhost:5000/posts"
      onMounted (() => {
        getPosts()
      })
      async function getPosts() {
        try {
        const response = await fetch(API_URL) // get isteği
        const json = await response.json() // cevap beklenmeden gelince hata döndü, cevap json'a dönüştürüldü
        posts.value = json
        } catch (error) {
          console.log(error)
        }
      }
      
      async function removePost(_id){
        const response = await fetch (`${API_URL}/${_id}`, {
            method: "DELETE",
        })
        getPosts()


      }


      return {
        posts,
        removePost
      }
        }
        
       /*methods : {
        axiosGetir () {
            axios.get("https://localhost:5000/posts")
            .then((response) => {
                axiosPost.username = response.data.username
                axiosPost.password =response.data.password
                axiosPost.email = response.data.email
       })
        }
       }*/
       
    }

</script>

<style>
    .div {
        background-color: red;
    }

</style>