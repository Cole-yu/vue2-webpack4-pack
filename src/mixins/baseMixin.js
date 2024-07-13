import BridgeUtils from '@/utils/bridgeUtils';

export default {
  components: {},
  computed: {
    mode() {
      return this.$store.getters.mode;
    }
  },
  watch: {},
  data() {
    return {
      title: "",
      showHeader: true,
      loading: true,
    }
  },
  methods: {},
  filters: {},
};
