<template>
  <div v-show="bbox.isActive">
    <PanelButton
      name="Delete BBox"
      @click="bbox.deleteBbox"
    />
    <PanelToggle
      v-model="bbox.color.auto"
      name="Auto Select Color"
    />
    <PanelToggle
      v-show="bbox.color.auto"
      v-model="bbox.color.blackOrWhite"
      name="Only Black or White"
    />
    <PanelInputString
      v-model="bbox.polygon.pathOptions.strokeColor"
      name="Stroke Color"
    />
  </div>
</template>

<script>
import PanelButton from "@/components/PanelButton";
import PanelToggle from "@/components/PanelToggle";
import PanelInputString from "@/components/PanelInputString";
// import PanelInputNumber from "@/components/PanelInputNumber";

export default {
  name: "BBoxPanel",
  // components: { PanelButton, PanelToggle, PanelInputString, PanelInputNumber },
  components: { PanelButton, PanelToggle, PanelInputString },
  props: {
    bbox: {
      type: Object,
      required: true
    }
  }
};
</script>
