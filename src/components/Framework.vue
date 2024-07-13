<template>
  <div class="framework" :class="{ 'padding-top': show }">
    <!-- 头部 -->
    <stock-header v-if="show" :fixed="true" :bgWhite="bgWhite">
      <slot name="header-default"></slot>
      <template v-slot:left>
        <slot name="header-left"></slot>
      </template>
      <template v-slot:right>
        <slot name="header-right"></slot>
      </template>
    </stock-header>
    <!-- 内容 -->
    <slot></slot>
  </div>
</template>

<script>
import StockHeader from "./StockHeader";
export default {
  name: "Framework",
  components: {
    StockHeader,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    bgWhite: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@import "@/styles/customer.less";
.framework {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.padding-top {
  padding-top: @header-height;
}
</style>
