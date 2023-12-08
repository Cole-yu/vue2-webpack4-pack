<template>
    <div class="app-wrap">
        <router-view></router-view>
    </div>
</template>

<script>
export default{
    data(){
        return {
            
        }
    },
    computed: {
        mode(){
            return this.$store.getters.mode;
        }
    },
    methods:{
       
    },
    created(){

    }
}
</script>

<style lang="less">
.app-wrap{
    width: 100%;
    height: 100%;
}
</style>