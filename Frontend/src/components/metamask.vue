<template>
    <div>
        <h3>Metamask bağlantı alanı !!</h3>
>   <button v-if="!connected" @click="connect">Connect wallet</button>
    <button v-if="connected">Call contract</button>
    <p v-if="connected">{{ contractResult }}</p>
        
    </div>
</template>

<script>
export default {
    name : 'App',
    data(){
        return {
            connected : false,
            contractResult : 'Kontrat çağırıldı',
        }
    },
    methods : {
        connect() {
            if (window.ethereum) {
                window.ethereum.request({method: 'eth_requestAccounts'})
                .then(() => {
                    this.connected = true;
                })
            }
        }
    }
    
}
</script>


<style>
    
</style>