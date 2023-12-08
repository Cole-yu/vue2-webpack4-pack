<template>
    <div class="home-wrap">
        <h1>Home</h1>
        <div class="img-wrap">
            <img :src="img" alt="test">
        </div>
    </div>
</template>

<script>
import img from '@/images/bread.png';
export default {
    data(){
        return {
            img: img,
        }
    }
}
</script>

<style lang="less" scoped>
.home-wrap{
    font-size: 0.24rem;
    color: #333;
    .img-wrap{
        width: 4rem;
        height: 4rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>