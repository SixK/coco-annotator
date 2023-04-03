<template>
  <div v-show="select.isActive">
    <PanelToggle
      v-model="select.hover.showText"
      name="Show Hover Text"
    />
  </div>
</template>

<script>
import PanelToggle from "@/components/PanelToggle";

export default {
  name: "SelectPanel",
  components: { PanelToggle },
  props: {
    select: {
      type: Object,
      required: true
    }
  }
};
</script>
