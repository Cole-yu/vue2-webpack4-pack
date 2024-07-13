<template>
  <div class="back-btn-wrap" @click="backHandle">
    <img :src="backIconUrl" alt="back" />
  </div>
</template>

<script>
import backIconUrl from "@/images/backto.png";
export default {
  name: "BackIcon",
  data() {
    return {
      backIconUrl: backIconUrl,
    };
  },
  methods: {
    backHandle() {
      this.$emit("backEmit");
    },
  },
};
</script>

<style lang="less" scoped>
.back-btn-wrap {
  width: 0.4rem;
  height: 0.4rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>