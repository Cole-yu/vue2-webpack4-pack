<template>
  <div
    class="stock-header bottom-line"
    :class="{ 'is-fixed': fixed, 'bg-white': bgWhite }"
  >
    <div class="is-left">
      <slot name="left"></slot>
    </div>
    <div class="page-title">
      <slot></slot>
    </div>
    <div class="is-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockHeader",
  props: {
    fixed: {
      type: Boolean,
      default: false,
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
@padding-sapce: 0.32rem;
.bg-white {
  background-color: #fff;
}
.stock-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 @padding-sapce;
  text-align: center;
  white-space: nowrap;
  font-size: 0.4rem;
  height: @header-height;
  // background-color: #fff;
  &.is-fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
  }
  .is-left {
    position: absolute;
    left: @padding-sapce;
  }
  .is-right {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    right: @padding-sapce;
  }
  .page-title {
    max-width: 5.2rem;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: @font-color;
  }
}
</style>
