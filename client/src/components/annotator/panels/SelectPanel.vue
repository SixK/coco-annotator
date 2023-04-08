<template>
  <div v-show="select.isActive">
    <PanelToggle
      v-model="select.hover.showText"
      name="Show Hover Text"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PanelToggle from "@/components/PanelToggle";
export default defineComponent({
  name: "SelectPanel",
  components: { PanelToggle },
  props: {
    select: {
      type: Object,
      required: true,
    },
  },
});
</script>
