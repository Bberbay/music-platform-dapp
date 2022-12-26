<template>
<div class="container">
    <h2> Haftanın Trendleri</h2>
   
    <appTracks v-for="track in 5" :key="track.index"> </appTracks>
</div>
</template>

<script>
import Tracks from "./Tracks.vue"
export default {
    components : {
        appTracks : Tracks
    }
}
</script>

<style>
    h2 {
        color: wheat;
    }

</style>
