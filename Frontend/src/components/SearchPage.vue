<template>
    <div>
        <form class="searchBtn" action="/action_page.php" style="margin:auto;max-width:300px">
  <input type="text" placeholder="Search.." name="search2">
  <button type="submit"><i class="fa fa-search"></i></button>
        </form>
        <h3 style="text-align:center">Kategoriler</h3>
        <appCategories></appCategories>
    </div>
</template>

<script>
    import Categories from './Categories.vue';
    export default {
        components : {
            appCategories : Categories
        }
    }
</script>
<style>
    body {
  font-family: Arial;
}

* {
  box-sizing: border-box;
}

form.searchBtn input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

form.searchBtn button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form.searchBtn button:hover {
  background: #0b7dda;
}

form.searchBtn::after {
  content: "";
  clear: both;
  display: table;
}
</style>