<template>
  <div v-show="showme">
    <PanelText name="Settings for next Keypoint" />
    <div class="input-group tool-input-group">
      <div class="input-group-prepend tool-option-pre">
        <span class="input-group-text tool-option-font">Label</span>
      </div>
      <div class="form-control tool-option-input text-left">
        {{ keypointLabel }}
      </div>
    </div>
    <PanelInputDropdown
      v-model="visibility"
      name="Visibility"
      :values="visibilityOptions"
    />
  </div>
</template>
<script setup>
import { ref, inject, watchEffect, computed } from 'vue';
import PanelText from '@/components/PanelText';
import PanelInputDropdown from '@/components/PanelInputDropdown';
import { VisibilityOptions } from '@/libs/keypoints';

const props = defineProps({
  keypoint: {
    type: Object,
    required: true,
  },
  currentAnnotation: {
    required: true,
    validator: (prop) => typeof prop === 'object' || prop === undefined,
  },
});

const keypoint = ref(props.keypoint);
const showme = ref('false');
const getActiveTool = inject('getActiveTool');

watchEffect(() => {
    showme.value = keypoint.value.name === getActiveTool();
});



const visibility = ref(2);
const label = ref(-1);
const visibilityOptions = ref(VisibilityOptions);
const keypointLabel = computed(() => {
  if (!props.currentAnnotation) return {};
  let labelIndex = props.currentAnnotation.keypoint.next.label;
  let labels = props.currentAnnotation.notUsedKeypointLabels;
  let labelKeys = Object.keys(labels);
  if ((labelIndex < 0 || labelIndex > labels) && labelKeys.length > 0) {
    return labels[labelKeys[0]];
  }
  return labels[labelIndex];
});

</script>
<style scoped>
.tool-input-group {
  padding-top: 3px;
}
.tool-option-pre {
  background-color: #383c4a;
}
.tool-option-font {
  border-color: #4b5162;
  background-color: #383c4a;
  color: white;
  font-size: 12px;
  height: 20px;
}
.tool-option-input {
  display: table-cell;
  border-color: #4b5162;
  color: white;
  padding: 0 0 0 3px;
  background-color: #383c4a;
  font-size: 12px;
  height: 20px;
}
</style>
