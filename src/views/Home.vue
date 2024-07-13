<template>
  <Framework :show="showHeader">
    <!-- 头部 -->
    <template v-slot:header-default>{{ title }}</template>
    <template v-slot:header-left>
      <BackIcon @backEmit="backHandle" />
    </template>
    <div class="home-wrap">
      Home
    </div>
  </Framework>
</template>

<script>
import Framework from "@/components/Framework";
import BackIcon from "@/components/BackIcon";
import baseMixin from "@/mixins/baseMixin";
export default {
  name: "Home",
  mixins: [baseMixin],
  components: {
    Framework,
    BackIcon,
  },
  props: {},
  data() {
    return {
      // showHeader: false,
    };
  },
  created() {
    this.setDocumentTitle("首页");
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
@import "@/styles/customer.less";
.home-wrap {
  width: 100%;
  height: 100%;
}
</style>