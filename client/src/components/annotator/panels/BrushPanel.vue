<template>
  <div v-show="brush.isActive">
    <PanelInputNumber
      v-model="brush.brush.pathOptions.radius"
      name="Radius"
      min="0"
      max="1000"
      step="5"
    />
    <PanelInputString
      v-model="brush.brush.pathOptions.strokeColor"
      name="Stroke Color"
    />
  </div>
</template>

<script>
import PanelInputString from "@/components/PanelInputString";
import PanelInputNumber from "@/components/PanelInputNumber";

export default {
  name: "BrushPanel",
  components: { PanelInputString, PanelInputNumber },
  props: {
    brush: {
      type: Object,
      required: true
    }
  }
};
</script>
