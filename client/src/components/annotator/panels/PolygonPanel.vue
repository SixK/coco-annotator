<template>
  <div v-show="polygon.isActive">
    <PanelButton
      name="Close Polygon"
      @click="polygon.complete"
    />
    <PanelButton
      name="Delete Polygon"
      @click="polygon.deletePolygon"
    />
    <PanelToggle
      v-model="polygon.polygon.guidance"
      name="Guidance"
    />
    <PanelToggle
      v-model="polygon.color.auto"
      name="Auto Select Color"
    />
    <PanelToggle
      v-show="polygon.color.auto"
      v-model="polygon.color.blackOrWhite"
      name="Only Black or White"
    />
    <PanelInputString
      v-model="polygon.polygon.pathOptions.strokeColor"
      name="Stroke Color"
    />
    <PanelInputNumber
      v-model="polygon.polygon.completeDistance"
      name="Auto Complete Distance"
      min="0"
      max="1000"
      step="5"
    />
    <PanelInputNumber
      v-model="polygon.polygon.minDistance"
      name="Min Distance"
      min="0"
      max="500"
      step="2"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PanelButton from "@/components/PanelButton";
import PanelToggle from "@/components/PanelToggle";
import PanelInputString from "@/components/PanelInputString";
import PanelInputNumber from "@/components/PanelInputNumber";

export default defineComponent({
  name: "PolygonPanel",
  components: { PanelButton, PanelToggle, PanelInputString, PanelInputNumber },
  props: {
    polygon: {
      type: Object,
      required: true,
    },
  },
});
</script>
