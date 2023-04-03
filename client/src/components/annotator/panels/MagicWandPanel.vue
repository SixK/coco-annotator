<template>
  <div v-show="magicwand.isActive">
    <PanelInputNumber
      v-model="magicwand.wand.threshold"
      name="Threshold"
      min="0"
      max="1000"
      step="5"
    />
    <PanelInputNumber
      v-model="magicwand.wand.blur"
      name="Blur"
      min="0"
      max="1000"
      step="5"
    />
  </div>
</template>

<script>
import PanelInputNumber from "@/components/PanelInputNumber";

export default {
  name: "MagicWandPanel",
  components: { PanelInputNumber },
  props: {
    magicwand: {
      type: Object,
      required: true
    }
  }
};
</script>
