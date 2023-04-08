<template>
  <div v-show="eraser.isActive">
    <PanelInputNumber
      v-model="eraser.eraser.pathOptions.radius"
      name="Radius"
      min="0"
      max="1000"
      step="5"
    />
    <PanelInputString
      v-model="eraser.eraser.pathOptions.strokeColor"
      name="Stroke Color"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PanelInputString from "@/components/PanelInputString";
import PanelInputNumber from "@/components/PanelInputNumber";

export default defineComponent({
  name: "EraserPanel",
  components: { PanelInputString, PanelInputNumber },
  props: {
    eraser: {
      type: Object,
      required: true,
    },
  },
});
</script>
