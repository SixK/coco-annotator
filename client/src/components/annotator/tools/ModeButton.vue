<script>
import button from "@/mixins/toolBar/button";

export default {
  name: "ModeButton",
  mixins: [button],
  model: {
    prop: "mode",
    event: "update"
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "Mode: " + this.mode
    };
  },
  computed: {
    icon() {
      if (this.mode == "segment") return "fa-pencil-square-o";
      if (this.mode == "label") return "fa-tags";
      return "";
    },
  },
  watch: {
    mode() {
      this.name = "Mode: " + this.mode;
    },
  },
  methods: {
    next() {
      if (this.mode == "segment") return "label";
      return "segment";
    },
    execute() {
      this.$emit("update", this.next());
    }
  }
};
</script>
