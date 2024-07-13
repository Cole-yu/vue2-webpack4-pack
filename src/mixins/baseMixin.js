import BridgeUtils from '@/utils/bridgeUtils';
import PublicUtils from '@/utils/publicUtils';

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
  methods: {
    backHandle() {
      this.$router.go(-1);
    },
    setDocumentTitle(title) {
      this.title = title;
      PublicUtils.setDocumentTitle(title);
    }
  },
  filters: {},
};