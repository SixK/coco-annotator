<template>
  <div v-show="dextr.isActive">
    <PanelInputNumber
      v-model="dextr.settings.padding"
      name="Padding"
      min="0"
      max="1000"
      step="2"
    />
    <PanelInputNumber
      v-model="dextr.settings.threshold"
      name="Threshold"
      min="0"
      max="100"
      step="5"
    />
  </div>
</template>

<script>
import PanelInputNumber from "@/components/PanelInputNumber";

export default {
  name: "DEXTRPanel",
  components: { PanelInputNumber },
  props: {
    dextr: {
      type: Object,
      required: true
    }
  }
};
</script>
