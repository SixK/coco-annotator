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
      @update-order="updateOrder"
    />
  </div>
</template>
<script setup>
import { watch, ref, inject, watchEffect, computed } from 'vue';
import PanelText from '@/components/PanelText';
import PanelInputDropdown from '@/components/PanelInputDropdown';
import { VisibilityOptions } from '@/libs/keypoints';

const getCurrentAnnotation = inject('getCurrentAnnotation');

const props = defineProps({
  keypoint: {
    type: Object,
    required: true,
  },
  currentAnnotation: {
    required: true,
    type: Object,
    // validator: (prop) => typeof prop === 'object' || prop === undefined,
  },
});

const currentAnnotation = ref(props.currentAnnotation);

const keypoint = ref(props.keypoint);
const showme = ref('false');
const getActiveTool = inject('getActiveTool');

watchEffect(() => {
    showme.value = keypoint.value.name === getActiveTool();
});



const visibility = ref(2);
const label = ref(-1);
const visibilityOptions = ref(VisibilityOptions);

const updateOrder = (newOrder) => {
    visibility.value = newOrder;
};

const keypointLabel = computed(() => {
  if(!currentAnnotation.value) { 
      //hack since currentAnnotation is not propagated to props !?
       console.log("Still need to hack !");
      currentAnnotation.value = getCurrentAnnotation(); 
  } else { 
      console.log("Seem's this hack is not necessary anymore, remove me !");
  }
  if (!currentAnnotation.value) return {};
  if(!currentAnnotation.value.keypoint) return {};
  let labelIndex = currentAnnotation.value.keypoint.next.label;
  let labels = currentAnnotation.value.notUsedKeypointLabels;

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
